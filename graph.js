// Families organize the drawing; only shared session IDs create connections.
const graphFamilies = [
  ["Agents & knowledge", "#91daca", ["agents", "coding", "tools", "context", "retrieval"]],
  ["Models & interaction", "#a9bcf3", ["models", "inference", "media", "robotics", "foundations"]],
  ["Building & operating software", "#f0bf86", ["platform", "security", "ops", "evals"]],
  ["Products & people", "#d9abd5", ["product", "people", "applications", "open"]],
];
const graphShort = {
  agents:"Agent architecture", coding:"Coding workflows", tools:"MCP, skills & tools", context:"Context & memory",
  retrieval:"Search & RAG", models:"Models & training", inference:"Inference", media:"Voice & vision",
  robotics:"Robotics", foundations:"AI foundations", platform:"Platforms & delivery", security:"Security",
  ops:"Observability", evals:"Evaluation", product:"Product & UX", people:"Teams & practice",
  applications:"Applied AI", open:"Open source",
};

// Each expression is applied within its existing learning topic, never to playlist names.
const graphTerms = {
  agents: [["multi-agent","Multi-agent systems",/multi[- ]agents?|agent swarms?/i],["harness","Agent harnesses",/agent harness(?:es)?|harness engineering/i]],
  coding: [["copilot","GitHub Copilot",/github copilot/i],["pr","Pull requests",/pull requests?|merged prs/i],["claude-code","Claude Code",/claude code/i],["codex","Codex",/codex/i]],
  tools: [["mcp","Model Context Protocol",/mcps?|model context protocol/i],["skills","Agent skills",/agent skills?|skills|skill\.md|skill engineering/i],["calling","Tool & function calling",/tool call(?:s|ing)?|function calling/i]],
  context: [["memory","Memory",/memor(?:y|ies)/i],["prompts","Prompting",/prompting|prompt engineering/i],["windows","Context windows",/long[- ]context|context windows?/i]],
  retrieval: [["graphs","Knowledge graphs",/graphrag|graph rag|knowledge graphs?/i],["vectors","Vector search & embeddings",/vector (?:search|databases?)|embeddings?/i],["rag","Retrieval-augmented generation",/rag|graphrag|retrieval[- ]augmented generation/i]],
  models: [["rl","Reinforcement learning",/reinforcement learning|rl/i],["tuning","Fine-tuning",/fine[- ]?tun(?:e[d]?|ing)/i],["reasoning","Reasoning",/reasoning|chain of thought/i],["post-training","Post-training",/post[- ]training/i]],
  inference: [["gpu","GPUs",/gpus?/i],["decoding","Speculative decoding",/speculative decoding/i],["cache","KV caching",/kv cach(?:e|es|ing)/i]],
  media: [["speech","Speech & voice",/voice|speech|text[- ]to[- ]speech/i],["vision","Vision",/vision/i],["multimodal","Multimodal systems",/multi[- ]?modal(?:ity)?/i]],
  robotics: [["browser","Browser agents",/browser agents?/i],["physical","Robots & embodied AI",/robots?|robotics|embodied|physical ai/i]],
  platform: [["cicd","CI/CD",/ci\/cd|continuous integration|continuous delivery/i],["sandboxes","Sandboxes",/sandbox(?:es|ing)?/i],["k8s","Kubernetes",/kubernetes|k8s/i]],
  security: [["identity","Identity & permissions",/identity|permissions?|authorization|authentication/i],["injection","Prompt injection",/prompt injection/i],["governance","Governance & compliance",/governance|compliance/i],["supply-chain","Software supply chain",/supply[- ]chain/i]],
  ops: [["incidents","Incident response",/incidents?|root cause/i],["sre","Site reliability engineering",/sre|site reliability/i]],
  evals: [["judges","LLM judges",/llm[- ](?:as[- ](?:a[- ])?)?judge[s]?/i],["benchmarks","Benchmarks",/benchmarks?|benchmarking/i],["code-review","Code review",/code (?:quality & )?reviews?/i]],
  product: [["interfaces","Interface design",/interfaces?|ui|ux/i],["prototypes","Prototyping",/prototyp(?:e[s]?|ing)/i]],
  people: [["hiring","Hiring",/hir(?:e|ing)/i],["leadership","Leadership",/leadership/i],["education","Education & fluency",/education|ai fluency/i]],
  applications: [["finance","Finance",/financial|finance|banking/i],["health","Healthcare",/medical|clinical|healthcare/i],["commerce","Sales & commerce",/sales|commerce|gtm/i]],
  open: [["maintainers","Project maintenance",/maintainers?|maintaining/i],["community","Community",/communit(?:y|ies)/i],["collaboration","Collaboration",/collaboration/i]],
  foundations: [["literacy","AI literacy",/ai literacy|ai fluency/i],["intro","Getting started",/introduction|beginner[s]?|getting started|101/i]],
};
for (const defs of Object.values(graphTerms)) {
  for (const def of defs) def[2] = new RegExp(`\\b(?:${def[2].source})\\b`, "i");
}
const graphIndex = new WeakMap();
function graphEvidence(s, topic) {
  if (!graphIndex.has(s)) graphIndex.set(s, new Map());
  const cache = graphIndex.get(s);
  if (!cache.has(topic)) {
    const meta = s.mapping?.evidence.find(e => e.topic === topic);
    const fields = [["title", s.title.split(" — ")[0]], ...s.topic.map(t => ["catalog tag", t]),
      ...s.product.map(t => ["catalog product", t]), ...(meta?.descriptionTerms || []).map(t => ["description term", t])];
    const hits = new Map();
    for (const [id,,pattern] of graphTerms[topic] || []) {
      for (const [field, text] of fields) {
        const hit = text.match(pattern);
        if (hit) { hits.set(id, `${field}: ${hit[0]}`); break; }
      }
    }
    cache.set(topic, hits);
  }
  return cache.get(topic);
}
const graphName = id => topics.get(id).name;
const graphFamily = id => graphFamilies.find(([, ,ids]) => ids.includes(id));
const graphQty = n => `${n} session${n === 1 ? "" : "s"}`;
function graphSelectOptions(el, prompt, items, selected) {
  el.innerHTML = `<option value="">${esc(prompt)}</option>` + items.map(([id,label,n]) =>
    `<option value="${esc(id)}"${id === selected ? " selected" : ""}>${esc(label)} (${n})</option>`).join("");
}
function graphMap(list) {
  const counts = new Map(), pairs = new Map();
  for (const s of list) {
    const ids = [...new Set(s.learning.filter(id => id !== "review"))].sort();
    ids.forEach((id, i) => {
      counts.set(id, (counts.get(id) || 0) + 1);
      for (const peer of ids.slice(i + 1)) {
        const key = `${id}:${peer}`;
        pairs.set(key, (pairs.get(key) || 0) + 1);
      }
    });
  }
  return {count: id => counts.get(id) || 0, pair: (a,b) => pairs.get([a,b].sort().join(":")) || 0};
}

