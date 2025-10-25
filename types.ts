export type Page = 'home' | 'simulator' | 'analysis' | 'validation';

export type ToastType = 'success' | 'error';

export interface Results {
  importVolume: number | null;
  consumerPriceChange: number | null;
  govtRevenue: number | null;
  farmerIncome: number | null;
}

export interface ScenarioData extends Results {
  tariff: number;
}