import React from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { X } from "lucide-react";

import { Label } from "@/components/ui/label";
import { formatPrice, removeCommas } from "@/lib/util";
import { useContext } from "react";
import { MESSAGE_API_CONTEXT } from "@/contexts";
import { uploadProductApi } from "@/lib/api/productApi";
import { PRODUCT_CATEGORIES } from "@/config";

export default function AddProduct() {
  const [selectedImages, setSelectedImages] = React.useState([]);
  const fileInputRef = React.useRef(null);

  const [productName, setProductName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [stock, setStock] = React.useState(1);
  const [productDetails, setProductDetails] = React.useState("");
  const [productDescription, setProductDescription] = React.useState("");
  const messageApi = useContext(MESSAGE_API_CONTEXT);

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validFiles = files.filter((file) => file.size <= 5 * 1024 * 1024); // 5MB in bytes
    if (validFiles.length < files.length) {
      alert(
        "Some files were not uploaded because they exceed the 5MB size limit."
      );
    }
    const newImages = validFiles.map((file) => ({
      file,
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)}kb`,
      url: URL.createObjectURL(file),
    }));
    setSelectedImages([...selectedImages, ...newImages]);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const removeImage = (index) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };
  const resetStates = () => {
    setProductName("");
    setCategory("");
    setPrice("");
    setStock(0);
    setProductDetails("");
    setProductDescription("");
    setSelectedImages([]);
  };
  const handleSubmit = async () => {
    if (
      !productName ||
      !category ||
      !price ||
      !stock ||
      !productDetails ||
      !productDescription ||
      selectedImages.length === 0
    ) {
      messageApi.error("All fields are required.");
      return;
    }
    const errorLogger = (message) => {
      console.error(message);
      messageApi.error(message);
    };
    messageApi.loading("Adding product...");
    try {
      const payload = {
        productName,
        category,
        price: removeCommas(price),
        stock,
        productDetails,
        productDescription,
        selectedImages,
      };
      const response = await uploadProductApi(payload, errorLogger);
      if (!response) return;
      console.log(response);
      messageApi.success("Product Added successfully.");
      resetStates();
    } catch (error) {
      errorLogger("An error occurred while adding the product.");
    } finally {
      messageApi.done();
    }
  };

  return (
    <div className="gap-6 grid">
      {/* Image Upload Section */}
      <div
        className="border-2 p-8 border-dashed rounded-lg text-center"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="flex justify-center items-center bg-green-50 rounded-full w-12 h-12">
            <Upload className="w-6 h-6 text-Primary" />
          </div>
          <p>Drag and drop an image(s) here</p>
          <p className="text-muted-foreground text-sm">or</p>
          <Button
            variant="outline"
            className="bg-orange hover:bg-P2 text-stone-50"
            onClick={handleUploadClick}
          >
            Upload from computer
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple
            accept=".jpg,.png"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {selectedImages.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium">Selected images</h3>
          <div className="space-y-2">
            {selectedImages.map((image, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 border rounded-lg"
              >
                <img
                  src={image.url}
                  alt={image.name}
                  className="rounded w-12 h-12 object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm">{image.name}</p>
                  <p className="text-muted-foreground text-sm">{image.size}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeImage(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 bg-red bg-red-50 p-4 border border-red-200 rounded-lg text-red-800 text-sm">
        <span>Images should be less than 5mb (.png or .jpg formats)</span>
      </div>

      {/* Form Fields */}
      <div className="gap-4 grid">
        <div className="gap-4 grid grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="product-name">Product Name</Label>
            <Input
              id="product-name"
              placeholder="Laptop"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {PRODUCT_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="gap-4 grid grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              placeholder="₦100,000.00"
              value={formatPrice(price)}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stock">Stock Available</Label>
            <Input
              id="price"
              placeholder="₦100,000.00"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="gap-4 grid grid-cols-1">
          <div className="space-y-2">
            <Label htmlFor="product-details">Product Details</Label>
            <Textarea
              id="product-details"
              placeholder="State Accurate Product Details"
              className="min-h-[50px]"
              value={productDetails}
              onChange={(e) => setProductDetails(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Product Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your product briefly here"
            className="min-h-[150px]"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-center gap-5 mt-10">
          <Button className="border-green bg-transparent hover:bg-Primary px-6 border rounded-full text-Primary hover:text-white">
            Cancel
          </Button>
          <Button
            className="bg-Primary hover:bg-P2 px-6 rounded-full text-white"
            onClick={(e) => {
              handleSubmit();
              e.preventDefault();
            }}
          >
            Add Product
          </Button>
        </div>
      </div>
    </div>
  );
}
