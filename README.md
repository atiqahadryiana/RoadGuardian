# RoadGuardian AI

**Malaysia's 5G-Connected Road Safety Intelligence Network — simulation-only concept prototype**

RoadGuardian AI is a polished, no-login, dependency-free demonstrator for Track 2 of the Cyberjaya 5G Future Talent Innovation Challenge 2026. It uses fictional road scenarios, synthetic sensor states, illustrative risk labels, and simulated latency. It does not perform live detection, connect to 5G, identify road users, control traffic systems, or contact emergency services.

## Run locally

Open `app/index.html` directly, or run `python server.py` and visit `http://localhost:8000`.

## Deploy to Vercel

The production static site is the `app/` directory. From the repository root, run `npx vercel app --prod`, or import the repository in Vercel and set **Root Directory** to `app`. No build command, environment variable, or external service is required.

## Three-minute judge walkthrough

1. Confirm the persistent **Simulation mode** disclosures and privacy boundary.
2. Choose **Watch guided demo** for the four-stage, 16-second simulated workflow.
3. Inspect the synthetic risk state, junction, mock sensor nodes, illustrative delivery step, and operator queue.
4. Compare **Motorcycle blind spot**, **Heavy tropical rain**, and **School-zone congestion** manually.
5. Acknowledge and resolve a demo event, use search/severity/status filters, and download the CSV.
6. Review **Why explore 5G?**, the concept signal path, and the safe deployment path.

## Prototype capabilities

- Public dashboard with no authentication, account, API key, or external service
- Five Malaysia-relevant simulated scenarios
- Accessible guided demonstration connecting observation, assessment, simulated delivery, and human review
- Animated synthetic junction with scenario-specific vehicle, motorcycle, pedestrian, congestion, and rain motion plus pause/play control
- Manual and automatic synthetic event generation
- Coherent junction illustration, risk state, sensor list, and incident work queue
- Local acknowledge/resolve actions, filters, persistence, reset, and spreadsheet-safe CSV export
- Mobile-first responsive layout, semantic HTML, visible keyboard focus, live status feedback, and reduced-motion support
- Local-only browser storage and a server policy that blocks outbound connections

## Documentation

- [Product requirements](docs/PRODUCT_REQUIREMENTS.md)
- [Architecture and safety boundary](docs/ARCHITECTURE.md)
- [Implementation roadmap](docs/AGENT_TASKS.md)
- [Innovation canvas](docs/INNOVATION_CANVAS.md)
- [Test plan](docs/TEST_PLAN.md)
- [Release notes](docs/RELEASE_NOTES.md)

## Limitations

This is a communication prototype, not a functioning AI model, physical IoT deployment, live camera system, or actual 5G implementation. Any real pilot would require authority approval, independently validated models, privacy and security review, measured network testing, fail-safe engineering, accessibility research, and supervised field trials.
