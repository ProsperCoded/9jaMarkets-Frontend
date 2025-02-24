import { useContext, useState, useRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/Logo.svg";
import googleLogo from "../assets/Google Icon.svg";
import { MESSAGE_API_CONTEXT, USER_PROFILE_CONTEXT } from "../contexts";
import { getCustomerProfileApi } from "../lib/api/serviceApi";
import { loginCustomerApi, signUpApi } from "../lib/api/authApi.js";
import { storeAuth } from "../lib/util";
import Loading from "../componets-utils/Loading.jsx";
import { useEffect } from "react";
import { GOOGLE_URL } from "@/config";
import { LOGIN_MODAL_CONTEXT, SIGNUP_MODAL_CONTEXT } from "../contexts";
import { isStrongPassword } from "../lib/util";
import { useNavigate, Link } from "react-router-dom";

const CustomerSignup = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  const { signupOpen, setSignupOpen } = useContext(SIGNUP_MODAL_CONTEXT);
  const { setLoginOpen } = useContext(LOGIN_MODAL_CONTEXT);
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupOpen) {
      document.body.style.overflow = "auto";
      return;
    }

    document.body.style.overflow = "hidden";
    
    const currentRef = modalRef.current;
    if (currentRef) {
      currentRef.focus();
      const handleKeyPress = (e) => {
        if (e.key === "Escape") {
          setSignupOpen(false);
        }
      };
      currentRef.addEventListener("keypress", handleKeyPress);
      
      return () => {
        currentRef.removeEventListener("keypress", handleKeyPress);
        document.body.style.overflow = "auto";
      };
    }
  }, [signupOpen, setSignupOpen]);

  const { setUserProfile } = useContext(USER_PROFILE_CONTEXT);

  if (!signupOpen) return null; // Don't render if modal is hidden

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!isStrongPassword(password)) {
      setError("Password is too weak. Please choose a stronger password.");
      return;
    }
    const formData = {
      firstName,
      lastName,
      email,
      phoneNumbers: [phone1, phone2],
      password,
    };
    const errorLogger = (error) => {
      console.error(error);
      setError(error);
    };
    const signUp = await signUpApi(formData, errorLogger);

    if (!signUp) return;
    const loginData = await loginCustomerApi({ email, password }, errorLogger);
    if (!loginData) return;
    const { accessToken, refreshToken, id: userId } = loginData;
    storeAuth(userId, accessToken, refreshToken);
    const userProfile = await getCustomerProfileApi(
      userId,
      accessToken,
      errorLogger
    );
    if (!userProfile) return;
    setUserProfile(userProfile);
    messageApi.success("SignUp Successful");
    setSignupOpen(false);
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/50">
      <div className="relative bg-white shadow-lg p-4 sm:p-6 rounded-2xl w-[95%] max-w-md max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setSignupOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 p-2"
        >
          <span className="text-2xl">&times;</span>
        </button>
        <div className="text-center mb-6">
          <img
            src={logo}
            alt="9ja Markets Logo"
            className="mx-auto h-12 sm:h-14"
          />
          <h2 className="mt-2 font-bold text-Primary text-lg sm:text-xl">
            Welcome to 9ja Markets
          </h2>
        </div>
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            setLoading(true);
            await handleSignUp(e).finally(() => setLoading(false));
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                required
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-Primary focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                required
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-Primary focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-Primary focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone1" className="block text-sm font-medium text-gray-700">
                Phone 1
              </label>
              <input
                type="tel"
                id="phone1"
                value={phone1}
                onChange={(e) => setPhone1(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-Primary focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="phone2" className="block text-sm font-medium text-gray-700">
                Phone 2 (Optional)
              </label>
              <input
                type="tel"
                id="phone2"
                value={phone2}
                onChange={(e) => setPhone2(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-Primary focus:outline-none"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`mt-1 w-full rounded-lg border p-2 focus:ring-2 focus:ring-Primary focus:outline-none ${
                    password ? "border-green-500" : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeOff className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-Primary focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeOff className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-Primary text-white p-2.5 rounded-lg font-medium hover:bg-Primary/90 transition-colors"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loading />
                <span>Signing Up...</span>
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500 bg-white">Or</span>
            </div>
          </div>
          <a
            href={GOOGLE_URL}
            className="flex items-center justify-center gap-3 w-full border border-gray-300 p-2.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <img src={googleLogo} alt="Google" className="w-5 h-5" />
            <span className="text-gray-700">Sign up with Google</span>
          </a>
          <div className="space-y-3 text-center text-sm">
            <p>
              Already have an account?{" "}
              <button
                onClick={() => setLoginOpen(true)}
                className="font-semibold text-Primary hover:text-Primary/80"
              >
                Login
              </button>
            </p>
            <p>
              Want to Sell?{" "}
              <button
                onClick={() => {
                  navigate("/merchant-signup");
                  setSignupOpen(false);
                }}
                className="font-semibold text-Primary hover:text-Primary/80"
              >
                Create Merchant Account
              </button>
            </p>
            <p className="text-gray-500 text-xs pt-2">
              By continuing you agree to the{" "}
              <Link to="/terms" className="text-Primary hover:underline">
                Policy and Rules
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerSignup;
