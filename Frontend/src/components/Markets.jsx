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
    <div className="relative flex flex-col min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <div className="bg-white shadow-sm py-4 sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left Section */}
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                to="/markets" 
                className="flex items-center gap-2 text-Primary font-bold text-lg hover:opacity-90 transition-opacity"
              >
                <Store className="h-5 w-5" />
                Markets
              </Link>
              <Link 
                to="/malls" 
                className="flex items-center gap-2 text-gray-600 hover:text-Primary transition-colors text-lg"
              >
                <ShoppingBag className="h-5 w-5" />
                Malls
              </Link>
            </div>

            {/* Mobile Nav */}
            <div className="md:hidden flex items-center gap-4">
              <Link to="/markets" className="font-bold text-Primary text-lg">
                Markets
              </Link>
              <Link to="/malls" className="text-gray-600 text-lg">
                Malls
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder={`Search ${selectedState} markets...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2.5 pl-5 pr-12 text-sm border-2 border-Primary rounded-full focus:outline-none focus:ring-2 focus:ring-Primary/20 transition-all"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <img src={searchIcon} alt="Search" className="w-5 h-5" />
                </div>
              </div>
              <button
                onClick={() => setShowFilters(true)}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-Primary text-white"
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
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold text-lg">Select State</h3>
            <button
              onClick={() => setShowFilters(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-2 gap-2 p-4">
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
        <aside className="hidden md:block sticky top-[85px] bg-white w-72 lg:w-80 h-[calc(100vh-85px)] p-6 overflow-y-auto">
          <h3 className="font-semibold text-lg mb-4">Select State</h3>
          <div className="grid gap-2">
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
          <div className="container mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
              {selectedState} State Markets
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
              {filteredMarkets.length > 0 ? (
                filteredMarkets.map((market, index) => (
                  <Link
                    to={`/markets/${market.id}`}
                    key={index}
                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={market.displayImage}
                        alt={market.name}
                        loading="lazy"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3 md:p-4">
                      <h3 className="font-semibold text-sm md:text-lg text-gray-800 group-hover:text-Primary transition-colors line-clamp-1">
                        {market.name}
                      </h3>
                      <div className="flex items-start gap-2 mt-2 text-gray-600">
                        <MapPin size={16} className="mt-1 flex-shrink-0" />
                        <p className="text-xs md:text-sm line-clamp-2">{market.address}</p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-600">No markets found for "{searchTerm}"</p>
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
