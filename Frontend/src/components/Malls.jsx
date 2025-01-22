import { useState, useContext, useMemo } from "react";
import searchIcon from "../assets/search.svg"; // Assuming this is your search icon
import { Link } from "react-router-dom";
import { ChevronDown, MapPin } from "lucide-react";
import { STATES } from "../config";
import { MALLS_DATA_CONTEXT } from "@/contexts";
const mallPage = () => {
  const [selectedState, setSelectedState] = useState("Abuja");
  const [searchTerm, setSearchTerm] = useState("");
  const [bottomNavVisible, setBottomNavVisible] = useState(false);
  const { mallsData } = useContext(MALLS_DATA_CONTEXT);
  const filteredMalls = useMemo(() => {
    if (!selectedState) return mallsData;
    const malls = mallsData.filter((market) =>
      market.state.toLowerCase().includes(selectedState.toLowerCase())
    );
    console.log({ malls });
    return malls;
  }, [selectedState, mallsData]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-white drop-shadow-sm py-2 text-Primary">
        <div className="flex justify-between items-center mx-auto px-4 container">
          {/* Left Section with malls and Malls */}
          <div className="md:flex items-center space-x-4 hidden">
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
        <aside
          className="top-[93%] md:top-0 z-20 fixed md:sticky bg-white md:shadow-hide rounded-t-2xl w-full md:w-[300px] h-full overflow-visible"
          style={{
            boxShadow:
              "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
            top: bottomNavVisible ? "10%" : "",
            transition: "top 0.3s ease-in-out",
          }}
        >
          <div className="relative p-4 w-full h-full">
            <div className="left-[10%] z-10 absolute md:hidden">
              <Link to="/markets" className="font-thin text-lg">
                Markets
              </Link>
            </div>
            <div className="right-[10%] z-10 absolute md:hidden">
              <Link to="/malls" className="font-bold text-lg">
                Malls
              </Link>
            </div>
            <div
              className="top-[-20px] right-0 left-0 absolute md:hidden transition-transform translate-y-[-50%]"
              style={{
                transform: bottomNavVisible ? "rotate(0deg)" : "rotate(180deg)",
                transition: "transform 0.3s ease-in-out",
              }}
            >
              <div
                className="z-30 bg-white mx-auto p-4 w-fit h-fit cursor-pointer"
                style={{
                  boxShadow: !bottomNavVisible
                    ? "rgba(37, 37, 37, 0.15) 1px 12px 16px"
                    : "none",
                  borderRadius: !bottomNavVisible ? "0 0 1rem 1rem " : "1rem",
                }}
                onClick={() => {
                  setBottomNavVisible((prev) => !prev);
                }}
              >
                <ChevronDown
                  size={35}
                  strokeWidth={2}
                  className="text-Primary"
                />
              </div>
            </div>
            <div className="relative pt-14 md:pt-2 h-full md:max-h-screen overflow-y-auto">
              <h3 className="md:hidden font-semibold text-center text-lg">
                STATES
              </h3>
              <ul className="gap-2 space-y-2 grid grid-cols-2 md:grid-cols-1 h-max">
                {STATES.map((state) => (
                  <li
                    key={state}
                    onClick={() => setSelectedState(state)}
                    className={`cursor-pointer p-2 ${
                      selectedState === state
                        ? "bg-Primary text-white"
                        : "text-gray-800"
                    } hover:bg-Primary hover:opacity-75 hover:text-white rounded-lg focus:font-semibold`}
                  >
                    {state}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Main Content: malls */}
        <div className="bg-gray-100 p-6 w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-2xl">{selectedState} State malls</h2>
          </div>

          {/* mall Cards Grid */}
          <div className="gap-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredMalls.length > 0 ? (
              filteredMalls.map((mall, index) => (
                <Link
                  to={`/malls/${mall.id}`}
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
                    <div className="flex items-center gap-1">
                      <MapPin size={20} strokeWidth={1} />
                      <p className="my-1 text-sm">{mall.address}</p>
                    </div>
                  </div>
                </Link>
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
