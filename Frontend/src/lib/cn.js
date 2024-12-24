import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and merges Tailwind classes with tailwind-merge.
 * @param  {...any} inputs - Class names or conditional class objects.
 * @returns {string} - The combined and merged class names.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
