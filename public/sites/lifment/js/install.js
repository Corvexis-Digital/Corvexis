/* =========================================================
   LIFMENT — scroll-driven installation & integration showcase
   Loads the distribution board, hybrid inverter / battery and
   PV module into one scene and assembles them as you scroll.
   ========================================================= */

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

/* ────────────────────────── narrative ────────────────────────── */

const STEPS = [
  {
    kicker: '01 — Set-out',
    title: 'Survey & set-out',
    text: 'The wall is surveyed, the mounting template levelled and every unit set out on matched centres. Cable routes, gland positions and the battery bracket are marked before a single hole is drilled.'
  },
  {
    kicker: '02 — Board',
    title: 'Land the distribution board',
    text: 'The board is populated on the bench, then landed on its flange and torqued down. Incomer, RCDs and final circuits are wired to the comb busbar so every way is labelled before the door goes on.'
  },
  {
    kicker: '03 — Inverter',
    title: 'Mount the hybrid inverter',
    text: 'The hybrid inverter goes up alongside the board. Array DC, load AC and the battery comms link all terminate here — the exact point where generation, storage and the installation meet.'
  },
  {
    kicker: '04 — Storage',
    title: 'Add the lithium battery bank',
    text: 'The battery is bolted to its wall bracket, earthed, then linked with keyed DC leads and a data cable so the inverter sees one clean, addressable bank.'
  },
  {
    kicker: '05 — Generation',
    title: 'Lay the PV array',
    text: 'Rails, mid-clamps and end-clamps hold each module on the tilt frame. String leads are dressed and landed so no cable sits in standing water, and polarity is proven before the DC isolator is closed.'
  },
  {
    kicker: '06 — Integration',
    title: 'Integrate & commission',
    text: 'String, AC and comms are proven end to end, protection is tested and the system is energised. Generation now flows from the array, through the inverter, into the battery and out to the board.'
  }
];

const N = STEPS.length;

/* ────────────────────────── geometry constants ────────────────────────── */
/* metres · x = along the wall, y = up, z = out from the wall */

const WALL_Z = 0;
const GROUND_Y = -0.85;

const DB_HOME = [-1.06, 0.46, 0.085];
const INV_HOME = [0.06, 0.50, 0.090];
const BAT_HOME = [0.06, -0.33, 0.100];
const PV_TILT = -0.35;
const PV_HOME = [1.66, 0.20, 0.78];

const CAM = [
  { p: [-0.30, 1.02, 4.20], t: [-0.15, 0.40, 0.30] },
  { p: [-1.95, 0.78, 2.15], t: [-1.06, 0.46, 0.15] },
  { p: [0.62, 0.95, 2.10], t: [0.06, 0.52, 0.15] },
  { p: [0.68, 0.10, 2.10], t: [0.06, -0.30, 0.15] },
  { p: [1.42, 0.72, 3.10], t: [1.66, 0.22, 0.72] },
  { p: [0.48, 1.06, 5.35], t: [0.35, 0.24, 0.50] }
];

/* ────────────────────────── utils ────────────────────────── */

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (t) => { t = clamp01(t); return t * t * (3 - 2 * t); };
const easeOut = (t) => { t = clamp01(t); return 1 - Math.pow(1 - t, 3); };
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* value-noise → canvas textures (real image maps for wall & floor) */
function hash2(x, y) {
  let n = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
}
function vnoise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const a = hash2(xi, yi), b = hash2(xi + 1, yi);
  const c = hash2(xi, yi + 1), d = hash2(xi + 1, yi + 1);
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
}
function fbm(x, y, oct) {
  let v = 0, a = 0.5, f = 1;
  for (let i = 0; i < oct; i++) { v += a * vnoise(x * f, y * f); f *= 2; a *= 0.5; }
  return v;
}
function noiseTex(size, freq, oct, seed, rx, ry) {
  const cv = document.createElement('canvas');
  cv.width = cv.height = size;
  const ctx = cv.getContext('2d');
  const img = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const v = clamp01(fbm((x / size) * freq + seed, (y / size) * freq + seed, oct));
      const g = Math.round(v * 255);
      const i = (y * size + x) * 4;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = g;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(cv);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(rx, ry);
  t.anisotropy = 4;
  return t;
}

