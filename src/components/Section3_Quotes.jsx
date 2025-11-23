import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import quotesData from '../data/quotes.json';
import './Section3_Quotes.css';

function Section3_Quotes() {
  const sectionRef = useRef(null);
  const quotesRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Staggered fade-in for quotes
    const quotes = quotesRef.current?.children;
    if (quotes) {
      gsap.fromTo(
        quotes,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  // Select 4 key quotes
  const selectedQuotes = [
    quotesData.find(q => q.id === 1), // Siverts - ingen aktivitet
    quotesData.find(q => q.id === 4), // Gaarder - skadetyper
    quotesData.find(q => q.id === 5), // Werme - nachspiel
    quotesData.find(q => q.id === 6), // Randi - pårørende
  ].filter(Boolean);

  return (
    <section ref={sectionRef} className="quotes-section">
      <div className="quotes-content">
        <h2 className="section-title">Hva sier de som ser det hver dag?</h2>
        <p className="section-text">
          Leger, politi og pårørende deler sine erfaringer. 
          Frustrasjon, bekymring og sorg preger bildet.
        </p>
        
        <div ref={quotesRef} className="quotes-grid">
          {selectedQuotes.map((quote) => (
            <div key={quote.id} className="quote-card">
              <div className="quote-text">
                "{quote.quote}"
              </div>
              <div className="quote-author">
                <div className="quote-name">{quote.name}</div>
                <div className="quote-role">{quote.role}</div>
                <div className="quote-year">{quote.year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Section3_Quotes;

