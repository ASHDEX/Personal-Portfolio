# SOC Wall redesign

## Goal
Replace the generic "hacker terminal" look with a distinctive, senior-level SEC-OPS identity for recruiters (30-second scan) and senior technical reviewers (depth). Keep the terminal / live-ops concept; make it more immersive.

## Decisions
- **World:** the ops floor's video wall (chosen over packet-capture and seven-segment directions). Dossier on the centre screen; monitors in bezels; dark ground, instrument cyan, semantic red/amber.
- **No AI-template devices:** no fake scanlines, glitch text, pulsing dots, invented IOCs or big-number KPI tiles. All figures come from `src/data`.
- **3D (Three.js):** network terrain with sonar ping; radar with beacon markers (light beam, diamond node, ground target, shockwave on sweep); ATT&CK block matrix; kill chain as an energy conduit through eight stages, each a molecule that turns from threat-red to contained-cyan, with bloom.
- **Motion borrowed from lusion.co, translated to security:** decrypting headings, target-lock brackets, scroll-scrubbed escalation radar, ">_" chevron page fold, packet cursor trail, inertial scroll.
- **Loader:** secure-boot handshake. Hex counter 0x00→0x64 with bit readout, per-visit session key as hex dump, ssh-keygen randomart, resolving SHA-256 fingerprint, kernel-style log, ACCESS GRANTED.
- **Structure:** the original ten sections become ten pages, always reachable from a plain-English page bar, plus a ⌘K index and prev/next links. `#page` deep links work.

## Delivery
Static export (`output: 'export'`) on Hostinger. A GitHub Action builds on push to `main` and publishes `out/` to the `hostinger` branch for Hostinger Git deploy.

## Follow-ups
- Merge the six WebGL contexts into one shared renderer for performance on low-end devices.
- Server-render the page content (currently filled client-side from the same data) for crawlers that do not run JavaScript.
- Confirm the years-of-experience figure (PRODUCT.md open decision).
