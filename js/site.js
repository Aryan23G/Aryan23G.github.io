import {
  WebGLRenderer, Scene, PerspectiveCamera, Group, Mesh, Points, LineLoop, LineSegments,
  IcosahedronGeometry, SphereGeometry, BufferGeometry, BufferAttribute, EdgesGeometry,
  MeshBasicMaterial, ShaderMaterial, PointsMaterial, LineBasicMaterial,
  AdditiveBlending, BackSide, Color, MathUtils,
  animate, inView, scroll, stagger,
  tsParticles, loadSlim
} from '../vendor/libs.js';

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const EASE = [0.16, 1, 0.3, 1];
document.documentElement.classList.add('js');
window.__siteReady = true;

/* =========================================================
   1. Interactive starfield (tsParticles)
   Kept light: ~150 stars, no retina doubling, pauses when hidden.
   ========================================================= */
(async () => {
  await loadSlim(tsParticles);
  await tsParticles.load({
    id: 'starfield',
    options: {
      fullScreen: { enable: false },
      background: { color: 'transparent' },
      fpsLimit: 60,
      detectRetina: false,
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
      particles: {
        number: { value: 150, density: { enable: true, width: 1600, height: 900 }, limit: { value: 260 } },
        color: { value: ['#ffffff', '#ffffff', '#8FB8FF', '#00F0FF', '#FF2BD6'] },
        shape: { type: 'circle' },
        size: { value: { min: 0.4, max: 1.8 } },
        opacity: { value: { min: 0.15, max: 0.95 }, animation: { enable: !reduced, speed: 0.5, sync: false } },
        move: { enable: !reduced, speed: 0.12, direction: 'none', random: true, straight: false, outModes: { default: 'out' } },
        links: { enable: false }
      },
      interactivity: {
        detectsOn: 'window',
        events: {
          onHover: { enable: !reduced && finePointer, mode: 'grab', parallax: { enable: !reduced && finePointer, force: 40, smooth: 18 } },
          onClick: { enable: !reduced, mode: 'push' },
          resize: { enable: true }
        },
        modes: {
          grab: { distance: 170, links: { opacity: 0.4, color: '#00F0FF' } },
          push: { quantity: 3 }
        }
      }
    }
  });
})().catch(err => console.warn('starfield disabled:', err));

/* =========================================================
   2. Three.js hero planet: drag to spin, follows pointer,
   only renders while the hero is on screen.
   ========================================================= */
