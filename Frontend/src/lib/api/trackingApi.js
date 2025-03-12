import { SERVER_URL } from "@/config";

/**
 * Track when an advertisement is viewed (becomes visible in the viewport)
 * This is a non-blocking fire-and-forget request
 *
 * @param {string} adId - The ID of the ad that was viewed
 */
export function trackAdView(adId) {
  if (!adId) return;

  try {
    // Fire-and-forget - don't await or handle response
    fetch(`${SERVER_URL}ad/${adId}/view`, {
      method: "PUT",
    }).catch((error) => console.warn("Ad view tracking failed:", error));
  } catch (error) {
    // Just log to console, don't disrupt user experience
    console.warn("Error tracking ad view:", error);
  }
}

/**
 * Track when an advertisement is clicked
 * This is a non-blocking fire-and-forget request
 *
 * @param {string} adId - The ID of the ad that was clicked
 */
export function trackAdClick(adId) {
  if (!adId) return;

  try {
    // Fire-and-forget - don't await or handle response
    fetch(`${SERVER_URL}ad/${adId}/click`, {
      method: "PUT",
    }).catch((error) => console.warn("Ad click tracking failed:", error));
  } catch (error) {
    // Just log to console, don't disrupt user experience
    console.warn("Error tracking ad click:", error);
  }
}

/**
 * Track when a product is clicked
 * This is a non-blocking fire-and-forget request
 *
 * @param {string} productId - The ID of the product that was clicked
 */
export function trackProductClick(productId) {
  if (!productId) return;

  try {
    // Fire-and-forget - don't await or handle response
    fetch(`${SERVER_URL}product/${productId}/click`, {
      method: "PUT",
    }).catch((error) => console.warn("Product click tracking failed:", error));
  } catch (error) {
    // Just log to console, don't disrupt user experience
    console.warn("Error tracking product click:", error);
  }
}
