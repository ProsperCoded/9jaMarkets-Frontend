import React, { useState, useContext } from "react";
import logo from "../assets/Logo.svg";
import googleLogo from "../assets/Google Icon.svg";
import facebookLogo from "../assets/facebook.png";
import appleLogo from "../assets/apple.svg";
import { getMerchantProfileApi } from "../lib/api/serviceApi";
import { loginCustomerApi, loginMerchantApi } from "../lib/api/authApi";
import { MESSAGE_API_CONTEXT, USER_PROFILE_CONTEXT } from "../contexts";
import Loading from "../componets-utils/Loading";
import { getCustomerProfileApi } from "../lib/api/serviceApi";
import { storeAuth, getAuth } from "../lib/util";
import { LOGIN_MODAL_CONTEXT, SIGNUP_MODAL_CONTEXT } from "../contexts";
import { GOOGLE_URL } from "@/config";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const LoginModal = () => {
  const { loginOpen, setLoginOpen } = useContext(LOGIN_MODAL_CONTEXT);
  const { setSignupOpen } = useContext(SIGNUP_MODAL_CONTEXT);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  const { setUserProfile } = useContext(USER_PROFILE_CONTEXT);
  const { userType } = getAuth();
  const navigate = useNavigate();
  const [loginAsMerchant, setLoginAsMerchant] = useState(
    userType === "merchant" || loginOpen === "merchant"
  );

  useEffect(() => {
    if (loginOpen === "merchant") setLoginAsMerchant(true);
  }, [loginOpen]);

  if (!loginOpen) return null; // Don't render if modal is hidden

  const handleLogin = async () => {
    // Handle form submission
    setLoading(true);
    const errorLogger = (error) => {
      console.error(error);
      setError(error);
      setLoading(false);
    };
    const payload = { email, password };
    if (!loginAsMerchant) {
      const loginData = await loginCustomerApi(payload, errorLogger);
      if (!loginData) return;
      const { accessToken, refreshToken, id: userId } = loginData;
      storeAuth(userId, accessToken, refreshToken, "customer", rememberMe);
      const userProfile_ = await getCustomerProfileApi(
        userId,
        accessToken,
        errorLogger
      );
      if (!userProfile_) return;
      setUserProfile(userProfile_);
    } else if (loginAsMerchant) {
      const loginData = await loginMerchantApi(payload, errorLogger);
      if (!loginData) return;
      const { accessToken, refreshToken, id: userId } = loginData;
      storeAuth(userId, accessToken, refreshToken, "merchant", rememberMe);
      const userProfile_ = await getMerchantProfileApi(
        userId,
        accessToken,
        errorLogger
      );
      if (!userProfile_) return;
      setUserProfile(userProfile_);
    }
    messageApi.success("Login successful");
    setLoginOpen(false);
  };
  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="relative bg-white shadow-lg p-6 sm:p-8 rounded-[5%] w-full max-w-md md:max-w-lg lg:max-w-xl">
        <button
          onClick={() => setLoginOpen(false)}
          className="top-2 right-[6%] absolute text-3xl text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>
        <img
          src={logo}
          alt="9ja Markets Logo"
          className="mx-auto mb-4 h-20"
          lazy="true"
        />
        <h2 className="mb-4 font-bold text-2xl text-center text-Primary">
          Hello! Welcome back
        </h2>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin().then(() => {
              setLoading(false);
            });
          }}
        >
          <div>
            <label
              htmlFor="email"
              className="block font-medium text-gray-700 text-sm"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-Primary ${
                email ? "border-Primary" : "border-gray-300"
              }`}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block font-medium text-gray-700 text-sm"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-Primary ${
                  password ? "border-green-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="right-0 absolute inset-y-0 flex items-center pr-3"
              >
                {showPassword ? (
                  // Open eye icon for showing password
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#236C13"
                    className="size-5"
                  >
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path
                      fillRule="evenodd"
                      d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  // Closed eye icon for hiding password
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={password ? "#236C13" : "#9CA3AF"}
                    className="size-5"
                  >
                    <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                    <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                    <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                  </svg>
                )}
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
            <p
              className="text-Primary text-sm hover:underline cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                navigate("/forget-password");
                setLoginOpen(false);
              }}
            >
              Forgot Password?
            </p>
          </div>
          <div className="flex justify-between items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={loginAsMerchant}
                onChange={() => setLoginAsMerchant((prev) => !prev)}
              />
              Login as Merchant
            </label>
          </div>
          {error && (
            <p className="font-semibold text-center text-red-500 text-sm">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="bg-Primary hover:bg-hover-Primary shadow-md hover:shadow-lg py-2 rounded-lg w-full text-white"
          >
            {loading ? (
              <>
                <Loading /> Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <div className="flex items-center my-4 text-center">
          <div className="flex-grow border-gray-300 border-t"></div>
          <span className="px-4 text-gray-700 text-sm">Or</span>
          <div className="flex-grow border-gray-300 border-t"></div>
        </div>
        <div className="flex justify-center space-x-16 mt-4">
          <button className="text-lg">
            <a href={GOOGLE_URL} rel="noopener noreferrer">
              <img src={googleLogo} alt="Google Login" className="h-6" />
            </a>
          </button>
          <button className="text-lg">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebookLogo} alt="Facebook Login" className="h-6" />
            </a>
          </button>
          <button className="text-lg">
            <a
              href="https://appleid.apple.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={appleLogo} alt="Apple Login" className="h-6" />
            </a>
          </button>
        </div>
        <div className="mt-4 text-center">
          <span className="text-gray-700 text-sm"> Dont have an account? </span>
          <button
            onClick={() => {
              setLoginOpen(false);
              setSignupOpen(true);
            }}
            className="font-semibold text-Primary hover:underline"
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
