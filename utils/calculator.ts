import type { Results } from '../types';

interface CalculationInputs {
  tariff: number;
  globalPrice: number;
  domesticDemand: number;
}

export const calculateImpact = (inputs: CalculationInputs): Results => {
  const { tariff, globalPrice, domesticDemand } = inputs;

  const importVolume = 10.2 - (0.15 * tariff) - (0.00008 * globalPrice) + (0.3 * domesticDemand);
  const consumerPriceChange = -0.8 * (importVolume - 9.3);
  const govtRevenue = (tariff / 100) * importVolume * (globalPrice * 1.15) / 1000;
  const farmerIncome = (10 - importVolume) * 3.5;

  return {
    importVolume,
    consumerPriceChange,
    govtRevenue,
    farmerIncome,
  };
};
