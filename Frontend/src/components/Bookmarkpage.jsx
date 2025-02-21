import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BookmarkCheck, Trash2, RefreshCw, ShoppingBag } from "lucide-react";
import { getBookmarks, clearBookmarks, removeFromBookmarks } from "@/lib/api/bookmarkApi";
import { getProduct } from "@/lib/api/productApi";
import { 
  USER_PROFILE_CONTEXT, 
  MESSAGE_API_CONTEXT,
  BOOKMARK_CONTEXT  // Import from main contexts file instead
} from "@/contexts";
import LoadingPage from "@/componets-utils/LoadingPage";

const BookmarksPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { userProfile } = useContext(USER_PROFILE_CONTEXT);
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  const { updateBookmarkCount } = useContext(BOOKMARK_CONTEXT);

  const fetchProductDetails = async (productId) => {
    const product = await getProduct(productId);
    if (product) {
      setProducts((prev) => ({
        ...prev,
        [productId]: product,
      }));
    }
  };

  const fetchBookmarks = async () => {
    if (!userProfile) return;
    setRefreshing(true);
    try {
      const bookmarksData = await getBookmarks(
        userProfile.id,
        messageApi.error
      );
      if (bookmarksData) {
        setBookmarks(bookmarksData);
        updateBookmarkCount();
        bookmarksData.forEach((bookmark) => {
          fetchProductDetails(bookmark.productId);
        });
      }
    } catch {
      messageApi.error("Failed to fetch bookmarks");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRemoveBookmark = async (productId) => {
    try {
      setBookmarks((prev) => prev.filter((b) => b.productId !== productId));
      const result = await removeFromBookmarks(productId, messageApi.error);
      if (result) {
        messageApi.success("Bookmark removed successfully");
        updateBookmarkCount();
      } else {
        await fetchBookmarks();
      }
    } catch {
      await fetchBookmarks();
      messageApi.error("Failed to remove bookmark");
    }
  };

  const handleClearBookmarks = async () => {
    if (!window.confirm("Are you sure you want to clear all bookmarks?")) return;

    try {
      const result = await clearBookmarks(messageApi.error);
      if (result) {
        setBookmarks([]);
        messageApi.success("All bookmarks cleared");
        updateBookmarkCount();
      } else {
        messageApi.error("Failed to clear bookmarks");
        await fetchBookmarks();
      }
    } catch {
      messageApi.error("Failed to clear bookmarks");
      await fetchBookmarks();
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [userProfile]);

  if (loading) return <LoadingPage message="Loading your bookmarks..." />;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto px-4 py-6 sm:py-8 container">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <h1 className="font-semibold text-xl sm:text-2xl text-gray-800">Your Bookmarks</h1>
          <div className="flex gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={fetchBookmarks}
              disabled={refreshing}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-Primary hover:Primary/10 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 sm:w-5 sm:h-5 ${refreshing ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            {bookmarks.length > 0 && (
              <button
                onClick={handleClearBookmarks}
                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-red-500 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Clear All</span>
              </button>
            )}
          </div>
        </div>

        {bookmarks.length === 0 ? (
          <div className="flex flex-col justify-center items-center space-y-6 mt-12 sm:mt-20">
            <div className="relative">
              <BookmarkCheck className="w-16 h-16 sm:w-24 sm:h-24 text-gray-300" />
              <ShoppingBag className="absolute -right-2 -bottom-2 sm:-right-4 sm:-bottom-4 w-8 h-8 sm:w-12 sm:h-12 text-Primary" />
            </div>
            <div className="space-y-4 max-w-md text-center px-4">
              <h2 className="font-semibold text-lg sm:text-xl text-gray-800">
                Your Bookmark Collection is Empty
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Save interesting products for later by clicking the bookmark icon. Your saved items will appear here for easy access.
              </p>
              <Link
                to="/markets"
                className="inline-block bg-Primary hover:bg-orange px-6 py-2.5 rounded-full text-white transition-all duration-300 text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Explore Markets
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {bookmarks.map((bookmark) => {
              const product = products[bookmark.productId];
              if (!product) return null;

              return (
                <div
                  key={bookmark.productId}
                  className="bg-white shadow-md hover:shadow-lg rounded-lg transition-all duration-300 overflow-hidden hover:-translate-y-1"
                >
                  <Link to={`/products/${product.id}`}>
                    <div className="relative aspect-square">
                      <img
                        src={product.displayImage?.url || "/path/to/fallback.jpg"}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemoveBookmark(product.id);
                        }}
                        className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-600 p-1.5 sm:p-2 rounded-full text-white transition-colors"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="font-medium text-sm sm:text-base truncate">
                        {product.name}
                      </h3>
                      <p className="font-bold text-Primary text-base sm:text-lg mt-1">
                        ₦{product.price?.toLocaleString()}
                      </p>
                      <p className="mt-1 text-gray-600 text-xs sm:text-sm truncate">
                        {product.merchant.brandName}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;
