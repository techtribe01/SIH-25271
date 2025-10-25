import React from 'react';

const sources = [
  {
    name: 'PIB (Press Information Bureau)',
    description: 'Tariff notifications & policy changes (2015-2025)',
    link: 'https://pib.gov.in',
    logo: 'PIB',
  },
  {
    name: "Solvent Extractors' Association (SEA)",
    description: 'Monthly import volume data',
    link: 'https://seaofindia.com',
    logo: 'SEA',
  },
  {
    name: 'World Bank',
    description: 'Global CPO price indices (Pink Sheets)',
    link: 'https://data.worldbank.org',
    logo: 'WB',
  },
  {
    name: 'Malaysian Palm Oil Board',
    description: 'Export prices & production statistics',
    link: 'https://www.mpob.gov.my',
    logo: 'MPOB',
  },
  {
    name: 'Ministry of Agriculture (NMEO-OP)',
    description: 'Domestic palm cultivation progress',
    link: 'https://agricoop.nic.in',
    logo: 'MoA',
  },
  {
    name: 'Academic References',
    description: 'JNU/VeK Policy Study (Oct 2024) on tariff stability',
    link: '#', // No direct link provided in prompt
    linkText: 'Referenced in Economic Times',
    logo: 'AR',
  },
];

const SourceCard: React.FC<typeof sources[0]> = ({ name, description, link, logo, linkText }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
    <div className="flex items-center mb-3">
      <div className="flex-shrink-0 w-10 h-10 bg-gray-200 text-gray-600 font-bold rounded-full flex items-center justify-center">
        {logo}
      </div>
      <h3 className="ml-4 font-bold text-gray-800 leading-tight">{name}</h3>
    </div>
    <p className="text-sm text-gray-600 flex-grow">{description}</p>
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="mt-4 text-sm font-semibold text-blue-600 hover:underline self-start"
    >
      {linkText || 'Visit Source'} &rarr;
    </a>
  </div>
);

const DataSources: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sources.map((source, index) => (
        <SourceCard key={index} {...source} />
      ))}
    </div>
  );
};

export default DataSources;