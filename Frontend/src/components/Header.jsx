import { useState, useEffect } from "react";
import logo from "../assets/Logo.svg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { USER_PROFILE_CONTEXT } from "../contexts";
import { UserAvatar } from "../componets-utils/UserAvatar";
// import { Avatar } from "../componets-utils/Avatar";
import { Avatar } from "antd";

function Header({ openLoginModal, openSignUpModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userProfile } = useContext(USER_PROFILE_CONTEXT);

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
      <div className="flex justify-between items-center mx-auto px-6 py-3 container">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="9ja Markets" className="h-8" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="md:flex space-x-6 hidden ml-6 text-lg">
          <Link to="/" className="hover:text-orange">
            Home
          </Link>
          <Link to="/how-it-works" className="hover:text-orange">
            How it Works
          </Link>
          <Link to="/markets" className="hover:text-orange">
            Markets &rarr;
          </Link>
        </nav>
        {userProfile ? (
          <div className="ml-auto">
            <UserAvatar />
          </div>
        ) : (
          <div className="md:flex space-x-3 hidden ml-auto">
            <button
              onClick={openLoginModal}
              className="border-white hover:bg-white px-4 py-1 border rounded-full text-white hover:text-green transition"
            >
              Login
            </button>
            <button
              onClick={openSignUpModal}
              className="bg-green hover:bg-hover-green px-4 py-1 rounded-full text-white transition"
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden text-white" onClick={toggleMenu}>
          <FontAwesomeIcon
            icon={isMenuOpen ? faTimes : faBars}
            className="w-6 h-6"
          />
        </div>

        {/* Mobile Side Panel */}
        {isMenuOpen && (
          <div className="z-30 fixed inset-0">
            <div className="top-0 right-0 absolute space-y-6 bg-black bg-opacity-20 backdrop-blur-md p-6 w-1/2 h-full text-lg text-white overflow-y-auto">
              {/* Close Button */}
              <div className="flex justify-end">
                <svg
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
                <Link
                  to="/"
                  onClick={toggleMenu}
                  className="block hover:text-orange"
                >
                  Home
                </Link>
                <Link
                  to="/how-it-works"
                  onClick={toggleMenu}
                  className="block hover:text-orange"
                >
                  How it Works
                </Link>
                <Link
                  to="/markets"
                  onClick={toggleMenu}
                  className="block hover:text-orange"
                >
                  Markets
                </Link>
              </div>
              {/* <Avatar label="ddd" /> */}
              {/* Auth Buttons */}
              {userProfile ? (
                <UserAvatar />
              ) : (
                <div className="right-6 bottom-6 left-6 absolute space-y-4">
                  <button
                    onClick={() => {
                      toggleMenu();
                      openLoginModal();
                    }}
                    className="border-white hover:bg-white py-1 border rounded-full w-full text-center text-white hover:text-green transition"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      toggleMenu();
                      openSignUpModal();
                    }}
                    className="bg-green hover:bg-hover-green py-1 rounded-full w-full text-center text-white transition"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
