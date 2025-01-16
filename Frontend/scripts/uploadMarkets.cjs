// const fetch = require("node-fetch"); // For using the fetch API in Node.js
const FormData = require("form-data");
const fs = require("fs"); // For reading image files
const MARKETS = require("./Markets.cjs");
const apiUrl = "https://safe-lindsy-obiken-415ef84b.koyeb.app/api/v1/market";

const defaultCity = "Ibadan";
const defaultAddress = "moniya market, moniya, Ibadan";
const defaultDescription = "Best Market in town, located in Ibadan";
const markets = MARKETS.reduce((acc, stateMarkets) => {
  const state = Object.keys(stateMarkets)[0];
  const stateData = stateMarkets[state];
  const transformed = stateData.map((market) => {
    return {
      ...market,
      state,
      city: defaultCity,
      address: defaultAddress,
      description: defaultDescription,
    };
  });
  return acc.concat(transformed);
}, []);
const uploadMarket = async (market) => {
  try {
    const formData = new FormData();
    formData.append("name", market.name);
    formData.append("description", market.description);
    formData.append("address", market.address);
    formData.append("city", market.city);
    formData.append("state", market.state);
    formData.append("image", fs.createReadStream(market.img)); // Attach image

    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
      headers: {
        ...formData.getHeaders(),
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to upload market: ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log(`Market ${market.name} uploaded successfully:`, responseData);
  } catch (error) {
    console.error(`Error uploading market ${market.name}:`, error.message);
  }
};

const uploadAllMarkets = async () => {
  for (const market of markets) {
    await uploadMarket(market);
  }
};

uploadAllMarkets();