const graphSubShort = {
  "multi-agent":"Multi-agent", mcp:"MCP", calling:"Tool calling", rag:"RAG", vectors:"Vector search",
  physical:"Embodied AI", identity:"Identity", governance:"Governance", "supply-chain":"Supply chain", sre:"SRE",
  education:"Education", maintainers:"Maintainers", multimodal:"Multimodal", speech:"Voice", decoding:"Spec. decoding",
};
const graphRadius = n => 3.5 + Math.sqrt(n) * .95;
const graphRound = v => Math.round(v * 10) / 10;
function graphSubCounts(list) {
  const counts = new Map();
  for (const s of list) for (const t of new Set(s.learning)) {
    if (!graphTerms[t]) continue;
    for (const k of graphEvidence(s,t).keys()) counts.set(`${t}/${k}`, (counts.get(`${t}/${k}`) || 0) + 1);
  }
  return counts;
}

// Boxes cover each dot and its label, so separating boxes keeps every label readable.
function graphSeparate(items, passes, pull, bias = 1) {
  for (let p = 0; p < passes; p++) {
    for (let i = 0; i < items.length; i++) for (let j = i + 1; j < items.length; j++) {
      const a = items[i], b = items[j];
      const ox = Math.min(a.x + a.R, b.x + b.R) - Math.max(a.x - a.L, b.x - b.L) + 4;
      const oy = Math.min(a.y + a.B, b.y + b.B) - Math.max(a.y - a.T, b.y - b.T) + 4;
      if (ox <= 0 || oy <= 0) continue;
      const share = a.parent && !b.parent ? .85 : !a.parent && b.parent ? .15 : .5;
      if (ox < oy * bias) {
        const dir = a.x + (a.R - a.L) / 2 < b.x + (b.R - b.L) / 2 ? -1 : 1;
        a.x += dir * ox * share; b.x -= dir * ox * (1 - share);
      } else {
        const dir = a.y + (a.B - a.T) / 2 < b.y + (b.B - b.T) / 2 ? -1 : 1;
        a.y += dir * oy * share; b.y -= dir * oy * (1 - share);
      }
    }
    if (pull) pull();
  }
}

