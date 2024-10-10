import logo from '../assets/Logo.svg'; // Adjust path as needed

import userIcon from '../assets/Profile.svg'; // Assuming this is your user profile icon

const Header2 = () => {
  return (
    <div>
      {/* Combined Header */}
      <header className="bg-green text-white top-0 w-full z-10"> {/* Added fixed positioning */}
        <div className="container mx-auto flex justify-between items-center px-4 py-4">
          {/* Logo */}
          <img src={logo} alt="9ja Markets" className="h-8" />
          {/* User Icons */}
          <img src={userIcon} alt="Profile" className="h-8 w-8 rounded-full" />
        </div>
      </header>
      <header className="bg-white text-green-500 drop-shadow-sm  top-10 w-full z-10"> {/* Added fixed positioning */}
        <div className="container mx-auto flex justify-center items-center px-4 py-4">
          {/* Search Bar */}
          
           
            <h2 className="text-green text-2xl font-bold" >How It Works</h2>
         
        </div>
      </header>
    </div>
  );
}

export default Header2;
