import React from 'react';
import Wears_category from '../assets/Wears_category.png';
import Automobile_category from '../assets/Automobile_category.png';
import Gadgets_category from '../assets/Gadgets_category.png';
import Realestate_category from '../assets/Realestate_category.png';
import Place_AD from '../assets/Place_AD.svg';


function ExploreSection() {
  return (
    <div className="explore-section bg-white py-10">
      <div className="container mx-auto">
        {/* Search Bar and Place an Ad */}
        <div className="flex justify-between items-center mb-8">
          <div className="relative flex-grow">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              {/* Search Icon SVG */}
              <svg width="20" height="20" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M64.3578 58.8422L49.6562 44.1406C53.1958 39.4287 55.1066 33.6933 55.1 27.8C55.1 12.7469 42.8531 0.5 27.8 0.5C12.7469 0.5 0.5 12.7469 0.5 27.8C0.5 42.8531 12.7469 55.1 27.8 55.1C33.6933 55.1066 39.4287 53.1958 44.1406 49.6562L58.8422 64.3578C59.5864 65.0231 60.557 65.3782 61.5548 65.3502C62.5526 65.3223 63.5018 64.9135 64.2077 64.2077C64.9135 63.5018 65.3223 62.5526 65.3502 61.5548C65.3782 60.557 65.0231 59.5864 64.3578 58.8422ZM8.3 27.8C8.3 23.9433 9.44366 20.1731 11.5863 16.9664C13.729 13.7596 16.7745 11.2603 20.3377 9.78435C23.9008 8.30844 27.8216 7.92228 31.6043 8.67469C35.3869 9.4271 38.8615 11.2843 41.5886 14.0114C44.3157 16.7385 46.1729 20.2131 46.9253 23.9957C47.6777 27.7784 47.2916 31.6992 45.8157 35.2623C44.3397 38.8255 41.8404 41.871 38.6336 44.0137C35.4269 46.1563 31.6567 47.3 27.8 47.3C22.6302 47.2938 17.6739 45.2374 14.0183 41.5817C10.3627 37.9261 8.3062 32.9698 8.3 27.8Z" fill="#236C13"/>
                </svg>
            
            </span>
            <input
              type="text"
              placeholder="Search an item..."
              className="pl-10 pr-10 w-full py-2 border rounded-full text-sm placeholder-gray-500 border-green"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              {/* Filter Icon SVG */}
              <svg width="25" height="25" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25 48.3334C19.7333 48.3334 15.3233 51.8667 13.8766 56.6667H6.66663V63.3334H13.8766C15.3233 68.1334 19.7333 71.6667 25 71.6667C30.2666 71.6667 34.6766 68.1334 36.1233 63.3334H73.3333V56.6667H36.1233C34.6766 51.8667 30.2666 48.3334 25 48.3334ZM25 65C22.2433 65 20 62.7567 20 60C20 57.2434 22.2433 55 25 55C27.7566 55 30 57.2434 30 60C30 62.7567 27.7566 65 25 65ZM55 28.3334C49.7333 28.3334 45.3233 31.8667 43.8766 36.6667H6.66663V43.3334H43.8766C45.3233 48.1334 49.7333 51.6667 55 51.6667C60.2666 51.6667 64.6766 48.1334 66.1233 43.3334H73.3333V36.6667H66.1233C64.6766 31.8667 60.2666 28.3334 55 28.3334ZM55 45C52.2433 45 50 42.7567 50 40C50 37.2434 52.2433 35 55 35C57.7566 35 60 37.2434 60 40C60 42.7567 57.7566 45 55 45Z" fill="#236C13"/>
                    <path d="M42.79 16.6667C41.3433 11.8667 36.9333 8.33337 31.6666 8.33337C26.4 8.33337 21.99 11.8667 20.5433 16.6667H6.66663V23.3334H20.5433C21.99 28.1334 26.4 31.6667 31.6666 31.6667C36.9333 31.6667 41.3433 28.1334 42.79 23.3334H73.75V16.6667H42.79ZM31.6666 25C28.91 25 26.6666 22.7567 26.6666 20C26.6666 17.2434 28.91 15 31.6666 15C34.4233 15 36.6666 17.2434 36.6666 20C36.6666 22.7567 34.4233 25 31.6666 25Z" fill="#236C13"/>
                </svg>

            </span>
          </div>
          <button className="ml-4 btn state-btn bg-green text-white px-4 py-1 rounded-full hover:bg-hover-green transition">State</button>
          <button className="ml-4 btn Market-btn bg-green text-white px-4 py-1 rounded-full hover:bg-hover-green transition">Market</button>
          <button className="ml-4 btn Category-btn bg-green text-white px-4 py-1 rounded-full hover:bg-hover-green transition">Category</button>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex overflow-x-scroll no-scrollbar space-x-4">
            <button className="min-w-[160px] w-48 h-48 mr-4 text-white bg-orange rounded-lg shadow">
            <img src={Place_AD} alt="Place_AD" className="w-15 h-15 items-center" />
              Are you a vendor? <br /> Place an AD
            </button>
            {/* Category Cards */}
            <div className="category-card flex flex-col items-center text-center space-y-2">
              <img src={Wears_category} alt="Fashion" className="w-48 h-48 object-cover rounded-lg" />
              <h3 className="text-lg font-bold">Fashion</h3>
              <a href="#fashion" className="text-orange-500 hover:text-orange">view more</a>
            </div>
            <div className="category-card flex flex-col items-center text-center space-y-2">
              <img src={Automobile_category} alt="Automobiles" className="w-48 h-48 object-cover rounded-lg" />
              <h3 className="text-lg font-bold">Automobiles</h3>
              <a href="#automobiles" className="text-orange-500 hover:text-orange">view more</a>
            </div>
            <div className="category-card flex flex-col items-center text-center space-y-2">
              <img src={Gadgets_category} alt="Phones" className="w-48 h-48 object-cover rounded-lg" />
              <h3 className="text-lg font-bold">Phones</h3>
              <a href="#phones" className="text-orange-500 hover:text-orange">view more</a>
            </div>
            <div className="category-card flex flex-col items-center text-center space-y-2">
              <img src={Realestate_category} alt="Real Estate" className="w-48 h-48 object-cover rounded-lg" />
              <h3 className="text-lg font-bold">Real Estate</h3>
              <a href="#real-estate" className="text-orange-500 hover:text-orange">view more</a>
            </div>
            <div className="flex overflow-x-scroll no-scrollbar space-x-4">
                    {/* Category Cards */}
                    {/* ...other category cards... */}
                <button className="text-white bg-orange p-2 rounded-full flex items-center justify-center" style={{ width: '40px', height: '40px' }}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

          </div>
        </div>

        {/* Featured Categories */}
        <div className="categories-grid grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* Placeholder for categories */}
        </div>

        {/* Featured Markets and Malls */}
        <div className="markets-grid grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {/* Placeholder for markets */}
        </div>
      </div>  
    </div>
  );
}

export default ExploreSection;
