import { SERVER_URL } from "@/config";
import { getAuth } from "../util";

/**
 * Get marketer by referrer code
 *
 * @param {string} referrerCode - The unique referrer code of the marketer
 * @param {Function} errorLogger - Function to log errors
 * @returns {Promise<Object>} - A promise that resolves to the marketer data
 */
export async function getMarketerByReferrerCode(
  referrerCode,
  errorLogger = () => {}
) {
  const url = new URL(`marketer/referrer/${referrerCode}`, SERVER_URL);

  try {
    const response = await fetch(url);
    const responseData = await response.json();

    if (!response.ok) {
      errorLogger(
        responseData.message || "Failed to fetch marketer information"
      );
      return null;
    }

    return responseData.data;
  } catch (error) {
    errorLogger("Failed to fetch marketer information");
    console.error("Error fetching marketer by referrer code:", error);
    return null;
  }
}

/**
 * List all marketers (Admin only)
 *
 * @param {Function} errorLogger - Function to log errors
 * @returns {Promise<Array>} - A promise that resolves to an array of marketers
 */
export async function getAllMarketersApi(errorLogger = () => {}) {
  const url = new URL("marketer", SERVER_URL);
  const { accessToken } = getAuth();

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const responseData = await response.json();

    if (!response.ok) {
      errorLogger(responseData.message || "Failed to fetch marketers");
      return [];
    }

    return responseData.data;
  } catch (error) {
    errorLogger("Failed to fetch marketers");
    console.error("Error fetching all marketers:", error);
    return [];
  }
}

/**
 * Get marketer by ID
 *
 * @param {string} marketerId - UUID of the marketer
 * @param {Function} errorLogger - Function to log errors
 * @returns {Promise<Object>} - A promise that resolves to the marketer data
 */
export async function getMarketerByIdApi(marketerId, errorLogger = () => {}) {
  const url = new URL(`marketer/${marketerId}`, SERVER_URL);
  const { accessToken } = getAuth();

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const responseData = await response.json();

    if (!response.ok) {
      errorLogger(responseData.message || "Failed to fetch marketer");
      return null;
    }

    return responseData.data;
  } catch (error) {
    errorLogger("Failed to fetch marketer");
    console.error("Error fetching marketer by ID:", error);
    return null;
  }
}

/**
 * Create a new marketer
 *
 * @param {FormData} formData - FormData object containing marketer information and ID image
 * @param {Function} errorLogger - Function to log errors
 * @param {Function} successLogger - Function to log success messages
 * @returns {Promise<Object>} - A promise that resolves to the created marketer data
 */
export async function createMarketerApi(
  formData,
  errorLogger = () => {},
  successLogger = () => {}
) {
  const url = new URL("marketer", SERVER_URL);
  const { accessToken } = getAuth();

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    const responseData = await response.json();

    if (!response.ok) {
      errorLogger(responseData.message || "Failed to create marketer");
      return null;
    }

    successLogger(responseData.message || "Marketer created successfully");
    return responseData.data;
  } catch (error) {
    errorLogger("Failed to create marketer account");
    console.error("Error creating marketer:", error);
    return null;
  }
}

/**
 * Update marketer information
 *
 * @param {string} marketerId - UUID of the marketer
 * @param {FormData} formData - FormData object containing updated marketer information and ID image
 * @param {Function} errorLogger - Function to log errors
 * @param {Function} successLogger - Function to log success messages
 * @returns {Promise<Object>} - A promise that resolves to the updated marketer data
 */
export async function updateMarketerApi(
  marketerId,
  formData,
  errorLogger = () => {},
  successLogger = () => {}
) {
  const url = new URL(`marketer/${marketerId}`, SERVER_URL);
  const { accessToken } = getAuth();

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    const responseData = await response.json();

    if (!response.ok) {
      errorLogger(responseData.message || "Failed to update marketer");
      return null;
    }

    successLogger(responseData.message || "Marketer updated successfully");
    return responseData.data;
  } catch (error) {
    errorLogger("Failed to update marketer information");
    console.error("Error updating marketer:", error);
    return null;
  }
}

/**
 * Verify marketer (Admin only)
 *
 * @param {string} marketerId - UUID of the marketer
 * @param {Function} errorLogger - Function to log errors
 * @param {Function} successLogger - Function to log success messages
 * @returns {Promise<Object>} - A promise that resolves to the verified marketer data
 */
export async function verifyMarketerApi(
  marketerId,
  errorLogger = () => {},
  successLogger = () => {}
) {
  const url = new URL(`marketer/${marketerId}/verify`, SERVER_URL);
  const { accessToken } = getAuth();

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      errorLogger(responseData.message || "Failed to verify marketer");
      return null;
    }

    successLogger(responseData.message || "Marketer verified successfully");
    return responseData.data;
  } catch (error) {
    errorLogger("Failed to verify marketer");
    console.error("Error verifying marketer:", error);
    return null;
  }
}

/**
 * Get marketer earnings
 *
 * @param {string} marketerId - UUID of the marketer
 * @param {Function} errorLogger - Function to log errors
 * @returns {Promise<Array>} - A promise that resolves to an array of earnings
 */
export async function getMarketerEarningsApi(
  marketerId,
  errorLogger = () => {}
) {
  const url = new URL(`marketer/${marketerId}/earnings`, SERVER_URL);
  const { accessToken } = getAuth();

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      errorLogger(responseData.message || "Failed to fetch marketer earnings");
      return [];
    }

    return responseData.data;
  } catch (error) {
    errorLogger("Failed to fetch marketer earnings");
    console.error("Error fetching marketer earnings:", error);
    return [];
  }
}

/**
 * Delete marketer (Admin only)
 *
 * @param {string} marketerId - UUID of the marketer
 * @param {Function} errorLogger - Function to log errors
 * @param {Function} successLogger - Function to log success messages
 * @returns {Promise<boolean>} - A promise that resolves to true if successful
 */
export async function deleteMarketerApi(
  marketerId,
  errorLogger = () => {},
  successLogger = () => {}
) {
  const url = new URL(`marketer/${marketerId}`, SERVER_URL);
  const { accessToken } = getAuth();

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      errorLogger(responseData.message || "Failed to delete marketer");
      return false;
    }

    successLogger(responseData.message || "Marketer deleted successfully");
    return true;
  } catch (error) {
    errorLogger("Failed to delete marketer");
    console.error("Error deleting marketer:", error);
    return false;
  }
}
