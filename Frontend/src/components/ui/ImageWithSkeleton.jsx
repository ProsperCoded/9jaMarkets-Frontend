import { useState } from "react";

const ImageWithSkeleton = ({ src, alt, className, aspectRatio = "aspect-[4/3]" }) => {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div className={`relative ${aspectRatio}`}>
      {/* Skeleton loader */}
      {imageLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-t-lg" />
      )}
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 rounded-t-lg ${
          imageLoading ? 'opacity-0' : 'opacity-100'
        } ${className || ''}`}
        onLoad={() => setImageLoading(false)}
        onError={() => setImageLoading(false)} // Handle failed loads
      />
    </div>
  );
};

export default ImageWithSkeleton; 