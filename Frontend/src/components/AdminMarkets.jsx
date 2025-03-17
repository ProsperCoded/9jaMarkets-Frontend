import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MARKETS_DATA_CONTEXT, MESSAGE_API_CONTEXT } from "../contexts";
import { deleteMarketApi, deleteAllMarketsApi } from "@/lib/api/marketApi";
import LocationsTable from "./shared/LocationsTable";
import { Loader } from "lucide-react";

const AdminMarkets = () => {
  const { marketsData, setMarketsData } = useContext(MARKETS_DATA_CONTEXT);
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (market) => {
    setIsLoading(true);
    try {
      const result = await deleteMarketApi(market.id, messageApi.error);
      if (result) {
        // Remove the deleted market from the context
        setMarketsData(marketsData.filter((m) => m.id !== market.id));
        messageApi.success("Market deleted successfully");
      }
    } catch (error) {
      messageApi.error("Failed to delete market");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAll = async () => {
    setIsLoading(true);
    try {
      const result = await deleteAllMarketsApi(messageApi.error);
      if (result) {
        // Remove all markets from the context (will be handled appropriately in the API)
        setMarketsData([]);
        messageApi.success("All markets deleted successfully");
      }
    } catch (error) {
      messageApi.error("Failed to delete all markets");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <LocationsTable
      title="Markets Management"
      data={marketsData || []}
      onDelete={handleDelete}
      onDeleteAll={handleDeleteAll}
      onCreate={() => navigate("/admin/create-market")}
      type="market"
    />
  );
};

export default AdminMarkets;
