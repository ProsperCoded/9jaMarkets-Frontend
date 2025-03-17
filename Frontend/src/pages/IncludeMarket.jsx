import { useState, useEffect } from "react";
import { MapPin, Calendar, Store, FileImage, Info, ArrowRight, Upload, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STATES } from "@/config";

export default function IncludeMarket() {
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const marketTypes = [
    "General Goods",
    "Food & Groceries",
    "Fashion & Textiles",
    "Electronics",
    "Building Materials",
    "Auto Parts",
    "Farm Produce",
    "Other"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = [];
    const validPreviews = [];
    
    // Check if adding new files would exceed the limit
    if (files.length + images.length > 3) {
      alert('Maximum of 3 images allowed');
      return;
    }
    
    files.forEach(file => {
      // Check if we've reached the limit
      if (validFiles.length + images.length >= 3) {
        alert('Maximum of 3 images allowed');
        return;
      }

      // Check file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        alert('Only .jpg, .jpeg and .png files are allowed');
        return;
      }
      
      // Check file size (5MB = 5 * 1024 * 1024 bytes)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should not exceed 5MB');
        return;
      }
      
      validFiles.push(file);
      validPreviews.push(URL.createObjectURL(file));
    });

    setImages([...images, ...validFiles]);
    setImagePreviews([...imagePreviews, ...validPreviews]);
  };

  useEffect(() => {
    return () => {
      imagePreviews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews]);

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-16 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-Primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-Primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
            <p className="text-gray-600 mb-6">
              Your market submission has been received. Our team will review and verify the details before adding it to the platform.
            </p>
            <Button
              onClick={() => window.location.href = '/markets'}
              className="bg-orange text-white rounded-full hover:bg-orange/90"
            >
              Back to Markets
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 bg-Primary/80 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="container mx-auto text-center max-w-3xl relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Help Us Map Your Market!
          </h1>
          <p className="text-lg sm:text-xl">
            Can&apos;t find your market? Add it now and help us grow Nigeria&apos;s biggest market directory!
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Market Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <Store className="w-4 h-4 text-Primary" />
                  Market Name
                </Label>
                <Input
                  id="name"
                  placeholder="What&apos;s the name of the market?"
                  required
                />
              </div>

              {/* Location */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-Primary" />
                    State
                  </Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATES.map((state) => (
                        <SelectItem key={state} value={state.toLowerCase()}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-Primary" />
                    City/LGA
                  </Label>
                  <Input
                    id="city"
                    placeholder="City or Local Government Area"
                    required
                  />
                </div>
              </div>

              {/* Market Type */}
              <div className="space-y-2">
                <Label htmlFor="type">Market Type</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select market type" />
                  </SelectTrigger>
                  <SelectContent>
                    {marketTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase()}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Market Days */}
              <div className="space-y-2">
                <Label htmlFor="days" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-Primary" />
                  Market Days
                </Label>
                <Input
                  id="days"
                  placeholder="E.g., Daily, Every Thursday, etc."
                  required
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <FileImage className="w-4 h-4 text-Primary" />
                  Market Images
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-Primary transition-colors">
                  <input
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png"
                    className="hidden"
                    id="images"
                    onChange={handleImageChange}
                  />
                  <label
                    htmlFor="images"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="w-8 h-8 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Click to upload market images
                    </span>
                    <span className="text-xs text-gray-500">
                      Max 3 images, 5MB per image (.jpg, .jpeg, .png)
                    </span>
                  </label>
                </div>
                
                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group aspect-video">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newPreviews = imagePreviews.filter((_, i) => i !== index);
                            const newFiles = images.filter((_, i) => i !== index);
                            setImagePreviews(newPreviews);
                            setImages(newFiles);
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {images.length > 0 && (
                  <p className="text-sm text-gray-600">
                    {images.length}/3 images selected
                  </p>
                )}
              </div>

              {/* Additional Information */}
              <div className="space-y-2">
                <Label htmlFor="info" className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-Primary" />
                  Additional Information
                </Label>
                <Textarea
                  id="info"
                  placeholder="Give a brief description of the market..."
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-orange hover:bg-orange/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Submitting...
                  </span>
                ) : (
                  <span className="flex text-white items-center gap-2">
                    Submit Market Details
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
} 