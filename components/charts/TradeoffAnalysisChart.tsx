import React from 'react';
import useChart from '../../hooks/useChart';
import { calculateImpact } from '../../utils/calculator';

interface ChartProps {
  globalPrice: number;
  domesticDemand: number;
}

const TradeoffAnalysisChart: React.FC<ChartProps> = ({ globalPrice, domesticDemand }) => {
  const tariffs = [0, 5, 10, 12, 15, 20, 25, 30];
  const dataPoints = tariffs.map(t => {
    const results = calculateImpact({ tariff: t, globalPrice, domesticDemand });
    return {
      x: results.consumerPriceChange,
      y: results.govtRevenue,
      tariff: t,
    };
  });

  const getPointColor = (tariff: number) => {
    if (tariff >= 12 && tariff <= 15) {
      return 'rgba(75, 192, 192, 0.8)'; // Optimal
    }
    return 'rgba(255, 99, 132, 0.8)'; // Suboptimal
  };

  const chartConfig = {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Tariff Scenario',
        data: dataPoints,
        backgroundColor: dataPoints.map(p => getPointColor(p.tariff)),
        pointRadius: 6,
        pointHoverRadius: 8,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Policy Trade-off Analysis',
        },
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function(context: any) {
              const point = context.raw;
              return `Tariff: ${point.tariff}%`;
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Consumer Price Change (₹/L)',
          },
          reverse: true // Better visualization: lower price change is better
        },
        y: {
          title: {
            display: true,
            text: 'Government Revenue (₹ Crores)',
          },
          beginAtZero: true
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

export default TradeoffAnalysisChart;
