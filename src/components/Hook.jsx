import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hook.css';

function Hook() {
  const sectionRef = useRef(null);
  const numberRef = useRef(null);
  const textRef = useRef(null);
  const quoteRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Parallax background
    gsap.to(bgRef.current, {
      y: -100,
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Fade in number
    gsap.fromTo(
      numberRef.current,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Fade in text
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Fade in quote
    gsap.fromTo(
      quoteRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="hook-section">
      <div ref={bgRef} className="hook-background" />
      <div className="hook-content">
        <div ref={numberRef} className="hook-number">
          1878
        </div>
        <p ref={textRef} className="hook-text">
          Så mange ble skadet på el-sparkesykkel i Oslo i 2021.
          <br />
          Det er mer enn fem om dagen.
        </p>
        <blockquote ref={quoteRef} className="hook-quote">
          <p>"Det er egentlig rart vi ikke har hatt dødsfall ennå."</p>
          <cite>— Henrik Siverts, Overlege, Oslo skadelegevakt</cite>
        </blockquote>
      </div>
    </section>
  );
}

export default Hook;

