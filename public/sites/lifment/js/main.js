/* =========================================================
   LIFMENT Electrical Engineers — interactive 3D product showcase
   Three.js + glTF assets exported from Blender
   ========================================================= */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

/* ────────────────────────── product data ────────────────────────── */

const DATA = {
  db: {
    file: 'assets/models/db_box.glb',
    metaName: 'LM-DB600 Wall Enclosure',
    metaCode: 'SKU LM-DB600-IP55',
    door: 'DB_DoorAssembly',
    xrayMats: ['DB_Case', 'DB_CaseDark'],
    explode: 0.52,
    title: 'LM-DB600 Wall Distribution Board',
    blurb:
      'A surface-mounted, jet-and-dust resistant consumer unit built around a tinned copper ' +
      'comb busbar, twin DIN rails and a removable bottom gland plate.',
    badges: ['IEC 61439-3', 'IP55', 'RAL 7035', '100 A busbar', '12 way'],
    specs: [
      ['Enclosure', '1.2 mm powder-coated sheet steel, single door'],
      ['Dimensions', '600 × 800 × 160 mm (W × H × D)'],
      ['Ingress protection', 'IP55 — dust and water-jet resistant'],
      ['Mounting', 'Surface / wall, four-point flange, 160 mm stud centres'],
      ['Incomer', '3-pole isolating main switch, 63 A'],
      ['Distribution', 'Twin DIN rails · 12 usable 18 mm modules per rail'],
      ['Residual protection', '2 × 2-pole 30 mA RCD'],
      ['Final circuits', 'MCB 6 – 32 A, curve B / C, 1P + N'],
      ['Busbar', '100 A tinned copper comb busbar with finger shrouds'],
      ['Cable entry', '3 × M25 bottom glands on a removable plate'],
      ['Electrical rating', '230 / 400 V, 50 Hz, 100 A maximum'],
      ['Finish & mass', 'RAL 7035 textured powder coat · 11 kg']
    ],
    features: [
      ['01', 'Fabricated housing', 'Folded and welded 1.2 mm steel with a drip-edge hood, gasket-sealed door and a captive hinge pin.'],
      ['02', 'Modular DIN interior', 'Full-height DIN rails and a slotted back plate accept MCBs, RCBOs, timers and contactors without re-drilling.'],
      ['03', 'Comb busbar backbone', 'A single 100 A tinned copper busbar feeds every device on the rail to cut wiring time and joint resistance.'],
      ['04', 'Thermal headroom', 'Louvred door vents and a 30 mm internal air gap keep device temperatures well clear of derating thresholds.'],
      ['05', 'Rapid commissioning', 'Removable gland plate, hinged door and pre-numbered ways let a board be wired and tested from the front.'],
      ['06', 'Standards ready', 'Designed to IEC 61439-3 assembly rules and SANS 10142-1 wiring practice for domestic and light-commercial boards.']
    ],
    hotspots: [
      { pos: [0.245, 0.02, 0.16], side: 'right', title: 'Cam latch & lock', text: 'Recessed handle with a keyed latch for tool-free access.' },
      { pos: [-0.195, 0.20, 0.06], side: 'left', title: 'Main isolator', text: '3-pole 63 A incomer feeding the comb busbar.' },
      { pos: [0.02, 0.26, 0.05], side: 'right', title: 'Comb busbar', text: '100 A tinned copper bar linking every outgoing way.' },
      { pos: [-0.05, 0.16, 0.07], side: 'left', title: 'RCD + MCBs', text: '30 mA residual protection with curve B/C final circuits.' },
      { pos: [0.0, -0.44, 0.03], side: 'right', title: 'Cable entry', text: 'Removable gland plate with three M25 entries.' },
      { pos: [0.25, 0.29, 0.02], side: 'right', title: 'Power indicator', text: 'Door-mounted LED showing incoming supply is live.' }
    ]
  },

  solar: {
    file: 'assets/models/solar_panel.glb',
    metaName: 'LM-M60 Mono PV Module',
    metaCode: 'SKU LM-M60-360W',
    door: null,
    xrayMats: ['SP_Glass', 'SP_Back', 'SP_Backsheet'],
    explode: 0.46,
    title: 'LM-M60 Monocrystalline PV Module',
    blurb:
      'A 60-cell monocrystalline module in an anodised 6063-T5 frame, glazed with 3.2 mm ' +
      'anti-reflective tempered glass and terminated with MC4-compatible leads.',
    badges: ['IEC 61215', 'IEC 61730', 'MC4', 'IP68 J-box', '20.1 %'],
    specs: [
      ['Cell technology', 'Monocrystalline half-cut PERC, M6 wafer'],
      ['Cell layout', '60 cells · 6 columns × 10 rows'],
      ['Dimensions', '1040 × 1720 × 35 mm'],
      ['Glass', '3.2 mm anti-reflective tempered, ≥ 91 % transmission'],
      ['Frame', 'Anodised aluminium alloy 6063-T5, 35 mm profile'],
      ['Peak power', '360 Wp at STC (1000 W/m², 25 °C, AM1.5)'],
      ['Operating point', 'Vmp 34.2 V · Imp 10.5 A'],
      ['Open circuit', 'Voc 41.0 V · Isc 11.2 A'],
      ['Module efficiency', '20.1 %'],
      ['Temperature coefficient', '−0.35 %/°C (Pmax)'],
      ['Junction box', 'IP68, 3 bypass diodes, 1.2 m leads'],
      ['Mass', '20.5 kg · 25-year linear output warranty']
    ],
    features: [
      ['01', 'Half-cut cell architecture', 'Laser-split cells halve resistive losses and improve shade tolerance across the string.'],
      ['02', 'Anti-reflective glazing', 'Textured AR glass lifts light capture and sheds dust and film with normal rainfall.'],
      ['03', 'Rigid 6063-T5 frame', 'Extruded and anodised aluminium rails carry the module across a 2.4 m span with low deflection.'],
      ['04', 'Three-diode protection', 'Bypass diodes inside the IP68 junction box limit hot-spot heating under partial shading.'],
      ['05', 'MC4-compatible leads', 'UV-stable 4 mm² cable with locking connectors rated to 30 A and 1500 V DC.'],
      ['06', 'Matched to our boards', 'String voltages and current windows are co-ordinated with LM-DB combiner and protection gear.']
    ],
    hotspots: [
      { pos: [-0.38, 0.52, 0.03], side: 'left', title: 'Mono PERC cells', text: '60 half-cut cells, 20.1 % module efficiency.' },
      { pos: [0.50, 0.72, 0.02], side: 'right', title: 'Frame corner key', text: 'Anodised 6063-T5 extrusion with cast corner keys.' },
      { pos: [0.0, 0.30, 0.03], side: 'right', title: 'AR tempered glass', text: '3.2 mm anti-reflective glazing, ≥ 91 % transmission.' },
      { pos: [0.0, -0.50, -0.06], side: 'left', title: 'IP68 junction box', text: 'Three bypass diodes on a 1.2 m lead set.' },
      { pos: [0.05, -0.90, -0.05], side: 'right', title: 'MC4 connectors', text: 'Locking 1500 V DC connectors, 30 A rated.' },
      { pos: [0.0, -0.42, -0.08], side: 'left', title: 'Mounting rail', text: 'Rear C-rails for mid and end clamps.' }
    ]
  }
};

