import { useState, useContext, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useErrorLogger } from "@/hooks";
import { getMarketProducts } from "@/lib/api/marketApi";
import {
  MARKET_DATA_CONTEXT,
  MESSAGE_API_CONTEXT,
  USER_PROFILE_CONTEXT,
} from "@/contexts";
import LoadingPage from "@/componets-utils/LoadingPage";
import NotFoundPage from "@/components/NotFoundPage";
import {
  Search,
  SearchX,
  Bookmark,
  BookmarkCheck,
  HelpCircle,
  MapPin,
  Info,
  Building2,
  Globe,
} from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/config";
import { faMapMarkerAlt, faMap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  addToBookmarks,
  removeFromBookmarks,
  getBookmarks,
} from "@/lib/api/bookmarkApi";

const Marketplace = () => {
  const errorLogger = useErrorLogger();
  const { id: marketId } = useParams();
  const [products, setProducts] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const { marketsData } = useContext(MARKET_DATA_CONTEXT);
  const market = marketsData.find((market) => market.id === marketId);
  const { userProfile } = useContext(USER_PROFILE_CONTEXT);
  const [bookmarkedProducts, setBookmarkedProducts] = useState(new Set());
  const [showDescription, setShowDescription] = useState(false);

  const [pendingBookmarks, setPendingBookmarks] = useState(new Set());
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  const fetchProducts = async () => {
    const marketProducts = await getMarketProducts(marketId, errorLogger);
    if (!marketProducts) return;
    setProducts(marketProducts);
  };

  const fetchBookmarks = async () => {
    if (!userProfile) return;
    const bookmarks = await getBookmarks(userProfile.id, errorLogger);
    if (!bookmarks) return;
    setBookmarkedProducts(new Set(bookmarks.map((item) => item.productId)));
  };

  const MARKET_CATEGORIES = ["All", ...PRODUCT_CATEGORIES];
  const [selectedCategory, setSelectedCategory] = useState(
    MARKET_CATEGORIES[0]
  );

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    let filtered =
      selectedCategory === MARKET_CATEGORIES[0]
        ? products
        : products.filter((product) => product.category === selectedCategory);

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [products, selectedCategory, searchQuery]);

  const handleBookmarkToggle = async (productId, e) => {
    e.preventDefault();
    if (!userProfile) {
      errorLogger("Please login to bookmark products");
      return;
    }
    // prevent merchant from bookmarking
    if (userProfile && userProfile.userType === "merchant") {
      messageApi.warning("Sorry Merchants can't bookmark, Login as Customer");
      return;
    }
    // Prevent duplicate operations
    if (pendingBookmarks.has(productId)) return;

    // Add to pending set
    setPendingBookmarks((prev) => new Set([...prev, productId]));

    // Optimistically update UI
    const isCurrentlyBookmarked = bookmarkedProducts.has(productId);
    setBookmarkedProducts((prev) => {
      const newSet = new Set(prev);
      if (isCurrentlyBookmarked) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });

    try {
      // Attempt server operation
      const result = isCurrentlyBookmarked
        ? await removeFromBookmarks(productId, errorLogger)
        : await addToBookmarks(productId, errorLogger);

      if (!result) throw new Error("Server operation failed");
    } catch (error) {
      // Revert optimistic update on failure
      setBookmarkedProducts((prev) => {
        const newSet = new Set(prev);
        if (isCurrentlyBookmarked) {
          newSet.add(productId);
        } else {
          newSet.delete(productId);
        }
        return newSet;
      });
      errorLogger(
        isCurrentlyBookmarked
          ? "Failed to remove from bookmarks"
          : "Failed to add to bookmarks"
      );
    } finally {
      // Remove from pending set
      setPendingBookmarks((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  useEffect(() => {
    fetchProducts();
    if (userProfile && userProfile.userType !== "merchant") {
      fetchBookmarks();
    }
  }, [marketId, userProfile]);

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

      {/* Market Details */}

      {/* Market Details */}
      <div className="bg-white shadow-md">
        <div className="mx-auto container">
          {/* Desktop View */}
          <div className="md:block hidden px-4 py-6">
            <div className="flex justify-between items-center pb-4 border-b">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-Primary" />
                <span className="text-gray-600">
                  {market.address}, {market.city}, {market.state} State
                </span>
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowDescription((prev) => !prev)}
                  className="flex items-center gap-2 hover:text-Primary underline transition-colors"
                >
                  <Info className="w-5 h-5 text-Primary" />
                  <span className="text-gray-600">About {market.name}</span>
                </button>
                {showDescription && (
                  <div className="top-full right-0 z-30 absolute bg-white shadow-lg mt-2 p-4 rounded-lg w-80">
                    <p className="text-gray-600 text-sm">
                      {market.description}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-Primary" />
                <span className="text-gray-600">
                  {market.isMall ? "Shopping Mall" : "Traditional Market"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-Primary" />
                <span className="text-gray-600">{market.state}</span>
              </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden">
              <div className="flex justify-between items-center px-4 py-3 border-b">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-Primary" />
                  <MapPin className="w-4 h-4 text-Primary" />
                  <span className="text-gray-600 text-sm">
                    {market.city}, {market.state}
                  </span>
                </div>
                <span className="font-medium text-Primary text-sm">
                  {market.isMall ? "Shopping Mall" : "Traditional Market"}
                </span>
              </div>

              {/* Collapsible Details */}
              <details className="group">
                <summary className="flex justify-between items-center px-4 py-3 cursor-pointer list-none">
                  <span className="font-medium text-gray-700">
                    View Market Details
                  </span>
                  <span className="font-medium text-gray-700">
                    View Market Details
                  </span>
                  <div className="group-open:rotate-180 flex justify-center items-center border-[1.5px] border-gray-500 rounded-full w-4 h-4 transition-transform">
                    <div className="border-gray-500 border-r-[1.5px] border-b-[1.5px] w-1.5 h-1.5 translate-y-[-2px] rotate-45"></div>
                  </div>
                </summary>
                <div className="space-y-4 px-4 pb-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-700 text-sm">
                      Address
                    </h3>
                    <h3 className="font-semibold text-gray-700 text-sm">
                      Address
                    </h3>
                    <p className="text-gray-600 text-sm">{market.address}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-700 text-sm">
                      About
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {market.description}
                    </p>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="mx-auto px-4 py-8 container">
          <div className="flex lg:flex-row flex-col gap-8">
            {/* Sidebar - Desktop */}
            <div className="lg:block hidden w-[280px] shrink-0">
              <div className="top-[72px] sticky bg-white shadow-md p-4 rounded-lg max-h-[calc(100vh-120px)] overflow-y-auto">
                <h2 className="mb-4 font-semibold text-lg">Categories</h2>
                <ul className="space-y-2">
                  {MARKET_CATEGORIES.map((category) => (
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
              {filteredProducts.length > 0 ? (
                <div className="gap-4 grid grid-cols-2 lg:grid-cols-4">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white shadow-md hover:shadow-lg rounded-lg transition-shadow overflow-hidden"
                    >
                      <Link to={`/products/${product.id}`}>
                        <div className="relative aspect-square">
                          <img
                            src={
                              product.displayImage?.url ||
                              "/path/to/fallback.jpg"
                            }
                            alt={product.name}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <button
                            onClick={(e) => handleBookmarkToggle(product.id, e)}
                            disabled={pendingBookmarks.has(product.id)}
                            className={`top-2 right-2 absolute p-2 rounded-full text-white transition-colors
                            ${
                              pendingBookmarks.has(product.id)
                                ? "bg-gray-400"
                                : "bg-Primary/80 hover:bg-Primary"
                            }`}
                          >
                            {pendingBookmarks.has(product.id) ? (
                              <div className="animate-pulse">
                                <Bookmark className="size-6" />
                              </div>
                            ) : bookmarkedProducts.has(product.id) ? (
                              <BookmarkCheck className="size-6" />
                            ) : (
                              <Bookmark className="size-6" />
                            )}
                          </button>
                        </div>
                        <div className="p-2">
                          <h3 className="font-medium truncate">
                            {product.name}
                          </h3>
                          <p className="font-bold text-Primary text">
                            ₦{product.price?.toLocaleString()}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center px-4 py-12 text-center">
                  <div className="relative mb-4">
                    <SearchX className="w-16 h-16 text-orange/55 animate-bounce" />
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-800 text-xl">
                    No Products Found
                  </h3>
                  <p className="max-w-md text-gray-600">
                    {searchQuery ? (
                      <>
                        We couldn't find any products matching "{searchQuery}"
                        in the {selectedCategory.toLowerCase()} category. Try
                        adjusting your search or selecting a different category.
                      </>
                    ) : (
                      <>
                        No products available in the{" "}
                        {selectedCategory.toLowerCase()} category. Try selecting
                        a different category.
                      </>
                    )}
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="border-2 border-Primary hover:bg-Primary/5 mt-4 px-4 py-2 rounded-full text-Primary text-sm transition-colors"
                    >
                      Clear Search
                    </button>
                  )}
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
