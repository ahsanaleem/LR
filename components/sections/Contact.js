'use client';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { brand, contact } from '@/content/site';
import ContactForm from '../ui/ContactForm';
import { Phone } from '../ui/Icons';

export default function Contact() {
  const root = useRef(null);
  useGSAP(() => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top 70%' }, defaults: { ease: 'power3.out' } });
    tl.from('.contact_left', { x: -80, opacity: 0, duration: 1.1 })
      .from('.contact_right > *', { y: 40, opacity: 0, stagger: 0.1, duration: 0.8 }, '-=0.7')
      .from('.contact_right .field', { y: 30, opacity: 0, stagger: 0.08, duration: 0.6 }, '-=0.5');
    gsap.to('.contact_left .cl_shape', { rotate: 360, duration: 30, repeat: -1, ease: 'none' });
  }, { scope: root });

  return (
    <section className="contact section_sm" id="contact" ref={root}>
      <div className="container">
        <div className="contact_wrap">
          <div className="contact_left">
            <span className="cl_shape" aria-hidden="true" />
            <h2>{contact.title}</h2>
            <p>{contact.text}</p>
            <p>{contact.sub}</p>
            <a className="call_box" href={`tel:${brand.phone}`}>
              <span className="call_icon"><Phone size={28} /></span>
              <span><small>{contact.callLabel}</small><b>{brand.phone}</b></span>
            </a>
          </div>
          <div className="contact_right">
            <h3>{contact.formTitle}</h3>
            <p>{contact.formSub}</p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
