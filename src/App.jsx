import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollProgress from './components/ScrollProgress';
import Hook from './components/Hook';
import Section1_Timeline from './components/Section1_Timeline';
import Section2_Risk from './components/Section2_Risk';
import Section3_Quotes from './components/Section3_Quotes';
import Section4_Regulations from './components/Section4_Regulations';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Cleanup ScrollTrigger on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="app">
      <ScrollProgress />
      <main className="scroll-container">
        <Hook />
        <Section1_Timeline />
        <Section2_Risk />
        <Section3_Quotes />
        <Section4_Regulations />
      </main>
    </div>
  );
}

export default App;
