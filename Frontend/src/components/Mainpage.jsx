import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CH from "../assets/customerhero.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

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

  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full h-[300px]">
        {/* Hero background image */}
        <img
          src={CH} // Replace with your actual image path
          alt="Hero Background"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        {/* Overlay content */}
        <div className="relative flex flex-col items-center justify-center h-full">
          {/* Search Bar */}
          <div className="flex items-center bg-white rounded-full shadow-lg w-[80%] max-w-[500px] px-3 py-2">
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
          <div className="flex gap-4 mt-4">
            <button className="bg-white border border-gray-300 text-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md">
              State
            </button>
            <button className="bg-white border border-gray-300 text-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md">
              Category
            </button>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-white rounded-2xl py-10 shadow-md mx-6 my-8 p-6 pb-20">
        <h3 className="font-bold text-xl">Products</h3>
        {/* Gray Line */}
        <div className="mt-6 border-t-2 border-gray-200"></div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-t-2xl"
              />
              {/* Product Details */}
              <div className="flex justify-between items-center p-4">
                <div>
                  <h4 className="text-sm text-gray-800">{product.name}</h4>
                  <p className="text-green-700 font-thin mt-2">
                    ₦{product.price.toLocaleString()}
                  </p>
                </div>
                <button className="bg-green-700 bg-opacity-20 text-green-700 py-3 px-4 rounded-full hover:bg-opacity-30">
                  <FontAwesomeIcon icon={faCartShopping} className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