/* ────────────────────────── renderer ────────────────────────── */

const canvas = document.getElementById('scene');

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(32, 1, 0.05, 100);
camera.position.set(1.4, 0.7, 2.1);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.075;
controls.enablePan = true;
controls.minPolarAngle = 0.28;
controls.maxPolarAngle = Math.PI * 0.86;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.85;
controls.rotateSpeed = 0.85;

/* environment + lighting */
const pmrem = new THREE.PMREMGenerator(renderer);
const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
scene.environment = envTex;
if ('environmentIntensity' in scene) scene.environmentIntensity = 0.95;

const key = new THREE.DirectionalLight(0xffffff, 2.6);
key.position.set(1.6, 2.4, 2.2);
key.castShadow = true;
key.shadow.mapSize.set(1024, 1024);
key.shadow.bias = -0.0012;
key.shadow.normalBias = 0.02;
scene.add(key);

const fill = new THREE.DirectionalLight(0x8ec8ff, 1.5);
fill.position.set(-2.4, 0.6, 1.4);
scene.add(fill);

const rim = new THREE.DirectionalLight(0xffb457, 1.7);
rim.position.set(-0.8, 1.2, -2.6);
scene.add(rim);

scene.add(new THREE.HemisphereLight(0xbcd8ff, 0x0a0e14, 0.5));

/* ────────────────────────── state ────────────────────────── */

const state = {
  product: 'db',
  exploded: false,
  explodeAmt: 0,
  xray: false,
  wire: false,
  doorOpen: false,
  annotations: true
};

const models = {};
const clock = new THREE.Clock();

/* ────────────────────────── loading ────────────────────────── */

