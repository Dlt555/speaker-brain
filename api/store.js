import { storeReady, redis, pipeline, passcodeOk, passcodeSet, noStore } from './_lib.js';
import SEED_SPEAKERS from '../data/seed-speakers.js';
import SEED_UPDATES from '../data/seed-updates.js';

const COLLECTIONS = ['speakers', 'feedback'];
const ID = /^[A-Za-z0-9_-]{1,64}$/;
const MAX_DOC_BYTES = 200 * 1024;
const VERSION_KEY = 'sb:version';
const key = col => `sb:${col}`;

function parseHash(flat) {
  const out = [];
  for (let i = 0; i < (flat || []).length; i += 2) {
    try { out.push({ id: flat[i], ...JSON.parse(flat[i + 1]) }); } catch { /* skip a damaged row */ }
  }
  return out;
}

// Copy speakers from data/seed-speakers.js into the database once each. `sb:seeded` remembers
// which ones were copied, so a seeded speaker that is later removed on the site stays removed.
let seedsChecked = false;
async function applySeeds() {
  if (seedsChecked) return;
  for (const { id, ...doc } of SEED_SPEAKERS) {
    if (!ID.test(id)) continue;
    const isNew = await redis('SADD', 'sb:seeded', id);
    if (Number(isNew) !== 1) continue;
    const exists = await redis('HEXISTS', key('speakers'), id);
    if (Number(exists) === 1) continue;
    await redis('HSET', key('speakers'), id, JSON.stringify(doc));
    await redis('INCR', VERSION_KEY);
  }
  seedsChecked = true;
}

function replaceText(value, from, to) {
  if (typeof value === 'string') return value.split(from).join(to);
  if (Array.isArray(value)) return value.map(v => replaceText(v, from, to));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, replaceText(v, from, to)]));
  }
  return value;
}

// Apply each entry of data/seed-updates.js once (`sb:updates` remembers which ran).
let updatesChecked = false;
async function applyUpdates() {
  if (updatesChecked) return;
  for (const { key: updateKey, id, set = {}, replace = [], append = {}, push = {} } of SEED_UPDATES) {
    const isNew = await redis('SADD', 'sb:updates', updateKey);
    if (Number(isNew) !== 1) continue;
    const existing = await redis('HGET', key('speakers'), id);
    if (!existing) continue;
    let doc = { ...JSON.parse(existing), ...set };
    for (const [from, to] of replace) doc = replaceText(doc, from, to);
    // append: add text to the end of a text field, unless it is already there.
    for (const [field, text] of Object.entries(append)) {
      const current = typeof doc[field] === 'string' ? doc[field].trim() : '';
      if (!current.includes(text.trim().slice(0, 80))) doc[field] = [current, text.trim()].filter(Boolean).join('\n\n');
    }
    // push: add items to a list ('game.fakes' reaches into game), skipping ids already there.
    for (const [path, items] of Object.entries(push)) {
      const parts = path.split('.');
      let target = doc;
      for (const part of parts.slice(0, -1)) {
        target = target[part] = target[part] && typeof target[part] === 'object' ? target[part] : {};
      }
      const last = parts[parts.length - 1];
      const list = Array.isArray(target[last]) ? target[last] : [];
      const have = new Set(list.map(x => x && x.id));
      target[last] = [...list, ...items.filter(x => !have.has(x.id))];
    }
    doc.updatedAt = Date.now();
    await redis('HSET', key('speakers'), id, JSON.stringify(doc));
    await redis('INCR', VERSION_KEY);
  }
  updatesChecked = true;
}

// The Rough notes section was removed. Once, append every speaker's rough notes to the
// end of their Notes so nothing is lost.
let roughNotesMoved = false;
async function moveRoughNotesIntoNotes() {
  if (roughNotesMoved) return;
  const isNew = await redis('SADD', 'sb:updates', 'merge-rough-notes-into-notes');
  if (Number(isNew) === 1) {
    const flat = await redis('HGETALL', key('speakers'));
    for (const { id, ...doc } of parseHash(flat)) {
      const rough = (Array.isArray(doc.scribbles) ? doc.scribbles : []).map(n => n && n.text).filter(Boolean);
      if (!('scribbles' in doc)) continue;
      const notes = typeof doc.notes === 'string' ? doc.notes.trim() : '';
      const added = rough.length ? 'Rough notes:\n' + rough.map(t => '- ' + t).join('\n') : '';
      doc.notes = [notes, added].filter(Boolean).join('\n\n');
      delete doc.scribbles;
      doc.updatedAt = Date.now();
      await redis('HSET', key('speakers'), id, JSON.stringify(doc));
    }
    await redis('INCR', VERSION_KEY);
  }
  roughNotesMoved = true;
}

export default async function handler(req, res) {
  noStore(res);
  if (!storeReady()) {
    return res.status(503).json({ error: 'Storage is not connected yet. In Vercel, open the project, go to Storage, add Upstash for Redis, connect it to this project and redeploy.' });
  }

  try {
    if (req.method === 'GET') {
      await applySeeds();
      await applyUpdates();
      await moveRoughNotesIntoNotes();
      const version = String((await redis('GET', VERSION_KEY)) ?? '0');
      if (req.query.since !== undefined && String(req.query.since) === version) {
        return res.status(200).json({ version, unchanged: true });
      }
      const [speakers, feedback] = await pipeline([['HGETALL', key('speakers')], ['HGETALL', key('feedback')]]);
      return res.status(200).json({
        version,
        speakers: parseHash(speakers),
        feedback: parseHash(feedback),
        ai: Boolean(process.env.ANTHROPIC_API_KEY),
        passcodeSet: passcodeSet()
      });
    }

    if (req.method !== 'POST') {
      res.setHeader('Allow', 'GET, POST');
      return res.status(405).json({ error: 'Use GET or POST.' });
    }

    if (!passcodeOk(req)) return res.status(401).json({ error: 'Wrong or missing class passcode.' });

    const { op, col, id, data } = req.body || {};
    if (op === 'check') return res.status(200).json({ ok: true });

    if (!COLLECTIONS.includes(col)) return res.status(400).json({ error: 'Unknown collection.' });
    if (typeof id !== 'string' || !ID.test(id)) return res.status(400).json({ error: 'Bad id.' });

    if (op === 'remove') {
      await redis('HDEL', key(col), id);
    } else if (op === 'set' || op === 'update') {
      if (!data || typeof data !== 'object' || Array.isArray(data)) return res.status(400).json({ error: 'Missing data.' });
      let doc = { ...data };
      delete doc.id;
      if (op === 'update') {
        const existing = await redis('HGET', key(col), id);
        if (!existing) return res.status(404).json({ error: 'That item no longer exists. Reload the page.' });
        doc = { ...JSON.parse(existing), ...doc };
      }
      const json = JSON.stringify(doc);
      if (Buffer.byteLength(json) > MAX_DOC_BYTES) return res.status(413).json({ error: 'This speaker has too much text to save. Trim some notes.' });
      await redis('HSET', key(col), id, json);
    } else {
      return res.status(400).json({ error: 'Unknown operation.' });
    }

    const version = String(await redis('INCR', VERSION_KEY));
    return res.status(200).json({ ok: true, version });
  } catch (err) {
    console.error(err);
    return res.status(502).json({ error: 'The storage service had a problem. Try again in a moment.' });
  }
}
