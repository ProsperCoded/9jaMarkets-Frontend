// const fetch = require("node-fetch"); // For using the fetch API in Node.js
// const FormData = require("form-data");
const fs = require("fs"); // For reading image files
const axios = require("axios");
const FormData = require("form-data");
const MALLS = require("./Malls.cjs");
const apiUrl = "https://safe-lindsy-obiken-415ef84b.koyeb.app/api/v1/market";
// const apiUrl = "https://lnczzhnm-3000.euw.devtunnels.ms/api/v1/market";

const defaultCity = "Ibadan";
const defaultAddress = "moniya market, moniya, Ibadan";
const defaultDescription = "Best Market in town, located in Ibadan";

// ? Inject all market with it's states
const mallsWithStates = Object.values(MALLS).map((stateMalls, ind) => {
  return stateMalls.map((market) => {
    return { ...market, state: Object.keys(MALLS)[ind] };
  });
});

// ? Flatten the array of Malls with states
let allMalls = mallsWithStates.flat();

//  ? Insert Default values for city, address and description
allMalls = allMalls.map((market) => {
  return {
    ...market,
    city: defaultCity,
    address: defaultAddress,
    description: defaultDescription,
  };
});
const uploadMarket = async (mall) => {
  try {
    // * Using formData when market image is available and supported
    // const formData = new FormData();
    // formData.append("name", market.name);
    // formData.append("description", market.description);
    // formData.append("address", market.address);
    // formData.append("city", market.city);
    // formData.append("state", market.state);
    // formData.append("image", fs.createReadStream(market.img)); // Attach image

    // const response = await fetch(apiUrl, {
    //   method: "POST",
    //   body: formData,
    //   headers: {
    //     ...formData.getHeaders(),
    //   },
    // });

    // * Using JSON when market image is not available or supported
    const formData = new FormData();
    formData.append("name", mall.name);
    formData.append("description", mall.description);
    formData.append("address", mall.address);
    formData.append("city", mall.city);
    formData.append("state", mall.state);
    formData.append("displayImage", fs.createReadStream(mall.img)); // Attach image
    const response = await axios.post(apiUrl, formData, {
      headers: formData.getHeaders(),
    });

    // const response = await fetch(apiUrl, {
    //   method: "POST",
    //   body: JSON.stringify(body),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    const responseData = await response.data;
    // if (!response.ok) {
    //   console.error(responseData);
    //   throw new Error(`Failed to upload malls: ${response.statusText}`);
    // }

    console.log(`malls ${mall.name} uploaded successfully:`, responseData);
  } catch (error) {
    console.log(error);
    console.error(`Error uploading malls ${mall.name}:`, error);
  }
};

const uploadAllMalls = async () => {
  console.log(allMalls);
  for (const mall of allMalls) {
    await uploadMarket(mall);
  }
};

uploadAllMalls();
