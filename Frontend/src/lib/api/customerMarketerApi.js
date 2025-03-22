import { SERVER_URL } from "@/config";
import { getAuth } from "../util";

/**
 * Get the marketer profile associated with the authenticated customer
 *
 * @param {Function} errorLogger - Function to log errors
 * @returns {Promise<Object>} - A promise that resolves to the marketer profile data
 */
export async function getCustomerMarketerProfileApi(errorLogger = () => {}) {
  const url = new URL("customer/get-marketer", SERVER_URL);
  const { accessToken } = getAuth();

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const responseData = await response.json();

    if (!response.ok) {
      errorLogger(responseData.message || "Failed to fetch marketer profile");
      return null;
    }

    return responseData.data;
  } catch (error) {
    errorLogger("Failed to fetch marketer profile");
    console.error("Error fetching customer marketer profile:", error);
    return null;
  }
}

/**
 * Get the merchants referred by the authenticated customer (as a marketer)
 * along with profit information
 *
 * @param {Function} errorLogger - Function to log errors
 * @returns {Promise<Array>} - A promise that resolves to an array of referred merchants
 */
export async function getCustomerMarketerReferralsApi(errorLogger = () => {}) {
  const url = new URL("customer/get-referrals", SERVER_URL);
  const { accessToken } = getAuth();

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const responseData = await response.json();

    if (!response.ok) {
      errorLogger(responseData.message || "Failed to fetch marketer referrals");
      return [];
    }

    return responseData.data;
  } catch (error) {
    errorLogger("Failed to fetch marketer referrals");
    console.error("Error fetching customer marketer referrals:", error);
    return [];
  }
}
