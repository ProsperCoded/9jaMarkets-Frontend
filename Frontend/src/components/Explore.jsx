/**
 * ExploreSection
 *
 * This component renders the explore page with a search bar at the top and
 * a carousel of featured markets and malls below it. The search bar is connected
 * to the state and filters the data based on the user input. The component also
 * renders a link to place an ad and a button to navigate to the state page.
 * The component is responsive and the number of cards in the carousel changes
 * based on the screen size.
 *
 * @returns {JSX.Element} the explore page component
 */
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { Search } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import optimized category images
import Education from "../assets/optimized/categories/education-&-stationery.webp";
import RealEstate from "../assets/optimized/categories/real-Estate-&-housing.jpg";
import Events from "../assets/optimized/categories/events-&-entertainment.jpg";
import Technology from "../assets/optimized/categories/technology-services.jpeg";
import Cultural from "../assets/optimized/categories/cultural-experiences.jpg";
import Food from "../assets/optimized/categories/food-&-groceries.webp";
import Electronics from "../assets/optimized/categories/electronics&gadgets.webp";
import Fashion from "../assets/optimized/categories/fashion&accessories.jpg";
import Health from "../assets/optimized/categories/health&wellness.jpg";
import HomeImage from "../assets/optimized/categories/home&living.webp";
import Automobile from "../assets/optimized/categories/automobile-needs.webp";
import Traditional from "../assets/optimized/categories/traditional-crafts.jpg";
import Sports from "../assets/optimized/categories/sports&outdoor.jpg";
import Kids from "../assets/optimized/categories/kids&babyproducts.png";

import { FEATURED_MARKET_NAMES, FEATURED_MALLS_NAMES } from "@/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { MALLS, MARKETS, PRODUCT_CATEGORIES } from "../config";
import { convertToNestedList } from "../lib/util";

import {
  GraduationCap, // Education
  Building2, // Real Estate
  Music, // Events
  Laptop, // Technology
  Theater, // Cultural
  ShoppingBasket, // Food
  Smartphone, // Electronics
  Shirt, // Fashion
  Heart, // Health
  Home, // Home
  Car, // Automobile
  Paintbrush, // Traditional
  Trophy, // Sports
  Baby, // Kids
} from "lucide-react";
import { useContext } from "react";
import { MALLS_DATA_CONTEXT, MARKET_DATA_CONTEXT } from "@/contexts";

// Helper function to format category name from config format to display format
const formatCategoryName = (category) => {
  return category
    .split(" AND ")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" & ");
};

// Map the icons to their respective categories - ensure every category has an icon
const iconMapping = {
  EDUCATION: GraduationCap,
  REAL: Building2, // Changed from "REAL ESTATE" to just "REAL" to match first word extraction
  EVENTS: Music,
  TECHNOLOGY: Laptop,
  CULTURAL: Theater,
  FOOD: ShoppingBasket,
  ELECTRONICS: Smartphone,
  FASHION: Shirt,
  HEALTH: Heart,
  HOME: Home,
  AUTOMOBILE: Car,
  TRADITIONAL: Paintbrush,
  SPORTS: Trophy,
  KIDS: Baby,
};

// Map the images to their respective categories
const imageMapping = {
  "EDUCATION AND STATIONERY": Education,
  "REAL ESTATE AND HOUSING": RealEstate,
  "EVENTS AND ENTERTAINMENT": Events,
  "TECHNOLOGY SERVICES": Technology,
  "CULTURAL EXPERIENCES": Cultural,
  "FOOD AND GROCERIES": Food,
  "ELECTRONICS AND GADGETS": Electronics,
  "FASHION AND ACCESSORIES": Fashion,
  "HEALTH AND WELLNESS": Health,
  "HOME AND LIVING": HomeImage,
  "AUTOMOBILE NEEDS": Automobile,
  "TRADITIONAL CRAFTS": Traditional,
  "SPORTS AND OUTDOOR": Sports,
  "KIDS AND BABY PRODUCTS": Kids,
};

// Default fallback icon to prevent undefined icons
const FallbackIcon = ShoppingBasket;

// Generate category icons and categories objects dynamically
const categoryIcons = {};
const categories = {};

PRODUCT_CATEGORIES.forEach((category) => {
  const formattedName = formatCategoryName(category);
  // Extract only the first word for icon mapping
  const categoryKey = category.split(" ")[0];

  // Use the mapped icon or fallback to a default icon if not found
  categoryIcons[formattedName] = iconMapping[categoryKey] || FallbackIcon;
  categories[formattedName] = imageMapping[category];
});

function ExploreSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [columnNumber, setCardNumber] = useState(4); // Default to desktop (4 columns)
  const [isMobile, setIsMobile] = useState(false);
  const { marketsData } = useContext(MARKET_DATA_CONTEXT);
  const { mallsData } = useContext(MALLS_DATA_CONTEXT);
  const [prioritizedMarkets, setPrioritizedMarkets] = useState([]);
  const [prioritizedMalls, setPrioritizedMalls] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Set up responsive display and prioritize markets/malls
  useEffect(() => {
    // Handle responsive layout
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const newIsMobile = screenWidth < 768;
      setIsMobile(newIsMobile);

      if (screenWidth >= 1024) {
        // Desktop - 4 columns
        setCardNumber(4);
      } else if (screenWidth >= 768) {
        // Tablet - 3 columns
        setCardNumber(3);
      } else {
        // Mobile - 2 columns
        setCardNumber(2);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prioritize markets and malls based on featured lists
  useEffect(() => {
    if (marketsData.length > 0) {
      // Create a copy of the markets data to avoid mutating the original
      const marketsCopy = [...marketsData];

      // Sort markets based on priority list
      const sorted = marketsCopy.sort((a, b) => {
        const indexA = FEATURED_MARKET_NAMES.findIndex(
          (name) => a.name.toLowerCase() === name.toLowerCase()
        );
        const indexB = FEATURED_MARKET_NAMES.findIndex(
          (name) => b.name.toLowerCase() === name.toLowerCase()
        );

        // If both are in the featured list, sort by their position in the list
        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB;
        }

        // If only a is in the featured list, it comes first
        if (indexA !== -1) return -1;

        // If only b is in the featured list, it comes first
        if (indexB !== -1) return 1;

        // If neither is in the featured list, maintain original order
        return 0;
      });

      setPrioritizedMarkets(sorted);
    }

    if (mallsData.length > 0) {
      // Create a copy of the malls data
      const mallsCopy = [...mallsData];

      // Sort malls based on priority list
      const sorted = mallsCopy.sort((a, b) => {
        const indexA = FEATURED_MALLS_NAMES.findIndex(
          (name) => a.name.toLowerCase() === name.toLowerCase()
        );
        const indexB = FEATURED_MALLS_NAMES.findIndex(
          (name) => b.name.toLowerCase() === name.toLowerCase()
        );

        // If both are in the featured list, sort by their position in the list
        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB;
        }

        // If only a is in the featured list, it comes first
        if (indexA !== -1) return -1;

        // If only b is in the featured list, it comes first
        if (indexB !== -1) return 1;

        // If neither is in the featured list, maintain original order
        return 0;
      });

      setPrioritizedMalls(sorted);
    }
  }, [marketsData, mallsData]);

  // Filter markets and malls based on search query
  const filteredMarkets = useMemo(() => {
    if (!searchQuery) return prioritizedMarkets;
    return prioritizedMarkets.filter((market) =>
      market.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, prioritizedMarkets]);

  const filteredMalls = useMemo(() => {
    if (!searchQuery) return prioritizedMalls;
    return prioritizedMalls.filter((mall) =>
      mall.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, prioritizedMalls]);

  // for slides
  const nestedMarkets = useMemo(() => {
    const rowNumber = 3;
    return convertToNestedList(filteredMarkets, rowNumber, 12);
  }, [filteredMarkets]);

  const nestedMalls = useMemo(() => {
    const rowNumber = 2;
    return convertToNestedList(filteredMalls, rowNumber);
  }, [filteredMalls]);
  const navigate = useNavigate();

  return (
    <div className="bg-white py-12 lg:py-16 min-h-screen">
      <div className="mx-auto px-4 max-w-6xl container">
        {/* Search Section */}
        <div className="flex flex-col items-center space-y-6">
          <div className="relative flex items-center w-full max-w-3xl">
            <input
              type="text"
              placeholder="Search by state, market, or category..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="px-6 py-3 md:py-4 pr-[100px] border-2 border-Primary rounded-full focus:outline-none focus:ring-2 focus:ring-Primary/20 w-full text-sm md:text-base"
            />
            <button className="right-2 absolute flex justify-center items-center bg-[#F8912D] hover:bg-[#F8912D]/90 px-4 md:px-6 py-2 md:py-2.5 rounded-full text-white transition-colors">
              <Search className="w-5 h-5" />
              <span className="hidden md:inline ml-2">Search</span>
            </button>
          </div>
        </div>

        {/* Place Ad + Categories Section */}
        <div className="mt-12">
          {/* Mobile: Place Ad Button */}
          <div className="md:hidden mb-6">
            <button
              onClick={() => navigate("/ad")}
              className="flex justify-center items-center gap-3 bg-[#F8912D] hover:bg-[#F8912D]/90 shadow-lg p-4 rounded-xl w-full h-full text-white transition-all duration-200"
            >
              <FontAwesomeIcon icon={faPlus} className="text-xl" />
              <span className="font-semibold">Place Your Ad</span>
            </button>
          </div>

          <h2 className="mb-6 font-bold text-Primary text-xl md:text-2xl text-center">
            Categories
          </h2>

          <div className="flex md:flex-row flex-col gap-4">
            {/* Desktop: Place Ad Button */}
            <div className="hidden md:block">
              <button
                onClick={() => navigate("/ad")}
                className="group bg-orange hover:bg-orange/90 shadow-sm hover:shadow-md rounded-xl w-[200px] h-[200px] text-white transition-all duration-200"
              >
                <div className="flex flex-col justify-center items-center gap-3 p-4">
                  <div className="flex justify-center items-center bg-white/20 rounded-full w-10 h-10 group-hover:scale-110 transition-transform duration-200">
                    <FontAwesomeIcon icon={faPlus} className="text-xl" />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">Place Your Ad</div>
                    <p className="text-white/80 text-sm">Advertise here</p>
                  </div>
                </div>
              </button>
            </div>

            {/* Categories Swiper */}
            <div className="w-full md:max-w-[calc(100%-220px)]">
              <Swiper
                slidesPerView={columnNumber}
                spaceBetween={16}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="custom-swiper-pagination pb-8"
              >
                {Object.entries(categories).map(([name, imageUrl]) => (
                  <SwiperSlide key={name}>
                    <Link
                      to={`/products?category=${encodeURIComponent(
                        name.toUpperCase()
                      )}`}
                    >
                      <div className="group h-[200px] cursor-pointer">
                        <div className="relative rounded-xl h-full overflow-hidden">
                          <img
                            src={imageUrl}
                            alt={name}
                            className="w-full h-full object-cover"
                          />
                          <div className="group-hover:bg-black/60 absolute inset-0 bg-black/50 transition-colors duration-200" />
                          <div className="absolute inset-0 flex flex-col justify-center items-center p-4 text-white">
                            {React.createElement(categoryIcons[name], {
                              className:
                                "w-6 h-6 mb-2 group-hover:scale-110 transition-transform duration-200",
                            })}
                            <h3 className="font-medium text-sm text-center">
                              {name}
                            </h3>
                          </div>
                          <h3 className="font-semibold text-white text-sm md:text-base text-center">
                            {name}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>

        {/* Markets Section */}
        <div className="mb-16">
          <h2 className="mb-8 font-bold text-Primary text-xl md:text-2xl text-center">
            Featured Markets
          </h2>
          <div className="relative mx-auto max-w-6xl">
            <Swiper
              // slidesPerView={columnNumber}
              spaceBetween={16}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={{
                nextEl: ".swiper-button-next-markets", // Fixed class name
                prevEl: ".swiper-button-prev-markets", // Fixed class name
              }}
              modules={[Pagination, Navigation]}
              className="custom-swiper-pagination pb-10"
              initialSlide={0}
              watchSlidesProgress={true}
              slidesPerGroup={1}
              breakpoints={{
                320: {
                  slidesPerView: 2,
                  slidesPerGroup: 1,
                  spaceBetween: 12,
                },
                768: {
                  slidesPerView: 3,
                  slidesPerGroup: 1,
                  spaceBetween: 16,
                },
                1024: {
                  slidesPerView: 4,
                  slidesPerGroup: 1,
                  spaceBetween: 20,
                },
              }}
            >
              {/* First Slide - Grid View */}
              {nestedMarkets.map((markets, index) => {
                return (
                  <SwiperSlide>
                    {/* grid-cols-1 md:grid-cols-3 lg:grid-cols-4 */}
                    <div className="gap-4 md:gap-6 grid grid-rows-3 overflow-visible">
                      {markets.map((market) => (
                        <div
                          key={market.id || market.name}
                          className="bg-white shadow-lg hover:shadow-xl rounded-xl overflow-hidden hover:scale-105 transition-all duration-200"
                        >
                          <Link to={`/markets/${market.id}`}>
                            <img
                              src={market.displayImage}
                              alt={market.name}
                              className="w-full object-cover aspect-[4/3]"
                              loading="lazy"
                            />
                            <div className="p-4 min-h-[5rem]">
                              <h3 className="mb-1 font-bold text-gray-800 text-base md:text-lg">
                                {market.name}
                              </h3>
                              <p className="text-gray-600 text-sm md:text-base">
                                {market.address}
                              </p>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            {/* Custom Navigation Buttons - Fixed class names */}
            {filteredMarkets.length > (isMobile ? 8 : 12) && (
              <>
                <button className="top-1/2 -left-4 z-10 absolute flex justify-center items-center bg-white hover:bg-gray-50 shadow-md rounded-full w-10 h-10 -translate-y-1/2 cursor-pointer swiper-button-prev-markets transform">
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>
                <button className="top-1/2 -right-4 z-10 absolute flex justify-center items-center bg-white hover:bg-gray-50 shadow-md rounded-full w-10 h-10 -translate-y-1/2 cursor-pointer swiper-button-next-markets transform">
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Malls Section */}
        <div>
          <h2 className="mb-8 font-bold text-Primary text-xl md:text-2xl text-center">
            Featured Malls
          </h2>
          <div className="relative mx-auto max-w-6xl">
            <Swiper
              spaceBetween={16}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={{
                nextEl: ".swiper-button-next-malls", // Fixed class name
                prevEl: ".swiper-button-prev-malls", // Fixed class name
              }}
              modules={[Pagination, Navigation]}
              className="custom-swiper-pagination pb-10"
              initialSlide={0}
              watchSlidesProgress={true}
              slidesPerGroup={1}
              breakpoints={{
                320: {
                  slidesPerView: 2,
                  slidesPerGroup: 1,
                  spaceBetween: 12,
                },
                768: {
                  slidesPerView: 3,
                  slidesPerGroup: 1,
                  spaceBetween: 16,
                },
                1024: {
                  slidesPerView: 4,
                  slidesPerGroup: 1,
                  spaceBetween: 20,
                },
              }}
            >
              {/* Using the same nested layout as markets */}
              {nestedMalls.map((malls, index) => (
                <SwiperSlide key={index}>
                  <div className="gap-4 md:gap-6 grid grid-rows-2">
                    {malls.map((mall) => (
                      <div
                        key={mall.id || mall.name}
                        className="bg-white shadow-lg hover:shadow-xl rounded-xl overflow-hidden hover:scale-105 transition-all duration-200"
                      >
                        <Link to={`/malls/${mall.id}`}>
                          <img
                            src={mall.displayImage}
                            alt={mall.name}
                            className="w-full object-cover aspect-[4/3]"
                            loading="lazy"
                          />
                          <div className="p-4 min-h-[5rem]">
                            <h3 className="mb-1 font-bold text-gray-800 text-base md:text-lg">
                              {mall.name}
                            </h3>
                            <p className="text-gray-600 text-sm md:text-base">
                              {mall.address}
                            </p>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Buttons - Fixed class names */}
            {filteredMalls.length > 8 && (
              <>
                <button className="top-1/2 -left-4 z-10 absolute flex justify-center items-center bg-white hover:bg-gray-50 shadow-md rounded-full w-10 h-10 -translate-y-1/2 cursor-pointer swiper-button-prev-malls transform">
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>
                <button className="top-1/2 -right-4 z-10 absolute flex justify-center items-center bg-white hover:bg-gray-50 shadow-md rounded-full w-10 h-10 -translate-y-1/2 cursor-pointer swiper-button-next-malls transform">
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Add custom styles for navigation buttons on mobile */}
        <style jsx>{`
          @media (max-width: 640px) {
            .swiper-button-prev-markets,
            .swiper-button-next-markets,
            .swiper-button-prev-malls,
            .swiper-button-next-malls {
              width: 32px;
              height: 32px;
            }

            .swiper-button-prev-markets,
            .swiper-button-prev-malls {
              left: 4px;
            }

            .swiper-button-next-markets,
            .swiper-button-next-malls {
              right: 4px;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
export default ExploreSection;
