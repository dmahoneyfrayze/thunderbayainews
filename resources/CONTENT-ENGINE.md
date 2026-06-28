# Content Engine — autopilot spec for thunderbayai.com

This is the spec the scheduled agents (and a human) follow to keep thunderbayai.com — the
autonomous AI authority hub for Northwestern Ontario — fresh and growing. The site's whole
bet is being the **AI-citable authority for NWO**, so every addition must compound that:
real, structured, regionally specific, and trustworthy.

## Publishing model: FULLY AUTONOMOUS (decided by Denis, 2026-06-28)
The agents **publish directly to the live site** — commit to `main`, push, Netlify deploys.
No human PR gate. This overrides the earlier "drafts only, human-gated" rule. Because there
is no human gate, the guardrails below are MANDATORY and non-negotiable — they are the only
thing standing between this and the AI-slop that gets authority sites penalized.

### The three safety layers (every run, no exceptions)
1. **Self-verification / red-team pass before committing.** After drafting, STOP and review
   your own draft as a skeptic: for EVERY factual claim (number, date, program, event, quote),
   re-open the cited source and confirm the source actually says it. Delete or soften anything
   the source does not directly support. If a claim cannot be verified against a real source,
   it does not ship. When in doubt, cut it — a shorter true post beats a longer shaky one.
2. **Notify on publish.** After publishing, email denis@frayze.ca a summary: what published,
   the live URL, the sources used, and the commit SHA. He must always be able to see what went
   out without checking the site.
3. **Atomic, revertible commits.** One post = one commit with a clear message
   (`autopilot: <title>`). If anything is wrong, it reverts in one command:
   `git revert <sha> && git push` (Netlify redeploys). Never bundle unrelated changes.

## Proof-integrity (the credibility of the whole site — absolute)
- **Verify every factual claim against a real, current official source.** Cite sources in the
  post's `source` block with URLs.
- **No fabricated news, dates, benchmarks, metrics, quotes, or events.** Ever. If you cannot
  confirm a specific, write the evergreen/explainer version or omit it.
- **Funding/eligibility** is always "confirm with the program," never "you qualify." Never list
  closed programs (CDAP closed 2024; NOIC Next Level on hold).
- **No emojis anywhere.** Plain, sharp prose. Lead with the point.
- **Regional specificity is the moat** — Northwestern Ontario / Thunder Bay angle on everything.
  Generic AI content loses on volume to everyone else.

---

## LANE 1 — Weekly "Signal" news roundup  (auto-publish)
A weekly roundup of the AI / tech / funding / government developments that matter for NWO.
This lane is LOW hallucination-risk because it is summary + link, not invented analysis — lean
into that: every item is a real story or update with a real source link.

**Sources to scan (use WebSearch + WebFetch; prefer official + established local outlets):**
- Local: netnewsledger.com, northernontariobusiness.com, tbnewswatch.com, CBC Thunder Bay,
  the CEDC feed (gotothunderbay.ca), the City of Thunder Bay.
- Funding bodies: fednor.canada.ca, nohfc.ca, nwoinnovation.ca (program updates/deadlines).
- AI/tech: major AI news, but ONLY items with a credible NWO/Ontario/Canada angle or clear
  relevance to a local business or government audience.

**Build a roundup post** (category `News`, title like "The Signal: AI & funding in the Northwest,
week of <Month DD>"): a short intro line, then 4-7 items. Each item = a `h2` short headline +
a 1-3 sentence `p` summary in plain language + the takeaway for a local reader, and the source
in the post's `source` block (list every URL). If a week is genuinely thin, publish fewer items
rather than padding — never invent a story to hit a number.

## LANE 2 — Bi-weekly deep post  (auto-publish, highest self-critic rigor)
An original explainer/analysis on one under-covered beat: AI news + NWO impact, local tech,
government/municipal, funding/grants, models/tools, or tips. This lane carries the most
proof-integrity risk (original claims), so the self-verification pass matters MOST here. Check
`src/data/posts.js` for what is under-covered and rotate beats.

---

## Pick the beat / item, then write
- 5-8 content blocks. Open with the point; structure with h2 + ul where useful; a `callout` for
  the key caveat; a `source` block citing official URLs at the end.
- Plain-language, useful, skimmable. The reader is a busy local owner / operator / administrator.
- Match the voice of the existing posts (direct, no hype, no filler).

## The data shape (add to the TOP of the POSTS array in `src/data/posts.js`)
```
{
  slug: 'kebab-case-unique-slug',
  title: 'Sharp, specific title',
  dek: 'One-sentence summary of the value.',
  category: 'News' | 'Tips' | 'Models' | 'Government' | 'Funding' | 'Programs' | 'Local Tech',
  date: 'Month DD, YYYY',   iso: 'YYYY-MM-DD',   readMins: <int>,
  accent: ['#hex', '#hex'],   // tasteful cyan/violet/blue/green gradient pair
  blocks: [ {type:'p',text}, {type:'h2',text}, {type:'ul',items:[]}, {type:'callout',text}, {type:'source',text} ],
}
```
The prerender + sitemap pick it up automatically on the next build.

## Also: keep the funding radar honest
Sanity-check `src/data.js` (GRANTS_DATA) deadlines/status against official sources. If a deadline
passed or a program changed, update it (and note it in the commit message). Do not delete a
program without a source confirming it closed.

## Publish (Lane 1 and Lane 2 both)
1. Run the **self-verification pass** above. If anything is unverifiable, fix or cut it.
2. Confirm: no emoji, sources cited, regionally specific, builds locally if you can.
3. `git add -A && git commit -m "autopilot: <title>"` on `main`, then `git push`. Netlify deploys.
4. Email denis@frayze.ca the summary + live URL + commit SHA (Lane-2 deep posts: include the
   sources you verified).
5. If you are NOT confident the post is accurate and on-strategy, DO NOT publish — skip this run
   and email Denis why. A missed week is fine; a wrong post on an authority site is not.
