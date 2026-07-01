# Definition of done — LANE 3 evergreen post (thunderbayai.com)

The binary, checkable bar every autonomous LANE 3 post must clear BEFORE it publishes. The
independent gate (`~/frayze-jobs/tbai-agent/gate.sh`) grades a staged (committed-but-unpushed)
post against this and pushes ONLY on PASS. Deterministic criteria are checked in shell (free,
reliable); JUDGE criteria are graded by one isolated LLM pass that did NOT write the post. Every
line is PASS/FAIL — any single FAIL blocks the publish. A missed day is acceptable; a bad post on
an authority site is not.

## Deterministic (checked in shell — never on the writer's say-so)
- D1 — `node --check src/data/posts.js` passes (the file parses).
- D2 — Additive-only: the commit deletes/renames nothing, and touches only
  `src/data/posts.js` and `resources/BLOG-BACKLOG.md`.
- D3 — Exactly the backlog topic was consumed: a `- [ ]` item was flipped to `- [x] <slug>`.
- D4 — No emoji anywhere in the added content.

## Judge (isolated LLM grade, from the post text only)
- J1 — Opens with a DIRECT one-paragraph answer to the title's question (the AI-citable answer),
  before any heading.
- J2 — Sourcing discipline: every factual claim, number, date, dollar figure, or eligibility
  detail is backed by a source — the post ends with a `source` block listing official URLs, and
  no number/date/program claim appears anywhere without sourcing.
- J3 — Any funding/grant is framed as "confirm eligibility with the program" (or equivalent),
  never "you qualify"; no closed program (e.g. CDAP, NOIC Next Level) is presented as open.
- J4 — Voice is direct, specific, no-hype: no marketing fluff, no filler, no invented "we"
  claims; matches the register of the existing posts.
- J5 — Regionally grounded and genuinely useful: a real Northwestern Ontario / Thunder Bay
  angle, substantive (not thin filler), on-strategy for an AI-authority hub.

Provenance: added 2026-07-01, incorporating the launch-your-agent eval pattern (rubric-as-artifact
+ isolated grader) reconciled with Denisbot's "trust deterministic scorers first" lesson.
