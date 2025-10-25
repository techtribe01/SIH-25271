import React from 'react';
import useChart from '../../hooks/useChart';
import { calculateImpact } from '../../utils/calculator';

interface ChartProps {
  tariff: number;
  globalPrice: number;
  domesticDemand: number;
}

const ImportSensitivityChart: React.FC<ChartProps> = ({ tariff, globalPrice, domesticDemand }) => {
  const labels = [0, 5, 10, 15, 20, 25, 30];
  const data = labels.map(t => 
    calculateImpact({ tariff: t, globalPrice, domesticDemand }).importVolume ?? 0
  );

  const chartConfig = {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Import Volume (Million MT)',
        data,
        fill: true,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3,
        pointBackgroundColor: labels.map(l => l === tariff ? 'red' : 'rgb(59, 130, 246)'),
        pointRadius: labels.map(l => l === tariff ? 6 : 3),
        pointHoverRadius: 8,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Import Volume vs Tariff Rate',
        },
        legend: {
          display: false,
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Tariff Rate (%)'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Import Volume (MT)'
          }
        }
      }
    }
  };

  const canvasRef = useChart(chartConfig);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default ImportSensitivityChart;
