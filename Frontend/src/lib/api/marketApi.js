import { SERVER_URL } from "@/config";
import { getAuth } from "../util";

export async function getMarketsApi(errorLogger = () => {}) {
  const url = new URL("market", SERVER_URL);
  const response = await fetch(url);
  const responseData = await response.json();
  if (!response.ok) {
    errorLogger(responseData.message);
    return;
  }
  return responseData.data;
}

export async function getMarketNamesApi(errorLogger = () => {}) {
  const url = new URL("market/names", SERVER_URL);
  const response = await fetch(url);
  const responseData = await response.json();
  if (!response.ok) {
    errorLogger(responseData.message);
    return;
  }
  return responseData.data;
}

export async function getMarketProducts(marketId, errorLogger = () => {}) {
  const url = new URL(`product/market/${marketId}`, SERVER_URL);
  const response = await fetch(url);
  const responseData = await response.json();
  if (!response.ok) {
    errorLogger(responseData.message);
    return;
  }
  return responseData.data;
}

export async function createMarketApi(marketData, errorLogger = () => {}) {
  const url = new URL("market", SERVER_URL);
  const { accessToken } = getAuth();

  const formData = new FormData();

  // Add all market data to FormData
  Object.keys(marketData).forEach((key) => {
    if (key === "displayImage" && marketData[key] instanceof File) {
      formData.append(key, marketData[key]);
    } else if (marketData[key] !== undefined && marketData[key] !== null) {
      formData.append(key, String(marketData[key]));
    }
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  const responseData = await response.json();
  if (!response.ok) {
    errorLogger(responseData.message);
    return;
  }
  return responseData.data;
}

export async function deleteMarketApi(marketId, errorLogger = () => {}) {
  const url = new URL(`market/${marketId}`, SERVER_URL);
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

export async function deleteAllMarketsApi(errorLogger = () => {}) {
  const url = new URL("market", SERVER_URL);
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
