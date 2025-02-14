import { getAuth } from "../util";
import { SERVER_URL } from "@/config";

/**
 * Activates a free ad for a given product ID.
 *
 * @param {string} productId - The ID of the product for which the free ad is being activated.
 * @returns {Promise<{
 *  id: string,
 * level: number,
 * paidFor: boolean,
 * productId: string,
 * expiresAt: string,
 * createdAt: string,
 * updatedAt: string
 * }>} - A promise that resolves to the data from the API response.
 */
export async function activateFreeAd(productId, errorLogger = () => {}) {
  const { accessToken } = getAuth();
  const url = new URL(`ad/free/${productId}`, SERVER_URL);

  const response = await fetch(url, {
    method: "POST",
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

// * Example Response Data
/**
 * {
  "status": "success",
  "message": "Free Ad Activated Successfully",
  "data": {
    "id": "fa30b8af-94a2-4222-a2e5-ea71ed180f14",
    "level": 0,
    "paidFor": false,
    "productId": "ce6ca12d-6a6c-4b09-b23d-0af44d2b0813",
    "expiresAt": "2025-02-08T12:11:09.852Z",
    "createdAt": "2025-02-05T12:11:09.854Z",
    "updatedAt": "2025-02-05T12:11:09.854Z"
  }
}
 */

/**
 * Initializes the ad API for a given level and product ID.
 *
 * @param {string} level - The level of the ad to initialize.
 * @param {string} productId - The ID of the product for which the ad is being initialized.
 * @param {function} [errorLogger=() => {}] - Optional error logging function.
 * @returns {Promise<{
 *   status: string,
 *   message: string,
 *   data: {
 *     merchant_code: string,
 *     pay_item_id: string,
 *     txn_ref: string,
 *     mode: string,
 *     site_redirect_url: string,
 *     amount: number,
 *     currency: number
 *   }
 * }>} - A promise that resolves to the data from the API response.
 * @throws {Error} - Throws an error if the API request fails.
 */
export async function initializeAdApi(
  level,
  productId,
  errorLogger = () => {}
) {
  const { accessToken } = getAuth();
  const url = new URL(`ad/initialize/${level}/${productId}`, SERVER_URL);

  const response = await fetch(url, {
    method: "POST",
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
// * Example Response Data
/** 
 {
  "status": "success",
  "message": "Ad Payment Initialized Successfully",
  "data": {
    "merchant_code": "MX007",
    "pay_item_id": "101007",
    "txn_ref": "txn-2a8214f8-6a8d-43b4-b9c1-985a14711082",
    "mode": "TEST",
    "site_redirect_url": "http://localhost:3000/checkout?txn_ref=txn-2a8214f8-6a8d-43b4-b9c1-985a14711082",
    "amount": 10000,
    "currency": 566
  }
}
  **/
/**
 * Verifies the ad payment for a given transaction reference.
 *
 * @param {string} txnReference - The transaction reference to verify.
 * @param {function} [errorLogger=() => {}] - Optional error logging function.
 * @returns {Promise<{
 *   id: string,
 *   amount: number,
 *   status: string,
 *   for: string,
 *   reference: string,
 *   date: string,
 *   updatedAt: string,
 *   deletedAt: string | null,
 *   merchantId: string
 * }>} - A promise that resolves to the data from the API response.
 * @throws {Error} - Throws an error if the API request fails.
 */
export async function verifyAdPayment(txnReference, errorLogger = () => {}) {
  const { accessToken } = getAuth();
  const url = new URL(`ad/verify/${txnReference}`, SERVER_URL);

  const response = await fetch(url, {
    method: "GET",
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

// * Example Response Data
/** 
{
  "status": "success",
  "message": "Ad Payment Verified Successfully",
  "data": {
    "id": "1b9b844d-0043-4640-88f7-67d45047f9db",
    "amount": 10000,
    "status": "INITIALIZED",
    "for": "ADVERTISEMENT",
    "reference": "d95da5c9-6fd3-4f1c-95f9-dd95198f7a38",
    "date": "2025-02-05T12:37:45.058Z",
    "updatedAt": "2025-02-05T12:37:45.058Z",
    "deletedAt": null,
    "merchantId": "29164ad7-6bcb-44ae-b00e-d2d21aa37137"
  }
}
  **/
