You are generating the weekly Instagram social spec for Thunder Bay AI. Read the NEWEST post in src/data/posts.js (the most recent by `iso` — normally the weekly "Signal" news roundup; if the newest is not a News/Signal post, use the newest post whose category is "News"). From its h2 headlines and the paragraphs that follow them, pick the 5 most important stories.

Output ONLY a single JSON object — no prose, no markdown fences — matching this schema (consumed by scripts/social/generate.mjs):

{
  "iso": "<the Signal post's iso date>",
  "issueNo": "<2-digit weekly issue number; increment from the last one if you can infer it, else use the ISO week number>",
  "dateLabel": "<short, e.g. JUL 6>",
  "handle": "thunderbayai",
  "cover": {
    "hook": "<a SCROLL-STOPPING line: lead with the single most dramatic or surprising REAL story from the Signal. It MUST be true to the post. No clickbait that the content does not support.>",
    "sub": "<one curiosity-gap line teasing the rest, e.g. 'Plus <a second item>, and N more moves that matter for the Northwest this week.'>"
  },
  "reelSub": "<one short line>",
  "storySub": "<one short line: what it means for a Northwest business>",
  "items": [
    {
      "tag": "<one of: NATIONAL, MODEL WATCH, INFRASTRUCTURE, LOCAL, FUNDING, GOVERNMENT, TOOLS>",
      "big": "<a SHORT punchy keyword or number that is the visual hero of the slide, e.g. $2B, BLOCKED, $26B, RING OF FIRE. Prefer a real number/dollar figure from the story; otherwise one strong word.>",
      "bigSize": "<px: 180px for short tokens like $2B; 120px for one word like BLOCKED; 86px for long phrases like RING OF FIRE>",
      "title": "<the headline, tight>",
      "body": "<1-2 flashcard sentences — the essential what + so-what>",
      "tease": "<an open-loop pointing to the next story, e.g. 'Next: the model ban that hit Canada'. For the LAST item use 'The throughline ->'>",
      "reelLine": "<one short line for the reel version>"
    }
    /* exactly 5 items */
  ],
  "summary": {
    "title": "<the throughline of the week — what ties the stories together>",
    "body": "<1-2 sentences>"
  },
  "captions": {
    "carousel": "<the IG caption: a tight summary paragraph of the week, then a soft pointer ('link in bio'), then a line of 5-7 relevant hashtags. NO emojis. NO raw URL in the body.>",
    "reel": "<a short reel caption + 4-6 hashtags. No emojis.>",
    "story": "Story frame — add a poll sticker and a link sticker to thunderbayai.com."
  }
}

HARD RULES:
- Proof-integrity: every hook, keyword, and number MUST be true to the Signal post. Never invent a figure or overstate a story.
- NO emojis anywhere.
- Keep copy flashcard-tight. The cover must stop the scroll; the renderer adds the follow/comment/save CTA slide automatically.
- Output ONLY the JSON object.
