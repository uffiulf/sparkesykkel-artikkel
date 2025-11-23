// NOTE: Fikset 2025 - Seksjonen var hvit/blank pga:
// 1. GSAP animasjoner startet med opacity: 0 og ble aldri synlige hvis ScrollTrigger ikke trigger
// 2. ChartLine rendret kun når dimensions.width > 0 (startet på 0)
// 3. Pin-spacer kunne dekke innholdet
// 4. useEffect kjørte asynkront, ScrollTrigger beregnet posisjoner feil
// Løsning: 
// - Bruker useLayoutEffect for synkron kjøring før browser paint
// - Bruker gsap.from() i stedet for gsap.fromTo() - elementene er synlige i CSS som default
// - GSAP animerer dem inn når ScrollTrigger trigger, men de forblir synlige hvis JS ikke kjører
// - Fjernet conditional rendering i ChartLine, forbedret pin-spacer CSS
// - Forbedret cleanup og chart refresh med debug logging

import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ChartLine from './ChartLine';
import injuriesData from '../data/injuries.json';
import './Section1_Timeline.css';

function Section1_Timeline() {
  const sectionRef = useRef(null);
  const chartRef = useRef(null);
  const textRef = useRef(null);
  const introRef = useRef(null);
  const noteRef = useRef(null);
  const [chartKey, setChartKey] = useState(0);

  // NOTE: ScrollTrigger setup - elementene er allerede synlige via CSS
  // Bruker useLayoutEffect for synkron kjøring før browser paint
  // Dette forhindrer layout shifts og 'white section' bug
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const chartContainer = chartRef.current;

    // Funksjon for å refreshe grafen når containeren får størrelse
    const refreshChart = () => {
      if (chartContainer) {
        const width = chartContainer.offsetWidth;
        console.log('[Section1_Timeline] Chart container width:', width); // Debug log
        if (width > 0) {
          // Tving re-render av ChartLine ved å endre key
          setChartKey(prev => {
            const newKey = prev + 1;
            console.log('[Section1_Timeline] Chart key updated to:', newKey); // Debug log
            return newKey;
          });
          // Trigger re-render av ResponsiveContainer ved å refreshe ScrollTrigger
          ScrollTrigger.refresh();
        } else {
          console.warn('[Section1_Timeline] Chart container width is 0, retrying...'); // Debug log
        }
      }
    };

    // Pin the section
    const pinTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=200%',
      pin: true,
      pinSpacing: true,
      onEnter: () => {
        // Refresh chart når seksjonen blir pinned
        setTimeout(() => {
          refreshChart();
          ScrollTrigger.refresh();
        }, 150);
      },
      onUpdate: () => {
        // Refresh på scroll update
        refreshChart();
      },
      onLeave: () => {
        // Refresh når vi forlater pinned state
        refreshChart();
      },
    });

    // NOTE: Bruker gsap.from() - elementene er synlige i CSS som default
    // immediateRender: false sikrer at GSAP ikke setter opacity: 0 før ScrollTrigger trigger
    // Hvis JS ikke kjører eller ScrollTrigger ikke trigger, forblir elementene synlige
    // Animate chart appearance
    gsap.from(
      chartRef.current,
      {
        opacity: 0,
        scale: 0.9,
        y: 20,
        duration: 1,
        immediateRender: false, // Viktig: ikke sett opacity: 0 umiddelbart
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Animate intro
    gsap.from(
      introRef.current,
      {
        opacity: 0,
        y: 20,
        duration: 0.8,
        immediateRender: false,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Animate text
    gsap.from(
      textRef.current,
      {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        immediateRender: false,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Animate note
    gsap.from(
      noteRef.current,
      {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.5,
        immediateRender: false,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Resize listener for å oppdatere grafen når containeren endrer størrelse
    const handleResize = () => {
      refreshChart();
    };

    window.addEventListener('resize', handleResize);
    
    // ResizeObserver for mer nøyaktig størrelsesdeteksjon
    const resizeObserver = new ResizeObserver(() => {
      refreshChart();
    });

    // Observer chartContainer hvis den finnes
    if (chartContainer) {
      resizeObserver.observe(chartContainer);
      // Initial refresh etter kort delay
      setTimeout(refreshChart, 200);
    }

    // Force ScrollTrigger refresh etter setup for å sikre korrekt beregning
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      // Kill all ScrollTrigger instances for denne seksjonen
      if (pinTrigger) {
        pinTrigger.kill();
      }
      // Kill alle ScrollTrigger animasjoner for denne seksjonen
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  const chartData = injuriesData.yearly.map(item => ({
    year: item.year,
    injuries: item.injuries,
  }));

  return (
    <section ref={sectionRef} className="timeline-section">
      <div className="timeline-content">
        <h2 className="section-title">Skader over tid</h2>
        <p ref={introRef} className="section-intro">
          El-sparkesykler tok Norge med storm fra 2019. Men med populariteten fulgte en dramatisk økning i ulykker.
        </p>
        <p ref={textRef} className="section-text">
          Toppåret 2021 hadde nesten 1900 skader – etter innstramminger falt tallet med 64 prosent, 
          men i 2025 er trenden på vei opp igjen. I juni 2021 alene ble 436 mennesker skadet i Oslo. 
          Det tilsvarer 14 skader hver eneste dag.
        </p>
        <div ref={chartRef} className="chart-container">
          <ChartLine key={chartKey} data={chartData} />
        </div>
        <div ref={noteRef} className="section-note">
          <p>Problemet er ikke begrenset til Oslo. Bergen, Trondheim og Stavanger rapporterer også økende skadetall.</p>
        </div>
      </div>
    </section>
  );
}

export default Section1_Timeline;

