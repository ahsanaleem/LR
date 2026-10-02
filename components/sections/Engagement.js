'use client';

import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { gsap, ScrollTrigger, Flip, useGSAP, MQ, prefersReducedMotion } from '@/lib/gsap';
import SectionIndex from '@/components/ui/SectionIndex';
import SplitHeading from '@/components/ui/SplitHeading';
import ChamferCard from '@/components/ui/ChamferCard';
import { MARK_TOP, MARK_BOTTOM, SlashIcon } from '@/components/ui/Icons';
import { engagement } from '@/content/site';

const ring = (cx, cy, r, n, offset = -Math.PI / 2) =>
  Array.from({ length: n }, (_, i) => [cx + Math.cos(offset + (i / n) * Math.PI * 2) * r, cy + Math.sin(offset + (i / n) * Math.PI * 2) * r]);

/** Node layouts for each engagement model. */
function layout(kind) {
  if (kind === 'cluster') {
    const lr = [196, 110];
    const team = ring(196, 110, 46, 5);
    return {
      you: [52, 110],
      lr,
      team,
      client: [],
      threads: [[[52, 110], lr], ...team.map((t) => [lr, t]), ...team.map((t, i) => [t, team[(i + 1) % team.length]])],
    };
  }
  if (kind === 'ring') {
    const lr = [206, 110];
    const team = ring(206, 110, 70, 6);
    return {
      you: [44, 110],
      lr,
      team,
      client: [],
      threads: [[[44, 110], lr], [[44, 110], team[4]], [[44, 110], team[5]], ...team.map((t, i) => [t, team[(i + 1) % team.length]]), ...team.map((t) => [lr, t])],
    };
  }
  // plug: single nodes plugging into the client's own network
  const you = [96, 128];
  const client = [
    [40, 78],
    [34, 168],
    [104, 196],
    [150, 70],
  ];
  const lr = [262, 52];
  const team = [
    [186, 120],
    [168, 176],
    [214, 168],
  ];
  return {
    you,
    lr,
    team,
    client,
    threads: [
      ...client.map((c) => [you, c]),
      [client[0], client[3]],
      [client[1], client[2]],
      ...team.map((t) => [lr, t]),
      [team[0], you],
      [team[1], client[2]],
      [team[2], team[0]],
      [team[0], client[3]],
    ],
  };
}

function Diagram({ kind }) {
  const { you, lr, team, client, threads } = layout(kind);
  const d = threads.map(([a, b]) => `M${a[0]} ${a[1]} L${b[0]} ${b[1]}`);
  return (
    <svg className="rel" viewBox="0 0 320 220" aria-hidden="true" focusable="false">
      <g className="rel__threads">
        {d.map((p, i) => (
          <path key={i} className="rel__thread" d={p} pathLength="1" />
        ))}
      </g>
      <g className="rel__pulses">
        {d.map((p, i) => (
          <path key={i} className="rel__pulse" d={p} pathLength="100" />
        ))}
      </g>
      {client.map(([x, y], i) => (
        <circle key={`c${i}`} className="rel__node rel__node--client" cx={x} cy={y} r="6" />
      ))}
      {team.map(([x, y], i) => (
        <circle key={`t${i}`} className="rel__node rel__node--team" cx={x} cy={y} r="6" />
      ))}
      <g className="rel__node rel__node--you">
        <circle cx={you[0]} cy={you[1]} r="19" />
        <text x={you[0]} y={you[1] + 4} textAnchor="middle">
          You
        </text>
      </g>
      <g className="rel__node rel__node--lr">
        <circle cx={lr[0]} cy={lr[1]} r="21" />
        <g transform={`translate(${lr[0] - 12} ${lr[1] - 12}) scale(${24 / 447}) translate(-116 -317)`}>
          <polygon points={MARK_TOP} />
          <polygon points={MARK_BOTTOM} />
        </g>
      </g>
    </svg>
  );
}