const loaderEl = document.getElementById('loader');
const loaderFill = document.getElementById('loaderFill');
const loaderText = document.getElementById('loaderText');
const loader = new GLTFLoader();

const keys = Object.keys(DATA);
let loadedCount = 0;

function setProgress(p, label) {
  loaderFill.style.width = Math.round(p * 100) + '%';
  if (label) loaderText.textContent = label;
}

function loadOne(k) {
  return new Promise((resolve) => {
    loader.load(
      DATA[k].file,
      (gltf) => {
        loadedCount += 1;
        setProgress(loadedCount / keys.length, 'Building ' + k.toUpperCase() + '…');
        resolve(prepare(k, gltf.scene));
      },
      (evt) => {
        if (evt.total) {
          const p = (loadedCount + evt.loaded / evt.total) / keys.length;
          setProgress(p);
        }
      },
      (err) => {
        console.error('Failed to load ' + DATA[k].file, err);
        loadedCount += 1;
        loaderText.textContent = 'Could not load ' + DATA[k].file;
        resolve(null);
      }
    );
  });
}

function prepare(k, root) {
  const cfg = DATA[k];

  root.updateMatrixWorld(true);

  const mats = new Set();
  root.traverse((o) => {
    if (!o.isMesh) return;
    o.castShadow = true;
    o.receiveShadow = true;
    const m = o.material;
    if (!m) return;
    mats.add(m);
    if ('envMapIntensity' in m) m.envMapIntensity = 1.1;
  });

  const rec = { key: k, root, cfg, mats: [...mats], xray: [], doorPivot: null };

  /* hinge the door so it can swing open */
  if (cfg.door) {
    const door = root.getObjectByName(cfg.door);
    if (door) {
      const db = new THREE.Box3().setFromObject(door);
      const pivot = new THREE.Group();
      pivot.position.set(db.min.x, (db.min.y + db.max.y) * 0.5, (db.min.z + db.max.z) * 0.5);
      root.add(pivot);
      pivot.updateMatrixWorld(true);
      pivot.attach(door);
      rec.doorPivot = pivot;
    }
  }

  /* bounds + camera home */
  const box = new THREE.Box3().setFromObject(root);
  const center = box.getCenter(new THREE.Vector3());
  const sphere = box.getBoundingSphere(new THREE.Sphere());
  const dist = (sphere.radius / Math.sin(THREE.MathUtils.degToRad(camera.fov * 0.5))) * 0.86;
  const dir = new THREE.Vector3(0.62, 0.30, 1).normalize();
  rec.home = {
    target: center.clone(),
    pos: center.clone().add(dir.multiplyScalar(dist))
  };
  rec.radius = sphere.radius;

  /* layered explode set-up (top-level nodes only) */
  rec.layers = root.children.map((node) => {
    const b = new THREE.Box3().setFromObject(node);
    return { node, base: node.position.clone(), z: (b.min.z + b.max.z) * 0.5 };
  });
  const zs = rec.layers.map((l) => l.z);
  rec.zMin = Math.min(...zs);
  rec.zMax = Math.max(...zs);
  rec.zRange = Math.max(rec.zMax - rec.zMin, 0.0001);

  /* materials that fade in x-ray mode */
  rec.xray = rec.mats
    .filter((m) => cfg.xrayMats.includes(m.name))
    .map((m) => ({ m, opacity: m.opacity, transparent: m.transparent, depthWrite: m.depthWrite }));

  rec.root.visible = false;
  scene.add(rec.root);

  /* key light shadow framed to the model */
  const d = sphere.radius * 3.2;
  key.shadow.camera.left = -d;
  key.shadow.camera.right = d;
  key.shadow.camera.top = d;
  key.shadow.camera.bottom = -d;
  key.shadow.camera.near = 0.1;
  key.shadow.camera.far = d * 6;
  key.shadow.camera.updateProjectionMatrix();

  return rec;
}

/* ────────────────────────── product switching ────────────────────────── */

const toolDoor = document.getElementById('toolDoor');
const metaName = document.getElementById('metaName');
const metaCode = document.getElementById('metaCode');
const hotspotsEl = document.getElementById('hotspots');

let hotspotNodes = [];

function buildHotspots(rec) {
  hotspotsEl.innerHTML = '';
  hotspotNodes = [];
  rec.hotspots = rec.cfg.hotspots.map((h) => {
    const el = document.createElement('div');
    el.className = 'hotspot' + (h.side === 'left' ? ' is-left' : '');
    el.innerHTML =
      '<span class="hs-dot"></span>' +
      '<span class="hs-card"><b>' + h.title + '</b><i>' + h.text + '</i></span>';
    hotspotsEl.appendChild(el);
    const node = { el, v: new THREE.Vector3(h.pos[0], h.pos[1], h.pos[2]), layer: null };
    hotspotNodes.push(node);
    return node;
  });
}

