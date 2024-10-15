import logo from '../assets/Logo.svg'; // Adjust path as needed
import { Link } from 'react-router-dom';

const Header2 = () => {
  return (
    <div>
      {/* Combined Header */}
      <header className="bg-green text-white top-0 w-full z-10"> {/* Added fixed positioning */}
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
      </div>
      </header>
    </div>
  );
}

export default Header2;
