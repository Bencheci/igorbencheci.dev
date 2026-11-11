# Deploying igorbencheci.dev (Firebase Hosting on GCP)

The site is a static Astro build (`dist/`) served by **Firebase Hosting** in the personal GCP
project **`wp-habit`**: Google's global CDN, free managed TLS, apex domain support, atomic
releases with one-command rollback, and 7-day preview URLs. It costs nothing at this size (free
Spark quota: 10 GB stored, 360 MB/day transfer).

It gets its own Hosting site, `igorbencheci-dev` (`https://igorbencheci-dev.web.app`), so the
project's default site (`wp-habit.web.app`) is never touched.

## Safety

This Mac's default gcloud configuration is a **work** account and project. The scripts never use or
change it: `deploy/lib.sh` pins every `gcloud` call to the personal account (`GCP_ACCOUNT` in the git-ignored `deploy/config.local.sh`) / `wp-habit` with
`CLOUDSDK_CORE_ACCOUNT` / `CLOUDSDK_CORE_PROJECT`, passes `--account` / `--project` to every
`firebase` call, and stops if the account or project is anything else. Settings live in
`deploy/config.sh` (plus `deploy/config.local.sh`); `.firebaserc` maps the `site` target in `firebase.json` to the site id.

## Domain

The site lives at **`https://www.igorbencheci.dev`** (the `site` in `astro.config.mjs`, so canonicals,
sitemap and schema all use www). DNS is on Cloudflare (nameservers moved from Porkbun, which is still
the registrar).

- `www` → `CNAME igorbencheci-dev.web.app`, **DNS only** (grey cloud). Firebase serves it and holds
  the certificate; proxying it through Cloudflare breaks the certificate renewal.
- `igorbencheci.dev` (bare) → redirected by Cloudflare, never reaches Firebase. In Cloudflare:
  1. DNS: an `A` record `@` → `192.0.2.1`, **Proxied** (orange cloud). The address is a placeholder;
     the redirect answers before any origin is contacted.
  2. Rules → Redirect Rules → Create rule: *Hostname equals `igorbencheci.dev`* → Dynamic,
     expression `concat("https://www.igorbencheci.dev", http.request.uri.path)`, status **301**,
     preserve query string.

## One-time setup

```bash
firebase login                     # sign the firebase CLI in with your personal Google account
cp deploy/config.local.example.sh deploy/config.local.sh   # then set GCP_ACCOUNT
deploy/setup.sh                    # dry run: shows what it would create
deploy/setup.sh --apply            # creates the Hosting site, attaches www.igorbencheci.dev
deploy/deploy.sh --prod            # first release
deploy/dns.sh                      # the DNS records Firebase wants, and cert status
```

## Every release

```bash
deploy/deploy.sh                   # build + deploy to a 7-day preview URL to check first
deploy/deploy.sh --prod            # build + deploy to igorbencheci.dev
deploy/deploy.sh --dry-run         # build + checks only
deploy/rollback.sh                 # put the previous release back live
```

Firebase clears its CDN on each release. Caching and security headers are in `firebase.json`:
HTML, XML and JSON revalidate on every visit (10 minutes at the edge), fonts and images are kept
30 days in browsers, and anything under `/_astro/` (hashed names) is immutable.
