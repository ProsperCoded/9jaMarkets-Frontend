import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faBell, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/Logo.svg";

const Header2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profile, setProfile] = useState({ name: "", image: "" });

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
    <header className="bg-green px-4 text-white top-0 w-full z-20 shadow ">
      <div className="container mx-auto flex justify-between items-center p-2 h-14">
        {/* Logo and Nav */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="9ja Markets" className="h-8" />
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 ml-6 text-lg">
            <Link to="/" className="hover:text-orange">Home</Link>
            <Link to="/how-it-works" className="hover:text-orange">How it Works</Link>
            <Link to="/markets" className="hover:text-orange">Markets &rarr;</Link>
          </nav>
        </div>

        {/* Icons and Profile (Always visible) */}
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Desktop Icons */}
          <div className="md:flex space-x-4 hidden">
            <Link to="/cart" className="hover:text-orange flex items-center">
              <FontAwesomeIcon icon={faCartShopping} className="h-6 w-6" />
            </Link>
            <Link to="/notifications" className="hover:text-orange flex items-center">
              <FontAwesomeIcon icon={faBell} className="h-6 w-6" />
            </Link>
            <Link to={"/profile"} className="flex items-center space-x-2">
              <img src={profile.image} alt="Profile" className="h-8 w-8 rounded-full" />
              <span>{profile.name}</span>
            </Link>
          </div>

          {/* Mobile Burger Menu */}
          <button className="md:hidden text-white" onClick={toggleMenu}>
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Side Panel (Only Nav Links) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="absolute right-0 top-0 bg-black bg-opacity-20 backdrop-blur-md w-1/2 h-full p-6 text-lg space-y-6 overflow-y-auto text-white">
            <button className="absolute top-4 right-4 text-white" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
            </button>
            <Link to="/" className="block hover:text-orange" onClick={toggleMenu}>Home</Link>
            <Link to="/how-it-works" className="block hover:text-orange" onClick={toggleMenu}>How it Works</Link>
            <Link to="/markets" className="block hover:text-orange" onClick={toggleMenu}>Markets</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header2;
