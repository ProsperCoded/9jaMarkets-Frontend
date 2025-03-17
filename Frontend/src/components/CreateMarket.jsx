import React from "react";
import { createMarketApi } from "@/lib/api/marketApi";
import LocationForm from "./shared/LocationForm";

const CreateMarket = () => {
  return (
    <LocationForm
      type="market"
      submitAction={createMarketApi}
      returnPath="/admin/markets"
    />
  );
};

export default CreateMarket;
