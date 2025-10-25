import React from 'react';

interface SolutionCardProps {
  icon: string;
  title: string;
  text: string;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ icon, title, text }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out flex-1 flex flex-col items-center text-center">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  );
};

const solutions = [
  {
    icon: '🔮',
    title: 'Predictive Modeling',
    text: 'ML-based forecasts using 2015-2025 data',
  },
  {
    icon: '📊',
    title: 'Scenario Comparison',
    text: 'Compare impacts at 0%, 10%, 20% tariffs',
  },
  {
    icon: '✅',
    title: 'Validated Accuracy',
    text: '85% accuracy, back-tested on May 2025 data',
  },
];

const SolutionHighlight: React.FC = () => {
  return (
    <section className="mb-16 md:mb-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {solutions.map((solution, index) => (
          <SolutionCard key={index} {...solution} />
        ))}
      </div>
    </section>
  );
};

export default SolutionHighlight;
