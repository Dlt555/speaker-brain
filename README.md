# Speaker Brain

A brain-themed website for keeping track of guest speakers. Each speaker has six sections:

| Section | Part of the brain | What goes there |
|---|---|---|
| Rough notes | Brainstem | Quick sticky notes, which you can move into Research or Questions later |
| Research | Parietal lobe | What you found out, plus an AI research helper |
| Questions | Frontal lobe | Questions to ask, starred must-asks, answers written during the talk |
| Notes | Temporal lobe | Notes from the talk and key takeaways |
| Feedback | Occipital lobe | Comments from your teacher |
| Fact snake | Cerebellum | A snake game: eat the true facts, avoid the fake ones (mouse, arrow keys or W A S D) |

Anyone with the link can **view** the site. To **add or change** anything, people unlock editing with a class passcode that you choose.

## How it fits together

- `src/app.html` is the whole page. The same file also runs as a claude.ai artifact.
- `build.mjs` wraps it into `public/index.html` for the website (Vercel runs this automatically).
- `api/store.js` saves and loads speakers and feedback in an Upstash Redis database.
- `api/ai.js` powers the AI research helper with Claude (optional; needs an Anthropic API key).

Data lives in the database, not in the code, so updating the code never wipes your speakers.

## Putting it online with Vercel (one time, about 10 minutes)

1. **Sign in to Vercel.** Go to https://vercel.com and sign up with your GitHub account (the free Hobby plan is enough).
2. **Import this repository.** Click **Add New… → Project**, find `speaker-brain` and click **Import**.
3. **Add the settings** under **Environment Variables** before deploying:
   - `EDIT_PASSCODE`: a passcode you choose (for example `brain-club-2026`). You and your teacher type it to unlock editing.
   - `ANTHROPIC_API_KEY` *(optional)*: turns on the AI research helper. Create a key at https://console.anthropic.com. AI requests are billed to that account (each request costs a few cents at most).

   Then click **Deploy**.
4. **Add the database.** In the project, open the **Storage** tab, choose **Upstash for Redis** (free plan), create it and **connect it to this project**. Vercel adds the connection settings for you.
5. **Redeploy** so the new settings take effect: **Deployments** → the latest one → **⋯ → Redeploy**.
6. Open your site's address (something like `speaker-brain.vercel.app`), click **Unlock editing**, type the passcode and your name, and start adding speakers.

Share the address with your teacher, plus the passcode if they should be able to leave feedback.

## Updating the site

Every change pushed to the `main` branch on GitHub redeploys the site automatically within a minute or two. Speakers, notes and feedback stay in the database, so nothing is lost.

## Running it locally

```bash
npm install
node build.mjs        # writes public/index.html
npx vercel dev        # serves the site and the /api functions (needs the Vercel CLI and the same settings)
```

Opening `public/index.html` straight from disk works as a preview, but nothing is saved.
