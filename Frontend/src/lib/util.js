import { REFRESH_TOKEN_DURATION, ACCESS_TOKEN_DURATION } from "../config";
import Cookies from "js-cookie";

export function storeAuth(
  userId,
  accessToken,
  refreshToken,
  userType = "customer",
  rememberMe = true
) {
  Cookies.set("userId", userId, { expires: ACCESS_TOKEN_DURATION });
  // Usertype can be 'customer' or 'merchant'
  localStorage.setItem("userType", userType);
  if (rememberMe) {
    Cookies.set("accessToken", accessToken, { expires: ACCESS_TOKEN_DURATION });
    Cookies.set("refreshToken", refreshToken, {
      expires: REFRESH_TOKEN_DURATION,
    });
  } else {
    // deletes automatically when the user exits the browser
    Cookies.set("userId", userId);
    Cookies.set("accessToken", accessToken);
    Cookies.set("refreshToken", refreshToken);
  }
}

export function getAuth() {
  const userId = Cookies.get("userId");
  const accessToken = Cookies.get("accessToken");
  const userType = localStorage.getItem("userType");
  const refreshToken = Cookies.get("refreshToken");
  return { userId, accessToken, refreshToken, userType };
}
export function deleteAuth() {
  Cookies.remove("userId");
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
}
export const isStrongPassword = (password) => {
  return RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  ).test(password);
};

export function formatPrice(value = "") {
  let withoutCommas = removeCommas(value);
  return withoutCommas.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function removeCommas(value = "") {
  return value.toString().replace(/,/g, "");
}

export function replaceSpacesWithUnderscore(value = "") {
  return value.replace(/\s/g, "_");
}
export function replaceUnderscoresWithSpaces(value = "") {
  return value.replace(/_/g, " ");
}
export function replaceAmpersandWithAnd(value = "") {
  return value.replace(/&/g, "AND");
}

export function replaceAndWithAmpersand(value = "") {
  return value.replace(/AND/g, "&");
}
