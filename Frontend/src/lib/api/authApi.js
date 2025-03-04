import { SERVER_URL } from "../../config";
export async function signUpApi(
  payload,
  errorLogger = () => {},
  successLogger = () => {}
) {
  const url = new URL("auth/customer/signup", SERVER_URL);
  console.log(url.href, payload);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const responseData = await response.json();

  console.log({ responseData, response });
  if (!response.ok) {
    errorLogger(responseData.message);
    return;
  }
  successLogger(responseData.message);
  return responseData;
}
export async function loginApi(
  payload,
  endpoint,
  errorLogger = () => {},
  successLogger = () => {}
) {
  const url = new URL(endpoint, SERVER_URL);
  const loginResponse = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const loginData = await loginResponse.json();
  if (!loginResponse.ok) {
    errorLogger(loginData.message);
    console.error(loginData.message); // logservice
    return;
  }
  successLogger(loginData.message);
  return loginData.data;
}
export async function loginCustomerApi(payload, errorLogger, successLogger) {
  const endpoint = "auth/customer/login";
  return loginApi(payload, endpoint, errorLogger, successLogger);
}
export async function loginMerchantApi(payload, errorLogger, successLogger) {
  const endpoint = "auth/merchant/login";
  return loginApi(payload, endpoint, errorLogger, successLogger);
}

export async function refreshTokenApi(
  refreshToken,
  endpoint,
  errorLogger = () => {}
) {
  const url = new URL(endpoint, SERVER_URL);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ refreshToken }),
  });
  const responseData = await response.json();
  if (!response.ok) {
    errorLogger(responseData.message);
    return;
  }
  return responseData.data;
}
export async function refreshCustomerTokenApi(
  refreshToken,
  errorLogger = () => {}
) {
  let endpoint = "auth/customer/refresh-token";
  return refreshTokenApi(refreshToken, endpoint, errorLogger);
}
export async function refreshMerchantTokenApi(
  refreshToken,
  errorLogger = () => {}
) {
  let endpoint = "auth/merchant/refresh-token";
  return refreshTokenApi(refreshToken, endpoint, errorLogger);
}

export async function logoutApi(
  refreshToken,
  endpoint,
  errorLogger = () => {}
) {
  const url = new URL(endpoint, SERVER_URL);
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ refreshToken }),
  });
  const responseData = await response.json();
  if (!response.ok) {
    errorLogger(responseData.message);
    return;
  }
  return responseData.message;
}
export async function logoutCustomer(refreshToken, errorLogger = () => {}) {
  const endpoint = "auth/customer/logout";
  return logoutApi(refreshToken, endpoint, errorLogger);
}
export async function logoutMerchant(refreshToken, errorLogger = () => {}) {
  const endpoint = "auth/merchant/logout";
  return logoutApi(refreshToken, endpoint, errorLogger);
}
export async function exchangeTokenApi(
  exchangeToken,
  endpoint,
  errorLogger = () => {},
  successLogger = () => {}
) {
  const url = new URL(endpoint, SERVER_URL);
  url.searchParams.append("token", exchangeToken);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  const responseData = await response.json();
  if (!response.ok) {
    errorLogger(responseData.message);
    return;
  }
  successLogger(responseData.message);
  return responseData.data;
}
export async function exchangeTokenCustomerApi(
  exchangeToken,
  errorLogger,
  successLogger
) {
  const endpoint = "auth/customer/exchange-token";
  return exchangeTokenApi(exchangeToken, endpoint, errorLogger, successLogger);
}
export async function exchangeTokenMerchantApi(
  exchangeToken,
  errorLogger,
  successLogger
) {
  const endpoint = "auth/merchant/exchange-token";
  return exchangeTokenApi(exchangeToken, endpoint, errorLogger, successLogger);
}

export async function signupMerchantApi(
  payload,
  errorLogger = () => {},
  successLogger = () => {}
) {
  const url = new URL("auth/merchant/signup", SERVER_URL);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const responseData = await response.json();
  if (!response.ok) {
    errorLogger(responseData.message);
    return;
  }
  successLogger(responseData.message);
  console.log({ responseData });
  return responseData;
}
export async function sendVerificationEmailApi(
  email,
  endpoint,
  errorLogger = () => {}
) {
  const url = new URL(endpoint, SERVER_URL);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const responseData = await response.json();
  if (!response.ok) {
    errorLogger(responseData.message);
    return;
  }
  return responseData.message;
}

export async function sendVerificationCustomerEmailApi(
  email,
  errorLogger = () => {}
) {
  const endpoint = "auth/customer/email-verification";
  return sendVerificationEmailApi(email, endpoint, errorLogger);
}

export async function sendVerificationMerchantEmailApi(
  email,
  errorLogger = () => {}
) {
  const endpoint = "auth/market/email-verification";
  return sendVerificationEmailApi(email, endpoint, errorLogger);
}

export async function verifyEmailOtp(
  email,
  code,
  endpoint,
  errorLogger = () => {}
) {
  const url = new URL(endpoint, SERVER_URL);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, code }),
  });
  const responseData = await response.json();
  if (!response.ok) {
    errorLogger(responseData.message);
    return;
  }
  return responseData.message;
}
export async function verifyCustomerEmailOtp(
  email,
  code,
  errorLogger = () => {}
) {
  const endpoint = "auth/customer/verify-email";
  return verifyEmailOtp(email, code, endpoint, errorLogger);
}
export async function verifyMerchantEmailOtp(
  email,
  code,
  errorLogger = () => {}
) {
  const endpoint = "auth/merchant/verify-email";
  return verifyEmailOtp(email, code, endpoint, errorLogger);
}
export async function sendForgetPasswordApi(
  email,
  endpoint,
  errorLogger = () => {}
) {
  const url = new URL(endpoint, SERVER_URL);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const responseData = await response.json();
  if (!response.ok) {
    errorLogger(responseData.message);
    return;
  }
  return responseData.message;
}

export async function sendForgetPasswordCustomerApi(
  email,
  errorLogger = () => {}
) {
  const endpoint = "auth/customer/forgot-password";
  return sendForgetPasswordApi(email, endpoint, errorLogger);
}

export async function sendForgetPasswordMerchantApi(
  email,
  errorLogger = () => {}
) {
  const endpoint = "auth/market/forgot-password";
  return sendForgetPasswordApi(email, endpoint, errorLogger);
}

export async function resetPasswordApi(
  payload,
  endpoint,
  errorLogger = () => {}
) {
  const url = new URL(endpoint, SERVER_URL);
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const responseData = await response.json();
  if (!response.ok) {
    errorLogger(responseData.message);
    return;
  }
  return responseData.message;
}

export async function resetPasswordCustomerApi(
  payload,
  errorLogger = () => {}
) {
  const endpoint = "auth/customer/reset-password";
  return resetPasswordApi(payload, endpoint, errorLogger);
}

export async function resetPasswordMerchantApi(
  payload,
  errorLogger = () => {}
) {
  const endpoint = "auth/market/reset-password";
  return resetPasswordApi(payload, endpoint, errorLogger);
}
