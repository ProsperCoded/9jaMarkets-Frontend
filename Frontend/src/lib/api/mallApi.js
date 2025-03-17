import { SERVER_URL } from "@/config";
import { getAuth } from "../util";

export async function getMallsApi(errorLogger = () => {}) {
  const url = new URL("market/malls", SERVER_URL);
  const response = await fetch(url);
  const responseData = await response.json();
  if (!response.ok) {
    errorLogger(responseData.message);
    return;
  }
  return responseData.data;
}

export async function createMallApi(mallData, errorLogger = () => {}) {
  // Add isMall flag to indicate this is a mall
  const mallDataWithFlag = {
    ...mallData,
    isMall: true,
  };

  const url = new URL("markets", SERVER_URL);
  const { accessToken } = getAuth();

  const formData = new FormData();

  // Add all mall data to FormData
  Object.keys(mallDataWithFlag).forEach((key) => {
    if (key === "displayImage" && mallDataWithFlag[key] instanceof File) {
      formData.append(key, mallDataWithFlag[key]);
    } else if (
      mallDataWithFlag[key] !== undefined &&
      mallDataWithFlag[key] !== null
    ) {
      formData.append(key, String(mallDataWithFlag[key]));
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

export async function deleteMallApi(mallId, errorLogger = () => {}) {
  const url = new URL(`markets/${mallId}`, SERVER_URL);
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
