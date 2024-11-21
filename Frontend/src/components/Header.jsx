import { useState, useEffect } from "react";
import logo from "../assets/Logo.svg";
import { Link } from "react-router-dom";

function Header({ openLoginModal, openSignUpModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 w-full px-10 transition-all duration-300 ${
        isScrolled
          ? "bg-black bg-opacity-20 backdrop-blur-md text-white"
          : "bg-transparent text-white"
      } z-10`}
    >
      <div className="container mx-auto flex justify-between items-center p-2 text-lg font-light h-14 relative">
        {/* Centered Logo Only on Mobile */}
        <div
          className={`${
            isMenuOpen ? "absolute left-1/2 transform -translate-x-1/2" : "flex"
          } md:relative md:transform-none`}
        >
          <Link to="/" className="flex items-center">
            <img src={logo} alt="9ja Markets" className="h-8" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="font-light hover:text-orange text-lg">
            Home
          </Link>
          <Link to="/how-it-works" className="font-light hover:text-orange text-lg">
            How it Works
          </Link>
          <Link to="/markets" className="font-light hover:text-orange text-lg">
            Markets &rarr;
          </Link>
        </nav>

        {/* Hamburger Menu (Mobile) */}
        <div
          className="md:hidden cursor-pointer ml-auto"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
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

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex space-x-3">
          <button
            onClick={openLoginModal}
            className="text-white px-4 rounded-full hover:bg-white hover:text-green transition text-lg"
          >
            Login
          </button>
          <button
            onClick={openSignUpModal}
            className="bg-green text-white px-4 rounded-full hover:bg-hover-green transition text-lg"
          >
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Panel */}
        <div
          className={`fixed top-0 right-0 h-full w-50 bg-black bg-opacity-20 backdrop-blur-md text-white z-40 transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300`}
          style={{ overflowY: "auto" }}
        >
          <div className="flex justify-end p-4">
            {/* Close Button */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="flex flex-col gap-6 mt-10 px-6">
            <Link
              to="/"
              className="text-white text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/how-it-works"
              className="text-white text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              How it Works
            </Link>
            <Link
              to="/markets"
              className="text-white text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Markets &rarr;
            </Link>
          </div>
          <div className="absolute bottom-6 left-6 right-6">
            <Link
              onClick={openLoginModal}
              className="block text-center text-white mb-4 py-1 border border-white rounded-md text-base"
            >
              Login
            </Link>
            <Link
              onClick={openSignUpModal}
              className="block text-center py-1 bg-green text-white rounded-md text-base"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
