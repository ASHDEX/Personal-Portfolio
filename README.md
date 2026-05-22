# Personal Portfolio

Live: [personal-portfolio-six-mauve-82.vercel.app](https://personal-portfolio-six-mauve-82.vercel.app)

Personal portfolio site built with Next.js 14 App Router, TypeScript, and Tailwind CSS — deployed on Vercel. Covers professional experience, certifications, security projects, skills, and a boot-sequence landing animation.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (98.4%) |
| Styling | Tailwind CSS + PostCSS |
| Deployment | Vercel (Production) |
| Config | next.config.ts, tsconfig.json, tailwind.config.ts |

## Project Structure

```
Personal-Portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, metadata
│   │   ├── page.tsx            # Entry point, section assembly
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── BootSequence.tsx    # Terminal-style landing animation
│   │   ├── Hero.tsx            # Hero / intro section
│   │   ├── Navigation.tsx      # Top navigation bar
│   │   ├── TopBar.tsx          # Status bar component
│   │   ├── Experience.tsx      # Work experience timeline
│   │   ├── Certifications.tsx  # Security certifications (CISSP, CISM, etc.)
│   │   ├── Skills.tsx          # Technical skills (merged GRC)
│   │   ├── GRC.tsx             # Governance, Risk & Compliance section
│   │   ├── Projects.tsx        # Security / dev projects
│   │   ├── CaseStudies.tsx     # In-depth case studies
│   │   ├── Pursuing.tsx        # Certifications currently in progress
│   │   ├── Contact.tsx         # Contact section
│   │   ├── Footer.tsx          # Footer
│   │   ├── ScrollReveal.tsx    # Scroll-triggered reveal animations
│   │   └── SectionHeader.tsx   # Reusable section header
│   ├── data/                   # Structured content data
│   ├── lib/                    # Utility functions
│   └── types/                  # TypeScript type definitions
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.js
└── tsconfig.json
```

## Sections

- **Boot Sequence** — Terminal-style animation on first load
- **Experience** — Professional security and engineering roles
- **Certifications** — CISSP, CISM, CompTIA Security+, CySA+, PenTest+, and more
- **Skills** — Technical skills covering security architecture, GRC, IR, cloud
- **Projects** — Hands-on security and development projects
- **Case Studies** — Detailed security case studies
- **Pursuing** — Certifications and training currently in progress

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run start
```
