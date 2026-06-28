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
- **Major-AI claims are the HIGHEST hallucination risk — verify to the PRIMARY source.** Model
  names/versions, benchmark numbers, release dates, who-said-what, and government actions must be
  confirmed against the primary source (the lab's own announcement / the government's release) or
  corroborated across two reputable outlets — never from memory and never from a single unreliable
  blog. If a benchmark or capability claim can't be primary-sourced, describe it qualitatively or
  leave it out. Getting a model fact wrong on an AI-authority site is the fastest way to lose trust.
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

**Sources to scan (use WebSearch + WebFetch; prefer official + established outlets):**
- **Major AI news (cover the big stuff, then localize it):** major model releases and breakthroughs,
  big AI-company moves, and AI **government intervention / regulation** — US, Canada, EU, global.
  Sources: the labs' own announcements (Anthropic, OpenAI, Google DeepMind, Meta, Mistral, etc.),
  reputable tech press (Reuters, TechCrunch, The Verge, Fortune, Bloomberg, The Hill), and government/
  policy releases (US Commerce/export controls, Canada ISED / Innovation Canada + the federal AI
  directive, the EU AI Act). Worked example of exactly the right story: the **US government forcing
  Anthropic to pull Fable 5 / Mythos 5 worldwide via an export-control directive (June 2026)** — a
  major event whose angle for us is "what a US AI-model ban means for a Canadian/Ontario business that
  relies on these tools." Cover the announcement/breakthrough/regulation, then ALWAYS land the
  NWO / Ontario / Canada / local-business angle. That local hook is the moat — anyone can report the
  headline; few connect it to a Thunder Bay operator or Ontario policy.
- Local: netnewsledger.com, northernontariobusiness.com, tbnewswatch.com, CBC Thunder Bay,
  the CEDC feed (gotothunderbay.ca), the City of Thunder Bay.
- Funding bodies: fednor.canada.ca, nohfc.ca, nwoinnovation.ca (program updates/deadlines).
- Regional industry AI (NWO-relevant verticals): AI in mining, forestry, energy, healthcare,
  and public services — where it touches the Northwest's actual economy.

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

## Git discipline (so the autopilot never silently fails on a conflict)
Other agents and the operator also push to `main`, so your checkout may be behind. ALWAYS:
- **Before committing:** `git pull --rebase origin main` so you're on the latest.
- **If `git push` is rejected** (non-fast-forward): `git pull --rebase origin main`, resolve any
  conflict (your new post is additive at the TOP of the POSTS array — keep both), then push again.
- Never force-push. Retry the pull+rebase up to a few times before giving up and emailing Denis.

## Publish (Lane 1 and Lane 2 both)
1. Run the **self-verification pass** above. If anything is unverifiable, fix or cut it.
2. Confirm: no emoji, sources cited, regionally specific, builds locally if you can.
3. `git pull --rebase origin main`, then `git add -A && git commit -m "autopilot: <title>"`, then
   `git push` (retry with pull --rebase if rejected). Netlify deploys.
4. Email denis@frayze.ca the summary + live URL + commit SHA (Lane-2 deep posts: include the
   sources you verified).
5. If you are NOT confident the post is accurate and on-strategy, DO NOT publish — skip this run
   and email Denis why. A missed week is fine; a wrong post on an authority site is not.

## Social spec — WEEKLY SIGNAL LANE ONLY (feeds the Instagram engine)
After you publish the **weekly Signal** (Lane 1), also write `scripts/social/spec.json` and commit it
in the SAME commit. A local job renders that spec into an Instagram **carousel + reel + story** and
schedules them to the @thunderbayai IG (it consumes the committed spec; it never calls an LLM). Build
the spec from the Signal you just wrote:
- Pick the **5 strongest stories**. For each: a SHORT punchy visual keyword (`big` — a real number/dollar
  figure like "$2B"/"$26B", or one strong word like "BLOCKED"/"RING OF FIRE"), a tight `title`, 1-2
  flashcard sentences (`body`), and an open-loop `tease` ("Next: ..."; last one "The throughline ->").
- A **scroll-stopping cover hook** (lead with the single most dramatic story that is TRUE to the Signal)
  + a curiosity-gap `sub`.
- The `summary` (the week's throughline) + `captions` (carousel + reel — no emoji, end with hashtags,
  link-in-bio, no raw URL in the body).
- **Exact schema + rules: `scripts/social/make-spec-prompt.md`.** Proof-integrity: every hook and number
  must be TRUE to the Signal; no emoji; flashcard-tight. This is the ONLY extra file the Signal lane
  writes — the bi-weekly deep posts (Lane 2) skip it. If you cannot produce a confident spec, leave the
  old spec.json in place (the local job dedups by `iso`, so it simply will not re-post).
