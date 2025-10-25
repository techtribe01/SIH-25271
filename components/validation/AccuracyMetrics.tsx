import React from 'react';

const AccuracyMetrics: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col justify-center text-center">
      <div>
        <p className="text-sm font-medium text-gray-500">Average Accuracy</p>
        <p className="text-6xl font-extrabold text-blue-600">85%</p>
        <p className="text-sm text-gray-600 font-semibold">±3% error margin</p>
      </div>
      <div className="mt-6">
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full"
            style={{ width: '85%' }}
            aria-valuenow={85}
            aria-valuemin={0}
            aria-valuemax={100}
            role="progressbar"
            aria-label="Model accuracy"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AccuracyMetrics;
