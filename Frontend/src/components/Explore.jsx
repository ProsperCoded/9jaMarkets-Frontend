import { useState, useEffect } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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

const malls = [
  { name: "Ikeja City Mall", location: "Lagos State", imageUrl: IkejaMall },
  { name: "Palms Shopping Mall", location: "Oyo State", imageUrl: PalmsMall },
  { name: "Onitsha Mall", location: "Anambra State", imageUrl: OnitshaMall },
  { name: "Ado Bayero Mall", location: "Kano State", imageUrl: AdoBayeroMall },
  { name: "Jabi Lake Mall", location: "Abuja", imageUrl: JabiLakeMall },
];

const categories = {
  Wears: Wears_category,
  Automobile: Automobile_category,
  Gadgets: Gadgets_category,
  RealEstate: Realestate_category,
  Furniture: Furniture_category,
  Food: Food_category,
  Pharmacy: Pharmacy_category,
  Sports: Sports_category,
};

function ExploreSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };
  // define a default number of cards to show
  const [cardNumber, setCardNumber] = useState(1);
  useEffect(() => {
    const handleResize = () => {
      const isAndroid = window.innerWidth < 600;
      const isIPad = window.innerWidth >= 600 && window.innerWidth < 1024;
      const isDesktop = window.innerWidth >= 1024 && window.innerWidth < 1440;
      const isExtraLarge = window.innerWidth >= 1440;

      const newCardNumber = isExtraLarge
        ? 5
        : isDesktop
        ? 4
        : isIPad
        ? 3
        : isAndroid
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
            </>
          <Link to="/market">
            <button className="btn bg-green text-white px-4 py-2 rounded-full text-sm sm:text-base">
              State
            </button>
          </Link>
          
          <Link to="/market">
            <button className="btn bg-green text-white px-4 py-2 rounded-full text-sm sm:text-base">
              Market
            </button>
          </Link>
          
          <Link to="/category">
            <button className="btn bg-green text-white px-4 py-2 rounded-full text-sm sm:text-base">
              Category
            </button>
          </Link>

        </div>

        {/* Place Ad + Categories Carousel */}
        <div className="relative flex justify-center items-center mb-8 w-full">
          <div className="flex md:flex-row flex-col justify-center md:items-center md:space-x-10 sm:px-6 md:px-4 w-full overflow-visible">
            <Link to="/ad" className="mb-3 w-auto">
              <div className="flex md:flex-col justify-center items-center bg-orange shadow-md md:mx-3 mb-1 rounded-xl md:rounded-lg w-full sm:size-32 h-10 text-white algin-middle">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="md:m-0 mr-3 mb-1 size-5"
                />
                <span className="font-bold text-sm sm:text-base">Place Ad</span>
              </div>
            </Link>

            <div className="m-0 w-auto md:w-[70%]">
              <Swiper
                slidesPerView={cardNumber}
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="custom-swiper-pagination pb-6"
              >
                {Object.entries(categories).map(([name, imageUrl]) => (
                  <SwiperSlide key={name}>
                    <div className="w-40 sm:w-40 md:w-32 h-32 sm:h-40">
                      <img
                        src={imageUrl}
                        alt={name}
                        className="shadow-md rounded-lg w-full h-full object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
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
          <div className="flex justify-center space-x-4 px-4 sm:px-6 overflow-visible">
            <Swiper
              slidesPerView={cardNumber}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="custom-swiper-pagination pb-6"
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
          <div className="flex justify-center space-x-4 px-4 sm:px-6 overflow-visible">
            <Swiper
              slidesPerView={cardNumber}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="custom-swiper-pagination pb-6"
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
