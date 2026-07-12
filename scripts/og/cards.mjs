// Canonical OG-card data for thunderbayai.com (shared by generate.mjs renderer +
// wire.mjs which regenerates src/lib/og-images.js). Single source of truth.
//
// route = normalized og map key (no trailing slash; '/' stays '/').
// lines: array of lines; a line is an array of strings / {grad:"accent word"}.
// chip = the small uppercase pill in the footer (category / label).
// slug = output filename (public/tbai-og/<slug>.webp).
export const CARDS = [
  // Homepage
  { slug: 'home', route: '/', chip: 'Intelligence Hub',
    lines: [['The AI signal for'], [{ grad: 'the Northwest' }, '.']],
    sub: 'AI news, local tech, government and funding that matter for Northwestern Ontario.' },

  // Blog posts (keyed by /blog/<slug>)
  { slug: 'openai-gpt-5-6-sol-terra-luna-northwestern-ontario-business', route: '/blog/openai-gpt-5-6-sol-terra-luna-northwestern-ontario-business', chip: 'Models',
    lines: [['OpenAI\'s ', { grad: 'GPT-5.6' }], ['for your business.']],
    sub: 'Cheaper tokens are the real local story — plus a US review worth watching.' },
  { slug: 'which-ai-model-tier-small-business-northwestern-ontario', route: '/blog/which-ai-model-tier-small-business-northwestern-ontario', chip: 'Tips',
    lines: [['Which AI model'], [{ grad: 'should you use' }, '?']],
    sub: 'Run the cheapest model that clears the bar. Save the flagship for the hard jobs.' },
  { slug: 'alberta-ai-code-audit-northwestern-ontario-government-lesson', route: '/blog/alberta-ai-code-audit-northwestern-ontario-government-lesson', chip: 'Perspective',
    lines: [['466M lines in'], [{ grad: '20 hours' }, '.']],
    sub: 'Alberta\'s AI audit killed the best excuse local institutions had for not starting.' },
  { slug: 'nohfc-workforce-development-internship-northern-ontario', route: '/blog/nohfc-workforce-development-internship-northern-ontario', chip: 'Funding',
    lines: [[{ grad: '$35,000' }], ['for a tech intern.']],
    sub: 'NOHFC subsidizes skilled tech and trades internship wages across Northern Ontario.' },
  { slug: 'nohfc-invest-north-innovation-rd-commercialization-northern-ontario', route: '/blog/nohfc-invest-north-innovation-rd-commercialization-northern-ontario', chip: 'Funding',
    lines: [[{ grad: '$2 million' }], ['for R&D.']],
    sub: 'NOHFC Invest North covers up to 50% of innovation and commercialization costs.' },
  { slug: 'signal-ai-funding-nwo-week-july-6-2026', route: '/blog/signal-ai-funding-nwo-week-july-6-2026', chip: 'News',
    lines: [['The Signal'], [{ grad: 'July 6' }, '.']],
    sub: 'Fable 5 is back, FedNor opens a $39M stream, and Northwest wildfires escalate.' },
  { slug: 'nohfc-invest-north-grow-expansion-northern-ontario', route: '/blog/nohfc-invest-north-grow-expansion-northern-ontario', chip: 'Funding',
    lines: [['Grants + loans'], ['to ', { grad: 'expand' }, '.']],
    sub: 'NOHFC Invest North — Grow: up to $1M for established Northern Ontario businesses.' },
  { slug: 'claude-sonnet-5-cheaper-ai-agents-nwo-business', route: '/blog/claude-sonnet-5-cheaper-ai-agents-nwo-business', chip: 'Models',
    lines: [['Sonnet 5 made'], [{ grad: 'cheaper agents' }, '.']],
    sub: 'But a tokenizer change eats the discount, and the cheap rate expires. Read the fine print.' },
  { slug: 'nohfc-invest-north-launch-new-business-northern-ontario', route: '/blog/nohfc-invest-north-launch-new-business-northern-ontario', chip: 'Funding',
    lines: [[{ grad: '$200,000' }], ['to start up.']],
    sub: 'NOHFC Invest North — Launch covers up to 50% of eligible startup costs.' },
  { slug: 'canada-ai-for-all-strategy-nwo-business', route: '/blog/canada-ai-for-all-strategy-nwo-business', chip: 'Government',
    lines: [['Canada\'s ', { grad: 'AI plan' }], ['for the North.']],
    sub: 'What the national AI strategy actually delivers for a Northwestern Ontario business.' },
  { slug: 'fednor-rtri-tariff-response-northern-ontario', route: '/blog/fednor-rtri-tariff-response-northern-ontario', chip: 'Funding',
    lines: [['Up to ', { grad: '$1M' }], ['for tariff hits.']],
    sub: 'FedNor\'s Regional Tariff Response Initiative — who qualifies, open through 2028.' },
  { slug: 'fednor-bsp-scale-up-productivity-northern-ontario', route: '/blog/fednor-bsp-scale-up-productivity-northern-ontario', chip: 'Funding',
    lines: [['Up to ', { grad: '$500K' }], ['to scale up.']],
    sub: 'FedNor\'s Business Scale-up and Productivity program — how it works and how to apply.' },
  { slug: 'signal-ai-funding-nwo-week-june-29-2026', route: '/blog/signal-ai-funding-nwo-week-june-29-2026', chip: 'News',
    lines: [['The Signal'], [{ grad: 'June 29' }, '.']],
    sub: 'OpenAI\'s first custom chip, local machinist training, and Ring of Fire construction.' },
  { slug: 'signal-ai-funding-nwo-week-june-28-2026', route: '/blog/signal-ai-funding-nwo-week-june-28-2026', chip: 'News',
    lines: [['The Signal'], [{ grad: 'June 28' }, '.']],
    sub: 'Ring of Fire clears its gate, Canada bets $2B on AI, and a US export ban lands.' },
  { slug: 'ai-becoming-governed-fable-shutdown-canada', route: '/blog/ai-becoming-governed-fable-shutdown-canada', chip: 'Government',
    lines: [['AI is now'], [{ grad: 'governed' }, '.']],
    sub: 'The Fable 5 shutdown, and what it means for Canadian businesses downstream.' },
  { slug: 'raii-vs-bbaa-which-grant-northwestern-ontario', route: '/blog/raii-vs-bbaa-which-grant-northwestern-ontario', chip: 'Funding',
    lines: [['RAII vs BBAA:'], ['which ', { grad: 'grant' }, '?']],
    sub: 'Two Northwest AI programs, side by side — which one fits which business.' },
  { slug: 'ai-for-thunder-bay-businesses-2026', route: '/blog/ai-for-thunder-bay-businesses-2026', chip: 'Tips',
    lines: [['AI in Thunder Bay,'], [{ grad: '2026' }, '.']],
    sub: 'Skip the hype. The AI moves that pay off in 2026 — and how to fund them.' },
  { slug: 'chatgpt-vs-claude-canadian-small-business', route: '/blog/chatgpt-vs-claude-canadian-small-business', chip: 'Models',
    lines: [['ChatGPT vs Claude'], ['for ', { grad: 'Canada' }, '.']],
    sub: 'Two things decide it: fit for the job, and where your data goes.' },
  { slug: 'openclaw-ai-agent-northwest-business', route: '/blog/openclaw-ai-agent-northwest-business', chip: 'Tools',
    lines: [['OpenClaw:'], ['the ', { grad: 'AI agent' }, '.']],
    sub: 'The open-source agent that acts on your computer, not just answers questions.' },
  { slug: 'ai-in-google-workspace-northwest-business', route: '/blog/ai-in-google-workspace-northwest-business', chip: 'Tools',
    lines: [['AI is now in'], [{ grad: 'Workspace' }, '.']],
    sub: 'If you pay for Google Workspace, Gemini is already in your tools. Here\'s what it does.' },
  { slug: 'ai-agents-vs-chatbots-difference', route: '/blog/ai-agents-vs-chatbots-difference', chip: 'Explainer',
    lines: [['Agents vs'], [{ grad: 'chatbots' }, '.']],
    sub: 'Chatbots respond; agents act on your behalf — and that distinction matters.' },
  { slug: 'vibe-coding-what-it-means-for-business', route: '/blog/vibe-coding-what-it-means-for-business', chip: 'Explainer',
    lines: [[{ grad: 'Vibe coding' }], ['explained.']],
    sub: 'Can you build software just by describing it? Yes — within limits that matter.' },
  { slug: 'ai-and-jobs-northwestern-ontario', route: '/blog/ai-and-jobs-northwestern-ontario', chip: 'Workforce',
    lines: [['AI and jobs'], ['in the ', { grad: 'North' }, '.']],
    sub: 'What\'s hype, what\'s real, and how to stay ahead — grounded, not the loudest headline.' },
  { slug: 'ai-and-robotics-northern-industry', route: '/blog/ai-and-robotics-northern-industry', chip: 'Robotics',
    lines: [['AI + robotics'], ['for ', { grad: 'industry' }, '.']],
    sub: 'The real story is quieter than humanoid hype — and more immediate for the North.' },
  { slug: 'bbaa-ai-adoption-grant-northwestern-ontario', route: '/blog/bbaa-ai-adoption-grant-northwestern-ontario', chip: 'Funding',
    lines: [['Up to ', { grad: '$20K' }], ['to adopt AI.']],
    sub: 'NOIC\'s BBAA covers up to 50% of an AI project — but it starts with a plan.' },
  { slug: 'practical-ai-uses-nwo-business-this-quarter', route: '/blog/practical-ai-uses-nwo-business-this-quarter', chip: 'Tips',
    lines: [['Practical AI,'], [{ grad: 'this quarter' }, '.']],
    sub: 'Concrete, low-risk ways a local business can put AI to work — start this week.' },
  { slug: 'choose-an-ai-model-without-the-hype', route: '/blog/choose-an-ai-model-without-the-hype', chip: 'Models',
    lines: [['Pick an AI model,'], ['skip the ', { grad: 'hype' }, '.']],
    sub: 'A practical way to choose the right AI for a real task — without chasing benchmarks.' },
  { slug: 'ai-in-nwo-public-sector-where-it-fits', route: '/blog/ai-in-nwo-public-sector-where-it-fits', chip: 'Government',
    lines: [['AI in the'], [{ grad: 'public sector' }, '.']],
    sub: 'Where it genuinely helps Northwest municipalities, where it doesn\'t, and the guardrails.' },
  { slug: 'fednor-raii-who-qualifies-thunder-bay', route: '/blog/fednor-raii-who-qualifies-thunder-bay', chip: 'Funding',
    lines: [['FedNor RAII:'], ['who ', { grad: 'qualifies' }, '?']],
    sub: 'A $200M AI-adoption wave across the North — who it\'s for, and what to have ready.' },
  { slug: 'noic-costarter-accelerator-readiness', route: '/blog/noic-costarter-accelerator-readiness', chip: 'Programs',
    lines: [['Costarter:'], ['the ', { grad: 'accelerator' }, '.']],
    sub: 'The Northwest\'s startup accelerator — non-dilutive seed funding, and how to be ready.' },
  { slug: 'fund-a-custom-ai-build-with-a-grant', route: '/blog/fund-a-custom-ai-build-with-a-grant', chip: 'Playbook',
    lines: [['Fund AI with a'], [{ grad: 'grant' }, ', not cash.']],
    sub: 'For the right Northern Ontario business, a custom build can be grant-funded.' },

  // Fallback for any unmapped route (used only if a blog slug has no card yet).
  { slug: 'default', route: '__default__', chip: 'Thunder Bay AI',
    lines: [['Thunder Bay AI.'], ['The ', { grad: 'signal' }, '.']],
    sub: 'An autonomous AI intelligence hub for Northwestern Ontario.' },
];

// Render a headline (array of lines) to HTML for the coded card layer.
export function renderHeadline(lines) {
  return lines.map((segs) => {
    const inner = segs.map((s) =>
      typeof s === 'string' ? esc(s) : `<span class="grad">${esc(s.grad)}</span>`
    ).join('');
    return `<div class="hl">${inner}</div>`;
  }).join('');
}

// Flatten a headline to plain text (for the image alt attribute).
export function flattenHeadline(lines) {
  return lines.map((segs) =>
    segs.map((s) => (typeof s === 'string' ? s : s.grad)).join('')
  ).join(' ').replace(/\s+/g, ' ').trim();
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
