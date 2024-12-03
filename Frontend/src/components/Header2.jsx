import { useState } from "react";
import logo from "../assets/Logo.svg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Header2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu and scrolling
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  return (
    <div>
      <header className="top-0 z-20 bg-green px-4 w-full text-white">
        <div className="flex justify-between items-center mx-auto p-2 h-14 container">
          {/* Logo and Nav */}
          <div className="flex items-center">
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
          </div>

          {/* Icons and Burger Menu */}
          <div className="flex items-center space-x-4">
            {/* Icons for Desktop */}
            <div className="md:flex space-x-4 hidden">
              <Link to="/chat" className="flex items-center hover:text-orange">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                to="/notifications"
                className="flex items-center hover:text-orange"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25a6 6 0 0 0-6 6v3.118c0 .477-.12.946-.347 1.361l-1.614 2.922A1.125 1.125 0 0 0 5.018 17.25h13.964a1.125 1.125 0 0 0 .979-1.699l-1.615-2.922a3 3 0 0 1-.346-1.361V8.25a6 6 0 0 0-6-6ZM12 21a2.25 2.25 0 0 0 2.246-2.158H9.754A2.25 2.25 0 0 0 12 21Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                to="/profile"
                className="flex items-center hover:text-orange"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>

            {/* Burger Menu */}
            <button className="md:hidden text-white" onClick={toggleMenu}>
              <FontAwesomeIcon
                icon={isMenuOpen ? faTimes : faBars}
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>

        {/* Mobile Side Panel */}
        {isMenuOpen && (
          <div className="z-30 fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="top-0 right-0 absolute space-y-6 bg-black bg-opacity-20 backdrop-blur-md p-6 w-1/2 h-full text-lg text-white overflow-y-auto">
              {/* Close Button */}
              <button
                className="top-4 right-4 absolute text-white"
                onClick={toggleMenu}
              >
                <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
              </button>
              <Link
                to="/"
                className="block hover:text-orange"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/how-it-works"
                className="block hover:text-orange"
                onClick={toggleMenu}
              >
                How it Works
              </Link>
              <Link
                to="/markets"
                className="block hover:text-orange"
                onClick={toggleMenu}
              >
                Markets
              </Link>

              {/* Icons with Text */}
              <div className="space-y-4">
                <Link
                  to="/chat"
                  className="flex items-center hover:text-orange"
                  onClick={toggleMenu}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mr-2 w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Chat
                </Link>
                <Link
                  to="/notifications"
                  className="flex items-center hover:text-orange"
                  onClick={toggleMenu}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mr-2 w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25a6 6 0 0 0-6 6v3.118c0 .477-.12.946-.347 1.361l-1.614 2.922A1.125 1.125 0 0 0 5.018 17.25h13.964a1.125 1.125 0 0 0 .979-1.699l-1.615-2.922a3 3 0 0 1-.346-1.361V8.25a6 6 0 0 0-6-6ZM12 21a2.25 2.25 0 0 0 2.246-2.158H9.754A2.25 2.25 0 0 0 12 21Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Notifications
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center hover:text-orange"
                  onClick={toggleMenu}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mr-2 w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Profile
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header2;
