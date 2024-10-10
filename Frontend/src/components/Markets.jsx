import { useState } from 'react';
import logo from '../assets/Logo.svg'; // Adjust path as needed
import searchIcon from '../assets/search.svg'; // Assuming this is your search icon
import userIcon from '../assets/Profile.svg'; // Assuming this is your user profile icon
import { Link } from 'react-router-dom';

const states = [
  'Abuja', 'Abia', 'Adamawa', 'Akwa-Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
  'Borno', 'Cross-River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',  'FCT', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
  'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto',
  'Taraba', 'Yobe', 'Zamfara',
];

const markets = {
    Lagos: [
        { name: 'Agbalata Market Badagry', img: '/path/to/agbalata.png' },
        { name: 'Alaba International Market', img: '/path/to/alaba-international.png' },
        { name: 'Ajah Market', img: '/path/to/ajah-market.png' },
        { name: 'Aratumi Market', img: '/path/to/aratumi-market.png' },
        { name: 'Balogun Market, Lagos Island', img: '/path/to/balogun.png' },
        { name: 'Bar Beach Market', img: '/path/to/bar-beach-market.png' },
        { name: 'Computer Village', img: '/path/to/computer-village.png' },
        { name: 'Èbúté Èrò Market, Lagos Island', img: '/path/to/ebutero-market.png' },
        { name: 'Epe Fish Market', img: '/path/to/epe-fish-market.png' },
        { name: 'Iyana-Iba Market', img: '/path/to/iyana-iba-market.png' },
        { name: 'Ikotun Market', img: '/path/to/ikotun-market.png' },
        { name: 'Idumota Market', img: '/path/to/idumota-market.png' },
        { name: 'Ita Faji Market', img: '/path/to/ita-faji-market.png' },
        { name: 'Isale Eko Market, Lagos Island', img: '/path/to/isale-eko-market.png' },
        { name: 'Jankarra Market, Lagos Island', img: '/path/to/jankarra-market.png' },
        { name: 'Ladipo Market', img: '/path/to/ladipo-market.png' },
        { name: 'Lekki Market', img: '/path/to/lekki-market.png' },
        { name: 'Agboju Market', img: '/path/to/agboju-market.png' },
        { name: 'Daleko Market', img: '/path/to/daleko-market.png' },
        { name: 'Morocco I and II markets', img: '/path/to/morocco-markets.png' },
        { name: 'Mushin Market', img: '/path/to/mushin-market.png' },
        { name: 'Oyingbo Market', img: '/path/to/oyingbo-market.png' },
        { name: 'Mile 12 Market', img: '/path/to/mile12-market.png' },
        { name: 'Oniru New Market', img: '/path/to/oniru-new-market.png' },
        { name: 'Fespar Market', img: '/path/to/fespar-market.png' },
        { name: 'Oshodi Market', img: '/path/to/oshodi-market.png' },
        { name: 'Rauf Aregbesola Market', img: '/path/to/rauf-aregbesola-market.png' },
        { name: 'Téjúoshó Market', img: '/path/to/tejushosho-market.png' },
        { name: 'Sangotedo Market', img: '/path/to/sangotedo-market.png' },
        { name: 'Ajuwe Market', img: '/path/to/ajuwe-market.png' },
        { name: 'Jakande Market', img: '/path/to/jakande-market.png' },
        { name: 'Akodo Market, Epe', img: '/path/to/akodo-market.png' },
        { name: 'Boundary Seafood Market', img: '/path/to/boundary-seafood-market.png' },
        { name: 'Apongbo Market', img: '/path/to/apongbo-market.png' },
        { name: 'Liverpool Crayfish Market', img: '/path/to/liverpool-crayfish-market.png' },
        { name: 'Arena Market', img: '/path/to/arena-market.png' },
        { name: 'Cele Market', img: '/path/to/cele-market.png' },
        { name: 'Ijesha Market, Ijeshatedo', img: '/path/to/ijesha-market.png' },
        { name: 'State Market', img: '/path/to/state-market.png' },
        { name: 'Agege Market', img: '/path/to/agege-market.png' },
      ],
  // Add markets for other states
};

const MarketPage = () => {
  const [selectedState, setSelectedState] = useState('Lagos');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Green Header */}
      <header className="bg-green text-white py-2">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Logo */}
          
          <Link to="/" className="flex items-center"> {/* Make the logo clickable */}
            <img src={logo} alt="9ja Markets" className="h-8" />
          </Link>
          {/* User Icons */}
          <img src={userIcon} alt="Profile" className="h-8 w-8 rounded-full" />
        </div>
      </header>
      <header className="bg-white text-green py-2 drop-shadow-sm ">
            <div className="container mx-auto flex justify-center items-center px-4">
                {/* Search Bar */}
                <div className="flex items-center bg-white border border-green text-gray-600 rounded-full px-4 py-2 w-full max-w-md focus:ring-green focus:ring-opacity-50">
                <input
                    type="text"
                    placeholder="Search a mall or market"
                    className="w-full outline-none text-sm px-2"
                />
                <img src={searchIcon} alt="Search" className="h-5 w-5" />
                </div>
            </div>
        </header>


      {/* Main Layout */}
      <div className="flex flex-grow">
        {/* Side Panel */}
        <div className="w-1/4 bg-white p-6">
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
        </div>

        {/* Main Content */}
        <div className="w-3/4 bg-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{selectedState} State</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {markets[selectedState] &&
              markets[selectedState].map((market, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={market.img}
                    alt={market.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{market.name}</h3>
                    <a
                      href="#"
                      className="text-green text-sm hover:underline mt-2 block"
                    >
                      View more
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPage;
