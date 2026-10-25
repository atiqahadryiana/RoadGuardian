# Test plan

## Automated smoke checks

1. Compile `server.py`; parse `app/main.js` with Node when available.
2. Start the local server and confirm `/`, `/styles.css`, and `/main.js` return HTTP 200.
3. Confirm the server policy includes `connect-src 'none'` and no external asset URLs exist.

## Functional checks

1. Open `app/index.html` directly and through `python server.py`; confirm no authentication screen or missing asset.
2. Select and inject all five scenarios; verify scenario, risk text, scene, latency, total, and log change coherently.
3. Start automatic simulation, wait for an event, pause, and confirm counts stop changing.
4. Change sensitivity; confirm wording remains illustrative and the risk label updates.
5. Search and filter severity/status combinations; verify accurate empty and populated states.
6. Acknowledge and resolve events; refresh and confirm local persistence.
7. Clear, reset, and refresh; verify consistent initial state.
8. Export populated and empty CSV files. Confirm `SIMULATED` appears and spreadsheet-formula prefixes are neutralised.

## Accessibility and responsive checks

1. Navigate every control by keyboard, including scenario buttons and event actions; confirm a visible focus indicator.
2. Verify headings, landmarks, labels, `aria-pressed`, live feedback, and meaningful button names with a screen reader.
3. Confirm risk is communicated by text and labels, not color alone.
4. Test at 360px, 768px, 1440px, 200% zoom, and landscape mobile.
5. Enable reduced motion and confirm the hazard pulse and smooth scrolling stop without loss of function.

## Safety and privacy checks

1. Search visible copy and CSV for clear simulation labels on scenarios, events, sensors, risk, and latency.
2. Disconnect the internet and refresh; confirm full functionality.
3. Confirm no camera, microphone, geolocation, notification, storage-server, or third-party request.
4. Confirm no UI claims real AI accuracy, crash prevention, live 5G, measured latency, dispatch, or traffic-light control.
