import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full max-w-md mx-auto p-4">
        {/* Main Loading Animation */}
        <div className="relative w-full aspect-square max-w-[200px] mx-auto">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-4 border-t-Primary border-r-Primary/30 border-b-Primary/10 border-l-Primary/60 
                        animate-spin-slow" />
          
          {/* Middle pulsing ring */}
          <div className="absolute inset-4 rounded-full border-4 border-t-P2 border-r-P2/30 border-b-P2/10 border-l-P2/60 
                        animate-pulse" />
          
          {/* Inner spinning ring */}
          <div className="absolute inset-8 rounded-full border-4 border-t-Primary border-r-Primary/30 border-b-Primary/10 border-l-Primary/60 
                        animate-spin-reverse" />
          
          {/* Center static dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-Primary animate-pulse" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="mt-8 text-center space-y-3">
          <div className="relative">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-Primary to-P2 bg-clip-text text-transparent">
              {message}{dots}
            </h2>
            
            {/* Progress bar */}
            <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-Primary to-P2 rounded-full 
                            animate-progress-infinite" />
            </div>
          </div>
        </div>

        {/* Return Home Link */}
        <div className="mt-12 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-Primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

LoadingPage.propTypes = {
  message: PropTypes.string
};
