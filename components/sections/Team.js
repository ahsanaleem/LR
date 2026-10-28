'use client';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import SplitHeading from '../ui/SplitHeading';
import { Social } from '../ui/Icons';
import { useContent } from '../global/SiteProvider';

// first + last name initials, e.g. 'Muhammad Omer\nKhan' → 'MK'
const initials = (name) => {
  const w = name.split(/\s+/);
  return (w[0][0] + (w.length > 1 ? w[w.length - 1][0] : '')).toUpperCase();
};

export default function Team() {
  const { team, ui } = useContent();
  const root = useRef(null);
  useGSAP(() => {
    // All leaders visible at once: cards rise in with a stagger, photos drift gently on scroll
    gsap.from('.member', { y: 60, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.team_grid', start: 'top 80%' } });
    gsap.utils.toArray('.member_photo .ph').forEach((ph) => {
      gsap.fromTo(ph, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: ph.closest('.member'), start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  }, { scope: root });

  return (
    <section className="team section" ref={root}>
      <div className="container team_head">
        <SplitHeading parts={[[team.title[0], false]]} className="xl" srTail={team.title[1]} />
        <div className="feat_row">
          {team.intro && <p className="team_intro">{team.intro}</p>}
          <SplitHeading parts={[[team.title[1], true]]} className="xl" marker={false} as="div" aria-hidden />
        </div>
      </div>
      <div className="container">
        <div className="team_grid">
          {team.members.map((m) => (
            <article className="member" key={m.role}>
              <div className="member_photo">
                {m.photo
                  ? <img className="ph" src={m.photo} alt={`${m.name.replace('\n', ' ')}, ${m.role}`} loading="lazy" />
                  : <div className="ph ph_placeholder" aria-hidden="true"><span>{initials(m.name)}</span></div>}
              </div>
              <div className="member_info">
                <h3>{m.name}</h3>
                <span className="member_role">{m.role}</span>
                {m.points?.length > 0 && <ul>{m.points.map((p) => <li key={p}>{p}</li>)}</ul>}
                {(m.bio || m.linkedin) && (
                  <div className="member_bio">
                    {m.bio && <p>{m.bio}</p>}
                    {m.linkedin && <a href={m.linkedin} className="member_in" aria-label={`${m.name.replace('\n', ' ')} on LinkedIn`} target="_blank" rel="noopener noreferrer"><Social name="linkedin" size={20} /></a>}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
