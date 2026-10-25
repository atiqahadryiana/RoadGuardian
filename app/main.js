/* RoadGuardian AI — local simulation only. No live detection, networking, dispatch, or actuation. */
(() => {
  'use strict';

  const STORAGE_KEY = 'roadguardian-demo-v2';
  const MAX_EVENTS = 120;
  const scenarios = [
    { id: 'normal', symbol: 'N', name: 'Normal flow', short: 'Low-risk baseline', description: 'Vehicles and pedestrians move through a fictional junction with no simulated conflict.', severity: 'advisory', event: 'Routine traffic observation', detail: 'Synthetic traffic conditions indicate normal movement.', latency: 24 },
    { id: 'pedestrian', symbol: 'P', name: 'Pedestrian conflict', short: 'Crosswalk proximity', description: 'A modelled pedestrian path overlaps with an approaching vehicle path near a marked crossing.', severity: 'critical', event: 'Pedestrian crossing conflict', detail: 'Illustrative pedestrian and vehicle paths overlap near the marked crossing.', latency: 18 },
    { id: 'motorcycle', symbol: 'M', name: 'Motorcycle blind spot', short: 'Mixed-traffic interaction', description: 'A motorcycle is represented near a turning vehicle to illustrate a Malaysia-relevant visibility risk.', severity: 'critical', event: 'Motorcycle proximity warning', detail: 'Synthetic motorcycle movement intersects a turning-vehicle risk zone.', latency: 21 },
    { id: 'rain', symbol: 'R', name: 'Heavy tropical rain', short: 'Reduced visibility', description: 'Synthetic rainfall reduces illustrated visibility and raises caution around the crossing.', severity: 'warning', event: 'Reduced visibility in heavy rain', detail: 'Synthetic environmental data indicates heavy-rain conditions.', latency: 29 },
    { id: 'school', symbol: 'S', name: 'School-zone congestion', short: 'Higher activity', description: 'A fictional pickup period increases represented pedestrian and vehicle density near a school zone.', severity: 'warning', event: 'High activity near education zone', detail: 'Synthetic traffic volume and pedestrian presence exceed demo thresholds.', latency: 26 }
  ];
  const sensors = [
    { code: 'S1', name: 'Vision sensor', detail: 'Synthetic object categories' },
    { code: 'S2', name: 'Radar unit', detail: 'Synthetic movement estimates' },
    { code: 'S3', name: 'Weather node', detail: 'Synthetic rainfall indicator' },
    { code: 'S4', name: 'Edge safety rules', detail: 'Illustrative inference status' }
  ];
  const severityLabels = { advisory: 'Low', warning: 'Elevated', critical: 'Critical' };
  const validSeverities = Object.keys(severityLabels);
  const validStatuses = ['new', 'acknowledged', 'resolved'];
  const byId = id => document.getElementById(id);
  const make = (tag, className, text) => { const node = document.createElement(tag); if (className) node.className = className; if (text !== undefined) node.textContent = String(text); return node; };

  const stored = (() => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; } })();
  let events = Array.isArray(stored.events) ? stored.events.filter(isValidEvent).slice(0, MAX_EVENTS) : [];
  let selected = scenarios.find(item => item.id === stored.selected) || scenarios[0];
  let activeScenario = scenarios.find(item => item.id === stored.activeScenario) || scenarios[0];
  let sensitivity = ['low', 'standard', 'high'].includes(stored.sensitivity) ? stored.sensitivity : 'standard';
  let autoTimer = null;
  let guidedTimer = null;
  let guidedStep = -1;
  let motionPlaying = true;
  let toastTimer = null;
  const guidedStages = [
    { icon: 'S1', title: 'Mock sensors observe a fictional conflict', copy: 'Synthetic vision and radar metadata represent a pedestrian approaching the crossing. No camera feed or real road user is involved.' },
    { icon: 'AI', title: 'Illustrative safety rules assess the paths', copy: 'The browser assigns a simulated critical risk state because the fictional vehicle and pedestrian paths overlap.' },
    { icon: '5G', title: 'A simulated event is shared in 18 ms', copy: 'This latency is illustrative, not measured. A future pilot must compare real 5G, 4G, and wired performance independently.' },
    { icon: 'OP', title: 'The operator work queue receives the event', copy: 'A human can inspect, acknowledge, or resolve the demo record. Nothing is dispatched and no traffic system is controlled.' }
  ];

  function isValidEvent(event) {
    return event && typeof event.id === 'string' && typeof event.title === 'string' && validSeverities.includes(event.severity) && validStatuses.includes(event.status);
  }
  function persist() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ events, selected: selected.id, activeScenario: activeScenario.id, sensitivity })); } catch { /* Private mode may block storage; the demo still works in memory. */ }
  }
  function announce(message) {
    const toast = byId('toast');
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.hidden = false;
    toastTimer = window.setTimeout(() => { toast.hidden = true; }, 2600);
  }
  function formatTime(timestamp) {
    return new Date(timestamp).toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Kuala_Lumpur' });
  }
  function riskFor(scenario) {
    if (scenario.id === 'normal') return 'low';
    if (scenario.severity === 'critical') return sensitivity === 'low' ? 'elevated' : 'critical';
    return sensitivity === 'high' ? 'critical' : 'elevated';
  }
  function adjustedSeverity(scenario) {
    if (scenario.id === 'normal') return 'advisory';
    if (sensitivity === 'low' && scenario.severity === 'critical') return 'warning';
    if (sensitivity === 'high' && scenario.severity === 'warning') return 'critical';
    return scenario.severity;
  }

  function renderScenarioChoices() {
    const container = byId('scenario-options');
    container.replaceChildren();
    scenarios.forEach(scenario => {
      const button = make('button', `scenario${selected.id === scenario.id ? ' selected' : ''}`);
      button.type = 'button';
      button.setAttribute('aria-pressed', String(selected.id === scenario.id));
      button.append(make('span', 'scenario-symbol', scenario.symbol));
      const copy = make('span', 'scenario-copy');
      copy.append(make('strong', '', scenario.name), make('small', '', scenario.short));
      button.append(copy);
      button.addEventListener('click', () => { selected = scenario; activeScenario = scenario; persist(); renderScenarioChoices(); renderSelection(); renderMetrics(); announce(`${scenario.name} live synthetic motion selected.`); });
      container.append(button);
    });
  }
  function renderSelection() {
    byId('selected-title').textContent = selected.name;
    byId('selected-description').textContent = selected.description;
  }
  function renderMetrics() {
    const risk = riskFor(activeScenario);
    const riskLabel = byId('risk-label');
    riskLabel.textContent = risk[0].toUpperCase() + risk.slice(1);
    riskLabel.dataset.level = risk;
    byId('risk-desc').textContent = activeScenario.id === 'normal' ? 'Normal synthetic traffic' : `${activeScenario.name} · simulated`;
    byId('event-total').textContent = String(events.length);
    byId('latency').textContent = String(activeScenario.latency);
    byId('scene-caption').textContent = `${activeScenario.name} · synthetic representation`;
    const scene = byId('scene');
    scene.dataset.scenario = activeScenario.id;
    scene.dataset.risk = risk;
    restartSceneMotion();
  }
  function restartSceneMotion() {
    if (!motionPlaying) return;
    const scene = byId('scene');
    scene.classList.remove('scene-live');
    void scene.offsetWidth;
    scene.classList.add('scene-live');
  }
  function toggleSceneMotion() {
    motionPlaying = !motionPlaying;
    const scene = byId('scene');
    scene.classList.toggle('scene-live', motionPlaying);
    const button = byId('motion-toggle');
    button.innerHTML = motionPlaying ? '<span aria-hidden="true">Ⅱ</span> Pause motion' : '<span aria-hidden="true">▶</span> Play motion';
    button.setAttribute('aria-pressed', String(motionPlaying));
    byId('motion-status').textContent = motionPlaying ? 'Playing' : 'Paused';
    announce(`Synthetic junction motion ${motionPlaying ? 'playing' : 'paused'}.`);
  }
  function addEvent(scenario, source = 'manual') {
    activeScenario = scenario;
    events.unshift({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: scenario.event,
      detail: scenario.detail,
      severity: adjustedSeverity(scenario),
      status: 'new',
      timestamp: new Date().toISOString(),
      scenario: scenario.id
    });
    events = events.slice(0, MAX_EVENTS);
    persist(); renderMetrics(); renderEvents();
    if (source === 'manual') announce(`${scenario.name} simulated event added.`);
  }
  function filteredEvents() {
    const severity = byId('event-filter').value;
    const status = byId('status-filter').value;
    const query = byId('event-search').value.trim().toLocaleLowerCase('en');
    return events.filter(event => (severity === 'all' || event.severity === severity) && (status === 'all' || event.status === status) && (!query || `${event.title} ${event.detail}`.toLocaleLowerCase('en').includes(query)));
  }
  function renderEvents() {
    const filtered = filteredEvents();
    byId('timeline-count').textContent = String(filtered.length);
    const container = byId('events');
    container.replaceChildren();
    if (!filtered.length) {
      const empty = make('div', 'empty-state');
      const hasFilters = byId('event-filter').value !== 'all' || byId('status-filter').value !== 'all' || byId('event-search').value.trim();
      empty.append(make('span', 'empty-mark', 'RG'), make('strong', '', hasFilters ? 'No simulated events match' : 'The work queue is clear'), make('p', '', hasFilters ? 'Adjust the filters to see other demo records.' : 'Choose a scenario and inject a simulated event to begin.'));
      if (!hasFilters) { const action = make('button', 'button secondary compact', 'Go to scenario lab'); action.type = 'button'; action.addEventListener('click', () => byId('scenario-lab').scrollIntoView()); empty.append(action); }
      container.append(empty); return;
    }
    filtered.forEach(event => {
      const row = make('article', 'event-row');
      row.dataset.severity = event.severity;
      const indicator = make('span', 'event-indicator'); indicator.setAttribute('aria-hidden', 'true');
      const body = make('div', 'event-body');
      const heading = make('div', 'event-heading');
      heading.append(make('strong', '', event.title), make('span', `severity severity-${event.severity}`, `${severityLabels[event.severity]} · Simulated`));
      body.append(heading, make('p', '', event.detail));
      const meta = make('div', 'event-meta');
      meta.append(make('span', '', `Status: ${event.status}`), make('span', '', `Scenario: ${event.scenario}`));
      body.append(meta);
      const actions = make('div', 'event-actions');
      if (event.status === 'new') { const ack = make('button', 'row-action', 'Acknowledge'); ack.type = 'button'; ack.addEventListener('click', () => updateStatus(event.id, 'acknowledged')); actions.append(ack); }
      if (event.status !== 'resolved') { const resolve = make('button', 'row-action', 'Resolve demo event'); resolve.type = 'button'; resolve.addEventListener('click', () => updateStatus(event.id, 'resolved')); actions.append(resolve); }
      if (actions.childElementCount) body.append(actions);
      const time = make('time', 'event-time', formatTime(event.timestamp)); time.dateTime = event.timestamp; time.title = new Date(event.timestamp).toLocaleString('en-MY', { timeZone: 'Asia/Kuala_Lumpur' });
      row.append(indicator, body, time); container.append(row);
    });
  }
  function updateStatus(id, status) {
    const event = events.find(item => item.id === id);
    if (!event) return;
    event.status = status; persist(); renderEvents(); announce(`Simulated event marked ${status}.`);
  }
  function renderSensors() {
    const container = byId('sensors');
    container.replaceChildren();
    sensors.forEach(sensor => {
      const row = make('div', 'sensor-row');
      row.append(make('span', 'sensor-code', sensor.code));
      const copy = make('span', 'sensor-copy'); copy.append(make('strong', '', sensor.name), make('small', '', sensor.detail));
      const state = make('span', 'sensor-state', 'Mock online'); state.prepend(make('i', '', ''));
      row.append(copy, state); container.append(row);
    });
  }
  function csvCell(value) {
    let text = String(value ?? '');
    if (/^\s*[=+\-@\t\r]/.test(text)) text = `'${text}`;
    return `"${text.replace(/"/g, '""')}"`;
  }
  function exportCsv() {
    const rows = [['Timestamp', 'Scenario', 'Severity', 'Status', 'Event title', 'Description', 'Data type'], ...events.map(event => [event.timestamp, event.scenario, event.severity, event.status, event.title, event.detail, 'SIMULATED'])];
    const blob = new Blob([`\uFEFF${rows.map(row => row.map(csvCell).join(',')).join('\r\n')}`], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob); const link = document.createElement('a');
    link.href = url; link.download = 'roadguardian_simulated_events.csv'; document.body.append(link); link.click(); link.remove(); window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    announce(events.length ? 'Simulated event CSV downloaded.' : 'Empty simulated event CSV downloaded.');
  }
  function setAuto(enabled) {
    if (enabled && guidedTimer !== null) stopGuidedDemo(false);
    if (autoTimer !== null) { window.clearInterval(autoTimer); autoTimer = null; }
    if (enabled) autoTimer = window.setInterval(() => { const options = scenarios.slice(1); addEvent(options[Math.floor(Math.random() * options.length)], 'automatic'); }, 5500);
    const button = byId('auto-toggle');
    button.innerHTML = enabled ? '<span aria-hidden="true">Ⅱ</span> Pause simulation' : '<span aria-hidden="true">▶</span> Start simulation';
    button.setAttribute('aria-pressed', String(enabled));
    announce(enabled ? 'Automatic simulation started.' : 'Automatic simulation paused.');
  }
  function renderGuidedStage(step) {
    const stage = guidedStages[step];
    guidedStep = step;
    byId('demo-story-icon').textContent = stage.icon;
    byId('demo-story-title').textContent = stage.title;
    byId('demo-story-copy').textContent = stage.copy;
    byId('demo-step-count').textContent = `Stage ${step + 1} of ${guidedStages.length} · Simulated`;
    byId('demo-progress-bar').style.width = `${((step + 1) / guidedStages.length) * 100}%`;
    [...byId('demo-stages').children].forEach((item, index) => {
      item.classList.toggle('active', index === step);
      item.classList.toggle('complete', index < step);
      item.setAttribute('aria-current', index === step ? 'step' : 'false');
    });
    if (step === 0) {
      selected = scenarios.find(item => item.id === 'pedestrian');
      activeScenario = selected;
      persist(); renderScenarioChoices(); renderSelection(); renderMetrics();
    } else if (step === 1) {
      addEvent(selected, 'guided');
    } else if (step === 2) {
      byId('scene-caption').textContent = 'Simulated event delivery · 18 ms illustrative latency';
    } else if (step === 3) {
      byId('incident-log').scrollIntoView({ block: 'start' });
    }
  }
  function stopGuidedDemo(completed = false) {
    if (guidedTimer !== null) { window.clearInterval(guidedTimer); guidedTimer = null; }
    const button = byId('guided-demo');
    button.innerHTML = completed ? '<span aria-hidden="true">↻</span> Replay guided demo' : '<span aria-hidden="true">▶</span> Watch guided demo';
    button.setAttribute('aria-pressed', 'false');
    if (completed) {
      byId('demo-step-count').textContent = 'Complete · Simulation only';
      announce('Guided simulation complete. The event is ready for operator review.');
    }
  }
  function toggleGuidedDemo() {
    if (guidedTimer !== null) { stopGuidedDemo(false); announce('Guided demo stopped.'); return; }
    setAuto(false);
    guidedStep = 0;
    byId('guided-demo').innerHTML = '<span aria-hidden="true">■</span> Stop guided demo';
    byId('guided-demo').setAttribute('aria-pressed', 'true');
    byId('guided-demo-panel').scrollIntoView({ block: 'center' });
    renderGuidedStage(0);
    announce('Guided simulated demonstration started.');
    guidedTimer = window.setInterval(() => {
      if (guidedStep >= guidedStages.length - 1) { stopGuidedDemo(true); return; }
      renderGuidedStage(guidedStep + 1);
    }, 4000);
  }
  function resetDemo() {
    setAuto(false); stopGuidedDemo(false); events = []; selected = scenarios[0]; activeScenario = scenarios[0]; sensitivity = 'standard';
    byId('sensitivity').value = sensitivity; byId('event-filter').value = 'all'; byId('status-filter').value = 'all'; byId('event-search').value = '';
    persist(); renderScenarioChoices(); renderSelection(); renderMetrics(); renderEvents(); announce('Demo reset to its initial simulated state.');
  }
  function updateClock() {
    byId('current-time').textContent = `${new Date().toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kuala_Lumpur' })} MYT`;
  }

  byId('inject').addEventListener('click', () => addEvent(selected));
  byId('motion-toggle').addEventListener('click', toggleSceneMotion);
  byId('guided-demo').addEventListener('click', toggleGuidedDemo);
  byId('auto-toggle').addEventListener('click', () => setAuto(autoTimer === null));
  byId('reset').addEventListener('click', resetDemo);
  byId('sensitivity').addEventListener('change', event => { sensitivity = event.target.value; persist(); renderMetrics(); announce(`Illustrative sensitivity set to ${sensitivity}.`); });
  ['event-filter', 'status-filter'].forEach(id => byId(id).addEventListener('change', renderEvents));
  byId('event-search').addEventListener('input', renderEvents);
  byId('export').addEventListener('click', exportCsv);
  byId('clear-events').addEventListener('click', () => { events = []; persist(); renderMetrics(); renderEvents(); announce('Simulated incident log cleared.'); });

  byId('sensitivity').value = sensitivity;
  renderScenarioChoices(); renderSelection(); renderMetrics(); renderSensors(); renderEvents(); updateClock();
  window.setInterval(updateClock, 60000);
})();
