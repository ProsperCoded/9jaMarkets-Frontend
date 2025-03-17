import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MALLS_DATA_CONTEXT, MESSAGE_API_CONTEXT } from "../contexts";
import { deleteMallApi } from "@/lib/api/mallApi";
import LocationsTable from "./shared/LocationsTable";

const AdminMalls = () => {
  const { mallsData, setMallsData } = useContext(MALLS_DATA_CONTEXT);
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  const navigate = useNavigate();

  const handleDelete = async (mall) => {
    // ... existing delete logic ...
  };

  return (
    <LocationsTable
      title="Malls Management"
      data={mallsData}
      onDelete={handleDelete}
      onCreate={() => navigate("/admin/create-mall")}
      type="mall"
    />
  );
};

export default AdminMalls;
