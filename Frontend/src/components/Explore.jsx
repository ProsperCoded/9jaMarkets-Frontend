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
import { Search } from "lucide-react";

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
import RealEstate from "../assets/categories/real-EState-&-housing.jpg";
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
  "Kids & Baby Products": Baby
};

// Update the categories object with new image mappings
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

const getCategoryIcon = (category) => {
  return categoryIcons[category] || faStore; // Default to store icon if no match found
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
      const isDesktop = window.innerWidth >= 1024;
      
      setScreenProperties({ isMobile, isIPad, isDesktop });
      const newCardNumber = isDesktop
        ? 4  // Show 4 cards on desktop
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
    <div className="min-h-screen bg-white py-12 lg:py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Search Section */}
        <div className="flex flex-col items-center space-y-6">
          <div className="relative flex w-full max-w-3xl items-center">
            <input
              type="text"
              placeholder="Search by state, market, or category..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full rounded-full border-2 border-Primary px-6 py-3 pr-[100px] text-sm focus:outline-none focus:ring-2 focus:ring-Primary/20 md:py-4 md:text-base"
            />
            <button className="absolute right-2 flex items-center justify-center rounded-full bg-[#F8912D] px-4 py-2 text-white transition-colors hover:bg-[#F8912D]/90 md:px-6 md:py-2.5">
              <Search className="h-5 w-5" />
              <span className="ml-2 hidden md:inline">Search</span>
            </button>
          </div>
        </div>

        {/* Place Ad + Categories Section */}
        <div className="mt-12">
          {/* Mobile: Place Ad Button */}
          <div className="md:hidden mb-6">
            <button 
              onClick={() => navigate('/ad')}
              className="w-full bg-[#F8912D] hover:bg-[#F8912D]/90 text-white rounded-xl p-4 shadow-lg transition-all duration-200 flex items-center justify-center gap-3"
            >
              <FontAwesomeIcon icon={faPlus} className="text-xl" />
              <span className="font-semibold">Place Your Ad</span>
            </button>
          </div>

          <h2 className="mb-6 font-bold text-center text-xl md:text-2xl text-Primary">
            Categories
          </h2>

          <div className="flex flex-col md:flex-row gap-4">
            {/* Desktop: Place Ad Button */}
            <div className="hidden md:block">
              <button 
                onClick={() => navigate('/ad')}
                className="w-[200px] bg-orange hover:bg-orange/90 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group"
              >
                <div className="p-4 flex flex-col items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <FontAwesomeIcon icon={faPlus} className="text-xl" />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">Place Your Ad</div>
                    <p className="text-sm text-white/80">Advertise here</p>
                  </div>
                </div>
              </button>
            </div>

            {/* Categories Swiper */}
            <div className="w-full md:max-w-[calc(100%-220px)]">
              <Swiper
                slidesPerView={cardNumber}
                spaceBetween={16}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="custom-swiper-pagination pb-8"
              >
                {Object.entries(categories).map(([name, imageUrl]) => (
                  <SwiperSlide key={name}>
                    <Link to={`/category/${name.toLowerCase().replace(/\s+/g, '-')}`}>
                      <div className="group cursor-pointer h-[200px]">
                        <div className="relative h-full rounded-xl overflow-hidden">
                          <img
                            src={imageUrl}
                            alt={name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-200" />
                          <div className="absolute inset-0 p-4 flex flex-col items-center justify-center text-white">
                            {React.createElement(categoryIcons[name], { 
                              className: "w-6 h-6 mb-2 group-hover:scale-110 transition-transform duration-200" 
                            })}
                            <h3 className="text-center text-sm font-medium">{name}</h3>
                          </div>
                          <h3 className="text-white text-center font-semibold text-sm md:text-base">
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
