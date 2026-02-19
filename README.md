# Cybersecurity Portfolio (Hostinger-ready)

This project is implemented **only** with Hostinger-supported JavaScript stack components:

- **Next.js (App Router)**
- **React (functional components)**
- **Node.js runtime**
- **Tailwind CSS** (styling)

## Framework compliance

- No plain `.html` pages
- No EJS / Handlebars templates
- No Express/Nest backend runtime in this project
- All route pages are in `/app` as `.js` or `.jsx`

## Routes

- `/` Home
- `/projects`
- `/services`
- `/experience`
- `/certifications`
- `/about`
- `/contact`

## Run locally

```bash
npm install
npm run dev
```

## Production (Hostinger Node app)

```bash
npm install
npm run build
npm run start
```

Ensure the Node version in your Hostinger panel matches the `engines` field in `package.json`.

## Hostinger deployment quick check

After upload/deploy, verify the app responds on the configured Node port and that static assets load correctly from the Next.js build output.
