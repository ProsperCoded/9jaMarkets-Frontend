import React, { useState } from 'react';
import logo from '../assets/Logo.svg';
import googleLogo from '../assets/Google Icon.svg';
import facebookLogo from '../assets/facebook.png';
import appleLogo from '../assets/apple.svg';

const SignUpModal = ({ showModal, closeModal, openLoginModal }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!showModal) return null; // Don't render if modal is hidden

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-[5%] p-6 sm:p-8 w-full max-w-md md:max-w-lg lg:max-w-xl relative shadow-lg">
        <button
          onClick={closeModal}
          className="absolute top-2 right-4 text-3xl text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>
        <img src={logo} alt="9ja Markets Logo" className="mx-auto mb-4 h-20" />
        <h2 className="text-2xl font-bold text-center text-green mb-4">Welcome to 9ja Markets</h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-green border-gray-300"
            />
       
          <div>
          <label htmlFor="Phone" className="block text-sm font-medium text-gray-700">Phone number</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-green border-gray-300"
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
                className={`mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-green ${
                  password ? 'border-green-500' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  // Open eye icon for showing password
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#236C13" className="size-5 ">
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                  </svg>
                ) : (
                  // Closed eye icon for hiding password 
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={password ? '#236C13' : '#9CA3AF'}  className="size-5">
                  <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                  <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                  <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                </svg>
                
                )}
              </button>
            </div>
          </div>
          <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-green ${
                    confirmPassword ? 'border-green-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    // Open eye icon for showing confirm password
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#236C13" className="size-5">
                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    // Closed eye icon for hiding confirm password
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={confirmPassword ? '#236C13' : '#9CA3AF'} className="size-5">
                      <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                      <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                      <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          <button type="submit" className="w-full bg-green text-white p-2 rounded-lg">Sign Up</button>
        </form>
         <div className="text-center my-4 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-700">Or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <p className="text-center mt-4">
          Already have an account?{' '}
          <button onClick={openLoginModal} className="text-green font-bold">Login</button>
        </p>
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
        <p className="text-xs text-center mt-4 text-gray-600">
          By continuing you agree to the{' '}
          <a href="/" className="text-green font-bold">Policy and Rules</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpModal;
