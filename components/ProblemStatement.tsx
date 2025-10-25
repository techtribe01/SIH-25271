import React from 'react';

const ProblemStatement: React.FC = () => {
  return (
    <section className="max-w-4xl mx-auto mb-16 md:mb-24">
      <div className="flex flex-col md:flex-row items-center justify-center bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center md:text-left">
        <div className="text-5xl mb-4 md:mb-0 md:mr-6">⚠️</div>
        <p className="text-gray-700 text-base md:text-lg">
          India imports <strong>60%</strong> of its edible oils. Frequent tariff changes (<strong>25+ in 10 years</strong>) create market volatility, affecting farmers, consumers, and government revenue.
        </p>
      </div>
    </section>
  );
};

export default ProblemStatement;
