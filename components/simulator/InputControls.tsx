import React from 'react';

interface InputControlsProps {
  tariff: number;
  setTariff: (value: number) => void;
  globalPrice: number;
  setGlobalPrice: (value: number) => void;
  domesticDemand: number;
  setDomesticDemand: (value: number) => void;
  onCalculate: () => void;
  onReset: () => void;
  isLoading: boolean;
  errors: Record<string, string | null>;
}

const InputField: React.FC<{
  id: string;
  label: string;
  error?: string | null;
  children: React.ReactNode;
}> = ({ id, label, error, children }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    {children}
    {error && <p className="mt-1 text-sm text-red-600" id={`${id}-error`}>{error}</p>}
  </div>
);

const InputControls: React.FC<InputControlsProps> = ({
  tariff,
  setTariff,
  globalPrice,
  setGlobalPrice,
  domesticDemand,
  setDomesticDemand,
  onCalculate,
  onReset,
  isLoading,
  errors,
}) => {
  const getTariffBgColor = () => {
    if (errors.tariff) return 'bg-red-100 border-red-300';
    if (tariff <= 10) return 'bg-green-100 border-green-200';
    if (tariff <= 20) return 'bg-yellow-100 border-yellow-200';
    return 'bg-red-100 border-red-200';
  };

  const getInputClass = (hasError: boolean) => 
    `mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${hasError ? 'border-red-500' : 'border-gray-300'}`;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <h2 className="text-xl font-bold text-gray-800 border-b pb-3">Scenario Configuration</h2>
      
      <div className={`p-4 rounded-lg border transition-colors duration-300 ${getTariffBgColor()}`}>
        <InputField id="tariff" label="Select Import Tariff (%)" error={errors.tariff}>
          <div className="flex items-center space-x-4">
            <input
              id="tariff"
              type="range"
              min="0"
              max="30"
              step="1"
              value={tariff}
              onChange={(e) => setTariff(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              aria-describedby="tariff-error"
            />
            <span className="text-2xl font-bold text-gray-900 min-w-[50px] text-center">{tariff}%</span>
          </div>
        </InputField>
      </div>

      <InputField id="global-price" label="Global CPO Price (₹/MT)" error={errors.globalPrice}>
        <input
          id="global-price"
          type="number"
          min="80000"
          max="120000"
          value={globalPrice}
          onChange={(e) => setGlobalPrice(Number(e.target.value))}
          className={getInputClass(!!errors.globalPrice)}
          aria-describedby="global-price-error"
        />
      </InputField>

      <InputField id="domestic-demand" label="India Domestic Demand (Million MT)" error={errors.domesticDemand}>
        <input
          id="domestic-demand"
          type="number"
          min="15.0"
          max="20.0"
          step="0.1"
          value={domesticDemand}
          onChange={(e) => setDomesticDemand(Number(e.target.value))}
          className={getInputClass(!!errors.domesticDemand)}
          aria-describedby="domestic-demand-error"
        />
      </InputField>

      <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
        <button
          onClick={onCalculate}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300"
        >
          {isLoading ? 'Calculating...' : 'Calculate Impact'}
        </button>
        <button
          onClick={onReset}
          disabled={isLoading}
          className="w-full bg-gray-500 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-gray-600 disabled:bg-gray-400 transition-colors duration-300"
        >
          Reset to Baseline
        </button>
      </div>
    </div>
  );
};

export default InputControls;