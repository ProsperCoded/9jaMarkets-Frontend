import React, { useState } from 'react';
import logo from '../assets/Logo.svg';
import appleLogo from '../assets/apple.svg';
import facebookLogo from '../assets/facebook.png';
import googleLogo from '../assets/Google Icon.svg';

const SignUpModal = ({ showModal, closeModal }) => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    console.log('Sign Up Data:', formData);
    // Add your sign-up logic here (like sending data to the backend)
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-[5%] p-8 w-full max-w-lg relative">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="9ja Markets Logo" className="h-20" />
        </div>
        
        <h2 className="text-2xl font-semibold text-center text-green mb-6">
          Welcome to 9ja Markets
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
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
            className="w-full bg-green hover:bg-hover-green text-white py-2 rounded-lg shadow-md hover:shadow-lg"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          Already have an account?{' '}
          <a href="/LoginModal" className="text-green font-semibold hover:underline">
            Login
          </a>
        </p>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-sm text-gray-500">Or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex justify-center space-x-4">
          <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
            <img src={googleLogo} alt="Google" className="h-6" />
          </button>
          <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
            <img src={facebookLogo} alt="Facebook" className="h-6" />
          </button>
          <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
            <img src={appleLogo} alt="Apple" className="h-6" />
          </button>
        </div>

        <p className="text-center text-gray-500 text-xs mt-4">
          By continuing you agree to the{' '}
          <a href="/policy" className="text-gray-700 font-semibold hover:underline">
            Policy and Rules
          </a>
        </p>

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

