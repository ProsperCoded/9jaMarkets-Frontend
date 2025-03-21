// const fetch = require("node-fetch"); // For using the fetch API in Node.js
// const FormData = require("form-data");
const fs = require("fs"); // For reading image files
const axios = require("axios");
const FormData = require("form-data");
const MALLS = require("./Malls.cjs");
const path = require("path");
const apiUrl =
  // "https://9ja-market-backend-production.up.railway.app/api/v1/market";
  "http://localhost:3100/api/v1/market";

const defaultCity = "Ibadan";
const defaultAddress = "located in Nigeria";
const defaultDescription = "Best Mall in town";

// Initialize log file
const logDir = path.resolve(__dirname, "./logs");
const logFile = path.join(logDir, "malls.log");

// Ensure the logs directory exists and create/clear the log file
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}
fs.writeFileSync(logFile, ""); // Clear/create the log file

// ? Inject all market with its states
const mallsWithStates = Object.values(MALLS).map((stateMalls, ind) => {
  return stateMalls.map((mall) => {
    return { ...mall, state: Object.keys(MALLS)[ind] };
  });
});

// ? Flatten the array of Malls with states
let allMalls = mallsWithStates.flat();

//  ? Insert Default values for city, address and description
allMalls = allMalls.map((mall) => {
  return {
    address: defaultAddress,
    description: defaultDescription,
    // ! temporary fix for missing city in market data
    city: mall.city || mall.state,
    ...mall,
  };
});

function fileLog(message) {
  fs.appendFileSync(logFile, message + "\n");
}
const uploadMarket = async (mall) => {
  try {
    const formData = new FormData();
    const fullPath = path.resolve(__dirname, mall.img);
    if (!mall.img || !fs.existsSync(fullPath)) {
      const logMessage = `Image not found for mall ${mall.name} , ${mall.img}`;
      console.log(logMessage);
      fileLog(logMessage);
      return;
    }
    // console.log("Uploading mall", mall);
    formData.append("name", mall.name);
    formData.append("description", mall.description);
    formData.append("address", mall.address);
    formData.append("city", mall.city);
    formData.append("state", mall.state);
    formData.append("isMall", "true");
    formData.append("displayImage", fs.createReadStream(fullPath)); // Attach image using fullPath
    const response = await axios.post(apiUrl, formData, {
      headers: formData.getHeaders(),
    });

    const responseData = response.data;
    console.log(`malls ${mall.name} uploaded successfully:`, responseData);
  } catch (error) {
    console.error(`Error uploading malls ${mall.name}:`, error.message);
  }
};

const uploadAllMalls = async () => {
  for (const mall of allMalls) {
    await uploadMarket(mall);
  }
  console.log("All malls uploaded successfully");
};

uploadAllMalls();