// One deterministic layout from the whole catalog keeps positions stable while filters change.
const graphLayouts = {};
function graphLayout(narrow) {
  const key = narrow ? "narrow" : "wide";
  if (graphLayouts[key]) return graphLayouts[key];
  let W = narrow ? 360 : 1040, H = narrow ? 760 : 560;
  const s = narrow ? .85 : 1, full = graphMap(D.sessions), subFull = graphSubCounts(D.sessions);
  const css = getComputedStyle(document.documentElement), pen = document.createElement("canvas").getContext("2d");
  const measure = (text, count, font) => {
    pen.font = `${font} ${css.getPropertyValue("--sans")}`;
    const w = pen.measureText(text + " ").width;
    pen.font = `400 10.5px ${css.getPropertyValue("--mono")}`;
    return w + pen.measureText(String(count)).width;
  };
  const anchors = narrow ? [[.5,.15],[.5,.39],[.5,.62],[.5,.85]] : [[.27,.3],[.73,.3],[.27,.72],[.73,.72]];
  const nodes = [];
  graphFamilies.forEach(([, , ids], f) => ids.forEach((id, i) => {
    const ax = anchors[f][0] * W, ay = anchors[f][1] * H, r = graphRadius(full.count(id)) * s;
    const half = measure(graphShort[id], full.count(id), "600 12px") / 2 + 5;
    nodes.push({id, f, ax, ay, x: ax + Math.cos(i * 2.4) * 60 * s, y: ay + Math.sin(i * 2.4) * 40 * s, r, L: half, R: half, T: r + 4, B: r + 15 * s + 5});
  }));
  const links = [];
  nodes.forEach((a, i) => nodes.slice(i + 1).forEach(b => {
    const n = full.pair(a.id, b.id);
    if (n) links.push([a, b, Math.log2(n + 1) * (a.f === b.f ? 1 : .5)]);
  }));
  const linked = new Set(links.flatMap(([a, b]) => [a, b]));
  const strongest = Math.max(...links.map(l => l[2])), k = Math.sqrt(W * H / nodes.length) * (narrow ? .62 : .85);
  for (let it = 0; it < 360; it++) {
    const temp = 30 * (1 - it / 360) + 1;
    for (const n of nodes) {
      const gx = n.ax - n.x, gy = n.ay - n.y, gd = Math.hypot(gx, gy), pull = linked.has(n) ? .7 : 12;
      n.dx = gx * gd / k * pull; n.dy = gy * gd / k * pull;
    }
    nodes.forEach((a, i) => nodes.slice(i + 1).forEach(b => {
      const dx = a.x - b.x, dy = a.y - b.y, f = k * k / Math.max(dx * dx + dy * dy, 1);
      a.dx += dx * f; a.dy += dy * f; b.dx -= dx * f; b.dy -= dy * f;
    }));
    for (const [a, b, w] of links) {
      const dx = a.x - b.x, dy = a.y - b.y, f = Math.hypot(dx, dy) / k * w / strongest;
      a.dx -= dx * f; a.dy -= dy * f; b.dx += dx * f; b.dy += dy * f;
    }
    for (const n of nodes) {
      const len = Math.hypot(n.dx, n.dy) || 1, step = Math.min(len, temp);
      n.x = Math.min(Math.max(n.x + n.dx / len * step, n.L + 4), W - n.R - 4);
      n.y = Math.min(Math.max(n.y + n.dy / len * step, n.T + 4), H - n.B - 4);
    }
  }
  graphSeparate(nodes, 80, null, narrow ? 0 : 2);
  const subs = [];
  for (const t of nodes) {
    const defs = (graphTerms[t.id] || []).filter(([id]) => subFull.get(`${t.id}/${id}`));
    const out = Math.atan2(t.y / H - .5, t.x / W - .5);
    defs.forEach(([id, label], i) => {
      const angle = out + (i - (defs.length - 1) / 2) * .62, reach = t.r + 30 * s;
      const text = graphSubShort[id] || label, right = Math.cos(angle) >= 0, wide = narrow ? 6 : 11 + measure(text, subFull.get(`${t.id}/${id}`), "10.5px");
      subs.push({id: `${t.id}/${id}`, key: id, label, text, parent: t, angle, reach, right,
        x: t.x + Math.cos(angle) * reach, y: t.y + Math.sin(angle) * reach, L: right ? 6 : wide, R: right ? wide : 6, T: 7, B: 7});
    });
  }
  const homeward = () => { for (const u of subs) {
    u.x += (u.parent.x + Math.cos(u.angle) * u.reach - u.x) * .12;
    u.y += (u.parent.y + Math.sin(u.angle) * u.reach - u.y) * .12;
  } };
  // Narrow screens only grow downward; wide screens prefer sideways room for labels.
  const all = [...nodes, ...subs], bias = narrow ? 0 : 2;
  graphSeparate(all, 160, homeward, bias);
  graphSeparate(all, 60, null, bias);
  // Fit the canvas to the settled boxes instead of clamping, which would push labels back into each other.
  const x0 = Math.min(...all.map(n => n.x - n.L)) - 6, y0 = Math.min(...all.map(n => n.y - n.T)) - 6;
  W = Math.max(...all.map(n => n.x + n.R)) + 6 - x0; H = Math.max(...all.map(n => n.y + n.B)) + 6 - y0;
  for (const n of all) { n.x -= x0; n.y -= y0; n.x0 = n.hx = n.x; n.y0 = n.hy = n.y; n.vx = n.vy = 0; }
  nodes.forEach((n, i) => { n.i = i; });
  const springs = links.map(([a, b, w]) => [a, b, w / strongest, Math.hypot(a.x - b.x, a.y - b.y)]);
  return graphLayouts[key] = {W, H, s, nodes, subs, springs};
}

