import React from 'react';
import type { Results } from '../../types';
import KPICard from './KPICard';
import Spinner from './Spinner';

interface ResultsDisplayProps {
  results: Results;
  isLoading: boolean;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, isLoading }) => {
  const { importVolume, consumerPriceChange, govtRevenue, farmerIncome } = results;

  const consumerPriceBg = consumerPriceChange === null ? 'bg-gray-100' : consumerPriceChange > 0 ? 'bg-red-100' : 'bg-green-100';

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md h-full flex items-center justify-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 border-b pb-3 mb-6">Predicted Economic Impact</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <KPICard
          icon="📦"
          title="Import Volume"
          value={importVolume}
          unit="Million MT"
          bgColor="bg-blue-100"
          precision={2}
        />
        <KPICard
          icon="💰"
          title="Consumer Price"
          value={consumerPriceChange}
          unit="₹/Liter Change"
          bgColor={consumerPriceBg}
          precision={2}
        />
        <KPICard
          icon="🏛️"
          title="Government Revenue"
          value={govtRevenue}
          unit="₹ Crores"
          bgColor="bg-yellow-100"
          precision={0}
        />
        <KPICard
          icon="🌾"
          title="Farmer Income"
          value={farmerIncome}
          unit="% Change"
          bgColor="bg-orange-100"
          precision={2}
        />
      </div>
      <div className="text-center mt-6">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          Model Accuracy: 85% ± 3%
        </span>
      </div>
    </div>
  );
};

export default ResultsDisplay;