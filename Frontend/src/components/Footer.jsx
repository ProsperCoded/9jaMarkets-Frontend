import logo from '../assets/Logo.svg';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Facebook } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-Primary text-white px-8 py-10">
      <div className="container mx-auto flex flex-wrap justify-between space-y-8 md:space-y-0">
        {/* Logo Section */}
        <div className="w-full md:w-auto flex justify-center md:justify-start mb-6 md:mb-0">
          <img src={logo} alt="9ja Markets Logo" className="h-10" />
        </div>
        
        {/* About Us Section */}
        <nav className="w-full md:w-1/4">
          <h6 className="footer-title text-lg font-semibold mb-4">About Us</h6>
          <ul className="space-y-2">
            <li><Link to="/about" className="link link-hover">About 9ja Market</Link></li>
            <li><Link to="/terms" className="link link-hover">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="link link-hover">Privacy Policy</Link></li>
            <li><Link to="/billing" className="link link-hover">Billing Policy</Link></li>
            <li><Link to="/cookie" className="link link-hover">Cookie Policy</Link></li>
            <li><Link to="/copyright" className="link link-hover">Copyright</Link></li>
          </ul>
        </nav>

        {/* Support Section */}
        <nav className="w-full md:w-1/4">
          <h6 className="footer-title text-lg font-semibold mb-4">Support</h6>
          <ul className="space-y-2">
            <li><Link to="/safety" className="link link-hover">Safety Tips</Link></li>
            <li><Link to="/contact" className="link link-hover">Contact Us</Link></li>
            <li><Link to="/faq" className="link link-hover">FAQ</Link></li>
            <li><Link to="/ads" className="link link-hover">Place Ads</Link></li>
            <li><Link to="/invest" className="link link-hover">Invest</Link></li>
          </ul>
        </nav>

        {/* Apps Section */}
        <nav className="w-full md:w-1/4">
          <h6 className="footer-title text-lg font-semibold mb-4">Apps</h6>
          <ul className="space-y-4">
            <li>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png"
                  alt="Get it on Google Play"
                  className="h-10"
                />
              </a>
            </li>
            <li>
              <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Download_on_the_App_Store_Badge.svg/512px-Download_on_the_App_Store_Badge.svg.png"
                  alt="Download on the App Store"
                  className="h-10"
                />
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mt-8 border-t border-white/20 pt-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-sm">
            &copy; {new Date().getFullYear()} 9ja Markets. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
              <Twitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
              <Instagram size={24} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
              <Facebook size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
