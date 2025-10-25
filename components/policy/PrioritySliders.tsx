import React from 'react';

interface Priorities {
  consumer: number;
  farmer: number;
  revenue: number;
  nmeo: number;
}

interface PrioritySlidersProps {
  priorities: Priorities;
  setPriorities: React.Dispatch<React.SetStateAction<Priorities>>;
  onGenerate: () => void;
  isLoading: boolean;
}

interface SliderProps {
  id: keyof Priorities;
  label: string;
  description: string;
  value: number;
  onChange: (id: keyof Priorities, value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ id, label, description, value, onChange }) => (
  <div>
    <label htmlFor={id} className="block text-md font-semibold text-gray-800">{label}</label>
    <p className="text-sm text-gray-500 mb-2">{description}</p>
    <div className="flex items-center space-x-4">
      <input
        id={id}
        type="range"
        min="0"
        max="100"
        step="10"
        value={value}
        onChange={(e) => onChange(id, Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
      <span className="text-xl font-bold text-gray-900 min-w-[50px] text-center">{value}%</span>
    </div>
  </div>
);


const PrioritySliders: React.FC<PrioritySlidersProps> = ({ priorities, setPriorities, onGenerate, isLoading }) => {

  const handleSliderChange = (id: keyof Priorities, value: number) => {
    setPriorities(prev => ({...prev, [id]: value}));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">AI Policy Recommendation Engine</h2>
        <p className="text-md text-gray-500 mt-1">Tell us your priorities—AI suggests an optimal tariff</p>
      </div>
      
      <div className="space-y-6">
        <Slider id="consumer" label="🛒 Consumer Affordability" description="Keep retail prices low for consumers" value={priorities.consumer} onChange={handleSliderChange} />
        <Slider id="farmer" label="🌾 Farmer Protection" description="Protect domestic palm oil farmers' income" value={priorities.farmer} onChange={handleSliderChange} />
        <Slider id="revenue" label="🏛️ Government Revenue" description="Maximize customs duty revenue" value={priorities.revenue} onChange={handleSliderChange} />
        <Slider id="nmeo" label="🌱 NMEO-OP Support" description="Support the National Mission on Edible Oils" value={priorities.nmeo} onChange={handleSliderChange} />
      </div>

      <div className="pt-6 border-t">
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white font-bold text-lg py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300"
        >
          {isLoading ? 'Generating...' : 'Generate AI Recommendation'}
        </button>
      </div>
    </div>
  );
};

export default PrioritySliders;
