import React, { useState, useEffect } from "react";
import CH from "../assets/customerhero.png";
import { Bookmark, BookmarkPlus } from "lucide-react";

function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Simulated Product Data
  const products = [
    { name: "Classic Dry Iron", price: 40000, image: "/path/to/iron.jpg" },
    { name: "Samsung TV", price: 100000, image: "/path/to/tv.jpg" },
    { name: "Refrigerator", price: 140000, image: "/path/to/refrigerator.jpg" },
    { name: "Multipurpose Blender", price: 40000, image: "/path/to/blender.jpg" },
    { name: "Washing Machine", price: 79000, image: "/path/to/washer.jpg" },
    { name: "Kitchen Oven", price: 200000, image: "/path/to/oven.jpg" },
    { name: "Counter Microwave", price: 58000, image: "/path/to/microwave.jpg" },
    { name: "Home Theatre Set", price: 180000, image: "/path/to/home-theatre.jpg" },
  ];

  // Initialize filtered products
  useEffect(() => {
    setFilteredProducts(products);
  }, []);

  // Handle search query changes
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  const ProductCard = ({ product }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);

    const toggleBookmark = () => {
      setIsBookmarked((prev) => !prev);
    };

    return (
      <div className="relative bg-white rounded-2xl shadow-md hover:shadow-lg transform transition-transform duration-300 hover:scale-105 p-4 w-full max-w-sm">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-36 object-cover rounded-t-2xl"
        />

        {/* Product Details */}
        <div className="p-3 flex justify-between items-center">
          <div>
            <h4 className="text-sm font-semibold text-gray-800">{product.name}</h4>
            <p className="text-green-700 font-bold text-sm mt-1">
              ₦{product.price.toLocaleString()}
            </p>
          </div>
          
          {/* Bookmark Icon */}
          <button
            className="p-2 bg-white shadow-md rounded-full hover:bg-green-100 transition-colors"
            onClick={toggleBookmark}
          >
            {isBookmarked ? <Bookmark className="w-5 h-5 text-green-700" /> : <BookmarkPlus className="w-5 h-5 text-gray-500" />}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-[300px] bg-green-700 flex items-center justify-center">
        <img
          src={CH}
          alt="Nigeria Map"
          className="absolute w-full h-full object-cover opacity-50"
        />

        <div className="relative flex flex-col items-center w-full px-4">
          {/* Search Bar */}
          <div className="flex items-center bg-white rounded-full shadow-lg w-[90%] max-w-[500px] px-4 py-2">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="What are you looking for?"
              className="flex-grow text-sm px-2 py-1 outline-none rounded-l-full"
            />
            <button className="p-2 bg-green-700 rounded-full text-white flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M10.5 3.75a6.75 6.75 0 1 0 4.247 11.943l5.53 5.53a.75.75 0 0 0 1.06-1.06l-5.53-5.53A6.75 6.75 0 0 0 10.5 3.75ZM5.25 10.5a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z" />
              </svg>
            </button>
          </div>

          {/* Dropdowns */}
          <div className="flex flex-wrap gap-4 mt-4 justify-center">
            <button className="bg-white border border-gray-300 text-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md">
              State
            </button>
            <button className="bg-white border border-gray-300 text-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md">
              Category
            </button>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex justify-center overflow-x-auto whitespace-nowrap gap-2 p-4">
        {[
          "All Categories", "Appliances", "Automobiles", "Health & Beauty", "Home & Office",
          "Electronics", "Fashion", "Supermarket", "Computing", "Baby Products", "Gaming",
          "Sporting Goods", "Toys"
        ].map((category, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-full text-sm ${index === 0 ? "bg-Primary text-white" : "bg-white border border-gray-300"}`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Top Products Section */}
      <div className="px-6 sm:px-12 md:px-16 mb-12">
        <h3 className="text-lg font-semibold mb-4">TOP</h3>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
