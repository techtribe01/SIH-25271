import React from 'react';

const validationData = [
  {
    event: 'Import Duty Cut',
    date: 'May 2025',
    change: '20% → 10%',
    prediction: '+18% imports',
    actual: '+15.7% imports',
    error: '2.3%',
    status: '✅ Accurate',
  },
  {
    event: 'Duty Hike',
    date: 'Sept 2024',
    change: '10% → 20%',
    prediction: '-16% imports',
    actual: '-14.2% imports',
    error: '1.8%',
    status: '✅ Accurate',
  },
  {
    event: 'Baseline Period',
    date: 'Jan 2024',
    change: '10% (stable)',
    prediction: '9.3 Million MT',
    actual: '9.4 Million MT',
    error: '1.1%',
    status: '✅ Accurate',
  },
];

const ValidationTable: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Historical Event</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy Change</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model Prediction</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actual Outcome</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Error Margin</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {validationData.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.event}</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{row.date}</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{row.change}</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{row.prediction}</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{row.actual}</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{row.error}</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-green-600">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ValidationTable;
