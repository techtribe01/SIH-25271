import React, { useState } from 'react';
import type { Page } from '../../types';

interface NavigationBarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
}

const navLinks: { page: Page; label: string }[] = [
  { page: 'home', label: 'Home' },
  { page: 'simulator', label: 'Simulator' },
  { page: 'analysis', label: 'Analysis' },
  { page: 'validation', label: 'Validation' },
];

const NavigationBar: React.FC<NavigationBarProps> = ({ currentPage, setPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const baseClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out";
  const activeClasses = "text-blue-600 font-bold border-b-2 border-blue-600";
  const inactiveClasses = "text-gray-700 hover:bg-gray-200 hover:text-gray-900";

  const NavLink: React.FC<{ page: Page; label: string }> = ({ page, label }) => (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        setPage(page);
        setIsMenuOpen(false);
      }}
      className={`${baseClasses} ${currentPage === page ? activeClasses : inactiveClasses}`}
      aria-current={currentPage === page ? 'page' : undefined}
    >
      {label}
    </a>
  );

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-20 no-print">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold text-gray-800">🌴 TariffSim</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map(link => <NavLink key={link.page} {...link} />)}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon for menu */}
              <svg className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Icon for close */}
              <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            {navLinks.map(link => <NavLink key={link.page} {...link} />)}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;