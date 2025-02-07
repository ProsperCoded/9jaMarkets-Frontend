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
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { X } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

export default function AddProduct() {
  const [selectedImages, setSelectedImages] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [formData, setFormData] = React.useState({
    productName: '',
    category: '',
    price: '',
    inStock: '',
    description: ''
  });
  const fileInputRef = React.useRef(null);
  const navigate = useNavigate();

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validFiles = files.filter((file) => file.size <= 5 * 1024 * 1024); // 5MB in bytes
    if (validFiles.length < files.length) {
      message.error(
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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    // Check if at least one image is uploaded
    if (selectedImages.length === 0) {
      message.error('Please upload at least one product image');
      return false;
    }

    // Check if all required fields are filled
    if (!formData.productName.trim()) {
      message.error('Please enter a product name');
      return false;
    }
    if (!formData.category) {
      message.error('Please select a category');
      return false;
    }
    if (!formData.price.trim()) {
      message.error('Please enter a price');
      return false;
    }
    if (!formData.inStock) {
      message.error('Please select stock status');
      return false;
    }
    if (!formData.description.trim()) {
      message.error('Please enter a product description');
      return false;
    }

    return true;
  };

  const handleAddProduct = () => {
    if (validateForm()) {
      setShowModal(true);
    }
  };

  const handleSelectPlan = (planId) => {
    setShowModal(false);
    navigate(`/billing?plan=${planId}`);
  };

  return (
    <div className="flex-grow bg-white rounded-2xl py-10 shadow-md mx-auto mt-8 mb-8 max-w-4xl p-4 sm:p-6 pb-20">
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
              Upload from device
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
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="product-name">Product Name</Label>
              <Input 
                id="product-name" 
                placeholder="Laptop" 
                value={formData.productName}
                onChange={(e) => handleInputChange('productName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="education">Education & Stationery</SelectItem>
                  <SelectItem value="real-estate">Real Estate & Housing</SelectItem>
                  <SelectItem value="events">Events & Entertainment</SelectItem>
                  <SelectItem value="tech-services">Technology Services</SelectItem>
                  <SelectItem value="cultural-experiences">Cultural Experiences</SelectItem>
                  <SelectItem value="food">Food & Groceries</SelectItem>
                  <SelectItem value="electronics">Electronics & Gadgets</SelectItem>
                  <SelectItem value="fashion">Fashion & Accessories</SelectItem>
                  <SelectItem value="health">Health & Wellness</SelectItem>
                  <SelectItem value="home">Home & Living</SelectItem>
                  <SelectItem value="automobile">Automobile Needs</SelectItem>
                  <SelectItem value="traditional-crafts">Traditional Crafts</SelectItem>
                  <SelectItem value="sports">Sports & Outdoor</SelectItem>
                  <SelectItem value="kids">Kids & Baby Products</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input 
                id="price" 
                placeholder="₦100,000.00" 
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">In Stock?</Label>
              <Select value={formData.inStock} onValueChange={(value) => handleInputChange('inStock', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Stock Status" />
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
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-5 mt-6 sm:mt-10">
            <Button className="w-full sm:w-auto border-Primary bg-transparent hover:bg-P2 px-6 border rounded-full text-Primary hover:text-white">
              Cancel
            </Button>
            <Button
              className="w-full sm:w-auto bg-Primary hover:bg-P2 px-6 rounded-full text-white"
              onClick={handleAddProduct}
            >
              Add Product
            </Button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-[95vw] max-w-[1000px] p-4 sm:p-8 relative max-h-[90vh] overflow-y-auto">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
                <button 
                  onClick={() => handleSelectPlan('standard')}
                  className="mt-6 w-full rounded-full bg-Primary text-white px-6 py-2 text-sm font-medium group-hover:bg-white group-hover:text-Primary transition-colors"
                >
                  Select Plan
                </button>
              </div>

              {/* Premium Plan */}
              <div className="group rounded-xl border border-gray-200 p-6 hover:bg-Primary hover:border-Primary transition-all duration-300">
                <h3 className="text-xl font-semibold text-Primary group-hover:text-white">Premium Plan</h3>
                <div className="mt-4 space-y-3">
                  <p className="text-base group-hover:text-white">₦3,500</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600 group-hover:text-white">
                      <span className="text-Primary group-hover:text-white">✓</span>
                      30 days
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600 group-hover:text-white">
                      <span className="text-Primary group-hover:text-white">✓</span>
                      Maximize visibility for a month
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600 group-hover:text-white">
                      <span className="text-Primary group-hover:text-white">✓</span>
                      Reach a wider audience consistently
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600 group-hover:text-white">
                      <span className="text-Primary group-hover:text-white">✓</span>
                      Boost engagement and conversions
                    </li>
                  </ul>
                </div>
                <button 
                  onClick={() => handleSelectPlan('premium')}
                  className="mt-6 w-full rounded-full bg-Primary text-white px-6 py-2 text-sm font-medium group-hover:bg-white group-hover:text-Primary transition-colors"
                >
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
                <button 
                onClick={() => handleSelectPlan('boost')}
                className="mt-6 w-full rounded-full bg-Primary text-white px-6 py-2 text-sm font-medium group-hover:bg-white group-hover:text-Primary transition-colors">
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
