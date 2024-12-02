import { REFRESH_TOKEN_DURATION, ACCESS_TOKEN_DURATION } from "../src/config";
export function storeAuth(accessToken, refreshToken) {
  Cookies.set("accessToken", accessToken, { expires: ACCESS_TOKEN_DURATION });
  Cookies.set("refreshToken", refreshToken, {
    expires: REFRESH_TOKEN_DURATION,
  });
}
