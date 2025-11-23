// NOTE: Fikset 2025 - Fjernet conditional rendering som hindret graf fra å vises
// ResponsiveContainer håndterer nå 0-width selv, og vi bruker fallback width

import { useEffect, useRef, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

function ChartLine({ data }) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 400 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight;
        // NOTE: Bruk fallback width hvis offsetWidth er 0 (f.eks. ved pinning)
        const finalWidth = width > 0 ? width : 800; // Fallback til 800px
        const finalHeight = height > 0 ? height : 400;
        setDimensions({ width: finalWidth, height: finalHeight });
      }
    };

    // Initial check - vent litt for at DOM skal være klar
    const timeoutId = setTimeout(() => {
      updateDimensions();
    }, 100);

    // ResizeObserver for å oppdage størrelsesendringer
    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    // Observer containeren når den er klar
    const observeTimeout = setTimeout(() => {
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
        updateDimensions();
      }
    }, 150);

    // Window resize listener
    window.addEventListener('resize', updateDimensions);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(observeTimeout);
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // NOTE: Render alltid ResponsiveContainer - den håndterer width selv
  // ResponsiveContainer fungerer best med '100%' width, den måler containeren selv
  return (
    <div 
      ref={containerRef}
      style={{ 
        width: '100%', 
        maxWidth: '100%',
        height: '400px', 
        minHeight: '400px',
        minWidth: '600px',
        margin: '0 auto',
        position: 'relative',
        display: 'block'
      }}
    >
      <ResponsiveContainer width="100%" height={dimensions.height || 400}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              dataKey="year" 
              stroke="#666"
              tick={{ fill: '#666', fontSize: 14 }}
            />
            <YAxis 
              stroke="#666"
              tick={{ fill: '#666', fontSize: 14 }}
              label={{ value: 'Antall skader', angle: -90, position: 'insideLeft', fill: '#666' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px'
              }}
              formatter={(value) => [`${value} skader`, '']}
            />
            <ReferenceLine 
              x={2021} 
              stroke="#ef4444" 
              strokeDasharray="5 5"
              label={{ value: 'Toppår', position: 'top', fill: '#ef4444' }}
            />
            <Line 
              type="monotone" 
              dataKey="injuries" 
              stroke="#2563eb" 
              strokeWidth={3}
              dot={{ fill: '#2563eb', r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
    </div>
  );
}

export default ChartLine;

