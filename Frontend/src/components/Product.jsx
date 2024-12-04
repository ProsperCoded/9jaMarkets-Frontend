"use client";

import * as React from "react";
import { Upload } from "lucide-react";
import { X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function Product() {
  const [selectedImages, setSelectedImages] = React.useState([]);
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

  return (
    <div className="mx-auto p-4 w-full max-w-4xl">
      <Tabs defaultValue="add" className="w-full">
        <TabsList className="grid grid-cols-2 mb-8 w-full">
          <TabsTrigger
            value="add"
            className="data-[state=active]:border-green-600 data-[state=active]:border-b-2"
          >
            Add a Product
          </TabsTrigger>
          <TabsTrigger value="view">View Products</TabsTrigger>
        </TabsList>
        <TabsContent value="add">
          <div className="gap-6 grid">
            {/* Image Upload Section */}
            <div
              className="border-2 p-8 border-dashed rounded-lg text-center"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="flex justify-center items-center bg-green-50 rounded-full w-12 h-12">
                  <Upload className="w-6 h-6 text-green-600" />
                </div>
                <p>Drag and drop an image(s) here</p>
                <p className="text-muted-foreground text-sm">or</p>
                <Button
                  variant="outline"
                  className="bg-green hover:bg-hover-green text-white"
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
                        <p className="text-muted-foreground text-sm">
                          {image.size}
                        </p>
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

              <div className="gap-4 grid grid-cols-2">
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
                <Button className="border-green bg-transparent hover:bg-hover-green px-6 border rounded-full text-green hover:text-white">
                  Cancel
                </Button>
                <Button className="bg-green hover:bg-hover-green px-6 rounded-full text-white">
                  Add Product
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="view">
          <div className="text-center text-muted-foreground">
            View Products content will go here
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
