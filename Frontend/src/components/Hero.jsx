import React from 'react';
import backgroundImage from '../assets/Hero.png'; // Ensure you have a background image in your assets
import logo from '../assets/Logo.svg';

function Hero() {
  return (
    <div className="relative bg-cover bg-center h-screen" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="container mx-auto flex flex-col justify-center items-center h-full text-center text-white px-4">
        <div className="logo">
          <img src={logo} alt="9ja Markets" className="h-60" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-2">Discover and Connect with <br /> Nigeria’s Major Markets.</h1>
        
        {/* Absolutely positioned paragraph with background */}
        <p className="absolute bottom-0 w-full bg-orange text-xl py-1 text-center font-bold">
           Your gateway to the best products from Nigeria’s leading markets.
        </p>
      </div>
    </div>
  );
}

export default Hero;

