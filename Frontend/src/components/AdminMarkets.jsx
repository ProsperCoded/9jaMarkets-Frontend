import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MARKETS_DATA_CONTEXT, MESSAGE_API_CONTEXT } from "../contexts";
import { deleteMarketApi, deleteAllMarketsApi } from "@/lib/api/marketApi";
import LocationsTable from "./shared/LocationsTable";

const AdminMarkets = () => {
  const { marketsData, setMarketsData } = useContext(MARKETS_DATA_CONTEXT);
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  const navigate = useNavigate();

  const handleDelete = async (market) => {
    // ... existing delete logic ...
  };

  const handleDeleteAll = async () => {
    // ... existing delete all logic ...
  };

  return (
    <LocationsTable
      title="Markets Management"
      data={marketsData}
      onDelete={handleDelete}
      onDeleteAll={handleDeleteAll}
      onCreate={() => navigate("/admin/create-market")}
      type="market"
    />
  );
};

export default AdminMarkets;
