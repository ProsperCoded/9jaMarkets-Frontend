import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader, ArrowLeft } from "lucide-react";
import PropTypes from 'prop-types';

export default function LoadingPage({ message = "Loading..." }) {
  const [dots, setDots] = useState("");
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center -mt-10 bg-gradient-to-b from-Primary/10 to-transparent">
      <div className="w-full max-w-md mx-auto p-4 flex flex-col items-center">
        {/* Single Large Loader */}
        <Loader className="w-20 h-20 text-Primary animate-spin" />

        {/* Loading Text */}
        <div className="mt-6 text-center">
          <h2 className="text-xl font-medium text-gray-700">
            {message}<span className="text-Primary">{dots}</span>
          </h2>
        </div>

        {/* Return Home Link */}
        <Link 
          to="/" 
          className="mt-6 inline-flex items-center gap-2 text-gray-500 hover:text-Primary transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}

LoadingPage.propTypes = {
  message: PropTypes.string
};
