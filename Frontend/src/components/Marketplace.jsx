import { useState, useContext, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useErrorLogger } from "@/hooks";
import { getMarketProducts } from "@/lib/api/marketApi";
import { MARKET_DATA_CONTEXT } from "@/contexts";
import LoadingPage from "@/componets-utils/LoadingPage";
import NotFoundPage from "@/components/NotFoundPage";
import { Search, Bookmark, BookmarkCheck, HelpCircle } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/config";
import { faMapMarkerAlt, faMap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

  const MARKET_CATEGORIES = ["All", ...PRODUCT_CATEGORIES];
  const [selectedCategory, setSelectedCategory] = useState(
    MARKET_CATEGORIES[0]
  );
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);
  }, [products, selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, [marketId]);

  const toggleBookmark = (productId) => {
    setBookmarkedProducts((prev) => {
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
    <div className="bg-gray-50 pt-16 min-h-screen">
      {/* Fixed Search Bar */}
      <div className="top-14 right-0 left-0 z-20 fixed bg-white shadow-md py-3">
        <div className="mx-auto px-4 container">
          <div className="relative mx-auto w-full max-w-lg">
            <input
              type="text"
              placeholder="Search a product..."
              className="border-Primary py-2 pr-4 pl-10 border rounded-full focus:ring-2 focus:ring-Primary w-full text-sm focus:outline-none placeholder-gray-400"
            />
            <Search className="top-1/2 left-3 absolute w-5 h-5 text-Primary -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Hero Section with "Not your market?" link */}
      <div className="relative w-full h-[200px] md:h-[200px]">
        <img
          src={market.displayImage}
          alt={market.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative flex flex-col justify-center items-center px-4 h-full text-center text-white">
          <h1 className="font-[400] text-3xl sm:text-4xl md:text-6xl lg:text-7xl uppercase leading-tight otto">
            {market.name}
          </h1>
        </div>
        <Link
          to="/include-market"
          className="right-2 bottom-2 absolute flex items-center gap-1 text-white hover:text-orange underline transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
          Not your market's picture?
        </Link>
      </div>
      <div className="bg-white rounded-md">{/* Market details here  */}</div>

      {/* Main Content */}
      <div className="mx-auto px-4 py-8 container">
        <div className="flex lg:flex-row flex-col gap-8">
          {/* Sidebar - Desktop */}
          <div className="lg:block hidden w-[280px] shrink-0">
            <div className="top-[72px] sticky bg-white shadow-md p-4 rounded-lg max-h-[calc(100vh-120px)] overflow-y-auto">
              <h2 className="mb-4 font-semibold text-lg">Categories</h2>
              <ul className="space-y-2">
                {PRODUCT_CATEGORIES.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-gray-700 ${
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
                  {MARKET_CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
                        ${
                          selectedCategory === category
                            ? "bg-Primary text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                        }`}
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
            <div className="gap-4 grid grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white shadow-md hover:shadow-lg rounded-lg transition-shadow overflow-hidden"
                >
                  <Link to={`/markets/${marketId}/products/${product.id}`}>
                    <div className="relative aspect-square">
                      <img
                        src={
                          product.displayImage?.url || "/path/to/fallback.jpg"
                        }
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleBookmark(product.id);
                        }}
                        className="top-2 right-2 absolute bg-Primary/80 hover:bg-Primary p-2 rounded-full text-white transition-colors"
                      >
                        {bookmarkedProducts.has(product.id) ? (
                          <BookmarkCheck className="w-4 h-4" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <div className="p-2">
                      <h3 className="font-medium text-sm truncate">
                        {product.name}
                      </h3>
                      <p className="font-bold text-Primary text-sm">
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
