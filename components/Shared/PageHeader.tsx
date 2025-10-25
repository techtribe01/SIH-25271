import React from 'react';
import type { Page } from '../../types';

interface PageHeaderProps {
  currentPage: Page;
  setPage: (page: Page) => void;
  title: string;
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ currentPage, setPage, title, subtitle }) => {
  const navItemClasses = "px-4 py-2 text-sm font-medium rounded-md transition-colors";
  const activeClasses = "bg-blue-600 text-white";
  const inactiveClasses = "text-gray-600 hover:bg-gray-200";

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0 bg-gray-100 p-1 rounded-lg">
             <button onClick={() => setPage('landing')} className="text-sm text-blue-600 hover:underline mr-2">&larr; Home</button>
            <button
              onClick={() => setPage('simulator')}
              className={`${navItemClasses} ${currentPage === 'simulator' ? activeClasses : inactiveClasses}`}
            >
              Simulator
            </button>
            <button
              onClick={() => setPage('analysis')}
              className={`${navItemClasses} ${currentPage === 'analysis' ? activeClasses : inactiveClasses}`}
            >
              Analysis
            </button>
             <button
              onClick={() => setPage('validation')}
              className={`${navItemClasses} ${currentPage === 'validation' ? activeClasses : inactiveClasses}`}
            >
              Validation
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
