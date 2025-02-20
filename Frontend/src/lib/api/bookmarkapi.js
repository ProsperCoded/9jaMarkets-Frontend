// * Bookmark actually utilizes the cart api from the backend
import { SERVER_URL } from "@/config";
import { getAuth } from "../util";

export async function getBookmarks(customerId, errorLogger = () => {}) {
  const url = new URL(`customer/cart/${customerId}`, SERVER_URL);
  const response = await fetch(url);
  const responseData = await response.json();
  if (!response.ok) {
    errorLogger(responseData.message);
    return;
  }
  return responseData.data;
}

export async function addToBookmarks(productId, errorLogger = () => {}) {
  const url = new URL(`customer/cart/${productId}`, SERVER_URL);
  const { accessToken } = getAuth();
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const responseData = await response.json();
  if (!response.ok) {
    errorLogger(responseData.message);
    return;
  }
  return responseData.data;
}
export async function removeFromBookmarks(productId, errorLogger = () => {}) {
  const url = new URL(`customer/cart/${productId}`, SERVER_URL);
  const { accessToken } = getAuth();
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const responseData = await response.json();
  if (!response.ok) {
    errorLogger(responseData.message);
    return;
  }
  return responseData.data;
}

export async function clearBookmarks(errorLogger = () => {}) {
  const url = new URL(`customer/cart/clear`, SERVER_URL);
  const { accessToken } = getAuth();
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const responseData = await response.json();
  if (!response.ok) {
    errorLogger(responseData.message);
    return;
  }
  return responseData.data;
}
