# RoadGuardian AI — Agent Operating Instructions

## Mission
Build and maintain an accessible, responsive, no-authentication proof-of-concept for **RoadGuardian AI — Malaysia's 5G-Connected Road Safety Intelligence Network**, aligned with Track 2 (5G Connected & Safe Last-Mile Mobility) of Cyberjaya 5G Future Talent Innovation Challenge 2026.

## Non-negotiable constraints
- Do not add signup, login, accounts, passwords, API keys, payments, or personal profiles.
- Do not imply the demo detects actual road users, hazards or crashes. Prominently label every scenario, event, risk score and network latency **SIMULATED**.
- Do not route messages to police, emergency services, road controllers or external recipients. Never actuate real traffic lights.
- Do not claim crash prevention efficacy, 5G connectivity, machine learning model accuracy or measured network performance without independent validation.
- Default to privacy by design. No camera streams, facial recognition, plate recognition, geolocation collection, or personally identifying information in the prototype.
- Keep the MVP runnable locally without dependencies or external APIs. Use semantic HTML, keyboard access, reduced-motion support and mobile-first CSS.
- Avoid relying on color alone to encode risk. Use text labels and icons too.

## Repository structure
- `app/index.html` — interface shell
- `app/styles.css` — design system and responsive layouts
- `app/main.js` — scenarios, event engine, dashboard interactions, local persistence and CSV export
- `server.py` — optional no-dependency local HTTP server
- `docs/PRODUCT_REQUIREMENTS.md` — target users, user journeys, acceptance criteria
- `docs/ARCHITECTURE.md` — technology, data flow, privacy and future integration
- `docs/AGENT_TASKS.md` — sequenced development plan, completion checklist
- `docs/INNOVATION_CANVAS.md` — competition submission structure
- `docs/TEST_PLAN.md` — manual checks and risk controls

## Development workflow
1. Read README, product requirements, architecture, and testing instructions before changing code.
2. Make small, reversible changes. Prioritize a working demo over speculative infrastructure.
3. Treat road safety as safety-critical: simulation-only until validated by qualified authorities.
4. Add visible explanation of 'Why 5G' — low-latency event distribution across many roadside sensors — without fake claims of being connected.
5. Test mobile screens, keyboard focus, invalid input and empty-event states.
6. State implementation limitations in release notes.

## MVP acceptance criteria
- Site opens directly into a public dashboard without authentication.
- Distinct scenarios: Normal Flow, Pedestrian Conflict, Motorcycle Blind Spot, Heavy Rain, School-Zone Congestion.
- Start/pause simulation and manually inject scenario events.
- Live illustration, incident timeline, risk state, sensor statuses and demo analytics update coherently.
- Acknowledge/resolve incidents (demo only), filter timeline, download CSV of simulated events.
- All controls are usable via keyboard; no external dependencies; mobile usable.
- Reset demo state and clearly disclose simulation scope.

## Suggested agent prompt
"Follow AGENTS.md and docs/AGENT_TASKS.md to extend the working RoadGuardian AI prototype. Preserve the no-login, local-only and simulated-data constraints. Implement and validate requested features, document limitations, and do not use real emergency integration."
