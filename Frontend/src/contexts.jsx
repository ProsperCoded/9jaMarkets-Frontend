import { createContext } from "react";
import LoginModal from "./components/Login";
import Signup from "./components/CustomerSignup";
import Logout from "./componets-utils/LogoutModal";
import MerchantSignup from "./components/MerchantSignup";
import { message } from "antd";
import { useEffect, useState } from "react";
// Contexts
export const USER_PROFILE_CONTEXT = createContext({
  userProfile: null,
  setUserProfile: () => {},
});
export const MESSAGE_API_CONTEXT = createContext({
  success: (content) => {},
  error: (content) => {},
  info: (content) => {},
  warning: (content) => {},
});
export const LOGOUT_MODAL_CONTEXT = createContext({
  logoutOpen: false,
  setLogoutOpen: () => {},
});
export const LOGIN_MODAL_CONTEXT = createContext({
  loginOpen: false,
  setLoginOpen: () => {},
});
export const SIGNUP_MODAL_CONTEXT = createContext({
  signupOpen: false,
  setSignupOpen: () => {},
});
export const MERCHANT_PROFILE_CONTEXT = createContext({
  merchantProfile: null,
  setMerchantProfile: () => {},
});
export const MERCHANT_SIGNUP_MODAL_CONTEXT = createContext({
  merchantSignupOpen: false,
  setMerchantSignupOpen: () => {},
});
export function ContextWrapper({ children }) {
  const [userProfile, setUserProfile] = useState(null);
  const [merchantProfile, setMerchantProfile] = useState(null);
  const [merchantSignupOpen, setMerchantSignupOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  useEffect(() => {
    console.log(userProfile);
  }, [userProfile]);
  return (
    <USER_PROFILE_CONTEXT.Provider value={{ userProfile, setUserProfile }}>
      <MERCHANT_PROFILE_CONTEXT.Provider
        value={{ merchantProfile, setMerchantProfile }}
      >
        <MESSAGE_API_CONTEXT.Provider value={messageApi}>
          <MERCHANT_SIGNUP_MODAL_CONTEXT.Provider
            value={{ merchantSignupOpen, setMerchantSignupOpen }}
          >
            <LOGIN_MODAL_CONTEXT.Provider value={{ loginOpen, setLoginOpen }}>
              <SIGNUP_MODAL_CONTEXT.Provider
                value={{ signupOpen, setSignupOpen }}
              >
                <LOGOUT_MODAL_CONTEXT.Provider
                  value={{ logoutOpen, setLogoutOpen }}
                >
                  <Logout
                    logoutOpen={logoutOpen}
                    setLogoutOpen={setLogoutOpen}
                  />
                  {contextHolder}
                  {children}
                  <LoginModal />
                  <Signup />
                </LOGOUT_MODAL_CONTEXT.Provider>
              </SIGNUP_MODAL_CONTEXT.Provider>
            </LOGIN_MODAL_CONTEXT.Provider>
          </MERCHANT_SIGNUP_MODAL_CONTEXT.Provider>
        </MESSAGE_API_CONTEXT.Provider>
      </MERCHANT_PROFILE_CONTEXT.Provider>
    </USER_PROFILE_CONTEXT.Provider>
  );
}
