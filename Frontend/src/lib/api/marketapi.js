import { SERVER_URL } from "@/config";

export async function getMarketsApi(errorLogger = () => {}) {
  const url = new URL("market", SERVER_URL);
  const response = await fetch(url);
  const responseData = await response.json();
  if (!response.ok) {
    errorLogger(responseData.message);
    return;
  }
  return responseData.data;
}
