import React, { useContext, useState, useEffect } from "react";
import logo from "../assets/Logo.svg";
import { Eye, EyeOff, X, HelpCircle } from "lucide-react";
import {
  MARKETS_DATA_CONTEXT,
  MESSAGE_API_CONTEXT,
  MALLS_DATA_CONTEXT,
  USER_PROFILE_CONTEXT,
} from "../contexts";
import { getMerchantProfileApi } from "../lib/api/serviceApi";
import { loginMerchantApi, signupMerchantApi } from "../lib/api/authApi.js";
import { storeAuth } from "../lib/util";
import Loading from "../componets-utils/Loading.jsx";
import { LOGIN_MODAL_CONTEXT } from "../contexts";
import { useNavigate } from "react-router-dom";
import { isStrongPassword } from "../lib/util";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "./ui/tabs";
import { MERCHANT_CATEGORIES } from "@/config";
import { Combobox } from "./ui/Combobox";
import { Badge } from "@/components/ui/badge";

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
  const [merchantCategory, setMerchantCategories] = useState([]);
  const [marketName, setMarketName] = useState("");
  const [mallName, setMallName] = useState("");
  const [referrerCode, setReferrerCode] = useState("");
  const [referrerUsername, setReferrerUsername] = useState("");
  const [showReferrerTooltip, setShowReferrerTooltip] = useState(false);
  const { marketsData } = useContext(MARKETS_DATA_CONTEXT);
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

  // Extract referrer code from query params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      setReferrerCode(ref);
    }
  }, []);
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

  // Handle category selection toggle
  const handleCategoryToggle = (category) => {
    setMerchantCategories((current) => {
      if (current.includes(category)) {
        return current.filter((c) => c !== category);
      }
      return [...current, category];
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (addresses.length === 0) {
      setError("At least one address is required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!isStrongPassword(password)) {
      setError("Password is too weak. Please choose a stronger password.");
      return;
    }

    // Validate that at least one category is selected
    if (merchantCategory.length === 0) {
      setError("Please select at least one business category");
      return;
    }

    // Don't allow both referrer code and username to be provided
    if (referrerCode && referrerUsername) {
      setError("Please provide either a referrer code or username, not both");
      return;
    }

    const formData = {
      email,
      phoneNumbers: [phone1, phone2],
      password,
      brandName,
      merchantCategories: merchantCategory,
      // the backend only accepts marketName, whether mall or market
      marketName: marketName || mallName,
      addresses,
    };

    // Add referrer information if provided
    if (referrerCode) {
      formData.referrerCode = referrerCode;
    } else if (referrerUsername) {
      formData.referrerUsername = referrerUsername;
    }

    const signUp = await signupMerchantApi(formData, (error) => {
      console.error(error);
      setError(error);
    });

    if (!signUp) return;
    const loginData = await loginMerchantApi({ email, password }, errorLogger);
    if (!loginData) return;
    const { accessToken, refreshToken, id: userId } = loginData;
    storeAuth(userId, accessToken, refreshToken, "merchant");
    const userProfile = await getMerchantProfileApi(userId, errorLogger);
    if (!userProfile) return;
    setUserProfile(userProfile);
    messageApi.success("Merchant SignUp Successful");
    navigate("/");
  };

  const inputClassName = `mt-1 block w-full rounded-md border-gray-300 shadow-sm 
    focus:border-Primary focus:ring-Primary focus:ring-opacity-50 
    text-base py-3 px-4 selection:bg-Primary selection:text-white`;

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <img
            src={logo}
            alt="9ja Markets Logo"
            className="mx-auto w-auto h-12"
          />
          <h2 className="mt-6 font-bold text-gray-900 text-3xl">
            Join 9jaMarkets as a Merchant
          </h2>
          <p className="mt-2 text-gray-600 text-sm">
            Start selling your products to millions of customers today
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-white shadow-sm p-8 rounded-xl">
          <form
            className="space-y-6"
            onSubmit={async (e) => {
              setLoading(true);
              await handleSignUp(e)
                .catch(() => {})
                .finally(() => setLoading(false));
            }}
          >
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="pb-2 border-Primary border-b font-medium text-gray-900 text-lg">
                Basic Information
              </h3>

              <div className="gap-6 grid grid-cols-1">
                <div>
                  <label className="block font-medium text-gray-700 text-sm">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    required
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClassName}
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
                  <div>
                    <label className="block font-medium text-gray-700 text-sm">
                      Primary Phone
                    </label>
                    <input
                      type="tel"
                      value={phone1}
                      name="phone1"
                      onChange={(e) => setPhone1(e.target.value)}
                      className={inputClassName}
                      placeholder="Enter primary phone number"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 text-sm">
                      Secondary Phone
                    </label>
                    <input
                      type="tel"
                      value={phone2}
                      name="phone2"
                      onChange={(e) => setPhone2(e.target.value)}
                      className={inputClassName}
                      placeholder="Enter secondary phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-gray-700 text-sm">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={brandName}
                    name="brandName"
                    onChange={(e) => setBrandName(e.target.value)}
                    className={inputClassName}
                    placeholder="Enter your brand name"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Referral Information */}
            <div className="space-y-6">
              <div className="flex items-center pb-2 border-Primary border-b">
                <h3 className="font-medium text-gray-900 text-lg">
                  Referral Information
                </h3>
                <button
                  type="button"
                  onClick={() => setShowReferrerTooltip(!showReferrerTooltip)}
                  className="ml-2 text-gray-400 hover:text-Primary"
                >
                  <HelpCircle className="w-5 h-5" />
                </button>
              </div>

              {showReferrerTooltip && (
                <div className="bg-blue-50 p-4 rounded-md text-blue-800 text-sm">
                  <p>
                    <strong>Optional:</strong> If you were referred by a
                    marketer, you can enter either their referral code or
                    username. You only need to provide one of these.
                  </p>
                </div>
              )}

              <div className="gap-6 grid grid-cols-1 sm:grid-cols-2">
                <div>
                  <label className="block font-medium text-gray-700 text-sm">
                    Referrer Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={referrerCode}
                    onChange={(e) => {
                      setReferrerCode(e.target.value);
                      // Clear username if code is being entered
                      if (e.target.value) setReferrerUsername("");
                    }}
                    className={inputClassName}
                    placeholder="Enter referrer code"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 text-sm">
                    Referrer Username (Optional)
                  </label>
                  <input
                    type="text"
                    value={referrerUsername}
                    onChange={(e) => {
                      setReferrerUsername(e.target.value);
                      // Clear code if username is being entered
                      if (e.target.value) setReferrerCode("");
                    }}
                    className={inputClassName}
                    placeholder="Enter referrer username"
                  />
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div className="space-y-6">
              <h3 className="pb-2 border-Primary border-b font-medium text-gray-900 text-lg">
                Business Information
              </h3>

              <div className="space-y-4">
                <Tabs defaultValue="market" className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="market" className="flex-1">
                      Market
                    </TabsTrigger>
                    <TabsTrigger value="malls" className="flex-1">
                      Malls
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="market" className="mt-4">
                    <Combobox
                      options={availableMarkets.map((m) => {
                        return { value: m, label: m };
                      })}
                      value={marketName}
                      handleSelect={setMarketName}
                      message="Select a Market"
                    />
                  </TabsContent>
                  <TabsContent value="malls" className="mt-4">
                    <Combobox
                      options={availableMalls.map((m) => {
                        return { value: m, label: m };
                      })}
                      value={mallName}
                      handleSelect={setMallName}
                      message="Select a Mall"
                    />
                  </TabsContent>
                </Tabs>

                <div>
                  <label className="block mb-2 font-medium text-gray-700 text-sm">
                    Business Categories (Select multiple)
                  </label>

                  {/* Simple multi-select checkboxes instead of the complex Popover */}
                  <div className="bg-white p-4 border rounded-md max-h-48 overflow-y-auto">
                    <div className="space-y-2">
                      {MERCHANT_CATEGORIES.map((category) => (
                        <div key={category} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`category-${category}`}
                            checked={merchantCategory.includes(category)}
                            onChange={() => handleCategoryToggle(category)}
                            className="mr-2 border-gray-300 rounded focus:ring-Primary text-Primary"
                          />
                          <label
                            htmlFor={`category-${category}`}
                            className="text-gray-700 text-sm cursor-pointer"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Display selected categories */}
                  {merchantCategory.length > 0 && (
                    <div className="mt-3">
                      <div className="mb-2 text-gray-500 text-sm">
                        Selected categories:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {merchantCategory.map((category) => (
                          <Badge
                            key={category}
                            className="bg-Primary text-white cursor-pointer"
                            onClick={() => handleCategoryToggle(category)}
                          >
                            {category} <X className="ml-1 w-3 h-3" />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Addresses */}
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-2 border-b">
                <h3 className="pb-2 border-Primary border-b font-medium text-gray-900 text-lg">
                  Business Addresses
                </h3>
                <button
                  type="button"
                  onClick={handleAddAddress}
                  className="text-Primary hover:text-Primary/90 text-sm"
                >
                  + Add Another Address
                </button>
              </div>

              <div className="space-y-4">
                {addresses.map((address, index) => (
                  <div
                    key={index}
                    className="space-y-4 bg-gray-50 p-4 rounded-lg"
                  >
                    <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
                      <div>
                        <label className="block font-medium text-gray-700 text-sm">
                          Address
                        </label>
                        <input
                          type="text"
                          value={address.address}
                          name={`address-${index}`}
                          onChange={(e) =>
                            handleAddressChange(
                              index,
                              "address",
                              e.target.value
                            )
                          }
                          className={inputClassName}
                          placeholder="Street address"
                          required
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-gray-700 text-sm">
                          Name
                        </label>
                        <input
                          type="text"
                          value={address.name}
                          name={`location-name-${index}`}
                          onChange={(e) =>
                            handleAddressChange(index, "name", e.target.value)
                          }
                          className={inputClassName}
                          placeholder="Location name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-gray-700 text-sm">
                          City
                        </label>
                        <input
                          type="text"
                          value={address.city}
                          name={`city-${index}`}
                          onChange={(e) =>
                            handleAddressChange(index, "city", e.target.value)
                          }
                          className={inputClassName}
                          required
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-gray-700 text-sm">
                          State
                        </label>
                        <input
                          type="text"
                          value={address.state}
                          name={`state-${index}`}
                          onChange={(e) =>
                            handleAddressChange(index, "state", e.target.value)
                          }
                          className={inputClassName}
                          required
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-gray-700 text-sm">
                          Zip Code
                        </label>
                        <input
                          type="text"
                          value={address.zipCode}
                          name={`zipCode-${index}`}
                          onChange={(e) =>
                            handleAddressChange(
                              index,
                              "zipCode",
                              e.target.value
                            )
                          }
                          className={inputClassName}
                          required
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-gray-700 text-sm">
                          Country
                        </label>
                        <input
                          type="text"
                          value={address.country}
                          name={`country-${index}`}
                          onChange={(e) =>
                            handleAddressChange(
                              index,
                              "country",
                              e.target.value
                            )
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
              <h3 className="pb-2 border-Primary border-b font-medium text-gray-900 text-lg">
                Security
              </h3>

              <div className="gap-6 grid grid-cols-1 sm:grid-cols-2">
                <div>
                  <label className="block font-medium text-gray-700 text-sm">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      name="password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      className={inputClassName}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="right-0 absolute inset-y-0 flex items-center pr-3"
                    >
                      {showPassword ? (
                        <Eye className="w-5 h-5 text-Primary" />
                      ) : (
                        <EyeOff className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block font-medium text-gray-700 text-sm">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      name="confirmPassword"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={inputClassName}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="right-0 absolute inset-y-0 flex items-center pr-3"
                    >
                      {showConfirmPassword ? (
                        <Eye className="w-5 h-5 text-Primary" />
                      ) : (
                        <EyeOff className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 p-4 rounded-md">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="flex justify-center bg-Primary hover:bg-Primary/90 shadow-sm px-4 py-3 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-Primary focus:ring-offset-2 w-full font-medium text-white text-sm"
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
            <p className="text-gray-600 text-sm">
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
    </div>
  );
};

export default MerchantSignup;