function applyMaterialState(rec) {
  rec.mats.forEach((m) => { m.wireframe = state.wire; });
  rec.xray.forEach((x) => {
    const on = state.xray;
    x.m.transparent = on ? true : x.transparent;
    x.m.opacity = on ? 0.2 : x.opacity;
    x.m.depthWrite = on ? false : x.depthWrite;
    x.m.needsUpdate = true;
  });
}

function showProduct(k) {
  state.product = k;
  const rec = models[k];

  Object.keys(models).forEach((key) => {
    if (models[key]) models[key].root.visible = key === k;
  });

  document.querySelectorAll('.tab').forEach((t) =>
    t.classList.toggle('is-active', t.dataset.product === k)
  );

  metaName.textContent = DATA[k].metaName;
  metaCode.textContent = DATA[k].metaCode;

  toolDoor.classList.toggle('is-hidden', !DATA[k].door);
  if (!DATA[k].door) state.doorOpen = false;
  if (rec) {
    state.doorOpen = false;
    if (rec.doorPivot) rec.doorPivot.rotation.y = 0;
    applyMaterialState(rec);
    buildHotspots(rec);
    resetView();
    renderSpecs(k);
    renderFeatures(k);
  }
}

/* ────────────────────────── copy panels ────────────────────────── */

const specTitle = document.getElementById('specTitle');
const specBlurb = document.getElementById('specBlurb');
const specBadges = document.getElementById('specBadges');
const specRows = document.getElementById('specRows');
const featureGrid = document.getElementById('featureGrid');

function renderSpecs(k) {
  const d = DATA[k];
  specTitle.textContent = d.title;
  specBlurb.textContent = d.blurb;
  specBadges.innerHTML = d.badges.map((b) => '<li>' + b + '</li>').join('');
  specRows.innerHTML = d.specs
    .map(
      (row, i) =>
        '<tr style="animation-delay:' + i * 28 + 'ms"><td>' + row[0] + '</td><td>' + row[1] + '</td></tr>'
    )
    .join('');
}

function renderFeatures(k) {
  featureGrid.innerHTML = DATA[k].features
    .map(
      (f) =>
        '<article class="card"><span class="num">' + f[0] + '</span><h3>' + f[1] + '</h3><p>' + f[2] + '</p></article>'
    )
    .join('');
}

/* ────────────────────────── tools ────────────────────────── */

function resetView() {
  const rec = models[state.product];
  if (!rec) return;
  controls.target.copy(rec.home.target);
  camera.position.copy(rec.home.pos);
  controls.minDistance = rec.radius * 1.35;
  controls.maxDistance = rec.radius * 7;
  controls.update();
}

function setTool(name, on) {
  if (name === 'rotate') {
    controls.autoRotate = on;
  } else if (name === 'door') {
    state.doorOpen = on;
  } else if (name === 'explode') {
    state.exploded = on;
  } else if (name === 'xray') {
    state.xray = on;
    if (models[state.product]) applyMaterialState(models[state.product]);
  } else if (name === 'wire') {
    state.wire = on;
    if (models[state.product]) applyMaterialState(models[state.product]);
  } else if (name === 'notes') {
    state.annotations = on;
    hotspotsEl.classList.toggle('is-off', !on);
  } else if (name === 'reset') {
    state.doorOpen = false;
    state.exploded = false;
    state.xray = false;
    state.wire = false;
    const rec = models[state.product];
    if (rec) {
      if (rec.doorPivot) rec.doorPivot.rotation.y = 0;
      applyMaterialState(rec);
    }
    resetView();
    syncToolButtons();
    return;
  }
  syncToolButtons();
}

const TOOL_BUTTONS = [...document.querySelectorAll('.tool')];

function syncToolButtons() {
  TOOL_BUTTONS.forEach((b) => {
    const t = b.dataset.tool;
    if (t === 'reset') return;
    const on =
      t === 'rotate' ? controls.autoRotate :
      t === 'door' ? state.doorOpen :
      t === 'explode' ? state.exploded :
      t === 'xray' ? state.xray :
      t === 'wire' ? state.wire :
      t === 'notes' ? state.annotations : false;
    b.classList.toggle('is-active', !!on);
  });
}