// Zoom and pan only change the viewBox, so filtering and selection never move a topic.
// The viewBox always matches the stage's shape; 100% fits the whole map, or its width on narrow screens.
const gv = {key:"", k:1, x:0, y:0, W:1, H:1, A:1, topics:0, links:0};
let gvFrame = 0, graphArgs = null;
const gPhys = {frame:0, drag:null};
const graphSvg = () => document.querySelector("#kg-canvas .kg-net");
const graphCalm = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const graphFitW = () => Math.max(gv.W, gv.H / gv.A);
const graphHomeW = () => gv.key === "narrow" ? gv.W : graphFitW();
const graphKMin = () => graphHomeW() / graphFitW();
const graphSpan = (k = gv.k) => [graphHomeW() / k, graphHomeW() / k * gv.A];
const graphPannable = () => { const [w, h] = graphSpan(); return w < gv.W - .5 || h < gv.H - .5; };
const graphViewBox = () => [gv.x, gv.y, ...graphSpan()].map(v => v.toFixed(2)).join(" ");
const graphMoved = () => !!graphLayouts[gv.key]?.nodes.some(n => n.x !== n.x0 || n.y !== n.y0);
const graphAt = n => `translate(${graphRound(n.x)} ${graphRound(n.y)})`;
function graphCurve(a, b) {
  if (a.i > b.i) [a, b] = [b, a];
  const dx = b.x - a.x, dy = b.y - a.y, r = graphRound;
  return `M${r(a.x)},${r(a.y)} Q${r((a.x + b.x) / 2 - dy * .14)},${r((a.y + b.y) / 2 + dx * .14)} ${r(b.x)},${r(b.y)}`;
}
function graphClamp(k, x, y) {
  k = Math.min(Math.max(k, graphKMin()), 6);
  const [w, h] = graphSpan(k), axis = (p, view, size) => view >= size ? (size - view) / 2 : Math.min(Math.max(p, 0), size - view);
  return [k, axis(x, w, gv.W), axis(y, h, gv.H)];
}
function graphApplyView() {
  const svg = graphSvg(), box = svg?.getBoundingClientRect();
  if (box?.width) gv.A = box.height / box.width;
  [gv.k, gv.x, gv.y] = graphClamp(gv.k, gv.x, gv.y);
  if (svg) { svg.setAttribute("viewBox", graphViewBox()); svg.classList.toggle("is-zoomed", graphPannable()); }
  document.getElementById("kg-status").textContent = `${gv.topics} topics · ${gv.links} connections · ${Math.round(gv.k * 100)}%`;
  for (const b of document.querySelectorAll("[data-kg-view]")) {
    const v = b.dataset.kgView;
    b.disabled = !svg || (v === "in" ? gv.k >= 5.999 : v === "focus" ? !st.gTopic : v === "layout" ? !graphMoved() : gv.k <= graphKMin() + .001);
  }
}
function graphTo(k, x, y) {
  cancelAnimationFrame(gvFrame);
  [k, x, y] = graphClamp(k, x, y);
  const [k0, x0, y0] = [gv.k, gv.x, gv.y], t0 = performance.now(), dur = graphCalm() ? 0 : 260;
  const step = now => {
    const t = dur ? Math.min((now - t0) / dur, 1) : 1, e = 1 - (1 - t) ** 3;
    // Easing the visible width rather than the factor keeps the camera speed even.
    gv.k = 1 / (1 / k0 + (1 / k - 1 / k0) * e); gv.x = x0 + (x - x0) * e; gv.y = y0 + (y - y0) * e;
    graphApplyView();
    if (t < 1) gvFrame = requestAnimationFrame(step);
  };
  step(t0);
}
function graphZoomBy(f, ux, uy, smooth = false) {
  const [w, h] = graphSpan();
  ux ??= gv.x + w / 2; uy ??= gv.y + h / 2;
  const k = Math.min(Math.max(gv.k * f, graphKMin()), 6), r = gv.k / k, x = ux - (ux - gv.x) * r, y = uy - (uy - gv.y) * r;
  if (smooth) return graphTo(k, x, y);
  cancelAnimationFrame(gvFrame);
  Object.assign(gv, {k, x, y});
  graphApplyView();
}
const graphCenter = (px, py, k = gv.k) => { const [w, h] = graphSpan(k); graphTo(k, px - w / 2, py - h / 2); };
function graphUser(svg, cx, cy) {
  const p = new DOMPoint(cx, cy).matrixTransform(svg.getScreenCTM().inverse());
  return [p.x, p.y];
}
function graphDraw() {
  document.getElementById("kg-canvas").innerHTML = graphNetwork(...graphArgs);
  graphApplyView();
}
// Moves existing nodes and lines in place, so hover, focus and selection survive every frame.
function graphPlace() {
  const svg = graphSvg(), lay = graphLayouts[gv.key];
  if (!svg || !lay) return;
  const at = new Map([...lay.nodes, ...lay.subs].map(n => [n.id, n]));
  for (const el of svg.querySelectorAll("[data-node]")) el.setAttribute("transform", graphAt(at.get(el.dataset.node)));
  for (const el of svg.querySelectorAll("path.kg-edge, .kg-link")) el.setAttribute("d", graphCurve(...(el.dataset.ends || el.dataset.kgPair).split(" ").map(k => at.get(k))));
  for (const el of svg.querySelectorAll("line.kg-spoke")) {
    const [p, u] = el.dataset.ends.split(" ").map(k => at.get(k));
    el.setAttribute("x1", graphRound(p.x)); el.setAttribute("y1", graphRound(p.y));
    el.setAttribute("x2", graphRound(u.x)); el.setAttribute("y2", graphRound(u.y));
  }
}
// Springs: each topic is held at its home, and each connection keeps its original length.
// Dragging a topic stretches its connections, so related topics follow and then settle.
function graphStep() {
  const {nodes, subs, springs} = graphLayouts[gv.key], drag = gPhys.drag;
  let busy = false;
  for (const n of nodes) { n.ax = (n.hx - n.x) * .03; n.ay = (n.hy - n.y) * .03; }
  for (const [a, b, w, rest] of springs) {
    const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1, f = (d - rest) / d * w * .04;
    a.ax += dx * f; a.ay += dy * f; b.ax -= dx * f; b.ay -= dy * f;
  }
  for (const n of nodes) {
    // A dragged or dropped topic is pinned where the reader put it until Restore.
    if (n === drag || n.hx !== n.x0 || n.hy !== n.y0) { n.x = n.hx; n.y = n.hy; n.vx = n.vy = 0; continue; }
    n.vx = (n.vx + n.ax) * .8; n.vy = (n.vy + n.ay) * .8; n.x += n.vx; n.y += n.vy;
    busy ||= Math.abs(n.vx) + Math.abs(n.vy) + Math.abs(n.ax) + Math.abs(n.ay) > .05;
  }
  for (const u of subs) {
    const p = u.parent, ax = (p.x + u.x0 - p.x0 - u.x) * .16, ay = (p.y + u.y0 - p.y0 - u.y) * .16;
    u.vx = (u.vx + ax) * .74; u.vy = (u.vy + ay) * .74; u.x += u.vx; u.y += u.vy;
    busy ||= Math.abs(u.vx) + Math.abs(u.vy) + Math.abs(ax) + Math.abs(ay) > .05;
  }
  if (!busy && nodes.every(n => n.hx === n.x0 && n.hy === n.y0)) for (const n of [...nodes, ...subs]) { n.x = n.x0; n.y = n.y0; n.vx = n.vy = 0; }
  return busy;
}
function graphTick() {
  gPhys.frame = 0;
  if (!graphLayouts[gv.key]) return;
  const busy = graphStep();
  graphPlace();
  if (busy) gPhys.frame = requestAnimationFrame(graphTick);
  else graphApplyView();
}
// Reduced motion skips the animation and shows the settled result straight away.
function graphKick() {
  if (!graphCalm()) { gPhys.frame ||= requestAnimationFrame(graphTick); return; }
  for (let i = 0; i < 600 && graphStep(); i++);
  graphPlace(); graphApplyView();
}
function graphNudge(id, dx, dy) {
  const {nodes, W, H} = graphLayouts[gv.key], t = nodes.find(n => n.id === id);
  t.x = t.hx = Math.min(Math.max(t.x + dx, t.L), W - t.R);
  t.y = t.hy = Math.min(Math.max(t.y + dy, t.T), H - t.B);
  t.vx = t.vy = 0; gPhys.drag = t;
  graphKick();
}
function graphRestore() {
  for (const n of graphLayouts[gv.key].nodes) { n.hx = n.x0; n.hy = n.y0; }
  graphKick();
}
// A connection keeps the current topic when it touches it; otherwise the larger topic leads.
function graphPairState(pair) {
  const ends = pair.split(" "), full = graphMap(D.sessions);
  const topic = ends.includes(st.gTopic) ? st.gTopic : [...ends].sort((a, b) => full.count(b) - full.count(a))[0];
  const other = ends.find(k => k !== topic), same = topic === st.gTopic;
  return {gTopic:topic, gSub:same ? st.gSub : "", peer:same && st.peer === other ? "" : other};
}

