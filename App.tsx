import React, { useState, useEffect, useCallback } from 'react';
import type { Page, Results, ToastType } from './types';
import LandingPage from './pages/LandingPage';
import SimulatorPage from './pages/SimulatorPage';
import AnalysisPage from './pages/AnalysisPage';
import ValidationPage from './pages/ValidationPage';
import NavigationBar from './components/Shared/NavigationBar';
import Footer from './components/Footer';
import Toast from './components/Shared/Toast';
import { calculateImpact } from './utils/calculator';

const DEFAULTS = {
  tariff: 10,
  globalPrice: 95000,
  domesticDemand: 17.1,
};

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Shared State
  const [tariff, setTariff] = useState(DEFAULTS.tariff);
  const [globalPrice, setGlobalPrice] = useState(DEFAULTS.globalPrice);
  const [domesticDemand, setDomesticDemand] = useState(DEFAULTS.domesticDemand);
  const [results, setResults] = useState<Results>({
    importVolume: null, consumerPriceChange: null, govtRevenue: null, farmerIncome: null,
  });
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const handleSetPage = useCallback((newPage: Page) => {
    if (page === newPage) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setPage(newPage);
      window.scrollTo(0, 0);
      setIsTransitioning(false);
    }, 300);
  }, [page]);

  const validateInputs = () => {
    const newErrors: Record<string, string | null> = {};
    if (tariff < 0 || tariff > 30) newErrors.tariff = 'Tariff must be between 0 and 30.';
    if (globalPrice <= 0) newErrors.globalPrice = 'Global price must be positive.';
    if (domesticDemand <= 0) newErrors.domesticDemand = 'Domestic demand must be positive.';
    setErrors(newErrors);
    return Object.values(newErrors).every(e => e === null);
  };

  const handleCalculate = () => {
    if (!validateInputs()) {
      setToast({ message: 'Invalid inputs. Please correct the highlighted fields.', type: 'error' });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const newResults = calculateImpact({ tariff, globalPrice, domesticDemand });
      setResults(newResults);
      setIsLoading(false);
      setToast({ message: 'View detailed analysis →', type: 'success' });
    }, 1500);
  };

  const handleReset = () => {
    setTariff(DEFAULTS.tariff);
    setGlobalPrice(DEFAULTS.globalPrice);
    setDomesticDemand(DEFAULTS.domesticDemand);
    setResults({ importVolume: null, consumerPriceChange: null, govtRevenue: null, farmerIncome: null });
    setErrors({});
  };
  
  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case '1': e.preventDefault(); handleSetPage('home'); break;
          case '2': e.preventDefault(); handleSetPage('simulator'); break;
          case '3': e.preventDefault(); handleSetPage('analysis'); break;
          case '4': e.preventDefault(); handleSetPage('validation'); break;
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSetPage]);

  // Toast auto-dismiss
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  
  const sharedState = {
    tariff, setTariff,
    globalPrice, setGlobalPrice,
    domesticDemand, setDomesticDemand,
    results,
    isLoading,
    handleCalculate,
    handleReset,
    errors,
  };

  const renderPage = () => {
    switch (page) {
      case 'simulator':
        return <SimulatorPage setPage={handleSetPage} {...sharedState} />;
      case 'analysis':
        return <AnalysisPage setPage={handleSetPage} isTransitioning={isTransitioning} {...sharedState} />;
      case 'validation':
        return <ValidationPage setPage={handleSetPage} />;
      case 'home':
      default:
        return <LandingPage setPage={handleSetPage} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar currentPage={page} setPage={handleSetPage} />
      <main className={`flex-grow pt-16 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {renderPage()}
      </main>
      <Footer />
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
          onLinkClick={toast.type === 'success' ? () => handleSetPage('analysis') : undefined}
        />
      )}
    </div>
  );
};

export default App;