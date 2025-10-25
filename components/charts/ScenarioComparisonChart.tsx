import React from 'react';
import useChart from '../../hooks/useChart';
import { calculateImpact } from '../../utils/calculator';

interface ChartProps {
  globalPrice: number;
  domesticDemand: number;
}

const ScenarioComparisonChart: React.FC<ChartProps> = ({ globalPrice, domesticDemand }) => {
  const scenarios = [
    { tariff: 0, label: 'Low (0%)' },
    { tariff: 10, label: 'Medium (10%)' },
    { tariff: 20, label: 'High (20%)' },
  ];
  const data = scenarios.map(s => 
    calculateImpact({ tariff: s.tariff, globalPrice, domesticDemand }).importVolume ?? 0
  );

  const chartConfig = {
    type: 'bar',
    data: {
      labels: scenarios.map(s => s.label),
      datasets: [{
        label: 'Import Volume (Million MT)',
        data,
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(255, 99, 132)',
        ],
        borderWidth: 1,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Three-Scenario Impact Comparison',
        },
        legend: {
          display: false,
        }
      },
      scales: {
        y: {
          beginAtZero: true,
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

export default ScenarioComparisonChart;