function graphNetwork(model, subCounts, {id, sub, peer, local, near}) {
  const narrow = matchMedia("(max-width:500px)").matches, key = narrow ? "narrow" : "wide", {W, H, s, nodes, subs} = graphLayout(narrow);
  if (gv.key !== key) Object.assign(gv, {key, k:1, x:0, y:0, A:H / W});
  Object.assign(gv, {W, H});
  const live = nodes.filter(t => model.count(t.id) || t.id === id), shown = new Set(live.map(t => t.id));
  const lit = k => k === id || near.has(k), color = t => graphFamilies[t.f][1];
  const pairs = [];
  live.forEach((a, i) => live.slice(i + 1).forEach(b => {
    const incident = !!id && (a.id === id || b.id === id), n = incident ? local.pair(a.id, b.id) : model.pair(a.id, b.id);
    if (n) pairs.push({a, b, n, incident});
  }));
  const max = Math.max(1, ...pairs.map(e => e.n));
  pairs.sort((x, y) => x.incident - y.incident || x.n - y.n);
  const hits = [];
  const edges = pairs.map(({a, b, n, incident}) => {
    const strength = Math.log2(n + 1) / Math.log2(max + 1), cls = !incident ? "" : peer && (a.id === peer || b.id === peer) ? " is-near is-peer" : " is-near";
    const ends = [a.id, b.id].sort().join(" "), d = graphCurve(a, b);
    const tip = `${esc(graphName(a.id))} + ${esc(graphName(b.id))}: ${graphQty(n)}`;
    hits.push(`<path class="kg-link" data-kg-pair="${ends}" d="${d}" aria-hidden="true"><title>${tip}. Select to list them.</title></path>`);
    return `<path class="kg-edge${cls}" data-ends="${ends}" d="${d}" stroke="${a.f === b.f ? color(a) : "#8fa3b0"}" stroke-opacity="${(.2 + .55 * strength).toFixed(2)}" stroke-width="${((.7 + Math.log2(n + 1) * .75) * s).toFixed(2)}"><title>${tip}</title></path>`;
  }).join("");
  gv.topics = live.length; gv.links = pairs.length;
  const visibleSubs = subs.filter(u => shown.has(u.parent.id) && subCounts.get(u.id));
  const spokes = visibleSubs.map(u => `<line class="kg-edge kg-spoke${u.parent.id === id ? " is-near" : ""}" data-ends="${u.parent.id} ${u.id}" x1="${graphRound(u.parent.x)}" y1="${graphRound(u.parent.y)}" x2="${graphRound(u.x)}" y2="${graphRound(u.y)}" stroke="${color(u.parent)}"/>`).join("");
  const subNodes = visibleSubs.map(u => {
    const mine = u.parent.id === id, chosen = mine && u.key === sub, n = subCounts.get(u.id);
    const label = `${u.label}, in ${graphName(u.parent.id)}: ${graphQty(n)}`;
    return `<g class="kg-node kg-sub-node${mine ? " is-near" : ""}" data-node="${u.id}" data-kg-topic="${u.parent.id}" data-kg-sub="${u.key}" role="button" tabindex="${mine ? 0 : -1}" aria-pressed="${chosen}"     aria-label="${esc(label)}" transform="${graphAt(u)}">
      <title>${esc(label)}</title><circle class="kg-target" r="9"/>${chosen ? `<circle class="kg-ring" r="${(7 * s).toFixed(1)}"/>` : ""}<circle r="${((2 + Math.sqrt(n) * .42) * s).toFixed(1)}" fill="${color(u.parent)}"/>
      <text class="kg-sublabel" x="${u.right ? 8 : -8}" dy=".35em" text-anchor="${u.right ? "start" : "end"}">${esc(u.text)}${mine ? ` <tspan>${n}</tspan>` : ""}</text></g>`;
  }).join("");
  const topicNodes = live.map(t => {
    const selected = t.id === id, peerNode = !!id && !selected && near.has(t.id), all = model.count(t.id), r = graphRadius(all) * s;
    const label = !id || selected ? `${graphName(t.id)}: ${graphQty(all)}`
      : peerNode ? `${graphName(t.id)}: ${graphQty(local.pair(id, t.id))} also tagged ${graphName(id)}`
      : `${graphName(t.id)}: no talks shared with ${graphName(id)} here. Explore this topic`;
    return `<g class="kg-node kg-topic-node${lit(t.id) ? " is-near" : ""}" data-node="${t.id}" data-kg-${peerNode ? "peer" : "topic"}="${t.id}" role="button" tabindex="0"${peerNode ? ` aria-pressed="${t.id === peer}"` : ""}     aria-label="${esc(label)}" transform="${graphAt(t)}">
      <title>${esc(label)}</title><rect class="kg-target" x="${-t.L}" y="${-t.T}" width="${t.L + t.R}" height="${t.T + t.B}" rx="6"/>
      ${selected || t.id === peer ? `<circle class="kg-ring" r="${(r + 5).toFixed(1)}"/>` : ""}<circle r="${r.toFixed(1)}" fill="${color(t)}"/>
      <text class="kg-label" y="${(r + 15 * s).toFixed(1)}" text-anchor="middle">${esc(graphShort[t.id])} <tspan>${peerNode ? local.pair(id, t.id) : all}</tspan></text></g>`;
  }).join("");
  return `<svg class="kg-net${narrow ? " is-narrow" : ""}${id ? " has-focus" : ""}" viewBox="${graphViewBox()}" role="group" aria-labelledby="kg-net-title kg-net-desc">
    <title id="kg-net-title">${id ? `${esc(graphName(id))} in the topic network` : "Topic network"}</title><desc id="kg-net-desc">Circles are topics sized by talk count; small dots are subtopics. A line joins two topics tagged on the same talk; the side panel lists those talks. The Topic, Subtopic and Related topic controls offer the same choices.</desc>
    ${edges}${spokes}${hits.join("")}${subNodes}${topicNodes}</svg>`;
}

