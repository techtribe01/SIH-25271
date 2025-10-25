import React from 'react';
import type { ScenarioData } from '../../types';
import { calculateImpact } from '../../utils/calculator';

// Make sure jsPDF and html2canvas are available globally via CDN
declare var jspdf: any;
declare var html2canvas: any;


interface TableProps {
  globalPrice: number;
  domesticDemand: number;
}

const ComparisonTable: React.FC<TableProps> = ({ globalPrice, domesticDemand }) => {
  const tariffs = [0, 10, 15, 20];
  const tableData: ScenarioData[] = tariffs.map(tariff => ({
    tariff,
    ...calculateImpact({ tariff, globalPrice, domesticDemand }),
  }));
  
  const getRecommendation = (tariff: number) => {
    if (tariff === 0) return { text: 'Too low', icon: '⚠️', color: 'text-yellow-600' };
    if (tariff === 10) return { text: 'Baseline', icon: '✅', color: 'text-green-600' };
    if (tariff === 15) return { text: 'Optimal', icon: '✅', color: 'text-green-600' };
    if (tariff === 20) return { text: 'Too high', icon: '⚠️', color: 'text-yellow-600' };
    return { text: '', icon: '', color: '' };
  };

  const handleExportPDF = () => {
    const page = document.getElementById('analysis-page');
    if (!page) return;
    
    html2canvas(page).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf.jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save("scenario-analysis-report.pdf");
    });
  };

  const handleDownloadCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Tariff Rate (%),Import Volume (Million MT),Consumer Price Change (₹/Liter),Govt Revenue (₹ Crores),Farmer Income Change (%),Recommendation\n";
    
    tableData.forEach(row => {
      const rec = getRecommendation(row.tariff);
      const csvRow = [
        row.tariff,
        row.importVolume?.toFixed(2),
        row.consumerPriceChange?.toFixed(2),
        row.govtRevenue?.toFixed(0),
        row.farmerIncome?.toFixed(2),
        rec.text
      ].join(",");
      csvContent += csvRow + "\r\n";
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "scenario_comparison_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Scenario Comparison Table</h3>
        <div className="flex space-x-2 mt-3 sm:mt-0">
          <button onClick={handleExportPDF} className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg">
            Export Report (PDF)
          </button>
          <button onClick={handleDownloadCSV} className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold py-2 px-4 rounded-lg">
            Download Data (CSV)
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tariff Rate</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Import Volume</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consumer Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Govt Revenue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer Income</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommendation</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableData.map((row, index) => {
              const rec = getRecommendation(row.tariff);
              return (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.tariff}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.importVolume?.toFixed(2)} MT</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.consumerPriceChange?.toFixed(2)} ₹/L</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.govtRevenue?.toLocaleString('en-IN', { maximumFractionDigits: 0 })} Cr</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.farmerIncome?.toFixed(2)}%</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${rec.color}`}>{rec.icon} {rec.text}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;
