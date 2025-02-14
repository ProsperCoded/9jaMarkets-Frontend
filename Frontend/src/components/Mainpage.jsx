import { useState, useEffect } from "react";
import { 
  Search,
  Bookmark, 
  BookmarkCheck,
  MapPin,
  ListFilter
} from "lucide-react";
import { PRODUCT_CATEGORIES, STATES } from "../config";
import CH from "../assets/customerhero.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Card,
  CardContent,
} from "./ui/card";
import { Button } from "./ui/button";

const MainPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [bookmarkedProducts, setBookmarkedProducts] = useState(new Set());

  // Simulated Product Data - In real app, this would come from an API
  const products = [
    { id: 1, name: "Classic Dry Iron", price: 40000, image: "/path/to/iron.jpg", category: "Home & Living" },
    { id: 2, name: "Samsung TV", price: 100000, image: "/path/to/tv.jpg", category: "Electronics & Gadgets" },
    { id: 3, name: "Refrigerator", price: 140000, image: "/path/to/refrigerator.jpg", category: "Home & Living" },
    { id: 4, name: "Multipurpose Blender", price: 40000, image: "/path/to/blender.jpg", category: "Home & Living" },
    { id: 5, name: "Washing Machine", price: 79000, image: "/path/to/washer.jpg", category: "Home & Living" },
    { id: 6, name: "Kitchen Oven", price: 200000, image: "/path/to/oven.jpg", category: "Home & Living" },
    { id: 7, name: "Counter Microwave", price: 58000, image: "/path/to/microwave.jpg", category: "Home & Living" },
    { id: 8, name: "Home Theatre Set", price: 180000, image: "/path/to/home-theatre.jpg", category: "Electronics & Gadgets" },
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
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  };

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

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-Primary/80">
        <img
          src={CH}
          alt="Hero Background"
          className="absolute w-full h-full object-cover opacity-50"
        />

        <div className="relative flex flex-col items-center justify-center h-full px-4 space-y-6">
          {/* Search Bar */}
          <div className="flex items-center w-full max-w-[500px] bg-white rounded-full shadow-lg">
            <Search className="ml-4 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What are you looking for?"
              className="flex-grow px-4 py-3 text-sm outline-none rounded-full"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-4 w-full max-w-[300px]">
            <Select>
              <SelectTrigger className="bg-white rounded-full">
                <MapPin className="mr-2 h-4 w-4" />
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
                <ListFilter className="mr-2 h-4 w-4" />
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
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden group">
              <div className="aspect-square relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2 rounded-full bg-Primary/80 text-white hover:bg-Primary transition-colors"
                  onClick={() => toggleBookmark(product.id)}
                >
                  {bookmarkedProducts.has(product.id) ? (
                    <BookmarkCheck className="h-5 w-5y" />
                  ) : (
                    <Bookmark className="h-5 w-5" />
                  )}
                </Button>
              </div>
              <CardContent className="p-3">
                <h3 className="font-medium text-sm truncate">{product.name}</h3>
                <p className="text-Primary font-bold text-sm">
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

export default MainPage;
