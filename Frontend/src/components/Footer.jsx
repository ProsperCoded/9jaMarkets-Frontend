import React from "react";
import logo from '../assets/Logo.svg';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Terms & Conditions", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Billing Policy", href: "/billing-policy" },
        { name: "Cookie Policy", href: "/cookie" },
        { name: "Copyright", href: "/copyright" },
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Safety Tips", href: "/safety" },
        { name: "Contact Us", href: "/contact" },
        { name: "FAQ", href: "/faq" },
        { name: "Place Ads", href: "/ads" },
        { name: "Invest", href: "/invest" },
      ]
    },
    {
      title: "Apps",
      links: [
        { name: "Google Play", href: "https://play.google.com" },
        { name: "App Store", href: "https://www.apple.com/app-store/" },
      ]
    },
  ];

  return (
    <footer className="bg-Primary text-white px-8 py-10">
      <div className="container mx-auto flex flex-wrap justify-between space-y-8 md:space-y-0">
        {/* Logo Section */}
        <div className="w-full md:w-auto flex justify-center md:justify-start mb-6 md:mb-0">
          <img src={logo} alt="9ja Markets Logo" className="h-10" />
        </div>
        
        {/* About Us Section */}
        <div className="w-full md:w-1/4">
          <h6 className="footer-title text-lg font-semibold mb-4">About Us</h6>
          <ul className="space-y-2">
            {footerLinks[0].links.map((link, index) => (
              <li key={index}>
                <Link 
                  to={link.href}
                  className="text-white hover:text-orange transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Section */}
        <div className="w-full md:w-1/4">
          <h6 className="footer-title text-lg font-semibold mb-4">Support</h6>
          <ul className="space-y-2">
            {footerLinks[1].links.map((link, index) => (
              <li key={index}>
                <Link 
                  to={link.href}
                  className="text-white hover:text-orange transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Apps Section */}
        <div className="w-full md:w-1/4">
          <h6 className="footer-title text-lg font-semibold mb-4">Apps</h6>
          <ul className="space-y-4">
            {footerLinks[2].links.map((link, index) => (
              <li key={index}>
                <a 
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-orange transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t border-white/20 pt-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-sm">
            &copy; {new Date().getFullYear()} 9ja Markets. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange">
              <Twitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange">
              <Instagram size={24} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange">
              <Facebook size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