TOOL_BUTTONS.forEach((b) => {
  b.addEventListener('click', () => {
    const t = b.dataset.tool;
    if (t === 'reset') { setTool('reset', true); return; }
    const nowOn =
      t === 'rotate' ? controls.autoRotate :
      t === 'door' ? state.doorOpen :
      t === 'explode' ? state.exploded :
      t === 'xray' ? state.xray :
      t === 'wire' ? state.wire :
      t === 'notes' ? state.annotations : false;
    setTool(t, !nowOn);
  });
});

document.querySelectorAll('.tab').forEach((t) =>
  t.addEventListener('click', () => showProduct(t.dataset.product))
);
document.querySelectorAll('[data-select]').forEach((b) =>
  b.addEventListener('click', () => {
    showProduct(b.dataset.select);
    document.getElementById('viewer').scrollIntoView({ behavior: 'smooth', block: 'start' });
  })
);

/* ────────────────────────── quote form ────────────────────────── */

const quoteForm = document.getElementById('quoteForm');
const formNote = document.getElementById('formNote');
quoteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formNote.textContent = 'Thanks — a specification pack will be sent to ' + document.getElementById('quoteEmail').value + '.';
  quoteForm.reset();
});

/* ────────────────────────── resize ────────────────────────── */

function resize() {
  const frame = document.querySelector('.stage-frame');
  const w = frame.clientWidth;
  const h = frame.clientHeight;
  if (!w || !h) return;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h, false);
}
new ResizeObserver(resize).observe(document.querySelector('.stage-frame'));
window.addEventListener('resize', resize);

/* ────────────────────────── loop ────────────────────────── */

const v3 = new THREE.Vector3();
const fpsEl = document.getElementById('fps');
let fpsAcc = 0, fpsFrames = 0;

function tick() {
  requestAnimationFrame(tick);
  const dt = Math.min(clock.getDelta(), 0.05);

  /* eased explode */
  const targetExplode = state.exploded ? 1 : 0;
  state.explodeAmt += (targetExplode - state.explodeAmt) * Math.min(1, dt * 5.5);
  if (Math.abs(targetExplode - state.explodeAmt) < 0.0015) state.explodeAmt = targetExplode;

  /* eased door */
  const rec = models[state.product];
  if (rec) {
    if (rec.doorPivot) {
      const want = state.doorOpen ? -1.78 : 0;
      rec.doorPivot.rotation.y += (want - rec.doorPivot.rotation.y) * Math.min(1, dt * 5.5);
    }
    if (state.explodeAmt > 0.001) {
      const dist = rec.cfg.explode;
      rec.layers.forEach((l) => {
        const f = (l.z - rec.zMin) / rec.zRange;
        l.node.position.z = l.base.z + f * dist * state.explodeAmt;
      });
    } else if (state.explodeAmt === 0) {
      rec.layers.forEach((l) => { l.node.position.z = l.base.z; });
    }
  }

  controls.update();
  renderer.render(scene, camera);

  /* hotspot projection */
  if (hotspotNodes.length) {
    const w = renderer.domElement.clientWidth;
    const h = renderer.domElement.clientHeight;
    const fade = Math.min(1, 1 - state.explodeAmt * 1.6);
    hotspotNodes.forEach((n) => {
      v3.copy(n.v).project(camera);
      const behind = v3.z > 1;
      n.el.classList.toggle('is-behind', behind);
      n.el.classList.toggle('is-faded', fade < 0.55);
      if (behind) return;
      n.el.style.left = ((v3.x * 0.5 + 0.5) * w).toFixed(1) + 'px';
      n.el.style.top = ((-v3.y * 0.5 + 0.5) * h).toFixed(1) + 'px';
    });
  }

  /* fps readout */
  fpsAcc += dt; fpsFrames += 1;
  if (fpsAcc >= 0.5) {
    fpsEl.textContent = Math.round(fpsFrames / fpsAcc);
    fpsAcc = 0; fpsFrames = 0;
  }
}

/* ────────────────────────── boot ────────────────────────── */

(async function boot() {
  setProgress(0.05, 'Loading 3D assets…');
  const loaded = await Promise.all(keys.map(loadOne));
  keys.forEach((k, i) => { if (loaded[i]) models[k] = loaded[i]; });

  setProgress(1, 'Ready');
  setTimeout(() => loaderEl.classList.add('is-done'), 320);

  if (models.db) { showProduct('db'); }
  else { const first = keys.find((k) => models[k]); if (first) showProduct(first); }

  syncToolButtons();
  resize();
  tick();
})();
