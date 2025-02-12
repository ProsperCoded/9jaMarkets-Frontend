/**
 * The Marketplace component renders a marketplace page with a search bar, a hero section and a main content area.
 * The main content area contains a sidebar with categories and a product grid that displays products filtered by category.
 * The component uses a combination of Tailwind CSS classes and custom CSS to style the elements.
 * The component also uses React hooks to handle state and side effects.
 * The component renders a gray line to separate the hero section from the main content area.
 * The component renders a product grid with products filtered by category and sorted by name.
 * The component renders a loading indicator when the products are being fetched from the server.
 * The component renders an error message when there is an error fetching the products from the server.
 * The component also renders a back to top button that scrolls to the top of the page when clicked.
 */
import { useState, useEffect, useContext, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCartShopping, 
  faInfoCircle, 
  faMapMarkerAlt, 
  faMap,
  faFilter,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useErrorLogger } from "@/hooks";
import { getMarketProducts } from "@/lib/api/marketApi";
import { MARKET_DATA_CONTEXT } from "@/contexts";
import LoadingPage from "@/componets-utils/LoadingPage";
import NotFoundPage from "@/components/NotFoundPage";

const CATEGORIES = [
  "All Categories",
  "Education & Stationery",
  "Real Estate & Housing",
  "Events & Entertainment",
  "Technology Services",
  "Cultural Experiences",
  "Food & Groceries",
  "Electronics & Gadgets",
  "Fashion & Accessories",
  "Health & Wellness",
  "Home & Living",
  "Automobile Needs",
  "Traditional Crafts",
  "Sports & Outdoor",
  "Kids & Baby Products"
];

const Marketplace = () => {
  const errorLogger = useErrorLogger();
  const { id: marketId } = useParams();
  const [products, setProducts] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { marketsData } = useContext(MARKET_DATA_CONTEXT);
  const market = marketsData.find((market) => market.id === marketId);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);

  const fetchProducts = async () => {
    const marketProducts = await getMarketProducts(marketId, errorLogger);
    if (!marketProducts) return;
    setProducts(marketProducts);
  };

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    let filtered = products;
    
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter((product) => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [products, selectedCategory, searchQuery]);

  useEffect(() => {
    fetchProducts();
  }, []);

  if (!market && marketsData.length > 0) return <NotFoundPage />;
  if (!market) return <LoadingPage message={"Market Could not be found"} />;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Search Bar */}
      <div className="sticky top-0 z-50 bg-white shadow-sm py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-2xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products or categories..."
              className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-200 focus:border-Primary focus:ring-2 focus:ring-Primary/20 transition-all duration-200"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 4.247 11.943l5.53 5.53a.75.75 0 0 0 1.06-1.06l-5.53-5.53A6.75 6.75 0 0 0 10.5 3.75ZM5.25 10.5a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden bg-Primary/10 text-Primary p-2 rounded-lg hover:bg-Primary/20 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faFilter} className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[200px] md:h-[300px] overflow-hidden">
        <img
          src={market.displayImage}
          alt={market.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">{market.name}</h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              <span>{market.address}</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faMap} className="mr-2" />
              <span>{market.state}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
              <h2 className="font-semibold text-lg mb-4">Categories</h2>
              <div className="space-y-1">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                      selectedCategory === category
                        ? "bg-Primary text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Sidebar */}
          <div
            className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 md:hidden ${
              isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setIsSidebarOpen(false)}
          >
            <div
              className={`absolute right-0 top-0 bottom-0 w-80 bg-white transform transition-transform duration-300 ${
                isSidebarOpen ? "translate-x-0" : "translate-x-full"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-semibold text-lg">Categories</h2>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-1">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                        selectedCategory === category
                          ? "bg-Primary text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-semibold text-xl">{selectedCategory}</h2>
                <span className="text-sm text-gray-500">
                  {filteredProducts.length} items
                </span>
              </div>
              
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No products found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="aspect-square relative overflow-hidden">
                        <img
                          src={product.displayImage?.url}
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 mb-1">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <p className="text-Primary font-semibold">
                            ₦{product.price.toLocaleString()}
                          </p>
                          <button className="bg-Primary/10 hover:bg-Primary/20 text-Primary p-2 rounded-full transition-colors duration-200">
                            <FontAwesomeIcon icon={faCartShopping} className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
