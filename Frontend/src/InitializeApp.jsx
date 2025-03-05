import { useContext, useEffect } from "react";
import {
  MALLS_DATA_CONTEXT,
  MARKET_DATA_CONTEXT,
  USER_PROFILE_CONTEXT,
} from "./contexts";
import { getMerchantProfileApi } from "./lib/api/serviceApi";
import { getCustomerProfileApi } from "./lib/api/serviceApi";
import {
  refreshCustomerTokenApi,
  refreshMerchantTokenApi,
} from "./lib/api/authApi";
import { getMarketsApi } from "./lib/api/marketApi";
import { deleteAuth, getAuth, storeAuth } from "./lib/util";
import { useErrorLogger } from "./hooks";
import { getMallsApi } from "./lib/api/mallApi";
function InitializeApp({ children }) {
  const { setUserProfile } = useContext(USER_PROFILE_CONTEXT);
  const { setMarketsData } = useContext(MARKET_DATA_CONTEXT);
  const { setMallsData } = useContext(MALLS_DATA_CONTEXT);
  // const errorLogger = (message) => console.error(message);
  const errorLogger = useErrorLogger();
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
        // ensure to delete all other auth data
        deleteAuth();
        return;
      }
    }
    if (userType === "customer") {
      const userProfile_ = await getCustomerProfileApi(userId, errorLogger);
      if (!userProfile_) {
        return;
      }
      setUserProfile(userProfile_);
    } else if (userType === "merchant") {
      const userProfile_ = await getMerchantProfileApi(userId, errorLogger);
      if (!userProfile_) {
        return;
      }
      setUserProfile(userProfile_);
    }
  }
  async function fetchMarket() {
    const markets = await getMarketsApi(errorLogger);
    const malls = await getMallsApi(errorLogger);
    console.log({ markets, malls });
    if (!markets) return;
    setMarketsData(markets);
    if (!malls) return;
    setMallsData(malls);
  }
  useEffect(() => {
    fetchUserProfile();
    fetchMarket();
  }, []);
  return children;
}

export default InitializeApp;
