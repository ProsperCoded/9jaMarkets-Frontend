import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import PropTypes from 'prop-types';

export default function LoadingPage({ message = "Loading..." }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-white to-gray-50">
      <div className="flex flex-col items-center max-w-md w-full">
        {/* Logo and Loader Container */}
        <div className="relative">
          {/* Animated Logo */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 flex items-center justify-center">
            <ShoppingBag className="w-full h-full text-Primary animate-pulse" />
          </div>
          
          {/* Circular Progress */}
          <div className="absolute inset-0 animate-spin-slow">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className="text-Primary/20"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                className="text-Primary"
                strokeDasharray="283"
                strokeDashoffset="100"
              />
            </svg>
          </div>
        </div>

        {/* Loading Message */}
        <div className="mt-8 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-Primary to-orange bg-clip-text text-transparent">
            {message}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-[250px] mx-auto">
            We're preparing something amazing for you...
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex space-x-2 mt-6">
          <div className="w-2 h-2 rounded-full bg-Primary animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 rounded-full bg-Primary animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-2 h-2 rounded-full bg-Primary animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>

        {/* Footer Section */}
        <div className="mt-12 flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
          <span className="text-gray-500 flex items-center text-sm sm:text-base">
            Taking too long?
          </span>
          <Link 
            to="/" 
            className="flex items-center gap-2 text-Primary hover:text-P2 transition-colors duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Add PropTypes validation
LoadingPage.propTypes = {
  message: PropTypes.string
};
