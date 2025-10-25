import React from 'react';
import type { Page } from '../types';
import ImportSensitivityChart from '../components/charts/ImportSensitivityChart';
import ScenarioComparisonChart from '../components/charts/ScenarioComparisonChart';
import TradeoffAnalysisChart from '../components/charts/TradeoffAnalysisChart';
import ComparisonTable from '../components/analysis/ComparisonTable';
import Spinner from '../components/simulator/Spinner';

interface AnalysisPageProps {
  setPage: (page: Page) => void;
  tariff: number;
  globalPrice: number;
  domesticDemand: number;
  isTransitioning: boolean;
}

const AnalysisPage: React.FC<AnalysisPageProps> = ({
  tariff,
  globalPrice,
  domesticDemand,
  isTransitioning,
}) => {
  const currentInputs = { tariff, globalPrice, domesticDemand };

  if (isTransitioning) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Spinner />
          <p className="mt-2 text-lg font-semibold text-gray-600">Loading charts...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div id="analysis-page">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Scenario Analysis & Visualizations</h1>
          <p className="text-md text-gray-500 mt-1">Compare tariff impacts across multiple scenarios</p>
        </div>
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ImportSensitivityChart {...currentInputs} />
            <ScenarioComparisonChart {...currentInputs} />
            <TradeoffAnalysisChart {...currentInputs} />
          </div>
        </section>

        <section>
          <ComparisonTable {...currentInputs} />
        </section>
      </div>
    </div>
  );
};

export default AnalysisPage;