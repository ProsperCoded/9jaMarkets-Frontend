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

export function convertToNestedListOrdered(list, nestCount) {
  if (list.length % nestCount !== 0) {
    throw new Error("The list cannot be divided into equal parts");
  }
  let columns = list.length / nestCount;
  let nestedList = [
    Array(columns)
      .fill([])
      .map((_, i) => i * 3),
  ];

  let index = 0;
  while (index < list.length) {
    for (let i = 0; i < nestedList.length; i++) {
      nestedList[i].push(list[index]);
      index++;
    }
  }
  return nestedList;
}
export function convertToNestedList(list, nestCount, orderCount) {
  // orderCount is a number that aims to arange the first set of (orderCount) items in a specific order that it would be displayed to the user.
  let nestedList = [];

  let index = 0;
  // if (orderCount) {
  //   let firstItems = convertToNestedListOrdered(
  //     list.slice(0, orderCount),
  //     nestCount
  //   );
  //   nestedList.push(...firstItems);
  //   index = orderCount;
  // }
  while (index < list.length) {
    nestedList.push(list.slice(index, index + nestCount));
    index += nestCount;
  }
  return nestedList;
}

export function flattenNestedList(nestedList) {
  return nestedList.flat();
}
