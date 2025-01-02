import { useState } from "react";
import searchIcon from "../assets/search.svg"; // Assuming this is your search icon
import { Link } from "react-router-dom";
import { MALLS } from "../config";
const states = [
  "Abuja",
  "Abia",
  "Adamawa",
  "Akwa-Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross-River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

const mallPage = () => {
  const [selectedState, setSelectedState] = useState("Abuja");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredmalls = MALLS[selectedState]?.filter((mall) =>
    mall.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-white drop-shadow-sm py-2 text-Primary">
        <div className="flex justify-between items-center mx-auto px-4 container">
          {/* Left Section with malls and Malls */}
          <div className="flex items-center space-x-4">
            <Link to="/markets" className="font-thin text-lg">
              Markets
            </Link>
            <Link to="/malls" className="font-bold text-lg">
              Malls
            </Link>
          </div>

          {/* Center Section - Search Bar */}
          <div className="flex flex-grow justify-center">
            <div className="flex items-center border-green bg-white focus:ring-opacity-50 px-4 py-2 border rounded-full focus:ring-green w-full max-w-md text-gray-600">
              <input
                type="text"
                placeholder={`Search ${selectedState} malls...`}
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
            {states.map((state) => (
              <li
                key={state}
                onClick={() => setSelectedState(state)}
                className={`cursor-pointer p-2 ${
                  selectedState === state
                    ? "bg-green text-white"
                    : "text-gray-800"
                } hover:bg-green hover:opacity-75 hover:text-white rounded-lg focus:font-semibold`}
              >
                {state}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content: malls */}
        <div className="bg-gray-100 p-6 w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-2xl">{selectedState} State malls</h2>
          </div>

          {/* mall Cards Grid */}
          <div className="gap-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredmalls.length > 0 ? (
              filteredmalls.map((mall, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md hover:shadow-lg rounded-lg transform transition duration-300 overflow-hidden hover:scale-105"
                >
                  <img
                    src={mall.img}
                    alt={mall.name}
                    lazy="true"
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{mall.name}</h3>
                    <a
                      href="#"
                      className="block mt-2 text-Primary text-sm hover:underline"
                    >
                      View more
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p>No malls found for "{searchTerm}"</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default mallPage;
