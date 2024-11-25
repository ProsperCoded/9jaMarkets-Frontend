import React from 'react';
import backgroundImage from '../assets/Hero.png'; 
import logo from '../assets/Logo.svg';

function Hero() {
  return (
    <div
      className="relative bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container mx-auto flex flex-col justify-center items-center h-full text-center text-white px-4 md:px-10 lg:px-20">
        {/* Logo */}
        <div className="logo mb-8">
          <img
            src={logo}
            alt="9ja Markets"
            className="h-24 sm:h-36 md:h-48 lg:h-56 mx-auto"
          />
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
          Discover and Connect with <br /> Nigeria’s Major Markets.
        </h1>

        {/* Positioned Paragraph (optional) */}
        {/* <p className="w-full sm:text-lg md:text-xl py-2 text-center ">
          Your gateway to the best products from Nigeria’s leading markets.
        </p> */}
      </div>
    </div>
  );
}

export default Hero;
