import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PropTypes from 'prop-types';

export default function LoadingPage({ message = "Loading..." }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-white">
      <div className="flex flex-col items-center max-w-md w-full">
        {/* Loader */}
        <div className="w-24 sm:w-32 md:w-40 aspect-square mb-6">
          <div className="w-full h-full loader animate-spin rounded-full border-4 border-Primary border-t-transparent"></div>
        </div>

        {/* Message Container */}
        <div className="flex flex-col items-center space-y-4 text-center">
          {/* Loading Message */}
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-Primary">
            {message}
          </p>

          {/* Footer Section */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-sm sm:text-base">
            <span className="text-gray-600 flex items-center">
              🙁 Tired of Waiting?
            </span>
            <Link 
              to="/" 
              className="flex items-center gap-2 text-Primary hover:text-P2 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="underline">Go Back Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add PropTypes validation
LoadingPage.propTypes = {
  message: PropTypes.string
};
