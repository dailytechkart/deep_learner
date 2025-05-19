import React from 'react';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-primary h-2.5 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="container mx-auto px-4">{children}</div>;
};

export const Section: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <section className="py-12">{children}</section>;
};

export const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="mb-8">{children}</div>;
};

export const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <h2 className="text-3xl font-bold text-gray-900">{children}</h2>;
}; 