'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// one shared animation layer targets elements that only exist on some pages — that's expected
gsap.config({ nullTargetWarn: false });

// One place for the motion on every inner page (services, work, blog, legal).
// Pages stay server-rendered; this component finds their elements by class and animates them.
export default function InnerFx() {
  const finePointer = () => matchMedia('(pointer: fine)').matches;

  useGSAP(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rtl = document.dir === 'rtl' ? -1 : 1;

    // ── hero: copy rises in, media unmasks, everything drifts away on scroll
    gsap.from('.pg_hero .crumbs, .pg_hero .pg_eyebrow, .pg_hero .pg_lead, .pg_hero .pg_actions > *', {
      y: 34, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.09, delay: 0.25,
    });
    gsap.fromTo('.pg_media', { clipPath: 'inset(100% 0% 0% 0% round 20px)' }, { clipPath: 'inset(0% 0% 0% 0% round 20px)', duration: 1.4, ease: 'power4.inOut', delay: 0.2 });
    gsap.fromTo('.pg_media .media', { scale: 1.35 }, { scale: 1, duration: 1.8, ease: 'power3.out', delay: 0.2 });
    gsap.to('.pg_hero_grid', { yPercent: -12, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: '.pg_hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.pg_bg_mark', { rotate: 40 * rtl, yPercent: 30, ease: 'none', scrollTrigger: { trigger: '.pg_hero', start: 'top top', end: 'bottom top', scrub: true } });
    // media panel starts turned in 3D and straightens as you scroll; tags and stamp pop in around it
    gsap.fromTo('.pg_media', { rotateY: -14 * rtl, rotateX: 6 }, { rotateY: 0, rotateX: 0, ease: 'none', scrollTrigger: { trigger: '.pg_hero', start: 'top top', end: 'bottom 30%', scrub: 1 } });
    gsap.from('.pg_chip', { scale: 0.4, opacity: 0, duration: 0.9, ease: 'back.out(2)', stagger: 0.15, delay: 1 });
    gsap.from('.pg_stamp', { scale: 0, rotate: -120 * rtl, opacity: 0, duration: 1.2, ease: 'power4.out', delay: 0.9 });
    // ghost title (pages without media) and keyword strip slide with scroll
    gsap.fromTo('.pg_ghost', { xPercent: 6 * rtl }, { xPercent: -14 * rtl, ease: 'none', scrollTrigger: { trigger: '.pg_hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.from('.pg_strip', { yPercent: 120, opacity: 0, duration: 1.2, ease: 'power4.out', delay: 0.6 });

    // ── scroll reveals: batched so rows of cards come in together with a stagger
    const reveal = (sel, from, stagger = 0.08) => {
      const els = gsap.utils.toArray(sel);
      if (!els.length) return;
      gsap.set(els, from);
      ScrollTrigger.batch(els, {
        start: 'top 90%',
        once: true,
        onEnter: (batch) => gsap.to(batch, { y: 0, x: 0, opacity: 1, scale: 1, rotate: 0, duration: 1, ease: 'power3.out', stagger, overwrite: true }),
      });
    };
    reveal('.card, .post_card, .svc_row', { y: 60, opacity: 0 });
    reveal('.steps li', { y: 50, opacity: 0, scale: 0.96 }, 0.12);
    reveal('.work_row', { y: 80, opacity: 0, scale: 0.97 }, 0.15);
    reveal('.wv_main, .wv_tabs button', { y: 50, opacity: 0 }, 0.1);
    reveal('.link_list li, .faq details, .tick_list li', { x: -30 * rtl, opacity: 0 }, 0.06);
    reveal('.prose > p, .prose > section, .article_body > *', { y: 26, opacity: 0 }, 0.05);
    reveal('.pg_lead_inline, .article_meta, .article_cta, .cta_band', { y: 40, opacity: 0 });

    // ── offering cards: tech logos spin up into their tiles one after another
    gsap.utils.toArray('.card_stack').forEach((stack) => {
      gsap.from(stack.querySelectorAll('svg'), { scale: 0, rotate: -120 * rtl, opacity: 0, duration: 0.9, ease: 'back.out(2.2)', stagger: 0.08, delay: 0.35, scrollTrigger: { trigger: stack, start: 'top 92%' } });
      gsap.from(stack.querySelectorAll('.tile'), { y: 18, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08, delay: 0.25, scrollTrigger: { trigger: stack, start: 'top 92%' } });
    });

    // ── process steps: the connector line draws itself as the section scrolls
    gsap.utils.toArray('.steps_wrap').forEach((wrap) => {
      gsap.fromTo(wrap.querySelector('.steps_line i'), { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: wrap, start: 'top 80%', end: 'bottom 60%', scrub: true } });
    });

    // ── case study screens: fan in, then drift at different speeds
    gsap.utils.toArray('.case_gallery.is_mobile figure').forEach((fig, i, all) => {
      const mid = (all.length - 1) / 2;
      gsap.from(fig, { y: 160, rotate: (i - mid) * 8 * rtl, opacity: 0, duration: 1.3, ease: 'power4.out', delay: i * 0.12, scrollTrigger: { trigger: fig, start: 'top 95%' } });
      gsap.to(fig, { yPercent: (i - mid) * -10 - 4, ease: 'none', scrollTrigger: { trigger: fig.closest('.pg_section'), start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    // ── work index: screenshot parallax inside each row
    gsap.utils.toArray('.work_row_img img').forEach((img) => {
      gsap.fromTo(img, { yPercent: 8 }, { yPercent: -8, ease: 'none', scrollTrigger: { trigger: img.closest('.work_row'), start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    // ── next-case link and CTA: slide in from the side
    gsap.from('.next_card', { y: 90, opacity: 0, scale: 0.96, duration: 1.2, ease: 'power4.out', scrollTrigger: { trigger: '.next_case', start: 'top 88%' } });
    gsap.from('.next_shots img', { y: 160, rotate: 10 * rtl, opacity: 0, duration: 1.3, ease: 'power4.out', stagger: 0.15, delay: 0.25, scrollTrigger: { trigger: '.next_case', start: 'top 85%' } });
    gsap.fromTo('.next_ghost', { xPercent: 8 * rtl }, { xPercent: -10 * rtl, ease: 'none', scrollTrigger: { trigger: '.next_case', start: 'top bottom', end: 'bottom top', scrub: true } });

    // ── reading progress bar
    gsap.to('.read_progress i', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });

    requestAnimationFrame(() => ScrollTrigger.refresh());
  });

  // Pointer effects: spotlight glow on cards, 3D tilt, magnetic buttons, hero orbs following the cursor
  useEffect(() => {
    if (!finePointer() || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const main = document.querySelector('main.inner');
    if (!main) return;

    const orbs = gsap.utils.toArray('.pg_orb').map((o, i) => ({ x: gsap.quickTo(o, 'x', { duration: 1.6 + i * 0.6, ease: 'power3.out' }), y: gsap.quickTo(o, 'y', { duration: 1.6 + i * 0.6, ease: 'power3.out' }), k: i % 2 ? -1 : 1 }));
    const spot = '.card, .post_card, .work_row, .steps li, .cta_band, .svc_row, .faq details';

    const move = (e) => {
      // hero orbs drift opposite each other
      const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5;
      orbs.forEach((o) => { o.x(nx * 80 * o.k); o.y(ny * 60 * o.k); });
      // spotlight follows the cursor inside the hovered card
      const card = e.target.closest(spot);
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      }
      // gentle 3D tilt on large link cards
      const tilt = e.target.closest('.work_row, .card_link, .post_card');
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        gsap.to(tilt, { rotateY: ((e.clientX - r.left) / r.width - 0.5) * 6, rotateX: -((e.clientY - r.top) / r.height - 0.5) * 6, transformPerspective: 1000, duration: 0.6, ease: 'power3.out' });
      }
      // magnetic buttons
      const btn = e.target.closest('.btn, .case_btn');
      if (btn) {
        const r = btn.getBoundingClientRect();
        gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.5, ease: 'power3.out' });
      }
    };
    const out = (e) => {
      const tilt = e.target.closest?.('.work_row, .card_link, .post_card');
      if (tilt && !tilt.contains(e.relatedTarget)) gsap.to(tilt, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'elastic.out(1, 0.6)' });
      const btn = e.target.closest?.('.btn, .case_btn');
      if (btn && !btn.contains(e.relatedTarget)) gsap.to(btn, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' });
    };
    main.addEventListener('pointermove', move);
    main.addEventListener('pointerout', out);
    return () => { main.removeEventListener('pointermove', move); main.removeEventListener('pointerout', out); };
  }, []);

  // FAQ: animate the answer open/closed instead of the native jump
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const onClick = (e) => {
      const summary = e.target.closest('.faq summary');
      if (!summary || reduced) return;
      e.preventDefault();
      const d = summary.parentElement, body = d.querySelector('p');
      if (d.open) {
        gsap.to(body, { height: 0, opacity: 0, duration: 0.4, ease: 'power2.inOut', onComplete: () => { d.open = false; gsap.set(body, { clearProps: 'all' }); } });
      } else {
        d.open = true;
        gsap.fromTo(body, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.5, ease: 'power3.out', clearProps: 'height' });
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
