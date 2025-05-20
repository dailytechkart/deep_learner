import React from 'react';
import Mermaid from './Mermaid';

export interface SystemDesignAnswerSection {
  title: string;
  content: React.ReactNode;
}

export interface SystemDesignAnswerProps {
  clarifications?: React.ReactNode;
  requirements?: React.ReactNode;
  hldDiagram?: string;
  hldExplanation?: React.ReactNode;
  components?: React.ReactNode;
  dataModelDiagram?: string;
  dataModelExplanation?: React.ReactNode;
  keyFlowsDiagram?: string;
  keyFlowsExplanation?: React.ReactNode;
  bottlenecks?: React.ReactNode;
  advanced?: React.ReactNode;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section style={{ marginBottom: '2.5rem' }}>
    <h2
      style={{
        fontSize: '1.35rem',
        fontWeight: 600,
        marginBottom: '1rem',
        color: 'var(--primary-color)',
      }}
    >
      {title}
    </h2>
    <div>{children}</div>
  </section>
);

const CenteredDiagram: React.FC<{ chart: string; caption: string }> = ({ chart, caption }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '2rem 0' }}>
    <div style={{ maxWidth: 700, width: '100%' }}>
      <Mermaid chart={chart} />
    </div>
    <div style={{ color: '#64748B', fontSize: '0.95rem', marginTop: 8, textAlign: 'center' }}>
      {caption}
    </div>
  </div>
);

const SystemDesignAnswer: React.FC<SystemDesignAnswerProps> = ({
  clarifications,
  requirements,
  hldDiagram,
  hldExplanation,
  components,
  dataModelDiagram,
  dataModelExplanation,
  keyFlowsDiagram,
  keyFlowsExplanation,
  bottlenecks,
  advanced,
}) => (
  <article>
    {clarifications && <Section title="1. Clarifying Questions">{clarifications}</Section>}
    {requirements && <Section title="2. Requirements">{requirements}</Section>}
    {(hldDiagram || hldExplanation) && (
      <Section title="3. High-Level Design (HLD)">
        {hldDiagram && <CenteredDiagram chart={hldDiagram} caption="High-Level Architecture" />}
        {hldExplanation}
      </Section>
    )}
    {components && <Section title="4. Component Breakdown">{components}</Section>}
    {(dataModelDiagram || dataModelExplanation) && (
      <Section title="5. Data Model">
        {dataModelDiagram && (
          <CenteredDiagram chart={dataModelDiagram} caption="Data Model / ER Diagram" />
        )}
        {dataModelExplanation}
      </Section>
    )}
    {(keyFlowsDiagram || keyFlowsExplanation) && (
      <Section title="6. Key Flows">
        {keyFlowsDiagram && (
          <CenteredDiagram chart={keyFlowsDiagram} caption="Key User/Data Flows" />
        )}
        {keyFlowsExplanation}
      </Section>
    )}
    {bottlenecks && <Section title="7. Bottlenecks & Tradeoffs">{bottlenecks}</Section>}
    {advanced && <Section title="8. Advanced/Optional Considerations">{advanced}</Section>}
  </article>
);

export default SystemDesignAnswer;
