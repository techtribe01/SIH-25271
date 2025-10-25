import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white text-center py-20 md:py-32">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
          AI-Powered Import Impact Simulator
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Evidence-Based Policy Tool for Palm Oil Tariff Decisions
        </p>
        <p className="mt-6 text-sm md:text-base font-semibold text-blue-800 tracking-wider">
          Ministry of Agriculture & Farmers Welfare | Smart India Hackathon 2025
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
