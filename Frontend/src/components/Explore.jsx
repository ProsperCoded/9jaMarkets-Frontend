import React, { useState } from 'react';
import Wears_category from '../assets/Wears_category.png';
import Automobile_category from '../assets/Automobile_category.png';
import Gadgets_category from '../assets/Gadgets_category.png';
import Realestate_category from '../assets/Realestate_category.png';
import Furniture_category from '../assets/Furniture_category.png';
import Food_category from '../assets/Food_category.png';
import Pharmacy_category from '../assets/Pharmacy_category.png';
import Sports_category from '../assets/Sports_category.png';

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

  const itemsPerSlide = 4;
  
  // Function to handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter markets, malls, and categories based on the search query
  const filteredMarkets = markets.filter((market) =>
    market.name.toLowerCase().includes(searchQuery) ||
    market.location.toLowerCase().includes(searchQuery)
  );

  const filteredMalls = malls.filter((mall) =>
    mall.name.toLowerCase().includes(searchQuery) ||
    mall.location.toLowerCase().includes(searchQuery)
  );

  const filteredCategories = categories.filter((category) =>
    category.label.toLowerCase().includes(searchQuery)
  );

  // Handle left and right button clicks
  const handlePrevClick = () => {
    setStartIndex((prev) => (prev === 0 ? categories.length - itemsPerSlide : prev - itemsPerSlide));
  };

  const handleNextClick = () => {
    setStartIndex((prev) => (prev + itemsPerSlide >= categories.length ? 0 : prev + itemsPerSlide));
  };

  return (
    <div className="explore-section bg-white py-10">
      <div className="container mx-auto">
        {/* Search Bar and Buttons */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Search by state, market, or category..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-10 py-2 border border-green rounded-full text-sm placeholder-gray-500"
            />
            <span className="absolute inset-y-0 flex items-center pl-2 left-[1%]">
              {/* Search Icon */}
              <svg width="20" height="20" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M64.3578 58.8422L49.6562 44.1406C53.1958 39.4287 55.1066 33.6933 55.1 27.8C55.1 12.7469 42.8531 0.5 27.8 0.5C12.7469 0.5 0.5 12.7469 0.5 27.8C0.5 42.8531 12.7469 55.1 27.8 55.1C33.6933 55.1066 39.4287 53.1958 44.1406 49.6562L58.8422 64.3578C59.5864 65.0231 60.557 65.3782 61.5548 65.3502C62.5526 65.3223 63.5018 64.9135 64.2077 64.2077C64.9135 63.5018 65.3223 62.5526 65.3502 61.5548C65.3782 60.557 65.0231 59.5864 64.3578 58.8422ZM8.3 27.8C8.3 23.9433 9.44366 20.1731 11.5863 16.9664C13.729 13.7596 16.7745 11.2603 20.3377 9.78435C23.9008 8.30844 27.8216 7.92228 31.6043 8.67469C35.3869 9.4271 38.8615 11.2843 41.5886 14.0114C44.3157 16.7385 46.1729 20.2131 46.9253 23.9957C47.6777 27.7784 47.2916 31.6992 45.8157 35.2623C44.3397 38.8255 41.8404 41.871 38.6336 44.0137C35.4269 46.1563 31.6567 47.3 27.8 47.3C22.6302 47.2938 17.6739 45.2374 14.0183 41.5817C10.3627 37.9261 8.3062 32.9698 8.3 27.8Z" fill="#236C13"/>
              </svg>
            </span>
          </div>
          <div className="ml-4 space-x-4">
            <button className="btn state-btn bg-green text-white hover:bg-hover-green px-4 py-1 rounded-full">State</button>
            <button className="btn market-btn bg-green text-white  hover:bg-hover-green px-4 py-1 rounded-full">Market</button>
            <button className="btn category-btn bg-green text-white  hover:bg-hover-green px-4 py-1 rounded-full">Category</button>
          </div>
        </div>

        {/* Categories Section with Swipe */}
        <div className="relative flex items-center mb-8">
          {/* Place Ad Button */}
          <div>
            <button className="w-48 h-48 bg-orange text-white rounded-lg hover:shadow-lg hover:scale-105 transition">Place Ad</button>
          </div>

          {/* Left Swipe Button */}
          <button
            onClick={handlePrevClick}
            className="h-10 w-10 carousel-btn bg-orange text-white rounded-full p-2 absolute left-[17%] ">
            &#129136;
          </button>

          {/* Categories Carousel */}
          <div className="flex space-x-4 w-full justify-center">
            {filteredCategories.slice(startIndex, startIndex + itemsPerSlide).map((category) => (
              <div key={category.id} className="bg-gray-100 rounded-lg ovewrflow-hidden shadow-lg w-48 h-48 hover:scale-105 transition">
                <img src={category.image} alt={category.label} className="w-48 h-40 object-cover cursor-pointer rounded-lg" />
                <h3 className="text-lg font-semibold text-center">{category.label}</h3>
              </div>
            ))}
          </div>

          {/* Right Swipe Button */}
          <button
            onClick={handleNextClick}
            className="h-10 w-10 carousel-btn bg-orange text-white rounded-full p-2 absolute right-[2%]">
            &#129138;
          </button>
        </div>

        {/* Markets Section (with clickable items and hover effects) */}
        <h2 className="text-2xl font-bold mb-4 text-center text-green">Explore Markets</h2>
        <div className="grid grid-cols-5 gap-4 mb-8">
          {filteredMarkets.map((market) => (
            <div key={market.name} className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition">
              <img src={market.imageUrl} alt={market.name} className="w-full h-48 object-cover cursor-pointer" />
              <div className="p-4 cursor-pointer">
                <h3 className="text-lg font-semibold">{market.name}</h3>
                <p className="text-sm text-gray-600">{market.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Malls Section (with clickable items and hover effects) */}
        <h2 className="text-2xl font-bold mb-4 text-center text-green">Explore Malls</h2>
        <div className="grid grid-cols-5 gap-4 mb-8">
          {filteredMalls.map((mall) => (
            <div key={mall.name} className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition">
              <img src={mall.imageUrl} alt={mall.name} className="w-full h-48 object-cover cursor-pointer" />
              <div className="p-4 cursor-pointer">
                <h3 className="text-lg font-semibold">{mall.name}</h3>
                <p className="text-sm text-gray-600">{mall.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExploreSection;