function graphLight(id, pair) {
  const svg = graphSvg();
  if (!svg) return;
  const on = new Set(pair ? pair.split(" ") : id ? [id] : []);
  svg.classList.toggle("has-hover", on.size > 0);
  for (const el of svg.querySelectorAll(".kg-edge")) {
    const ends = el.dataset.ends.split(" "), hit = pair ? el.dataset.ends === pair : ends.includes(id);
    el.classList.toggle("is-lit", hit);
    if (hit && !pair) ends.forEach(k => on.add(k));
  }
  for (const el of svg.querySelectorAll(".kg-node")) el.classList.toggle("is-lit", on.has(el.dataset.node));
}
function graphHover(target) {
  if (gGesture?.moved) return;
  const node = target?.closest?.(".kg-node"), pair = target?.closest?.("[data-kg-pair]"), peer = target?.closest?.("[data-kg-peer]");
  if (node) graphLight(node.dataset.node);
  else if (pair) graphLight(null, pair.dataset.kgPair);
  else if (peer && st.gTopic) graphLight(null, [st.gTopic, peer.dataset.kgPeer].sort().join(" "));
  else graphLight(null);
}
const graphStage = document.getElementById("kg-figures"), graphCanvas = document.getElementById("kg-canvas"), gPointers = new Map();
let gGesture = null, gSuppress = false, gWheelAt = 0;
new ResizeObserver(() => graphApplyView()).observe(graphCanvas);
graphStage.addEventListener("pointerover", e => graphHover(e.target));
graphStage.addEventListener("pointerleave", () => graphLight(null));
graphStage.addEventListener("focusout", () => graphLight(null));
graphStage.addEventListener("focusin", e => {
  graphHover(e.target);
  const node = e.target.closest(".kg-node"), m = node?.transform.baseVal.consolidate()?.matrix;
  // Keyboard focus brings an off-screen topic into view.
  const [w, h] = graphSpan();
  if (m && (m.e < gv.x || m.e > gv.x + w || m.f < gv.y || m.f > gv.y + h)) graphCenter(m.e, m.f);
});

// One pointer pans the view or drags a topic; two pointers pinch. Clicks still select.
graphCanvas.addEventListener("pointerdown", e => {
  if (e.pointerType === "mouse" && e.button !== 0) return;
  gSuppress = false;
  gPointers.set(e.pointerId, [e.clientX, e.clientY]);
  if (gPointers.size === 2) {
    const [[ax, ay], [bx, by]] = gPointers.values();
    gGesture = {pinch:Math.hypot(ax - bx, ay - by), mid:[(ax + bx) / 2, (ay + by) / 2], moved:true};
    for (const pid of gPointers.keys()) try { graphCanvas.setPointerCapture(pid); } catch {}
    return;
  }
  gGesture = {id:e.target.closest(".kg-topic-node")?.dataset.node, sx:e.clientX, sy:e.clientY, lx:e.clientX, ly:e.clientY, moved:false};
});
graphCanvas.addEventListener("pointermove", e => {
  const svg = graphSvg();
  if (!gGesture || !svg || !gPointers.has(e.pointerId)) return;
  gPointers.set(e.pointerId, [e.clientX, e.clientY]);
  const scale = svg.getScreenCTM().a;
  if (gGesture.pinch) {
    if (gPointers.size < 2) return;
    const [[ax, ay], [bx, by]] = gPointers.values(), d = Math.hypot(ax - bx, ay - by), mid = [(ax + bx) / 2, (ay + by) / 2];
    gv.x -= (mid[0] - gGesture.mid[0]) / scale; gv.y -= (mid[1] - gGesture.mid[1]) / scale;
    graphZoomBy(d / gGesture.pinch, ...graphUser(svg, ...mid));
    Object.assign(gGesture, {pinch:d, mid});
    return;
  }
  if (!gGesture.moved) {
    if (Math.hypot(e.clientX - gGesture.sx, e.clientY - gGesture.sy) < 4) return;
    gGesture.moved = true;
    graphCanvas.setPointerCapture(e.pointerId);
    graphCanvas.classList.add("is-dragging");
    graphLight(gGesture.id || null);
  }
  const dx = (e.clientX - gGesture.lx) / scale, dy = (e.clientY - gGesture.ly) / scale;
  Object.assign(gGesture, {lx:e.clientX, ly:e.clientY});
  if (gGesture.id) graphNudge(gGesture.id, dx, dy);
  else { gv.x -= dx; gv.y -= dy; graphApplyView(); }
});
const graphRelease = e => {
  gPointers.delete(e.pointerId);
  if (!gGesture) return;
  if (gGesture.moved && e.type === "pointerup") { gSuppress = true; setTimeout(() => { gSuppress = false; }); }
  graphCanvas.classList.remove("is-dragging");
  gGesture = null;
  if (gPhys.drag) { gPhys.drag = null; graphKick(); }
  graphApplyView();
};
graphCanvas.addEventListener("pointerup", graphRelease);
graphCanvas.addEventListener("pointercancel", graphRelease);
graphCanvas.addEventListener("click", e => { if (gSuppress) { e.stopPropagation(); e.preventDefault(); } }, true);
graphCanvas.addEventListener("wheel", e => {
  const svg = graphSvg();
  if (!svg) return;
  const f = Math.exp(-e.deltaY * (e.deltaMode === 1 ? .05 : .0025)), now = performance.now();
  // Scrolling down from the fully zoomed-out map hands the wheel back to the page,
  // unless it is the tail of a zoom gesture.
  if (f < 1 && gv.k <= graphKMin() + .001 && !e.ctrlKey && !e.metaKey && now - gWheelAt > 300) return;
  e.preventDefault();
  gWheelAt = now;
  graphZoomBy(f, ...graphUser(svg, e.clientX, e.clientY));
}, {passive:false});
graphCanvas.addEventListener("dblclick", e => {
  const svg = graphSvg();
  if (svg && !e.target.closest(".kg-node, .kg-link")) graphZoomBy(e.shiftKey ? .5 : 2, ...graphUser(svg, e.clientX, e.clientY), true);
});
const graphMain = document.getElementById("kg-main");
graphMain.addEventListener("click", e => {
  const v = e.target.closest("[data-kg-view]")?.dataset.kgView;
  if (v === "in" || v === "out") graphZoomBy(v === "in" ? 1.6 : 1 / 1.6, undefined, undefined, true);
  else if (v === "fit") graphTo(graphKMin(), 0, 0);
  else if (v === "layout") graphRestore();
  else if (v === "focus") {
    const t = graphLayouts[gv.key]?.nodes.find(n => n.id === st.gTopic);
    if (t) graphCenter(t.x, t.y, Math.max(gv.k, 2.2));
  }
});
graphMain.addEventListener("keydown", e => {
  if (e.ctrlKey || e.metaKey || e.altKey || !graphSvg()) return;
  const pan = {ArrowLeft:[-1,0], ArrowRight:[1,0], ArrowUp:[0,-1], ArrowDown:[0,1]}[e.key];
  if (e.key === "+" || e.key === "=") graphZoomBy(1.6, undefined, undefined, true);
  else if (e.key === "-" || e.key === "_") graphZoomBy(1 / 1.6, undefined, undefined, true);
  else if (e.key === "0") graphTo(graphKMin(), 0, 0);
  else if (pan && graphPannable()) { const [w, h] = graphSpan(); graphTo(gv.k, gv.x + pan[0] * w * .2, gv.y + pan[1] * h * .2); }
  else return;
  e.preventDefault();
});

