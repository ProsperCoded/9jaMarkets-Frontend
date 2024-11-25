import logo from '../assets/Logo.svg';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      {/* First Footer */}
      <footer className="bg-green text-white px-10 py-8">
        <div className="flex flex-wrap justify-between space-y-6 md:space-y-0">
          {/* Services Section */}
          <nav className="w-full md:w-1/4">
            <h6 className="footer-title text-hover-green text-lg font-semibold mb-4">About us</h6>
            <ul className="space-y-2">
              <li><a className="link link-hover">About 9ja Market</a></li>
              <li><a className="link link-hover">Terms & Conditions</a></li>
              <li><a className="link link-hover">Privacy Policy</a></li>
              <li><a className="link link-hover">Billing Policy</a></li>
              <li><a className="link link-hover">Cookie Policy</a></li>
              <li><a className="link link-hover">Copyright</a></li>
            </ul>
          </nav>

          {/* Company Section */}
          <nav className="w-full md:w-1/4">
            <h6 className="footer-title text-hover-green text-lg font-semibold mb-4">Support</h6>
            <ul className="space-y-2">
              <li><a className="link link-hover">Safety Tips</a></li>
              <li><a className="link link-hover">Contact Us</a></li>
              <li><a className="link link-hover">FAQ</a></li>
              <li><a className="link link-hover">Place Ads</a></li>
              <li><a className="link link-hover">Invest</a></li>
            </ul>
          </nav>
          {/* Placeholder for Future Sections */}
          <div className="hidden md:block md:w-1/4"></div>
        </div>
      </footer>

      {/* Second Footer */}
      <footer className="bg-green text-white border-t border-hover-green px-10 py-4 flex flex-wrap justify-between items-center">
        {/* Company Info */}
        <aside className="w-full md:w-auto flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="9ja Markets" className="h-8" />
          </Link>
          <p className="text-sm text-center md:text-left">
            9jaMarkets Ltd
            <br />
            Connecting all Nigerian markets
          </p>
        </aside>

        {/* Social Media Links */}
        <nav className="w-full md:w-auto flex justify-center md:justify-end space-x-4 mt-4 md:mt-0">
          {/* Twitter Icon */}
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
            </svg>
          </a>

          {/* Instagram Icon */}
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current">
              <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.75-2a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z"></path>
            </svg>
          </a>

          {/* Facebook Icon */}
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
            </svg>
          </a>
        </nav>
      </footer>
    </>
  );
}

export default Footer;
