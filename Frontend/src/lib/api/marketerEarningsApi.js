import { SERVER_URL } from "@/config";
import { getAuth } from "../util";

/**
 * Get all marketers with their earnings summaries
 *
 * @param {Function} errorLogger - Function to log errors
 * @returns {Promise<Array>} - A promise that resolves to an array of marketers with earnings
 */
export async function getAllMarketersWithEarnings(errorLogger = () => {}) {
  const url = new URL("marketer/earnings", SERVER_URL);
  const { accessToken } = getAuth();

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const responseData = await response.json();

    if (!response.ok) {
      errorLogger(responseData.message || "Failed to fetch marketers earnings");
      return [];
    }

    return responseData.data;
  } catch (error) {
    errorLogger("Failed to fetch marketers earnings");
    console.error("Error fetching marketers with earnings:", error);
    return [];
  }
}

/**
 * Get paid earnings for a specific marketer
 *
 * @param {string} marketerId - UUID of the marketer
 * @param {Function} errorLogger - Function to log errors
 * @returns {Promise<Object>} - A promise that resolves to the paid earnings data
 */
export async function getMarketerPaidEarnings(
  marketerId,
  errorLogger = () => {}
) {
  const url = new URL(`marketer/${marketerId}/earnings-paid`, SERVER_URL);
  const { accessToken } = getAuth();

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const responseData = await response.json();

    if (!response.ok) {
      errorLogger(responseData.message || "Failed to fetch paid earnings");
      return { earnings: [], totalPaidEarnings: 0 };
    }

    return responseData.data;
  } catch (error) {
    errorLogger("Failed to fetch paid earnings");
    console.error("Error fetching marketer paid earnings:", error);
    return { earnings: [], totalPaidEarnings: 0 };
  }
}

/**
 * Get unpaid earnings for a specific marketer
 *
 * @param {string} marketerId - UUID of the marketer
 * @param {Function} errorLogger - Function to log errors
 * @returns {Promise<Object>} - A promise that resolves to the unpaid earnings data
 */
export async function getMarketerUnpaidEarnings(
  marketerId,
  errorLogger = () => {}
) {
  const url = new URL(`marketer/${marketerId}/earnings-unpaid`, SERVER_URL);
  const { accessToken } = getAuth();

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const responseData = await response.json();

    if (!response.ok) {
      errorLogger(responseData.message || "Failed to fetch unpaid earnings");
      return { earnings: [], totalUnpaidEarnings: 0 };
    }

    return responseData.data;
  } catch (error) {
    errorLogger("Failed to fetch unpaid earnings");
    console.error("Error fetching marketer unpaid earnings:", error);
    return { earnings: [], totalUnpaidEarnings: 0 };
  }
}

/**
 * Mark unpaid earnings as paid for a specific marketer
 *
 * @param {string} marketerId - UUID of the marketer
 * @param {Function} errorLogger - Function to log errors
 * @param {Function} successLogger - Function to log success messages
 * @returns {Promise<Object>} - A promise that resolves to the payment confirmation data
 */
export async function markEarningsAsPaid(
  marketerId,
  errorLogger = () => {},
  successLogger = () => {}
) {
  const url = new URL(`marketer/${marketerId}/payment-made`, SERVER_URL);
  const { accessToken } = getAuth();

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      errorLogger(responseData.message || "Failed to mark earnings as paid");
      return null;
    }

    successLogger(
      responseData.message || "Earnings marked as paid successfully"
    );
    return responseData.data;
  } catch (error) {
    errorLogger("Failed to mark earnings as paid");
    console.error("Error marking earnings as paid:", error);
    return null;
  }
}