(() => {
  const canvas = document.getElementById('planet');
  const hero = document.querySelector('.hero');
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (e) { canvas.remove(); return; }
  // Software WebGL (no GPU acceleration) is expensive: drop resolution and frame rate there.
  const gl = renderer.getContext();
  const dbg = gl.getExtension('WEBGL_debug_renderer_info');
  const gpuName = dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : '';
  const lowPower = /swiftshader|llvmpipe|softpipe|software/i.test(gpuName) || (navigator.deviceMemory && navigator.deviceMemory <= 2);
  const frameGap = lowPower ? 1000 / 24 : 0;
  renderer.setPixelRatio(lowPower ? 0.75 : Math.min(devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 0, 9);

  const world = new Group();      // positioned per viewport
  const tilt = new Group();       // pointer + drag rotation
  world.add(tilt);
  scene.add(world);

  // planet surface: procedural bands, day/night terminator, neon fresnel rim
  const planetMat = new ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uDeep: { value: new Color('#060A1C') },
      uBlue: { value: new Color('#1F4FD1') },
      uNeon: { value: new Color('#00F0FF') },
      uMag: { value: new Color('#FF2BD6') }
    },
    vertexShader: /* glsl */`
      varying vec3 vN; varying vec3 vPos; varying vec3 vView;
      void main(){
        vN = normalize(normalMatrix * normal);
        vPos = position;
        vec4 mv = modelViewMatrix * vec4(position,1.0);
        vView = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */`
      uniform float uTime; uniform vec3 uDeep; uniform vec3 uBlue; uniform vec3 uNeon; uniform vec3 uMag;
      varying vec3 vN; varying vec3 vPos; varying vec3 vView;
      float hash(vec3 p){ return fract(sin(dot(p, vec3(12.9898,78.233,37.719))) * 43758.5453); }
      float noise(vec3 p){
        vec3 i = floor(p); vec3 f = fract(p); f = f*f*(3.0-2.0*f);
        float n = mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
                      mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);
        return n;
      }
      void main(){
        vec3 p = normalize(vPos);
        float n = noise(p*3.0 + vec3(uTime*0.02,0.0,0.0))*0.6 + noise(p*7.0)*0.4;
        float bands = sin(p.y*14.0 + n*5.0)*0.5+0.5;
        vec3 col = mix(uDeep, uBlue, bands*0.55*n + 0.08);
        col = mix(col, uMag*0.35, smoothstep(0.72,0.95,n)*0.5);
        vec3 L = normalize(vec3(-0.6,0.45,0.65));
        float day = smoothstep(-0.25,0.6,dot(vN,L));
        col *= 0.18 + day*0.95;
        float fres = pow(1.0 - max(dot(vN, vView),0.0), 2.6);
        col += uNeon * fres * (0.25 + day*0.9);
        // HUD scan line sweeping the surface
        float scan = smoothstep(0.015,0.0,abs(fract(p.y*0.5+0.5 - uTime*0.06)-0.5));
        col += uNeon * scan * 0.25 * day;
        gl_FragColor = vec4(col,1.0);
      }`
  });
  const planet = new Mesh(new SphereGeometry(1.6, 72, 72), planetMat);
  tilt.add(planet);

  // atmosphere glow (back faces, additive)
  const atmo = new Mesh(new SphereGeometry(1.95, 48, 48), new ShaderMaterial({
    side: BackSide, transparent: true, depthWrite: false, blending: AdditiveBlending,
    uniforms: { uColor: { value: new Color('#2E8BFF') } },
    vertexShader: `varying vec3 vN; varying vec3 vV; void main(){ vN=normalize(normalMatrix*normal); vec4 mv=modelViewMatrix*vec4(position,1.0); vV=normalize(-mv.xyz); gl_Position=projectionMatrix*mv; }`,
    fragmentShader: `uniform vec3 uColor; varying vec3 vN; varying vec3 vV; void main(){ float i = pow(clamp(-dot(vN, vV), 0.0, 1.0), 4.0); gl_FragColor = vec4(uColor, clamp(i * 1.3, 0.0, 1.0)); }`
  }));
  tilt.add(atmo);

  // holographic wireframe shell
  const shell = new LineSegments(
    new EdgesGeometry(new IcosahedronGeometry(1.74, 2)),
    new LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.12, blending: AdditiveBlending, depthWrite: false })
  );
  tilt.add(shell);

  // particle ring
  const ring = new Group();
  ring.rotation.set(MathUtils.degToRad(74), MathUtils.degToRad(-14), 0);
  tilt.add(ring);
  const N = 2600, pos = new Float32Array(N * 3), col = new Float32Array(N * 3);
  const cA = new Color('#00F0FF'), cB = new Color('#3D7BFF'), cC = new Color('#FF2BD6'), tmp = new Color();
  for (let i = 0; i < N; i++) {
    const t = Math.random();
    const r = 2.3 + Math.pow(t, 1.4) * 1.3 + (Math.random() - 0.5) * 0.05;
    const a = Math.random() * Math.PI * 2;
    pos[i * 3] = Math.cos(a) * r; pos[i * 3 + 1] = Math.sin(a) * r; pos[i * 3 + 2] = (Math.random() - 0.5) * 0.04;
    tmp.copy(t < 0.6 ? cA : cB).lerp(cC, Math.random() < 0.08 ? 0.9 : 0);
    col[i * 3] = tmp.r; col[i * 3 + 1] = tmp.g; col[i * 3 + 2] = tmp.b;
  }
  const ringGeo = new BufferGeometry();
  ringGeo.setAttribute('position', new BufferAttribute(pos, 3));
  ringGeo.setAttribute('color', new BufferAttribute(col, 3));
  const ringPts = new Points(ringGeo, new PointsMaterial({ size: 0.022, vertexColors: true, transparent: true, opacity: 0.85, blending: AdditiveBlending, depthWrite: false }));
  ring.add(ringPts);

  // orbit paths + satellites
  const orbitDefs = [
    { r: 3.9, tilt: [1.2, 0.3], speed: 0.22, color: 0xff2bd6, size: 0.06 },
    { r: 2.15, tilt: [-0.5, 0.9], speed: -0.38, color: 0x9cff57, size: 0.045 }
  ];
  const sats = orbitDefs.map(o => {
    const g = new Group(); g.rotation.set(o.tilt[0], o.tilt[1], 0); tilt.add(g);
    const pts = new Float32Array(129 * 3);
    for (let i = 0; i < 129; i++) { const a = i / 128 * Math.PI * 2; pts[i * 3] = Math.cos(a) * o.r; pts[i * 3 + 1] = Math.sin(a) * o.r; }
    const lg = new BufferGeometry(); lg.setAttribute('position', new BufferAttribute(pts, 3));
    g.add(new LineLoop(lg, new LineBasicMaterial({ color: o.color, transparent: true, opacity: 0.18 })));
    const sat = new Mesh(new SphereGeometry(o.size, 12, 12), new MeshBasicMaterial({ color: o.color }));
    const halo = new Mesh(new SphereGeometry(o.size * 3, 12, 12), new MeshBasicMaterial({ color: o.color, transparent: true, opacity: 0.18, blending: AdditiveBlending, depthWrite: false }));
    sat.add(halo); g.add(sat);
    return { ...o, sat };
  });

  // ----- sizing: planet sits right on desktop, behind/top on mobile -----
  let W = 0, H = 0;
  function size() {
    W = hero.clientWidth; H = hero.clientHeight;
    renderer.setSize(W, H, false);
    camera.aspect = W / H; camera.updateProjectionMatrix();
    const wide = W / H > 1.05;
    world.position.set(wide ? 3.3 * Math.min(1.3, W / H / 1.5) : 0, wide ? 0 : 1.3, 0);
    const s = wide ? 1 : 0.75; world.scale.set(s, s, s);
    canvas.style.opacity = wide ? 1 : 0.55;
  }
  new ResizeObserver(size).observe(hero);
  size();

  // ----- interaction: pointer parallax + drag spin with inertia -----
  let px = 0, py = 0, dragging = false, lastX = 0, spinVel = 0.0025, spin = 0;
  addEventListener('pointermove', e => {
    px = (e.clientX / innerWidth - 0.5); py = (e.clientY / innerHeight - 0.5);
    if (dragging) { const dx = e.clientX - lastX; lastX = e.clientX; spinVel = dx * 0.004; }
  }, { passive: true });
  canvas.addEventListener('pointerdown', e => { dragging = true; lastX = e.clientX; });
  addEventListener('pointerup', () => { dragging = false; });

  // ----- render only while visible -----
  let visible = true, raf = 0, last = performance.now(), heroProgress = 0;
  let lastDraw = 0;
  const loop = now => {
    raf = 0;
    if (!visible || document.hidden) return;
    if (frameGap && now - lastDraw < frameGap) { raf = requestAnimationFrame(loop); return; }
    lastDraw = now;
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    const t = now / 1000;
    planetMat.uniforms.uTime.value = t;
    if (!dragging) spinVel += (0.0025 - spinVel) * 0.02;   // ease back to idle spin
    spin += reduced ? 0 : spinVel;
    planet.rotation.y = spin; shell.rotation.y = -spin * 0.4; shell.rotation.x = spin * 0.15;
    ringPts.rotation.z = spin * 0.35;
    tilt.rotation.x += ((py * 0.35 + 0.18) - tilt.rotation.x) * 0.05;
    tilt.rotation.z += ((-px * 0.2) - tilt.rotation.z) * 0.05;
    for (const s of sats) { const a = t * s.speed; s.sat.position.set(Math.cos(a) * s.r, Math.sin(a) * s.r, 0); }
    camera.position.z = 9 + heroProgress * 3;
    camera.position.y = -heroProgress * 1.2;
    renderer.render(scene, camera);
    if (!reduced) raf = requestAnimationFrame(loop);
    void dt;
  };
  const kick = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(loop); } };
  new IntersectionObserver(([e]) => { visible = e.intersectionRatio > 0.15; if (visible) kick(); }, { threshold: [0, 0.15, 0.3] }).observe(hero);
  document.addEventListener('visibilitychange', kick);
  addEventListener('scroll', () => {
    heroProgress = Math.min(1, scrollY / Math.max(1, H));
    if (reduced) kick();
  }, { passive: true });
  kick();
})();

/* =========================================================
   3. Motion (Framer Motion's vanilla engine) micro-interactions
   ========================================================= */

// split hero headline into characters for a staggered rise
const split = document.querySelector('.hero h1 .split');
if (split) {
  const wrap = node => {
    const out = document.createDocumentFragment();
    node.childNodes.forEach(child => {
      if (child.nodeType === 3) {
        child.textContent.split(/(\s+)/).forEach(word => {
          if (!word) return;
          if (/^\s+$/.test(word)) { out.append(document.createTextNode(' ')); return; }
          const w = document.createElement('span'); w.className = 'w'; w.setAttribute('aria-hidden', 'true');
          for (const ch of word) { const c = document.createElement('span'); c.className = 'c'; c.textContent = ch; w.append(c); }
          out.append(w);
        });
      } else {
        const clone = child.cloneNode(false); clone.append(wrap(child)); out.append(clone);
      }
    });
    return out;
  };
  const frag = wrap(split); split.replaceChildren(frag);
  if (!reduced) {
    animate('.hero h1 .c', { opacity: [0, 1], y: ['0.6em', '0em'], rotateX: [-80, 0] },
      { delay: stagger(0.025, { startDelay: 0.15 }), duration: 0.9, ease: EASE });
  }
}

// reveal on scroll (one-shot)
document.querySelectorAll('.reveal').forEach(el => {
  if (reduced) { el.style.opacity = 1; return; }
  inView(el, () => {
    animate(el, { opacity: [0, 1], y: [28, 0] }, { duration: 0.9, ease: EASE });
  }, { margin: '0px 0px -8% 0px' });
});

// hero telemetry counters
document.querySelectorAll('[data-count]').forEach(el => {
  const target = +el.dataset.count, suffix = el.dataset.suffix || '';
  if (reduced) return;
  inView(el, () => {
    animate(0, target, { duration: 1.6, ease: EASE, delay: 0.5,
      onUpdate: v => { el.textContent = Math.round(v).toLocaleString('en-US') + suffix; } });
  });
});

// skill meters fill + chip stagger
document.querySelectorAll('.module').forEach(m => {
  if (reduced) { m.querySelector('.meter i').style.transform = 'none'; return; }
  inView(m, () => {
    animate(m.querySelector('.meter i'), { scaleX: [0, 1] }, { duration: 1.2, ease: EASE, delay: 0.2 });
    animate(m.querySelectorAll('li'), { opacity: [0, 1], scale: [0.85, 1] }, { delay: stagger(0.04, { startDelay: 0.25 }), duration: 0.5, ease: EASE });
  });
});

// terminal traces type in line by line, each when it scrolls into view
document.querySelectorAll('.terminal').forEach(term => {
  const lines = term.querySelectorAll('.line');
  if (reduced) { lines.forEach(l => (l.style.opacity = 1)); return; }
  inView(term, () => {
    animate(lines, { opacity: [0, 1], x: [-10, 0] }, { delay: stagger(0.35, { startDelay: 0.3 }), duration: 0.4, ease: 'easeOut' });
  });
});

// scroll progress bar (uses ScrollTimeline when the browser supports it)
const bar = document.querySelector('.progress');
scroll(animate(bar, { scaleX: [0, 1] }, { ease: 'linear' }));

// magnetic buttons
if (finePointer && !reduced) {
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('pointermove', e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.25, y = (e.clientY - r.top - r.height / 2) * 0.35;
      animate(btn, { x, y }, { type: 'spring', stiffness: 260, damping: 18, mass: 0.6 });
    });
    btn.addEventListener('pointerleave', () => animate(btn, { x: 0, y: 0 }, { type: 'spring', stiffness: 200, damping: 14 }));
    btn.addEventListener('pointerdown', () => animate(btn, { scale: 0.95 }, { type: 'spring', stiffness: 500, damping: 20 }));
    btn.addEventListener('pointerup', () => animate(btn, { scale: 1 }, { type: 'spring', stiffness: 500, damping: 20 }));
  });
}

// 3D tilt + cursor glow on HUD panels
document.querySelectorAll('.hud').forEach(el => {
  const tiltable = el.classList.contains('tilt') && finePointer && !reduced;
  el.addEventListener('pointermove', e => {
    const r = el.getBoundingClientRect();
    const mx = e.clientX - r.left, my = e.clientY - r.top;
    el.style.setProperty('--mx', mx + 'px'); el.style.setProperty('--my', my + 'px');
    if (tiltable) {
      animate(el, { rotateY: (mx / r.width - 0.5) * 8, rotateX: -(my / r.height - 0.5) * 8 },
        { type: 'spring', stiffness: 180, damping: 20 });
    }
  });
  if (tiltable) el.addEventListener('pointerleave', () => animate(el, { rotateX: 0, rotateY: 0 }, { type: 'spring', stiffness: 140, damping: 16 }));
});

// mission selector (accessible tabs with animated panel swap)
(() => {
  const tabs = [...document.querySelectorAll('.mission-tab')];
  const select = (tab, focus) => {
    tabs.forEach(t => {
      const on = t === tab;
      t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      panel.hidden = !on;
      if (on && !reduced) {
        animate(panel, { opacity: [0, 1], x: [24, 0] }, { duration: 0.5, ease: EASE });
        animate(panel.querySelectorAll('li, .stats div'), { opacity: [0, 1], y: [10, 0] }, { delay: stagger(0.06, { startDelay: 0.1 }), duration: 0.45, ease: EASE });
      }
    });
    if (focus) tab.focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', e => {
      const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
      if (d) { e.preventDefault(); select(tabs[(i + d + tabs.length) % tabs.length], true); }
      if (e.key === 'Home') { e.preventDefault(); select(tabs[0], true); }
      if (e.key === 'End') { e.preventDefault(); select(tabs[tabs.length - 1], true); }
    });
  });
})();

/* =========================================================
   4. Nav pill, HUD readout, reticle cursor. One rAF per scroll.
   ========================================================= */
(() => {
  const nav = document.querySelector('nav');
  const pill = document.querySelector('.nav-pill');
  const links = [...document.querySelectorAll('.navlinks a')];
  const sections = links.map(a => document.querySelector(a.getAttribute('href')));
  const pct = document.getElementById('hud-pct'), sector = document.getElementById('hud-sector');
  let current = null, ticking = false;

  const movePill = a => {
    if (!a) { animate(pill, { opacity: 0 }, { duration: 0.25 }); return; }
    const opts = reduced ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 };
    animate(pill, { x: a.offsetLeft, width: a.offsetWidth, opacity: 1 }, opts);
  };
  const update = () => {
    ticking = false;
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle('scrolled', y > 40);
    pct.textContent = String(Math.round(max > 0 ? (y / max) * 100 : 0)).padStart(3, '0');
    const mid = innerHeight * 0.4;
    let idx = -1;
    sections.forEach((s, i) => { if (s && s.getBoundingClientRect().top <= mid) idx = i; });
    const a = links[idx] || null;
    if (a !== current) {
      current = a;
      links.forEach(l => l.classList.toggle('active', l === a));
      sector.textContent = a ? a.textContent : 'Orbit';
      movePill(a);
    }
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener('resize', () => { if (current) movePill(current); });
  update();

  // reticle: lerped in rAF only while it is still moving
  const ret = document.querySelector('.reticle');
  if (!finePointer || reduced) return;
  let tx = -100, ty = -100, x = -100, y = -100, running = false;
  const step = () => {
    x += (tx - x) * 0.25; y += (ty - y) * 0.25;
    ret.style.transform = `translate3d(${x}px,${y}px,0)`;
    running = Math.abs(tx - x) > 0.3 || Math.abs(ty - y) > 0.3;
    if (running) requestAnimationFrame(step);
  };
  addEventListener('pointermove', e => {
    tx = e.clientX; ty = e.clientY; ret.classList.add('on');
    if (!running) { running = true; requestAnimationFrame(step); }
  }, { passive: true });
  document.addEventListener('pointerleave', () => ret.classList.remove('on'));
  document.addEventListener('pointerover', e => {
    ret.classList.toggle('hot', !!e.target.closest('a,button,#planet'));
  });
})();
