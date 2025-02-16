/**
 * The top navigation bar of the application, containing the logo, navigation
 * links, icons, and profile picture. On mobile devices, the navigation links
 * are hidden and can be accessed by clicking the burger menu icon on the right
 * side of the header. The navigation links will slide in from the right when
 * the icon is clicked.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Bookmark } from "lucide-react";
import logo from "../assets/Logo.svg";
import { UserAvatar } from "../componets-utils/UserAvatar";

const Header2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? "auto" : "hidden";
  };

  return (
    <>
      <header className="fixed top-0 z-[15] bg-Primary shadow px-4 w-full text-white">
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
                What we do
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
              <Link
                to="/bookmark"
                className="flex items-center p-2 hover:bg-white hover:text-Primary rounded-full transition-colors"
              >
                <Bookmark className="w-6 h-6" />
              </Link>
              <UserAvatar showName={true} auth={true} />
            </div>

            {/* Mobile Avatar and Menu */}
            <div className="md:hidden flex items-center gap-4">
              <Link
                to="/bookmark"
                className="flex items-center p-2 hover:bg-white hover:text-Primary rounded-full transition-colors"
              >
                <Bookmark className="w-6 h-6" />
              </Link>
              <div className="flex items-center">
                <UserAvatar showName={false} auth={true} />
              </div>
              <button onClick={toggleMenu}>
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Add a spacer div to prevent content from going under the header */}
      <div className="h-14"></div>

      {/* Mobile Side Panel */}
      {isMenuOpen && (
        <div className="z-[60] fixed inset-0">
          <div 
            className="fixed inset-0 bg-black/50 transition-opacity duration-300"
            onClick={toggleMenu}
          />
          <div 
            className={`fixed top-0 right-0 grid grid-rows-[auto_1fr_auto] bg-black bg-opacity-20 backdrop-blur-md p-6 w-1/2 h-full text-lg text-white overflow-y-auto transform transition-transform duration-300 ease-out ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Close Button */}
            <div className="flex justify-end">
              <X
                className="w-6 h-6 cursor-pointer"
                onClick={toggleMenu}
              />
            </div>
            {/* Nav Links */}
            <div className="align-top justify-start space-y-4">
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
                What we do
              </Link>
              <Link
                to="/markets"
                onClick={toggleMenu}
                className="block hover:text-orange"
              >
                Markets
              </Link>
            </div>
            <div className="mt-auto">
              <UserAvatar showName={true} auth={true} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header2;
