import React from 'react';

const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-[300px] bg-white h-screen p-4 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        <ul className="space-y-4">
          <li><a href="#" className="block py-2 text-gray-700">Personal Profile</a></li>
          <li><a href="#" className="block py-2 text-gray-700">Business Profile</a></li>
          <li><a href="#" className="block py-2 text-gray-700">Verification badge</a></li>
          <li><a href="#" className="block py-2 text-gray-700">Change phone number</a></li>
          <li><a href="#" className="block py-2 text-gray-700">Change Email</a></li>
          <li><a href="#" className="block py-2 text-gray-700">Change Theme</a></li>
          <li><a href="#" className="block py-2 text-gray-700">Disable chats</a></li>
          <li><a href="#" className="block py-2 text-gray-700">Disable Feedback</a></li>
          <li><a href="#" className="block py-2 text-gray-700">Notifications</a></li>
          <li><a href="#" className="block py-2 text-gray-700">Change Password</a></li>
          <li><a href="#" className="block py-2 text-gray-700">Delete account</a></li>
          <li><a href="#" className="block py-2 text-red-600">Log out</a></li>
        </ul>
      </aside>

      {/* Personal Profile Form */}
      <div className="flex-1 p-8">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Personal Profile</h2>
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img 
                src="https://via.placeholder.com/100" 
                alt="Profile" 
                className="h-24 w-24 rounded-full object-cover" 
              />
              <div className="absolute bottom-0 right-0 h-6 w-6 bg-green-600 rounded-full text-white flex items-center justify-center">
                <span className="text-sm font-semibold">+</span>
              </div>
            </div>
          </div>

          <form>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 mb-1">First Name</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-lg focus:outline-none focus:border-green" 
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Last Name</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-lg focus:outline-none focus:border-green" 
                  placeholder="Enter last name"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Location</label>
                <select 
                  className="w-full p-2 border rounded-lg focus:outline-none focus:border-green"
                >
                  <option>Select location</option>
                  <option>Lagos</option>
                  <option>Abuja</option>
                  <option>Port Harcourt</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Birthday</label>
                <input 
                  type="date" 
                  className="w-full p-2 border rounded-lg focus:outline-none focus:border-green" 
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Gender</label>
                <select 
                  className="w-full p-2 border rounded-lg focus:outline-none focus:border-green"
                >
                  <option>Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full mt-6 bg-green opacity-50 text-white py-2 rounded-lg font-semibold hover:bg-green transition duration-300"
            >
              Saved
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;
