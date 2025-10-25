import React from 'react';
import type { Page } from '../types';
import ValidationTable from '../components/validation/ValidationTable';
import AccuracyMetrics from '../components/validation/AccuracyMetrics';
import MethodologyCard from '../components/validation/MethodologyCard';
import DataSources from '../components/validation/DataSources';

interface ValidationPageProps {
  setPage: (page: Page) => void;
}

const ValidationPage: React.FC<ValidationPageProps> = ({ setPage }) => {
  return (
    <div className="container mx-auto px-6 py-8 space-y-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Validation & Data Sources</h1>
        <p className="text-md text-gray-500 mt-1">Establishing the credibility and transparency of the model</p>
      </div>
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Model Validation Against Real-World Data
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ValidationTable />
          </div>
          <div>
            <AccuracyMetrics />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Technical Approach
        </h2>
        <MethodologyCard />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Sources & Credibility</h2>
        <DataSources />
      </section>

      <footer className="text-center text-sm text-gray-500 border-t pt-6">
        <p>All data sources are publicly available and verifiable.</p>
        <p className="font-semibold">Last updated: October 2025</p>
      </footer>
    </div>
  );
};

export default ValidationPage;