function graphSessionList(results) {
  const picks = orderSessions(results).slice(0, 6);
  if (!picks.length) return `<p class="kg-p-none">No sessions match. Clear the search or filters above.</p>`;
  return `<ol class="kg-p-list">${picks.map(s => {
    const seen = watchLedger[s.code]?.watchedAt, meta = [SOURCES[s.source], !s.yt && "attendee sign-in", seen && "watched"].filter(Boolean).join(" · ");
    return `<li data-code="${esc(s.code)}">${s.yt
      ? `<button type="button" class="recording-open" data-code="${esc(s.code)}" aria-label="Play recording for ${esc(s.title)}"><span aria-hidden="true">▶</span> ${esc(s.title)}</button>`
      : `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ↗</a>`}<span>${esc(meta)}</span></li>`;
  }).join("")}</ol>${results.length > picks.length ? `<button type="button" class="kg-all" data-kg-jump>All ${results.length} in Matching sessions ↓</button>` : ""}`;
}
function graphPanel(scope, model, ids, {id, sub, peer, local, linked, results, subChips, subCounts}) {
  const chip = color => `<i style="--c:${color}"></i>`;
  if (!id) {
    const top = [];
    ids.forEach((a, i) => ids.slice(i + 1).forEach(b => { const n = model.pair(a, b); if (n) top.push([a, b, n]); }));
    top.sort((x, y) => y[2] - x[2]);
    return `<div class="kg-p-head"><div><h3 id="kg-panel-title">All topics</h3><p>${ids.length} topics · ${scope.length.toLocaleString("en-GB")} sessions</p></div></div>
      <section class="kg-p-sec"><h4>Strongest connections</h4><ol class="kg-p-pairs">${top.slice(0, 8).map(([a, b, n]) =>
        `<li><button type="button" data-kg-pair="${[a, b].sort().join(" ")}" aria-label="${esc(graphName(a))} and ${esc(graphName(b))}: ${graphQty(n)}">${chip(graphFamily(a)[1])}${esc(graphShort[a])}<span aria-hidden="true">+</span>${chip(graphFamily(b)[1])}${esc(graphShort[b])}<b>${n}</b></button></li>`).join("")}</ol></section>
      <section class="kg-p-sec kg-p-help"><h4>Moving around</h4><ul>
        <li>Select a topic, or the line between two, to list their talks here.</li>
        <li>Scroll or pinch to zoom at the pointer. Drag the background to pan, or double-click to zoom in.</li>
        <li>Drag a topic and its connected topics follow; it stays where you drop it. Restore puts everything back.</li>
        <li>With a topic focused: <kbd>+</kbd> <kbd>−</kbd> <kbd>0</kbd> and arrow keys.</li></ul></section>`;
  }
  const [family, color] = graphFamily(id), scoped = [sub && graphTerms[id].find(d => d[0] === sub)?.[1], peer && graphName(peer)].filter(Boolean);
  return `<div class="kg-p-head">${chip(color)}<div><h3 id="kg-panel-title">${esc(graphName(id))}</h3><p>${graphQty(model.count(id))} · ${esc(family)}</p></div></div>
    ${scoped.length ? `<p class="kg-p-scope">${graphQty(results.length)} also ${results.length === 1 ? "matches" : "match"} <b>${scoped.map(esc).join("</b> and <b>")}</b>. <button type="button" class="kg-p-clear" data-kg-topic="${id}">Show all</button></p>` : ""}
    <section class="kg-p-sec"><h4>Sessions <span>${results.length.toLocaleString("en-GB")}</span></h4>${graphSessionList(results)}</section>
    <section class="kg-p-sec"><h4>Connected topics <span>${linked.length}</span></h4>${linked.length ? `<div class="kg-chips">${linked.map(k =>
      `<button type="button" data-kg-peer="${k}" aria-pressed="${k === peer}">${chip(graphFamily(k)[1])}${esc(graphName(k))}<b>${local.pair(id, k)}</b></button>`).join("")}</div>`
      : `<p class="kg-p-none">No other topic tags in this selection.</p>`}${peer ? `<button type="button" class="kg-p-clear" data-kg-topic="${peer}">Explore ${esc(graphName(peer))} instead</button>` : ""}</section>
    ${subChips.length ? `<section class="kg-p-sec kg-subs"><h4>Subtopics</h4><div class="kg-chips">${subChips.map(([k, label]) =>
      `<button type="button" data-kg-topic="${id}" data-kg-sub="${k}" aria-pressed="${k === sub}">${esc(graphSubShort[k] || label)}<b>${subCounts.get(`${id}/${k}`)}</b></button>`).join("")}</div></section>` : ""}`;
}

