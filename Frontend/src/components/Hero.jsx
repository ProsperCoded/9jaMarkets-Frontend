import React from 'react';
import backgroundImage from '../assets/Hero.png'; 
import logo from '../assets/Logo.svg';

function Hero() {
  return (
    <div
      className="relative bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container mx-auto flex flex-col
                      justify-start items-center h-full text-center
                      text-white px-4 md:px-10 lg:px-20 pt-16 md:pt-20 lg:pt-24">
        {/* Logo */}
        <div className="logo mb-8">
          <img
            src={logo}
            alt="9ja Markets"
            className="h-24 sm:h-36 md:h-48 lg:h-60"
          />
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 
        leading-tight">
          Discover and Connect with <br /> Nigeria’s Major Markets.
        </h1>

        {/* Positioned Paragraph */}
        <p className="absolute bottom-0 w-full bg-orange text-base sm:text-lg md:text-xl py-2 text-center font-bold">
          Your gateway to the best products from Nigeria’s leading markets.
        </p>
      </div>
    </div>
  );
}

export default Hero;
