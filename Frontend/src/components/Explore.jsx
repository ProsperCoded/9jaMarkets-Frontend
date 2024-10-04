import React, { useState } from 'react';
import Wears_category from '../assets/Wears_category.png';
import Automobile_category from '../assets/Automobile_category.png';
import Gadgets_category from '../assets/Gadgets_category.png';
import Realestate_category from '../assets/Realestate_category.png';
import Furniture_category from '../assets/Furniture_category.png';
import Food_category from '../assets/Food_category.png';
import Pharmacy_category from '../assets/Pharmacy_category.png';
import Sports_category from '../assets/Sports_category.png';

// Categories data
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

function ExploreSection() {
  const [startIndex, setStartIndex] = useState(0);

  // Handle Next button click
  const handleNextClick = () => {
    setStartIndex((prevIndex) => (prevIndex + 4) % categories.length);
  };

  // Handle Prev button click
  const handlePrevClick = () => {
    setStartIndex((prevIndex) =>
      prevIndex === 0 ? categories.length - 4 : prevIndex - 4
    );
  };

  return (
    <div className="explore-section bg-white py-10">
      <div className="container mx-auto">
        {/* Categories Section with Swipe */}
        <div className="flex justify-between items-center mb-8 relative">
          {/* Swipe Left Button */}
          <button
            className="absolute left-0 h-10 w-10 carousel-btn bg-orange text-white rounded-full p-2"
            onClick={handlePrevClick}
          >
            &#129136;
          </button>
          {/* Categories Carousel */}
          <div className="flex space-x-4 w-full justify-center transition-all duration-500 ease-in-out">
            {categories
              .slice(startIndex, startIndex + 4)
              .map((category) => (
                <div
                  key={category.id}
                  className="bg-gray-100 p-4 rounded-lg text-center w-48 h-48 transition-transform transform hover:scale-105"
                >
                  <img
                    src={category.image}
                    alt={category.label}
                    className="h-full w-full object-cover"
                  />
                  <h3 className="text-lg font-semibold mt-2">
                    {category.label}
                  </h3>
                  <button className="text-green hover:text-orange transition">
                    View more
                  </button>
                </div>
              ))}
          </div>
          {/* Swipe Right Button */}
          <button
            className="absolute right-0 h-10 w-10 carousel-btn bg-orange text-white rounded-full p-2"
            onClick={handleNextClick}
          >
            &#129138;
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExploreSection;
