import { Link } from "react-router-dom";
import { Home, ArrowLeft, HelpCircle } from "lucide-react";
import logo from "../assets/Logo.svg";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#22c55e_1px,transparent_0)] bg-[length:40px_40px]" />
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Logo or Brand (optional) */}
          <div className="flex justify-center mb-8">
            <Link
              to="/"
              className="text-Primary font-bold text-2xl flex items-center"
            >
              <img
                src={logo}
                alt="9ja Markets Logo"
                className="h-10 mr-2"
              />
            </Link>
          </div>

          {/* 404 Text */}
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <h1 className="relative text-[120px] md:text-[150px] font-bold text-Primary/10 leading-none select-none">
              404
              {/* Overlay Character */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-bounce">
                  <span className="text-4xl md:text-6xl">🤔</span>
                </div>
              </div>
            </h1>

            {/* Error Message */}
            <div className="space-y-3 mt-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                Page Not Found
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Oops! The page you're looking for seems to have wandered off. 
                Let's get you back on track.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/"
                className="flex items-center gap-2 px-6 py-2.5 bg-Primary text-white rounded-full hover:bg-Primary/90 transition-colors w-full sm:w-auto justify-center group"
              >
                <Home size={18} className="group-hover:scale-110 transition-transform" />
                <span>Go Home</span>
              </Link>
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 px-6 py-2.5 bg-white border-2 border-Primary text-Primary rounded-full hover:bg-Primary/5 transition-colors w-full sm:w-auto justify-center group"
              >
                <ArrowLeft size={18} className="group-hover:translate-x-[-4px] transition-transform" />
                <span>Go Back</span>
              </button>
            </div>

            {/* Help Section */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-center gap-2 text-gray-500">
                <HelpCircle size={16} />
                <span className="text-sm">Need help?</span>
              </div>
              <div className="mt-2 text-sm space-x-2">
                <Link to="/contact" className="text-Primary hover:underline">
                  Contact Us
                </Link>
                <span>•</span>
                <Link to="/marketer" className="text-Primary hover:underline">
                  Become a Marketer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;