import { useContext, useEffect } from "react";
import { USER_PROFILE_CONTEXT } from "./contexts";
import {
  getMerchantProfileApi,
  getCustomerProfileApi,
  refreshCustomerTokenApi,
  refreshMerchantTokenApi,
} from "./lib/user/authApi";
import { getAuth, storeAuth } from "./lib/util";
function InitializeApp({ children }) {
  const { userProfile, setUserProfile } = useContext(USER_PROFILE_CONTEXT);
  const errorLogger = (message) => console.error(message);
  async function fetchUserProfile() {
    const authData = getAuth();
    console.log({ authData });
    let { userId, accessToken, refreshToken, userType } = authData;
    console.log({ authData });
    if (!userId || !accessToken) {
      if (refreshToken) {
        // refresh the access-token
        if (userType === "customer") {
          const authData = await refreshCustomerTokenApi(
            refreshToken,
            errorLogger
          );
          if (!authData) return;
        } else if (userType === "merchant") {
          const authData = await refreshMerchantTokenApi(
            refreshToken,
            errorLogger
          );
          if (!authData) return;
        }
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
        // refresh token has expired
        console.log("refresh token has expired");
        return;
      }
    }
    if (userType === "customer") {
      const userProfile_ = await getCustomerProfileApi(
        userId,
        accessToken,
        errorLogger
      );
      if (!userProfile_) {
        return;
      }
      console.log("merchant profile fetched", userProfile_);
      setUserProfile(userProfile_);
    } else if (userType === "merchant") {
      const userProfile_ = await getMerchantProfileApi(
        userId,
        accessToken,
        errorLogger
      );
      if (!userProfile_) {
        return;
      }
      console.log("user profile fetched", userProfile_);
      setUserProfile(userProfile_);
    }
  }
  useEffect(() => {
    fetchUserProfile();
  }, []);
  return children;
}

export default InitializeApp;
