# Product requirements

## Product promise

RoadGuardian AI demonstrates how authorised mobility operators might receive earlier, privacy-conscious awareness of road-risk signals. The proof of concept is public, local, and explicitly simulated.

## Primary audiences

- Competition judges evaluating relevance, feasibility, safety, and responsible 5G use.
- Municipal and road-safety stakeholders exploring a read-only shadow pilot.
- Technical evaluators reviewing privacy, accessibility, and deployment assumptions.

## Core journey

Within three minutes, a visitor can understand the safety boundary, select one of five Malaysian road scenarios, inject an event, observe coherent dashboard changes, manage the simulated incident, export demo records, and understand why 5G may be explored.

## Functional acceptance criteria

- Opens directly to a public dashboard without authentication.
- Offers Normal Flow, Pedestrian Conflict, Motorcycle Blind Spot, Heavy Rain, and School-Zone Congestion scenarios.
- Starts, pauses, and manually injects synthetic events.
- Updates the schematic junction, risk state, latency, analytics, and incident log coherently.
- Searches and filters incidents by severity and status; acknowledges/resolves events locally; exports safe CSV.
- Persists demo settings and records only in local browser storage; reset restores the initial state.
- Explains the possible role of 5G without claiming a live connection or measured benefit.

## Safety and accessibility requirements

- Every risk, event, latency, sensor, and scenario context is labelled simulated or mock.
- No live imagery, personal data, geolocation, recognition, dispatch, traffic-light actuation, or external recipient.
- Risk uses text, shape, and labels in addition to color.
- All controls work with keyboard, have visible focus, and meet 44px target guidance for primary controls.
- Layout remains usable at 360px, 768px, 1440px, 200% zoom, and with reduced motion.

## Out of scope

Real sensor ingestion, AI inference, model-accuracy claims, operator authentication, cloud services, emergency integration, traffic control, and measured telecommunications performance.
