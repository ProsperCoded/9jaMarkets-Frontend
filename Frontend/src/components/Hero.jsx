import React from "react";
import backgroundImage from "../assets/Hero.jpg";
import logo from "../assets/Logo.svg";

function Hero() {
  return (
    <div
      className="relative bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex flex-col justify-center items-center mx-auto px-4 md:px-10 lg:px-20 h-full text-center text-white container">
        {/* Logo */}
        <div className="mb-8 logo">
          <img
            src={logo}
            alt="9ja Markets"
            className="mx-auto mt-[-15%] h-24 sm:h-36 md:h-48 lg:h-56"
          />
        </div>

        {/* Heading */}
        <h1 className="mt-[10%] mb-4 font-bold text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-tight">
          Discover and Connect with <br /> Nigeria’s Major Markets.
        </h1>

        {/* Positioned Paragraph (optional) */}
        {/* <p className="py-2 w-full text-center sm:text-lg md:text-xl">
          Your gateway to the best products from Nigeria’s leading markets.
        </p> */}
      </div>
    </div>
  );
}

export default Hero;
