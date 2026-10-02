'use client';

import { useEffect, useRef } from 'react';
import { MARK_TOP, MARK_BOTTOM } from '@/components/ui/Icons';
import { prefersReducedMotion } from '@/lib/gsap';

const LINK = 120; // px — nodes closer than this are joined
const MOUSE_LINK = 170;
const MOUSE_PUSH = 130;

const toPoints = (str) => {
  const n = str.split(/[\s,]+/).map(Number);
  const pts = [];
  for (let i = 0; i < n.length; i += 2) pts.push([(n[i] - 116) / 447 - 0.5, (n[i + 1] - 317) / 447 - 0.5]);
  return pts.slice(0, -1); // last point repeats the first
};

/**
 * Walk both mark outlines and place `outline` points at even arc-length spacing (each linked to the next,
 * so the LR shape reads clearly), plus `interior` random points inside the shapes. Coordinates in [-0.5, 0.5].
 */
function sampleMark(outline, interior) {
  const polys = [toPoints(MARK_TOP), toPoints(MARK_BOTTOM)];
  const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const perims = polys.map((p) => p.reduce((sum, pt, i) => sum + dist(pt, p[(i + 1) % p.length]), 0));
  const total = perims[0] + perims[1];
  const points = [];
  polys.forEach((poly, pi) => {
    const k = Math.round((outline * perims[pi]) / total);
    const step = perims[pi] / k;
    const start = points.length;
    let seg = 0;
    let acc = 0;
    for (let j = 0; j < k; j++) {
      const t = j * step;
      while (acc + dist(poly[seg], poly[(seg + 1) % poly.length]) < t) {
        acc += dist(poly[seg], poly[(seg + 1) % poly.length]);
        seg++;
      }
      const a = poly[seg];
      const b = poly[(seg + 1) % poly.length];
      const f = (t - acc) / dist(a, b);
      points.push({ p: [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f], next: start + ((j + 1) % k) });
    }
  });

  // Interior points via rejection sampling against the filled shapes.
  const size = 200;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  for (const poly of polys) {
    ctx.beginPath();
    poly.forEach(([x, y], i) => ctx[i ? 'lineTo' : 'moveTo']((x + 0.5) * size, (y + 0.5) * size));
    ctx.closePath();
    ctx.fill();
  }
  const data = ctx.getImageData(0, 0, size, size).data;
  let guard = 0;
  while (points.length < outline + interior && guard++ < 5000) {
    const x = Math.random();
    const y = Math.random();
    if (data[((y * size) | 0) * size * 4 + ((x * size) | 0) * 4 + 3] > 200) points.push({ p: [x - 0.5, y - 0.5], next: -1 });
  }
  return points;
}

/**
 * Hero "connection field": cyan nodes drift, join with thin lines, gather into the LR mark
 * once `start` is true, then loosen into a softer, breathing mark. The pointer acts as a node.
 * `control.current = { rotation (deg), drift (px) }` is written by the hero's scroll timeline.
 */
