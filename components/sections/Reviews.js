'use client';
import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Controller, EffectFade, Keyboard, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { reviews } from '@/content/site';
import SplitHeading from '../ui/SplitHeading';
import Media from '../ui/Media';
import { ArrowLeft, Arrow, Play } from '../ui/Icons';

export default function Reviews() {
  const root = useRef(null);
  const [textSw, setTextSw] = useState(null);
  const [mediaSw, setMediaSw] = useState(null);

  useGSAP(() => {
    gsap.from('.rev_body', { y: 60, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: '.rev_body', start: 'top 80%' } });
    gsap.fromTo('.rev_map', { backgroundPosition: '0% 50%' }, { backgroundPosition: '100% 50%', ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } });
  }, { scope: root });

  return (
    <section className="reviews section" id="reviews" ref={root}>
      <span className="rev_map" aria-hidden="true" />
      <div className="container">
        <SplitHeading parts={[[reviews.title[0], false], [reviews.title[1], true]]} className="xl" />
        <div className="rev_body">
          <div className="rev_left">
            <span className="rev_quote">“</span>
            <Swiper modules={[Controller, EffectFade, Keyboard, A11y]} effect="fade" fadeEffect={{ crossFade: true }} speed={900} loop onSwiper={setTextSw} controller={{ control: mediaSw }} keyboard className="rev_text_sw">
              {reviews.items.map((r, i) => (
                <SwiperSlide key={i}>
                  <blockquote>{r.quote}</blockquote>
                  <strong>{r.name}</strong>
                  <small>{r.role}</small>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="client_slider_btnss">
              <button aria-label="Previous review" onClick={() => textSw?.slidePrev()}><ArrowLeft size={18} /></button>
              <button aria-label="Next review" onClick={() => textSw?.slideNext()}><Arrow size={18} /></button>
            </div>
          </div>
          <div className="rev_right" data-cursor="drag">
            <Swiper modules={[Controller]} speed={1200} loop slidesPerView={1.5} spaceBetween={40} onSwiper={setMediaSw} controller={{ control: textSw }} className="rev_media_sw" grabCursor>
              {reviews.items.map((r, i) => (
                <SwiperSlide key={i}>
                  <div className="rev_vid">
                    <Media media={r.media} hue={182 + i * 8} variant="face" />
                    <span className="rev_play"><Play size={34} /></span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
