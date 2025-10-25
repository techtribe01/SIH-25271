import React from 'react';
import useCountUp from '../../hooks/useCountUp';

interface KPICardProps {
  icon: string;
  title: string;
  value: number | null;
  unit: string;
  bgColor: string;
  precision?: number;
}

const KPICard: React.FC<KPICardProps> = ({ icon, title, value, unit, bgColor, precision = 0 }) => {
  const animatedValue = useCountUp(value, 1500); // 1.5 second animation

  const displayValue = value === null ? '---' : animatedValue.toFixed(precision);

  return (
    <div className={`p-6 rounded-lg ${bgColor} transition-colors duration-300`}>
      <div className="flex items-start">
        <div className="text-4xl mr-4">{icon}</div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{displayValue}</p>
          <p className="text-xs text-gray-500">{unit}</p>
        </div>
      </div>
    </div>
  );
};

export default KPICard;
