import React, { useState } from 'react';
import type { Page, Recommendation } from '../types';
import PrioritySliders from '../components/policy/PrioritySliders';
import RecommendationCard from '../components/policy/RecommendationCard';
import { getAIRecommendation } from '../utils/ai';

interface PolicyPageProps {
  setPage: (page: Page) => void;
  globalPrice: number;
  domesticDemand: number;
}

interface Priorities {
  consumer: number;
  farmer: number;
  revenue: number;
  nmeo: number;
}

const PolicyPage: React.FC<PolicyPageProps> = (props) => {
  const { globalPrice, domesticDemand } = props;
  
  const [priorities, setPriorities] = useState<Priorities>({
    consumer: 60,
    farmer: 50,
    revenue: 40,
    nmeo: 70,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getAIRecommendation(priorities, globalPrice, domesticDemand);
      setRecommendation(result);
    } catch (e: any) {
      setError(e.message || "An unknown error occurred.");
      setRecommendation(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <PrioritySliders
            priorities={priorities}
            setPriorities={setPriorities}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
        </div>
        <div className="lg:col-span-3">
          <RecommendationCard
            recommendation={recommendation}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;
