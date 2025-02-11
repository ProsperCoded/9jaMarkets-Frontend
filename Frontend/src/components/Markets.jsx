import { useState, useContext, useMemo } from "react";
import searchIcon from "../assets/search.svg";
import { Link } from "react-router-dom";
import { STATES } from "../config";
import { MapPin, Store, ShoppingBag, Filter, X } from "lucide-react";
import { MARKET_DATA_CONTEXT } from "@/contexts";

const MarketPage = () => {
  const [selectedState, setSelectedState] = useState("Abuja");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const { marketsData } = useContext(MARKET_DATA_CONTEXT);

  const filteredMarkets = useMemo(() => {
    if (!selectedState) return marketsData;
    if (searchTerm) {
      const markets = marketsData.filter((market) => {
        if (!market.state) return false;
        return (
          market.state.toLowerCase().includes(selectedState.toLowerCase()) &&
          market.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      return markets;
    }
    const markets = marketsData.filter((market) => {
      if (!market.state) return false;
      const includes = market.state
        .toLowerCase()
        .includes(selectedState.toLowerCase());
      return includes;
    });
    return markets;
  }, [selectedState, marketsData, searchTerm]);

  return (
    <div className="relative z-0 flex flex-col bg-gray-50 min-h-screen">
      {/* Header Navigation */}
      <div className="top-0 z-30 sticky bg-white shadow-sm">
        {/* Market/Mall Switch */}
        <div className="absolute left-0 top-0 h-full flex items-center pl-8">
          <div className="flex items-center space-x-6">
            <Link
              to="/markets"
              className="flex items-center gap-2 hover:opacity-90 font-bold text-lg text-Primary transition-opacity py-4"
            >
              <Store className="w-5 h-5" />
              Markets
            </Link>
            <Link
              to="/malls"
              className="flex items-center gap-2 text-gray-600 text-lg hover:text-Primary transition-colors py-4"
            >
              <ShoppingBag className="w-5 h-5" />
              Malls
            </Link>
          </div>
        </div>

        {/* Search Bar - Centered */}
        <div className="mx-auto px-4 container h-16">
          <div className="flex justify-center items-center h-full">
            <div className="flex items-center gap-2 max-w-2xl w-full">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder={`Search ${selectedState} markets...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-2 border-Primary px-4 py-2.5 pr-12 pl-5 rounded-full focus:ring-2 focus:ring-Primary/20 w-full text-sm transition-all focus:outline-none"
                />
                <div className="top-1/2 right-4 absolute transform -translate-y-1/2">
                  <img src={searchIcon} alt="Search" className="w-5 h-5" />
                </div>
              </div>
              <button
                onClick={() => setShowFilters(true)}
                className="flex justify-center items-center md:hidden bg-Primary rounded-full w-10 h-10 text-white"
              >
                <Filter size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 md:hidden ${
          showFilters ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setShowFilters(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-white z-[51] transform transition-transform duration-300 ease-in-out md:hidden ${
          showFilters ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="font-semibold text-lg">Select State</h3>
            <button
              onClick={() => setShowFilters(false)}
              className="hover:bg-gray-100 p-2 rounded-full"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="gap-2 grid grid-cols-2 p-4">
              {STATES.map((state) => (
                <button
                  key={state}
                  onClick={() => {
                    setSelectedState(state);
                    setShowFilters(false);
                  }}
                  className={`p-3 text-left rounded-lg transition-all ${
                    selectedState === state
                      ? "bg-Primary text-white font-medium"
                      : "text-gray-700 hover:bg-Primary/10"
                  }`}
                >
                  {state}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="md:block top-[85px] sticky hidden bg-white p-6 w-72 lg:w-80 h-[calc(100vh-85px)] overflow-y-auto">
          <h3 className="mb-4 font-semibold text-lg">Select State</h3>
          <div className="gap-2 grid">
            {STATES.map((state) => (
              <button
                key={state}
                onClick={() => setSelectedState(state)}
                className={`p-3 text-left rounded-lg transition-all ${
                  selectedState === state
                    ? "bg-Primary text-white font-medium"
                    : "text-gray-700 hover:bg-Primary/10"
                }`}
              >
                {state}
              </button>
            ))}
          </div>
        </aside>

        {/* Markets Grid */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="mx-auto container">
            <h2 className="mb-6 font-bold text-gray-800 text-xl md:text-2xl">
              {selectedState} State Markets
            </h2>

            <div className="gap-3 md:gap-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredMarkets.length > 0 ? (
                filteredMarkets.map((market, index) => (
                  <Link
                    to={`/markets/${market.id}`}
                    key={index}
                    className="bg-white shadow-sm hover:shadow-md rounded-xl transition-all duration-300 overflow-hidden group"
                  >
                    <div className="overflow-hidden aspect-video">
                      <img
                        src={market.displayImage}
                        alt={market.name}
                        loading="lazy"
                        className="group-hover:scale-105 w-full h-full transform transition-transform duration-300 object-cover"
                      />
                    </div>
                    <div className="p-3 md:p-4">
                      <h3 className="group-hover:text-Primary line-clamp-1 font-semibold text-gray-800 text-sm md:text-lg transition-colors">
                        {market.name}
                      </h3>
                      <div className="flex items-start gap-2 mt-2 text-gray-600">
                        <MapPin size={16} className="flex-shrink-0 mt-1" />
                        <p className="line-clamp-2 text-xs md:text-sm">
                          {market.address}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full py-8 text-center">
                  <p className="text-gray-600">
                    No markets found for &quot;{searchTerm}&quot;
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MarketPage;
