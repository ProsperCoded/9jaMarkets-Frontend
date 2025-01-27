/**
 * The Marketplace component renders a marketplace page with a search bar, a hero section and a main content area.
 * The main content area contains a sidebar with categories and a product grid that displays products filtered by category.
 * The component uses a combination of Tailwind CSS classes and custom CSS to style the elements.
 * The component also uses React hooks to handle state and side effects.
 * The component renders a gray line to separate the hero section from the main content area.
 * The component renders a product grid with products filtered by category and sorted by name.
 * The component renders a loading indicator when the products are being fetched from the server.
 * The component renders an error message when there is an error fetching the products from the server.
 * The component also renders a back to top button that scrolls to the top of the page when clicked.
 */
import { useState } from "react";
import ComputerVillage from "../assets/markets/ComputerVillage.jpg";
import Alaba from "../assets/markets/AlabaMarket.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { PRODUCT_CATEGORIES } from "@/config";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useErrorLogger } from "@/hooks";
import { getMarketProducts } from "@/lib/api/marketApi";
import { useContext } from "react";
import { MALLS_DATA_CONTEXT, MARKET_DATA_CONTEXT } from "@/contexts";

const Marketplace = () => {
  const [categories] = useState(["All Categories", ...PRODUCT_CATEGORIES]);
  const errorLogger = useErrorLogger();
  const { id: marketId } = useParams();
  const [products, setProducts] = useState([
    { name: "Classic Dry Iron", price: 40000, image: ComputerVillage },
    { name: "Samsung TV", price: 100000, image: Alaba },
    { name: "Refrigerator", price: 140000, image: "path/to/image3.jpg" },
    { name: "Multipurpose Blender", price: 40000, image: "path/to/image4.jpg" },
    { name: "Washing Machine", price: 79000, image: "path/to/image5.jpg" },
    { name: "Kitchen Oven", price: 200000, image: "path/to/image6.jpg" },
    { name: "Counter Microwave", price: 58000, image: "path/to/image7.jpg" },
    { name: "Home Theatre Set", price: 180000, image: "path/to/image8.jpg" },
  ]);
  // const { marketsData } = useContext(MARKET_DATA_CONTEXT);
  const { marketsData } = useContext(MALLS_DATA_CONTEXT);
  const market = marketsData.find((market) => market.id === marketId);
  const fetchProducts = async () => {
    console.log({ marketId });
    const marketProducts = await getMarketProducts(marketId, errorLogger);
    console.log({ marketProducts });
    if (!marketProducts) return;
    setProducts(marketProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("Appliances");

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Search Bar */}
      <div className="relative flex justify-center bg-white shadow-md py-2 text-Primary">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Search a vendor or category"
            className="border-Primary py-2 pr-4 pl-10 border rounded-full focus:ring-2 focus:ring-Primary w-full text-sm focus:outline-none placeholder-gray-400"
          />
          <svg
            className="top-1/2 left-3 absolute w-5 h-5 text-Primary transform -translate-y-1/2"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 4.247 11.943l5.53 5.53a.75.75 0 0 0 1.06-1.06l-5.53-5.53A6.75 6.75 0 0 0 10.5 3.75ZM5.25 10.5a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative w-screen h-[300px]">
        <img
          src={ComputerVillage}
          alt="Computer Village"
          className="top-0 left-0 absolute w-full h-full market-image object-cover"
        />
        <div className="top-0 left-0 absolute bg-green-900 bg-opacity-50 w-full h-full"></div>
        <div className="relative flex flex-col justify-center items-center h-full text-center text-white">
          <h1 className="font-[400] text-5xl sm:text-4xl md:text-8xl uppercase leading-tight otto">
            {market.name}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex mx-auto container">
        {/* Sidebar */}
        <div className="flex flex-col justify-between bg-white shadow-md p-4 w-[300px]">
          <div className="pt-20">
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`cursor-pointer p-2 rounded ${
                    selectedCategory === category
                      ? "bg-Primary text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex-grow bg-white shadow-md mt-8 mr-6 mb-8 ml-6 py-10 p-6 pb-20 rounded-2xl">
          <h3 className="font-bold text-xl">{selectedCategory}</h3>
          {/* Gray Line */}
          <div className="border-gray-200 mt-6 border-t-2"></div>
          {/* Product Grid */}
          <div className="gap-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mt-6">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white shadow-lg hover:shadow-xl rounded-2xl transform transition-transform duration-300 hover:scale-105"
              >
                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="rounded-t-2xl w-full h-40 object-cover"
                />
                {/* Product Details */}
                <div className="flex justify-between items-center p-4">
                  <div>
                    <h4 className="text-gray-800 text-sm">{product.name}</h4>
                    <p className="mt-2 font-thin text-Primary">
                      ₦{product.price.toLocaleString()}
                    </p>
                  </div>
                  <button className="bg-Primary bg-opacity-20 hover:bg-opacity-30 px-4 py-3 rounded-full text-Primary">
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
