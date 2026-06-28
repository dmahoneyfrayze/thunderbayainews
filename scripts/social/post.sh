#!/usr/bin/env bash
# post.sh <outDir> <accountId> <carouselISO> [reelISO]
# Uploads the generated set to GHL media and SCHEDULES a multi-image carousel (+ the reel
# video) to one IG account via the GHL Social Planner. Scheduled, never instant — there is
# always a review buffer in the planner. curl-only (Cloudflare WAF 403s other UAs).
set -uo pipefail
set -a; source /Users/denismahoney/Denisbot/.env 2>/dev/null; set +a
: "${GHL_API_KEY:?missing}"; : "${GHL_LOCATION_ID:?missing}"
BASE="https://services.leadconnectorhq.com"
H=(-H "Authorization: Bearer $GHL_API_KEY" -H "Version: 2021-07-28" -H "Accept: application/json")
JH=("${H[@]}" -H "Content-Type: application/json")
USERID="${GHL_USER_ID:-XjPm8fTrVnu3fFtQRAKT}"
OUT="${1:?outDir}"; ACCT="${2:?accountId}"; SCHED="${3:?carouselISO}"; REELSCHED="${4:-}"
CAP_CAROUSEL=$(jq -r '.carousel // ""' "$OUT/captions.json")
CAP_REEL=$(jq -r '.reel // ""' "$OUT/captions.json")

upload(){ curl -s "$BASE/medias/upload-file" "${H[@]}" -F "file=@${1}" -F "hosted=false" -F "name=${2}" -F "locationId=${GHL_LOCATION_ID}" 2>/dev/null | jq -r '.url // .fileUrl // empty'; }
post(){ # payload-json -> "HTTP code id"
  local resp; resp=$(curl -s -w '\n%{http_code}' "${JH[@]}" -X POST "$BASE/social-media-posting/${GHL_LOCATION_ID}/posts" -d "$1" 2>/dev/null)
  local code; code=$(echo "$resp" | tail -1)
  local body; body=$(echo "$resp" | sed '$d')
  local id; id=$(echo "$body" | jq -r '.results.post._id // .results.post.id // empty' 2>/dev/null)
  echo "HTTP $code id=${id:-NONE}"
  [ "$code" = "200" ] || [ "$code" = "201" ] || echo "  $(echo "$body" | head -c 300)" >&2
}

# ---- carousel ----
media='[]'
for f in "$OUT"/carousel-*.png; do
  jpg="${f%.png}.jpg"; sips -s format jpeg "$f" --out "$jpg" >/dev/null 2>&1
  url=$(upload "$jpg" "tbai-$(basename "$jpg")")
  if [ -n "$url" ]; then media=$(echo "$media" | jq --arg u "$url" '. + [{url:$u, type:"image/jpeg"}]'); echo "  + $(basename "$jpg")" >&2; else echo "  ! upload failed $(basename "$jpg")" >&2; fi
done
echo "carousel: $(echo "$media" | jq 'length') images uploaded" >&2
payload=$(jq -n --argjson m "$media" --arg s "$CAP_CAROUSEL" --arg u "$USERID" --arg a "$ACCT" --arg d "$SCHED" \
  '{accountIds:[$a], summary:$s, type:"post", userId:$u, media:$m, status:"scheduled", scheduleDate:$d, scheduleTimeUpdated:true}')
echo -n "carousel post -> "; post "$payload"

# ---- reel (video) ----
if [ -n "$REELSCHED" ] && [ -f "$OUT/reel.mp4" ]; then
  rurl=$(upload "$OUT/reel.mp4" "tbai-reel-$(basename "$OUT").mp4")
  if [ -n "$rurl" ]; then
    rpayload=$(jq -n --arg u2 "$rurl" --arg s "$CAP_REEL" --arg u "$USERID" --arg a "$ACCT" --arg d "$REELSCHED" \
      '{accountIds:[$a], summary:$s, type:"post", userId:$u, media:[{url:$u2, type:"video/mp4"}], status:"scheduled", scheduleDate:$d, scheduleTimeUpdated:true}')
    echo -n "reel post -> "; post "$rpayload"
  else echo "reel: upload failed" >&2; fi
fi
