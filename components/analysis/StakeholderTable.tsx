import React from 'react';
import { calculateImpact } from '../../utils/calculator';

interface StakeholderTableProps {
  globalPrice: number;
  domesticDemand: number;
}

interface StakeholderImpact {
  icon: '🟢' | '🟡' | '🔴';
  symbol: '✅' | '⚠️' | '❌';
  text: string;
  color: string;
  tooltip: string;
}

interface OverallBalance {
  text: string;
  icon: '✅' | '🟡' | '🔴';
  color: string;
}

const StakeholderTable: React.FC<StakeholderTableProps> = ({ globalPrice, domesticDemand }) => {
  const tariffs = [0, 5, 10, 15, 20, 25];

  const getStakeholderAnalysis = (tariff: number) => {
    const baselineResults = calculateImpact({ tariff: 10, globalPrice, domesticDemand });
    const currentResults = calculateImpact({ tariff, globalPrice, domesticDemand });

    // 1. Consumers
    const priceChangeVsBaseline = (currentResults.consumerPriceChange ?? 0) - (baselineResults.consumerPriceChange ?? 0);
    let consumer: StakeholderImpact;
    if (priceChangeVsBaseline < -0.5) {
      consumer = { icon: '🟢', symbol: '✅', text: `Prices ↓${Math.abs(priceChangeVsBaseline).toFixed(1)}/L`, color: 'bg-green-100', tooltip: 'Lower tariffs reduce landed cost of imports, significantly lowering retail prices for consumers.' };
    } else if (priceChangeVsBaseline > 0.5) {
      consumer = { icon: '🔴', symbol: '❌', text: `Prices ↑${priceChangeVsBaseline.toFixed(1)}/L`, color: 'bg-red-100', tooltip: 'Higher tariffs increase import costs, which are passed on to consumers, raising retail prices.' };
    } else {
      consumer = { icon: '🟡', symbol: '⚠️', text: 'Neutral', color: 'bg-yellow-100', tooltip: 'Tariff is near the baseline level, resulting in stable and predictable consumer prices.' };
    }

    // 2. Farmers
    const incomeChangeVsBaseline = (currentResults.farmerIncome ?? 0) - (baselineResults.farmerIncome ?? 0);
    let farmer: StakeholderImpact;
    if (incomeChangeVsBaseline > 2.0) {
      farmer = { icon: '🟢', symbol: '✅', text: `Income +${incomeChangeVsBaseline.toFixed(0)}%`, color: 'bg-green-100', tooltip: 'Higher tariffs reduce import competition, boosting domestic prices and farmer incomes.' };
    } else if (incomeChangeVsBaseline < -2.0) {
      farmer = { icon: '🔴', symbol: '❌', text: `Income ${incomeChangeVsBaseline.toFixed(0)}%`, color: 'bg-red-100', tooltip: 'Lower tariffs increase import competition, depressing domestic prices and hurting farmer incomes.' };
    } else {
      farmer = { icon: '🟡', symbol: '⚠️', text: 'Neutral', color: 'bg-yellow-100', tooltip: 'Baseline tariff provides a moderate level of protection for farmers.' };
    }

    // 3. Government
    const revenueChangeVsBaseline = ((currentResults.govtRevenue ?? 0) - (baselineResults.govtRevenue ?? 0)) / 1000;
    let government: StakeholderImpact;
    if (revenueChangeVsBaseline > 5) {
      government = { icon: '🟢', symbol: '✅', text: `Revenue +₹${revenueChangeVsBaseline.toFixed(0)}K Cr`, color: 'bg-green-100', tooltip: 'Higher tariff rates on significant import volumes lead to a substantial increase in customs revenue.' };
    } else if (revenueChangeVsBaseline < -5) {
      government = { icon: '🔴', symbol: '❌', text: `Revenue ${revenueChangeVsBaseline.toFixed(0)}K Cr`, color: 'bg-red-100', tooltip: 'Lower tariffs result in a significant loss of revenue.' };
    } else {
      government = { icon: '🟡', symbol: '⚠️', text: 'Neutral', color: 'bg-yellow-100', tooltip: 'The baseline tariff provides a stable and expected stream of revenue for the government.' };
    }

    // 4. Refiners/Traders
    let refiners: StakeholderImpact;
    if (tariff < 8) {
      refiners = { icon: '🟢', symbol: '✅', text: 'High margins', color: 'bg-green-100', tooltip: 'Low tariffs on raw CPO reduce input costs for refiners, leading to higher profit margins.' };
    } else if (tariff > 18) {
      refiners = { icon: '🔴', symbol: '❌', text: 'Low margins', color: 'bg-red-100', tooltip: 'High tariffs increase the cost of raw materials, squeezing profit margins for refiners and traders.' };
    } else {
      refiners = { icon: '🟡', symbol: '⚠️', text: 'Good margins', color: 'bg-yellow-100', tooltip: 'Moderate tariffs allow for predictable and healthy profit margins for the refining industry.' };
    }
    
    if (tariff === 10) {
      consumer = { ...consumer, text: 'Baseline', tooltip: 'This is the baseline scenario for comparison.' };
      farmer = { ...farmer, text: 'Baseline', tooltip: 'This is the baseline scenario for comparison.' };
      government = { ...government, text: 'Baseline', tooltip: 'This is the baseline scenario for comparison.' };
      refiners = { ...refiners, text: 'Baseline', tooltip: 'This is the baseline scenario for comparison.' };
    }

    // 5. Overall Balance
    const scores = [consumer, farmer, government, refiners].map(s => s.icon);
    const negativeCount = scores.filter(i => i === '🔴').length;
    let overall: OverallBalance;
    if (negativeCount >= 3) {
      overall = { text: 'Unbalanced', icon: '🔴', color: 'text-red-600 font-bold' };
    } else if (negativeCount <= 1) {
      overall = { text: 'Balanced', icon: '✅', color: 'text-green-600 font-bold' };
    } else {
      overall = { text: 'Moderate', icon: '🟡', color: 'text-yellow-600 font-bold' };
    }
    if (tariff === 10) overall = { text: 'Balanced', icon: '✅', color: 'text-green-600 font-bold' };

    return { tariff, consumer, farmer, government, refiners, overall };
  };

  const tableData = tariffs.map(getStakeholderAnalysis);

  const handleDownloadCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Tariff Rate (%),Consumers,Farmers,Government,Refiners/Traders,Overall Balance\n";
    
    tableData.forEach(row => {
      const csvRow = [
        row.tariff,
        `"${row.consumer.text}"`,
        `"${row.farmer.text}"`,
        `"${row.government.text}"`,
        `"${row.refiners.text}"`,
        `"${row.overall.text}"`,
      ].join(",");
      csvContent += csvRow + "\r\n";
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "stakeholder_impact_analysis.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Who Wins? Who Loses? Stakeholder Impact Analysis</h3>
          <p className="text-sm text-gray-500">A qualitative look at the trade-offs of different tariff policies.</p>
        </div>
        <button onClick={handleDownloadCSV} className="mt-3 sm:mt-0 text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold py-2 px-4 rounded-lg whitespace-nowrap">
            Export Table (CSV)
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border">
          <thead className="bg-gray-100">
            <tr>
              {['Tariff Rate', 'Consumers', 'Domestic Farmers', 'Government', 'Refiners/Traders', 'Overall Balance'].map(header => (
                <th key={header} className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableData.map((row) => (
              <tr key={row.tariff} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{row.tariff}%</td>
                {[row.consumer, row.farmer, row.government, row.refiners].map((stakeholder, i) => (
                  <td key={i} className={`px-4 py-4 whitespace-nowrap text-sm ${stakeholder.color}`} title={stakeholder.tooltip}>
                    <div className="flex items-center">
                      <span className="mr-2 text-lg">{stakeholder.icon} {stakeholder.symbol}</span>
                      <span>{stakeholder.text}</span>
                    </div>
                  </td>
                ))}
                <td className={`px-4 py-4 whitespace-nowrap text-sm ${row.overall.color}`}>
                   <div className="flex items-center">
                      <span className="mr-2 text-lg">{row.overall.icon}</span>
                      <span>{row.overall.text}</span>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg text-sm">
        <p>
          <span className="font-bold text-lg">💡 Policy Insight:</span> No single tariff rate satisfies all stakeholders. This analysis reveals that rates between <strong>12-15%</strong> tend to create the most acceptable trade-offs, making it an optimal range for a balanced policy that avoids extreme negative impacts on any single group.
        </p>
      </div>
    </div>
  );
};

export default StakeholderTable;
