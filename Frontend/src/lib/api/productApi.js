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
