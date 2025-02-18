import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useErrorLogger } from "@/hooks";
import { getProductDetails } from "@/lib/api/marketApi";
import LoadingPage from "@/componets-utils/LoadingPage";
import { ArrowLeft, Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "./ui/button";

const ProductDetails = () => {
  const { marketId, productId } = useParams();
  const errorLogger = useErrorLogger();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const details = await getProductDetails(marketId, productId, errorLogger);
      if (details) {
        setProduct(details);
        setSelectedImage(0);
      }
    };
    fetchProductDetails();
  }, [marketId, productId]);

  if (!product) return <LoadingPage message="Loading product details..." />;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-Primary mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Market
        </button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={product.images?.[selectedImage]?.url || product.displayImage?.url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Thumbnail Gallery */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? "border-Primary" : "border-transparent"
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <h1 className="text-2xl font-semibold">{product.name}</h1>
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="w-6 h-6 text-Primary" />
                  ) : (
                    <Bookmark className="w-6 h-6 text-gray-400" />
                  )}
                </button>
              </div>

              <div className="space-y-2">
                <p className="text-3xl font-bold text-Primary">
                  ₦{product.price?.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Category: {product.category}
                </p>
                <p className="text-sm text-gray-500">
                  Stock Status: {product.inStock === "yes" ? "In Stock" : "Out of Stock"}
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Description</h2>
                <p className="text-gray-700 whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              <div className="space-y-4">
                <Button className="w-full bg-Primary hover:bg-P2 text-white rounded-full">
                  Contact Seller
                </Button>
                <Button className="w-full bg-transparent border-2 border-Primary text-Primary hover:bg-P2 hover:text-white rounded-full">
                  Add to Wishlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 