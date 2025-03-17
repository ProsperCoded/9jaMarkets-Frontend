import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search, MapPin, ListFilter, Star, Crown, Award } from "lucide-react";
import { PRODUCT_CATEGORIES, STATES } from "@/config";
import CH from "@/assets/customerhero.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getPagedProductsApi } from "@/lib/api/productApi";
import {
  addToBookmarks,
  removeFromBookmarks,
  getBookmarks,
} from "@/lib/api/bookmarkApi";
import {
  getProductsWithAdsStatus,
  sortProductsByAdPriority,
} from "@/lib/api/adApi";
import {
  getAuth,
  replaceAmpersandWithAnd,
  replaceSpacesWithUnderscore,
} from "@/lib/util";
import { useToast } from "@/hooks/use-toast";
import {
  useTrackAdView,
  useTrackAdClick,
  useTrackProductClick,
} from "@/hooks/useTracking";
import ProductCard from "@/components/ProductCard";

// Function to get ad level badge properties
const getAdBadge = (level) => {
  switch (level) {
    case 3:
      return {
        icon: <Crown className="w-3 h-3" />,
        label: "Premium",
        classes: "bg-gradient-to-r from-purple-500 to-indigo-600 text-white",
      };
    case 2:
      return {
        icon: <Star className="w-3 h-3" />,
        label: "Featured",
        classes: "bg-gradient-to-r from-orange-400 to-amber-500 text-white",
      };
    case 1:
      return {
        icon: <Award className="w-3 h-3" />,
        label: "Standard",
        classes: "bg-gradient-to-r from-cyan-500 to-blue-500 text-white",
      };
    default:
      return null;
  }
};

const CustomerPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Get initial category from URL params
  const initialCategory = replaceAmpersandWithAnd(
    searchParams.get("category") || "All"
  );
  const initialState = replaceAmpersandWithAnd(
    searchParams.get("state") || "All"
  );
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedState, setSelectedState] = useState(initialState);
  const [bookmarkedProducts, setBookmarkedProducts] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: initialPage,
    totalPages: 1,
    totalItems: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const stateOptions = ["All", ...STATES];
  const categoriesOptions = ["All", ...PRODUCT_CATEGORIES];

  // Add tracking hooks
  const handleProductClick = useTrackProductClick();
  const handleAdClick = useTrackAdClick();

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== "All") params.set("category", selectedCategory);
    if (selectedState !== "All") params.set("state", selectedState);
    if (pagination.currentPage > 1)
      params.set("page", pagination.currentPage.toString());
    setSearchParams(params);
  }, [
    selectedCategory,
    selectedState,
    pagination.currentPage,
    setSearchParams,
  ]);

  // Fetch user bookmarks if logged in
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const auth = getAuth();
        if (auth && auth.userId) {
          const bookmarksData = await getBookmarks(auth.userId, (error) =>
            toast({
              title: "Error",
              description: error,
              variant: "destructive",
            })
          );

          if (bookmarksData && bookmarksData.products) {
            const bookmarkIds = new Set(
              bookmarksData.products.map((item) => item.id)
            );
            setBookmarkedProducts(bookmarkIds);
          }
        }
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    fetchBookmarks();
  }, [toast]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const productsData = await getPagedProductsApi(
          {
            page: pagination.currentPage,
            pageSize: 16, // Adjust based on your design
            category:
              selectedCategory !== "All"
                ? replaceSpacesWithUnderscore(selectedCategory)
                : null,
            state: selectedState !== "All" ? selectedState : null,
          },
          (error) =>
            toast({
              title: "Error loading products",
              description: error,
              variant: "destructive",
            })
        );

        if (productsData) {
          // Enhance products with ad status
          const productsWithAdStatus = await getProductsWithAdsStatus(
            productsData.items,
            {},
            (error) =>
              toast({
                title: "Error loading ad information",
                description: error,
                variant: "destructive",
              })
          );

          // Sort products with ads first
          const sortedProducts = sortProductsByAdPriority(productsWithAdStatus);

          setPagination({
            currentPage: productsData.currentPage,
            totalPages: productsData.totalPages,
            totalItems: productsData.totalItems,
            hasNextPage: productsData.hasNextPage,
            hasPreviousPage: productsData.hasPreviousPage,
          });

          setProducts(sortedProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast({
          title: "Failed to load products",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedState, pagination.currentPage, toast]);

  // Apply search filter
  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  const handlePageChange = (page) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: page,
    }));
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleBookmark = async (productId) => {
    try {
      const auth = getAuth();
      if (!auth || !auth.userId) {
        toast({
          title: "Login Required",
          description: "Please log in to bookmark products",
          variant: "destructive",
        });
        return;
      }

      setBookmarkedProducts((prev) => {
        const newBookmarks = new Set(prev);
        if (newBookmarks.has(productId)) {
          // Remove bookmark
          removeFromBookmarks(productId, (error) =>
            toast({
              title: "Error",
              description: error,
              variant: "destructive",
            })
          );
          newBookmarks.delete(productId);
        } else {
          // Add bookmark
          addToBookmarks(productId, (error) =>
            toast({
              title: "Error",
              description: error,
              variant: "destructive",
            })
          );
          newBookmarks.add(productId);
        }
        return newBookmarks;
      });
    } catch (error) {
      console.error("Error updating bookmark:", error);
      toast({
        title: "Bookmark Update Failed",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (pagination.totalPages <= maxVisiblePages) {
      for (let i = 1; i <= pagination.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (pagination.currentPage > 3) {
        pages.push("ellipsis-start");
      }

      // Calculate range around current page
      const startPage = Math.max(2, pagination.currentPage - 1);
      const endPage = Math.min(
        pagination.totalPages - 1,
        pagination.currentPage + 1
      );

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (pagination.currentPage < pagination.totalPages - 2) {
        pages.push("ellipsis-end");
      }

      // Always show last page
      pages.push(pagination.totalPages);
    }

    return pages;
  };

  return (
    <div className="bg-gray-50 w-full min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-Primary/80 h-[300px]">
        <img
          src={CH}
          alt="Hero Background"
          className="absolute opacity-50 w-full h-full object-cover"
        />

        <div className="relative flex flex-col justify-center items-center space-y-6 px-4 h-full">
          {/* Search Bar */}
          <div className="flex items-center bg-white shadow-lg md:py-2 rounded-full w-full max-w-[700px]">
            <Search className="ml-4 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What are you looking for?"
              className="flex-grow px-4 py-3 rounded-full outline-none text-sm"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-4 w-full max-w-[300px]">
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="bg-white rounded-full">
                <MapPin className="mr-2 w-4 h-4" />
                <SelectValue placeholder="State">
                  {selectedState === "All" ? "State" : selectedState}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {stateOptions.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="bg-white rounded-full">
                <ListFilter className="mr-2 w-4 h-4" />
                <SelectValue placeholder="Category">
                  {selectedCategory === "All" ? "Category" : selectedCategory}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {categoriesOptions.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="mx-auto px-4 py-8 container">
        <h2 className="mb-6 font-semibold text-2xl">
          {selectedCategory !== "All"
            ? `${selectedCategory} Products`
            : "Featured Products"}
          {selectedState !== "All" ? ` in ${selectedState}` : ""}
        </h2>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="border-Primary border-t-2 border-b-2 rounded-full w-12 h-12 animate-spin"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col justify-center items-center px-4 py-16">
            {/* Animated Illustration */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-Primary/10 rounded-full animate-pulse" />
              <div className="relative bg-white shadow-xl p-6 rounded-full">
                <div className="relative w-24 h-24 animate-float">
                  <Search className="opacity-80 w-full h-full text-Primary" />
                  <div className="-top-1 -right-1 absolute bg-Primary/20 p-2 rounded-full animate-bounce-slow">
                    <ListFilter className="w-4 h-4 text-Primary" />
                  </div>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="-top-4 -left-4 absolute bg-Primary/5 rounded-full w-8 h-8 animate-bounce-slow" />
              <div className="-right-6 -bottom-2 absolute bg-Primary/10 rounded-full w-12 h-12 animate-bounce-delayed" />
              <div className="top-1/2 -right-8 absolute bg-Primary/15 rounded-full w-6 h-6 animate-pulse" />
            </div>

            {/* Text Content */}
            <div className="space-y-3 mx-auto max-w-md text-center">
              <h3 className="bg-clip-text bg-gradient-to-r from-Primary to-Primary/60 font-bold text-gray-900 text-transparent text-2xl">
                No Products Found
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {selectedCategory !== "All" || selectedState !== "All" ? (
                  <>
                    We couldn't find any products matching your filters. Try
                    adjusting your search criteria or explore our other
                    categories.
                  </>
                ) : (
                  <>
                    Looks like we're still stocking up! Check back soon for
                    amazing products or try a different search term.
                  </>
                )}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {(selectedCategory !== "All" || selectedState !== "All") && (
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedState("All");
                    setSearchQuery("");
                  }}
                  className="flex items-center gap-2 bg-Primary/5 hover:bg-Primary/10 hover:shadow-lg hover:shadow-Primary/10 px-6 py-2 rounded-full font-medium text-Primary transition-all duration-300"
                >
                  <ListFilter className="w-4 h-4" />
                  Clear Filters
                </button>
              )}
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  const searchInput =
                    document.querySelector('input[type="text"]');
                  if (searchInput) searchInput.focus();
                }}
                className="flex items-center gap-2 bg-Primary hover:bg-Primary/90 hover:shadow-lg hover:shadow-Primary/20 px-6 py-2 rounded-full font-medium text-white transition-all duration-300"
              >
                <Search className="w-4 h-4" />
                New Search
              </button>
            </div>
          </div>
        ) : (
          <div className="gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                getAdBadge={getAdBadge}
                isBookmarked={bookmarkedProducts.has(product.id)}
                onBookmarkToggle={toggleBookmark}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <Pagination className="my-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    pagination.hasPreviousPage &&
                    handlePageChange(pagination.currentPage - 1)
                  }
                  className={
                    !pagination.hasPreviousPage
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {getPageNumbers().map((page, index) =>
                page === "ellipsis-start" || page === "ellipsis-end" ? (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={page === pagination.currentPage}
                      onClick={() => handlePageChange(page)}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    pagination.hasNextPage &&
                    handlePageChange(pagination.currentPage + 1)
                  }
                  className={
                    !pagination.hasNextPage
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default CustomerPage;
