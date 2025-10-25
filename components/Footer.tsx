import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <p className="mb-4 md:mb-0">&copy; 2024 Developed for Problem Statement 25271</p>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-blue-600 hover:underline">About</a>
          <a href="#" className="hover:text-blue-600 hover:underline">Contact</a>
          <a href="#" className="hover:text-blue-600 hover:underline">Documentation</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
