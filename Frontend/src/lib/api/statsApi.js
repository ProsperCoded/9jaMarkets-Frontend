import { SERVER_URL } from "@/config";
import { getAuth } from "../util";

export async function getPlatformStatsApi(errorLogger = () => {}) {
  const url = new URL("stats/platform", SERVER_URL);
  const { accessToken } = getAuth();
  const response = await fetch(url, {
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

export async function getRevenueStatsApi(errorLogger = () => {}) {
  const url = new URL("stats/revenue", SERVER_URL);
  const { accessToken } = getAuth();
  const response = await fetch(url, {
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

export async function getAllStatsApi(errorLogger = () => {}) {
  const url = new URL("stats/all", SERVER_URL);
  const { accessToken } = getAuth();
  const response = await fetch(url, {
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

export async function getTotalProductsCountApi(errorLogger = () => {}) {
  const url = new URL("stats/products/count", SERVER_URL);
  const { accessToken } = getAuth();
  const response = await fetch(url, {
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

export async function getTotalAdsCountApi(errorLogger = () => {}) {
  const url = new URL("stats/ads/count", SERVER_URL);
  const { accessToken } = getAuth();
  const response = await fetch(url, {
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
