import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Timeline from './Timeline';
import regulationsData from '../data/regulations.json';
import './Section4_Regulations.css';

function Section4_Regulations() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const comparisonRef = useRef(null);
  const noteRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Reveal timeline on scroll
    gsap.fromTo(
      timelineRef.current,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Animate comparison cards
    const cards = comparisonRef.current?.children;
    if (cards) {
      gsap.fromTo(
        cards,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Animate note
    gsap.fromTo(
      noteRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.4,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  const beforeAfter = regulationsData.beforeAfter;

  return (
    <section ref={sectionRef} className="regulations-section">
      <div className="regulations-content">
        <h2 className="section-title">Hva har vi gjort – og hva gjenstår?</h2>
        <p className="section-text">
          Tiltakene fra 2021–2022 ga tydelig effekt – men med flere sykler i 2025 stiger skadene igjen.
          Promillegrense, aldersgrense, hjelmpåbud og nattestenging reduserte skadene med 64 prosent.
          Men etter at Oslo doblet antall utleiesykler fra 8000 til 16000 i april 2025, har trenden snudd.
        </p>

        <div ref={timelineRef} className="timeline-wrapper">
          <Timeline events={regulationsData.timeline} />
        </div>

        <div ref={comparisonRef} className="comparison-cards">
          <div className="comparison-card before">
            <div className="comparison-label">Før tiltak</div>
            <div className="comparison-period">{beforeAfter.before.period}</div>
            <div className="comparison-number">{beforeAfter.before.injuries}</div>
            <div className="comparison-text">skader</div>
          </div>

          <div className="comparison-arrow">→</div>

          <div className="comparison-card after">
            <div className="comparison-label">Etter tiltak</div>
            <div className="comparison-period">{beforeAfter.after.period}</div>
            <div className="comparison-number">{beforeAfter.after.injuries}</div>
            <div className="comparison-text">skader</div>
            <div className="comparison-decline">-{beforeAfter.decline}% nedgang</div>
          </div>
        </div>
        
        <div ref={noteRef} className="regulations-note">
          <p>Totalt har 12 personer mistet livet på elsparkesykkel i Norge mellom 2020 og 2024. 
          I syv av ulykkene var føreren ruspåvirket, og ingen brukte hjelm.</p>
        </div>
      </div>
    </section>
  );
}

export default Section4_Regulations;

