import fs from 'node:fs';
import { GoogleGenAI } from '@google/genai';
import { metric } from '@vercel/functions';

const PROMPTS = JSON.parse(
  fs.readFileSync(new URL('../config/prompts.json', import.meta.url), 'utf8')
);
const CATALYST_SCHEMA = JSON.parse(
  fs.readFileSync(new URL('../config/devotional-catalyst.schema.json', import.meta.url), 'utf8')
);

const VALID_MODES = new Set(['microscopic', 'topical', 'word']);
const MAX_FIELD_LEN = 3000;

function jsonResponse(body, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}

function sanitizeText(val, maxLen = MAX_FIELD_LEN) {
  return typeof val === 'string' ? val.trim().slice(0, maxLen) : '';
}

export function validateCatalystRequest(body) {
  if (!body || typeof body !== 'object') {
    return { error: 'Request body must be a JSON object.' };
  }
  const mode = sanitizeText(body.mode, 32).toLowerCase();
  if (!VALID_MODES.has(mode)) {
    return { error: 'Invalid mode. Expected "microscopic", "topical", or "word".' };
  }

  if (mode === 'microscopic') {
    const reference = sanitizeText(body.reference, 160);
    const version = sanitizeText(body.version || 'KJV', 40).toUpperCase();
    const text = sanitizeText(body.text, MAX_FIELD_LEN);
    if (!reference || !text) {
      return { error: 'Microscopic mode requires "reference" and "text".' };
    }
    return { mode, params: { reference, version, text } };
  }

  if (mode === 'topical') {
    const topic = sanitizeText(body.topic, 160);
    const definition = sanitizeText(body.definition || 'N/A', 800);
    const supportingScriptures = sanitizeText(body.supportingScriptures || body.reference || 'General Scripture', 1200);
    if (!topic) {
      return { error: 'Topical mode requires "topic".' };
    }
    return {
      mode,
      params: {
        topic,
        definition,
        supporting_scriptures: supportingScriptures,
      },
    };
  }

  // word mode
  const reference = sanitizeText(body.reference, 160);
  const text = sanitizeText(body.text, MAX_FIELD_LEN);
  const focusWord = sanitizeText(body.focusWord, 80);
  if (!reference || !text || !focusWord) {
    return { error: 'Word mode requires "reference", "text", and "focusWord".' };
  }
  return {
    mode,
    params: {
      reference,
      text,
      focus_word: focusWord,
    },
  };
}

export function renderPromptTemplate(mode, params) {
  const template = PROMPTS.templates[mode];
  if (!template) {
    throw new Error(`Missing prompt template for mode: ${mode}`);
  }
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => params[key] ?? '');
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: 'POST, OPTIONS',
    },
  });
}

export async function POST(request) {
  const startedAt = performance.now();
  let mode = 'unknown';
  let outcome = 'error';

  try {
    let body;
    try {
      body = await request.json();
    } catch {
      outcome = 'bad_request';
      return jsonResponse({ error: 'Invalid JSON request body.' }, 400);
    }

    const validated = validateCatalystRequest(body);
    if (validated.error) {
      outcome = 'bad_request';
      return jsonResponse({ error: validated.error }, 400);
    }
    mode = validated.mode;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      outcome = 'unconfigured';
      console.error('catalyst_api_error', { mode, reason: 'missing_gemini_api_key' });
      return jsonResponse(
        { error: 'Catalytic assistant is not configured on this deployment (missing GEMINI_API_KEY).' },
        503
      );
    }

    const model = process.env.GEMINI_MODEL || PROMPTS.defaultModel || 'gemini-4-hydrogen';
    const prompt = renderPromptTemplate(mode, validated.params);

    const ai = new GoogleGenAI({ apiKey });
    const interaction = await ai.interactions.create({
      model,
      input: prompt,
      system_instruction: PROMPTS.systemInstruction,
      store: false,
      response_format: {
        type: 'text',
        mime_type: 'application/json',
        schema: CATALYST_SCHEMA,
      },
    });

    const rawText = interaction?.output_text;
    if (!rawText) {
      outcome = 'empty_response';
      console.error('catalyst_api_error', { mode, model, reason: 'empty_output_text' });
      return jsonResponse({ error: 'No catalytic response was returned by the model.' }, 502);
    }

    const parsed = JSON.parse(rawText);
    if (!parsed || !Array.isArray(parsed.catalysts) || !parsed.silentMeditationPause) {
      outcome = 'invalid_schema';
      console.error('catalyst_api_error', { mode, model, reason: 'schema_mismatch' });
      return jsonResponse({ error: 'Model returned an unexpected response structure.' }, 502);
    }

    outcome = 'success';
    return jsonResponse(parsed, 200);
  } catch (err) {
    outcome = 'error';
    console.error('catalyst_api_error', {
      mode,
      message: err?.message || String(err),
      status: err?.status,
    });
    return jsonResponse(
      { error: 'Unable to generate catalytic study nudges right now. Please continue meditating locally.' },
      502
    );
  } finally {
    const durationMs = Math.round(performance.now() - startedAt);
    metric('catalyst.requests', 1, { mode, outcome });
    metric('catalyst.duration_ms', durationMs, { mode, outcome });
  }
}
