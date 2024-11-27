import React, { useState } from 'react';
import CA from '../assets/how-it-works/create-account.svg'; // Replace with actual path
import BrowseImage from '../assets/how-it-works/Browse.svg'; // Add your browse products image
import ConnectImage from '../assets/how-it-works/connect-with-vendors.svg'; // Add connect image
import BrowseImage from '../assets/how-it-works/Browse.svg'; // Add your browse products image

const HowItWorks = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Smooth scrolling function
  const handleScroll = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    setSidebarOpen(false); // Close the sidebar after clicking on mobile
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
        <header className="bg-white text-green flex items-center justify-between py-4 px-6">
        <button
            className="text-green text-3xl lg:hidden relative mr-auto"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h1 className="text-2xl font-bold mx-auto absolute left-0 right-0 text-center">
            How it works
          </h1>
        </header>


      {/* Layout */}
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'block' : 'hidden'
          } lg:block lg:w-[300px] bg-white text-green py-6 px-4 shadow-md`}
        >
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => handleScroll('create-account')}
                className="block text-left text-green font-semibold hover:text-green hover:opacity-50 p-2 rounded"
              >
                Create an Account
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScroll('browse-products')}
                className="block text-left text-green font-semibold hover:text-green hover:opacity-50 p-2 rounded"
              >
                Browse & Search for Products
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScroll('connect-vendors')}
                className="block text-left text-green font-semibold hover:text-green hover:opacity-50 p-2 rounded"
              >
                Connect with Vendors
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScroll('place-ads')}
                className="block text-left text-green font-semibold hover:text-green hover:opacity-50 p-2 rounded"
              >
                Place Ads
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScroll('payments')}
                className="block text-left text-green font-semibold hover:text-green hover:opacity-50 p-2 rounded"
              >
                Payments
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScroll('safety-security')}
                className="block text-left text-green font-semibold hover:text-green hover:opacity-50 p-2 rounded"
              >
                Safety and Security
              </button>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-6 lg:p-10 bg-gray-50">
          {/* Create an Account Section */}
          <section id="create-account" className="mb-10">
            <img
              src={CA}
              alt="Create an Account"
              className="w-full max-w-md mx-auto mb-6"
            />
            <h2 className="text-xl font-bold text-green mb-4">Create an Account</h2>
            <p className="text-gray-600">
              <strong>For Buyers:</strong> Click on the Sign-Up button at the top right corner to create an account. Fill in your details, verify your email or phone number, and complete your profile for a personalized shopping experience.
            </p>
            <p className="text-gray-600 mt-4">
              <strong>For Vendors:</strong> Select the "Place an Ad" button and follow the instructions to create your account. Upload your business details, verify your identity, and you're ready to list products on 9ja Markets.
            </p>
          </section>

          {/* Browse Products Section */}
          <section id="browse-products" className="mb-10">
            <img
              src={BrowseImage}
              alt="Browse & Search for Products"
              className="w-full max-w-md mx-auto mb-6"
            />
            <h2 className="text-xl font-bold text-green mb-4">Browse & Search for Products</h2>
            <p className="text-gray-600">
              Use the search bar to find products by name, location, or category. Filter results for a more efficient shopping experience.
            </p>
          </section>

          {/* Connect with Vendors Section */}
          <section id="connect-vendors" className="mb-10">
            <img
              src={ConnectImage}
              alt="Connect with Vendors"
              className="w-full max-w-md mx-auto mb-6"
            />
            <h2 className="text-xl font-bold text-green mb-4">Connect with Vendors</h2>
            <p className="text-gray-600">
              Chat directly with verified vendors to learn more about their products and services. Build trust through direct communication.
            </p>
          </section>

          {/* Additional Sections */}
          <section id="place-ads" className="mb-10">
            <h2 className="text-xl font-bold text-green mb-4">Place Ads</h2>
            <p className="text-gray-600">
              Vendors can easily place ads for their products or services. Upload your details, select a category, and reach customers across Nigeria.
            </p>
          </section>
          <section id="payments" className="mb-10">
            <h2 className="text-xl font-bold text-green mb-4">Payments</h2>
            <p className="text-gray-600">
              Enjoy secure and seamless transactions with multiple payment options.
            </p>
          </section>
          <section id="safety-security" className="mb-10">
            <h2 className="text-xl font-bold text-green mb-4">Safety and Security</h2>
            <p className="text-gray-600">
              Your safety is our priority. Verified vendors and encrypted transactions ensure a secure shopping experience.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default HowItWorks;
