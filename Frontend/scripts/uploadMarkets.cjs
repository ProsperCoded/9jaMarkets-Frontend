// const fetch = require("node-fetch"); // For using the fetch API in Node.js
// const FormData = require("form-data");
const fs = require("fs"); // For reading image files
const axios = require("axios");
const FormData = require("form-data");
const MARKETS = require("./Markets.cjs");

// const apiUrl = "https://safe-lindsy-obiken-415ef84b.koyeb.app/api/v1/market";
const apiUrl = "http://localhost:3000/api/v1/market";
const defaultCity = "Ibadan";
const defaultAddress = "moniya market, moniya, Ibadan";
const defaultDescription = "Best Market in town, located in Ibadan";

// ? Inject all market with it's states
const marketWithStates = Object.values(MARKETS).map((stateMarkets, ind) => {
  return stateMarkets.map((market) => {
    return { ...market, state: Object.keys(MARKETS)[ind] };
  });
});

// ? Flatten the array of markets with states
let allMarkets = marketWithStates.flat();

//  ? Insert Default values for city, address and description
allMarkets = allMarkets.map((market) => {
  return {
    city: defaultCity,
    address: defaultAddress,
    description: defaultDescription,
    ...market,
  };
});
const uploadMarket = async (market) => {
  try {
    // * Using formData when market image is available and supported
    const formData = new FormData();
    formData.append("name", market.name);
    formData.append("description", market.description);
    formData.append("address", market.address);
    formData.append("city", market.city);
    formData.append("state", market.state);
    formData.append("displayImage", fs.createReadStream(market.img)); // Attach image
    const response = await axios.post(apiUrl, formData, {
      headers: formData.getHeaders(),
    });
    const responseData = response.data;
    console.log(`Market ${market.name} uploaded successfully:`, responseData);
  } catch (error) {
    console.error(`Error uploading market ${market.name}:`, error);
  }
};

const uploadAllMarkets = async () => {
  for (const market of allMarkets) {
    await uploadMarket(market);
  }
};

uploadAllMarkets();
