import React from "react";
import { createMallApi } from "@/lib/api/mallApi";
import LocationForm from "./shared/LocationForm";

const CreateMall = () => {
  return (
    <LocationForm
      type="mall"
      submitAction={createMallApi}
      returnPath="/admin/malls"
    />
  );
};

export default CreateMall;
