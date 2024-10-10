import { useState } from 'react';
import logo from '../assets/Logo.svg'; // Adjust this according to your assets

const SignUpModal = ({ showModal, closeModal }) => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign Up Data:', formData);
    // Logic for signup, such as sending data to the backend, goes here
  };

  if (!showModal) return null; // Don't render if modal is not visible

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-lg relative">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="9ja Markets Logo" className="h-20" />
        </div>
        
        <h2 className="text-2xl font-semibold text-center text-green mb-6">
          Welcome to 9ja Markets
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Form fields go here */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green"
              required
            />
          </div>
          {/* Add remaining fields similarly */}
          <button
            type="submit"
            className="w-full bg-green text-white py-2 rounded-lg hover:bg-hover-green transition-colors"
          >
            Sign Up
          </button>
        </form>

        <button
          onClick={closeModal}
          className="absolute top-2 right-[6%] text-3xl text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default SignUpModal;
