import React from "react";
import { useNavigate } from "react-router-dom";

const Adverts = () => {
  const navigate = useNavigate();

  const goToPlaceAd = () => {
    navigate("/place-ad");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-8">
        <h1 className="text-2xl font-semibold mb-4">Welcome to 9jaMarkets</h1>
        <p className="text-gray-600 mb-6">
          Whether you want to buy, sell, or promote your business, we’ve got you covered. Follow these steps to place an advert and grow your reach!
        </p>

        {/* Steps */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
              1
            </div>
            <p className="text-gray-700">Choose the category for your advert.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
              2
            </div>
            <p className="text-gray-700">Provide the necessary details and upload photos.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
              3
            </div>
            <p className="text-gray-700">Submit your advert and watch your business grow!</p>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={goToPlaceAd}
          className="w-full bg-green-600 text-white font-semibold py-3 rounded-md hover:bg-green-700 transition"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Adverts;
