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
import { PRODUCT_CATEGORIES } from "../config";
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
import { MALLS_DATA_CONTEXT, MARKETS_DATA_CONTEXT } from "@/contexts";

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
  const { marketsData } = useContext(MARKETS_DATA_CONTEXT);
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
    <div className="bg-white py-8 lg:py-12 min-h-screen">
      <div className="mx-auto px-4 max-w-6xl container">
        {/* Search Section */}
        <div className="flex flex-col items-center mb-10">
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

          {/* Search Results */}
          {searchQuery && (
            <div className="w-full max-w-3xl mt-4 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Markets Results */}
              {filteredMarkets.length > 0 && (
                <div className="p-4">
                  <h3 className="text-Primary font-semibold mb-3">Markets</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {filteredMarkets.map((market) => (
                      <Link
                        key={market.id}
                        to={`/markets/${market.id}`}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={market.displayImage}
                            alt={market.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{market.name}</h4>
                          <p className="text-sm text-gray-500">{market.state}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Malls Results */}
              {filteredMalls.length > 0 && (
                <div className="p-4 border-t border-gray-100">
                  <h3 className="text-Primary font-semibold mb-3">Malls</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {filteredMalls.map((mall) => (
                      <Link
                        key={mall.id}
                        to={`/malls/${mall.id}`}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={mall.displayImage}
                            alt={mall.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{mall.name}</h4>
                          <p className="text-sm text-gray-500">{mall.state}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results */}
              {filteredMarkets.length === 0 && filteredMalls.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <p>No markets or malls found matching your search.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Categories Section */}
        <div className="mb-16 md:mb-20">
          <h2 className="mb-8 font-bold text-Primary text-xl md:text-2xl text-center">
            Categories
          </h2>
          <div className="flex justify-center">
            {/* Categories Swiper */}
            <div className="w-full">
              <Swiper
                slidesPerView="auto"
                spaceBetween={16}
                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  0: {
                    slidesPerView: 2,
                    spaceBetween: 12
                  },
                  640: {
                    slidesPerView: 4,
                    spaceBetween: 16
                  },
                  1024: {
                    slidesPerView: 6,
                    spaceBetween: 16
                  }
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
                      <div className="aspect-square">
                        <div className="relative rounded-xl h-full overflow-hidden">
                          <img
                            src={imageUrl}
                            alt={name}
                            className="w-full h-full object-cover"
                          />
                          <div className="group-hover:bg-black/60 absolute inset-0 bg-black/50 transition-colors duration-200" />
                          <div className="absolute inset-0 flex flex-col justify-center items-center p-3 text-white">
                            {React.createElement(categoryIcons[name], {
                              className:
                                "w-6 h-6 mb-2 group-hover:scale-110 transition-transform duration-200",
                            })}
                            <h3 className="font-medium text-xs md:text-sm text-center">
                              {name}
                            </h3>
                          </div>
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
        <div className="mb-16 md:mb-20">
          <h2 className="mb-8 font-bold text-Primary text-xl md:text-2xl text-center">
            Featured Markets
          </h2>
          <div className="relative mx-auto">
            <Swiper
              spaceBetween={16}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={{
                nextEl: ".swiper-button-next-markets",
                prevEl: ".swiper-button-prev-markets",
              }}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                  spaceBetween: 12
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 16
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 16
                }
              }}
              modules={[Pagination, Navigation]}
              className="pb-10 relative"
            >
              {/* First Slide - Grid View */}
              {nestedMarkets.map((markets, index) => (
                <SwiperSlide key={`market-slide-${index}`}>
                  <div className="gap-4 md:gap-6 grid grid-rows-3 overflow-visible">
                    {markets.map((market) => (
                      <div
                        key={market.id || market.name}
                        className="group relative bg-white shadow-sm hover:shadow-md rounded-xl overflow-hidden transition-all duration-200"
                      >
                        <Link to={`/markets/${market.id}`}>
                          <div className="relative">
                            <img
                              src={market.displayImage}
                              alt={market.name}
                              className="w-full object-cover aspect-video"
                              loading="lazy"
                            />
                            {/* State Badge - Absolute positioned */}
                            <span className="top-2 right-2 absolute bg-white/90 shadow-sm px-2 py-0.5 rounded-full font-medium text-gray-700 text-xs">
                              {market.state}
                            </span>
                            {/* Description Overlay on Hover */}
                            <div className="absolute inset-0 flex justify-center items-center bg-black/70 opacity-0 group-hover:opacity-100 p-3 transition-opacity duration-200">
                              <p className="text-white text-xs text-center line-clamp-2">
                                {market.description || "No description available"}
                              </p>
                            </div>
                          </div>
                          <div className="p-2">
                            <h3 className="font-medium text-gray-800 text-xs md:text-sm">
                              {market.name}
                            </h3>
                            <p className="text-gray-600 text-xs truncate">
                              {market.address}
                            </p>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </SwiperSlide>
              ))}
              {/* Navigation Arrows */}
              <div className="swiper-button-prev-markets absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-orange hover:bg-orange/90 rounded-full w-8 h-8 flex items-center justify-center shadow-md cursor-pointer transition-colors">
                <ChevronLeft className="w-5 h-5 text-white" />
              </div>
              <div className="swiper-button-next-markets absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-orange hover:bg-orange/90 rounded-full w-8 h-8 flex items-center justify-center shadow-md cursor-pointer transition-colors">
                <ChevronRight className="w-5 h-5 text-white" />
              </div>
            </Swiper>
          </div>
        </div>

        {/* Malls Section */}
        <div className="mb-16 md:mb-20">
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
                nextEl: ".swiper-button-next-malls",
                prevEl: ".swiper-button-prev-malls",
              }}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                  spaceBetween: 12
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 16
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 16
                }
              }}
              modules={[Pagination, Navigation]}
              className="pb-10 relative"
            >
              {/* Using the same nested layout as markets */}
              {nestedMalls.map((malls, index) => (
                <SwiperSlide key={`mall-slide-${index}`}>
                  <div className="gap-4 md:gap-6 grid grid-rows-2">
                    {malls.map((mall) => (
                      <div
                        key={mall.id || mall.name}
                        className="group relative bg-white shadow-sm hover:shadow-md rounded-xl overflow-hidden transition-all duration-200"
                      >
                        <Link to={`/malls/${mall.id}`}>
                          <div className="relative">
                            <img
                              src={mall.displayImage}
                              alt={mall.name}
                              className="w-full object-cover aspect-video"
                              loading="lazy"
                            />
                            {/* State Badge */}
                            <span className="top-2 right-2 absolute bg-white/90 shadow-sm px-2 py-0.5 rounded-full font-medium text-gray-700 text-xs">
                              {mall.state}
                            </span>
                            {/* Description Overlay on Hover */}
                            <div className="absolute inset-0 flex justify-center items-center bg-black/70 opacity-0 group-hover:opacity-100 p-3 transition-opacity duration-200">
                              <p className="text-white text-xs text-center line-clamp-2">
                                {mall.description || "No description available"}
                              </p>
                            </div>
                          </div>
                          <div className="p-2">
                            <h3 className="font-medium text-gray-800 text-xs md:text-sm">
                              {mall.name}
                            </h3>
                            <p className="text-gray-600 text-xs truncate">
                              {mall.address}
                            </p>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </SwiperSlide>
              ))}
              {/* Navigation Arrows */}
              <div className="swiper-button-prev-malls absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-orange hover:bg-orange/90 rounded-full w-8 h-8 flex items-center justify-center shadow-md cursor-pointer transition-colors">
                <ChevronLeft className="w-5 h-5 text-white" />
              </div>
              <div className="swiper-button-next-malls absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-orange hover:bg-orange/90 rounded-full w-8 h-8 flex items-center justify-center shadow-md cursor-pointer transition-colors">
                <ChevronRight className="w-5 h-5 text-white" />
              </div>
            </Swiper>
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
