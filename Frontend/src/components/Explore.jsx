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
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import "./styles.css";

// Import images for markets and malls
import AlabaMarket from "../assets/markets/AlabaMarket.jpg";
import BodijaMarket from "../assets/markets/BodijaMarket.jpg";
import OilMillMarket from "../assets/markets/OilMillMarket.jpg";
import ComputerVillage from "../assets/markets/ComputerVillage.jpg";
import OnitshaMarket from "../assets/markets/OnitshaMarket.jpg";
import IkejaMall from "../assets/malls/IkejaMall.jpg";
import PalmsMall from "../assets/malls/PalmsMall.jpg";
import OnitshaMall from "../assets/malls/OnitshaMall.jpg";
import AdoBayeroMall from "../assets/malls/AdoBayeroMall.jpg";
import JabiLakeMall from "../assets/malls/JabiLakeMall.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Select from "./../componets-utils/Select";
import { useMemo } from "react";
import { MALLS, MARKETS } from "../config";
// import { Select } from "shadcn";
import Education from "../assets/categories/education-&-stationery.webp";
import RealEstate from "../assets/categories/real-Estate-&-housing.jpg";
import Events from "../assets/categories/events-&-entertainment.jpg";
import Technology from "../assets/categories/technology-services.jpeg";
import Cultural from "../assets/categories/cultural-experiences.jpg";
import Food from "../assets/categories/food-&-groceries.webp";
import Electronics from "../assets/categories/electronics&gadgets.webp";
import Fashion from "../assets/categories/fashion&accessories.jpg";
import Health from "../assets/categories/health&wellness.jpg";
import HomeImage from "../assets/categories/home&living.webp";
import Automobile from "../assets/categories/automobile-needs.webp";
import Traditional from "../assets/categories/traditional-crafts.jpg";
import Sports from "../assets/categories/sports&outdoor.jpg";
import Kids from "../assets/categories/kids&babyproducts.png";


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
  Baby // Kids
} from 'lucide-react';

const allMarkets = Object.values(MARKETS).flat();
const allMalls = Object.values(MALLS).flat();
const featuredMarkets = [
  { name: "Alaba Market", location: "Lagos State", imageUrl: AlabaMarket },
  { name: "Bodija Market", location: "Oyo State", imageUrl: BodijaMarket },
  {
    name: "Oil Mill Market",
    location: "Rivers State",
    imageUrl: OilMillMarket,
  },
  {
    name: "Computer Village",
    location: "Lagos State",
    imageUrl: ComputerVillage,
  },
  {
    name: "Onitsha Main Market",
    location: "Anambra State",
    imageUrl: OnitshaMarket,
  },
];

const featuredMalls = [
  { name: "Ikeja City Mall", location: "Lagos State", imageUrl: IkejaMall },
  { name: "Palms Shopping Mall", location: "Oyo State", imageUrl: PalmsMall },
  { name: "Onitsha Mall", location: "Anambra State", imageUrl: OnitshaMall },
  { name: "Ado Bayero Mall", location: "Kano State", imageUrl: AdoBayeroMall },
  { name: "Jabi Lake Mall", location: "Abuja", imageUrl: JabiLakeMall },
];

// Update the categoryIcons mapping
const categoryIcons = {
  "Education & Stationery": GraduationCap,
  "Real Estate & Housing": Building2,
  "Events & Entertainment": Music,
  "Technology Services": Laptop,
  "Cultural Experiences": Theater,
  "Food & Groceries": ShoppingBasket,
  "Electronics & Gadgets": Smartphone,
  "Fashion & Accessories": Shirt,
  "Health & Wellness": Heart,
  "Home & Living": Home,
  "Automobile Needs": Car,
  "Traditional Crafts": Paintbrush,
  "Sports & Outdoor": Trophy,
  "Kids & Baby Products": Baby,
};

// Add back the categories object
const categories = {
  "Education & Stationery": Education,
  "Real Estate & Housing": RealEstate,
  "Events & Entertainment": Events,
  "Technology Services": Technology,
  "Cultural Experiences": Cultural,
  "Food & Groceries": Food,
  "Electronics & Gadgets": Electronics,
  "Fashion & Accessories": Fashion,
  "Health & Wellness": Health,
  "Home & Living": HomeImage,
  "Automobile Needs": Automobile,
  "Traditional Crafts": Traditional,
  "Sports & Outdoor": Sports,
  "Kids & Baby Products": Kids,
};

function ExploreSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };
  // define a default number of cards to show
  const [cardNumber, setCardNumber] = useState(1);
  const [screenProperties, setScreenProperties] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isExtraLarge: false,
  });
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 600;
      const isIPad = window.innerWidth >= 600 && window.innerWidth < 1024;
      const isDesktop = window.innerWidth >= 1024 && window.innerWidth < 1440;
      const isExtraLarge = window.innerWidth >= 1440;
      setScreenProperties({ isMobile, isIPad, isDesktop, isExtraLarge });
      const newCardNumber = isExtraLarge
        ? 5
        : isDesktop
        ? 4
        : isIPad
        ? 3
        : isMobile
        ? 2
        : 1;

      setCardNumber(newCardNumber);
    };

    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [selected, setSelected] = useState(0);
  const options = ["go to", "state", "markets", "category"];
  const marketsData = useMemo(() => {
    if (!searchQuery) return featuredMarkets;

    const filteredData = allMarkets
      .filter((market) => market.name.toLowerCase().includes(searchQuery))
      // limit
      .slice(0, 20);
    return filteredData;
  }, [searchQuery]);
  const mallsData = useMemo(() => {
    if (!searchQuery) return featuredMalls;

    const filteredData = allMalls
      .filter((mall) => mall.name.toLowerCase().includes(searchQuery))
      // limit
      .slice(0, 20);
    return filteredData;
  }, [searchQuery]);
  return (
    <div className="min-h-screen bg-white py-12 lg:py-16 explore-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Search Section */}
        <div className="mb-12">
          <div className="flex flex-col justify-center items-center w-full">
            <div className="relative flex flex-col sm:flex-row gap-4 w-full max-w-4xl">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search by state, market, or category..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full px-10 py-3 border-2 border-Primary rounded-full focus:ring-2 focus:ring-Primary focus:outline-none text-sm md:text-base placeholder-gray-500 transition-all duration-200"
                />
                <svg
                  fill="currentColor"
                  className="absolute top-1/2 -translate-y-1/2 left-3 w-5 h-5 text-gray-500"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 1 0 4.247 11.943l5.53 5.53a.75.75 0 0 0 1.06-1.06l-5.53-5.53A6.75 6.75 0 0 0 10.5 3.75ZM5.25 10.5a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              {screenProperties.isMobile ? (
                <Select
                  options={options}
                  selected={selected}
                  setSelected={(option) => {
                    if (option === "go to") return;
                    navigate(`/${option}`);
                    setSelected(options.indexOf(option));
                  }}
                  className="w-full sm:w-auto"
                />
              ) : (
                <div className="flex gap-3 flex-wrap sm:flex-nowrap">
                  <Link to="/state">
                    <button className="w-full sm:w-auto bg-Primary hover:bg-Primary/90 px-6 py-3 rounded-full text-sm md:text-base text-white transition-colors duration-200">
                      State
                    </button>
                  </Link>
                  <Link to="/markets">
                    <button className="w-full sm:w-auto bg-Primary hover:bg-Primary/90 px-6 py-3 rounded-full text-sm md:text-base text-white transition-colors duration-200">
                      Market
                    </button>
                  </Link>
                  <Link to="/category">
                    <button className="w-full sm:w-auto bg-Primary hover:bg-Primary/90 px-6 py-3 rounded-full text-sm md:text-base text-white transition-colors duration-200">
                      Category
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Place Ad + Categories Section */}
        <div className="mb-16">
          <h2 className="mb-8 font-bold text-center text-xl md:text-2xl text-Primary">
            Categories
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
            <Link to="/ad" className="w-full md:w-auto">
              <div className="flex md:flex-col items-center justify-center gap-3 bg-orange hover:bg-orange/90 shadow-lg rounded-xl p-4 md:p-6 text-white transition-all duration-200 h-full">
                <FontAwesomeIcon icon={faPlus} className="text-2xl" />
                <span className="font-bold text-base md:text-lg">Place Ad</span>
              </div>
            </Link>

            <div className="w-full md:w-3/4">
              <Swiper
                slidesPerView={cardNumber}
                spaceBetween={20}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="custom-swiper-pagination pb-10"
              >
                {Object.entries(categories).map(([name, imageUrl]) => (
                  <SwiperSlide key={name}>
                    <Link to={`/category/${name.toLowerCase().replace(/\s+/g, '-')}`}>
                      <div className="group cursor-pointer">
                        <div className="relative w-full pt-[100%] rounded-xl overflow-hidden">
                          {/* Background Image */}
                          <img
                            src={imageUrl}
                            alt={name}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                            loading="lazy"
                          />
                          
                          {/* Dark Overlay */}
                          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-200" />
                          
                          {/* Icon */}
                          {categoryIcons[name] && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              {React.createElement(categoryIcons[name], {
                                className: "text-white transition-transform duration-200 group-hover:scale-110",
                                size: 32,
                                strokeWidth: 1.5
                              })}
                            </div>
                          )}
                        </div>
                        <p className="mt-2 text-center text-sm font-medium text-gray-700 group-hover:text-Primary">
                          {name}
                        </p>
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
          <h2 className="mb-8 font-bold text-center text-xl md:text-2xl text-Primary">
            Featured Markets
          </h2>
          <div className="max-w-6xl mx-auto">
            <Swiper
              slidesPerView={cardNumber}
              spaceBetween={24}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="custom-swiper-pagination pb-10"
            >
              {marketsData.map((market) => (
                <SwiperSlide key={market.name}>
                  <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-200 hover:shadow-xl hover:scale-105">
                    <img
                      src={market.imageUrl}
                      alt={market.name}
                      className="w-full aspect-[4/3] object-cover"
                      loading="lazy"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-gray-800 text-base md:text-lg mb-1">
                        {market.name}
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base">
                        {market.location}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Malls Section */}
        <div>
          <h2 className="mb-8 font-bold text-center text-xl md:text-2xl text-Primary">
            Featured Malls
          </h2>
          <div className="max-w-6xl mx-auto">
            <Swiper
              slidesPerView={cardNumber}
              spaceBetween={24}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="custom-swiper-pagination pb-10"
            >
              {mallsData.map((mall) => (
                <SwiperSlide key={mall.name}>
                  <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-200 hover:shadow-xl hover:scale-105">
                    <img
                      src={mall.imageUrl}
                      alt={mall.name}
                      className="w-full aspect-[4/3] object-cover"
                      loading="lazy"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-gray-800 text-base md:text-lg mb-1">
                        {mall.name}
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base">
                        {mall.location}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ExploreSection;