/* shader-injected micro-surface grain (works without UVs) */
const GRAIN_GLSL = `#include <common>
varying vec3 vGrainPos;
float ghash(vec3 p){ p = fract(p * 0.3183099 + vec3(0.71, 0.113, 0.419)); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float gnoise(vec3 x){
  vec3 i = floor(x), f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(ghash(i + vec3(0.0,0.0,0.0)), ghash(i + vec3(1.0,0.0,0.0)), f.x),
                 mix(ghash(i + vec3(0.0,1.0,0.0)), ghash(i + vec3(1.0,1.0,0.0)), f.x), f.y),
             mix(mix(ghash(i + vec3(0.0,0.0,1.0)), ghash(i + vec3(1.0,0.0,1.0)), f.x),
                 mix(ghash(i + vec3(0.0,1.0,1.0)), ghash(i + vec3(1.0,1.0,1.0)), f.x), f.y), f.z);
}`;

function injectGrain(mat, amt) {
  mat.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vGrainPos;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\n\tvGrainPos = position;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', GRAIN_GLSL)
      .replace(
        '#include <roughnessmap_fragment>',
        '#include <roughnessmap_fragment>\n' +
        '\tfloat grn = gnoise(vGrainPos * 96.0) * 0.55 + gnoise(vGrainPos * 21.0) * 0.45;\n' +
        '\troughnessFactor = clamp(roughnessFactor + (grn - 0.5) * ' + amt.toFixed(3) + ', 0.04, 1.0);\n'
      );
  };
  mat.needsUpdate = true;
}

const SKIP = /Glass|Display|Screen|LED|Cell|Label|Accent|JBox|Cable|Finger/i;

function grainify(root, amt) {
  const seen = new Set();
  root.traverse((o) => {
    if (!o.isMesh || !o.material) return;
    const list = Array.isArray(o.material) ? o.material : [o.material];
    list.forEach((m) => {
      if (!m || seen.has(m) || !m.isMeshStandardMaterial) return;
      seen.add(m);
      if (m.emissive && m.emissive.getHex() !== 0) return;
      if (SKIP.test(m.name || '')) return;
      if ('envMapIntensity' in m) m.envMapIntensity = 1.15;
      injectGrain(m, amt);
    });
  });
}

/* ────────────────────────── boot ────────────────────────── */

const canvas = document.getElementById('installScene');
const stageEl = document.getElementById('installStage');
const stickyEl = document.querySelector('.install-sticky');
const cardsEl = document.getElementById('installCards');
const railEl = document.getElementById('installRail');
const barEl = document.getElementById('installBar');
const countEl = document.getElementById('installCount');
const readoutEl = document.getElementById('installReadout');

if (canvas && stageEl && stickyEl) init();

