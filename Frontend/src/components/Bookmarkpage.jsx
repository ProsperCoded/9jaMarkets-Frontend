import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BookmarkCheck, Trash2, RefreshCw, ShoppingBag } from "lucide-react";
import {
  getBookmarks,
  clearBookmarks,
  removeFromBookmarks,
} from "@/lib/api/bookmarkApi";
import { getProduct } from "@/lib/api/productApi";
import { USER_PROFILE_CONTEXT, MESSAGE_API_CONTEXT } from "@/contexts";
import LoadingPage from "@/componets-utils/LoadingPage";

const BookmarksPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { userProfile } = useContext(USER_PROFILE_CONTEXT);
  const messageApi = useContext(MESSAGE_API_CONTEXT);

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
        // Fetch product details for each bookmark
        bookmarksData.forEach((bookmark) => {
          fetchProductDetails(bookmark.productId);
        });
      }
    } catch (error) {
      messageApi.error("Failed to fetch bookmarks");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRemoveBookmark = async (productId) => {
    try {
      // Optimistic update
      setBookmarks((prev) => prev.filter((b) => b.productId !== productId));

      const result = await removeFromBookmarks(productId, messageApi.error);
      if (result) {
        messageApi.success("Bookmark removed successfully");
      } else {
        // Revert if failed
        fetchBookmarks();
      }
    } catch (error) {
      fetchBookmarks();
      messageApi.error("Failed to remove bookmark");
    }
  };

  const handleClearBookmarks = async () => {
    if (!window.confirm("Are you sure you want to clear all bookmarks?"))
      return;

    try {
      // Optimistic update
      setBookmarks([]);

      const result = await clearBookmarks(messageApi.error);
      if (result) {
        messageApi.success("All bookmarks cleared");
      } else {
        // Revert if failed
        fetchBookmarks();
      }
    } catch (error) {
      fetchBookmarks();
      messageApi.error("Failed to clear bookmarks");
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [userProfile]);

  if (loading) return <LoadingPage message="Loading your bookmarks..." />;

  return (
    <div className="bg-gray-50 pt-16 min-h-screen">
      <div className="mx-auto px-4 py-8 container">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-semibold text-2xl">Your Bookmarks</h1>
          <div className="flex gap-2">
            <button
              onClick={fetchBookmarks}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-Primary hover:text-P2"
            >
              <RefreshCw
                className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
            {bookmarks.length > 0 && (
              <button
                onClick={handleClearBookmarks}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-5 h-5" />
                Clear All
              </button>
            )}
          </div>
        </div>

        {bookmarks.length === 0 ? (
          <div className="flex flex-col justify-center items-center space-y-6 mt-20">
            <div className="relative">
              <BookmarkCheck className="w-24 h-24 text-gray-300" />
              <ShoppingBag className="-right-4 -bottom-4 absolute w-12 h-12 text-Primary" />
            </div>
            <div className="space-y-4 max-w-md text-center">
              <h2 className="font-semibold text-xl">
                Your Bookmark Collection is Empty
              </h2>
              <p className="text-gray-600">
                Save interesting products for later by clicking the bookmark
                icon. Your saved items will appear here for easy access.
              </p>
              <Link
                to="/markets"
                className="inline-block bg-Primary hover:bg-P2 px-6 py-3 rounded-full text-white transition-all"
              >
                Explore Markets
              </Link>
            </div>
          </div>
        ) : (
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {bookmarks.map((bookmark) => {
              const product = products[bookmark.productId];
              if (!product) return null;

              return (
                <div
                  key={bookmark.productId}
                  className="bg-white shadow-md hover:shadow-lg rounded-lg transition-shadow overflow-hidden"
                >
                  <Link to={`/products/${product.id}`}>
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
                          handleRemoveBookmark(product.id);
                        }}
                        className="top-2 right-2 absolute bg-Primary/80 hover:bg-Primary p-2 rounded-full text-white transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg truncate">
                        {product.name}
                      </h3>
                      <p className="font-bold text-Primary text-xl">
                        ₦{product.price?.toLocaleString()}
                      </p>
                      <p className="mt-1 text-gray-600 text-sm">
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
