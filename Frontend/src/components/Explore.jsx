import { useState } from "react";
import Wears_category from "../assets/Wears_category.png";
import Automobile_category from "../assets/Automobile_category.png";
import Gadgets_category from "../assets/Gadgets_category.png";
import Realestate_category from "../assets/Realestate_category.png";
import Furniture_category from "../assets/Furniture_category.png";
import Food_category from "../assets/Food_category.png";
import Pharmacy_category from "../assets/Pharmacy_category.png";
import Sports_category from "../assets/Sports_category.png";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import "./styles.css";

// Import images for markets and malls
import AlabaMarket from "../assets/markets/AlabaMarket.png";
import BodijaMarket from "../assets/markets/BodijaMarket.png";
import OilMillMarket from "../assets/markets/OilMillMarket.png";
import ComputerVillage from "../assets/markets/ComputerVillage.png";
import OnitshaMarket from "../assets/markets/OnitshaMarket.png";
import IkejaMall from "../assets/malls/IkejaMall.png";
import PalmsMall from "../assets/malls/PalmsMall.png";
import OnitshaMall from "../assets/malls/OnitshaMall.png";
import AdoBayeroMall from "../assets/malls/AdeBayeroMall.png";
import JabiLakeMall from "../assets/malls/JabiLakeMall.png";

