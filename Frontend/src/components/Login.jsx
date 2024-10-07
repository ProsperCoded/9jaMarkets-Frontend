import React from 'react';
import logo from '../assets/Logo.svg';


const LoginModal = ({ showModal, closeModal }) => {
  if (!showModal) return null; // Don't render if modal is hidden

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 ">
      <div className="bg-white rounded-xl p-8 w-full max-w-lg relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-xl text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>
        <img src={logo} alt="9ja Markets Logo" className="mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-center text-green mb-4">Hello! Welcome back</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="mt-1 p-2 w-full border border-gray-300 rounded"
              />
              <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12H9m4 0H9m4-4H9m4 8H9"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <a href="/" className="text-sm text-green hover:underline">Forgot Password?</a>
          </div>
          <button className="w-full bg-green text-white py-2 rounded">Log in</button>
        </form>
        <div className="text-center my-4">
          <span className="block text-sm text-gray-700">Or</span>
          <div className="flex justify-center space-x-4 mt-4">
            <button className="text-lg">
              <img src="google-icon-path" alt="Google Login" />
            </button>
            <button className="text-lg">
              <img src="facebook-icon-path" alt="Facebook Login" />
            </button>
            <button className="text-lg">
              <img src="apple-icon-path" alt="Apple Login" />
            </button>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm">
            Don't have an account?{' '}
            <a href="/" className="text-green font-medium">Create a new account</a>
          </p>
        </div>
        <div className="text-center mt-4">
          <p className="text-xs text-gray-500">
            By continuing you agree to the{' '}
            <a href="/" className="text-green-600">Policy and Rules</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
