import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ChartBar from './ChartBar';
import riskData from '../data/risk_patterns.json';
import './Section2_Risk.css';

function Section2_Risk() {
  const sectionRef = useRef(null);
  const chartRef = useRef(null);
  const cardsRef = useRef(null);
  const warningRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Fade in chart
    gsap.fromTo(
      chartRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Stagger cards
    const cards = cardsRef.current?.children;
    if (cards) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Animate warning
    gsap.fromTo(
      warningRef.current,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
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

  const timeData = riskData.timeOfDay.map(item => ({
    label: item.label,
    percentage: item.percentage,
  }));

  const colors = ['#2563eb', '#3b82f6', '#ef4444'];

  return (
    <section ref={sectionRef} className="risk-section">
      <div className="risk-content">
        <h2 className="section-title">Hvem blir skadet?</h2>
        <p className="section-text">
          Over halvparten av skadene skjer mellom kl. 23 og 05 – og nesten alle som skader seg om natten i helgene, er beruset.
          Typisk profil: unge menn, 25–34 år. Hodeskader og armskader dominerer. 
          Av 286 som fikk hodeskader, brukte bare 4 hjelm.
        </p>
        
        <div ref={chartRef} className="chart-container">
          <ChartBar data={timeData} colors={colors} />
        </div>

        <div ref={cardsRef} className="risk-cards">
          <div className="risk-card">
            <div className="risk-icon">🚨</div>
            <div className="risk-number">{riskData.riskVsBike.scooter}x</div>
            <div className="risk-label">Høyere risiko enn sykkel</div>
          </div>
          
          <div className="risk-card">
            <div className="risk-icon">🍺</div>
            <div className="risk-number">{riskData.alcohol.overall}%</div>
            <div className="risk-label">Ruspåvirket (før tiltak)</div>
          </div>
          
          <div className="risk-card danger">
            <div className="risk-icon">🪖</div>
            <div className="risk-number">{riskData.helmet.withHelmet}/{riskData.helmet.total}</div>
            <div className="risk-label">Brukte hjelm blant hodeskadde</div>
          </div>
        </div>
        
        <div ref={warningRef} className="risk-warning">
          <p>Du har 5–7 ganger høyere risiko for å bli skadet på elsparkesykkel enn på vanlig sykkel.</p>
        </div>
      </div>
    </section>
  );
}

export default Section2_Risk;

