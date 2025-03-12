import { useEffect, useRef } from "react";
import {
  trackAdView,
  trackAdClick,
  trackProductClick,
} from "@/lib/api/trackingApi";

/**
 * Custom hook to track when an element enters the viewport (for ad views)
 * Uses Intersection Observer API for efficient tracking
 *
 * @param {string} adId - The ID of the ad to track
 * @param {Object} options - Configuration options
 * @param {boolean} options.enabled - Whether tracking is enabled (default: true)
 * @param {number} options.threshold - How much of the element needs to be visible (0-1)
 * @returns {Object} ref - Attach this ref to the element you want to track
 */
export function useTrackAdView(adId, { enabled = true, threshold = 0.5 } = {}) {
  const elementRef = useRef(null);

  useEffect(() => {
    // Skip if no adId or tracking is disabled
    if (!adId || !enabled) return;

    // Skip if there's no element to observe
    const element = elementRef.current;
    if (!element) return;

    // Create observer to detect when ad enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Ad is visible, track the view
            trackAdView(adId);
            // Only track view once
            observer.disconnect();
          }
        });
      },
      { threshold }
    );

    // Start observing the element
    observer.observe(element);

    // Clean up
    return () => {
      observer.disconnect();
    };
  }, [adId, enabled, threshold]);

  return elementRef;
}

/**
 * Hook to handle ad click tracking
 *
 * @returns {Function} handleAdClick - Call this function when an ad is clicked
 */
export function useTrackAdClick() {
  return (adId, event) => {
    // Don't interfere with default link behavior
    // Just track the click
    trackAdClick(adId);
  };
}

/**
 * Hook to handle product click tracking
 *
 * @returns {Function} handleProductClick - Call this function when a product is clicked
 */
export function useTrackProductClick() {
  return (productId, event) => {
    // Don't interfere with default link behavior
    // Just track the click
    trackProductClick(productId);
  };
}

/**
 * Combined hook for tracking both ad views and clicks
 *
 * @param {string} adId - The ID of the ad to track
 * @param {Object} options - Configuration options
 * @returns {Object} - Contains both the ref for view tracking and click handler
 */
export function useAdTracking(adId, options = {}) {
  const viewRef = useTrackAdView(adId, options);
  const handleClick = useTrackAdClick();

  return {
    ref: viewRef,
    onClick: (event) => handleClick(adId, event),
  };
}
