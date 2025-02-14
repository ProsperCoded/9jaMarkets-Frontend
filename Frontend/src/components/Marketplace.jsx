import { useState, useContext, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useErrorLogger } from "@/hooks";
import { getMarketProducts } from "@/lib/api/marketApi";
import { MARKET_DATA_CONTEXT } from "@/contexts";
import LoadingPage from "@/componets-utils/LoadingPage";
import NotFoundPage from "@/components/NotFoundPage";
import { Search, Bookmark, BookmarkCheck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  if (!market) return <LoadingPage message={"Market Could not be found"} />;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Search Bar */}
      <div className="sticky top-0 z-50 bg-white shadow-md py-2 text-Primary">
        <div className="container mx-auto px-4">
          <div className="relative w-full max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Search a vendor or category"
              className="border-Primary py-2 pr-4 pl-10 border rounded-full focus:ring-2 focus:ring-Primary w-full text-sm focus:outline-none placeholder-gray-400"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-Primary" />
          </div>
        </div>
      </div>

      {/* Hero Section */}
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
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block w-[280px] shrink-0">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-[72px] max-h-[calc(100vh-120px)] overflow-y-auto">
              <h2 className="text-lg font-semibold mb-4">Categories</h2>
              <ul className="space-y-2">
                {PRODUCT_CATEGORIES.map((category, index) => (
                  <li key={index}>
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

          {/* Mobile Category Selector */}
          <div className="lg:hidden w-full">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full focus:ring-Primary">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {PRODUCT_CATEGORIES.map((category) => (
                  <SelectItem 
                    key={category} 
                    value={category}
                    className="focus:bg-Primary/10 focus:text-Primary"
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square relative">
                    <img
                      src={product.displayImage?.url || "/path/to/fallback.jpg"}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <button
                      onClick={() => toggleBookmark(product.id)}
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
