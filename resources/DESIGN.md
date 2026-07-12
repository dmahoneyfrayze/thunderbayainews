# Design system — light "civic clarity" (2026-07-11)

The site flipped from dark-neon to a LIGHT editorial system on 2026-07-11 (Denis's call:
the NWO audience — 45-65, low AI adoption — trusts light civic/news surfaces; dark neon
read "tech insider" and hurt long-form readability). Any agent touching UI follows this.

## Tokens (src/index.css is the source of truth)
- Page: warm paper `hsl(45 33% 98%)`. Cards: white + `hsla(var(--border-light))` hairline
  + soft ink shadow (`--glass-shadow`). No glassmorphism blur, no neon glows.
- Text: ink `--text-primary` (hsl 225 29% 12%); body `--text-secondary`; support `--text-muted`.
- Accents: dark accessible cyan `--primary-cyan` (hsl 192 91% 32%) + violet `--primary-violet`
  (hsl 262 68% 48%) — for text/icons/borders on light. Gradient pair for buttons/accent words:
  `hsl(192 89% 36%) -> hsl(var(--primary-violet))`.
- The NEON originals (`--cyan-bright` 184 100% 48%, `--violet-bright`) are for the bolt mark
  and inside `.dark-band` ONLY. Never as text on light.
- Type: display/headings = Fraunces (serif, weights 500/600/700 — never 800, it isn't loaded);
  wordmark/buttons/card titles = Outfit via `--font-heading-sans`; body = Plus Jakarta Sans;
  labels = Space Grotesk (`.font-label`, tracking 0.15em).

## The dark exceptions (intentional, keep)
- `.dark-band` (#0B1020 + `.aurora-d` glow): the Weekly Brief section and the site footer.
  These are the brand moments — do not add more dark bands.
- OG/social share cards (`public/tbai-og/`, scripts/og/): stay dark — they live in social
  feeds where dark pops. Do not restyle them light.
- Social daily-card engine (tbai-social) keeps its own dark card template.

## Rules for autonomous edits
- New components/pages: white card on paper, tokens above — never hardcode dark backgrounds,
  `rgba(255,255,255,x)` fills, or neon hsl(184/275...) values on light surfaces.
- Long-form readability is the product: body >= 16px (articles 17.5px/1.75), no text over
  washes/glows, AA contrast minimum.
- No emojis anywhere. Plain, direct copy.
- Blog post `accent` hex pairs in src/data/posts.js are DATA (used as subtle tint washes,
  capped ~10% opacity) — keep choosing tasteful cyan/violet/blue/green pairs; the light
  theme mutes how they render.
