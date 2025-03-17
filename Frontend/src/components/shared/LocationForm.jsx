import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader, Upload } from "lucide-react";
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

  const isMall = type === "mall";
  const locationTypeName = isMall ? "Mall" : "Market";

  const onFinish = async (values) => {
    // If there's a file, add it to the values
    if (fileList.length > 0) {
      values.displayImage = fileList[0];
    }

    // For mall creation, set isMall to true
    if (isMall) {
      values.isMall = true;
    }

    setLoading(true);
    try {
      const createdLocation = await submitAction(values, messageApi.error);
      if (createdLocation) {
        // Add the new location to the appropriate context
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setFileList([]);
      setImagePreview(null);
      return;
    }

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

    // Generate preview for the image
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
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
                    {...register("city")}
                    placeholder="e.g., Lagos"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="state">State</Label>
                  <Select
                    onValueChange={(value) => {
                      setValue("state", value);
                    }}
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
                </div>
              </div>

              <div className="mb-4">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  rows={4}
                  placeholder={`Provide a brief description of the ${
                    isMall ? "mall" : "market"
                  }`}
                  required
                />
              </div>
            </div>

            <div>
              <div className="mb-4">
                <Label htmlFor="displayImage">Display Image</Label>
                <div className="flex justify-center mt-2 px-6 py-10 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="text-center">
                    <Upload className="mx-auto w-12 h-12 text-gray-400" />
                    <div className="flex mt-4 text-gray-600 text-sm leading-6">
                      <label
                        htmlFor="file-upload"
                        className="relative bg-white rounded-md font-semibold text-primary cursor-pointer"
                      >
                        <span>Upload an image</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleImageChange}
                          accept="image/*"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-gray-600 text-xs leading-5">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                </div>
              </div>

              {imagePreview && (
                <div className="mt-4">
                  <p className="mb-2 text-gray-500 text-sm">Image Preview:</p>
                  <img
                    src={imagePreview}
                    alt={`${locationTypeName} preview`}
                    className="border border-gray-200 rounded-lg max-w-full h-auto"
                    style={{ maxHeight: "200px" }}
                  />
                </div>
              )}

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

          <div className="flex justify-end mt-8">
            <Button
              variant="outline"
              onClick={() => navigate(returnPath)}
              className="mr-4"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90"
              disabled={loading}
            >
              Create {locationTypeName}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LocationForm;
