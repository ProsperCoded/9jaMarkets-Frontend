import logo from '../assets/Logo.svg'; // Adjust path as needed
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Header2 = () => {
  return (
    <div>
      {/* Combined Header */}
      <header className="bg-green text-white top-0 w-full z-10">
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
          <div className="flex space-x-4 items-center"> {/* Center the icons */}
            <Link to="/chat" className="hover:text-orange"> 
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clipRule="evenodd" />
              </svg>
            </Link>
            
            <Link to="/notifications" className="flex justify-center items-center">
              <FontAwesomeIcon icon={faEnvelope} className="hover:text-orange h-6 w-5" />
            </Link>

            <Link to="/profile">
              <div className="hover:text-orange"> 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                  <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header2;
