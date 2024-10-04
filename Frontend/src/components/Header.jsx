import React, { useState, useEffect } from 'react';
import logo from '../assets/Logo.svg';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
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
      style={{ padding: '1px 5px' }} // Adjust padding here
    >
      <div className="container mx-auto flex justify-between items-center p-2 text-3xl font-bold">
        {/* Logo Section */}
        <div className="flex items-center justify-center">
          
            <img src={logo} alt="9ja Markets" className="h-10" /> {/* Reduced logo height */}
            <a href="http://9jamarkets.com"target="_blank" rel="noopener noreferrer" className="block cursor-pointer"></a>
        
        

        <nav className="flex space-x-4 m-4"> {/* Reduced space-x-6 to space-x-4 */}
          <a href="#how-it-works" className="hover:text-orange text-lg">How it Works</a> {/* Reduced font size */}
          <a href="#support" className="hover:text-orange text-lg">Support</a> {/* Reduced font size */}
          <a href="#markets" className="hover:text-orange text-lg">Markets &rarr;</a> {/* Reduced font size */}
        </nav>
        </div>
        {/* Authentication Links */}
        <div className="auth-links space-x-3"> {/* Reduced space-x-4 to space-x-3 */}
          <button className="text-white border border-white px-3 py-1 rounded-full hover:bg-white hover:text-green transition text-lg">Log in</button> {/* Reduced padding and font size */}
          <button className="bg-green text-white px-3 py-1 rounded-full hover:bg-hover-green transition text-lg">Sign Up</button> {/* Reduced padding and font size */}
        </div>
      </div>
    </header>
  );
}

export default Header;
