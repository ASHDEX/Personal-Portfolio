// SOC Wall engine: 3D scenes, scroll choreography, page switching and the secure-boot loader.
// Plain JS on purpose: it drives the server-rendered markup in socwall-markup.ts directly.
import * as THREE_NS from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

const THREE = { ...THREE_NS, RoomEnvironment, EffectComposer, RenderPass, UnrealBloomPass };

export function initSocWall(DATA) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DPR = Math.min(devicePixelRatio || 1, 2);
  gsap.registerPlugin(ScrollTrigger);
  const CYAN = new THREE.Color('#5ad2e6'), RED = new THREE.Color('#ff6b5e'), AMBER = new THREE.Color('#f2b33d');

  /* ── smooth scroll ── */
  let lenis = null;
  if (!reduce && Lenis) { lenis = new Lenis({ lerp: .09 }); lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0); }

  /* ── shared ── */
  const pointer = { tx: 0, ty: 0, x: 0, y: 0, vx: 0, vy: 0, cx: -9999, cy: -9999 };
  addEventListener('pointermove', e => { pointer.tx = e.clientX / innerWidth * 2 - 1; pointer.ty = e.clientY / innerHeight * 2 - 1; pointer.cx = e.clientX; pointer.cy = e.clientY; });
  const spring = dt => { const k = 40, d = 2 * Math.sqrt(k) * .9; pointer.vx += ((pointer.tx - pointer.x) * k - pointer.vx * d) * dt; pointer.x += pointer.vx * dt; pointer.vy += ((pointer.ty - pointer.y) * k - pointer.vy * d) * dt; pointer.y += pointer.vy * dt; };
  const scenes = [], vis = new Map();
  const io = new IntersectionObserver(es => es.forEach(e => vis.set(e.target, e.isIntersecting)), { rootMargin: '100px' });
  const mk = c => { const r = new THREE.WebGLRenderer({ canvas: c, antialias: true, alpha: true }); r.setPixelRatio(DPR); r.setClearColor(0, 0); return r; };
  const fit = (r, cam, el) => { const w = el.clientWidth, h = el.clientHeight; if (!w || !h) return; r.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); };
  const fitDist = (cam, hw, hh) => { const t = Math.tan(cam.fov * Math.PI / 360); return Math.max(hw / (t * cam.aspect), hh / t); };

  /* ── 1. background terrain with sonar pings ── */
  (() => {
    const canvas = document.getElementById('bg'), r = mk(canvas), scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(55, 1, .1, 400); cam.position.set(0, 9, 34);
    const W = 220, D = 160, NX = 110, NZ = 80, pos = [];
    for (let j = 0; j <= NZ; j++) for (let i = 0; i < NX; i++) { const z = -j / NZ * D + 20; pos.push(i / NX * W - W / 2, 0, z, (i + 1) / NX * W - W / 2, 0, z); }
    for (let i = 0; i <= NX; i += 2) for (let j = 0; j < NZ; j++) { const x = i / NX * W - W / 2; pos.push(x, 0, -j / NZ * D + 20, x, 0, -(j + 1) / NZ * D + 20); }
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    const N = `vec2 h2(vec2 p){p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));return -1.+2.*fract(sin(p)*43758.5453);}
      float n2(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);return mix(mix(dot(h2(i),f),dot(h2(i+vec2(1,0)),f-vec2(1,0)),u.x),mix(dot(h2(i+vec2(0,1)),f-vec2(0,1)),dot(h2(i+vec2(1,1)),f-vec2(1,1)),u.x),u.y);}
      float fbm(vec2 p){float v=0.,a=.55;for(int k=0;k<4;k++){v+=a*n2(p);p*=2.03;a*=.5;}return v;}`;
    const mat = new THREE.ShaderMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uT: { value: 0 }, uCol: { value: CYAN }, uPing: { value: new THREE.Vector3(0, 0, -999) }, uPingT: { value: 99 } },
      vertexShader: N + `uniform float uT; varying float vH; varying float vD; varying vec3 vW;
        void main(){ vec3 p=position; float h=fbm(vec2(p.x*.035,(p.z-uT*2.2)*.035)); float v=smoothstep(0.,26.,abs(p.x)); p.y=h*9.*(.25+.75*v)-2.; vH=h; vW=p; vec4 mv=modelViewMatrix*vec4(p,1.); vD=-mv.z; gl_Position=projectionMatrix*mv; }`,
      fragmentShader: `uniform vec3 uCol; uniform vec3 uPing; uniform float uPingT; varying float vH; varying float vD; varying vec3 vW;
        void main(){ float fog=smoothstep(150.,20.,vD)*smoothstep(4.,16.,vD); float crest=smoothstep(.05,.45,vH);
          float d=distance(vW.xz,uPing.xz); float ring=exp(-pow((d-uPingT*28.)/2.2,2.))*exp(-uPingT*1.1);
          gl_FragColor=vec4(uCol*(.35+1.1*crest+ring*3.), fog*(.10+.32*crest+ring*.9)); }` });
    scene.add(new THREE.LineSegments(geo, mat));
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), ray = new THREE.Raycaster(), hit = new THREE.Vector3();
    addEventListener('pointerdown', e => { if (e.target.closest('a,button,.scr,.view3d')) return; ray.setFromCamera(new THREE.Vector2(e.clientX / innerWidth * 2 - 1, -(e.clientY / innerHeight) * 2 + 1), cam); if (ray.ray.intersectPlane(plane, hit)) { mat.uniforms.uPing.value.copy(hit); mat.uniforms.uPingT.value = 0; } });
    const rs = () => fit(r, cam, canvas); addEventListener('resize', rs); rs();
    scenes.push({ always: true, step(t, dt) { mat.uniforms.uT.value = t; mat.uniforms.uPingT.value += dt; cam.position.x = pointer.x * 3.2; cam.position.y = 9 - pointer.y * 1.6; cam.lookAt(0, 2, -40); r.render(scene, cam); } });
    // first ping on load, centred: the sonar announces the wall
    setTimeout(() => { mat.uniforms.uPing.value.set(0, 0, -30); mat.uniforms.uPingT.value = 0; }, reduce ? 0 : 2600);
  })();

  /* ── 2. radar factory ── */
  const CASES = [
    { id: '01', name: 'SWIFT payment fraud via BEC', sev: 'CRITICAL', b: 20, d: .62 },
    { id: '02', name: 'BreachForums exposure · SilverFox C2', sev: 'CRITICAL', b: 75, d: .82 },
    { id: '03', name: 'Enterprise CTI and brand monitoring', sev: 'HIGH', b: 128, d: .48 },
    { id: '04', name: 'Multi-SIEM detection engineering program', sev: 'HIGH', b: 172, d: .74 },
    { id: '05', name: 'Custom implant reverse engineering · C2 takedown', sev: 'CRITICAL', b: 214, d: .56 },
    { id: '06', name: 'Financial API exploitation · MSRPC abuse', sev: 'CRITICAL', b: 258, d: .86 },
    { id: '07', name: 'Cross-cloud lateral movement · Azure AD → AWS', sev: 'CRITICAL', b: 300, d: .40 },
    { id: '08', name: 'Security program architecture, regulated fintech', sev: 'HIGH', b: 338, d: .70 },
  ];
  const makeRadar = (scr, canvas, opt) => {
    io.observe(scr);
    const r = mk(canvas), scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(opt.big ? 34 : 38, 1, .1, 200), R = 10;
    if (opt.big) { scene.fog = new THREE.Fog(0x05070a, 30, 70); scene.add(new THREE.HemisphereLight(0x9fdcff, 0x020304, .5)); }
    const g = new THREE.Group(); scene.add(g);
    const disc = new THREE.Mesh(new THREE.CircleGeometry(R, 96), new THREE.ShaderMaterial({ transparent: true, depthWrite: false,
      vertexShader: 'varying vec2 vP; void main(){ vP=position.xy; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} ',
      fragmentShader: 'varying vec2 vP; void main(){ float d=length(vP)/10.0; gl_FragColor=vec4(.07,.16,.2,.55*(1.-d*d)); }' }));
    disc.rotation.x = -Math.PI / 2; g.add(disc);
    const lm = o => new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: o });
    for (let k = 1; k <= 4; k++) { const p = []; for (let i = 0; i <= 128; i++) { const a = i / 128 * Math.PI * 2; p.push(new THREE.Vector3(Math.cos(a) * R * k / 4, 0, Math.sin(a) * R * k / 4)); } g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(p), lm(k === 4 ? .5 : .18))); }
    const tk = []; for (let i = 0; i < 72; i++) { const a = i / 72 * Math.PI * 2, l = i % 9 === 0 ? .9 : .4; tk.push(Math.cos(a) * R, 0, Math.sin(a) * R, Math.cos(a) * (R + l), 0, Math.sin(a) * (R + l)); }
    const tg = new THREE.BufferGeometry(); tg.setAttribute('position', new THREE.Float32BufferAttribute(tk, 3)); g.add(new THREE.LineSegments(tg, lm(.45)));
    const sm = new THREE.ShaderMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: { uA: { value: 0 } },
      vertexShader: 'varying vec2 vP; void main(){ vP=position.xy; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} ',
      fragmentShader: 'uniform float uA; varying vec2 vP; void main(){ float a=atan(vP.y,vP.x); float d=mod(uA-a,6.2831853); float r=length(vP)/10.0; gl_FragColor=vec4(.35,.82,.9,exp(-d*2.6)*.42*smoothstep(1.,.96,r)); }' });
    const sw = new THREE.Mesh(new THREE.CircleGeometry(R, 128), sm); sw.rotation.x = -Math.PI / 2; sw.position.y = .01; g.add(sw);
    const beam = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, .02, 0), new THREE.Vector3(R, .02, 0)]), lm(.95)); g.add(beam);
    const labels = opt.labels, cap = opt.cap;
    // ── beacon markers: light beam, diamond node in a turning shell, ground glow with target ring and shockwave ──
    const VS = 'varying vec2 vUv; varying vec2 vP; void main(){ vUv=uv; vP=position.xy; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} ';
    const beamMat = (col, k) => new THREE.ShaderMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
      uniforms: { uCol: { value: col }, uI: { value: .6 }, uK: { value: k } }, vertexShader: VS,
      fragmentShader: 'uniform vec3 uCol; uniform float uI; uniform float uK; varying vec2 vUv; void main(){ float a = (0.25 + 0.75*pow(1.0 - vUv.y, 1.4)) * uI * uK; gl_FragColor = vec4(mix(uCol, vec3(1.0), 0.35*uK*uI), a); }' });
    const groundMat = col => new THREE.ShaderMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uCol: { value: col }, uI: { value: .6 }, uP: { value: 1 } }, vertexShader: VS,
      fragmentShader: `uniform vec3 uCol; uniform float uI; uniform float uP; varying vec2 vP;
        void main(){ float d = length(vP);
          float core = exp(-d*d*9.0) * uI * 0.9;
          float target = smoothstep(0.022, 0.0, abs(d - 0.55)) * 0.45 + smoothstep(0.015, 0.0, abs(d - 0.95)) * 0.18;
          float rp = uP * 2.3; float wave = smoothstep(0.16, 0.0, abs(d - rp)) * pow(1.0 - uP, 1.5) * 0.9;
          float a = core + target * (0.5 + 0.5*uI) + wave;
          gl_FragColor = vec4(mix(uCol, vec3(1.0), core*0.4), a * smoothstep(2.4, 2.0, d)); }` });
    const nodeGeo = new THREE.OctahedronGeometry(.17, 0), shellGeo = new THREE.EdgesGeometry(new THREE.OctahedronGeometry(.34, 0));
    const pillars = CASES.map(c => {
      const crit = c.sev === 'CRITICAL', a = c.b * Math.PI / 180, x = Math.cos(a) * R * c.d, z = -Math.sin(a) * R * c.d, h = crit ? 3.1 : 1.9, col = crit ? RED : AMBER;
      const grp = new THREE.Group(); grp.position.set(x, 0, z); g.add(grp);
      const core = new THREE.Mesh(new THREE.CylinderGeometry(.036, .036, h, 12, 1, true), beamMat(col, 1)); core.position.y = h / 2; grp.add(core);
      const halo = new THREE.Mesh(new THREE.CylinderGeometry(.2, .2, h, 24, 1, true), beamMat(col, .3)); halo.position.y = h / 2; grp.add(halo);
      const ground = new THREE.Mesh(new THREE.PlaneGeometry(4.8, 4.8), groundMat(col)); ground.rotation.x = -Math.PI / 2; ground.position.y = .02; grp.add(ground);
      const node = new THREE.Mesh(nodeGeo, new THREE.MeshBasicMaterial({ color: col.clone().lerp(new THREE.Color(1, 1, 1), .35) })); node.position.y = h; grp.add(node);
      const shell = new THREE.LineSegments(shellGeo, new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: .55 })); shell.position.y = h; grp.add(shell);
      const p = { c, a, grp, core, halo, ground, node, shell, col, h, crit, flash: 0, pt: 1, hot: false, spin: Math.random() * 6, I: .6 };
      if (labels) {
        const el = document.createElement('span'); el.className = 'tag' + (crit ? ' crit' : ''); el.innerHTML = `${c.id}<span class="nm">${c.name}</span>`; el.tabIndex = 0;
        el.setAttribute('aria-label', `Case ${c.id}: ${c.name}, ${c.sev.toLowerCase()}`); labels.appendChild(el); p.el = el;
        const on = () => { p.hot = true; el.classList.add('on'); cap.innerHTML = `<b>Case ${c.id}</b> · ${c.name}`; };
        const off = () => { p.hot = false; el.classList.remove('on'); cap.textContent = 'Hover a marker to read the case'; };
        el.addEventListener('mouseenter', on); el.addEventListener('mouseleave', off); el.addEventListener('focus', on); el.addEventListener('blur', off);
      }
      return p;
    });
    const rs = () => fit(r, cam, scr); new ResizeObserver(rs).observe(scr); rs();
    const v = new THREE.Vector3(); let A = 0;
    scenes.push({ el: scr, step(t, dt) {
      const prev = A; A = (A + dt * .9) % (Math.PI * 2); sm.uniforms.uA.value = A; beam.rotation.y = A;
      const yaw = -.35 + pointer.x * .12, pitch = (cam.aspect < .8 ? 1.22 : (opt.big ? .62 : .78)) - pointer.y * .06;
      const Dd = fitDist(cam, R + 1.6, R * .62) * (opt.big ? .9 : 1.04);
      cam.position.set(Math.sin(yaw) * Dd * Math.cos(pitch), Math.sin(pitch) * Dd, Math.cos(yaw) * Dd * Math.cos(pitch)); cam.lookAt(0, .6, 0);
      const W = scr.clientWidth, H = scr.clientHeight;
      pillars.forEach(p => {
        const crossed = prev <= A ? (p.a > prev && p.a <= A) : (p.a > prev || p.a <= A);
        if (crossed) { p.flash = 1; p.pt = 0; }
        p.flash = Math.max(0, p.flash - dt * .9); p.pt = Math.min(1, p.pt + dt * .55);
        // intensity eases toward its target: idle breathe, sweep flare, hover lock
        const breathe = .5 + .08 * Math.sin(t * (p.crit ? 3.2 : 2) + p.a * 3);
        const want = breathe + p.flash * 1.1 + (p.hot ? .9 : 0);
        p.I += (want - p.I) * Math.min(1, dt * 10);
        p.core.material.uniforms.uI.value = p.I; p.halo.material.uniforms.uI.value = p.I;
        p.ground.material.uniforms.uI.value = p.I; p.ground.material.uniforms.uP.value = p.pt;
        p.spin += dt * (.5 + p.flash * 5 + (p.hot ? 1.5 : 0));
        p.shell.rotation.set(p.spin * .6, p.spin, 0); p.node.rotation.y = -p.spin * .8;
        const ns = 1 + p.flash * .45 + (p.hot ? .3 : 0); p.node.scale.setScalar(ns); p.shell.scale.setScalar(1 + p.flash * .25 + (p.hot ? .2 : 0));
        p.shell.material.opacity = .35 + p.flash * .5 + (p.hot ? .4 : 0);
        p.node.position.y = p.shell.position.y = p.h + Math.sin(t * 1.6 + p.a) * .06;
        if (p.el) { v.set(p.grp.position.x, p.h + .55, p.grp.position.z).project(cam); p.el.style.left = ((v.x + 1) / 2 * W) + 'px'; p.el.style.top = ((1 - v.y) / 2 * H) + 'px'; }
      });
      r.render(scene, cam);
    }});
  };
  makeRadar(document.getElementById('radarScr'), document.getElementById('radar'), { labels: document.getElementById('radarLabels'), cap: document.getElementById('radarCap') });
  makeRadar(document.getElementById('escCard'), document.getElementById('escGL'), { big: true });

  /* ── 3. ATT&CK matrix ── */
  const TACTICS = [
    ['Resource Dev', [['T1583.001','Acquire Domains','03']]], ['Initial Access', [['T1566.002','Spearphishing Link','01']]], ['Execution', [['T1053.005','Scheduled Task','01']]],
    ['Persistence', [['T1098.003','Additional Cloud Roles','01'],['T1053.005','Scheduled Task','01']]], ['Priv. Escalation', [['T1078.004','Valid Accounts: Cloud','07']]],
    ['Defense Evasion', [['T1055.001','Reflective DLL Injection','02'],['T1055.003','CreateRemoteThread','04'],['T1027.003','Steganography','BofA'],['T1550.001','App Access Token','07']]],
    ['Credential Access', [['T1110.003','Password Spraying','BofA'],['T1003.001','LSASS Memory','05']]], ['Discovery', [['T1046','Network Service Discovery','06']]],
    ['Lateral Movement', [['T1021.003','DCOM / MSRPC','06'],['T1550.001','App Access Token (SAML)','07']]],
    ['Command & Control', [['T1071.001','Web Protocol C2','02'],['T1071.004','DNS C2','05'],['T1568.002','Domain Generation Algo','05']]], ['Exfiltration', [['T1048','Exfil Over Alt Protocol','BofA']]],
  ];
  const SHORT = ['Res Dev', 'Initial', 'Exec', 'Persist', 'PrivEsc', 'Evasion', 'Creds', 'Discov', 'Lateral', 'C2', 'Exfil'];
  (() => {
    const scr = document.getElementById('matrixScr'), canvas = document.getElementById('matrix'), labels = document.getElementById('matrixLabels'), cap = document.getElementById('matrixCap');
    io.observe(scr);
    const r = mk(canvas), scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(32, 1, .1, 200);
    scene.add(new THREE.HemisphereLight(0x9fe8f5, 0x05080c, .9)); const key = new THREE.DirectionalLight(0xffffff, .9); key.position.set(6, 12, 8); scene.add(key);
    const N = TACTICS.length, gap = 1.25, solidGeo = new THREE.BoxGeometry(.9, .7, .9), edgeGeo = new THREE.EdgesGeometry(solidGeo), pick = [], tl = [];
    TACTICS.forEach(([tac, techs], i) => {
      const x = (i - (N - 1) / 2) * gap;
      techs.forEach((t, k) => { const b = new THREE.Mesh(solidGeo, new THREE.MeshStandardMaterial({ color: 0x2a8fa0, emissive: 0x0b3a44, roughness: .45 })); b.position.set(x, .35 + k * .8, 0); b.userData = { tac, t, base: b.position.y, i }; scene.add(b); pick.push(b); const e = new THREE.LineSegments(edgeGeo, new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: .55 })); e.position.copy(b.position); scene.add(e); b.userData.edge = e; });
      for (let k = 0; k < 2; k++) { const e = new THREE.LineSegments(edgeGeo, new THREE.LineBasicMaterial({ color: 0x3a4a5a, transparent: true, opacity: .55 })); e.position.set(x, .35 + (techs.length + k) * .8, 0); scene.add(e); }
      const el = document.createElement('span'); el.className = 'tlabel'; el.textContent = SHORT[i]; el.title = tac; labels.appendChild(el); tl.push({ el, x, low: i % 2 === 1 });
    });
    const ray = new THREE.Raycaster(), m2 = new THREE.Vector2(-9, -9); let hover = null, inside = false; const def = cap.innerHTML;
    scr.addEventListener('pointermove', e => { const b = scr.getBoundingClientRect(); m2.set((e.clientX - b.left) / b.width * 2 - 1, -((e.clientY - b.top) / b.height) * 2 + 1); inside = true; });
    scr.addEventListener('pointerleave', () => { inside = false; m2.set(-9, -9); });
    const rs = () => fit(r, cam, scr); new ResizeObserver(rs).observe(scr); rs();
    const v = new THREE.Vector3();
    scenes.push({ el: scr, step(t, dt) {
      const yaw = Math.sin(t * .18) * .32 + pointer.x * .1, dist = fitDist(cam, N * gap / 2 + .6, 3.4) * 1.05;
      cam.position.set(Math.sin(yaw) * dist, 8.5 - pointer.y * .8, Math.cos(yaw) * dist); cam.lookAt(0, 1.6, 0);
      ray.setFromCamera(m2, cam); const h = inside ? (ray.intersectObjects(pick)[0] || {}).object || null : null;
      if (h !== hover) { hover = h; cap.innerHTML = h ? `<b>${h.userData.t[0]}</b> ${h.userData.t[1]} · ${/^\d/.test(h.userData.t[2]) ? 'case ' + h.userData.t[2] : 'Bank of America insider program'}` : def; }
      pick.forEach(b => { const want = b === hover ? .35 : 0; b.userData.lift = (b.userData.lift || 0) + (want - (b.userData.lift || 0)) * Math.min(1, dt * 14); b.position.y = b.userData.base + b.userData.lift + (reduce ? 0 : Math.max(0, Math.sin(t * 1.4 - b.userData.i * .45)) * .06); b.userData.edge.position.y = b.position.y; b.material.emissive.setHex(b === hover ? 0x2a8fa0 : 0x0b3a44); });
      const W = scr.clientWidth, H = scr.clientHeight; tl.forEach(l => { v.set(l.x, -.2, 1.4).project(cam); l.el.style.left = ((v.x + 1) / 2 * W) + 'px'; l.el.style.top = ((1 - v.y) / 2 * H + (l.low ? 14 : 0)) + 'px'; });
      r.render(scene, cam);
    }});
  })();

  /* ── 4. kill chain: a tube drawn by scroll through eight stages ── */
  const STAGES = DATA.wall.stages;
  const steps = document.getElementById('steps');
  steps.innerHTML = STAGES.map(([n, d, id, src], i) => `<li><span class="n num">${String(i + 1).padStart(2, '0')}</span><span class="t">${n}<small>${d} · ${src}</small></span><span class="id">${id}</span></li>`).join('');
  const chain = (() => {
    const box = document.getElementById('chainView'), canvas = document.getElementById('chainGL');
    io.observe(box);
    const r = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    r.setPixelRatio(Math.min(DPR, 1.5)); r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = 1.1;
    const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(40, 1, .1, 200);
    scene.background = new THREE.Color(0x04070b); scene.fog = new THREE.FogExp2(0x04070b, .028);
    if (THREE.RoomEnvironment) { const pm = new THREE.PMREMGenerator(r); scene.environment = pm.fromScene(new THREE.RoomEnvironment(), .04).texture; }
    scene.add(new THREE.HemisphereLight(0x9fdcff, 0x020304, .35));
    const kl = new THREE.DirectionalLight(0xffffff, .9); kl.position.set(4, 8, 6); scene.add(kl);

    // bloom, when the post-processing scripts are present
    let composer = null, bloom = null;
    if (THREE.EffectComposer && THREE.UnrealBloomPass) {
      composer = new THREE.EffectComposer(r);
      composer.addPass(new THREE.RenderPass(scene, cam));
      bloom = new THREE.UnrealBloomPass(new THREE.Vector2(256, 256), .72, .5, .24);
      composer.addPass(bloom);
    }

    const CY = new THREE.Color('#5ad2e6'), THREAT = new THREE.Color('#ff5a4e'), DIM = new THREE.Color('#1a232d');
    // stage nodes on a descending helix: the intrusion goes deeper into the estate
    const nodes = STAGES.map((s, i) => { const a = i * .95, y = 6 - i * 1.75; return new THREE.Vector3(Math.cos(a) * 6, y, Math.sin(a) * 6); });
    const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(-14, 9, -4), ...nodes, new THREE.Vector3(10, -10, 6)], false, 'centripetal');
    const nodeTs = nodes.map(n => { let best = 0, bd = 1e9; for (let i = 0; i <= 600; i++) { const d = curve.getPoint(i / 600).distanceTo(n); if (d < bd) { bd = d; best = i / 600; } } return best; });

    // ── conduit: fresnel rim, forward-flowing pulses, glowing leading edge ──
    const tubeMat = new THREE.ShaderMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uProg: { value: 0 }, uT: { value: 0 }, uCol: { value: CY } },
      vertexShader: `varying vec2 vUv; varying vec3 vN; varying vec3 vV;
        void main(){ vUv = uv; vN = normalize(normalMatrix * normal); vec4 mv = modelViewMatrix * vec4(position, 1.0); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `uniform float uProg; uniform float uT; uniform vec3 uCol; varying vec2 vUv; varying vec3 vN; varying vec3 vV;
        void main(){
          if (vUv.x > uProg) discard;
          float fres = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.2);
          float flow = pow(max(0.0, sin(vUv.x * 140.0 - uT * 7.0)), 18.0);
          float lead = exp(-(uProg - vUv.x) * 55.0);
          float tail = smoothstep(0.0, 0.06, vUv.x);
          vec3 c = uCol * (0.18 + fres * 1.4 + flow * 1.6) + vec3(1.0) * lead * 1.8;
          gl_FragColor = vec4(c, (0.22 + fres * 0.7 + flow * 0.6 + lead) * tail);
        }` });
    scene.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 900, .16, 20, false), tubeMat));

    // ── route not yet travelled: shimmering particles ──
    const RP = 700, rpos = new Float32Array(RP * 3), rt = new Float32Array(RP);
    for (let i = 0; i < RP; i++) { const k = i / (RP - 1), q = curve.getPoint(k); rpos[i*3] = q.x; rpos[i*3+1] = q.y; rpos[i*3+2] = q.z; rt[i] = k; }
    const rg = new THREE.BufferGeometry(); rg.setAttribute('position', new THREE.BufferAttribute(rpos, 3)); rg.setAttribute('aT', new THREE.BufferAttribute(rt, 1));
    const routeMat = new THREE.ShaderMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: { uProg: { value: 0 }, uT: { value: 0 } },
      vertexShader: `attribute float aT; uniform float uProg; uniform float uT; varying float vA;
        void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); float ahead = step(uProg, aT);
          vA = ahead * (0.25 + 0.35 * sin(aT * 220.0 - uT * 3.0)) * smoothstep(uProg, uProg + 0.04, aT);
          gl_PointSize = (2.2 + 1.6 * vA) * (60.0 / -mv.z); gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `varying float vA; void main(){ float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard; gl_FragColor = vec4(0.35, 0.75, 0.85, vA * (1.0 - d * 2.0)); }` });
    scene.add(new THREE.Points(rg, routeMat));

    // ── dust for depth ──
    const DN = 900, dpos = new Float32Array(DN * 3);
    for (let i = 0; i < DN; i++) { dpos[i*3] = (Math.random() - .5) * 40; dpos[i*3+1] = (Math.random() - .5) * 30; dpos[i*3+2] = (Math.random() - .5) * 40; }
    const dg = new THREE.BufferGeometry(); dg.setAttribute('position', new THREE.BufferAttribute(dpos, 3));
    const dust = new THREE.Points(dg, new THREE.PointsMaterial({ color: 0x6fb7c8, size: .05, transparent: true, opacity: .45, depthWrite: false }));
    scene.add(dust);

    // ── packet head with spark trail and its own light ──
    const glowTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d'); const g = x.createRadialGradient(64, 64, 0, 64, 64, 64); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(.18, 'rgba(160,240,255,.85)'); g.addColorStop(.5, 'rgba(90,210,230,.18)'); g.addColorStop(1, 'rgba(90,210,230,0)'); x.fillStyle = g; x.fillRect(0, 0, 128, 128); return new THREE.CanvasTexture(c); })();
    const head = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true })); head.scale.setScalar(2.2); scene.add(head);
    const headLight = new THREE.PointLight(0x7fe6ff, 3, 9, 2); scene.add(headLight);
    const TN = 48, tpos = new Float32Array(TN * 3), tA = new Float32Array(TN);
    for (let i = 0; i < TN; i++) tA[i] = 1 - i / TN;
    const tg = new THREE.BufferGeometry(); tg.setAttribute('position', new THREE.BufferAttribute(tpos, 3)); tg.setAttribute('aA', new THREE.BufferAttribute(tA, 1));
    const trail = new THREE.Points(tg, new THREE.ShaderMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: `attribute float aA; varying float vA; void main(){ vA = aA; vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_PointSize = (1.0 + 7.0 * aA) * (40.0 / -mv.z); gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `varying float vA; void main(){ float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard; gl_FragColor = vec4(mix(vec3(0.35,0.82,0.9), vec3(1.0), vA*vA), vA * vA * (1.0 - d * 2.0)); }` }));
    scene.add(trail);
    const jitter = Array.from({ length: TN }, () => new THREE.Vector3((Math.random() - .5) * .35, (Math.random() - .5) * .35, (Math.random() - .5) * .35));

    // ── molecules: one per stage ──
    const atomGeo = new THREE.SphereGeometry(1, 32, 24), bondGeo = new THREE.CylinderGeometry(1, 1, 1, 10, 1, true);
    const shellGeo = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.22, 1));
    const waveMat = () => new THREE.ShaderMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, uniforms: { uA: { value: 0 } },
      vertexShader: `varying vec3 vN; varying vec3 vV; void main(){ vN = normalize(normalMatrix * normal); vec4 mv = modelViewMatrix * vec4(position, 1.0); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `uniform float uA; varying vec3 vN; varying vec3 vV; void main(){ float f = pow(1.0 - abs(dot(vN, vV)), 3.0); gl_FragColor = vec4(0.45, 0.88, 0.95, f * uA); }` });
    const mols = nodes.map((n, i) => {
      const g = new THREE.Group(); g.position.copy(n); scene.add(g);
      const spin = new THREE.Group(); g.add(spin);
      const coreMat = new THREE.MeshPhysicalMaterial({ color: 0x141b23, roughness: .22, metalness: .1, clearcoat: 1, clearcoatRoughness: .08, emissive: 0x000000 });
      const core = new THREE.Mesh(atomGeo, coreMat); core.scale.setScalar(.42); spin.add(core);
      const count = 3 + (i % 3), sats = [];
      for (let k = 0; k < count; k++) {
        // deterministic spread on a sphere (golden angle)
        const phi = Math.acos(1 - 2 * (k + .5) / count), th = k * 2.39996 + i;
        const dir = new THREE.Vector3(Math.sin(phi) * Math.cos(th), Math.cos(phi), Math.sin(phi) * Math.sin(th)), len = .95 + (k % 2) * .25;
        const m = new THREE.MeshPhysicalMaterial({ color: 0x18212b, roughness: .3, clearcoat: 1, emissive: 0x000000 });
        const atom = new THREE.Mesh(atomGeo, m); atom.scale.setScalar(.13 + (k % 3) * .03); atom.position.copy(dir).multiplyScalar(len); spin.add(atom);
        const bm = new THREE.MeshBasicMaterial({ color: DIM, transparent: true, opacity: .8 });
        const bond = new THREE.Mesh(bondGeo, bm); bond.scale.set(.025, len, .025); bond.position.copy(dir).multiplyScalar(len / 2);
        bond.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir); spin.add(bond);
        sats.push({ m, bm, k });
      }
      const shell = new THREE.LineSegments(shellGeo, new THREE.LineBasicMaterial({ color: CY, transparent: true, opacity: 0 })); g.add(shell);
      const wave = new THREE.Mesh(atomGeo, waveMat()); wave.visible = false; g.add(wave);
      const lt = new THREE.PointLight(0x5ad2e6, 0, 5, 2); g.add(lt);
      return { g, spin, coreMat, sats, count, shell, wave, lt, on: 0, active: false, waveT: 1, sS: 1.7, sV: 0, seed: i * 1.37 };
    });

    const rs = () => { const w = box.clientWidth, h = box.clientHeight; if (!w || !h) return; r.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); if (composer) { composer.setSize(w, h); bloom.resolution.set(w / 2, h / 2); } };
    new ResizeObserver(rs).observe(box); rs();
    let P = 0, sm = 0;
    const now = document.getElementById('chainNow'), pct = document.getElementById('chainPct'), lis = [...steps.children];
    const tmp = new THREE.Color();
    scenes.push({ el: box, step(t, dt) {
      sm += (P - sm) * Math.min(1, dt * 6);
      const prog = Math.max(.0005, Math.min(.9995, sm));
      tubeMat.uniforms.uProg.value = prog; tubeMat.uniforms.uT.value = t;
      routeMat.uniforms.uProg.value = prog; routeMat.uniforms.uT.value = t;
      const hp = curve.getPoint(prog); head.position.copy(hp); headLight.position.copy(hp);
      head.scale.setScalar(2 + Math.sin(t * 9) * .15);
      for (let k = 0; k < TN; k++) { const q = curve.getPoint(Math.max(0, prog - k * .0022)); tpos[k*3] = q.x + jitter[k].x * k / TN; tpos[k*3+1] = q.y + jitter[k].y * k / TN; tpos[k*3+2] = q.z + jitter[k].z * k / TN; }
      tg.attributes.position.needsUpdate = true;
      dust.rotation.y = t * .01;

      let reached = 0;
      mols.forEach((s, i) => {
        const want = prog >= nodeTs[i] - .004;
        if (want) reached = i + 1;
        if (want && !s.active) { s.waveT = 0; s.sS = 1.9; s.sV = 0; }   // rising edge: shockwave + shell snaps in
        s.active = want;
        s.on += ((want ? 1 : 0) - s.on) * Math.min(1, dt * 4);
        // threat state: faint red pulse; contained: cyan
        const threat = (1 - s.on) * (.42 + .2 * Math.sin(t * 2.4 + s.seed));
        s.coreMat.emissive.copy(THREAT).multiplyScalar(threat).add(tmp.copy(CY).multiplyScalar(s.on * .42));
        s.sats.forEach(a => {
          const local = Math.max(0, Math.min(1, s.on * (s.count + 1) - a.k));   // atoms light one after another
          a.m.emissive.copy(THREAT).multiplyScalar(threat * .8).add(tmp.copy(CY).multiplyScalar(local * .65));
          a.bm.color.copy(DIM).lerp(CY, local);
        });
        s.spin.rotation.y += dt * (.25 + s.on * .5); s.spin.rotation.x = Math.sin(t * .4 + s.seed) * .3;
        // containment shell on an underdamped spring: slight overshoot as it locks
        const target = want ? 1 : 1.9, k = 120, d = 9;
        s.sV += ((target - s.sS) * k - s.sV * d) * dt; s.sS += s.sV * dt;
        s.shell.scale.setScalar(s.sS); s.shell.material.opacity = s.on * .4; s.shell.rotation.y -= dt * .3; s.shell.rotation.z += dt * .12;
        s.waveT = Math.min(1, s.waveT + dt * .9);
        s.wave.visible = s.waveT < 1; s.wave.scale.setScalar(.5 + (1 - Math.pow(1 - s.waveT, 3)) * 4); s.wave.material.uniforms.uA.value = (1 - s.waveT) * 1.6;
        s.lt.intensity = s.on * .9 + (1 - s.waveT) * 3;
      });
      lis.forEach((li, i) => { li.classList.toggle('on', i < reached); li.classList.toggle('cur', i === reached - 1); });
      now.textContent = reached ? `Stage ${reached} of 8 contained · ${STAGES[reached - 1][2]}` : 'Stage 0 of 8';
      pct.textContent = Math.round(reached / 8 * 100) + '%';
      // camera rides alongside the packet, easing toward it
      const camT = new THREE.Vector3(hp.x * .35 + 15 + pointer.x * 1.5, hp.y + 5 - pointer.y, hp.z * .35 + 16);
      cam.position.lerp(camT, Math.min(1, dt * 2.5)); cam.lookAt(hp.x * .8, hp.y - .6, hp.z * .8);
      composer ? composer.render() : r.render(scene, cam);
    }});
    return { set: p => { P = p; } };
  })();

  /* ── record feed + ledger + timeline ── */
  const RECORD = DATA.wall.record;
  (() => {
    const feed = document.getElementById('feed'), count = document.getElementById('streamCount'), pause = document.getElementById('pause'); let i = 0, paused = false;
    const add = anim => { const [y, w, m, c] = RECORD[i++]; const li = document.createElement('li'); if (c) li.classList.add('crit'); if (anim) li.classList.add('enter'); li.innerHTML = `<time>${y}</time><div class="what"><b>${w}</b><span>${m}</span></div>`; feed.appendChild(li); count.textContent = `${i} of ${RECORD.length} entries`; };
    for (let k = 0; k < (reduce ? RECORD.length : 6); k++) add(false);
    pause.hidden = reduce; pause.addEventListener('click', () => { paused = !paused; pause.textContent = paused ? 'Resume feed' : 'Pause feed'; });
    const tm = setInterval(() => { if (paused || document.hidden) return; if (i >= RECORD.length) { clearInterval(tm); pause.hidden = true; return; } add(true); }, 3400);
  })();
  (() => {
    const L = DATA.wall.results;
    const tb = document.getElementById('ledger');
    tb.innerHTML = L.map(([m, w, d, a]) => `<tr><td><div class="m">${m}</div><div class="where">${w}</div></td><td class="viz"><div class="meter" style="--after:${(a * 100).toFixed(1)}%"><i></i></div></td><td class="delta num">${d}</td></tr>`).join('');
    new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { tb.querySelectorAll('.meter').forEach((m, k) => setTimeout(() => m.classList.add('in'), 120 + k * 60)); o.disconnect(); } }).observe(tb);
  })();


  /* ── decrypt: ciphertext resolves to plaintext ── */
  const HEX = '0123456789abcdef', GLY = '█▓▒░<>/\\#$%&01';
  const decrypt = (el, dur = 900, set = HEX) => new Promise(res => {
    const final = el.dataset.plain ?? (el.dataset.plain = el.innerText);
    if (reduce) { el.textContent = final; return res(); }
    const t0 = performance.now();
    const f = () => { const k = Math.min(1, (performance.now() - t0) / dur);
      el.textContent = [...final].map((ch, i) => (ch === '\n' || ch === ' ' || i / final.length < k) ? ch : set[(Math.random() * set.length) | 0]).join('');
      k < 1 ? requestAnimationFrame(f) : res(); };
    f();
  });

  /* ── scroll choreography ── */
  const choreo = () => {
    // target lock on every monitor
    document.querySelectorAll('.mon').forEach(m => {
      ['tl', 'tr', 'bl', 'br'].forEach(c => { const s = document.createElement('i'); s.className = 'lock ' + c; m.appendChild(s); });
      ScrollTrigger.create({ trigger: m, start: 'top 88%', once: true, onEnter: () => { m.classList.add('locked'); setTimeout(() => m.classList.add('settled'), 1400); } });
    });
    document.querySelectorAll('[data-dec]').forEach(el => { el.dataset.plain = el.innerText; if (el.closest('.view').id !== 'home') return; ScrollTrigger.create({ trigger: el, start: 'top 85%', once: true, onEnter: () => decrypt(el, 1000) }); });
    ScrollTrigger.create({ trigger: '#chain', start: 'top top', end: 'bottom bottom', scrub: true, onUpdate: s => chain.set(s.progress) });
    const tl = gsap.timeline({ scrollTrigger: { trigger: '#esc', start: 'top top', end: 'bottom bottom', scrub: .6 } });
    tl.fromTo('#escCard', { clipPath: 'inset(38% 36% 20% 36% round 10px)' }, { clipPath: 'inset(0% 0% 0% 0% round 12px)', ease: 'power2.inOut', duration: 1 }, 0)
      .fromTo('#wA', { x: 0 }, { x: () => -innerWidth * .16, ease: 'power2.inOut', duration: 1 }, 0)
      .fromTo('#wB', { x: 0 }, { x: () => innerWidth * .16, ease: 'power2.inOut', duration: 1 }, 0)
      .fromTo('.esc .words', { y: 0 }, { y: () => -innerHeight * .3, ease: 'power2.inOut', duration: 1 }, 0)
      .to('#escMeta', { opacity: 1, duration: .2 }, .8);
  };

  /* ── pages: content straight from the portfolio's data files ── */
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const PAGES = [
    ['home', 'WHOAMI', 'Analyst on shift'], ['timeline', 'TIMELINE', '6 roles'], ['incidents', 'INCIDENT_FILES', '8 cases'], ['attack', 'ATT&CK', 'Kill chain + matrix'],
    ['leadership', 'LEADERSHIP', 'Team, reporting, architecture'], ['capability', 'CAPABILITY', '6 domains'], ['deployed', 'DEPLOYED', '6 projects'], ['credentials', 'CREDENTIALS', '15 held + 2 in progress'],
    ['opensource', 'OPEN_SOURCE', '6 repos'], ['comms', 'COMMS', 'Contact'],
  ];
  const pageIdx = id => PAGES.findIndex(p => p[0] === id);
  const label = id => { const i = pageIdx(id); return `${String(i + 1).padStart(2, '0')} / ${PAGES[i][1]}`; };

  // 02 timeline
  document.getElementById('tlBody').innerHTML = DATA.experience.map(e => {
    const yr = (e.date.match(/\d{4}/) || [''])[0];
    return `<div class="tl-row"><div class="when"><b class="num">${yr}</b>${esc(e.date)}${e.location ? '<br>' + esc(e.location) : ''}</div>
      <div><h3>${esc(e.role)}</h3><div class="co">${esc(e.company)}</div>${e.scope ? `<p class="scope">${esc(e.scope)}</p>` : ''}${e.metrics ? `<div class="mx">${e.metrics.map(m => `<div><b class="num">${esc(m.value)}</b><span>${esc(m.label)}</span></div>`).join('')}</div>` : ''}</div>
      <div>${e.draft ? `<p class="draft">Draft · ${esc(e.draft)}</p>` : ''}${e.bullets.length ? `<ul>${e.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>` : ''}<div class="chips">${e.tags.map(t => `<span class="chip">${esc(t)}</span>`).join('')}</div></div></div>`;
  }).join('');

  // 03 incident files
  const hl = code => esc(code)
    .replace(/(\/\/[^\n]*|#[^\n]*)/g, '<span class="cm">$1</span>')
    .replace(/(&quot;[^&\n]*?&quot;|'[^'\n]*')/g, '<span class="st">$1</span>')
    .replace(/\b(where|extend|project|summarize|join|let|on|by|kind|and|or|in|has_any|contains|title|detection|condition|selection|logsource|rule|strings|meta|SELECT|FROM|WHERE|AND|OR|count|dynamic|ago|bin|tostring|search|stats|eval|table|index|sourcetype)\b/g, '<span class="kw">$1</span>');
  const cs = DATA.caseStudies, crit = cs.filter(c => c.severity === 'CRITICAL').length;
  document.getElementById('cfMeta').innerHTML = `<span><b>${cs.length}</b> engagements</span><span><b>${crit}</b> critical · <b>${cs.length - crit}</b> high</span>`;
  document.getElementById('cfBody').innerHTML = cs.map((c, i) => `<article class="cf${i === 0 ? ' open' : ''}" id="case-${c.id}">
      <button class="cf-h" aria-expanded="${i === 0}"><span class="id num">${c.id}</span><span class="sev ${c.severity}">${c.severity}</span><span class="t">${esc(c.title)}</span><span class="pm" aria-hidden="true"></span></button>
      <div class="cf-b"><div><div class="cf-in">
        ${c.role ? `<p class="myrole"><span>My role</span>${esc(c.role)}</p>` : ''}
        <div class="chips">${c.tags.map(t => `<span class="chip">${esc(t)}</span>`).join('')}</div>
        <div class="cf-3"><div><h4>Scenario</h4><p>${esc(c.scenario)}</p></div><div><h4>Investigation</h4><p>${esc(c.investigation)}</p></div><div><h4>Response</h4><p>${esc(c.response)}</p></div></div>
        <div class="cf-imp">${c.impact.map(m => `<div><b>${esc(m.value)}</b><span>${esc(m.label)}</span></div>`).join('')}</div>
        ${c.impactSummary ? `<p class="cf-sum">${esc(c.impactSummary)}</p>` : ''}
        ${c.detectionExample ? `<div class="code"><div class="ch"><b>${esc(c.detectionExample.title)}</b><span>${esc(c.detectionExample.mitre)} · ${esc(c.detectionExample.language)}<button class="copy" type="button" data-copy-code>Copy</button></span></div><pre>${hl(c.detectionExample.code)}</pre></div>` : ''}
      </div></div></div></article>`).join('');
  document.querySelectorAll('.cf-h').forEach(h => h.addEventListener('click', () => { const a = h.parentElement, o = !a.classList.contains('open'); a.classList.toggle('open', o); h.setAttribute('aria-expanded', o); setTimeout(() => ScrollTrigger.refresh(), 520); }));

  // 04 att&ck matrix
  const MX = DATA.mitreTactics, tcount = MX.reduce((n, t) => n + t.techs.length, 0);
  document.getElementById('mxMeta').innerHTML = `<span><b>${MX.length}</b> tactics</span><span><b>${tcount}</b> techniques detected</span><span>click a technique to open its case</span>`;
  document.getElementById('mxGrid').innerHTML = MX.map(t => `<div class="mx-col"><h3>${esc(t.tactic)}<small>${t.techs.length}</small></h3>
      ${t.techs.map(x => x.case ? `<a class="cell" href="#case-${x.case}" data-go="incidents"><span>${x.id}</span>${esc(x.name)}<em>case ${x.case}</em></a>` : `<a class="cell" href="#" data-go="timeline"><span>${x.id}</span>${esc(x.name)}<em>${esc(x.exp || '')}</em></a>`).join('')}
      ${t.dim.map(x => `<div class="cell dim"><span>${x.id}</span>${esc(x.name)}</div>`).join('')}</div>`).join('');

  // 05 capability
  const SG = DATA.skillGroups;
  document.getElementById('capMeta').innerHTML = `<span><b>${SG.length}</b> domains</span><span><b>${SG.reduce((n, g) => n + g.skills.length, 0)}</b> tools and disciplines</span>`;
  document.getElementById('capGrid').innerHTML = SG.map(g => `<section class="mon"><h2>${esc(g.title)} <small>${g.skills.length}</small></h2><div class="scr"><div class="chips">${g.skills.map(s => `<span class="chip">${esc(s)}</span>`).join('')}</div></div></section>`).join('');

  // 06 deployed
  document.getElementById('pjBody').innerHTML = DATA.projects.map(p => `<article class="pj"><h3><span class="num">${p.id}</span>${esc(p.name)}</h3>${p.context ? `<span class="ctx">${esc(p.context)} project</span>` : ''}
      <div class="cf-3"><div><h4>Problem</h4><p>${esc(p.problem)}</p></div><div><h4>Approach</h4><p>${esc(p.approach)}</p></div><div><h4>Outcome</h4><p>${esc(p.outcome)}</p></div></div>
      <div class="chips">${p.tools.map(t => `<span class="chip">${esc(t)}</span>`).join('')}</div>${p.repo ? `<a class="repo" href="${esc(p.repo.url)}" target="_blank" rel="noopener">View ${esc(p.repo.label)} on GitHub <span aria-hidden="true">↗</span></a>` : ''}</article>`).join('');

  // 07 credentials + 08 in progress
  const CR = DATA.certifications, iss = [...new Set(CR.map(c => c.issuer))];
  document.getElementById('crMeta').innerHTML = `<span><b>${CR.length}</b> certifications</span><span><b>${iss.length}</b> issuers</span><span>${iss.map(esc).join(' · ')}</span>`;
  document.getElementById('crGrid').innerHTML = CR.map(c => c.verify
    ? `<a class="cr verify" href="${esc(c.verify)}" target="_blank" rel="noopener"><b>${esc(c.name)}</b><p>${esc(c.full)}</p><span>${esc(c.issuer)}<em>Verify ↗</em></span></a>`
    : `<div class="cr"><b>${esc(c.name)}</b><p>${esc(c.full)}</p><span>${esc(c.issuer)}</span></div>`).join('');
  document.getElementById('puGrid').innerHTML = DATA.pursuingCerts.map(c => `<div class="cr next"><span class="tgt">Target ${esc(c.target)}</span><b>${esc(c.name)}</b><p>${esc(c.full)}</p><span>${esc(c.issuer)}</span></div>`).join('');

  // 09 open source + 10 comms
  const AR = '<span class="ar" aria-hidden="true">↗</span>';
  document.getElementById('osBody').innerHTML = DATA.repos.map(r => `<a href="${esc(r.url)}" target="_blank" rel="noopener"><span class="nm">${esc(r.name)}</span><span class="ds">${esc(r.description)}</span><span class="lg">${esc(r.language || '')}</span>${AR}</a>`).join('');
  document.getElementById('cmBody').innerHTML = DATA.contacts.map(c => /^mailto:/.test(c.href || '')
    ? `<div class="rw"><span class="nm">${esc(c.label)}</span><a class="ds" href="${esc(c.href)}">${esc(c.value)}</a><button class="copy" type="button" data-copy="${esc(c.value)}" aria-label="Copy email address">Copy</button></div>`
    : c.href
    ? `<a href="${esc(c.href)}"${/^http/.test(c.href) ? ' target="_blank" rel="noopener"' : ''}><span class="nm">${esc(c.label)}</span><span class="ds">${esc(c.value)}</span>${AR}</a>`
    : `<div class="rw"><span class="nm">${esc(c.label)}</span><span class="ds">${esc(c.value)}</span><span></span></div>`).join('');

  // prev / next on every page
  PAGES.forEach(([id], i) => {
    const v = document.getElementById(id); if (!v) return;
    const prev = PAGES[i - 1], next = PAGES[i + 1];
    const f = document.createElement('nav'); f.className = 'pg-foot'; f.setAttribute('aria-label', 'Previous and next page');
    f.innerHTML = (prev ? `<a href="#${prev[0]}" data-go="${prev[0]}"><span>← ${String(i).padStart(2, '0')}</span><b>${esc(prev[1])}</b></a>` : '<span></span>')
      + (next ? `<a class="next" href="#${next[0]}" data-go="${next[0]}"><span>${String(i + 2).padStart(2, '0')} →</span><b>${esc(next[1])}</b></a>` : '');
    v.appendChild(f);
  });



  // About wall copy
  document.getElementById('wallRole').textContent = DATA.wall.role;
  document.getElementById('wallPitch').innerHTML = DATA.wall.pitch;
  document.getElementById('wallFacts').innerHTML = DATA.wall.facts.map(f => `<li>${esc(f)}</li>`).join('');

  // 05 leadership
  const LD = DATA.leadership;
  document.getElementById('ldHead').textContent = LD.headline;
  document.getElementById('ldMeta').innerHTML = `<span>Team of <b>${esc(LD.team.size)}</b> at ${esc(LD.team.where)}</span><span><b>3</b> reporting lines</span><span>Architecture owner at <b>${LD.decisions.length}</b> organizations</span>`;
  document.getElementById('ldBody').innerHTML = `
    <section class="ld-sec"><h2 class="sub-h">Team</h2><div class="ld-team">
      <div class="ld-size"><b class="num">${esc(LD.team.size)}</b><span>people led at ${esc(LD.team.where)}</span><div class="chips">${LD.team.makeup.map(x => `<span class="chip">${esc(x)}</span>`).join('')}</div></div>
      <ul>${LD.team.points.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div></section>
    <section class="ld-sec"><h2 class="sub-h">Who I answer to</h2><div class="ld-rep">${LD.reporting.map(r => `<div class="mon"><h2>${esc(r.audience)}${r.draft ? ' <small class="dr">draft</small>' : ''}</h2><div class="scr"><p>${esc(r.what)}</p></div></div>`).join('')}</div></section>
    <section class="ld-sec"><h2 class="sub-h">Architecture I own</h2><div class="ld-dec">${LD.decisions.map(d => `<article><h3>${esc(d.org)}</h3><dl><dt>Context</dt><dd>${esc(d.context)}</dd><dt>Decision</dt><dd>${esc(d.decision)}</dd><dt>Result</dt><dd class="res">${esc(d.result)}</dd></dl></article>`).join('')}</div></section>
    <section class="ld-sec"><h2 class="sub-h">How I run client programs <small>${esc(LD.engagement.where)}</small></h2>
      <ol class="ld-steps">${LD.engagement.steps.map((s, i) => `<li><span class="num">${String(i + 1).padStart(2, '0')}</span><b>${esc(s.name)}</b><p>${esc(s.what)}</p></li>`).join('')}</ol>
      <a class="ld-ex" href="#case-01" data-go="incidents"><span>Worked example · ${esc(LD.engagement.example.title)}</span><b>${esc(LD.engagement.example.outcome)}</b><em>Read case 01 →</em></a></section>`;


  // credentials line on the wall, counted from the data so it can't drift
  const TOP = ['CISSP', 'CISM', 'CISA', 'SC-100', 'CCSK', 'AZ-500'];
  const shown = TOP.filter(n => DATA.certifications.some(c => c.name.startsWith(n)));
  document.getElementById('wallCreds').innerHTML = `<b>${shown.join(' · ')}</b> and ${DATA.certifications.length - shown.length} more · ${DATA.pursuingCerts.map(c => esc(c.name)).join(' and ')} in progress`;

  // CV: until public/cv.pdf exists, offer it by email instead of a dead link
  const cv = document.getElementById('cvBtn');
  fetch(cv.getAttribute('href'), { method: 'HEAD' }).then(r => { if (!r.ok) throw 0; }).catch(() => {
    cv.removeAttribute('target'); cv.href = 'mailto:primeash1@gmail.com?subject=CV%20request';
    cv.firstChild.textContent = 'CV on request ';
  });

  // copy to clipboard with a toast
  const toastEl = document.getElementById('toast'); let toastT;
  const toast = msg => { toastEl.textContent = msg; toastEl.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('on'), 1800); };
  document.addEventListener('click', async ev => {
    const b = ev.target.closest('[data-copy], [data-copy-code]'); if (!b) return;
    ev.preventDefault();
    const text = b.hasAttribute('data-copy') ? b.dataset.copy : b.closest('.code').querySelector('pre').textContent;
    try { await navigator.clipboard.writeText(text); b.textContent = 'Copied'; setTimeout(() => (b.textContent = 'Copy'), 1500); toast(b.hasAttribute('data-copy') ? 'Email copied to clipboard' : 'Detection copied to clipboard'); }
    catch { toast('Copy failed. Select the text and copy it manually.'); }
  });

  // page bar: plain-English names for every page
  const NAMES = { home: 'About', timeline: 'Experience', incidents: 'Case studies', attack: 'ATT&CK coverage', capability: 'Skills', deployed: 'Projects', leadership: 'Leadership', credentials: 'Certifications', opensource: 'Open source', comms: 'Contact' };
  const track = document.getElementById('tabTrack'), ind = document.getElementById('tabInd');
  track.insertAdjacentHTML('beforeend', PAGES.map(([id], i) => `<a href="#${id}" data-go="${id}"><span class="n num">${String(i + 1).padStart(2, '0')}</span>${esc(NAMES[id])}</a>`).join(''));
  const setTab = (id, instant) => {
    const a = track.querySelector(`a[data-go="${id}"]`); if (!a) return;
    track.querySelectorAll('a').forEach(x => x.toggleAttribute('aria-current', x === a));
    if (a.hasAttribute('aria-current')) a.setAttribute('aria-current', 'page');
    if (instant) ind.style.transition = 'none';
    ind.style.transform = `translateX(${a.offsetLeft + 12}px) scaleX(${a.offsetWidth - 24})`;
    if (instant) { ind.offsetWidth; ind.style.transition = ''; }
    const l = a.offsetLeft - 40, r = a.offsetLeft + a.offsetWidth + 40;
    if (l < track.scrollLeft || r > track.scrollLeft + track.clientWidth) track.scrollTo({ left: l, behavior: instant || reduce ? 'auto' : 'smooth' });
  };
  addEventListener('resize', () => setTab(current, true));
  document.fonts && document.fonts.ready.then(() => setTab(current, true));

  // index overlay
  const index = document.getElementById('index');
  index.querySelector('ol').innerHTML = PAGES.map(([id, l, d], i) => `<li><a href="#${id}" data-go="${id}"><span class="n num">${String(i + 1).padStart(2, '0')}</span><span class="l">${esc(l)}</span><span class="d">${esc(d)}</span></a></li>`).join('');
  const openIndex = () => { index.hidden = false; index.querySelectorAll('a').forEach(a => a.toggleAttribute('aria-current', a.dataset.go === current)); if (!reduce) gsap.fromTo(index.querySelectorAll('li'), { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: .45, ease: 'expo.out', stagger: .025 }); index.querySelector('a').focus({ preventScroll: true }); };
  const closeIndex = () => { index.hidden = true; };
  document.getElementById('idxBtn').addEventListener('click', () => index.hidden ? openIndex() : closeIndex());
  addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); index.hidden ? openIndex() : closeIndex(); }
    else if (e.key === 'Escape') closeIndex();
    else if (!index.hidden && /^[0-9]$/.test(e.key)) { const p = PAGES[(+e.key + 9) % 10]; closeIndex(); go(p[0]); }
  });

  /* ── page switch: the page folds into the terminal chevron ── */
  const veil = document.getElementById('veil'), px = document.getElementById('px'), log = document.getElementById('log');
  let current = 'home', busy = false;
  const go = async (to, hash, fromHistory) => {
    if (busy || pageIdx(to) < 0) return;
    closeIndex();
    if (to !== current) setTab(to);
    const scrollToHash = () => { const el = hash && document.querySelector(hash); if (el) lenis ? lenis.scrollTo(el, { offset: -70 }) : el.scrollIntoView(); };
    if (to === current) { scrollToHash(); return; }
    busy = true;
    const from = document.getElementById(current), next = document.getElementById(to);
    if (reduce) { from.hidden = true; next.hidden = false; scrollTo(0, 0); current = to; busy = false; ScrollTrigger.refresh(); return; }
    lenis && lenis.stop();
    const y = scrollY, W = innerWidth, H = innerHeight, cx = W / 2, cy = y + H / 2, s = Math.min(W, H) * .2;
    const poly = p => 'polygon(' + p.map(([a, b]) => `${a.toFixed(1)}px ${b.toFixed(1)}px`).join(', ') + ')';
    Object.assign(from.style, { position: 'fixed', left: 0, right: 0, top: -y + 'px', zIndex: 20, transformOrigin: `50% ${cy}px` });
    gsap.set(veil, { autoAlpha: 1, zIndex: 10 }); px.textContent = '';
    await gsap.timeline()
      .fromTo(from, { clipPath: poly([[0, y], [W, y], [W, y + H / 2], [W, y + H], [0, y + H], [0, y + H / 2]]) },
                    { clipPath: poly([[cx - s * .7, cy - s], [cx - s * .15, cy - s], [cx + s * .75, cy], [cx - s * .15, cy + s], [cx - s * .7, cy + s], [cx + s * .2, cy]]), duration: .8, ease: 'power3.inOut' }, 0)
      .to(from, { rotate: -9, scale: .7, duration: .8, ease: 'power3.inOut' }, 0)
      .to(from, { autoAlpha: 0, duration: .22 }, .7);
    from.hidden = true; from.removeAttribute('style'); gsap.set(from, { clearProps: 'all' });
    gsap.set(veil, { zIndex: 60 });
    px.textContent = 'DECRYPTING ' + PAGES[pageIdx(to)][1];
    await decrypt(px, 560, GLY);
    await gsap.to(px, { scale: .06, opacity: 0, duration: .32, ease: 'power3.in' }); gsap.set(px, { clearProps: 'all' });
    next.hidden = false; scrollTo(0, 0); lenis && lenis.scrollTo(0, { immediate: true }); ScrollTrigger.refresh();
    gsap.fromTo(next, { clipPath: 'inset(48% 48% 48% 48% round 20px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1, ease: 'expo.inOut', clearProps: 'clipPath' });
    gsap.to(veil, { autoAlpha: 0, duration: .4, delay: .45 });
    next.querySelectorAll('[data-dec]').forEach(el => setTimeout(() => decrypt(el, 1000), 500));
    document.getElementById('where').innerHTML = '<b>' + label(to).replace(' / ', '</b> / '); history[fromHistory ? 'replaceState' : 'pushState'](null, '', to === 'home' ? location.pathname : '#' + to);
    current = to; lenis && lenis.start(); busy = false;
    if (hash) setTimeout(scrollToHash, 900);
  };
  // back/forward and hand-typed #page links switch pages in place
  const fromUrl = () => { const raw = location.hash.slice(1), id = raw === 'inprogress' ? 'credentials' : (raw || 'home'); if (pageIdx(id) >= 0 && id !== current) go(id, null, true); };
  addEventListener('popstate', fromUrl);
  addEventListener('hashchange', fromUrl);
  document.addEventListener('click', e => { const a = e.target.closest('[data-go]'); if (!a) return; e.preventDefault(); const h = a.hash && a.hash.length > 1 && a.hash.slice(1) !== a.dataset.go ? a.hash : null; go(a.dataset.go, h); });

  /* ── packet trail behind the cursor ── */
  (() => {
    if (reduce || matchMedia('(pointer: coarse)').matches) return;
    const cv = document.getElementById('trail'), ctx = cv.getContext('2d');
    const rs = () => { cv.width = innerWidth * DPR; cv.height = innerHeight * DPR; }; rs(); addEventListener('resize', rs);
    const pk = []; let lx = 0, ly = 0;
    addEventListener('pointermove', e => { const d = Math.hypot(e.clientX - lx, e.clientY - ly); if (d < 14) return; lx = e.clientX; ly = e.clientY; pk.push({ x: e.clientX, y: e.clientY, life: 1 }); });
    gsap.ticker.add((t, dt) => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      for (let i = pk.length - 1; i >= 0; i--) { const p = pk[i]; p.life -= dt / 700; if (p.life <= 0) { pk.splice(i, 1); continue; }
        ctx.fillStyle = `rgba(90,210,230,${p.life * .55})`; const s = (2 + p.life * 3) * DPR; ctx.fillRect(p.x * DPR - s / 2, p.y * DPR - s / 2, s, s); }
    });
  })();

  /* ── render loop ── */
  let last = performance.now();
  gsap.ticker.add(() => { const now = performance.now(), dt = Math.min(.05, (now - last) / 1000); last = now; spring(dt); const t = now / 1000;
    scenes.forEach(s => { if (!s.always) { if (s.el.closest('.view')?.hidden) return; if (vis.get(s.el) === false) return; } s.step(t, reduce ? 0 : dt); }); });

  /* ── clock ── */
  const ck = document.getElementById('clock'); const tick = () => ck.textContent = new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false }); tick(); setInterval(tick, 15000);

  /* ── boot: secure handshake ── */
  const deepLink = () => { const id = location.hash.slice(1) === 'inprogress' ? 'credentials' : location.hash.slice(1); if (pageIdx(id) > 0) { document.getElementById('home').hidden = true; document.getElementById(id).hidden = false; current = id; document.getElementById('where').innerHTML = '<b>' + label(id).replace(' / ', '</b> / '); } };
  const boot = async () => {
    deepLink(); setTab(current, true);
    const ui = document.getElementById('bootui');
    if (reduce) { ui.hidden = true; gsap.set(veil, { autoAlpha: 0 }); choreo(); return; }
    const dumpEl = document.getElementById('dump'), hexEl = document.getElementById('hex'), bitsEl = document.getElementById('bits'), art = document.getElementById('art'), fpEl = document.getElementById('fp');
    // a fresh 32-byte session key every visit
    const key = new Uint8Array(32); crypto.getRandomValues(key);
    document.getElementById('sess').textContent = [...key.slice(0, 4)].map(b => b.toString(16).padStart(2, '0')).join('');
    const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    const fp = btoa(String.fromCharCode(...key)).replace(/=+$/, '');
    bitsEl.innerHTML = Array.from({ length: 7 }, () => '<i></i>').join('') + '<span class="num" id="dec">000/100</span>';
    const bitEls = [...bitsEl.querySelectorAll('i')], dec = document.getElementById('dec');
    // ssh-keygen randomart: the drunken bishop walks the key's bits
    const FW = 17, FH = 9, SYM = ' .o+=*BOX@%&#/^';
    const walk = []; { let x = 8, y = 4; for (const byte of key) for (let s = 0; s < 4; s++) { const b = (byte >> (s * 2)) & 3; x = Math.max(0, Math.min(FW - 1, x + (b & 1 ? 1 : -1))); y = Math.max(0, Math.min(FH - 1, y + (b & 2 ? 1 : -1))); walk.push([x, y]); } }
    const drawArt = k => {
      const f = Array.from({ length: FH }, () => new Array(FW).fill(0)), n = Math.floor(walk.length * k);
      for (let i = 0; i < n; i++) f[walk[i][1]][walk[i][0]]++;
      const end = n ? walk[n - 1] : [8, 4];
      const rows = f.map((row, y) => '|' + row.map((c, x) => (x === 8 && y === 4) ? '<em>S</em>' : (x === end[0] && y === end[1] && n) ? (k >= 1 ? '<em>E</em>' : '<b>@</b>') : SYM[Math.min(c, SYM.length - 1)]).join('') + '|');
      art.innerHTML = '+--[ED25519 256]--+\n' + rows.join('\n') + '\n+----[SHA256]-----+';
    };
    const LOG = [
      [.00, 'secure boot · session key generated (32 bytes)', ''],
      [.08, 'tls1.3 handshake · x25519 · aes-256-gcm', 'ok'],
      [.20, 'verify dossier signature · ed25519', 'ok'],
      [.34, 'decrypt casefiles 01..08', 'ok'],
      [.50, 'load att&ck coverage · 11 tactics · 19 techniques', 'ok'],
      [.64, 'sync record 2019 → 2026 · 11 entries', 'ok'],
      [.80, 'arm sensors · radar · kill chain · terrain', 'ok'],
      [.94, 'integrity 8/8', 'PASS'],
    ];
    const t0 = performance.now(), DUR = 2900;
    let skip = false; const onSkip = e => { skip = true; if (e && e.key === ' ') e.preventDefault(); };
    addEventListener('keydown', onSkip, { once: true }); ui.addEventListener('pointerdown', onSkip, { once: true });
    const GL = '0123456789ABCDEF';
    await new Promise(res => {
      let shown = -1, lastHex = -1, settle = 0;
      const frame = () => {
        const el = performance.now() - t0;
        let k = skip ? 1 : Math.min(1, el / DUR);
        k = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;   // ease in-out cubic: slow handshake, fast middle, careful finish
        const v = Math.round(k * 100);
        // hex counter: new value scrambles briefly before it settles
        if (v !== lastHex) { lastHex = v; settle = 2; }
        const hx = v.toString(16).toUpperCase().padStart(2, '0');
        const shownHx = settle-- > 0 && !skip ? hx[0] + GL[(Math.random() * 16) | 0] : hx;
        hexEl.innerHTML = '<span class="px0">0x</span>' + shownHx;
        bitEls.forEach((b, i) => b.classList.toggle('on', (v >> (6 - i)) & 1));
        dec.textContent = String(v).padStart(3, '0') + '/100';
        drawArt(k);
        const lockB = Math.floor(32 * k);
        dumpEl.innerHTML = [0, 16].map(o => `<span class="o">${o.toString(16).padStart(4, '0')}</span>  ` + [...key.slice(o, o + 16)].map((b, j) => { const i = o + j; if (i < lockB) return `<span class="k">${b.toString(16).padStart(2, '0')}</span>`; if (i === lockB) return `<span class="hot">${GL[(Math.random() * 16) | 0]}${GL[(Math.random() * 16) | 0]}</span>`.toLowerCase(); return (GL[(Math.random() * 16) | 0] + GL[(Math.random() * 16) | 0]).toLowerCase(); }).join(' ').replace(/^((?:\S+ ){8})/, '$1 ')).join('\n');
        // fingerprint resolves left to right out of noise
        const lock = Math.floor(fp.length * k);
        fpEl.innerHTML = fp.slice(0, lock) + '<span class="u">' + Array.from({ length: fp.length - lock }, () => B64[(Math.random() * 64) | 0]).join('') + '</span>';
        // log lines with kernel-style timestamps
        const due = LOG.filter(l => k >= l[0]).length - 1;
        if (due > shown) {
          shown = due;
          log.innerHTML = LOG.slice(0, due + 1).map(([at, msg, st]) => {
            const ts = '[' + (at * DUR / 1000).toFixed(6).padStart(10, ' ') + ']';
            const pad = '.'.repeat(Math.max(2, 56 - msg.length));
            return `<span class="ts">${ts}</span> ${msg} ${st ? pad + ' ' + (st === 'PASS' ? '<span class="pass">PASS</span>' : '<span class="ok">ok</span>') : ''}`;
          }).join('\n');
        }
        k >= 1 ? res() : requestAnimationFrame(frame);
      };
      frame();
    });
    removeEventListener('keydown', onSkip);
    await gsap.to(ui, { autoAlpha: 0, duration: .3, delay: skip ? 0 : .25 });
    ui.hidden = true;
    px.classList.add('granted'); px.textContent = 'ACCESS GRANTED';
    await decrypt(px, 520, GLY);
    await gsap.to(px, { scale: .06, opacity: 0, duration: .32, ease: 'power3.in', delay: .2 });
    gsap.set(px, { clearProps: 'all' }); px.classList.remove('granted');
    gsap.fromTo('#' + current, { clipPath: 'inset(48% 48% 48% 48% round 20px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1.1, ease: 'expo.inOut', clearProps: 'clipPath' });
    gsap.to(veil, { autoAlpha: 0, duration: .4, delay: .5 });
    gsap.from('.bar', { y: -16, opacity: 0, duration: .9, ease: 'expo.out', delay: .5, clearProps: 'transform,opacity' });
    gsap.from('#' + current + ' .mon', { y: 40, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: .07, delay: .6 });
    choreo();
    document.querySelectorAll('#' + current + ' [data-dec]').forEach(el => setTimeout(() => decrypt(el, 1000), 700));
  };
  if (document.readyState === 'complete') boot(); else addEventListener('load', boot, { once: true });
}
