import { useState, useContext, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useErrorLogger } from "@/hooks";
import { getMarketProducts } from "@/lib/api/marketApi";
import { MARKET_DATA_CONTEXT } from "@/contexts";
import LoadingPage from "@/componets-utils/LoadingPage";
import NotFoundPage from "@/components/NotFoundPage";
import { Search, Bookmark, BookmarkCheck, HelpCircle } from "lucide-react";

const PRODUCT_CATEGORIES = [
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
  const [bookmarkedProducts, setBookmarkedProducts] = useState(new Set());

  const fetchProducts = async () => {
    const marketProducts = await getMarketProducts(marketId, errorLogger);
    if (!marketProducts) return;
    setProducts(marketProducts);
  };

  const [selectedCategory, setSelectedCategory] = useState(PRODUCT_CATEGORIES[0]);
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return selectedCategory === "All Categories" 
      ? products 
      : products.filter((product) => product.category === selectedCategory);
  }, [products, selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, [marketId]);

  const toggleBookmark = (productId) => {
    setBookmarkedProducts(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(productId)) {
        newBookmarks.delete(productId);
      } else {
        newBookmarks.add(productId);
      }
      return newBookmarks;
    });
  };

  if (!market && marketsData.length > 0) return <NotFoundPage />;
  if (!market) return <LoadingPage message={"Could not be found"} />;

  return (
    <div className="bg-gray-50 min-h-screen pt-16">
      {/* Fixed Search Bar */}
      <div className="fixed top-14 left-0 right-0 z-20 bg-white shadow-md py-3">
        <div className="container mx-auto px-4">
          <div className="relative w-full max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Search a product..."
              className="border-Primary py-2 pr-4 pl-10 border rounded-full focus:ring-2 focus:ring-Primary w-full text-sm focus:outline-none placeholder-gray-400"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-Primary" />
          </div>
        </div>
      </div>

      {/* Hero Section with "Not your market?" link */}
      <div className="relative h-[200px] md:h-[200px] w-full">
        <img
          src={market.displayImage}
          alt={market.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative flex flex-col justify-center items-center h-full text-center text-white px-4">
          <h1 className="font-[400] text-3xl sm:text-4xl md:text-6xl lg:text-7xl uppercase leading-tight otto">
            {market.name}
          </h1>
        </div>
        <Link 
          to="/include-market" 
          className="absolute bottom-2 right-2 flex items-center gap-1 text-white hover:text-orange transition-colors underline"
        >
          <HelpCircle className="w-4 h-4" />
          Not your market's picture?
        </Link>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block w-[280px] shrink-0">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-[72px] max-h-[calc(100vh-120px)] overflow-y-auto">
              <h2 className="text-lg font-semibold mb-4">Categories</h2>
              <ul className="space-y-2">
                {PRODUCT_CATEGORIES.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === category
                          ? "bg-Primary text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile Categories - Horizontal Scroll */}
          <div className="lg:hidden w-full">
            <div className="relative">
              <div className="overflow-x-auto scrollbar-thin">
                <div className="flex gap-2 pb-4 min-w-max">
                  {PRODUCT_CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
                        ${selectedCategory === category 
                          ? 'bg-Primary text-white' 
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Link to={`/markets/${marketId}/products/${product.id}`}>
                    <div className="aspect-square relative">
                      <img
                        src={product.displayImage?.url || "/path/to/fallback.jpg"}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleBookmark(product.id);
                        }}
                        className="absolute top-2 right-2 p-2 rounded-full bg-Primary/80 text-white hover:bg-Primary transition-colors"
                      >
                        {bookmarkedProducts.has(product.id) ? (
                          <BookmarkCheck className="w-4 h-4" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <div className="p-2">
                      <h3 className="font-medium text-sm truncate">{product.name}</h3>
                      <p className="text-Primary font-bold text-sm">
                        ₦{product.price?.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
