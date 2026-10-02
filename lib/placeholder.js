'use client';

/**
 * Shared render loop for media placeholders: drifting cyan nodes joined by thin lines.
 * One requestAnimationFrame drives every visible placeholder; off-screen ones and hidden tabs cost nothing.
 */

const instances = new Set();
let raf = 0;
let listening = false;

function rand(seed) {
  let s = seed % 2147483647 || 1;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

function draw(inst, dt) {
  const { ctx, w, h, nodes, dpr, still } = inst;
  if (!w || !h) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  const link = Math.min(w, h) * 0.38;

  for (const n of nodes) {
    if (!still) {
      n.x += n.vx * dt;
      n.y += n.vy * dt;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    }
  }
  ctx.lineWidth = 1;
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < link) {
        ctx.strokeStyle = `rgba(10,196,224,${(1 - d / link) * 0.35})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }
  for (const n of nodes) {
    ctx.fillStyle = `rgba(111,230,247,${0.5 + n.r * 0.2})`;
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fill();
  }
}

let last = 0;
function loop(t) {
  raf = 0;
  const dt = Math.min(48, last ? t - last : 16) / 16;
  last = t;
  let any = false;
  for (const inst of instances) {
    if (inst.visible && !inst.still) {
      draw(inst, dt);
      any = true;
    }
  }
  if (any && !document.hidden) raf = requestAnimationFrame(loop);
  else last = 0;
}

function kick() {
  if (!raf && !document.hidden) raf = requestAnimationFrame(loop);
}

export function mountPlaceholder(canvas, { seed = 1, still = false } = {}) {
  if (!listening) {
    document.addEventListener('visibilitychange', kick);
    listening = true;
  }
  const r = rand(seed * 9973);
  const inst = {
    canvas,
    ctx: canvas.getContext('2d'),
    w: 0,
    h: 0,
    dpr: Math.min(2, window.devicePixelRatio || 1),
    visible: false,
    still,
    nodes: [],
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const first = !inst.w;
    inst.w = rect.width;
    inst.h = rect.height;
    canvas.width = Math.round(rect.width * inst.dpr);
    canvas.height = Math.round(rect.height * inst.dpr);
    if (first || !inst.nodes.length) {
      const count = Math.max(8, Math.min(18, Math.round((rect.width * rect.height) / 16000)));
      inst.nodes = Array.from({ length: count }, () => ({
        x: r() * rect.width,
        y: r() * rect.height,
        vx: (r() - 0.5) * 0.35,
        vy: (r() - 0.5) * 0.35,
        r: 1 + r() * 1.6,
      }));
    }
    draw(inst, 0);
  };

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  const io = new IntersectionObserver(([e]) => {
    inst.visible = e.isIntersecting;
    if (inst.visible) kick();
  });
  io.observe(canvas);
  instances.add(inst);

  return () => {
    ro.disconnect();
    io.disconnect();
    instances.delete(inst);
  };
}
