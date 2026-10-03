'use client';
import { useEffect, useRef } from 'react';

// Procedural "iris" made of glowing filaments around a dark pupil.
// Slowly rotates, breathes, and leans toward the mouse.
export default function HeroCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const cvs = ref.current;
    const ctx = cvs.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w, h, dpr, raf, t = 0;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const N = 1100;
    const fil = Array.from({ length: N }, () => ({
      a: Math.random() * Math.PI * 2,
      r0: 0.22 + Math.random() * 0.06,
      len: 0.25 + Math.pow(Math.random(), 1.6) * 0.75,
      bend: (Math.random() - 0.5) * 0.35,
      hue: 180 + Math.random() * 22,
      lit: 45 + Math.random() * 25,
      alpha: 0.08 + Math.random() * 0.35,
      sp: 0.4 + Math.random() * 1.2,
      ph: Math.random() * 10,
    }));
    const dust = Array.from({ length: 120 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.4 + 0.2, v: Math.random() * 0.0004 + 0.0001 }));

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cvs.clientWidth; h = cvs.clientHeight;
      cvs.width = w * dpr; cvs.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const onMove = (e) => { mouse.tx = (e.clientX / w - 0.5); mouse.ty = (e.clientY / h - 0.5); };

    const draw = () => {
      t += reduce ? 0 : 0.004;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#020a10';
      ctx.fillRect(0, 0, w, h);

      const cx = w * 0.5 + mouse.x * 40, cy = h * 0.5 + mouse.y * 30;
      const R = Math.max(w, h) * 0.55;
      const breathe = 1 + Math.sin(t * 2) * 0.02;

      // outer haze
      const haze = ctx.createRadialGradient(cx, cy, R * 0.1, cx, cy, R * 0.9);
      haze.addColorStop(0, 'rgba(10,196,224,0.24)');
      haze.addColorStop(0.45, 'rgba(4,90,120,0.12)');
      haze.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = haze; ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'lighter';
      ctx.lineCap = 'round';
      for (const f of fil) {
        const a = f.a + t * 0.15;
        const flick = 0.6 + 0.4 * Math.sin(t * 6 * f.sp + f.ph);
        const r0 = f.r0 * R * 0.55 * breathe;
        const r1 = r0 + f.len * R * 0.65 * breathe;
        const x0 = cx + Math.cos(a) * r0, y0 = cy + Math.sin(a) * r0 * 0.82;
        const ab = a + f.bend;
        const x1 = cx + Math.cos(ab) * r1, y1 = cy + Math.sin(ab) * r1 * 0.82;
        const mx = cx + Math.cos(a + f.bend * 0.3) * (r0 + r1) * 0.5, my = cy + Math.sin(a + f.bend * 0.3) * (r0 + r1) * 0.41;
        ctx.strokeStyle = `hsla(${f.hue},100%,${f.lit}%,${f.alpha * flick})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath(); ctx.moveTo(x0, y0); ctx.quadraticCurveTo(mx, my, x1, y1); ctx.stroke();
      }

      // pupil
      ctx.globalCompositeOperation = 'source-over';
      const pr = R * 0.13 * breathe;
      const pg = ctx.createRadialGradient(cx, cy, 0, cx, cy, pr * 1.6);
      pg.addColorStop(0, 'rgba(2,10,16,1)'); pg.addColorStop(0.6, 'rgba(4,22,34,0.95)'); pg.addColorStop(1, 'rgba(4,22,34,0)');
      ctx.fillStyle = pg; ctx.beginPath(); ctx.ellipse(cx, cy, pr * 1.6, pr * 1.6 * 0.82, 0, 0, Math.PI * 2); ctx.fill();

      // dust
      ctx.fillStyle = 'rgba(120,225,240,0.5)';
      for (const d of dust) {
        d.y -= d.v * (reduce ? 0 : 1); if (d.y < 0) d.y = 1;
        ctx.beginPath(); ctx.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize(); draw();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    // pause when hero is off-screen
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { cancelAnimationFrame(raf); draw(); } else cancelAnimationFrame(raf); });
    io.observe(cvs);
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', onMove); };
  }, []);

  return <canvas ref={ref} className="hero_canvas" aria-hidden="true" />;
}
