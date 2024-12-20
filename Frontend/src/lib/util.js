import { REFRESH_TOKEN_DURATION, ACCESS_TOKEN_DURATION } from "../config";
import Cookies from "js-cookie";

export function storeAuth(
  userId,
  accessToken,
  refreshToken,
  rememberMe = true
) {
  Cookies.set("userId", userId, { expires: ACCESS_TOKEN_DURATION });
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
  const refreshToken = Cookies.get("refreshToken");
  return { userId, accessToken, refreshToken };
}
export function deleteAuth() {
  Cookies.remove("userId");
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
}
