import { API_BASE_URL } from "../../config";
import { getAuth } from "../util";
export async function getMerchantProfileApi(
  userId,
  accessToken,
  errorLogger = () => {},
  successLogger = () => {}
) {
  const url = new URL(`merchant/${userId}`, API_BASE_URL);
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

export async function getCustomerProfileApi(
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
export async function updateCustomerProfileApi(
  payload,
  errorLogger = () => {},
  successLogger = () => {}
) {
  const { userId, accessToken } = getAuth();
  const url = new URL(`customer/profile/${userId}`, API_BASE_URL);
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const responseData = await response.json();
  if (!response.ok) {
    errorLogger(responseData.message);
    return;
  }
  successLogger(responseData.message);
  return responseData.data;
}
