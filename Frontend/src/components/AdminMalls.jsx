import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MALLS_DATA_CONTEXT, MESSAGE_API_CONTEXT } from "../contexts";
import { deleteMallApi } from "@/lib/api/mallApi";
import LocationsTable from "./shared/LocationsTable";
import { Loader } from "lucide-react";

const AdminMalls = () => {
  const { mallsData, setMallsData } = useContext(MALLS_DATA_CONTEXT); // Using mallsData instead of filtering marketsData
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (mall) => {
    setIsLoading(true);
    try {
      const result = await deleteMallApi(mall.id, messageApi.error);
      if (result) {
        // Remove the deleted mall from the context
        setMallsData(mallsData.filter((m) => m.id !== mall.id));
        messageApi.success("Mall deleted successfully");
      }
    } catch (error) {
      messageApi.error("Failed to delete mall");
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
      title="Malls Management"
      data={mallsData || []}
      onDelete={handleDelete}
      onCreate={() => navigate("/admin/create-mall")}
      type="mall"
    />
  );
};

export default AdminMalls;
