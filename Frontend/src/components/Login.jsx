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
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 ">
      <div className="bg-white rounded-[5%] p-8 w-full max-w-lg relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-[6%] text-3xl text-gray-600 hover:text-gray-900 "
        >
          &times;
        </button>
        <img src={logo} alt="9ja Markets Logo" className="mx-auto mb-4 h-20" />
        <h2 className="text-2xl font-bold text-center text-green mb-4">Hello! Welcome back</h2>
        <form className="space-y-4">
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
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 61 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M30.5 12.6C28.2939 12.6 26.1781 13.485 24.6182 15.0603C23.0582 16.6356 22.1818 18.7722 22.1818 21C22.1818 23.2278 23.0582 25.3644 24.6182 26.9397C26.1781 28.515 28.2939 29.4 30.5 29.4C32.7061 29.4 34.8219 28.515 36.3818 26.9397C37.9418 25.3644 38.8182 23.2278 38.8182 21C38.8182 18.7722 37.9418 16.6356 36.3818 15.0603C34.8219 13.485 32.7061 12.6 30.5 12.6ZM30.5 35C26.8231 35 23.2969 33.525 20.6969 30.8995C18.097 28.274 16.6364 24.713 16.6364 21C16.6364 17.287 18.097 13.726 20.6969 11.1005C23.2969 8.475 26.8231 7 30.5 7C34.1769 7 37.7031 8.475 40.3031 11.1005C42.903 13.726 44.3636 17.287 44.3636 21C44.3636 24.713 42.903 28.274 40.3031 30.8995C37.7031 33.525 34.1769 35 30.5 35ZM30.5 0C16.6364 0 4.79682 8.708 0 21C4.79682 33.292 16.6364 42 30.5 42C44.3636 42 56.2032 33.292 61 21C56.2032 8.708 44.3636 0 30.5 0Z"
                    fill="#737478"
                  />
                </svg>
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
              />{' '}
              Remember me
            </label>
            <a href="/" className="text-sm text-green hover:underline">Forgot Password?</a>
          </div>
          <button className="w-full bg-green hover:bg-hover-green text-white py-2 rounded-lg shadow-md hover:shadow-lg">
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
        <div className="text-center">
          <p className="text-sm">
            Don't have an account?{' '}
            <Link href="/Signup" className="text-green font-medium hover:underline">Create a new account</Link>
          </p>
        </div>
        <div className="text-center mt-4">
          <p className="text-xs text-gray-500">
            By continuing you agree to the{' '}
            <a href="/policy" className="text-gray-700 font-semibold hover:underline">Policy and Rules</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;