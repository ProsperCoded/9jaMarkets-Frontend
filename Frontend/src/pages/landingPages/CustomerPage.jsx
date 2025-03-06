import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Search,
  Bookmark,
  BookmarkCheck,
  MapPin,
  ListFilter,
} from "lucide-react";
import { PRODUCT_CATEGORIES, STATES } from "@/config";
import CH from "@/assets/customerhero.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { getAuth } from "@/lib/util";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const CustomerPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Get initial category from URL params
  const initialCategory = searchParams.get("category") || "All";
  const initialState = searchParams.get("state") || "All";
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

  // Simulated advertised products - We'll merge these with API products
  const advertizedProducts = [
    {
      id: "adv1",
      name: "Classic Dry Iron",
      price: 40000,
      image: "/path/to/iron.jpg",
      category: "Home & Living",
      advertised: true,
    },
    {
      id: "adv2",
      name: "Samsung TV",
      price: 100000,
      image: "/path/to/tv.jpg",
      category: "Electronics & Gadgets",
      advertised: true,
    },
    // ...other advertised products
  ];

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
            category: selectedCategory !== "All" ? selectedCategory : null,
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
          // Transform API data to match our format
          const apiProducts = productsData.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.displayImage?.url,
            category: item.category,
            advertised: false,
            // Add any other fields from the API that you need
          }));

          setPagination({
            currentPage: productsData.currentPage,
            totalPages: productsData.totalPages,
            totalItems: productsData.totalItems,
            hasNextPage: productsData.hasNextPage,
            hasPreviousPage: productsData.hasPreviousPage,
          });

          // Combine with advertized products for display
          setProducts([...advertizedProducts, ...apiProducts]);
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
              className="flex-grow px-4 py-3 rounded-full text-sm outline-none"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-4 w-full max-w-[300px]">
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="bg-white rounded-full">
                <MapPin className="mr-2 w-4 h-4" />
                <SelectValue placeholder="State" />
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
                <SelectValue placeholder="Category" />
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
          <div className="py-10 text-center">
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        ) : (
          <div className="gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <Link to={`/products/${product.id}`} key={product.id}>
                <Card key={product.id} className="overflow-hidden group">
                  <div className="relative bg-gray-100 aspect-square">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {product.advertised && (
                      <div className="top-2 left-2 absolute bg-Primary px-2 py-1 rounded-full text-white text-xs">
                        Featured
                      </div>
                    )}
                    <Button
                      size="icon"
                      variant="ghost"
                      className="top-2 right-2 absolute bg-Primary/80 hover:bg-Primary rounded-full text-white transition-colors"
                      onClick={() => toggleBookmark(product.id)}
                    >
                      {bookmarkedProducts.has(product.id) ? (
                        <BookmarkCheck className="w-5 h-5" />
                      ) : (
                        <Bookmark className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm truncate">
                      {product.name}
                    </h3>
                    <p className="font-bold text-Primary text-sm">
                      ₦{product.price?.toLocaleString() || "N/A"}
                    </p>
                  </CardContent>
                </Card>
              </Link>
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
