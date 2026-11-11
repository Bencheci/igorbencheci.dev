#!/usr/bin/env bash
# Build the site and publish it to Firebase Hosting (GCP project wp-habit).
#
#   deploy/deploy.sh                 build, then deploy to a 7-day preview URL (safe to share for review)
#   deploy/deploy.sh --preview NAME  same, with a named preview channel
#   deploy/deploy.sh --prod          build, then deploy to the live site (igorbencheci.dev)
#   deploy/deploy.sh --dry-run       build and run the guard only, publish nothing
#   add --skip-build to any of these to reuse the current dist/
#
# Firebase invalidates its CDN on every release, so no cache purge step is needed.
# Roll back: deploy/rollback.sh

source "$(dirname "$0")/lib.sh"

MODE="preview"; CHANNEL="review"; BUILD=1
while (( $# )); do
  case "$1" in
    --prod) MODE="prod" ;;
    --preview) MODE="preview"; CHANNEL="${2:?channel name}"; shift ;;
    --dry-run) MODE="dry" ;;
    --skip-build) BUILD=0 ;;
    -h|--help) sed -n '2,12p' "$0"; exit 0 ;;
    *) die "unknown option $1" ;;
  esac
  shift
done

guard
check_target
[[ "$MODE" == "dry" ]] || guard_firebase

if (( BUILD )); then
  say "Building (astro check + astro build)"
  (cd "$SITE_DIR" && { [[ -d node_modules ]] || npm ci; } && npm run build)
fi
[[ -f "$SITE_DIR/dist/index.html" ]] || die "dist/index.html missing, build first"
[[ -f "$SITE_DIR/dist/404.html" ]] || say "warning: dist/404.html missing, Firebase will show its own 404"
say "dist/: $(find "$SITE_DIR/dist" -type f | wc -l | tr -d ' ') files, $(du -sh "$SITE_DIR/dist" | cut -f1)"

case "$MODE" in
  dry)
    say "Dry run: nothing published" ;;
  preview)
    say "Deploying to preview channel '$CHANNEL' (expires in 7 days)"
    fb hosting:channel:deploy "$CHANNEL" --only site --expires 7d ;;
  prod)
    msg="$(date -u +%Y-%m-%dT%H:%MZ)"
    git -C "$SITE_DIR" rev-parse --short HEAD >/dev/null 2>&1 && msg="$msg $(git -C "$SITE_DIR" rev-parse --short HEAD)"
    say "Deploying to the live site ($DOMAIN, https://$SITE_ID.web.app)"
    fb deploy --only hosting:site --message "$msg"
    say "Check: curl -sI https://$DOMAIN/ | head -5" ;;
esac
