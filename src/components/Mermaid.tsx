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
    mermaid.initialize({ startOnLoad: false });
    mermaid
      .render(chartId.current, chart)
      .then(({ svg }) => {
        if (isMounted) {
          setSvg(svg);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError('Failed to render diagram.');
          setSvg('');
        }
      });
    return () => {
      isMounted = false;
    };
  }, [chart]);

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;
  }

  return (
    <div
      className="mermaid"
      style={{ width: '100%', overflowX: 'auto', background: 'transparent' }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default Mermaid; 