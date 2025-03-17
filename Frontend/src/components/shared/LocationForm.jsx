import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader, Upload as UploadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { STATES } from "@/config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LocationForm = ({
  type = "market",
  onSubmit,
  loading,
  initialData = null,
}) => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    initialData?.displayImage || null
  );
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (imageFile) {
      formData.append("displayImage", imageFile);
    }
    if (type === "mall") {
      formData.append("isMall", "true");
    }
    await onSubmit(formData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mx-auto p-4 max-w-4xl">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate(`/admin/${type}s`)}
          className="mr-4"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to {type === "market" ? "Markets" : "Malls"}
        </Button>
        <h1 className="font-bold text-2xl">
          {initialData ? "Edit" : "Create New"}{" "}
          {type === "market" ? "Market" : "Mall"}
        </h1>
      </div>

      <div className="relative bg-white shadow-sm p-6 rounded-xl">
        {loading && (
          <div className="z-50 absolute inset-0 flex justify-center items-center bg-white bg-opacity-70">
            <Loader className="w-8 h-8 text-primary animate-spin" />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form fields */}
          {/* ...rest of the form implementation... */}
        </form>
      </div>
    </div>
  );
};

export default LocationForm;
