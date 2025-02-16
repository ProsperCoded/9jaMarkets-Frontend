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
        { name: "Become a Marketer", href: "/marketer" },
        { name: "Invest", href: "/invest" },
      ]
    },
  ];

  return (
    <footer className="bg-Primary text-white px-8 py-10">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between gap-8">
          {/* Logo Section */}
          <div className="w-full md:w-auto flex justify-center md:justify-start">
            <img src={logo} alt="9jaMarkets Logo" className="h-10" />
          </div>
          
          {/* About Us Section */}
          <div className="w-full md:w-1/5">
            <h6 className="footer-title text-lg text-P2 font-semibold mb-4">About Us</h6>
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
          <div className="w-full md:w-1/5">
            <h6 className="footer-title text-lg text-P2 font-semibold mb-4">Support</h6>
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
          <div className="w-full md:w-1/5">
            <h6 className="footer-title text-lg text-P2 font-semibold mb-4">Get Our App</h6>
            <div className="flex flex-col space-y-3">
              <a 
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[135px]"
              >
                <img 
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                  alt="Get it on Google Play" 
                  className="w-full h-auto"
                />
              </a>
              <a 
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[120px]"
              >
                <img 
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store" 
                  className="w-full h-auto"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm">
              &copy; {new Date().getFullYear()} 9jaMarkets. All rights reserved.
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
      </div>
    </footer>
  );
};

export default Footer;