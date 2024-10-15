import React, { useState } from 'react';
import logo from '../assets/Logo.svg';
import googleLogo from '../assets/Google Icon.svg';
import facebookLogo from '../assets/facebook.png';
import appleLogo from '../assets/apple.svg';
import { Link } from 'react-router-dom';


const LoginModal = ({ showModal, closeModal, openSignUpModal}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (!showModal) return null; // Don't render if modal is hidden

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
      <div className="bg-white rounded-[5%] p-8 w-full max-w-lg relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-[6%] text-3xl text-gray-600 hover:text-gray-900 "
        >
          &times;
        </button>
        <img src={logo} alt="9ja Markets Logo" className="mx-auto mb-4 h-20" />
        <h2 className="text-2xl font-bold text-center text-green mb-4">Hello! Welcome back</h2>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 p-2 w-full border rounded-lg ${
                email ? 'border-green' : 'border-gray-300'
              }`}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 p-2 w-full border rounded-lg ${
                  password ? 'border-green-500' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {/* Toggle icons for showing/hiding password */}
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>
            <a href="/" className="text-sm text-green hover:underline">Forgot Password?</a>
          </div>
          <button 
            type="submit" 
            className="w-full bg-green hover:bg-hover-green text-white py-2 rounded-lg shadow-md hover:shadow-lg"
          >
            Log in
          </button>
        </form>
        <div className="text-center my-4 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-700">Or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="flex justify-center space-x-16 mt-4">
          <button className="text-lg">
            <a href="https://accounts.google.com" target="_blank" rel="noopener noreferrer">
              <img src={googleLogo} alt="Google Login" className="h-6" />
            </a>
          </button>
          <button className="text-lg">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={facebookLogo} alt="Facebook Login" className="h-6" />
            </a>
          </button>
          <button className="text-lg">
            <a href="https://appleid.apple.com" target="_blank" rel="noopener noreferrer">
              <img src={appleLogo} alt="Apple Login" className="h-6" />
            </a>
          </button>
        </div>
        <div className="text-center mt-4">
          <span className="text-sm text-gray-700"> Dont have an account? </span>
          <button onClick={() => { closeModal(); openSignUpModal(); }} className="text-green font-semibold hover:underline">
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
