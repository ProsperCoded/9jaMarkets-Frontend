import React from "react";

const Advert = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8">
          <h1 className="text-xl sm:text-2xl font-bold text-Primary">Advert</h1>
          <div className="border-t-2 border-gray-200 my-6"></div>
          <p className="text-base sm:text-lg text-gray-600 mb-8">
            Choose from the options below to place or manage your adverts.
          </p>
          
          {/* Advert Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Place a New Advert */}
            <div className="group relative overflow-hidden border-2 border-Primary rounded-lg p-6 transition-all duration-300 hover:shadow-lg">
              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl font-semibold text-Primary mb-3 group-hover:text-white transition-colors">
                  Place a New Advert
                </h3>
                <p className="text-gray-500 mb-6 group-hover:text-white/90 transition-colors">
                  Create a new advert to reach your desired audience.
                </p>
                <a
                  href="/place-ad"
                  className="inline-block bg-Primary hover:bg-white text-white hover:text-Primary border border-white px-6 py-2.5 rounded-lg font-medium transition-all active:scale-95"
                >
                  Start Now
                </a>
              </div>
              <div className="absolute inset-0 bg-Primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></div>
            </div>

            {/* Manage Existing Adverts */}
            <div className="group border-2 border-gray-200 rounded-lg p-6 transition-all duration-300 hover:border-gray-300 hover:shadow-lg">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3">
                Manage Existing Adverts
              </h3>
              <p className="text-gray-500 mb-6">
                View, edit, or delete your current adverts.
              </p>
              <a
                href="/"
                className="inline-block bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg font-medium transition-all hover:bg-gray-200 active:scale-95"
              >
                Manage Ads
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advert;
