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

export default function AddProduct() {
  const [selectedImages, setSelectedImages] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const fileInputRef = React.useRef(null);

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

  const handleAddProduct = () => {
    setShowModal(true);
  };

  return (
    <div className="flex-grow bg-white rounded-2xl py-10 shadow-md ml-6 mt-8 mb-8 mr-6 p-6 pb-20">
      <div className="gap-6 grid">
        {/* Image Upload Section */}
        <div
          className="border-2 p-8 border-dashed rounded-lg text-center"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="flex justify-center items-center bg-green-50 rounded-full w-12 h-12">
              <Upload className="w-6 h-6 text-Primary-600" />
            </div>
            <p>Drag and drop an image(s) here</p>
            <p className="text-muted-foreground text-sm">or</p>
            <Button
              variant="outline"
              className="bg-Primary hover:bg-P2 text-white"
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

        {/* Selected Images */}
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
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="product-name">Product Name</Label>
              <Input id="product-name" placeholder="Laptop" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="laptops">Laptops</SelectItem>
                  <SelectItem value="phones">Phones</SelectItem>
                  <SelectItem value="tablets">Tablets</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" placeholder="₦100,000.00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">In Stock?</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Yes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Product Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your product briefly here"
              className="min-h-[150px]"
            />
          </div>
          <div className="flex justify-center gap-5 mt-10">
            <Button className="border-Primary bg-transparent hover:bg-P2 px-6 border rounded-full text-Primary hover:text-white">
              Cancel
            </Button>
            <Button
              className="bg-Primary hover:bg-P2 px-6 rounded-full text-white"
              onClick={handleAddProduct}
            >
              Add Product
            </Button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl shadow-lg w-[90vw] max-w-[1000px] p-8 relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-Primary transition-colors"
              onClick={() => setShowModal(false)}
            >
              <X className="h-6 w-6" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900">Promote your advert</h2>
              <p className="text-base text-gray-600 mt-2">
                Choose a promotion type for your ad to post it
              </p>
            </div>

            {/* Plan Options */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Free Plan */}
              <div className="group rounded-xl border border-gray-200 p-6 hover:bg-Primary hover:border-Primary transition-all duration-300">
                <h3 className="text-xl font-semibold text-Primary group-hover:text-white">Free Plan</h3>
                <div className="mt-4 space-y-3">
                  <p className="text-base group-hover:text-white">3 days</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600 group-hover:text-white">
                      <span className="text-Primary group-hover:text-white">✓</span>
                      Quick visibility for short-term ads
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600 group-hover:text-white">
                      <span className="text-Primary group-hover:text-white">✓</span>
                      Ideal for small, local promotions
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600 group-hover:text-white">
                      <span className="text-Primary group-hover:text-white">✓</span>
                      Limited exposure to test the platform
                    </li>
                  </ul>
                </div>
                <button className="mt-6 w-full rounded-full bg-Primary text-white px-6 py-2 text-sm font-medium group-hover:bg-white group-hover:text-Primary transition-colors">
                  Current Plan
                </button>
              </div>

              {/* Standard Plan */}
              <div className="group rounded-xl border border-gray-200 p-6 hover:bg-Primary hover:border-Primary transition-all duration-300">
                <h3 className="text-xl font-semibold text-Primary group-hover:text-white">Standard Plan</h3>
                <div className="mt-4 space-y-3">
                  <p className="text-base group-hover:text-white">₦1,500</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600 group-hover:text-white">
                      <span className="text-Primary group-hover:text-white">✓</span>
                      7 days
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600 group-hover:text-white">
                      <span className="text-Primary group-hover:text-white">✓</span>
                      Perfect for weekly campaigns
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600 group-hover:text-white">
                      <span className="text-Primary group-hover:text-white">✓</span>
                      Moderate reach for your ad
                    </li>
                  </ul>
                </div>
                <button className="mt-6 w-full rounded-full bg-Primary text-white px-6 py-2 text-sm font-medium group-hover:bg-white group-hover:text-Primary transition-colors">
                  Select Plan
                </button>
              </div>

              {/* Premium Plan */}
              <div className="group rounded-xl border border-gray-200 bg-Primary p-6">
                <h3 className="text-xl font-semibold text-white">Premium Plan</h3>
                <div className="mt-4 space-y-3">
                  <p className="text-base text-white">₦3,500</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span>✓</span>
                      30 days
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span>✓</span>
                      Maximize visibility for a month
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span>✓</span>
                      Reach a wider audience consistently
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span>✓</span>
                      Boost engagement and conversions
                    </li>
                  </ul>
                </div>
                <button className="mt-6 w-full rounded-full bg-white text-Primary px-6 py-2 text-sm font-medium">
                  Select Plan
                </button>
              </div>

              {/* Boost Plan */}
              <div className="group rounded-xl border border-gray-200 p-6 hover:bg-Primary hover:border-Primary transition-all duration-300">
                <h3 className="text-xl font-semibold text-Primary group-hover:text-white">Boost Plan</h3>
                <div className="mt-4 space-y-3">
                  <p className="text-base group-hover:text-white">₦10,000</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600 group-hover:text-white">
                      <span className="text-Primary group-hover:text-white">✓</span>
                      30 days
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600 group-hover:text-white">
                      <span className="text-Primary group-hover:text-white">✓</span>
                      Highlighted placement for top visibility
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600 group-hover:text-white">
                      <span className="text-Primary group-hover:text-white">✓</span>
                      Fast-track reach with premium exposure
                    </li>
                  </ul>
                </div>
                <button className="mt-6 w-full rounded-full bg-Primary text-white px-6 py-2 text-sm font-medium group-hover:bg-white group-hover:text-Primary transition-colors">
                  Select Plan
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="text-center text-sm text-gray-500 mt-8">
              By clicking on Select Plan, you accept the{' '}
              <a href="#" className="text-Primary hover:underline">
                Terms of Use
              </a>
              , and confirm that you will abide by the Safety Tips, and declare that this posting does not include any Prohibited items.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