export default function Engagement() {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const pulses = useRef([]);

  const { contextSafe } = useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();
      // A 7-unit dash with a long gap travels from before the start to past the end of each thread.
      gsap.set(q('.rel__pulse'), { strokeDasharray: '7 193', strokeDashoffset: 7 });

      mm.add(MQ.motion, () => {
        gsap.fromTo(q('.lead'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: q('.lead')[0], start: 'top 88%', once: true } });

        pulses.current = q('.emodel').map((card, ci) => {
          const c = gsap.utils.selector(card);
          const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: 'top 82%', once: true }, delay: ci * 0.12 });
          tl.fromTo(card, { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out' })
            .fromTo(c('.rel__thread'), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut', stagger: 0.03 }, 0.3)
            .fromTo(c('.rel__node'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.6, ease: 'back.out(2)', stagger: 0.04 }, 0.45)
            .fromTo(c('.emodel__body > *'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', stagger: 0.06 }, 0.5);

          // Light pulses travel along the threads on a loop.
          const loop = gsap.timeline({ paused: true });
          c('.rel__pulse').forEach((p, i) => {
            loop.fromTo(p, { strokeDashoffset: 7 }, { strokeDashoffset: -100, duration: 2.2, ease: 'none', repeat: -1, delay: (i * 0.37) % 2.2 }, 0);
          });
          tl.call(() => loop.play(), null, 1.4);
          return loop;
        });
      });

      mm.add(MQ.reduce, () => {
        gsap.set(q('.rel__pulse'), { opacity: 0 });
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  const speed = contextSafe((i, fast) => {
    const loop = pulses.current[i];
    if (loop) gsap.to(loop, { timeScale: fast ? 2.6 : 1, duration: 0.4 });
  });

  const toggle = contextSafe(() => {
    const wrap = ref.current.querySelector('.compare');
    const state = Flip.getState(wrap);
    flushSync(() => setOpen((o) => !o));
    Flip.from(state, {
      duration: prefersReducedMotion() ? 0 : 0.7,
      ease: 'power3.inOut',
      scale: false,
      onComplete: () => ScrollTrigger.refresh(),
    });
    if (!open) gsap.fromTo(wrap.querySelectorAll('tr'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, delay: 0.2 });
  });

  return (
    <section ref={ref} id="engagement" className="section section--dark engagement" aria-labelledby="engagement-title">
      <div className="container">
        <header className="section__head section__head--split">
          <div>
            <SectionIndex index={engagement.index} label={engagement.label} />
            <SplitHeading id="engagement-title" parts={engagement.parts} />
          </div>
          <p className="lead">{engagement.intro}</p>
        </header>

        <div className="emodels">
          {engagement.models.map((m, i) => (
            <div key={m.id} className="emodel" onPointerEnter={() => speed(i, true)} onPointerLeave={() => speed(i, false)}>
              <ChamferCard as="article" className="emodel__card glass-card" data-hover="y:-8">
                <span className="emodel__glow" aria-hidden="true" />
                <Diagram kind={m.diagram} />
                <div className="emodel__body">
                  <p className="emodel__num">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="emodel__title">{m.title}</h3>
                  <p className="emodel__text">{m.text}</p>
                </div>
              </ChamferCard>
            </div>
          ))}
        </div>

        <div className="compare-wrap">
          <button type="button" className="pill-link pill-link--toggle" aria-expanded={open} aria-controls="compare" onClick={toggle}>
            {engagement.compareLabel}
            <SlashIcon size={11} />
          </button>
          <div id="compare" className={`compare${open ? ' is-open' : ''}`} aria-hidden={!open}>
            <div className="compare__scroll" data-lenis-prevent>
              <table className="compare__table">
                <thead>
                  <tr>
                    <th scope="col">
                      <span className="sr-only">Criteria</span>
                    </th>
                    {engagement.models.map((m) => (
                      <th key={m.id} scope="col">
                        {m.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {engagement.compare.rows.map((row, r) => (
                    <tr key={row}>
                      <th scope="row">{row}</th>
                      {engagement.compare.cols.map((col, c) => (
                        <td key={c}>{col[r]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
