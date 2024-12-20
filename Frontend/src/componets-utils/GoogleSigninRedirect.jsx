import React, { useEffect } from "react";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { MESSAGE_API_CONTEXT, USER_PROFILE_CONTEXT } from "../contexts";
import { exchangeTokenApi, getProfileApi, loginApi } from "../lib/user/authApi";
import { useNavigate } from "react-router-dom";
import { storeAuth } from "../lib/util";
const GoogleSigninRedirect = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const exchangeToken = queryParams.get("token");
  const navigate = useNavigate();
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  const { userProfile, setUserProfile } = useContext(USER_PROFILE_CONTEXT);
  console.log({ exchangeToken });
  const errorLogger = (error) => {
    console.error(error);
    messageApi.error(error);
  };
  const handleGoogleAuth = async () => {
    try {
      const data = await exchangeTokenApi(exchangeToken, (error) => {
        console.error(error);
        messageApi.error(error);
      });
      if (!data) return;
      storeAuth(data.id, data.accessToken, data.refreshToken, true);
      const userProfile_ = await getProfileApi(
        data.id,
        data.accessToken,
        errorLogger
      );
      if (!userProfile_) return;
      setUserProfile(userProfile_);
      messageApi.success("Login successful");
      navigate("/");
    } catch (error) {
      errorLogger(error);
    }
  };

  useEffect(() => {
    handleGoogleAuth();
  }, []);
  // useEffect(() => {
  //   const authData = exchangeTokenApi(exchangeToken, (error) => {
  //     console.error(error);
  //     messageApi.error(error);
  //   });
  //   authData
  //     .then(async (data) => {
  //       if (!data) return data;
  //       storeAuth(data.id, data.accessToken, data.refreshToken, true);
  //       const userProfile_ = await getProfileApi(
  //         data.id,
  //         data.accessToken,
  //         errorLogger
  //       );
  //       if (!userProfile_) return;
  //       setUserProfile(userProfile_);
  //       messageApi.success("Login successful");
  //       return userProfile_;
  //     })
  //     .then((data) => {
  //       navigate("/");
  //     });
  // }, []);

  return <div>Redirecting...</div>;
};

export default GoogleSigninRedirect;
