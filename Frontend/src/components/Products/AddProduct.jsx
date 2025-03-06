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
import { Upload, X, ImagePlus, Plus, Minus, Loader } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  formatPrice,
  removeCommas,
  replaceSpacesWithUnderscore,
} from "@/lib/util";
import { useContext } from "react";
import { MESSAGE_API_CONTEXT } from "@/contexts";
import { uploadProductApi } from "@/lib/api/productApi";
import { PRODUCT_CATEGORIES } from "@/config";

export default function AddProduct() {
  const [selectedImages, setSelectedImages] = React.useState([]);
  const fileInputRef = React.useRef(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

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
      messageApi.warning(
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
    setStock(1);
    setProductDetails("");
    setProductDescription("");
    setSelectedImages([]);
  };

  const adjustStock = (increment) => {
    setStock(prev => {
      const newValue = increment ? prev + 1 : prev - 1;
      return Math.max(1, newValue); // Ensures stock doesn't go below 1
    });
  };

  const handleSubmit = async () => {
    console.log("Submitting product with:", {
      productName,
      category,
      price,
      stock,
      productDetails,
      productDescription,
      imageCount: selectedImages.length
    });

    if (
      !productName ||
      !category ||
      !price ||
      !stock ||
      !productDetails ||
      !productDescription ||
      selectedImages.length === 0
    ) {
      const missing = [];
      if (!productName) missing.push("Product Name");
      if (!category) missing.push("Category");
      if (!price) missing.push("Price");
      if (!stock) missing.push("Stock");
      if (!productDetails) missing.push("Product Details");
      if (!productDescription) missing.push("Product Description");
      if (selectedImages.length === 0) missing.push("Product Images");

      messageApi.error(`Please fill in all required fields: ${missing.join(", ")}`);
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        productName,
        category: replaceSpacesWithUnderscore(category),
        price: removeCommas(price),
        stock,
        productDetails,
        productDescription,
        selectedImages,
      };

      console.log("Sending payload:", payload);

      const response = await uploadProductApi(
        payload,
        (error) => {
          console.error("Upload error:", error);
          messageApi.error("Failed to upload product: " + error);
        },
        (success) => {
          console.log("Upload success:", success);
        }
      );

      if (!response) {
        messageApi.error("Failed to get response from server");
        return;
      }

      messageApi.success("Successfully uploaded product");
      resetStates();
    } catch (error) {
      console.error("Submit error:", error);
      messageApi.error("An error occurred while uploading the product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Image Upload Section */}
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-lg">Product Images</h3>
          <p className="text-gray-500 text-sm">
            Add up to 5 images for your product
          </p>
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-6 ${
            selectedImages.length === 0
              ? "border-gray-300"
              : "border-Primary/20"
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
            multiple
          />

          {selectedImages.length === 0 ? (
            <div className="text-center">
              <ImagePlus className="mx-auto w-12 h-12 text-gray-400" />
              <div className="flex justify-center items-center mt-4 text-gray-600 text-sm leading-6">
                <label className="relative bg-white rounded-md focus-within:ring-2 focus-within:ring-Primary focus-within:ring-offset-2 font-semibold text-Primary hover:text-Primary/90 cursor-pointer focus-within:outline-none">
                  <span onClick={handleUploadClick}>Upload images</span>
                  <p className="pl-1">or drag and drop</p>
                </label>
              </div>
              <p className="text-gray-600 text-xs leading-5">
                PNG, JPG up to 5MB
              </p>
            </div>
          ) : (
            <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image.url}
                    alt={`Preview ${index + 1}`}
                    className="rounded-lg w-full h-24 object-cover"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="-top-2 -right-2 absolute bg-red-100 opacity-0 group-hover:opacity-100 p-1 rounded-full text-red-600 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <p className="mt-1 text-gray-500 text-xs">{image.size}</p>
                </div>
              ))}
              {selectedImages.length < 5 && (
                <button
                  onClick={handleUploadClick}
                  className="border-2 border-gray-300 hover:border-Primary/50 p-4 border-dashed rounded-lg h-24 text-center transition-colors"
                >
                  <Upload className="mx-auto w-8 h-8 text-gray-400" />
                  <span className="block mt-2 text-gray-600 text-sm">
                    Add more
                  </span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Product Details Form */}
      <div className="gap-6 grid sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="productName">Product Name</Label>
          <Input
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_CATEGORIES.filter((cat) => cat !== "All Categories").map(
                (category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price (₦)</Label>
          <Input
            id="price"
            value={price}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9,]/g, "");
              setPrice(formatPrice(value));
            }}
            placeholder="Enter price"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock">Stock Available</Label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => adjustStock(false)}
              className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg text-gray-600 transition-colors"
              aria-label="Decrease stock"
            >
              <Minus className="w-4 h-4" />
            </button>
            
            <Input
              id="stock"
              type="number"
              min="1"
              value={stock}
              onChange={(e) => setStock(Math.max(1, parseInt(e.target.value) || 1))}
              className="text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            
            <button
              type="button"
              onClick={() => adjustStock(true)}
              className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg text-gray-600 transition-colors"
              aria-label="Increase stock"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="details">Product Details</Label>
          <Textarea
            id="details"
            value={productDetails}
            onChange={(e) => setProductDetails(e.target.value)}
            placeholder="Enter key product details"
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="description">Product Description</Label>
          <Textarea
            id="description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Enter detailed product description"
            className="min-h-[150px]"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          className="bg-Primary hover:bg-Primary/80 w-full sm:w-auto text-white disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting || !productName || !category || !price || !stock || !productDetails || !productDescription || selectedImages.length === 0}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <Loader className="w-4 h-4 animate-spin" />
              Adding Product...
            </div>
          ) : (
            "Add Product"
          )}
        </Button>
      </div>
    </div>
  );
}
