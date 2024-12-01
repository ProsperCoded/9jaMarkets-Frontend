import { API_BASE_URL } from "../src/config";
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

export async function getProfile(
  accessToken,
  userId,
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
