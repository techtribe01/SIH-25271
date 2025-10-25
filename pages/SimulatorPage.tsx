import React from 'react';
import type { Page, Results } from '../types';
import InputControls from '../components/simulator/InputControls';
import ResultsDisplay from '../components/simulator/ResultsDisplay';

interface SimulatorPageProps {
  setPage: (page: Page) => void;
  tariff: number;
  setTariff: (value: number) => void;
  globalPrice: number;
  setGlobalPrice: (value: number) => void;
  domesticDemand: number;
  setDomesticDemand: (value: number) => void;
  results: Results;
  isLoading: boolean;
  handleCalculate: () => void;
  handleReset: () => void;
  errors: Record<string, string | null>;
}

const SimulatorPage: React.FC<SimulatorPageProps> = (props) => {
  const {
    tariff, setTariff,
    globalPrice, setGlobalPrice,
    domesticDemand, setDomesticDemand,
    results, isLoading, handleCalculate, handleReset, errors
  } = props;

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Simulator Dashboard</h1>
        <p className="text-md text-gray-500 mt-1">Configure parameters to predict economic impact</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <InputControls
            tariff={tariff}
            setTariff={setTariff}
            globalPrice={globalPrice}
            setGlobalPrice={setGlobalPrice}
            domesticDemand={domesticDemand}
            setDomesticDemand={setDomesticDemand}
            onCalculate={handleCalculate}
            onReset={handleReset}
            isLoading={isLoading}
            errors={errors}
          />
        </div>
        <div className="lg:col-span-3">
          <ResultsDisplay results={results} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default SimulatorPage;