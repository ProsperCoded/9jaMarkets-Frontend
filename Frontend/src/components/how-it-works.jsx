import React from 'react';
import CA from '../assets/how-it-works/create-account.svg'; // Replace with actual path
import BrowseImage from '../assets/how-it-works/Browse.svg'; // Add your browse products image
import ConnectImage from '../assets/how-it-works/connect-with-vendors.svg'; // Add connect image

const HowItWorks = () => {
  // Function to handle smooth scrolling
  const handleScroll = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <header className="bg-white text-green items-center py-4 px-6 shadow-md">
        <h1 className="text-xl font-bold">How It Works</h1>
      </header>

      {/* Sidebar and Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-[300px] bg-white shadow-md h-full p-6">
          <ul className="space-y-6">
            <li>
              <button
                onClick={() => handleScroll('create-account')}
                className="text-gray-800 hover:text-green font-medium border-l-4 border-transparent hover:border-green hover:border-opacity-50 pl-4"
              >
                Create an Account
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScroll('browse-products')}
                className="text-gray-800 hover:text-green font-medium border-l-4 border-transparent hover:border-green hover:border-opacity-50 pl-4"
              >
                Browse & Search for Products
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScroll('connect-vendors')}
                className="text-gray-800 hover:text-green font-medium border-l-4 border-transparent hover:border-green hover:border-opacity-50 pl-4"
              >
                Connect with Vendors
              </button>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-10">
          {/* Create Account Section */}
          <section id="create-account" className="mb-10">
            <div className="mb-6">
              <img
                src={CA}
                alt="Create an Account"
                className="w-full max-w-4xl mx-auto shadow-lg rounded-lg"
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Create an Account</h2>
            <p className="text-gray-600">
              Buyers: Click on the Sign-Up button, fill in your details, verify, and complete your profile.
            </p>
            <p className="text-gray-600">
              Vendors: Select "Place an Ad," follow the steps to set up your account, and list your products.
            </p>
          </section>

          {/* Browse & Search for Products Section */}
          <section id="browse-products" className="mb-10">
            <div className="mb-6">
              <img
                src={BrowseImage}
                alt="Browse & Search for Products"
                className="w-full max-w-4xl mx-auto shadow-lg rounded-lg"
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Browse & Search for Products</h2>
            <p className="text-gray-600">
              Use the search bar to find products by name, location, or category. Filter results for a better experience.
            </p>
          </section>

          {/* Connect with Vendors Section */}
          <section id="connect-vendors" className="mb-10">
            <div className="mb-6">
              <img
                src={ConnectImage}
                alt="Connect with Vendors"
                className="w-full max-w-4xl mx-auto shadow-lg rounded-lg"
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Connect with Vendors</h2>
            <p className="text-gray-600">
              Chat directly with verified vendors and explore the best products across Nigeria.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default HowItWorks;
