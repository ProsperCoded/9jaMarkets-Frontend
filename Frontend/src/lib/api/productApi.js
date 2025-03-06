import { getAuth } from "../util";
import { SERVER_URL } from "@/config";
export async function uploadProductApi(payload, errorLogger = () => {}) {
  const { accessToken } = getAuth();
  const url = new URL(`product`, SERVER_URL);
  const formData = new FormData();
  formData.append("name", payload.productName);
  formData.append("details", payload.productDetails);
  formData.append("price", payload.price);
  formData.append("description", payload.productDescription);
  formData.append("category", payload.category);
  formData.append("stock", payload.stock);
  payload.selectedImages.forEach((image) => {
    formData.append("productImages", image.file, image.file.name);
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
  return responseData.message;
}
export async function getProductsApi(errorLogger = () => {}) {
  const { userId: merchantId } = getAuth();
  const url = new URL(`product/merchant/${merchantId}`, SERVER_URL);
  const response = await fetch(url);
  const responseData = await response.json();
  if (!response.ok) {
    errorLogger(responseData.message);
    return;
  }
  return responseData.data;
}
export async function getProduct(productId, errorLogger = () => {}) {
  const url = new URL(`product/${productId}`, SERVER_URL);
  const response = await fetch(url);
  const responseData = await response.json();
  if (!response.ok) {
    errorLogger(responseData.message);
    return;
  }
  return responseData.data;
}

export async function deleteProductApi(productId, errorLogger = () => {}) {
  const { accessToken } = getAuth();
  const url = new URL(`product/${productId}`, SERVER_URL);
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    errorLogger("Unable to delete product ");
    return;
  }
  return "Deleted";
}

export async function getMerchantProducts(merchantId, errorLogger = () => {}) {
  const url = new URL(`product/merchant/${merchantId}`, SERVER_URL);
  const response = await fetch(url);
  const responseData = await response.json();
  if (!response.ok) {
    errorLogger(responseData.message);
    return;
  }
  return responseData.data;
}

/**
 * Fetches paginated products with optional category and state filters
 *
 * @param {Object} options - Filter and pagination options
 * @param {number} options.page - Current page number (default: 1)
 * @param {number} options.pageSize - Number of items per page (default: 40)
 * @param {string} options.category - Optional category filter
 * @param {string} options.state - Optional state filter
 * @param {Function} errorLogger - Error logging function
 * @returns {Promise<{
 *   items: Array,
 *   totalItems: number,
 *   totalPages: number,
 *   currentPage: number,
 *   hasNextPage: boolean,
 *   hasPreviousPage: boolean
 * }>} Paginated product data
 */
export async function getPagedProductsApi(
  { page = 1, pageSize = 40, category = null, state = null },
  errorLogger = () => {}
) {
  const url = new URL(`product`, SERVER_URL);

  // Add query parameters
  url.searchParams.append("page", page);
  url.searchParams.append("pageSize", pageSize);

  if (category && category !== "All") {
    url.searchParams.append("category", category);
  }

  if (state && state !== "All") {
    url.searchParams.append("state", state);
  }

  const response = await fetch(url);
  const responseData = await response.json();

  if (!response.ok) {
    errorLogger(responseData.message || "Failed to fetch products");
    return null;
  }

  return responseData.data;
}
