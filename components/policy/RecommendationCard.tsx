import React from 'react';
import type { Recommendation } from '../../types';
import Spinner from '../simulator/Spinner';

interface RecommendationCardProps {
  recommendation: Recommendation | null;
  isLoading: boolean;
  error: string | null;
}

const ImpactRow: React.FC<{ label: string; value: string | number; color?: string }> = ({ label, value, color = 'text-gray-800' }) => (
  <div className="flex justify-between py-2 border-b border-gray-200">
    <span className="text-sm text-gray-600">{label}</span>
    <span className={`text-sm font-semibold ${color}`}>{value}</span>
  </div>
);

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md h-full flex items-center justify-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-6 rounded-lg shadow-md h-full flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="text-5xl mb-4">🚨</div>
        <h3 className="text-xl font-bold text-red-800">Error</h3>
        <p className="text-red-700 mt-2">{error}</p>
      </div>
    );
  }

  if (!recommendation) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg shadow-inner border border-dashed border-gray-300 h-full flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="text-5xl mb-4">🤖</div>
        <h3 className="text-xl font-bold text-gray-700">Awaiting Your Priorities</h3>
        <p className="text-gray-500 mt-2 max-w-sm">Adjust the sliders on the left and click "Generate" to receive an AI-powered policy recommendation.</p>
      </div>
    );
  }
  
  const { recommendedTariff, rationale, impact, nmeoAlignment } = recommendation;
  const { consumerPriceChange, farmerIncome, govtRevenue } = impact;

  const getAlignmentColor = (alignment: string) => {
    switch (alignment) {
      case 'High': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-red-600';
      default: return 'text-gray-800';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in">
       <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
      <h2 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4">AI Recommendation</h2>
      
      <div className="text-center bg-blue-50 border border-blue-200 rounded-lg p-6 my-4">
        <p className="text-lg font-medium text-blue-800">Recommended Tariff</p>
        <p className="text-7xl font-extrabold text-blue-600 my-2">{recommendedTariff}%</p>
      </div>

      <div className="my-6">
        <h4 className="font-semibold text-gray-800 mb-2">Rationale</h4>
        <p className="text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm">
          {rationale}
        </p>
      </div>

      <div>
        <h4 className="font-semibold text-gray-800 mb-2">Predicted Impact Breakdown</h4>
        <div className="space-y-1">
          <ImpactRow label="Consumer Price Change" value={`${consumerPriceChange?.toFixed(2) ?? 'N/A'} ₹/L`} color={consumerPriceChange && consumerPriceChange > 0 ? 'text-red-600' : 'text-green-600'} />
          <ImpactRow label="Farmer Income Change" value={`${farmerIncome?.toFixed(2) ?? 'N/A'}%`} color={farmerIncome && farmerIncome < 0 ? 'text-red-600' : 'text-green-600'} />
          <ImpactRow label="Government Revenue" value={`${govtRevenue?.toLocaleString('en-IN', { maximumFractionDigits: 0 }) ?? 'N/A'} Cr`} />
          <ImpactRow label="NMEO-OP Alignment" value={nmeoAlignment} color={getAlignmentColor(nmeoAlignment)} />
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
