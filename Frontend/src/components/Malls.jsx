import { useState } from 'react';
import searchIcon from '../assets/search.svg'; // Assuming this is your search icon
import { Link } from 'react-router-dom';

const states = [
  'Abuja', 'Abia', 'Adamawa', 'Akwa-Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
  'Borno', 'Cross-River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',  'FCT', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
  'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto',
  'Taraba', 'Yobe', 'Zamfara',
];

const malls = {
  Abuja: [
    { name: 'Agbalata mall Badagry', img: '/path/to/agbalata.png' },
    { name: 'Alaba International mall', img: '/path/to/alaba-international.png' },
    { name: 'Ajah mall', img: '/path/to/ajah-mall.png' },
    { name: 'Aratumi mall', img: '/path/to/aratumi-mall.png' },
    { name: 'Balogun mall, Lagos Island', img: '/path/to/balogun.png' },
    { name: 'Bar Beach mall', img: '/path/to/bar-beach-mall.png' },
    { name: 'Computer Village', img: '/path/to/computer-village.png' },
    { name: 'Èbúté Èrò mall, Lagos Island', img: '/path/to/ebutero-mall.png' },
    { name: 'Epe Fish mall', img: '/path/to/epe-fish-mall.png' },
    { name: 'Iyana-Iba mall', img: '/path/to/iyana-iba-mall.png' },
  ],
};

const mallPage = () => {
  const [selectedState, setSelectedState] = useState('Abuja');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredmalls = malls[selectedState]?.filter((mall) =>
    mall.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-white text-green py-2 drop-shadow-sm">
        <div className="container mx-auto flex justify-between items-center px-4">
            {/* Left Section with malls and Malls */}
            <div className='flex items-center space-x-4'>
              <Link to="/markets" className="text-lg font-thin">
                Markets
              </Link>
              <Link to="/malls" className="text-lg font-bold">
                Malls
              </Link>
            </div>
          
          {/* Center Section - Search Bar */}
          <div className="flex-grow flex justify-center">
            <div className="flex items-center bg-white border border-green text-gray-600 rounded-full px-4 py-2 w-full max-w-md focus:ring-green focus:ring-opacity-50">
              <input
                type="text"
                placeholder={`Search ${selectedState} malls...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full outline-none text-sm px-2"
              />
              <img src={searchIcon} alt="Search" className="h-5 w-5" />
            </div>
            
          </div>
          
          {/* Empty Right Side (Optional for now) */}
          <div className='flex items-center space-x-4'></div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex ">
        {/* Sidebar: List of States */}
        <aside className="w-[300px] bg-white h-full p-4 shadow-lg">
          <ul className="space-y-2">
            {states.map((state) => (
              <li
                key={state}
                onClick={() => setSelectedState(state)}
                className={`cursor-pointer p-2 ${
                  selectedState === state ? 'bg-green text-white' : 'text-gray-800'
                } hover:bg-green hover:opacity-75 hover:text-white rounded-lg focus:font-semibold`}
              >
                {state}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content: malls */}
        <div className="w-full bg-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{selectedState} State malls</h2>
          </div>

          {/* mall Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredmalls.length > 0 ? (
              filteredmalls.map((mall, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg">
                  <img
                    src={mall.img}
                    alt={mall.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{mall.name}</h3>
                    <a
                      href="#"
                      className="text-green text-sm hover:underline mt-2 block"
                    >
                      View more
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p>No malls found for "{searchTerm}"</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default mallPage;