function init() {
  stageEl.style.height = (N * 88) + 'vh';

  const renderer = new THREE.WebGLRenderer({
    canvas, antialias: true, alpha: true, powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.05, 120);

  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.03).texture;
  if ('environmentIntensity' in scene) scene.environmentIntensity = 1.0;

  /* lighting */
  const key = new THREE.DirectionalLight(0xffffff, 2.5);
  key.position.set(-2.6, 3.4, 3.0);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.bias = -0.0007;
  key.shadow.normalBias = 0.02;
  const sc = key.shadow.camera;
  sc.left = -3.4; sc.right = 3.4; sc.top = 3.4; sc.bottom = -3.4; sc.near = 0.1; sc.far = 16;
  sc.updateProjectionMatrix();
  scene.add(key);

  const fill = new THREE.DirectionalLight(0x9ecbff, 1.1);
  fill.position.set(3.2, 1.0, 2.2);
  scene.add(fill);

  const rim = new THREE.DirectionalLight(0xffb457, 1.4);
  rim.position.set(-1.2, 1.6, -3.2);
  scene.add(rim);

  scene.add(new THREE.HemisphereLight(0xc2daff, 0x0a0e14, 0.55));

  /* wall + floor with generated textures */
  const plasterT = noiseTex(256, 7, 5, 3.1, 6, 4);
  const floorT = noiseTex(256, 9, 5, 11.7, 7, 7);

  const wall = new THREE.Mesh(
    new THREE.PlaneGeometry(14, 9),
    new THREE.MeshStandardMaterial({
      color: 0x2b3038, roughness: 0.94, metalness: 0.0,
      bumpMap: plasterT, bumpScale: 0.012, roughnessMap: plasterT
    })
  );
  wall.position.set(0.3, 0.6, WALL_Z - 0.02);
  wall.receiveShadow = true;
  scene.add(wall);

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
      color: 0x171b21, roughness: 0.96, metalness: 0.05,
      bumpMap: floorT, bumpScale: 0.02, roughnessMap: floorT
    })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0.3, GROUND_Y, 0.6);
  floor.receiveShadow = true;
  scene.add(floor);

  /* baseboard detail */
  const skirt = new THREE.Mesh(
    new THREE.BoxGeometry(14, 0.1, 0.03),
    new THREE.MeshStandardMaterial({ color: 0x11151a, roughness: 0.8 })
  );
  skirt.position.set(0.3, GROUND_Y + 0.05, WALL_Z + 0.005);
  skirt.receiveShadow = true;
  scene.add(skirt);

  /* rack for the PV array (part of the mounting infrastructure) */
  const rack = new THREE.Group();
  const rackMat = new THREE.MeshStandardMaterial({ color: 0x8d959e, metalness: 1.0, roughness: 0.38 });
  const railLen = 1.66;
  const botY = PV_HOME[1] - Math.cos(PV_TILT) * 0.86;
  const botZ = PV_HOME[2] + Math.sin(-PV_TILT) * 0.86;
  for (const sx of [-0.38, 0.38]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.05, railLen, 0.05), rackMat);
    rail.position.set(PV_HOME[0] + sx, PV_HOME[1], PV_HOME[2] - 0.05);
    rail.rotation.x = PV_TILT;
    rack.add(rail);
    const legH = Math.max(botY - GROUND_Y, 0.1);
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.05, legH, 0.05), rackMat);
    leg.position.set(PV_HOME[0] + sx, GROUND_Y + legH / 2, botZ - 0.02);
    rack.add(leg);
  }
  rack.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  rack.visible = false;
  scene.add(rack);

  /* ── cables (revealed during the integration step) ── */
  const cables = [];
  function makeCable(points, color, tubular) {
    const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(p[0], p[1], p[2])));
    const geo = new THREE.TubeGeometry(curve, tubular, 0.011, 8, false);
    const mat = new THREE.MeshStandardMaterial({
      color, roughness: 0.55, metalness: 0.1, emissive: 0x000000
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.visible = false;
    scene.add(mesh);

    const pulse = new THREE.Mesh(
      new THREE.SphereGeometry(0.028, 12, 10),
      new THREE.MeshBasicMaterial({ color: 0x8ff0ff, transparent: true, opacity: 0.95 })
    );
    pulse.visible = false;
    scene.add(pulse);

    const rec = { curve, mesh, geo, mat, tubular, pulse };
    cables.push(rec);
    return rec;
  }

  const invBot = [INV_HOME[0], INV_HOME[1] - 0.30, INV_HOME[2] + 0.02];
  makeCable([
    [PV_HOME[0] - 0.16, botY + 0.10, botZ - 0.06],
    [PV_HOME[0] - 0.30, GROUND_Y + 0.30, botZ + 0.05],
    [0.95, GROUND_Y + 0.10, 0.62],
    [0.34, 0.02, 0.30],
    invBot
  ], 0x14171c, 150);

  makeCable([
    [BAT_HOME[0] + 0.07, BAT_HOME[1] + 0.36, BAT_HOME[2] + 0.03],
    [BAT_HOME[0] + 0.20, BAT_HOME[1] + 0.42, BAT_HOME[2] + 0.12],
    [INV_HOME[0] + 0.16, INV_HOME[1] - 0.24, INV_HOME[2] + 0.12],
    invBot
  ], 0x8f2020, 90);

  makeCable([
    [INV_HOME[0] - 0.17, INV_HOME[1] - 0.26, INV_HOME[2] + 0.03],
    [-0.45, INV_HOME[1] - 0.40, 0.20],
    [DB_HOME[0] + 0.24, DB_HOME[1] - 0.34, 0.18],
    [DB_HOME[0] + 0.20, DB_HOME[1] - 0.40, DB_HOME[2] + 0.03]
  ], 0x9aa3ad, 110);

  makeCable([
    [DB_HOME[0], DB_HOME[1] - 0.40, DB_HOME[2] + 0.02],
    [DB_HOME[0] - 0.02, DB_HOME[1] - 0.70, 0.16],
    [DB_HOME[0] - 0.06, GROUND_Y + 0.06, 0.22]
  ], 0x2a3038, 70);

  /* ── components ── */
  const loader = new GLTFLoader();
  const emitters = [];   // emissive materials that light up on commissioning
  const comps = [];      // animated components

  function collectEmissive(root) {
    const seen = new Set();
    root.traverse((o) => {
      if (!o.isMesh || !o.material) return;
      const list = Array.isArray(o.material) ? o.material : [o.material];
      list.forEach((m) => {
        if (!m || seen.has(m)) return;
        seen.add(m);
        if (m.emissive && m.emissive.getHex() !== 0) {
          emitters.push({ m, base: m.emissiveIntensity !== undefined ? m.emissiveIntensity : 1 });
        }
      });
    });
  }

  function reg(root, home, step, entry, rotOut) {
    root.position.fromArray(home);
    root.traverse((o) => {
      if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; }
    });
    collectEmissive(root);
    const rec = {
      root, step,
      home: new THREE.Vector3().fromArray(home),
      entry: new THREE.Vector3().fromArray(entry),
      rotHome: new THREE.Euler().fromArray(rotOut && rotOut.home ? rotOut.home : [0, 0, 0]),
      rotIn: new THREE.Euler().fromArray(rotOut && rotOut['in'] ? rotOut['in'] : [0, 0, 0])
    };
    root.rotation.copy(rec.rotHome);
    root.visible = false;
    scene.add(root);
    comps.push(rec);
    return rec;
  }

  const ready = Promise.all([
    loader.loadAsync('assets/models/db_box.glb'),
    loader.loadAsync('assets/models/inverter_battery.glb'),
    loader.loadAsync('assets/models/solar_panel.glb')
  ]).then(([dbG, invG, pvG]) => {
    const db = dbG.scene;
    grainify(db, 0.20);
    reg(db, DB_HOME, 1, [-2.6, 0.55, 1.7], { home: [0, 0, 0], 'in': [0, 0, 0.62] });

    const invG2 = invG.scene;
    grainify(invG2, 0.18);
    const invUnit = invG2.getObjectByName('INV_Unit') || invG2;
    const batUnit = invG2.getObjectByName('BAT_Unit') || invG2;
    reg(invUnit, INV_HOME, 2, [2.3, 0.65, 1.6], { home: [0, 0, 0], 'in': [0, 0, -0.55] });
    reg(batUnit, BAT_HOME, 3, [-0.25, -1.8, 1.5], { home: [0, 0, 0], 'in': [0, 0, 0.3] });

    const pv = pvG.scene;
    grainify(pv, 0.16);
    reg(pv, PV_HOME, 4, [2.4, 2.1, 2.0], { home: [PV_TILT, 0, 0], 'in': [PV_TILT - 0.5, 0.3, 0] });

    onReady();
  }).catch((err) => {
    console.warn('install: model load failed', err);
    onReady();
  });

  function onReady() {
    canvas.parentElement.classList.add('is-ready');
    resize();
    render();
  }

  /* ── layout / scroll ── */
  let stageTop = 0, stageH = 1, progress = 0, inView = true;

  function measure() {
    const r = stageEl.getBoundingClientRect();
    stageTop = r.top + window.scrollY;
    stageH = r.height;
  }

  function resize() {
    const w = stickyEl.clientWidth;
    const h = stickyEl.clientHeight;
    if (!w || !h) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }
  new ResizeObserver(() => { measure(); resize(); }).observe(stageEl);
  window.addEventListener('resize', () => { measure(); resize(); });
  window.addEventListener('scroll', () => { measure(); }, { passive: true });
  measure();
  resize();

  /* ── HUD ── */
  if (cardsEl) {
    cardsEl.innerHTML = STEPS.map((s, i) =>
      '<li class="install-card" data-i="' + i + '">' +
      '<span class="ic-kicker">' + s.kicker + '</span>' +
      '<h3>' + s.title + '</h3>' +
      '<p>' + s.text + '</p></li>'
    ).join('');
  }
  if (railEl) {
    railEl.innerHTML = STEPS.map((s, i) =>
      '<button class="rail-dot" data-i="' + i + '" title="' + s.title + '"><i></i></button>'
    ).join('');
    railEl.querySelectorAll('.rail-dot').forEach((b) => {
      b.addEventListener('click', () => {
        const target = stageTop + (Number(b.dataset.i) / N) * (stageH - window.innerHeight) + 4;
        window.scrollTo({ top: target, behavior: REDUCED ? 'auto' : 'smooth' });
      });
    });
  }
  if (countEl) countEl.querySelector('b').textContent = '01';

  /* ── animation state ── */
  const camPos = new THREE.Vector3().fromArray(CAM[0].p);
  const camTgt = new THREE.Vector3().fromArray(CAM[0].t);
  const tmpA = new THREE.Vector3(), tmpB = new THREE.Vector3();
  const clock = new THREE.Clock();
  let activeStep = -1;
  let energy = 0;

  function stepIndex(p) { return Math.min(N - 1, Math.floor(p * N)); }

  function applyStep(i) {
    if (i === activeStep) return;
    activeStep = i;
    if (cardsEl) {
      cardsEl.querySelectorAll('.install-card').forEach((c) =>
        c.classList.toggle('is-active', Number(c.dataset.i) === i)
      );
    }
    if (railEl) {
      railEl.querySelectorAll('.rail-dot').forEach((c) =>
        c.classList.toggle('is-active', Number(c.dataset.i) === i)
      );
    }
    if (countEl) countEl.querySelector('b').textContent = String(i + 1).padStart(2, '0');
    if (readoutEl) readoutEl.textContent = STEPS[i].title;
  }

  function render() {
    requestAnimationFrame(render);
    if (!inView) { clock.getDelta(); return; }
    const t = clock.getElapsedTime();

    const total = Math.max(stageH - window.innerHeight, 1);
    progress = clamp01((window.scrollY - stageTop) / total);

    applyStep(stepIndex(progress));

    /* camera — key i is held across step i's window, eased at the seams */
    const f = progress * N - 0.5;
    const ci = Math.min(N - 2, Math.max(0, Math.floor(f)));
    const ck = smooth(f - ci);
    tmpA.fromArray(CAM[ci].p); tmpB.fromArray(CAM[ci + 1].p);
    camPos.lerpVectors(tmpA, tmpB, ck);
    tmpA.fromArray(CAM[ci].t); tmpB.fromArray(CAM[ci + 1].t);
    camTgt.lerpVectors(tmpA, tmpB, ck);
    camera.position.copy(camPos);
    camera.lookAt(camTgt);

    /* components fly in during their step */
    comps.forEach((c) => {
      const win = 1 / N;
      const raw = (progress - c.step * win) / (win * 0.82);
      const r = REDUCED ? (raw > 0 ? 1 : 0) : easeOut(raw);
      c.root.visible = raw > 0;
      if (!c.root.visible) return;
      c.root.position.lerpVectors(c.entry, c.home, r);
      c.root.rotation.set(
        lerp(c.rotIn.x, c.rotHome.x, r),
        lerp(c.rotIn.y, c.rotHome.y, r),
        lerp(c.rotIn.z, c.rotHome.z, r)
      );
    });

    /* rack appears with the array step */
    const rackR = smooth((progress - 4 / N) / (1 / N));
    rack.visible = rackR > 0.02;
    rack.scale.setScalar(lerp(0.94, 1, rackR));
    rackMat.opacity = rackR;
    rackMat.transparent = rackR < 1;

    /* cables draw themselves, then the system energises */
    const cabR = smooth((progress - 5 / N) / (0.72 / N));
    const energyTarget = smooth((progress - 5 / N) / (0.85 / N));
    energy += (energyTarget - energy) * 0.12;

    cables.forEach((c, i) => {
      const stagger = i * 0.14;
      const r = smooth((cabR - stagger) / (1 - stagger * 1.2));
      c.mesh.visible = r > 0.005;
      if (c.mesh.visible) {
        const segs = Math.max(1, Math.floor(r * c.tubular));
        c.geo.setDrawRange(0, segs * 8 * 6);
      }
      const on = energy > 0.4 && r > 0.98;
      c.pulse.visible = on;
      if (on) {
        const u = (t * 0.22 + i * 0.27) % 1;
        c.pulse.position.copy(c.curve.getPointAt(u));
        const s = 0.7 + energy * 0.5;
        c.pulse.scale.setScalar(s);
        c.pulse.material.opacity = 0.35 + 0.6 * energy;
      }
    });

    /* commissioning glow */
    emitters.forEach((e) => {
      e.m.emissiveIntensity = REDUCED ? e.base : e.base * (1 + energy * 2.4 + Math.sin(t * 3.1) * 0.06 * energy);
    });

    /* progress bar */
    if (barEl) barEl.style.transform = 'scaleY(' + progress.toFixed(4) + ')';

    renderer.render(scene, camera);
  }

  /* pause work when the section is off-screen */
  const io = new IntersectionObserver((entries) => {
    inView = entries.some((e) => e.isIntersecting);
  }, { rootMargin: '120px' });
  io.observe(stageEl);

  /* expose for debugging */
  window.__lifment = { ready, progress: () => progress, step: () => activeStep };
  void ready;
}
