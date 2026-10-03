'use client';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { team } from '@/content/site';
import SplitHeading from '../ui/SplitHeading';
import { Social } from '../ui/Icons';

export default function Team() {
  const root = useRef(null);
  useGSAP(() => {
    gsap.from('.team_intro', { y: 30, opacity: 0, duration: 1, scrollTrigger: { trigger: '.team_intro', start: 'top 90%' } });
    const mm = gsap.matchMedia();
    // Desktop: pin the section and translate the card track horizontally while scrolling
    mm.add('(min-width: 900px)', () => {
      const track = root.current.querySelector('.team_track');
      const dist = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: { trigger: '.team_pin', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 },
      });
      // each card's photo counter-moves (parallax inside the mask)
      gsap.utils.toArray('.member_photo .ph').forEach((ph) => {
        gsap.fromTo(ph, { xPercent: -12 }, { xPercent: 12, ease: 'none', scrollTrigger: { trigger: ph.closest('.member'), containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
      });
      gsap.to('.team_progress i', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.team_pin', start: 'top top', end: () => '+=' + dist(), scrub: true } });
    });
    mm.add('(max-width: 899px)', () => {
      gsap.utils.toArray('.member').forEach((m) => gsap.from(m, { y: 60, opacity: 0, duration: 1, scrollTrigger: { trigger: m, start: 'top 85%' } }));
    });
  }, { scope: root });

  return (
    <section className="team section" ref={root}>
      <div className="container team_head">
        <SplitHeading parts={[[team.title[0], false]]} className="xl" />
        <div className="feat_row">
          <p className="team_intro">{team.intro}</p>
          <SplitHeading parts={[[team.title[1], true]]} className="xl" marker={false} />
        </div>
      </div>
      <div className="team_pin">
        <div className="team_track">
          {team.members.map((m) => (
            <article className="member" key={m.role}>
              <div className="member_photo">
                {m.photo ? <img className="ph" src={m.photo} alt={m.name.replace('\n', ' ')} /> : <div className="ph ph_placeholder"><span>{m.name.split('\n').map((x) => x[0]).join('')}</span></div>}
              </div>
              <div className="member_info">
                <h3>{m.name}</h3>
                <span className="member_role">{m.role}</span>
                <ul>{m.points.map((p) => <li key={p}>{p}</li>)}</ul>
                <div className="member_bio">
                  <p>{m.bio}</p>
                  <a href={m.linkedin} className="member_in" aria-label="LinkedIn"><Social name="linkedin" size={20} /></a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="team_progress container"><i /></div>
      </div>
    </section>
  );
}
