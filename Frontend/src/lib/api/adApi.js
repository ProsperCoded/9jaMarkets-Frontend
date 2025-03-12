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

export async function verifyAdPayment(reference, errorLogger = () => {}) {
  const { accessToken } = getAuth();
  const url = new URL(`ad/verify/${reference}`, SERVER_URL);
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

/**
 * Fetches advertisements with optional filtering by market and/or merchant
 *
 * @param {Object} options - Filter options
 * @param {string} options.market - Optional market ID to filter ads
 * @param {string} options.merchant - Optional merchant ID to filter ads
 * @param {Function} errorLogger - Function to log errors
 * @returns {Promise<Array>} - A promise that resolves to an array of ads
 */
export async function getAdsApi(
  { market, merchant } = {},
  errorLogger = () => {}
) {
  const url = new URL("ad", SERVER_URL);

  // Add query parameters if provided
  if (market) url.searchParams.append("market", market);
  if (merchant) url.searchParams.append("merchant", merchant);

  try {
    const response = await fetch(url);
    const responseData = await response.json();

    if (!response.ok) {
      errorLogger(responseData.message);
      return [];
    }

    return responseData.data || [];
  } catch (error) {
    errorLogger("Failed to fetch ads");
    console.error("Error fetching ads:", error);
    return [];
  }
}

export async function getAdApi(adId, errorLogger = () => {}) {
  const url = new URL(`ad/${adId}`, SERVER_URL);

  try {
    const response = await fetch(url);
    const responseData = await response.json();

    if (!response.ok) {
      errorLogger(responseData.message);
      return null;
    }

    return responseData.data || null;
  } catch (error) {
    errorLogger("Failed to fetch ad");
    console.error("Error fetching ad:", error);
    return null;
  }
}

export async function getAdByProduct(productId, errorLogger = () => {}) {
  const url = new URL(`ad/product/${productId}`, SERVER_URL);

  try {
    const response = await fetch(url);
    const responseData = await response.json();

    if (!response.ok) {
      errorLogger(responseData.message);
      return null;
    }

    return responseData.data || null;
  } catch (error) {
    errorLogger("Failed to fetch ad");
    console.error("Error fetching ad:", error);
    return null;
  }
}
/**
 * Fetches active ads and integrates them with product data
 *
 * @param {Array} products - Array of product objects to enhance with ad data
 * @param {Object} options - Filter options
 * @param {string} options.market - Optional market ID to filter ads
 * @param {Function} errorLogger - Function to log errors
 * @returns {Promise<Array>} - A promise that resolves to products with ad information
 */
export async function getProductsWithAdsStatus(
  products,
  { market } = {},
  errorLogger = () => {}
) {
  if (!products || products.length === 0) return [];

  try {
    const ads = await getAdsApi({ market }, errorLogger);

    // Create a map of productId to ad
    const adMap = new Map();
    ads.forEach((ad) => {
      if (ad.paidFor) {
        adMap.set(ad.productId, ad);
      }
    });

    // Enhance products with ad information
    return products.map((product) => {
      const ad = adMap.get(product.id);
      return {
        ...product,
        adStatus: ad
          ? {
              isAd: true,
              adId: ad.id, // Include the actual ad ID for tracking
              level: ad.level,
              expiresAt: ad.expiresAt,
            }
          : {
              isAd: false,
            },
      };
    });
  } catch (error) {
    errorLogger("Failed to integrate ad information");
    console.error("Error integrating ad information:", error);
    return products;
  }
}

/**
 * Sorts products to show ads first, with higher level ads appearing before lower level ads
 *
 * @param {Array} products - Array of products with ad status
 * @returns {Array} - Sorted array of products
 */
export function sortProductsByAdPriority(products) {
  return [...products].sort((a, b) => {
    // First check if product has ad status
    if (a.adStatus?.isAd && !b.adStatus?.isAd) return -1;
    if (!a.adStatus?.isAd && b.adStatus?.isAd) return 1;

    // If both are ads, sort by level (higher level first)
    if (a.adStatus?.isAd && b.adStatus?.isAd) {
      return b.adStatus.level - a.adStatus.level;
    }

    // If neither are ads, maintain original order
    return 0;
  });
}
