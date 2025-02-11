import React, { useContext, useState, useRef } from "react";
import logo from "../assets/Logo.svg";
import googleLogo from "../assets/Google Icon.svg";
import facebookLogo from "../assets/facebook.png";
import appleLogo from "../assets/apple.svg";
import {
  MARKET_DATA_CONTEXT,
  MESSAGE_API_CONTEXT,
  MALLS_DATA_CONTEXT,
  USER_PROFILE_CONTEXT,
} from "../contexts";
import { getMerchantProfileApi } from "../lib/api/serviceApi";
import { loginMerchantApi, signupMerchantApi } from "../lib/api/authApi.js";
import { storeAuth } from "../lib/util";
import Loading from "../componets-utils/Loading.jsx";
import { GOOGLE_URL, PRODUCT_CATEGORIES } from "@/config";
import { LOGIN_MODAL_CONTEXT } from "../contexts";
import { useNavigate } from "react-router-dom";
import { isStrongPassword } from "../lib/util";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "./ui/tabs";

const MerchantSignup = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [merchantCategories, setMerchantCategories] = useState([]);
  const [marketName, setMarketName] = useState("");
  const [mallName, setMallName] = useState("");
  const { marketsData } = useContext(MARKET_DATA_CONTEXT);
  const { mallsData } = useContext(MALLS_DATA_CONTEXT);
  const availableMarkets = marketsData.map((market) => market.name);
  const availableMalls = mallsData.map((mall) => mall.name);
  const errorLogger = (error) => {
    console.error(error);
    setError(error);
  };
  const [addresses, setAddresses] = useState([
    {
      address: "",
      name: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  ]);
  const modalRef = useRef(null);
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  const { setLoginOpen } = useContext(LOGIN_MODAL_CONTEXT);

  const { setUserProfile } = useContext(USER_PROFILE_CONTEXT);

  const handleAddAddress = () => {
    setAddresses([
      ...addresses,
      {
        address: "",
        name: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
    ]);
  };

  const handleAddressChange = (index, field, value) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index][field] = value;
    setAddresses(updatedAddresses);
  };

  const handleMerchantCategoriesChange = (e) => {
    const { options } = e.target;
    const selectedCategories = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedCategories.push(options[i].value);
      }
    }
    setMerchantCategories(selectedCategories);
  };

  const handleSignUp = async (e) => {
    // Handle sign up logic here

    e.preventDefault();
    if (addresses.length === 0) {
      setError("At least one address is required");
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!isStrongPassword(password)) {
      setError("Password is too weak. Please choose a stronger password.");
      return;
    }
    const formData = {
      email,
      phoneNumbers: [phone1, phone2],
      password,
      brandName,
      merchantCategories,
      // ? the backend only accept marketName, weather mall or market
      marketName: marketName || mallName,
      addresses,
    };

    const signUp = await signupMerchantApi(formData, (error) => {
      console.error(error);
      setError(error);
    });

    if (!signUp) return;
    const loginData = await loginMerchantApi({ email, password }, errorLogger);
    if (!loginData) return;
    const { accessToken, refreshToken, id: userId } = loginData;
    storeAuth(userId, accessToken, refreshToken, "merchant");
    const userProfile = await getMerchantProfileApi(
      userId,
      accessToken,
      errorLogger
    );
    if (!userProfile) return;
    setUserProfile(userProfile);
    messageApi.success("Merchant SignUp Successful");
    navigate("/");
  };

  const inputClassName = `mt-1 block w-full rounded-md border-gray-300 shadow-sm 
    focus:border-Primary focus:ring-Primary focus:ring-opacity-50 
    text-base py-3 px-4 selection:bg-Primary selection:text-white`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <img
            src={logo}
            alt="9ja Markets Logo"
            className="mx-auto h-12 w-auto"
          />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Join 9ja Markets as a Merchant
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Start selling your products to millions of customers today
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-white shadow-sm rounded-xl p-8">
          <form
            className="space-y-6"
            onSubmit={async (e) => {
              setLoading(true);
              await handleSignUp(e).then(() => setLoading(false));
            }}
          >
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 border-b border-Primary pb-2">
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClassName}
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Primary Phone
                    </label>
                    <input
                      type="tel"
                      value={phone1}
                      onChange={(e) => setPhone1(e.target.value)}
                      className={inputClassName}
                      placeholder="Enter primary phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Secondary Phone
                    </label>
                    <input
                      type="tel"
                      value={phone2}
                      onChange={(e) => setPhone2(e.target.value)}
                      className={inputClassName}
                      placeholder="Enter secondary phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className={inputClassName}
                    placeholder="Enter your brand name"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 border-b border-Primary pb-2">
                Business Information
              </h3>
              
              <div className="space-y-4">
                <Tabs defaultValue="market" className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="market" className="flex-1">Market</TabsTrigger>
                    <TabsTrigger value="malls" className="flex-1">Malls</TabsTrigger>
                  </TabsList>
                  <TabsContent value="market" className="mt-4">
                    <select
                      value={marketName}
                      onChange={(e) => setMarketName(e.target.value)}
                      className={inputClassName}
                      required
                    >
                      <option value="">Select a Market</option>
                      {availableMarkets.map((market) => (
                        <option key={market} value={market}>{market}</option>
                      ))}
                    </select>
                  </TabsContent>
                  <TabsContent value="malls" className="mt-4">
                    <select
                      value={mallName}
                      onChange={(e) => setMallName(e.target.value)}
                      className={inputClassName}
                      required
                    >
                      <option value="">Select a Mall</option>
                      {availableMalls.map((mall) => (
                        <option key={mall} value={mall}>{mall}</option>
                      ))}
                    </select>
                  </TabsContent>
                </Tabs>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Categories
                  </label>
                  <select
                    multiple
                    value={merchantCategories}
                    onChange={handleMerchantCategoriesChange}
                    className="mt-1 block w-full h-48 rounded-md border-gray-300 shadow-sm 
                      focus:border-Primary focus:ring-Primary focus:ring-opacity-50 
                      text-base py-2"
                    required
                  >
                    {[
                      "Education & Stationery",
                      "Real Estate & Housing",
                      "Events & Entertainment",
                      "Technology Services",
                      "Cultural Experiences",
                      "Food & Groceries",
                      "Electronics & Gadgets",
                      "Fashion & Accessories",
                      "Health & Wellness",
                      "Home & Living",
                      "Automobile Needs",
                      "Traditional Crafts",
                      "Sports & Outdoor",
                      "Kids & Baby Products"
                    ].map((category) => (
                      <option 
                        key={category} 
                        value={category} 
                        className={`py-2 px-3 ${
                          merchantCategories.includes(category) 
                            ? 'bg-Primary text-white' 
                            : 'hover:bg-Primary/10'
                        }`}
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                  <p className="mt-2 text-xs text-gray-500">
                    Hold Ctrl (Windows) or Command (Mac) to select multiple categories
                  </p>
                </div>
              </div>
            </div>

            {/* Addresses */}
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-lg font-medium text-gray-900 border-b border-Primary pb-2">
                  Business Addresses
                </h3>
                <button
                  type="button"
                  onClick={handleAddAddress}
                  className="text-sm text-Primary hover:text-Primary/90"
                >
                  + Add Another Address
                </button>
              </div>
              
              <div className="space-y-4">
                {addresses.map((address, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Address
                        </label>
                        <input
                          type="text"
                          value={address.address}
                          onChange={(e) =>
                            handleAddressChange(index, "address", e.target.value)
                          }
                          className={inputClassName}
                          placeholder="Street address"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <input
                          type="text"
                          value={address.name}
                          onChange={(e) =>
                            handleAddressChange(index, "name", e.target.value)
                          }
                          className={inputClassName}
                          placeholder="Location name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          City
                        </label>
                        <input
                          type="text"
                          value={address.city}
                          onChange={(e) =>
                            handleAddressChange(index, "city", e.target.value)
                          }
                          className={inputClassName}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          State
                        </label>
                        <input
                          type="text"
                          value={address.state}
                          onChange={(e) =>
                            handleAddressChange(index, "state", e.target.value)
                          }
                          className={inputClassName}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Zip Code
                        </label>
                        <input
                          type="text"
                          value={address.zipCode}
                          onChange={(e) =>
                            handleAddressChange(index, "zipCode", e.target.value)
                          }
                          className={inputClassName}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Country
                        </label>
                        <input
                          type="text"
                          value={address.country}
                          onChange={(e) =>
                            handleAddressChange(index, "country", e.target.value)
                          }
                          className={inputClassName}
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 border-b border-Primary pb-2">
                Security
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      className={inputClassName}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
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
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={inputClassName}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {showConfirmPassword ? (
                        // Open eye icon for showing confirm password
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
                        // Closed eye icon for hiding confirm password
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill={confirmPassword ? "#236C13" : "#9CA3AF"}
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
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-Primary hover:bg-Primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-Primary"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <Loading />
                  <span className="ml-2">Creating Account...</span>
                </div>
              ) : (
                "Create Merchant Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => setLoginOpen(true)}
                className="font-medium text-Primary hover:text-Primary/90"
              >
                Sign in to your merchant account
              </button>
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        select option:checked {
          background: #236C13 !important;
          color: white !important;
        }
        
        select option:hover {
          background: rgba(35, 108, 19, 0.1) !important;
        }
        
        select:focus option:checked {
          background: #236C13 !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default MerchantSignup;
