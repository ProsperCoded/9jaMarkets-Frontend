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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { PRODUCT_CATEGORIES } from "@/config";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useErrorLogger } from "@/hooks";
import { getMarketProducts } from "@/lib/api/marketApi";
import { useContext } from "react";
import { MARKET_DATA_CONTEXT } from "@/contexts";
import LoadingPage from "@/componets-utils/LoadingPage";
import NotFoundPage from "@/components/NotFoundPage";
import {
  faInfoCircle,
  faMapMarkerAlt,
  faMap,
} from "@fortawesome/free-solid-svg-icons";
import { useMemo } from "react";
const Marketplace = () => {
  const categories = ["All Categories", ...PRODUCT_CATEGORIES];
  const errorLogger = useErrorLogger();
  const { id: marketId } = useParams();
  const [products, setProducts] = useState();
  const { marketsData } = useContext(MARKET_DATA_CONTEXT);
  const market = marketsData.find((market) => market.id === marketId);
  const fetchProducts = async () => {
    const marketProducts = await getMarketProducts(marketId, errorLogger);
    if (!marketProducts) return;
    setProducts(marketProducts);
  };
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (selectedCategory === "All Categories") return products;
    return products.filter((product) => product.category === selectedCategory);
  }, [products, selectedCategory]);
  useEffect(() => {
    fetchProducts();
  }, []);

  if (!market && marketsData.length > 0) {
    return <NotFoundPage />;
  }
  if (!market) return <LoadingPage message={"Market Could not be found"} />;
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
          src={market.displayImage}
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
        <div>
          <div className="flex-grow bg-white shadow-md mx-6 my-4 p-6 rounded-2xl">
            <div className="flex flex-wrap justify-center gap-2 mt-4 font-semibold md:text-lg">
              <div className="flex items-center border-green-700 mb-2 pr-3 border-r-2">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="mr-2 text-Primary"
                />
                <span className="text-gray-700">{market.address}</span>
              </div>
              <div className="flex items-center border-green-700 mb-2 pr-3 border-r-2 min-w-fit">
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  className="mr-2 text-Primary"
                />
                <span className="text-gray-700">{market.description}</span>
              </div>
              <div className="flex items-center mb-2">
                <FontAwesomeIcon icon={faMap} className="mr-2 text-Primary" />
                <span className="text-gray-700">{market.state}</span>
              </div>
            </div>
          </div>
          <div className="flex-grow bg-white shadow-md mt-8 mr-6 mb-8 ml-6 py-10 p-6 pb-20 rounded-2xl">
            <h3 className="font-bold text-xl">{selectedCategory}</h3>
            {/* Gray Line */}
            <div className="border-gray-200 mt-6 border-t-2"></div>
            {/* Product Grid */}
            <div className="gap-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mt-6">
              {filteredProducts.map((product, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg hover:shadow-xl rounded-2xl transform transition-transform duration-300 hover:scale-105"
                >
                  {/* Product Image */}
                  <img
                    src={product.displayImage && product.displayImage.url}
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
    </div>
  );
};

export default Marketplace;