export default function ConnectionField({ start, control }) {
  const canvasRef = useRef(null);
  const startRef = useRef(start);
  const api = useRef(null);

  useEffect(() => {
    startRef.current = start;
    if (start) api.current?.begin();
  }, [start]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduced = prefersReducedMotion();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    let S = 0;
    let raf = 0;
    let visible = true;
    let gatherAt = 0;
    const mouse = { x: 0, y: 0, active: false };

    const mobile = window.innerWidth < 768;
    const N = mobile ? 90 : 180;
    const outlineCount = mobile ? 64 : 112;
    const targets = sampleMark(outlineCount, mobile ? 10 : 22);
    const boundCount = targets.length;

    const nodes = Array.from({ length: N }, (_, i) => ({
      x: 0,
      y: 0,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: 0.8 + Math.random() * 1.5,
      phase: Math.random() * Math.PI * 2,
      t: i < boundCount ? targets[i].p : null,
      next: i < boundCount ? targets[i].next : -1,
    }));

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      const first = !w;
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      const wide = w > 900;
      cx = wide ? w * 0.7 : w * 0.5;
      cy = wide ? h * 0.44 : h * 0.34;
      S = wide ? Math.min(w * 0.34, h * 0.58) : Math.min(w * 0.7, h * 0.38);
      if (first) {
        for (const n of nodes) {
          n.x = Math.random() * w;
          n.y = Math.random() * h;
        }
      }
    };

    const target = (n, time, loose) => {
      const rot = ((control?.current?.rotation || 0) * Math.PI) / 180;
      const drift = control?.current?.drift || 0;
      const ux = n.t[0] * S;
      const uy = n.t[1] * S;
      const cos = Math.cos(rot);
      const sin = Math.sin(rot);
      const amp = loose * S * 0.012;
      return [
        cx + ux * cos - uy * sin + Math.sin(time * 0.0006 + n.phase) * amp,
        cy + drift + ux * sin + uy * cos + Math.cos(time * 0.0005 + n.phase * 1.3) * amp,
      ];
    };

    const step = (time) => {
      const since = gatherAt ? time - gatherAt : -1;
      const gathering = since >= 0;
      // 0 → 1 over the first 1.6s: how strongly bound nodes are pulled to the mark.
      const pull = gathering ? Math.min(1, since / 1600) : 0;
      // After 2.6s the mark loosens into a breathing version.
      const loose = gathering ? Math.min(1, Math.max(0, (since - 2600) / 1800)) : 0;

      for (const n of nodes) {
        if (n.t && gathering) {
          const [tx, ty] = target(n, time, loose);
          const k = 0.012 + pull * 0.03 - loose * 0.018;
          n.vx += (tx - n.x) * k;
          n.vy += (ty - n.y) * k;
          n.vx *= 0.84;
          n.vy *= 0.84;
        } else {
          n.vx += Math.sin(time * 0.0003 + n.phase) * 0.004;
          n.vy += Math.cos(time * 0.00027 + n.phase) * 0.004;
          n.vx = Math.max(-0.6, Math.min(0.6, n.vx));
          n.vy = Math.max(-0.6, Math.min(0.6, n.vy));
        }
        if (mouse.active) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < MOUSE_PUSH && d > 0.01) {
            const f = (1 - d / MOUSE_PUSH) * 0.9;
            n.vx += (dx / d) * f;
            n.vy += (dy / d) * f;
          }
        }
        n.x += n.vx;
        n.y += n.vy;
        if (!n.t || !gathering) {
          if (n.x < -20) n.x = w + 20;
          if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h + 20;
          if (n.y > h + 20) n.y = -20;
        }
      }
      return { pull, loose };
    };

    const draw = ({ pull, loose }) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      // Bound lines are brightest while the mark is held, then fade to a faint breathing outline.
      const markAlpha = pull * (1 - loose * 0.55);
      // Inside the mark, only near neighbours connect so the outline stays legible.
      const markLink = Math.max(28, S * 0.11);
      ctx.lineWidth = 0.8;
      // Outline chain — this is what makes the LR mark legible.
      if (markAlpha > 0.01) {
        ctx.strokeStyle = `rgba(10,196,224,${0.15 + markAlpha * 0.6})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (const n of nodes) {
          if (n.next < 0) continue;
          const m = nodes[n.next];
          // Only draw links that have closed up, so the outline "zips" together as nodes arrive.
          if (Math.abs(n.x - m.x) + Math.abs(n.y - m.y) > markLink * 2) continue;
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(m.x, m.y);
        }
        ctx.stroke();
        ctx.lineWidth = 0.8;
      }
      for (let i = 0; i < N; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < N; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          if (dx > LINK || dx < -LINK) continue;
          const dy = a.y - b.y;
          if (dy > LINK || dy < -LINK) continue;
          const d = Math.sqrt(dx * dx + dy * dy);
          const both = a.t && b.t && markAlpha > 0.05;
          const reach = both ? markLink : LINK;
          if (d >= reach) continue;
          const base = both ? 0.08 + markAlpha * 0.18 : 0.14 * (1 - markAlpha * 0.4);
          ctx.strokeStyle = `rgba(10,196,224,${(1 - d / reach) * base})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      if (mouse.active) {
        for (const n of nodes) {
          const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
          if (d < MOUSE_LINK) {
            ctx.strokeStyle = `rgba(111,230,247,${(1 - d / MOUSE_LINK) * 0.5})`;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = 'rgba(111,230,247,.9)';
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      for (const n of nodes) {
        const glow = n.t ? 0.4 + markAlpha * 0.6 : 0.35;
        ctx.fillStyle = `rgba(111,230,247,${glow})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const frame = (time) => {
      raf = 0;
      draw(step(time));
      if (visible && !document.hidden) raf = requestAnimationFrame(frame);
    };
    const play = () => {
      if (!raf && visible && !document.hidden && !reduced) raf = requestAnimationFrame(frame);
    };

    // Reduced motion: one static frame of the breathing mark.
    const drawStatic = () => {
      for (const n of nodes) {
        if (!n.t) continue;
        const [tx, ty] = target(n, 0, 1);
        n.x = tx;
        n.y = ty;
      }
      draw({ pull: 1, loose: 1 });
    };

    layout();
    api.current = {
      begin: () => {
        if (!gatherAt) gatherAt = performance.now();
      },
    };
    if (startRef.current) api.current.begin();

    const ro = new ResizeObserver(() => {
      layout();
      if (reduced) drawStatic();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) play();
    });
    io.observe(canvas);

    const onVis = () => play();
    document.addEventListener('visibilitychange', onVis);

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active = mouse.y >= 0 && mouse.y <= r.height && e.pointerType === 'mouse';
    };
    const onLeave = () => (mouse.active = false);
    if (!reduced) {
      window.addEventListener('pointermove', onMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onLeave);
    }

    if (reduced) drawStatic();
    else play();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      api.current = null;
    };
  }, [control]);

  return <canvas ref={canvasRef} className="field-canvas" aria-hidden="true" />;
}
