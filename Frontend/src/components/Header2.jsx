/**
 * The top navigation bar of the application, containing the logo, navigation
 * links, icons, and profile picture. On mobile devices, the navigation links
 * are hidden and can be accessed by clicking the burger menu icon on the right
 * side of the header. The navigation links will slide in from the right when
 * the icon is clicked.
 */
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Bookmark, ShieldCheck, Bell } from "lucide-react";
import {
  BOOKMARK_CONTEXT,
  USER_PROFILE_CONTEXT,
  LOGIN_MODAL_CONTEXT,
} from "@/contexts";
import logo from "../assets/Logo.svg";
import { UserAvatar } from "../componets-utils/UserAvatar";
import { Badge } from "antd";

const Header2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { bookmarkCount } = useContext(BOOKMARK_CONTEXT);
  const { userProfile } = useContext(USER_PROFILE_CONTEXT);
  const { setLoginOpen } = useContext(LOGIN_MODAL_CONTEXT);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? "auto" : "hidden";
  };

  const handleAuthClick = () => {
    if (!userProfile) {
      setLoginOpen(true);
    }
  };

  return (
    <>
      <header className="top-0 z-[15] fixed bg-Primary shadow px-4 w-full text-white">
        <div className="flex justify-between items-center mx-auto p-2 h-14 container">
          {/* Logo and Nav */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="9ja Markets" className="h-8" />
            </Link>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6 ml-6 text-lg">
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
            <div className="hidden md:flex space-x-4">
              {userProfile && userProfile.userType === "customer" && (
                <Link
                  to={userProfile ? "/bookmark" : "#"}
                  onClick={handleAuthClick}
                  className="relative flex items-center bg-P2/35 p-2 rounded-full transition-colors"
                >
                  <Bookmark className="w-6 h-6" />
                  {bookmarkCount > 0 && (
                    <span className="-top-1 -right-1 absolute flex justify-center items-center bg-orange px-1 rounded-full min-w-[18px] h-[18px] text-white text-xs">
                      {bookmarkCount}
                    </span>
                  )}
                </Link>
              )}
              {userProfile && (
                <Badge count={3} size="small" offset={[-5, 5]}>
                  <div className="hover:bg-P2/35 p-2 rounded-full cursor-pointer">
                    <Bell className="w-5 h-5" />
                  </div>
                </Badge>
              )}
              <UserAvatar showName={true} auth={true} />
            </div>

            {/* Mobile Avatar and Menu */}
            <div className="md:hidden flex items-center gap-4">
              {userProfile && userProfile.userType === "customer" && (
                <Link
                  to={userProfile ? "/bookmark" : "#"}
                  onClick={handleAuthClick}
                  className="relative flex items-center hover:bg-white p-2 rounded-full hover:text-Primary transition-colors"
                >
                  <Bookmark className="w-6 h-6" />
                  {bookmarkCount > 0 && (
                    <span className="top-1 right-1 absolute flex justify-center items-center bg-orange px-1 rounded-full min-w-[18px] h-[18px] text-white text-xs">
                      {bookmarkCount}
                    </span>
                  )}
                </Link>
              )}
              {userProfile && (
                <Badge count={3} size="small" offset={[-5, 5]}>
                  <div className="hover:bg-P2/35 p-2 rounded-full cursor-pointer">
                    <Bell className="w-5 h-5" />
                  </div>
                </Badge>
              )}
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
      <div
        className={`z-[60] fixed inset-0 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className="fixed inset-0 bg-black/50 transition-opacity duration-300"
          onClick={toggleMenu}
        />
        <div className="top-0 right-0 fixed grid grid-rows-[auto_1fr_auto] bg-black bg-opacity-20 backdrop-blur-md p-6 w-1/2 h-full overflow-y-auto text-white text-lg">
          {/* Close Button */}
          <div className="flex justify-end">
            <X className="w-6 h-6 cursor-pointer" onClick={toggleMenu} />
          </div>
          {/* Nav Links */}
          <div className="justify-start space-y-4 align-top">
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
            {userProfile && userProfile.role === "ADMIN" && (
              <Link
                to="/admin"
                onClick={toggleMenu}
                className="flex items-center gap-1.5 hover:text-orange"
              >
                <ShieldCheck className="w-5 h-5" />
                Admin Dashboard
              </Link>
            )}
          </div>
          <div className="mt-auto">
            <UserAvatar showName={true} auth={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header2;
