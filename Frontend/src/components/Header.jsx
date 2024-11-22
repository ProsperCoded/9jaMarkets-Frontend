import { useState, useEffect } from "react";
import logo from "../assets/Logo.svg";
import { Link } from "react-router-dom";

function Header({ openLoginModal, openSignUpModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll behavior
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  // Toggle menu and body scrolling
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-black bg-opacity-20 backdrop-blur-md text-white"
          : "bg-transparent text-white"
      } z-20`}
    >
      <div className="container mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="9ja Markets" className="h-8" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 ml-6 text-lg">
          <Link to="/" className="hover:text-orange">Home</Link>
          <Link to="/how-it-works" className="hover:text-orange">How it Works</Link>
          <Link to="/markets" className="hover:text-orange">Markets &rarr;</Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex space-x-3 ml-auto">
          <button
            onClick={openLoginModal}
            className="text-white px-4 py-1 border border-white rounded-full hover:bg-white hover:text-green transition"
          >
            Login
          </button>
          <button
            onClick={openSignUpModal}
            className="bg-green text-white px-4 py-1 rounded-full hover:bg-hover-green transition"
          >
            Sign Up
          </button>
        </div>

        {/* Mobile Hamburger Menu */}
        <div
          className="md:hidden cursor-pointer"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>

        {/* Mobile Side Panel */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-30 ">
            <div className="absolute right-0 top-0 bg-black bg-opacity-20 backdrop-blur-md w-1/2 h-full p-6 text-lg space-y-6 overflow-y-auto text-white">
              {/* Close Button */}
              <div className="flex justify-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer"
                  onClick={toggleMenu}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              {/* Nav Links */}
              <div className="space-y-4">
                <Link to="/" onClick={toggleMenu} className="block hover:text-orange">
                  Home
                </Link>
                <Link to="/how-it-works" onClick={toggleMenu} className="block hover:text-orange">
                  How it Works
                </Link>
                <Link to="/markets" onClick={toggleMenu} className="block hover:text-orange">
                  Markets
                </Link>
              </div>
              {/* Auth Buttons */}
              <div className="absolute bottom-6 left-6 right-6 space-y-4">
                <button
                  onClick={() => {
                    toggleMenu();
                    openLoginModal();
                  }}
                  className="w-full text-center py-1 border border-white text-white rounded-full hover:bg-white hover:text-green transition"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    toggleMenu();
                    openSignUpModal();
                  }}
                  className="w-full text-center py-1 bg-green text-white rounded-full hover:bg-hover-green transition"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
