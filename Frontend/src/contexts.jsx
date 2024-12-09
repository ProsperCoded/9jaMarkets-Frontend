import { createContext } from "react";
import Logout from "./componets-utils/LogoutModal";
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
  logoutModal: false,
  setLogoutOpen: () => {},
});

export function ContextWrapper({ children }) {
  const [userProfile, setUserProfile] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [logoutOpen, setLogoutOpen] = useState(false);
  useEffect(() => {
    console.log(userProfile);
  }, [userProfile]);
  return (
    <>
      <USER_PROFILE_CONTEXT.Provider value={{ userProfile, setUserProfile }}>
        <MESSAGE_API_CONTEXT.Provider value={messageApi}>
          <LOGOUT_MODAL_CONTEXT.Provider value={{ logoutOpen, setLogoutOpen }}>
            <Logout logoutOpen={logoutOpen} setLogoutOpen={setLogoutOpen} />
            {contextHolder}
            {children}
          </LOGOUT_MODAL_CONTEXT.Provider>
        </MESSAGE_API_CONTEXT.Provider>
      </USER_PROFILE_CONTEXT.Provider>
    </>
  );
}
