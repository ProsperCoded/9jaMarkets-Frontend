import React, { useEffect } from "react";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { MESSAGE_API_CONTEXT, USER_PROFILE_CONTEXT } from "../contexts";
import {
  exchangeTokenApi,
  exchangeTokenCustomerApi,
  exchangeTokenMerchantApi,
  getCustomerProfileApi,
  loginCustomerApi,
  loginMerchantApi,
} from "../lib/user/authApi";
import { useNavigate } from "react-router-dom";
import { storeAuth } from "../lib/util";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
const GoogleSigninRedirect = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userType = queryParams.get("userType");
  const exchangeToken = queryParams.get("token");
  const navigate = useNavigate();
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  const { setUserProfile } = useContext(USER_PROFILE_CONTEXT);
  console.log({ exchangeToken });
  const errorLogger = (error) => {
    console.error(error);
    messageApi.error(error);
  };
  const handleGoogleAuth = async () => {
    try {
      if (userType === "customer") {
        const data = await exchangeTokenCustomerApi(exchangeToken, (error) => {
          console.error(error);
          messageApi.error(error);
        });
        console.log({ data });
        if (!data) return;
        storeAuth(data.id, data.accessToken, data.refreshToken, userType, true);
        const userProfile_ = await getCustomerProfileApi(
          data.id,
          data.accessToken,
          errorLogger
        );
        if (!userProfile_) return;
        setUserProfile(userProfile_);
      } else if (userType === "merchant") {
        const data = await exchangeTokenMerchantApi(exchangeToken, (error) => {
          console.error(error);
          messageApi.error(error);
        });
        console.log({ data });
        if (!data) return;
        storeAuth(data.id, data.accessToken, data.refreshToken, userType, true);
      }
      messageApi.success("Login successful");
      navigate("/");
    } catch (error) {
      errorLogger(error);
    }
  };

  useEffect(() => {
    handleGoogleAuth();
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col items-center w-max">
        <div class="w-[15rem] loader"></div>
        <div class="flex flex-col items-center font-extrabold text-[4rem] text-Primary">
          <p>Authenticating...</p>
          <p className="flex space-x-5 text-base">
            <p>🙁 Tired of Waiting</p>
            <Link className="flex text-Primary hover:text-P2 underline" to="/">
              {" "}
              <ArrowLeft /> Go Back Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoogleSigninRedirect;
