import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faSearch,
  faUserCircle,
  faArrowRight,
  faLink,
} from '@fortawesome/free-solid-svg-icons';

const Followers = () => {
  const [followers, setFollowers] = useState([]); // State for follower list
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for errors

  // Fetch followers from the server
  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/followers'); // Replace with your actual API endpoint
        setFollowers(response.data); // Assuming response.data contains an array of followers
      } catch (err) {
        setError('Failed to load followers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, []);

  // Filter followers based on the search term
  const filteredFollowers = followers.filter(follower =>
    follower.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <FontAwesomeIcon icon={faUsers} className="text-green mr-2" /> Followers
          </h2>
          <div>
            <button className="px-4 py-2 bg-green text-white rounded-lg mr-2 hover:bg-hover-green">
              My Followers
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
              Following
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative mb-4">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green"
            placeholder="Type a name"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400"
          />
        </div>

        {/* Followers List */}
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : filteredFollowers.length > 0 ? (
          <ul className="space-y-4">
            {filteredFollowers.map(follower => (
              <li
                key={follower.id}
                className="flex items-center justify-between bg-gray-100 p-4 rounded-lg"
              >
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="text-green text-3xl mr-4"
                  />
                  <span className="text-gray-800 font-medium">{follower.name}</span>
                </div>
                <button className="text-green hover:underline">
                  <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
                  View Profile
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">
            No followers found. Try adjusting your search.
          </p>
        )}

        {/* Invite Link */}
        <div className="mt-6 text-center">
        <FontAwesomeIcon icon={faLink} className="mr-2" />
          <a
            href="/invite"
            className="text-black font-medium hover:underline"
          >
            Invite your friends to 9ja Markets
          </a>
        </div>
      </div>
    </div>
  );
};

export default Followers;
