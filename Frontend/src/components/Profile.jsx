import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faList,
  faCartShopping,
  faMessage,
  faGem,
  faWallet,
  faUsers,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import DefaultProfileContent from './DefaultProfileContent';

const Profile = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="bg-white text-black w-[300px] shadow-lg p-5">
        {/* Profile Section */}
        <div className="flex items-center mb-8 pt-8">
          <img
            src="https://via.placeholder.com/50"
            alt="profile"
            className="rounded-full h-12 w-12"
          />
          <div className="ml-3">
            <h2 className="text-lg font-semibold">Achonu Chioma</h2>
            <p className="text-sm">+123-456-7890</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-green hover:text-white"
              >
                <FontAwesomeIcon icon={faHome} />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/product"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-green hover:text-white"
              >
                <FontAwesomeIcon icon={faList} />
                <span>Products</span>
              </Link>
            </li>
            <li>
              <Link
                to="/orders"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-green hover:text-white"
              >
                <FontAwesomeIcon icon={faCartShopping} />
                <span>Orders</span>
              </Link>
            </li>
            <li>
              <Link
                to="/customers"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-green hover:text-white"
              >
                <FontAwesomeIcon icon={faUsers} />
                <span>Customers</span>
              </Link>
            </li>
            <li>
              <Link
                to="/messages"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-green hover:text-white"
              >
                <FontAwesomeIcon icon={faMessage} />
                <span>Messages</span>
              </Link>
            </li>
            <li>
              <Link
                to="/wallet"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-green hover:text-white"
              >
                <FontAwesomeIcon icon={faWallet} />
                <span>Wallet</span>
              </Link>
            </li>
            <li>
              <Link
                to="/premium"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-green hover:text-white"
              >
                <FontAwesomeIcon icon={faGem} />
                <span>Premium</span>
              </Link>
            </li>
            <li className="pt-10">
              <Link
                to="/logout"
                className="flex items-center space-x-3 p-2 pt-25 rounded-lg text-red-500 hover:bg-red-100 hover:text-red-700"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 ">
          <DefaultProfileContent />
      </main>
    </div>
  );
};

export default Profile;
