import { createContext } from "react";
import LoginModal from "./components/Login";
import Signup from "./components/CustomerSignup";
import Logout from "./componets-utils/LogoutModal";
import { message } from "antd";
import { useEffect, useState } from "react";
import { getAuth } from "./lib/util";
import { getBookmarks } from "@/lib/api/bookmarkApi";
import PropTypes from "prop-types";

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
export const MARKET_DATA_CONTEXT = createContext({
  marketsData: [],
  setMarketsData: () => {},
});
export const MALLS_DATA_CONTEXT = createContext({
  mallsData: [],
  setMallsData: () => {},
});
export const BOOKMARK_CONTEXT = createContext({
  bookmarkCount: 0,
  updateBookmarkCount: () => {},
});
export function ContextWrapper({ children }) {
  const [userProfile, setUserProfile] = useState(null);
  const [merchantProfile, setMerchantProfile] = useState(null);
  const [merchantSignupOpen, setMerchantSignupOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [marketsData, setMarketsData] = useState([]);
  const [mallsData, setMallsData] = useState([]);
  const [bookmarkCount, setBookmarkCount] = useState(0);

  const updateBookmarkCount = async () => {
    if (!userProfile || userProfile.userType === "merchant") {
      setBookmarkCount(0);
      return;
    }

    try {
      const bookmarks = await getBookmarks(userProfile.id, messageApi.error);
      setBookmarkCount(bookmarks?.length || 0);
    } catch (err) {
      console.error("Failed to fetch bookmark count:", err);
      messageApi.error("Failed to fetch bookmarks");
    }
  };

  useEffect(() => {
    updateBookmarkCount();
  }, [userProfile]);

  return (
    <USER_PROFILE_CONTEXT.Provider
      value={{
        userProfile,
        setUserProfile: (newProfile) => {
          // if newProfile is null, logout as expected
          if (!newProfile) {
            setUserProfile(null);
            return;
          }
          const { userType } = getAuth();
          setUserProfile({ ...newProfile, userType });
        },
      }}
    >
      <MERCHANT_PROFILE_CONTEXT.Provider
        value={{ merchantProfile, setMerchantProfile }}
      >
        <MESSAGE_API_CONTEXT.Provider value={messageApi}>
          {contextHolder}
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
                  <BOOKMARK_CONTEXT.Provider
                    value={{ bookmarkCount, updateBookmarkCount }}
                  >
                    <Logout
                      logoutOpen={logoutOpen}
                      setLogoutOpen={setLogoutOpen}
                    />

                    <MARKET_DATA_CONTEXT.Provider
                      value={{ marketsData, setMarketsData }}
                    >
                      <MALLS_DATA_CONTEXT.Provider
                        value={{ mallsData, setMallsData }}
                      >
                        {children}
                      </MALLS_DATA_CONTEXT.Provider>
                    </MARKET_DATA_CONTEXT.Provider>
                    <LoginModal />
                    <Signup />
                  </BOOKMARK_CONTEXT.Provider>
                </LOGOUT_MODAL_CONTEXT.Provider>
              </SIGNUP_MODAL_CONTEXT.Provider>
            </LOGIN_MODAL_CONTEXT.Provider>
          </MERCHANT_SIGNUP_MODAL_CONTEXT.Provider>
        </MESSAGE_API_CONTEXT.Provider>
      </MERCHANT_PROFILE_CONTEXT.Provider>
    </USER_PROFILE_CONTEXT.Provider>
  );
}

ContextWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
