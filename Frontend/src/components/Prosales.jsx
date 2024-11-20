import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faGem, faUpload, faBullhorn, faChartLine } from '@fortawesome/free-solid-svg-icons';

const ProSales = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-md w-full">
      {/* Header */}
      <h1 className="text-2xl font-semibold mb-4">ProSales</h1>
      <p className="text-gray-600 mb-8">Grow your business with these pro tasks:</p>
      
      {/* Centralized content */}
      <div className="flex flex-col items-center">
        {/* ProSales Task List */}
        <ul className="space-y-6 mb-8">
          <li className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-green flex items-center justify-center">
              <FontAwesomeIcon icon={faCheck} className="text-white" />
            </div>
            <div className="flex flex-col">
              <h4 className="font-semibold">Sign Up with 9jaMarkets</h4>
              <p className="text-sm text-gray-500">This task has been completed</p>
            </div>
          </li>

          <li className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
              <FontAwesomeIcon icon={faGem} />
            </div>
            <div className="flex flex-col">
              <h4 className="font-semibold">Get Boost Packages</h4>
              <p className="text-sm text-gray-500">Personal, VIP, Gold</p>
            </div>
          </li>

          <li className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
              <FontAwesomeIcon icon={faUpload} />
            </div>
            <div className="flex flex-col">
              <h4 className="font-semibold">Post AD</h4>
              <p className="text-sm text-gray-500">Up to 20 Images</p>
            </div>
          </li>

          <li className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
              <FontAwesomeIcon icon={faBullhorn} />
            </div>
            <div className="flex flex-col">
              <h4 className="font-semibold">Budget and Bid Accordingly</h4>
              <p className="text-sm text-gray-500">AD Promotion</p>
            </div>
          </li>

          <li className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
              <FontAwesomeIcon icon={faChartLine} />
            </div>
            <div className="flex flex-col">
              <h4 className="font-semibold">Watch Your Business Grow</h4>
              <p className="text-sm text-gray-500">Increase sales and customer base</p>
            </div>
          </li>
        </ul>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button className="bg-green bg-opacity-50 hover:bg-green text-white font-semibold py-2 px-4 rounded">
            Try Pro Features
          </button>
          <button className="border border-green text-green hover:bg-green hover:text-white font-semibold py-2 px-4 rounded">
            Get Boost Packages
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProSales;
