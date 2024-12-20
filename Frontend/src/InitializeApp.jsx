import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { USER_PROFILE_CONTEXT } from "./contexts";
import { getProfileApi } from "./lib/user/authApi";
import { getAuth, storeAuth } from "./lib/util";
import { refreshTokenApi } from "./lib/user/authApi";
function InitializeApp({ children }) {
  const { userProfile, setUserProfile } = useContext(USER_PROFILE_CONTEXT);
  const errorLogger = (message) => console.error(message);
  async function fetchUserProfile() {
    const authData = getAuth();
    console.log({ authData });
    let { userId, accessToken, refreshToken } = authData;
    if (!userId || !accessToken) {
      if (refreshToken) {
        // refresh token
        const authData = await refreshTokenApi(
          refreshToken,
          errorLogger,
          console.log
        );
        if (!authData) return;
        const {
          id: newUserId,
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        } = authData;
        storeAuth(userId, newAccessToken, newRefreshToken, true);
        accessToken = newAccessToken;
        refreshToken = newRefreshToken;
        userId = newUserId;
      } else {
        return;
      }
    }

    const userProfile_ = await getProfileApi(userId, accessToken, errorLogger);
    if (!userProfile_) {
      return;
    }
    console.log("user profile fetched", userProfile_);
    setUserProfile(userProfile_);
  }
  useEffect(() => {
    fetchUserProfile();
  }, []);
  return children;
}

export default InitializeApp;
