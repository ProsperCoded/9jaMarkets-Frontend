// const fetch = require("node-fetch"); // For using the fetch API in Node.js
// const FormData = require("form-data");
const fs = require("fs"); // For reading image files
const axios = require("axios");
const FormData = require("form-data");
const MARKETS = require("./Markets.cjs");
const path = require("path");

const apiUrl =
  // "https://9ja-market-backend-production.up.railway.app/api/v1/market";
  "http://localhost:3100/api/v1/market";
const defaultCity = "Ibadan";
const defaultAddress = "located in Nigeria";
const defaultDescription = "Best Market in town";

// Initialize log file
const logDir = path.resolve(__dirname, "./logs");
const logFile = path.join(logDir, "markets.log");

// Ensure the logs directory exists and create/clear the log file
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}
fs.writeFileSync(logFile, ""); // Clear/create the log file

// ? Inject all market with its states
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
    address: defaultAddress,
    description: defaultDescription,
    // ! temporary fix for missing city in market data
    city: market.city || market.state,
    ...market,
  };
});
function fileLog(message) {
  fs.appendFileSync(logFile, message + "\n");
}
const uploadMarket = async (market) => {
  try {
    // * Using formData when market image is available and supported
    const formData = new FormData();
    const fullPath = path.resolve(__dirname, market.img);
    if (!market.img || !fs.existsSync(fullPath)) {
      const logMessage = `Image not found for market ${market.name} , ${market.img}`;
      console.log(logMessage);
      fileLog(logMessage);
      return;
    }
    formData.append("name", market.name);
    formData.append("description", market.description);
    formData.append("address", market.address);
    formData.append("city", market.city);
    formData.append("state", market.state);
    formData.append("displayImage", fs.createReadStream(fullPath)); // Attach image using fullPath
    const response = await axios.post(apiUrl, formData, {
      headers: formData.getHeaders(),
    });
    const responseData = response.data;
    console.log(`Market ${market.name} uploaded successfully:`, responseData);
  } catch (error) {
    console.error(`Error uploading market ${market.name}:`, error.message);
  }
};

const uploadAllMarkets = async () => {
  for (const market of allMarkets) {
    await uploadMarket(market);
  }
  console.log("All markets uploaded successfully");
};

uploadAllMarkets();
