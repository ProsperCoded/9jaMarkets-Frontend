import React from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { message } from 'antd';

export function ImageUploader({ selectedImages, setSelectedImages }) {
  const fileInputRef = React.useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validFiles = files.filter((file) => file.size <= 5 * 1024 * 1024);
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

  return (
    <>
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
    </>
  );
}