function renderGraph(scope) {
  const {gTopic:id, gSub:sub, peer} = st;
  const allTopics = [...topics.keys()].filter(k => k !== "review");
  const model = graphMap(scope);
  const ids = allTopics.filter(k => model.count(k) || k === id);
  graphSelectOptions($("kg-topic"),"All topics",ids.map(k => [k,graphName(k),model.count(k)]),id);
  const topicRows = id ? scope.filter(s => s.learning.includes(id)) : scope;
  const defs = graphTerms[id] || [];
  const subInfo = defs.map(([key,label]) => [key,label,topicRows.filter(s => graphEvidence(s,id).has(key)).length])
    .filter(([key,,n]) => n || key === sub);
  graphSelectOptions($("kg-sub"),id ? "All subtopics" : "Choose a topic first",subInfo,sub);
  $("kg-sub").disabled = !subInfo.length;
  const narrowed = sub ? topicRows.filter(s => graphEvidence(s,id).has(sub)) : topicRows;
  const local = sub ? graphMap(narrowed) : model;
  const peers = id ? allTopics.filter(k => k !== id && (local.pair(id,k) || k === peer))
    .sort((a,b) => local.pair(id,b) - local.pair(id,a) || graphName(a).localeCompare(graphName(b))) : [];
  graphSelectOptions($("kg-peer"),id ? "Any related topic" : "Choose a topic first",peers.map(k => [k,graphName(k),local.pair(id,k)]),peer);
  $("kg-peer").disabled = !peers.length;
  $("kg-reset").hidden = !id;
  const results = peer ? narrowed.filter(s => s.learning.includes(peer)) : narrowed;
  const unclassified = scope.filter(s => s.learning.includes("review")).length;
  const selectedLabel = [id && graphName(id),sub && defs.find(d => d[0] === sub)?.[1],peer && graphName(peer)].filter(Boolean).join(" · ");
  $("kg-title").textContent = id ? graphName(id) : "How topics connect";
  $("kg-intro").textContent = id
    ? "Lit topics share talks with this one. Select a topic or the line to it to list the shared talks, or a subtopic to narrow by a term in the session metadata."
    : "Select a topic, or the line between two topics, to see their talks. Zoom, pan and drag to make room.";
  const linked = peers.filter(k => local.pair(id,k)), subCounts = graphSubCounts(scope);
  const subChips = id ? (graphTerms[id] || []).filter(([k]) => subCounts.get(`${id}/${k}`)) : [];
  $("kg-legend").innerHTML = graphFamilies.map(([name,color]) => `<span><i style="--c:${color}"></i>${esc(name)}</span>`).join("");
  $("kg-panel").hidden = !ids.length;
  document.querySelector(".kg-bar").hidden = !ids.length;
  if (ids.length) {
    graphArgs = [model, subCounts, {id, sub, peer, local, near:new Set(linked)}];
    graphDraw();
    $("kg-panel-in").innerHTML = graphPanel(scope, model, ids, {id, sub, peer, local, linked, results, subChips, subCounts});
  } else {
    $("kg-canvas").innerHTML = `<p class="kg-empty">No classified topics match these filters.</p>`;
    gv.topics = gv.links = 0;
    graphApplyView();
  }
  const subsCovered = id && topicRows.filter(s => graphEvidence(s,id).size).length;
  $("kg-caption").textContent = id
    ? `${subsCovered} of ${graphQty(topicRows.length)} match a subtopic in the available metadata. Thicker lines mean more shared talks.`
    : `Circles are topics, sized by talk count. Small dots are subtopics named in titles, catalog tags or descriptions. A line joins two topics tagged on the same talk; thicker lines mean more shared talks, not prerequisites. Colors group related topics.${unclassified ? ` ${graphQty(unclassified)} without a topic stay in the list, off the map.` : ""}`;
  const tentative = results.filter(s => s.mapping?.status === "review" && !s.learning.includes("review")).length;
  if (tentative) $("kg-caption").append(` ${graphQty(tentative)} in the results ${tentative === 1 ? "has" : "have"} tentative topic tags.`);
  $("head").innerHTML = `<h2>${historyMode ? "Watched sessions" : "Matching sessions"}</h2>${selectedLabel ? `<p class="hint">${esc(selectedLabel)}</p>` : ""}`;
  return results;
}
