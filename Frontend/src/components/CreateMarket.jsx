import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader, Upload as UploadIcon } from "lucide-react";
import { MESSAGE_API_CONTEXT, MARKETS_DATA_CONTEXT } from "@/contexts";
import { createMarketApi } from "@/lib/api/marketApi";
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

const CreateMarket = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  const { marketsData, setMarketsData } = useContext(MARKETS_DATA_CONTEXT);

  const onFinish = async (values) => {
    // If there's a file, add it to the values
    if (fileList.length > 0) {
      values.displayImage = fileList[0].originFileObj;
    }

    setLoading(true);
    try {
      const createdMarket = await createMarketApi(values, messageApi.error);
      if (createdMarket) {
        // Add the new market to the context
        setMarketsData([...marketsData, createdMarket]);
        messageApi.success("Market created successfully");
        navigate("/admin/markets");
      }
    } catch (error) {
      messageApi.error("Failed to create market");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = ({ fileList: newFileList }) => {
    // Limit to only 1 file
    const limitedFileList = newFileList.slice(-1);
    setFileList(limitedFileList);

    // Generate preview for the image
    if (limitedFileList.length > 0) {
      const file = limitedFileList[0].originFileObj;
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        messageApi.error("You can only upload image files!");
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        messageApi.error("Image must be smaller than 5MB!");
      }
      return isImage && isLt5M ? false : Upload.LIST_IGNORE;
    },
    fileList,
    onChange: handleImageChange,
    maxCount: 1,
  };

  return (
    <div className="mx-auto p-4 max-w-4xl">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/markets")}
          className="mr-4"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Markets
        </Button>
        <h1 className="font-bold text-2xl">Create New Market</h1>
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
              <Label htmlFor="name">Market Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g., Balogun Market"
                required
              />

              <Label htmlFor="address" className="mt-4">
                Address
              </Label>
              <Input
                id="address"
                name="address"
                placeholder="e.g., 123 Market Street"
                required
              />

              <div className="gap-4 grid grid-cols-2 mt-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" placeholder="e.g., Lagos" />
                </div>

                <div>
                  <Label htmlFor="state">State</Label>
                  <Select
                    id="state"
                    name="state"
                    placeholder="Select state"
                    allowClear
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

              <Label htmlFor="description" className="mt-4">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                rows={4}
                placeholder="Provide a brief description of the market"
              />
            </div>

            <div>
              <Label htmlFor="displayImage" className="mt-4">
                Display Image
              </Label>
              <Upload {...uploadProps} listType="picture-card">
                {fileList.length < 1 && (
                  <div>
                    <UploadIcon />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>

              {imagePreview && (
                <div className="mt-4">
                  <p className="mb-2 text-gray-500 text-sm">Image Preview:</p>
                  <img
                    src={imagePreview}
                    alt="Market preview"
                    className="border border-gray-200 rounded-lg max-w-full h-auto"
                    style={{ maxHeight: "200px" }}
                  />
                </div>
              )}

              <div className="bg-gray-50 mt-6 p-4 rounded-lg">
                <h3 className="mb-2 font-medium text-lg">Market Guidelines</h3>
                <ul className="space-y-2 pl-5 text-gray-600 text-sm list-disc">
                  <li>Provide accurate information about the market</li>
                  <li>Upload clear, high-quality images</li>
                  <li>Ensure the address is correct and verifiable</li>
                  <li>
                    Add relevant details that will help users identify the
                    market
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <Button onClick={() => navigate("/admin/markets")} className="mr-4">
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-orange hover:bg-orange-600"
              loading={loading}
            >
              Create Market
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMarket;