const markets = [
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
const isAndroid = window.innerWidth < 600;
const isIPad = window.innerWidth > 600 && window.innerWidth < 1024;
const isDesktop = window.innerWidth >= 1024 && window.innerWidth < 1440;
const isExtraLarge = window.innerWidth >= 1440;
const malls = [
  { name: "Ikeja City Mall", location: "Lagos State", imageUrl: IkejaMall },
  { name: "Palms Shopping Mall", location: "Oyo State", imageUrl: PalmsMall },
  { name: "Onitsha Mall", location: "Anambra State", imageUrl: OnitshaMall },
  { name: "Ado Bayero Mall", location: "Kano State", imageUrl: AdoBayeroMall },
  { name: "Jabi Lake Mall", location: "Abuja", imageUrl: JabiLakeMall },
];

function ExploreSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };
  const cardNumber = isExtraLarge
    ? 5
    : isDesktop
    ? 4
    : isIPad
    ? 3
    : isAndroid
    ? 2
    : 1;
  console.log("card number", cardNumber);
  return (
    <div className="bg-white py-10 explore-section">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 text-center container">
        {/* Search Bar and Buttons */}
        <div className="flex justify-center items-center space-x-4 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search by state, market, or category..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="border-green py-2 pr-4 pl-10 border rounded-full focus:ring-2 focus:ring-green w-full text-sm placeholder-gray-500 focus:outline-none"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="top-2.5 left-3 absolute w-5 h-5 text-gray-500"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 4.247 11.943l5.53 5.53a.75.75 0 0 0 1.06-1.06l-5.53-5.53A6.75 6.75 0 0 0 10.5 3.75ZM5.25 10.5a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <button className="bg-green px-4 py-2 rounded-full text-sm text-white sm:text-base btn">
            State
          </button>
          <button className="bg-green px-4 py-2 rounded-full text-sm text-white sm:text-base btn">
            Market
          </button>
          <button className="bg-green px-4 py-2 rounded-full text-sm text-white sm:text-base btn">
            Category
          </button>
        </div>

        {/* Place Ad + Categories Carousel */}
        <div className="relative flex justify-center items-center mb-8">
          <div className="flex justify-center space-x-4 px-4 sm:px-6 overflow-x-auto">
            <Link to="/ad">
              <div className="flex flex-col justify-center items-center bg-orange shadow-md rounded-lg w-32 sm:w-40 h-32 sm:h-40 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="mb-2 w-8 h-8"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-bold text-sm sm:text-base">Place Ad</span>
              </div>
            </Link>

            <div className="flex gap-4 overflow-x-auto carousel columns-4 scrollbar-hide">
              <div className="flex-shrink-0 w-32 sm:w-40 h-32 sm:h-40 carousel-item">
                <img
                  src={Wears_category}
                  alt="Wears"
                  className="shadow-md rounded-lg w-full h-full"
                />
              </div>
              <div className="flex-shrink-0 w-32 sm:w-40 h-32 sm:h-40 carousel-item">
                <img
                  src={Automobile_category}
                  alt="Automobile"
                  className="shadow-md rounded-lg w-full h-full"
                />
              </div>
              <div className="flex-shrink-0 w-32 sm:w-40 h-32 sm:h-40 carousel-item">
                <img
                  src={Realestate_category}
                  alt="Real Estate"
                  className="shadow-md rounded-lg w-full h-full"
                />
              </div>
              <div className="flex-shrink-0 w-32 sm:w-40 h-32 sm:h-40 carousel-item">
                <img
                  src={Furniture_category}
                  alt="Furniture"
                  className="shadow-md rounded-lg w-full h-full"
                />
              </div>
              <div className="flex-shrink-0 w-32 sm:w-40 h-32 sm:h-40 carousel-item">
                <img
                  src={Pharmacy_category}
                  alt="Pharmacy"
                  className="shadow-md rounded-lg w-full h-full"
                />
              </div>
              <div className="flex-shrink-0 w-32 sm:w-40 h-32 sm:h-40 carousel-item">
                <img
                  src={Food_category}
                  alt="Food"
                  className="shadow-md rounded-lg w-full h-full"
                />
              </div>
              <div className="flex-shrink-0 w-32 sm:w-40 h-32 sm:h-40 carousel-item">
                <img
                  src={Gadgets_category}
                  alt="Gadgets"
                  className="shadow-md rounded-lg w-full h-full"
                />
              </div>
              <div className="flex-shrink-0 w-32 sm:w-40 h-32 sm:h-40 carousel-item">
                <img
                  src={Sports_category}
                  alt="Sports"
                  className="shadow-md rounded-lg w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Markets and Malls Carousel */}
        {/* Featured Markets Carousel */}
        <h2 className="mb-4 font-bold text-center text-green text-lg sm:text-xl">
          Featured Markets
        </h2>
        <div className="relative mr-auto mb-8 ml-auto xl:max-w-[80%]">
          {/* Carousel */}
          <div className="flex justify-center space-x-4 px-4 sm:px-6 overflow-x-scroll scrollbar-hide">
            <Swiper
              slidesPerView={cardNumber}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {markets.map((market) => (
                <SwiperSlide key={market.name}>
                  <div className="flex-shrink-0 bg-gray-100 shadow-md hover:shadow-lg rounded-lg w-auto sm:w-48 h-40 sm:h-48 transform transition duration-300 hover:scale-105 overflow-visible">
                    <img
                      src={market.imageUrl}
                      alt={market.name}
                      className="rounded-t-lg w-full h-24 sm:h-28 object-cover"
                    />
                    <div className="p-2">
                      <h3 className="group-hover:text-orange font-bold text-gray-800 text-sm sm:text-base">
                        {market.name}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        {market.location}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Featured Malls Carousel */}
        <h2 className="mb-4 font-bold text-center text-green text-lg sm:text-xl">
          Featured Malls
        </h2>
        <div className="relative mr-auto mb-8 ml-auto xl:max-w-[80%]">
          {/* Carousel */}
          <div className="flex justify-center space-x-4 px-4 sm:px-6">
            <Swiper
              slidesPerView={cardNumber}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {malls.map((mall) => (
                <SwiperSlide key={mall.name}>
                  <div className="flex-shrink-0 bg-gray-100 shadow-md hover:shadow-lg rounded-lg w-40 sm:w-48 h-40 sm:h-48 transform transition duration-300 hover:scale-105">
                    <img
                      src={mall.imageUrl}
                      alt={mall.name}
                      className="rounded-t-lg w-full h-24 sm:h-28 object-cover"
                    />
                    <div className="p-2">
                      <h3 className="font-bold text-sm sm:text-base">
                        {mall.name}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm">
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
