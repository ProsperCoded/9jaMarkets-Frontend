import React, { useEffect } from "react";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { MESSAGE_API_CONTEXT } from "../contexts";
import {
  exchangeTokenApi,
  getProfileApi,
  loginApi,
} from "./../../libs/user/authApi";
const GoogleSigninRedirect = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const exchangeToken = queryParams.get("code");
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  console.log({ exchangeToken });
  useEffect(() => {
    const authData = exchangeTokenApi(exchangeToken, (error) => {
      console.error(error);
      messageApi.error(error);
    });
    authData.then((data) => {
      if (!data) return data;
      console.log(data);
      // getProfileApi(data.userId, data.accessToken, (error) => {
      messageApi.success("Login successful");
    });
  }, []);

  return <div>Redirecting...</div>;
};

export default GoogleSigninRedirect;
