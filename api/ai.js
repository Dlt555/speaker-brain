import Anthropic from '@anthropic-ai/sdk';
import { passcodeOk, noStore } from './_lib.js';

const MAX_PROMPT_CHARS = 20000;

export default async function handler(req, res) {
  noStore(res);
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Use POST.' });
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(503).json({ error: 'The AI helper is not switched on. Add ANTHROPIC_API_KEY in the Vercel project settings.' });
  }
  if (!passcodeOk(req)) return res.status(401).json({ error: 'Wrong or missing class passcode.' });

  const prompt = req.body && req.body.prompt;
  if (typeof prompt !== 'string' || !prompt.trim()) return res.status(400).json({ error: 'Missing prompt.' });
  if (prompt.length > MAX_PROMPT_CHARS) return res.status(400).json({ error: 'That request is too long.' });

  const client = new Anthropic();
  try {
    const message = await client.beta.messages.create({
      model: 'claude-opus-5-5',
      max_tokens: 4000,
      output_config: { effort: 'low' },
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      messages: [{ role: 'user', content: prompt }]
    });
    if (message.stop_reason === 'refusal') {
      return res.status(422).json({ error: "Claude couldn't help with that request." });
    }
    const text = message.content.filter(b => b.type === 'text').map(b => b.text).join('');
    return res.status(200).json({ text, truncated: message.stop_reason === 'max_tokens' });
  } catch (err) {
    if (err instanceof Anthropic.AuthenticationError) {
      console.error('Anthropic API key rejected');
      return res.status(500).json({ error: 'The AI key in the Vercel settings was rejected. Check ANTHROPIC_API_KEY.' });
    }
    if (err instanceof Anthropic.RateLimitError) {
      return res.status(429).json({ error: 'The AI helper is busy. Try again in a minute.' });
    }
    if (err instanceof Anthropic.APIError) {
      console.error('Anthropic API error', err.status, err.message);
      return res.status(502).json({ error: 'The AI service had a problem. Try again.' });
    }
    console.error(err);
    return res.status(502).json({ error: 'Could not reach the AI service. Try again.' });
  }
}
