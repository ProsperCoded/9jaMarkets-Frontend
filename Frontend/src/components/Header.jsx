import { useState, useEffect } from 'react';
import logo from '../assets/Logo.svg';
import { Link } from 'react-router-dom';

function Header({ openLoginModal, openSignUpModal }) {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 w-full transition-all duration-300 ${
        isScrolled ? 'bg-black bg-opacity-20 backdrop-blur-md text-white' : 'bg-transparent text-white'
      } z-10`}
      style={{ padding: '1px 5px' }}
    >
        <div className="container mx-auto flex justify-between items-center p-2 text-3xl font-bold h-14">
        <div className="flex items-center justify-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="9ja Markets" className="h-8" />
          </Link>
          <nav className="flex space-x-4 m-4">
            <Link to="/" className="hover:text-orange text-lg">Home</Link>
            <Link to="/how-it-works" className="hover:text-orange text-lg">How it Works</Link>
            <Link to="/markets" className="hover:text-orange text-lg">Markets &rarr;</Link>
          </nav>
        </div>
        <div className="auth-links space-x-3 pb-3">
          <button
            onClick={openLoginModal}
            className="text-white  px-4  rounded-full hover:bg-white hover:text-green transition text-lg"
          >
            Login
          </button>
          <button 
            onClick={openSignUpModal}
            className="bg-green text-white px-4  rounded-full hover:bg-hover-green transition text-lg"
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
