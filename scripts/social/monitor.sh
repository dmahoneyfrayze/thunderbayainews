#!/usr/bin/env bash
# monitor.sh — Thunder Bay AI social feedback loop.
# Pulls engagement (like/share/comment) for every posted IG item from GHL, appends a dated
# snapshot to stats-history.jsonl, and writes brief.txt: what's working by format/topic/hook.
# This is the measurement half of the optimize-toward-viral loop — it feeds next week's spec.
# Reads posts-log.jsonl (one JSON/line: {id,type,iso,topic,hook}), written by run.sh on each post.
set -uo pipefail
export PATH="/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"
set -a; source /Users/denismahoney/Denisbot/.env 2>/dev/null; set +a
: "${GHL_API_KEY:?}"; : "${GHL_LOCATION_ID:?}"
SOCIAL="/Users/denismahoney/Desktop/thunder-bay-ai/scripts/social"
LOG="$SOCIAL/posts-log.jsonl"; HIST="$SOCIAL/stats-history.jsonl"; BRIEF="$SOCIAL/brief.txt"
BASE="https://services.leadconnectorhq.com"
H=(-H "Authorization: Bearer $GHL_API_KEY" -H "Version: 2021-07-28" -H "Accept: application/json")
[ -f "$LOG" ] || { echo "no posts-log.jsonl yet — nothing to monitor"; exit 0; }
NOW=$(date -u +%Y-%m-%dT%H:%M:%SZ)
rows=""
while IFS= read -r line; do
  [ -z "$line" ] && continue
  id=$(echo "$line" | jq -r '.id'); type=$(echo "$line" | jq -r '.type'); topic=$(echo "$line" | jq -r '.topic // ""'); hook=$(echo "$line" | jq -r '.hook // ""')
  post=$(curl -s "$BASE/social-media-posting/${GHL_LOCATION_ID}/posts/${id}" "${H[@]}" 2>/dev/null)
  ins=$(echo "$post" | jq -c '.results.post.insights // {}'); status=$(echo "$post" | jq -r '.results.post.status // "?"')
  like=$(echo "$ins" | jq -r '.like // 0'); share=$(echo "$ins" | jq -r '.share // 0'); comment=$(echo "$ins" | jq -r '.comment // 0')
  eng=$(( like + share + comment ))
  echo "{\"ts\":\"$NOW\",\"id\":\"$id\",\"type\":\"$type\",\"topic\":\"$topic\",\"status\":\"$status\",\"like\":$like,\"share\":$share,\"comment\":$comment,\"eng\":$eng}" >> "$HIST"
  rows+="$eng\t$type\t$status\t$like/$share/$comment\t$topic | $hook\n"
done < "$LOG"

{
  echo "Thunder Bay AI — social brief ($NOW)"
  echo "=================================================="
  n=$(wc -l < "$LOG" | tr -d ' '); echo "Tracked posts: $n"
  echo ""
  echo "TOP BY ENGAGEMENT (like+share+comment):"
  printf "$rows" | sort -rn | head -10 | awk -F'\t' '{printf "  %3d  %-9s %-10s %-8s %s\n",$1,$2,$3,$4,$5}'
  echo ""
  echo "BY FORMAT (avg engagement):"
  printf "$rows" | awk -F'\t' '$2!=""{a[$2]+=$1;c[$2]++} END{for(k in a)printf "  %-9s %.1f avg over %d\n",k,a[k]/c[k],c[k]}'
  echo ""
  pub=$(grep -c '"status":"published"\|"status":"posted"' "$HIST" 2>/dev/null || echo 0)
  echo "NOTE: engagement is ~0 until posts publish + accumulate impressions. On a new account"
  echo "this compounds over weeks — read the trend in stats-history.jsonl, not one snapshot."
  echo "Next move: whatever format/topic/hook leads here, lean the next spec.json toward it."
} > "$BRIEF"
cat "$BRIEF"
osascript -e "display notification \"social brief updated — $(wc -l < "$LOG" | tr -d ' ') posts tracked\" with title \"TBAI social monitor\"" 2>/dev/null || true
