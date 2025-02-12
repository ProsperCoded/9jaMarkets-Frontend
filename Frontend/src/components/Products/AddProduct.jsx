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
import { Upload, X, ImagePlus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { formatPrice, removeCommas } from "@/lib/util";
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
      messageApi.warning("Some files were not uploaded because they exceed the 5MB size limit.");
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

    setIsSubmitting(true);
    try {
      const payload = {
        productName,
        category,
        price: removeCommas(price),
        stock,
        productDetails,
        productDescription,
        images: selectedImages.map((img) => img.file),
      };

      const response = await uploadProductApi(
        payload,
        (error) => {
          messageApi.error("Failed to upload product");
          console.error(error);
        },
        (msg) => {
          messageApi.success(msg);
          resetStates();
        }
      );

      if (!response) return;
    } catch (error) {
      messageApi.error("An error occurred while uploading the product");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Image Upload Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Product Images</h3>
          <p className="text-sm text-gray-500">Add up to 5 images for your product</p>
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-6 ${
            selectedImages.length === 0 ? 'border-gray-300' : 'border-Primary/20'
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
              <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4 flex text-sm items-center justify-center leading-6 text-gray-600">
                <label className="relative cursor-pointer rounded-md bg-white font-semibold text-Primary focus-within:outline-none focus-within:ring-2 focus-within:ring-Primary focus-within:ring-offset-2 hover:text-Primary/90">
                  <span onClick={handleUploadClick}>Upload images</span>
                  <p className="pl-1">or drag and drop</p>
                </label>
              </div>
              <p className="text-xs leading-5 text-gray-600">PNG, JPG up to 5MB</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image.url}
                    alt={`Preview ${index + 1}`}
                    className="h-24 w-full object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 p-1 bg-red-100 rounded-full text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <p className="mt-1 text-xs text-gray-500">{image.size}</p>
                </div>
              ))}
              {selectedImages.length < 5 && (
                <button
                  onClick={handleUploadClick}
                  className="h-24 rounded-lg border-2 border-dashed border-gray-300 p-4 text-center hover:border-Primary/50 transition-colors"
                >
                  <Upload className="h-8 w-8 mx-auto text-gray-400" />
                  <span className="mt-2 block text-sm text-gray-600">Add more</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Product Details Form */}
      <div className="grid gap-6 sm:grid-cols-2">
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
              {PRODUCT_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
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
              setPrice(value);
            }}
            placeholder="Enter price"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock">Stock Available</Label>
          <Input
            id="stock"
            type="number"
            min="1"
            value={stock}
            onChange={(e) => setStock(parseInt(e.target.value) || 1)}
          />
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
          className="w-full bg-Primary hover:bg-Primary/80 sm:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding Product..." : "Add Product"}
        </Button>
      </div>
    </div>
  );
}
