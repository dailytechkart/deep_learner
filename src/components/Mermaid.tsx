'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  chart: string;
  id?: string;
}

const generateId = (() => {
  let counter = 0;
  return () => `mermaid-chart-${counter++}`;
})();

const Mermaid: React.FC<MermaidProps> = ({ chart, id }) => {
  const [svg, setSvg] = useState<string>('');
  const chartId = useRef(id || generateId());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    console.log('Initializing Mermaid with chart:', chart);

    try {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        securityLevel: 'loose',
        logLevel: 'debug',
      });

      mermaid
        .render(chartId.current, chart)
        .then(({ svg }) => {
          console.log('Mermaid rendered successfully');
          if (isMounted) {
            setSvg(svg);
            setError(null);
          }
        })
        .catch((err: Error) => {
          console.error('Mermaid rendering error:', err);
          if (isMounted) {
            setError(`Failed to render diagram: ${err.message}`);
            setSvg('');
          }
        });
    } catch (err: unknown) {
      console.error('Mermaid initialization error:', err);
      if (isMounted) {
        setError(
          `Failed to initialize Mermaid: ${err instanceof Error ? err.message : 'Unknown error'}`
        );
        setSvg('');
      }
    }

    return () => {
      isMounted = false;
    };
  }, [chart]);

  if (error) {
    return (
      <div
        style={{
          color: 'red',
          textAlign: 'center',
          padding: '1rem',
          background: '#fff1f0',
          border: '1px solid #ffccc7',
          borderRadius: '4px',
          margin: '1rem 0',
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div
      className="mermaid"
      style={{
        width: '100%',
        overflowX: 'auto',
        background: 'transparent',
        minHeight: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default Mermaid;
