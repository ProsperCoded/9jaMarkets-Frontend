import { useState } from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };


  return (
    <div className="explore-section bg-white py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar and Buttons */}
        <div className="mb-6 flex items-center space-x-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search by state, market, or category..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-green rounded-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-5 h-5 absolute left-3 top-2.5 text-gray-500"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 4.247 11.943l5.53 5.53a.75.75 0 0 0 1.06-1.06l-5.53-5.53A6.75 6.75 0 0 0 10.5 3.75ZM5.25 10.5a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
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
          <div className="flex space-x-4 overflow-x-auto px-4 sm:px-6">
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
            <div className="carousel columns-4 flex gap-4 overflow-x-auto scrollbar-hide">
                <div className="carousel-item w-32 sm:w-40 h-32 sm:h-40 flex-shrink-0">
                  <img src={Wears_category} alt="Wears" className="w-full h-full rounded-lg shadow-md" />
                </div>
                <div className="carousel-item w-32 sm:w-40 h-32 sm:h-40 flex-shrink-0">
                  <img src={Automobile_category} alt="Automobile" className="w-full h-full rounded-lg shadow-md" />
                </div>
                <div className="carousel-item w-32 sm:w-40 h-32 sm:h-40 flex-shrink-0">
                  <img src={Realestate_category} alt="Real Estate" className="w-full h-full rounded-lg shadow-md" />
                </div>
                <div className="carousel-item w-32 sm:w-40 h-32 sm:h-40 flex-shrink-0">
                  <img src={Furniture_category} alt="Furniture" className="w-full h-full rounded-lg shadow-md" />
                </div>
                <div className="carousel-item w-32 sm:w-40 h-32 sm:h-40 flex-shrink-0">
                  <img src={Pharmacy_category} alt="Pharmacy" className="w-full h-full rounded-lg shadow-md" />
                </div>
                <div className="carousel-item w-32 sm:w-40 h-32 sm:h-40 flex-shrink-0">
                  <img src={Food_category} alt="Food" className="w-full h-full rounded-lg shadow-md" />
                </div>
                <div className="carousel-item w-32 sm:w-40 h-32 sm:h-40 flex-shrink-0">
                  <img src={Gadgets_category} alt="Gadgets" className="w-full h-full rounded-lg shadow-md" />
                </div>
                <div className="carousel-item w-32 sm:w-40 h-32 sm:h-40 flex-shrink-0">
                  <img src={Sports_category} alt="Sports" className="w-full h-full rounded-lg shadow-md" />
                </div>
              </div>

          </div>
        </div>

        {/* Markets and Malls Carousel */}
        {/* Featured Markets Carousel */}
          <h2 className="text-lg sm:text-xl font-bold mb-4 text-center text-green">
            Featured Markets
          </h2>
          <div className="relative mb-8">
            {/* Carousel */}
            <div className="flex space-x-4 overflow-x-scroll px-4 sm:px-6 scrollbar-hide">
              {markets.map((market) => (
                <div
                  key={market.name}
                  className="w-40 sm:w-48 h-40 sm:h-48 bg-gray-100 rounded-lg shadow-md flex-shrink-0 transform transition duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <img
                    src={market.imageUrl}
                    alt={market.name}
                    className="w-full h-24 sm:h-28 object-cover rounded-t-lg"
                  />
                  <div className="p-2">
                    <h3 className="text-sm sm:text-base font-bold text-gray-800 group-hover:text-orange">
                      {market.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">{market.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Malls Carousel */}
          <h2 className="text-lg sm:text-xl font-bold mb-4 text-center text-green">
            Featured Malls
          </h2>
          <div className="relative">
            {/* Carousel */}
            <div className="flex space-x-4 overflow-x-scroll px-4 sm:px-6 scrollbar-hide">
              {malls.map((mall) => (
                <div
                  key={mall.name}
                  className="w-40 sm:w-48 h-40 sm:h-48 bg-gray-100 rounded-lg shadow-md flex-shrink-0 transform transition duration-300 hover:scale-105 hover:shadow-lg"
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
          </div>

      </div>
    </div>
  );
}

export default ExploreSection;