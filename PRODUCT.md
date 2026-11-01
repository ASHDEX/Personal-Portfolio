# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences visit, usually from a LinkedIn profile, a CV link, or a referral:

- **Recruiters**, often non-technical, screening for senior security roles. They need role, level, and headline wins within about 30 seconds, plus an obvious way to make contact or get the CV.
- **Senior technical reviewers**: hiring managers, security leads, CISOs, and prospective consulting clients. They need depth that proves seniority: how incidents were investigated, how programs were designed, what the detections look like.

## Product Purpose

The personal portfolio of Jayesh Choudhary, Lead Security Engineer (ashdex.com). It positions him for **Security Architect**, **Staff / Principal Detection & Response Engineer**, and **Security Consultant / vCISO** roles. Success means a qualified visitor reaches out (briefing request, email, LinkedIn) or downloads the CV.

## Positioning

**Breadth across defensive domains.** He has done the work at depth in SOC operations, incident response, insider threat, cloud IR, DLP and data security, threat intelligence, and detection engineering, and has built whole programs (a full SOC and IR program in four weeks after a SWIFT fraud). Most senior candidates are deep in one of these. The site should make that span legible as one coherent operator rather than a list of tools.

## Operating Context

Visitors evaluate the site on desktop during screening and on phones from LinkedIn. Technical reviewers know the vocabulary of the field: MITRE ATT&CK, KQL and Sigma detections, MTTD/MTTR/MTTC, IR playbooks, severity models, regulator frameworks (SEBI, RBI, ISO 27001).

## Capabilities and Constraints

- Next.js 16 (App Router), React 19, Tailwind 3, framer-motion. Single page with sections; static export friendly (robots and sitemap are `force-static`).
- Content lives in typed data files under `src/data/` (experience, case studies, projects, certifications, pursuing certs, MITRE mapping, open-source repos, skills).
- Existing interactions to preserve in function: boot sequence, command palette (⌘K), theme variants, section navigation.
- **Brief (binding):** keep the SEC-OPS terminal / live-ops concept. The owner wants the redesign to be more dynamic and immersive than the current site, not calmer.
- **Open decision:** years of experience. The current hero says 5+; the experience timeline starts April 2019 (about 7 years). Confirm before launch.

## Brand Commitments

- Name and handle: Jayesh Choudhary, "Ashdex". Domain ashdex.com.
- The SEC-OPS terminal identity is the core idea of the site and must survive the redesign.

## Evidence on Hand

All confirmed real and shareable, including employer names and metrics:

- Experience with quantified outcomes: Payatu (↓70–80% manual triage, ↓35% MTTC, 95% endpoint compliance, ~400 endpoints under Purview DLP), Coralogix (↓40% MTTD, ↓35% MTTR, ↓30% false positives), Bank of America insider threat (↓25% exfil incidents, ↓30% IR time). `src/data/experience.ts`
- Case studies with scenario, investigation, response, impact, and real KQL detections: SWIFT BEC fraud and ground-up SOC build, BreachForums exposure with SilverFox C2, and more. `src/data/casestudies.ts`
- Projects with problem / approach / outcome. `src/data/projects.ts`
- 15 certifications including CISSP, CISM, CISA, SC-100, CCSK; pursuing CRISC and AAISM (2026). `src/data/certifications.ts`, `src/data/pursuing.ts`
- Open source: FreeIntelhub; blog dailydoesofcybersecuritynews.com. `src/lib/constants.ts`

Absent and not to be fabricated: testimonials, client logos, employer endorsements, follower counts.

## Product Principles

1. **Seniority is shown through scope and outcomes.** Programs built, audits passed, and measured reductions lead; tool lists support.
2. **Breadth reads as one operator.** Every domain connects back to the same defender, not a scatter of badges.
3. **Proof over claims.** Real detections, real timelines, real numbers. Anything illustrative is labeled.
4. **Two speeds.** The recruiter's 30-second scan and the reviewer's deep read are both first-class.
5. **The terminal is the medium, not decoration.** Immersion should carry real information.

## Accessibility & Inclusion

Respect `prefers-reduced-motion` across all ambient effects; keep content readable without animation; keyboard access for the command palette and all interactive panels.
