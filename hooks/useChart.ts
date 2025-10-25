import { useEffect, useRef } from 'react';

// Make sure Chart.js is available globally via CDN
declare var Chart: any;

const useChart = (config: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Destroy previous chart instance if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create new chart instance
    chartRef.current = new Chart(ctx, config);

    // Cleanup function to destroy chart on component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [config]); // Re-run effect if config changes

  return canvasRef;
};

export default useChart;
