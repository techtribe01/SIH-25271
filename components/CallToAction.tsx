import React from 'react';
import type { Page } from '../types';

interface CallToActionProps {
  setPage: (page: Page) => void;
}

const CallToAction: React.FC<CallToActionProps> = ({ setPage }) => {
  return (
    <section className="text-center py-10">
      <button
        onClick={() => setPage('simulator')}
        className="bg-blue-600 text-white font-bold text-xl md:text-2xl py-4 px-10 rounded-lg shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 ease-in-out"
      >
        Launch Simulator &rarr;
      </button>
      <p className="mt-4">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setPage('validation');
          }}
          className="text-blue-600 hover:underline"
        >
          Or view validation data first
        </a>
      </p>
    </section>
  );
};

export default CallToAction;
