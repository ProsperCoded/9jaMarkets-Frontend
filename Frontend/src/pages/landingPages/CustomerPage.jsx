import { useState, useEffect } from "react";
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

const CustomerPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [bookmarkedProducts, setBookmarkedProducts] = useState(new Set());

  // Simulated Product Data - In real app, this would come from an API
  const products = [
    {
      id: 1,
      name: "Classic Dry Iron",
      price: 40000,
      image: "/path/to/iron.jpg",
      category: "Home & Living",
    },
    {
      id: 2,
      name: "Samsung TV",
      price: 100000,
      image: "/path/to/tv.jpg",
      category: "Electronics & Gadgets",
    },
    {
      id: 3,
      name: "Refrigerator",
      price: 140000,
      image: "/path/to/refrigerator.jpg",
      category: "Home & Living",
    },
    {
      id: 4,
      name: "Multipurpose Blender",
      price: 40000,
      image: "/path/to/blender.jpg",
      category: "Home & Living",
    },
    {
      id: 5,
      name: "Washing Machine",
      price: 79000,
      image: "/path/to/washer.jpg",
      category: "Home & Living",
    },
    {
      id: 6,
      name: "Kitchen Oven",
      price: 200000,
      image: "/path/to/oven.jpg",
      category: "Home & Living",
    },
    {
      id: 7,
      name: "Counter Microwave",
      price: 58000,
      image: "/path/to/microwave.jpg",
      category: "Home & Living",
    },
    {
      id: 8,
      name: "Home Theatre Set",
      price: 180000,
      image: "/path/to/home-theatre.jpg",
      category: "Electronics & Gadgets",
    },
  ];

  useEffect(() => {
    filterProducts();
  }, [searchQuery, selectedCategory]);

  const filterProducts = () => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    setFilteredProducts(filtered);
  };

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
          <div className="flex items-center bg-white shadow-lg rounded-full w-full max-w-[500px]">
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
            <Select>
              <SelectTrigger className="bg-white rounded-full">
                <MapPin className="mr-2 w-4 h-4" />
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent>
                {STATES.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="bg-white rounded-full">
                <ListFilter className="mr-2 w-4 h-4" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {["All Categories", ...PRODUCT_CATEGORIES].map((category) => (
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
        <h2 className="mb-6 font-semibold text-2xl">Featured Products</h2>
        <div className="gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden group">
              <div className="relative aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="top-2 right-2 absolute bg-Primary/80 hover:bg-Primary rounded-full text-white transition-colors"
                  onClick={() => toggleBookmark(product.id)}
                >
                  {bookmarkedProducts.has(product.id) ? (
                    <BookmarkCheck className="w-5y h-5" />
                  ) : (
                    <Bookmark className="w-5 h-5" />
                  )}
                </Button>
              </div>
              <CardContent className="p-3">
                <h3 className="font-medium text-sm truncate">{product.name}</h3>
                <p className="font-bold text-Primary text-sm">
                  ₦{product.price.toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
