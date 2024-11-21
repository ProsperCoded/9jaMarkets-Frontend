import React, { useState } from 'react';
import Wears_category from '../assets/Wears_category.png';
import Automobile_category from '../assets/Automobile_category.png';
import Gadgets_category from '../assets/Gadgets_category.png';
import Realestate_category from '../assets/Realestate_category.png';
import Furniture_category from '../assets/Furniture_category.png';
import Food_category from '../assets/Food_category.png';
import Pharmacy_category from '../assets/Pharmacy_category.png';
import Sports_category from '../assets/Sports_category.png';
import { Link } from 'react-router-dom';

// Import images for markets and malls
import AlabaMarket from '../assets/markets/AlabaMarket.png';
import BodijaMarket from '../assets/markets/BodijaMarket.png';
import OilMillMarket from '../assets/markets/OilMillMarket.png';
import ComputerVillage from '../assets/markets/ComputerVillage.png';
import OnitshaMarket from '../assets/markets/OnitshaMarket.png';
import IkejaMall from '../assets/malls/IkejaMall.png';
import PalmsMall from '../assets/malls/PalmsMall.png';
import OnitshaMall from '../assets/malls/OnitshaMall.png';
import AdoBayeroMall from '../assets/malls/AdeBayeroMall.png';
import JabiLakeMall from '../assets/malls/JabiLakeMall.png';

const categories = [
  { id: 1, image: Wears_category, label: 'Fashion' },
  { id: 2, image: Automobile_category, label: 'Automobiles' },
  { id: 3, image: Gadgets_category, label: 'Phones' },
  { id: 4, image: Realestate_category, label: 'Real Estate' },
  { id: 5, image: Furniture_category, label: 'Furniture' },
  { id: 6, image: Food_category, label: 'Food & Agriculture' },
  { id: 7, image: Pharmacy_category, label: 'Pharmacies' },
  { id: 8, image: Sports_category, label: 'Sports & Outdoor' },
];

const markets = [
  { name: "Alaba Market", location: "Lagos State", imageUrl: AlabaMarket },
  { name: "Bodija Market", location: "Oyo State", imageUrl: BodijaMarket },
  { name: "Oil Mill Market", location: "Rivers State", imageUrl: OilMillMarket },
  { name: "Computer Village", location: "Lagos State", imageUrl: ComputerVillage },
  { name: "Onitsha Main Market", location: "Anambra State", imageUrl: OnitshaMarket }
];

const malls = [
  { name: "Ikeja City Mall", location: "Lagos State", imageUrl: IkejaMall },
  { name: "Palms Shopping Mall", location: "Oyo State", imageUrl: PalmsMall },
  { name: "Onitsha Mall", location: "Anambra State", imageUrl: OnitshaMall },
  { name: "Ado Bayero Mall", location: "Kano State", imageUrl: AdoBayeroMall },
  { name: "Jabi Lake Mall", location: "Abuja", imageUrl: JabiLakeMall }
];

function ExploreSection() {
  // State to handle search input and filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [startIndex, setStartIndex] = useState(0);

  const itemsPerSlide = 4; // Default for desktop view
  const mobileItemsPerSlide = 2; // For mobile view

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handlePrevClick = () => {
    setStartIndex((prev) =>
      prev === 0 ? categories.length - itemsPerSlide : prev - itemsPerSlide
    );
  };

  const handleNextClick = () => {
    setStartIndex((prev) =>
      prev + itemsPerSlide >= categories.length ? 0 : prev + itemsPerSlide
    );
  };

  return (
    <div className="explore-section bg-white py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by state, market, or category..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-10 py-2 border border-green rounded-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          <button className="btn bg-green text-white px-4 py-2 rounded-full text-sm sm:text-base">
            State
          </button>
          <button className="btn bg-green text-white px-4 py-2 rounded-full text-sm sm:text-base">
            Market
          </button>
          <button className="btn bg-green text-white px-4 py-2 rounded-full text-sm sm:text-base">
            Category
          </button>
        </div>

        {/* Place Ad + Categories Carousel */}
        <div className="relative flex items-center mb-8">
          <button
            onClick={handlePrevClick}
            className="h-8 w-8 bg-orange text-white rounded-full absolute left-2 sm:left-4"
          >
            &#8592;
          </button>
          <div className="flex space-x-4 overflow-x-auto px-4 sm:px-6">
            {/* Place Ad */}
            <Link to="/ad">
              <div className="w-32 sm:w-40 h-32 sm:h-40 bg-orange text-white rounded-lg flex flex-col items-center justify-center shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-8 h-8 mb-2"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm sm:text-base font-bold">Place Ad</span>
              </div>
            </Link>

            {/* Categories */}
            {categories.slice(startIndex, startIndex + itemsPerSlide).map((category) => (
              <div
                key={category.id}
                className="w-32 sm:w-40 h-32 sm:h-40 bg-gray-100 rounded-lg flex flex-col items-center justify-center shadow-md"
              >
                <img
                  src={category.image}
                  alt={category.label}
                  className="w-full h-24 sm:h-28 object-cover rounded-t-lg"
                />
                <span className="text-sm sm:text-base font-semibold mt-2">
                  {category.label}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={handleNextClick}
            className="h-8 w-8 bg-orange text-white rounded-full absolute right-2 sm:right-4"
          >
            &#8594;
          </button>
        </div>

        {/* Featured Markets Carousel */}
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-center text-green">
          Featured Markets
        </h2>
        <div className="relative flex items-center mb-8">
          <button className="h-8 w-8 bg-orange text-white rounded-full absolute left-2 sm:left-4">
            &#8592;
          </button>
          <div className="flex space-x-4 overflow-x-auto px-4 sm:px-6">
            {markets.map((market) => (
              <div
                key={market.name}
                className="w-40 sm:w-48 h-40 sm:h-48 bg-gray-100 rounded-lg shadow-md flex-shrink-0"
              >
                <img
                  src={market.imageUrl}
                  alt={market.name}
                  className="w-full h-24 sm:h-28 object-cover rounded-t-lg"
                />
                <div className="p-2">
                  <h3 className="text-sm sm:text-base font-bold">{market.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-500">{market.location}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="h-8 w-8 bg-orange text-white rounded-full absolute right-2 sm:right-4">
            &#8594;
          </button>
        </div>

        {/* Featured Malls Carousel */}
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-center text-green">
          Featured Malls
        </h2>
        <div className="relative flex items-center">
          <button className="h-8 w-8 bg-orange text-white rounded-full absolute left-2 sm:left-4">
            &#8592;
          </button>
          <div className="flex space-x-4 overflow-x-auto px-4 sm:px-6">
            {malls.map((mall) => (
              <div
                key={mall.name}
                className="w-40 sm:w-48 h-40 sm:h-48 bg-gray-100 rounded-lg shadow-md flex-shrink-0"
              >
                <img
                  src={mall.imageUrl}
                  alt={mall.name}
                  className="w-full h-24 sm:h-28 object-cover rounded-t-lg"
                />
                <div className="p-2">
                  <h3 className="text-sm sm:text-base font-bold">{mall.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-500">{mall.location}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="h-8 w-8 bg-orange text-white rounded-full absolute right-2 sm:right-4">
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExploreSection;
