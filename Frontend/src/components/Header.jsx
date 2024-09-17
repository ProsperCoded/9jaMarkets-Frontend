import React from 'react';
import logo from '../assets/Logo.svg' 

function Header() {
  return (
    <header className="fixed top-0 w-full bg-transparent text-white z-10">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo Section */}
        <div className="logo">
          <img src= {logo} alt="9ja Markets" className="h-20" />
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <a href="#how-it-works" className="hover:text-orange-400">How it Works</a>
          <a href="#support" className="hover:text-orange-400">Support</a>
          <a href="#markets" className="hover:text-orange-400">Markets</a>
        </nav>

        {/* Authentication Links */}
        <div className="auth-links space-x-4">
          <button className="text-white border border-white px-4 py-1 rounded-full hover:bg-white hover:text-green-600 transition">Log in</button>
          <button className="bg-green-700 text-white px-4 py-1 rounded-full hover:bg-green-600 transition">Sign Up</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
