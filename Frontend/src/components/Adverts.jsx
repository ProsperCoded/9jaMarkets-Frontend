import React from "react";

const Advert = () => {
  return (
    <div>
      {/* Content Section */}
      <div className="flex-grow bg-white shadow-md mt-8 mr-6 mb-8 ml-6 py-10 p-6 pb-20 rounded-2xl">
        <h1 className="mb-6 font-bold text-2xl text-Primary">Advert</h1>
        <div className="border-gray-200 mt-6 mb-6 border-t-2"></div>
        <p className="mb-6 text-gray-600 text-lg">
          Choose from the options below to place or manage your adverts.
        </p>
        {/* Advert Options */}
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
          {/* Place a New Advert */}
          <div className="border-Primary hover:bg-Primary hover:opacity-50 p-4 border rounded-lg hover:text-white">
            <h3 className="mb-2 font-semibold text-Primary text-xl">
              Place a New Advert
            </h3>
            <p className="mb-4 text-gray-500">
              Create a new advert to reach your desired audience.
            </p>
            <a
              href="/place-ad"
              className="inline-block bg-Primary hover:bg-hover-Primary px-4 py-2 rounded-lg font-medium text-white"
            >
              Start Now
            </a>
          </div>

          {/* Manage Existing Adverts */}
          <div className="border-gray-300 hover:bg-gray-50 p-4 border rounded-lg">
            <h3 className="mb-2 font-semibold text-gray-700 text-xl">
              Manage Existing Adverts
            </h3>
            <p className="mb-4 text-gray-500">
              View, edit, or delete your current adverts.
            </p>
            <a
              href="/"
              className="inline-block bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg font-medium text-gray-700"
            >
              Manage Ads
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advert;
