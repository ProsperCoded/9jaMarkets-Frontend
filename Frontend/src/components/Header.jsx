/**
 * The main navigation bar of the application, containing the logo, navigation
 * links, icons, and profile picture. On mobile devices, the navigation links
 * are hidden and can be accessed by clicking the burger menu icon on the right
 * side of the header. The navigation links will slide in from the right when
 * the icon is clicked.
 *
 * @param {Function} openLoginModal - Function to open the login modal.
 * @param {Function} openSignUpModal - Function to open the sign up modal.
 * @returns {ReactElement} The header element.
 */
import { useState, useEffect, useContext } from "react";
import logo from "../assets/Logo.svg";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { UserAvatar } from "../componets-utils/UserAvatar";
import { USER_PROFILE_CONTEXT } from "@/contexts";

function Header() {
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
      <div className="flex flex-nowrap justify-between items-center mx-auto px-6 py-3 container">
        {/* Logo */}
        <div className="flex flex-grow">
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
        <div className="md:block hidden">
          <UserAvatar showName={true} auth={true} />
        </div>

        {/* Mobile Avatar and Menu */}
        <div className="md:hidden flex items-center gap-4">
          <div className="flex items-center">
            <UserAvatar showName={false} auth={true} />
          </div>
          <button className="text-white p-2 hover:bg-white/10 rounded-full transition-colors" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Side Panel */}
        {isMenuOpen && (
          <div className="z-30 fixed inset-0">
            <div className="top-0 right-0 absolute grid grid-rows-[auto_1fr_auto] bg-black bg-opacity-20 backdrop-blur-md p-6 w-1/2 h-full text-lg text-white overflow-y-auto">
              {/* Close Button */}
              <div className="flex justify-end">
                <button 
                  onClick={toggleMenu}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 cursor-pointer" />
                </button>
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
      </div>
    </header>
  );
}

export default Header;