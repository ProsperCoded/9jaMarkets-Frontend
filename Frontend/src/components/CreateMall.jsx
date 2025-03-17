import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader, Upload as UploadIcon } from "lucide-react";
import { MESSAGE_API_CONTEXT, MALLS_DATA_CONTEXT } from "@/contexts";
import { createMallApi } from "@/lib/api/mallApi";
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

const CreateMall = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  const { mallsData, setMallsData } = useContext(MALLS_DATA_CONTEXT);

  // List of Nigerian states

  const onFinish = async (values) => {
    // If there's a file, add it to the values
    if (fileList.length > 0) {
      values.displayImage = fileList[0].originFileObj;
    }

    setLoading(true);
    try {
      const createdMall = await createMallApi(values, messageApi.error);
      if (createdMall) {
        // Add the new mall to the context
        setMallsData([...mallsData, createdMall]);
        messageApi.success("Mall created successfully");
        navigate("/admin/malls");
      }
    } catch (error) {
      messageApi.error("Failed to create mall");
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
          icon={<ArrowLeft />}
          onClick={() => navigate("/admin/malls")}
          className="mr-4"
        >
          Back to Malls
        </Button>
        <h1 className="font-bold text-2xl">Create New Mall</h1>
      </div>

      <div className="relative bg-white shadow-sm p-6 rounded-xl">
        {loading && (
          <div className="z-50 absolute inset-0 flex justify-center items-center bg-white bg-opacity-70">
            <Loader size="large" />
          </div>
        )}

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
            <div>
              <Form.Item
                name="name"
                label="Mall Name"
                rules={[{ required: true, message: "Please enter mall name" }]}
              >
                <Input placeholder="e.g., Ikeja City Mall" />
              </Form.Item>

              <Form.Item
                name="address"
                label="Address"
                rules={[
                  { required: true, message: "Please enter mall address" },
                ]}
              >
                <Input placeholder="e.g., 123 Shopping Avenue" />
              </Form.Item>

              <div className="gap-4 grid grid-cols-2">
                <Form.Item name="city" label="City">
                  <Input placeholder="e.g., Lagos" />
                </Form.Item>

                <Form.Item name="state" label="State">
                  <Select placeholder="Select state" allowClear>
                    {STATES.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              <Form.Item name="description" label="Description">
                <Textarea
                  rows={4}
                  placeholder="Provide a brief description of the mall"
                />
              </Form.Item>
            </div>

            <div>
              <Form.Item
                label="Display Image"
                name="displayImage"
                tooltip="Upload an image that represents this mall. Recommended size: 800x600px"
              >
                <Upload {...uploadProps} listType="picture-card">
                  {fileList.length < 1 && (
                    <div>
                      <UploadIcon />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>

              {imagePreview && (
                <div className="mt-4">
                  <p className="mb-2 text-gray-500 text-sm">Image Preview:</p>
                  <img
                    src={imagePreview}
                    alt="Mall preview"
                    className="border border-gray-200 rounded-lg max-w-full h-auto"
                    style={{ maxHeight: "200px" }}
                  />
                </div>
              )}

              <div className="bg-gray-50 mt-6 p-4 rounded-lg">
                <h3 className="mb-2 font-medium text-lg">Mall Guidelines</h3>
                <ul className="space-y-2 pl-5 text-gray-600 text-sm list-disc">
                  <li>Provide accurate information about the shopping mall</li>
                  <li>
                    Upload clear, high-quality images of the mall exterior or
                    interior
                  </li>
                  <li>
                    Ensure the address is correct and easily accessible for
                    visitors
                  </li>
                  <li>
                    Include any special features or attractions of the mall in
                    the description
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <Button onClick={() => navigate("/admin/malls")} className="mr-4">
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-orange hover:bg-orange-600"
              loading={loading}
            >
              Create Mall
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateMall;
