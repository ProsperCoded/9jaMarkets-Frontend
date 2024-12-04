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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                  <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                </svg>

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
