import React from 'react';
import type { Page } from '../types';
import HeroSection from '../components/HeroSection';
import ProblemStatement from '../components/ProblemStatement';
import SolutionHighlight from '../components/SolutionHighlight';
import CallToAction from '../components/CallToAction';

interface LandingPageProps {
  setPage: (page: Page) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ setPage }) => {
  return (
    <>
      <HeroSection />
      <div className="container mx-auto px-6 py-12 md:py-20">
        <ProblemStatement />
        <SolutionHighlight />
        <CallToAction setPage={setPage} />
      </div>
    </>
  );
};

export default LandingPage;