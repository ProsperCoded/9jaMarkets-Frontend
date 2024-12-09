import { API_BASE_URL } from "../../src/config";
export async function signUpApi(
  payload,
  errorLogger = () => {},
  successLogger = () => {}
) {
  const url = new URL("auth/customer/signup", API_BASE_URL);
  console.log(url.href, payload);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const responseData = await response.json();

  console.log({ responseData, response });
  if (!response.ok) {
    errorLogger(responseData.message);
    return;
  }
  successLogger(responseData.message);
  return responseData;
}
export async function loginApi(
  payload,
  errorLogger = () => {},
  successLogger = () => {}
) {
  const url = new URL("auth/customer/login", API_BASE_URL);
  const loginResponse = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const loginData = await loginResponse.json();
  if (!loginResponse.ok) {
    errorLogger(loginData.message);
    console.error(loginData.message); // logservice
    return;
  }
  successLogger(loginData.message);
  return loginData.data;
}

export async function getProfileApi(
  userId,
  accessToken,
  errorLogger = () => {},
  successLogger = () => {}
) {
  const url = new URL(`customer/profile/${userId}`, API_BASE_URL);
  const userProfile = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const userProfileData = await userProfile.json();
  if (!userProfile.ok) {
    errorLogger(userProfileData.message);
    return;
  }
  successLogger(userProfileData.message);
  return userProfileData.data;
}

export async function refreshTokenApi(
  refreshToken,
  errorLogger = () => {},
  successLogger = () => {}
) {
  const url = new URL("auth/customer/refresh-token", API_BASE_URL);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ refreshToken }),
  });
  const responseData = await response.json();
  if (!response.ok) {
    errorLogger(responseData.message);
    return;
  }
  return responseData.data;
}
export async function logoutApi(refreshToken, errorLogger = () => {}) {
  const url = new URL("auth/customer/logout", API_BASE_URL);
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ refreshToken }),
  });
  const responseData = await response.json();
  if (!response.ok) {
    errorLogger(responseData.message);
    return;
  }
  return responseData.message;
}
export async function exchangeTokenApi(
  exchangeToken,
  errorLogger = () => {},
  successLogger = () => {}
) {
  const url = new URL("auth/customer/exchange-token", API_BASE_URL);
  url.searchParams.append("token", exchangeToken);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  const responseData = await response.json();
  if (!response.ok) {
    errorLogger(responseData.message);
    return;
  }
  successLogger(responseData.message);
  return responseData.data;
}
