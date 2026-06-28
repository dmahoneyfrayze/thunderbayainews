# Content Engine — the recipe for the autonomous bi-weekly addition

This is the spec the scheduled agent (and a human) follows to add a new Journal post
to thunderbayai.com on a bi-weekly cadence. The site's whole bet is being the
**AI-citable authority for Northwestern Ontario**, so every addition must compound that:
real, structured, regionally-specific, and trustworthy. The cadence keeps the site fresh
(freshness + growing topical coverage is what builds ranking and authority over time).

## The hard rule: DRAFT, never auto-publish
The agent opens a **pull request** with the new post. A human reviews and merges it.
Merging triggers the Netlify deploy. Nothing reaches the live site unread. This is the
anti-slop guardrail — fully-unattended AI publishing hallucinates and gets penalized.

## What to add each run (pick ONE, rotate the beat)
The site covers six beats — rotate so coverage stays broad:
1. **AI news + NWO impact** — a real, current AI development, framed for what it means here.
2. **Local tech** — a Northwestern Ontario tech/innovation story or trend.
3. **Government & municipal** — public-sector AI/tech, with the local guardrails (MFIPPA, procurement).
4. **Funding & grants** — a program explainer, deadline, or who-qualifies breakdown.
5. **Models & tools** — a practical, hype-free comparison or how-to-choose.
6. **Tips** — concrete, low-risk ways a local business can use AI now.

Check the most recent posts in `src/data/posts.js` and pick a beat that is under-covered.

## Proof-integrity (mandatory — this is the credibility of the whole site)
- **Verify every factual claim** against a real, current source (WebSearch the official site).
  Cite sources in the post's `source` block.
- **No fabricated news, dates, benchmarks, or metrics.** If you cannot confirm a specific
  number or event, write the evergreen/explainer version instead — do not invent specifics.
- **Funding/eligibility** is always "confirm with the program," never "you qualify."
  Do not list closed programs (e.g. CDAP closed in 2024).
- **No emojis anywhere.** Plain, sharp prose. Lead with the point.
- Keep it regional — Northwestern Ontario / Thunder Bay specificity is the moat; generic
  AI content loses on volume to everyone else.

## How to write it
- 5-8 content blocks. Open with the point, then structure (h2 + ul where useful), a callout
  for the key caveat, and a `source` block at the end.
- Plain-language, useful, skimmable. The reader is a busy local owner/operator/administrator.
- Match the voice of the existing posts (direct, no hype, no filler).

## The data shape (append to the POSTS array in `src/data/posts.js`)
```
{
  slug: 'kebab-case-unique-slug',
  title: 'Sharp, specific title',
  dek: 'One-sentence summary of the value.',
  category: 'Tips' | 'Models' | 'Government' | 'Funding' | 'Programs' | 'News' | 'Local Tech',
  date: 'Month DD, YYYY',     // the run date
  iso: 'YYYY-MM-DD',
  readMins: <int>,
  accent: ['#hex', '#hex'],   // a tasteful cyan/violet/blue/green gradient pair
  blocks: [
    { type: 'p', text: '...' },
    { type: 'h2', text: '...' },
    { type: 'ul', items: ['...', '...'] },
    { type: 'callout', text: 'the key caveat' },
    { type: 'source', text: 'Sources: <official urls>. ...' },
  ],
}
```
Add the new post at the TOP of the POSTS array (newest first). The prerender + sitemap
pick it up automatically on the next build.

## Also: keep the funding radar current
While here, sanity-check `src/data.js` (GRANTS_DATA) against the official program pages —
if a deadline has passed or a program closed, flag it in the PR description (do not silently
delete; note it for the human to confirm).

## The PR
- Branch: `auto/journal-YYYY-MM-DD`
- Title: `Auto-draft: <post title>`
- Body: the beat chosen, the sources used, and any radar/program changes to confirm.
- **Do not merge.** Leave it for human review.
