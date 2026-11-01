# Ashdex · Jayesh Choudhary

Live: [ashdex.com](https://ashdex.com)

Portfolio of Jayesh Choudhary, Lead Security Engineer. The site is built as a SOC video wall: a secure-boot loader, a 3D engagement radar, an ATT&CK kill chain you scroll through, and ten pages that switch with a terminal-chevron transition.

## Pages

| # | Page | Content source |
|---|------|----------------|
| 01 | About (the wall) | dossier, radar, record feed, ATT&CK blocks, measured results |
| 02 | Experience | `src/data/experience.ts` |
| 03 | Case studies | `src/data/casestudies.ts` |
| 04 | ATT&CK coverage | `src/data/mitre.ts` + 3D kill chain |
| 05 | Skills | `src/data/skills.ts` |
| 06 | Projects | `src/data/projects.ts` |
| 07 | Certifications | `src/data/certifications.ts` |
| 08 | In progress | `src/data/pursuing.ts` |
| 09 | Open source | `src/data/repos.ts` |
| 10 | Contact | `src/data/contacts.ts` |

Edit the data files to change content; the pages read them directly.

## Stack

- Next.js 16 (App Router) with `output: 'export'` for a fully static site
- Three.js (radar, ATT&CK matrix, kill chain with bloom, terrain), GSAP + ScrollTrigger, Lenis smooth scroll
- `src/components/SocWall.tsx` renders the markup; `src/lib/socwall/engine.js` runs the scenes and interactions
- Respects `prefers-reduced-motion`

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```

## Deploy (Hostinger)

The workflow in `deploy/deploy-hostinger.yml` builds the site on every push to `main` and publishes `out/` to the `hostinger` branch. Hostinger's Git deployment pulls that branch into `public_html`.

**Enable the workflow once:** on github.com open the repo → Add file → Create new file, name it `.github/workflows/deploy-hostinger.yml`, paste the contents of `deploy/deploy-hostinger.yml`, and commit to `main`. (Creating it in the browser avoids the `workflow` token scope that command-line pushes need.)

One-time setup in hPanel → Websites → Advanced → **Git**:

1. Repository: `https://github.com/ASHDEX/Personal-Portfolio.git`
2. Branch: **`hostinger`** (not `main`; Hostinger cannot run the Next.js build)
3. Install path: leave empty to deploy into `public_html`
4. Turn on **Auto deployment** and add the webhook URL Hostinger shows to the GitHub repo (Settings → Webhooks), so each publish deploys automatically.

`public/.htaccess` ships with the build: HTTPS redirect, 404 page, security headers and long-lived caching for hashed assets.
