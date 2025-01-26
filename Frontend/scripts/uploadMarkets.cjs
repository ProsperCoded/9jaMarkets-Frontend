// const fetch = require("node-fetch"); // For using the fetch API in Node.js
// const FormData = require("form-data");
const fs = require("fs"); // For reading image files
const MARKETS = require("./Markets.cjs");
const apiUrl = "https://safe-lindsy-obiken-415ef84b.koyeb.app/api/v1/market";

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
    ...market,
    city: defaultCity,
    address: defaultAddress,
    description: defaultDescription,
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

    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        // Note: fetch will not automatically set the correct Content-Type for FormData, since it's not through the browser
      },
    });

    // * Using JSON when market image is not available or supported
    // const body = {
    //   name: market.name,
    //   description: market.description,
    //   address: market.address,
    //   city: market.city,
    //   state: market.state,
    //   isMall: "false",
    // };
    // const response = await fetch(apiUrl, {
    //   method: "POST",
    //   body: JSON.stringify(body),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    const responseData = await response.json();
    if (!response.ok) {
      console.error(responseData);
      throw new Error(`Failed to upload malls: ${response.statusText}`);
    }
    console.log(`Market ${market.name} uploaded successfully:`, responseData);
  } catch (error) {
    console.error(error);
    console.error(`Error uploading market ${market.name}:`, error.message);
  }
};

const uploadAllMarkets = async () => {
  console.log(allMarkets);
  for (const market of allMarkets) {
    await uploadMarket(market);
  }
};

uploadAllMarkets();
