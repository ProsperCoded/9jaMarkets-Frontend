import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faHandshake, faBullhorn, faWallet, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="bg-green-700 text-white w-64 p-6">
        <h2 className="text-2xl font-bold mb-4">How it works</h2>
        <ul className="space-y-4">
          <li className="hover:bg-green-600 p-2 rounded cursor-pointer">
            <FontAwesomeIcon icon={faUser} className="mr-2" /> Create an Account
          </li>
          <li className="hover:bg-green-600 p-2 rounded cursor-pointer">
            <FontAwesomeIcon icon={faSearch} className="mr-2" /> Browse & Search for Products
          </li>
          <li className="hover:bg-green-600 p-2 rounded cursor-pointer">
            <FontAwesomeIcon icon={faHandshake} className="mr-2" /> Connect with Vendors
          </li>
          <li className="hover:bg-green-600 p-2 rounded cursor-pointer">
            <FontAwesomeIcon icon={faBullhorn} className="mr-2" /> Place Ads
          </li>
          <li className="hover:bg-green-600 p-2 rounded cursor-pointer">
            <FontAwesomeIcon icon={faWallet} className="mr-2" /> Payments
          </li>
          <li className="hover:bg-green-600 p-2 rounded cursor-pointer">
            <FontAwesomeIcon icon={faShieldAlt} className="mr-2" /> Safety and Security
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-green-700 mb-6">How it works</h1>
        
        <div className="bg-white shadow-md rounded-md p-6">
          <div className="flex items-center justify-center mb-6">
            <img
              src="https://via.placeholder.com/150"
              alt="Illustration"
              className="h-48"
            />
          </div>

          <div className="text-lg mb-4">
            <strong>For Buyers:</strong>
            <p>
              Click on the Sign Up button at the top right corner to create an account.
              Fill in your details, verify your email or phone number, and complete your
              profile for a personalized shopping experience.
            </p>
          </div>

          <hr className="my-4" />

          <div className="text-lg">
            <strong>For Vendors:</strong>
            <p>
              If you’re a vendor, select the Place an Ad button and follow the
              instructions to create your account. Upload your business details,
              verify your identity, and you're ready to list products on 9ja Markets.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HowItWorks;
