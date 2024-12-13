/**
 * MarketPage
 *
 * This component renders a page that displays a list of markets by state
 * and a search bar to filter markets by name. The component also contains
 * a sidebar that displays a list of all states, and an area to display the
 * markets. The component uses the MARKETS and STATES constants from the
 * ../config.js file to get the list of markets and states.
 *
 * @returns {React.ReactElement} The MarketPage component
 */

import { useState } from "react";
import searchIcon from "../assets/search.svg"; // Assuming this is your search icon
import { Link } from "react-router-dom";
import { MARKETS } from "../config";
import { STATES } from "../config";

const MarketPage = () => {
  const [selectedState, setSelectedState] = useState("Abia");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMarkets = MARKETS[selectedState]?.filter((market) =>
    market.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-white drop-shadow-sm py-2 text-Primary">
        <div className="flex justify-between items-center mx-auto px-4 container">
          {/* Left Section with Markets and Malls */}
          <div className="flex items-center space-x-4">
            <Link to="/markets" className="font-bold text-lg">
              Markets
            </Link>
            <Link to="/malls" className="font-thin text-lg">
              Malls
            </Link>
          </div>

          {/* Center Section - Search Bar */}
          <div className="flex flex-grow justify-center">
            <div className="flex items-center border-Primary bg-white focus:ring-opacity-50 px-4 py-2 border rounded-full focus:ring-Primary w-full max-w-md text-gray-600">
              <input
                type="text"
                placeholder={`Search ${selectedState} markets...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-2 w-full text-sm outline-none"
              />
              <img src={searchIcon} alt="Search" className="w-5 h-5" />
            </div>
          </div>

          {/* Empty Right Side (Optional for now) */}
          <div className="flex items-center space-x-4"></div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar: List of States */}
        <aside className="bg-white shadow-lg p-4 w-[300px] h-full">
          <ul className="space-y-2">
            {STATES.map((state) => (
              <li
                key={state}
                onClick={() => setSelectedState(state)}
                className={`cursor-pointer p-2 ${
                  selectedState === state
                    ? "bg-Primary text-white"
                    : "text-gray-800"
                } hover:bg-P2 hover:opacity-75 hover:text-white rounded-lg focus:font-semibold`}
              >
                {state}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content: Markets */}
        <div className="bg-gray-100 p-6 w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-2xl">
              {selectedState} State Markets
            </h2>
          </div>

          {/* Market Cards Grid */}
          <div className="gap-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredMarkets.length > 0 ? (
              filteredMarkets.map((market, index) => (
                <Link to= '/marketplace'
                  key={index}
                  className="bg-white shadow-md hover:shadow-lg rounded-lg transform transition duration-300 overflow-hidden hover:scale-105"
                >
                  <img
                    src={market.img}
                    alt={market.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{market.name}</h3>
                    <a
                      className="block mt-2 text-Primary text-sm hover:underline"
                    >
                      View more
                    </a>
                  </div>
                </Link>
              ))
            ) : (
              <p>No markets found for "{searchTerm}"</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPage;
