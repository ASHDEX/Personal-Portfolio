# Hostinger deployment fix for missing Next.js CSS (`/_next/static/*`)

This project is configured for standalone Node deployment via [`next.config.js`](next.config.js).

## 1) Build locally or on server

```bash
npm ci
npm run build
```

## 2) Upload/copy these artifacts to the server

Required folders/files:

- [`.next/standalone`](.next/standalone)
- [`.next/static`](.next/static)
- [`public`](public)
- [`package.json`](package.json)

Critical detail: `.next/static` must be present at runtime and publicly reachable as `/_next/static/...`.

## 3) Start command on Hostinger

Run from the deployed app root (where `.next/standalone/server.js` exists):

```bash
node .next/standalone/server.js
```

Do **not** rely on incomplete static export flow for this app.

## 4) Reverse proxy / rewrite rules

Ensure Hostinger/Nginx/Apache does **not** rewrite these to app routes:

- `/_next/static/*`
- `/_next/image*`
- `/favicon.ico`
- `/robots.txt`
- `/sitemap.xml`

These should be served directly.

## 5) Validate after deploy

From browser/network tools:

- HTML should include a CSS href like `/_next/static/css/<hash>.css`
- Request to that CSS URL must return `200` with `Content-Type: text/css`

If HTML loads but appears unstyled, this almost always means `/_next/static/*` is blocked/missing.

## 6) Clear cache/CDN

If old HTML references outdated CSS hashes, purge cache/CDN and hard refresh.
