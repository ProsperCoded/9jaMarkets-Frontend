import { createContext } from "react";
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
