import React from 'react';

const Settings = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <aside className="bg-white shadow-md p-4 w-[300px] h-screen">
        <h2 className="mb-4 font-semibold text-xl">Settings</h2>
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
        <div className="bg-white shadow-lg mx-auto p-6 rounded-lg max-w-lg">
          <h2 className="mb-6 font-semibold text-2xl text-gray-700">Personal Profile</h2>
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img 
                src="https://via.placeholder.com/100" 
                alt="Profile" 
                className="rounded-full w-24 h-24 object-cover" 
                lazy="true"
              />
              <div className="right-0 bottom-0 absolute flex justify-center items-center bg-green-600 rounded-full w-6 h-6 text-white">
                <span className="font-semibold text-sm">+</span>
              </div>
            </div>
          </div>

          <form>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-gray-600">First Name</label>
                <input 
                  type="text" 
                  className="focus:border-green p-2 border rounded-lg w-full focus:outline-none" 
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-600">Last Name</label>
                <input 
                  type="text" 
                  className="focus:border-green p-2 border rounded-lg w-full focus:outline-none" 
                  placeholder="Enter last name"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-600">Location</label>
                <select 
                  className="focus:border-green p-2 border rounded-lg w-full focus:outline-none"
                >
                  <option>Select location</option>
                  <option>Lagos</option>
                  <option>Abuja</option>
                  <option>Port Harcourt</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-gray-600">Birthday</label>
                <input 
                  type="date" 
                  className="focus:border-green p-2 border rounded-lg w-full focus:outline-none" 
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-600">Gender</label>
                <select 
                  className="focus:border-green p-2 border rounded-lg w-full focus:outline-none"
                >
                  <option>Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              className="bg-green hover:bg-green opacity-50 mt-6 py-2 rounded-lg w-full font-semibold text-white transition duration-300"
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
