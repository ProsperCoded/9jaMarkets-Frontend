import React, { useState } from "react";
import CA from "../assets/how-it-works/create-account.svg"; // Replace with actual path
import BrowseImage from "../assets/how-it-works/Browse.svg"; // Add your browse products image
import ConnectImage from "../assets/how-it-works/connect-with-vendors.svg"; // Add connect image

const HowItWorks = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Smooth scrolling function
  const handleScroll = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
    setSidebarOpen(false); // Close the sidebar after clicking on mobile
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Header */}
      <header className="flex justify-between items-center bg-white px-6 py-4 text-green">
        <button
          className="relative lg:hidden mr-auto text-3xl text-green"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
        <h1 className="right-0 left-0 absolute mx-auto font-bold text-2xl text-center">
          How it works
        </h1>
      </header>

      {/* Layout */}
      <div className="flex lg:flex-row flex-col">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "block" : "hidden"
          } lg:block lg:w-[300px] bg-white text-green py-6 px-4 shadow-md`}
        >
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => handleScroll("create-account")}
                className="block hover:opacity-50 p-2 rounded font-semibold text-green text-left hover:text-green"
              >
                Create an Account
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScroll("browse-products")}
                className="block hover:opacity-50 p-2 rounded font-semibold text-green text-left hover:text-green"
              >
                Browse & Search for Products
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScroll("connect-vendors")}
                className="block hover:opacity-50 p-2 rounded font-semibold text-green text-left hover:text-green"
              >
                Connect with Vendors
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScroll("place-ads")}
                className="block hover:opacity-50 p-2 rounded font-semibold text-green text-left hover:text-green"
              >
                Place Ads
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScroll("payments")}
                className="block hover:opacity-50 p-2 rounded font-semibold text-green text-left hover:text-green"
              >
                Payments
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScroll("safety-security")}
                className="block hover:opacity-50 p-2 rounded font-semibold text-green text-left hover:text-green"
              >
                Safety and Security
              </button>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-grow bg-gray-50 p-6 lg:p-10">
          {/* Create an Account Section */}
          <section id="create-account" className="mb-10">
            <img
              src={CA}
              alt="Create an Account"
              className="mx-auto mb-6 w-full max-w-md"
            />
            <h2 className="mb-4 font-bold text-green text-xl">
              Create an Account
            </h2>
            <p className="text-gray-600">
              <strong>For Buyers:</strong> Click on the Sign-Up button at the
              top right corner to create an account. Fill in your details,
              verify your email or phone number, and complete your profile for a
              personalized shopping experience.
            </p>
            <p className="mt-4 text-gray-600">
              <strong>For Vendors:</strong> Select the "Place an Ad" button and
              follow the instructions to create your account. Upload your
              business details, verify your identity, and you're ready to list
              products on 9ja Markets.
            </p>
          </section>

          {/* Browse Products Section */}
          <section id="browse-products" className="mb-10">
            <img
              src={BrowseImage}
              alt="Browse & Search for Products"
              className="mx-auto mb-6 w-full max-w-md"
            />
            <h2 className="mb-4 font-bold text-green text-xl">
              Browse & Search for Products
            </h2>
            <p className="text-gray-600">
              Use the search bar to find products by name, location, or
              category. Filter results for a more efficient shopping experience.
            </p>
          </section>

          {/* Connect with Vendors Section */}
          <section id="connect-vendors" className="mb-10">
            <img
              src={ConnectImage}
              alt="Connect with Vendors"
              className="mx-auto mb-6 w-full max-w-md"
            />
            <h2 className="mb-4 font-bold text-green text-xl">
              Connect with Vendors
            </h2>
            <p className="text-gray-600">
              Chat directly with verified vendors to learn more about their
              products and services. Build trust through direct communication.
            </p>
          </section>

          {/* Additional Sections */}
          <section id="place-ads" className="mb-10">
            <h2 className="mb-4 font-bold text-green text-xl">Place Ads</h2>
            <p className="text-gray-600">
              Vendors can easily place ads for their products or services.
              Upload your details, select a category, and reach customers across
              Nigeria.
            </p>
          </section>
          <section id="payments" className="mb-10">
            <h2 className="mb-4 font-bold text-green text-xl">Payments</h2>
            <p className="text-gray-600">
              Enjoy secure and seamless transactions with multiple payment
              options.
            </p>
          </section>
          <section id="safety-security" className="mb-10">
            <h2 className="mb-4 font-bold text-green text-xl">
              Safety and Security
            </h2>
            <p className="text-gray-600">
              Your safety is our priority. Verified vendors and encrypted
              transactions ensure a secure shopping experience.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default HowItWorks;
