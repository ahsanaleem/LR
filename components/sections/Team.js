'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MQ } from '@/lib/gsap';
import SectionIndex from '@/components/ui/SectionIndex';
import SplitHeading from '@/components/ui/SplitHeading';
import ChamferCard from '@/components/ui/ChamferCard';
import Media from '@/components/ui/Media';
import { SocialIcon } from '@/components/ui/Icons';
import { team } from '@/content/site';

export default function Team() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(q('.lead'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: q('.lead')[0], start: 'top 88%', once: true } });
        gsap.fromTo(q('.member'), { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out', stagger: 0.12, scrollTrigger: { trigger: q('.team__grid')[0], start: 'top 85%', once: true } });
        // Portrait parallax inside its mask.
        q('.member__photo').forEach((photo) => {
          gsap.fromTo(photo.querySelector('.portrait__layer'), { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: photo, start: 'top bottom', end: 'bottom top', scrub: true } });
        });
      });
      // Hover: portrait settles from 1.06 to 1.
      mm.add(MQ.fine, () => {
        const offs = q('.member').map((card) => {
          const inner = card.querySelector('.portrait__zoom');
          const enter = () => gsap.fromTo(inner, { scale: 1.06 }, { scale: 1, duration: 1.2, ease: 'power3.out', overwrite: 'auto' });
          card.addEventListener('pointerenter', enter);
          return () => card.removeEventListener('pointerenter', enter);
        });
        return () => offs.forEach((o) => o());
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="team" className="section section--dark team" aria-labelledby="team-title">
      <div className="container">
        <header className="section__head section__head--split">
          <div>
            <SectionIndex index={team.index} label={team.label} />
            <SplitHeading id="team-title" parts={team.parts} />
          </div>
          <p className="lead">{team.intro}</p>
        </header>

        {/* PLACEHOLDER — team members live in content/site.js */}
        <div className="team__grid">
          {team.members.map((m) => (
            <article key={m.name} className="member" tabIndex={0} aria-label={`${m.name}, ${m.role}`}>
              <ChamferCard className="member__photo" cut={30}>
                <div className="portrait__layer">
                  <div className="portrait__zoom">
                    {m.media.image || m.media.video ? (
                      <Media media={m.media} alt={m.name} ratio="4 / 5" sizes="(max-width: 768px) 100vw, 33vw" />
                    ) : (
                      <div className="portrait__initials" aria-hidden="true">
                        <span>{m.initials}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="member__bio">
                  <p>{m.bio}</p>
                </div>
                <a className="member__in" href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on LinkedIn`}>
                  <SocialIcon id="linkedin" />
                </a>
              </ChamferCard>
              <h3 className="member__name">{m.name}</h3>
              <p className="member__role">{m.role}</p>
              <ul className="member__points">
                {m.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
