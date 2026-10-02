'use client';

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, A11y, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative';
import { gsap, useGSAP, MQ, ScrollTrigger } from '@/lib/gsap';
import { useSite } from '@/components/global/SiteProvider';
import SectionIndex from '@/components/ui/SectionIndex';
import SplitHeading from '@/components/ui/SplitHeading';
import Marquee from '@/components/ui/Marquee';
import Media from '@/components/ui/Media';
import { StarIcon, PlayIcon, ChevronIcon } from '@/components/ui/Icons';
import { reviews } from '@/content/site';

function QuoteCard({ q }) {
  return (
    <figure className="quote">
      <div className="quote__stars" aria-label={`${q.stars} out of 5 stars`} role="img">
        {Array.from({ length: q.stars }, (_, i) => (
          <StarIcon key={i} />
        ))}
      </div>
      <blockquote className="quote__text">“{q.quote}”</blockquote>
      <figcaption className="quote__who">
        <span className="quote__avatar" aria-hidden="true">
          {q.name.charAt(0)}
        </span>
        <span>
          <strong>{q.name}</strong>
          <small>{q.role}</small>
        </span>
      </figcaption>
    </figure>
  );
}

function VideoSlide({ v, index }) {
  const { toast } = useSite();
  const [playing, setPlaying] = useState(false);
  const play = () => {
    if (!v.media.video) {
      toast('Video review coming soon.', 'success');
      return;
    }
    setPlaying(true);
  };
  return (
    <div className="vslide">
      {playing ? (
        <video className="vslide__video" src={v.media.video} poster={v.media.poster} controls autoPlay playsInline />
      ) : (
        <Media media={v.media.poster ? { image: v.media.poster } : {}} ratio="4 / 5" label={`Review ${String(index + 1).padStart(2, '0')}`} alt={`${v.name}, ${v.role}`} sizes="360px" />
      )}
      {!playing && (
        <>
          <button type="button" className="vslide__play" onClick={play} aria-label={`Play video review from ${v.name}, ${v.role}`}>
            <span className="vslide__pulse" aria-hidden="true" />
            <PlayIcon />
          </button>
          <div className="vslide__meta">
            <strong>{v.name}</strong>
            <small>{v.role}</small>
          </div>
        </>
      )}
    </div>
  );
}

export default function Reviews() {
  const ref = useRef(null);
  const swiper = useRef(null);
  const half = Math.ceil(reviews.quotes.length / 2);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo('.reviews__wall', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: '.reviews__wall', start: 'top 88%', once: true } });
        gsap.fromTo('.reviews__videos', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.reviews__videos', start: 'top 85%', once: true } });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="reviews" className="section section--dark reviews" aria-labelledby="reviews-title">
      <div className="container">
        <header className="section__head">
          <SectionIndex index={reviews.index} label={reviews.label} />
          <SplitHeading id="reviews-title" parts={reviews.parts} />
        </header>
      </div>

      {/* PLACEHOLDER — Replace with real client quotes in content/site.js */}
      <div className="reviews__wall">
        <Marquee mode="css" duration={60} label="Client quotes, row one">
          {reviews.quotes.slice(0, half).concat(reviews.quotes.slice(0, half)).map((q, i) => (
            <QuoteCard key={i} q={q} />
          ))}
        </Marquee>
        <Marquee mode="css" direction="right" duration={70} label="Client quotes, row two">
          {reviews.quotes.slice(half).concat(reviews.quotes.slice(half)).map((q, i) => (
            <QuoteCard key={i} q={q} />
          ))}
        </Marquee>
      </div>

      <div className="reviews__videos container" data-cursor="drag">
        <Swiper
          className="vswiper"
          modules={[EffectCreative, A11y, Keyboard]}
          effect="creative"
          loop
          speed={900}
          grabCursor
          centeredSlides
          keyboard={{ enabled: true, onlyInViewport: true }}
          slidesPerView={1}
          creativeEffect={{
            limitProgress: 2,
            prev: { translate: ['-92%', 0, -160], scale: 0.85, opacity: 0.45 },
            next: { translate: ['92%', 0, -160], scale: 0.85, opacity: 0.45 },
          }}
          onSwiper={(s) => {
            swiper.current = s;
            requestAnimationFrame(() => ScrollTrigger.refresh());
          }}
          a11y={{ prevSlideMessage: 'Previous review', nextSlideMessage: 'Next review' }}
        >
          {/* PLACEHOLDER — add { video, poster } to each item in content/site.js */}
          {reviews.videos.map((v, i) => (
            <SwiperSlide key={i}>
              <VideoSlide v={v} index={i} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="vswiper__nav">
          <button type="button" className="round-btn" onClick={() => swiper.current?.slidePrev()} aria-label="Previous video review">
            <ChevronIcon dir="left" />
          </button>
          <button type="button" className="round-btn" onClick={() => swiper.current?.slideNext()} aria-label="Next video review">
            <ChevronIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
