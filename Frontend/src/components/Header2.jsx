import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faBell,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/Logo.svg";
import { USER_PROFILE_CONTEXT } from "../contexts";
import { UserAvatar } from "../componets-utils/UserAvatar";

const Header2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profile, setProfile] = useState({ name: "", image: "" });
  const { userProfile } = useContext(USER_PROFILE_CONTEXT);
  // Fetch profile data from backend
  useEffect(() => {
    // Fetch from your backend API here and set the profile state
    // Example API call (replace with your actual API endpoint):
    // fetch('/api/profile').then(response => response.json()).then(data => setProfile(data));

    setProfile({
      name: "Achonu Chioma", // Replace with dynamic name
      image: "/path/to/profile-image.jpg", // Replace with dynamic image URL
    });
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? "auto" : "hidden";
  };

  return (
    <header className="top-0 z-20 bg-green shadow px-4 w-full text-white">
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

        {/* Icons and Profile (Always visible) */}
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Desktop Icons */}
          <div className="md:flex space-x-4 hidden">
            <Link to="/cart" className="flex items-center hover:text-orange">
              <FontAwesomeIcon icon={faCartShopping} className="w-6 h-6" />
            </Link>
            <Link
              to="/notifications"
              className="flex items-center hover:text-orange"
            >
              <FontAwesomeIcon icon={faBell} className="w-6 h-6" />
            </Link>
            <Link to={"/profile/dashboard"}>
              <UserAvatar showName={true} />
            </Link>
          </div>

          {/* Mobile Burger Menu */}
          <button className="md:hidden text-white" onClick={toggleMenu}>
            <FontAwesomeIcon
              icon={isMenuOpen ? faTimes : faBars}
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>

      {/* Mobile Side Panel (Only Nav Links) */}
      {isMenuOpen && (
        <div className="z-30 fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="top-0 right-0 absolute space-y-6 bg-black bg-opacity-20 backdrop-blur-md p-6 w-1/2 h-full text-lg text-white overflow-y-auto">
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
          </div>
        </div>
      )}
    </header>
  );
};

export default Header2;
