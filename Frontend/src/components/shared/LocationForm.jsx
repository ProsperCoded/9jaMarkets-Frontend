import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader, Upload, ImagePlus, X } from "lucide-react";
import {
  MESSAGE_API_CONTEXT,
  MARKETS_DATA_CONTEXT,
  MALLS_DATA_CONTEXT,
} from "@/contexts";
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
import { useForm } from "react-hook-form";

const LocationForm = ({ type, submitAction, returnPath }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  const { marketsData, setMarketsData } = useContext(MARKETS_DATA_CONTEXT);
  const { mallsData, setMallsData } = useContext(MALLS_DATA_CONTEXT);
  const fileInputRef = React.useRef(null);

  const isMall = type === "mall";
  const locationTypeName = isMall ? "Mall" : "Market";

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const file = files[0]; // Only take the first file
    if (!file) return;

    // Validate file type and size
    const isImage = file.type.startsWith("image/");
    const isLt5M = file.size / 1024 / 1024 < 5;

    if (!isImage) {
      messageApi.error("You can only upload image files!");
      return;
    }
    if (!isLt5M) {
      messageApi.error("Image must be smaller than 5MB!");
      return;
    }

    setFileList([file]);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const removeImage = () => {
    setFileList([]);
    setImagePreview(null);
  };

  const onFinish = async (values) => {
    if (fileList.length > 0) {
      values.displayImage = fileList[0];
    }

    if (isMall) {
      values.isMall = true;
    }

    setLoading(true);
    try {
      const createdLocation = await submitAction(values, messageApi.error);
      if (createdLocation) {
        if (isMall) {
          setMallsData([...mallsData, createdLocation]);
        } else {
          setMarketsData([...marketsData, createdLocation]);
        }
        messageApi.success(`${locationTypeName} created successfully`);
        navigate(returnPath);
      }
    } catch (error) {
      messageApi.error(`Failed to create ${locationTypeName.toLowerCase()}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto p-4 max-w-4xl">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate(returnPath)}
          className="mr-4"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to {isMall ? "Malls" : "Markets"}
        </Button>
        <h1 className="font-bold text-2xl">Create New {locationTypeName}</h1>
      </div>

      <div className="relative bg-white shadow-sm p-6 rounded-xl">
        {loading && (
          <div className="z-50 absolute inset-0 flex justify-center items-center bg-white bg-opacity-70">
            <Loader className="w-8 h-8 text-primary animate-spin" />
          </div>
        )}

        <form onSubmit={handleSubmit(onFinish)} className="space-y-6">
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
            <div>
              <div className="mb-4">
                <Label htmlFor="name">{locationTypeName} Name</Label>
                <Input
                  id="name"
                  {...register("name", {
                    required: `${locationTypeName} name is required`,
                  })}
                  placeholder={`e.g., ${
                    isMall ? "Ikeja City Mall" : "Balogun Market"
                  }`}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  {...register("address", { required: "Address is required" })}
                  placeholder={`e.g., 123 ${
                    isMall ? "Shopping Avenue" : "Market Street"
                  }`}
                  className={errors.address ? "border-red-500" : ""}
                />
                {errors.address && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="gap-4 grid grid-cols-2 mb-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    {...register("city", { required: "City is required" })}
                    placeholder="e.g., Lagos"
                  />
                  {errors.city && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="state">State</Label>
                  <Select
                    onValueChange={(value) => setValue("state", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATES.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.state && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.state.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 50,
                      message: "Description must be at least 50 characters",
                    },
                  })}
                  placeholder={`Describe the ${locationTypeName.toLowerCase()} and what makes it unique...`}
                  className={`min-h-[120px] ${
                    errors.description ? "border-red-500" : ""
                  }`}
                />
                {errors.description && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="space-y-4">
                <div>
                  <Label>Display Image</Label>
                  <p className="text-gray-500 text-sm">
                    Add a representative image for your {locationTypeName.toLowerCase()}
                  </p>
                </div>

                <div
                  className={`border-2 border-dashed rounded-lg p-6 ${
                    !imagePreview ? "border-gray-300" : "border-primary/20"
                  }`}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/png,image/jpeg,image/jpg"
                    className="hidden"
                  />

                  {!imagePreview ? (
                    <div className="text-center">
                      <ImagePlus className="mx-auto w-12 h-12 text-gray-400" />
                      <div className="flex justify-center items-center mt-4 text-gray-600 text-sm leading-6">
                        <label className="relative bg-white rounded-md focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 font-semibold text-primary hover:text-primary/90 cursor-pointer focus-within:outline-none">
                          <span onClick={handleUploadClick}>Upload image</span>
                          <p className="pl-1">or drag and drop</p>
                        </label>
                      </div>
                      <p className="text-gray-600 text-xs leading-5">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-[300px] mx-auto rounded-lg object-cover"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 mt-6 p-4 rounded-lg">
                <h3 className="mb-2 font-medium text-lg">
                  {locationTypeName} Guidelines
                </h3>
                <ul className="space-y-2 pl-5 text-gray-600 text-sm list-disc">
                  {isMall ? (
                    <>
                      <li>
                        Provide accurate information about the shopping mall
                      </li>
                      <li>
                        Upload clear, high-quality images of the mall exterior
                        or interior
                      </li>
                      <li>
                        Ensure the address is correct and easily accessible for
                        visitors
                      </li>
                      <li>
                        Include any special features or attractions of the mall
                        in the description
                      </li>
                    </>
                  ) : (
                    <>
                      <li>Provide accurate information about the market</li>
                      <li>Upload clear, high-quality images</li>
                      <li>Ensure the address is correct and verifiable</li>
                      <li>
                        Add relevant details that will help users identify the
                        market
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(returnPath)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                `Create ${locationTypeName}`
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LocationForm;
