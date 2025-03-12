import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MESSAGE_API_CONTEXT } from "@/contexts";
import { deleteProductApi } from "@/lib/api/productApi";
import {
  Plus,
  Edit,
  Trash2,
  Package,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { formatPrice } from "@/lib/util";

export function ProductCard({ product, getProducts }) {
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  const navigate = useNavigate();

  // Ad counting logic
  const hasAds = product.ads && product.ads.length > 0;
  const verifiedAdsCount = hasAds
    ? product.ads.filter((ad) => ad.paidFor === true).length
    : 0;
  const unverifiedAdsCount = hasAds
    ? product.ads.filter((ad) => ad.paidFor === false).length
    : 0;

  const handleAdClick = (e) => {
    e.preventDefault();
    navigate("/dashboard/ads/payments");
  };

  const handleDelete = async () => {
    try {
      messageApi.loading("Deleting product...");
      const response = await deleteProductApi(product.id, (error) => {
        messageApi.error("An error occurred while deleting the product.");
        console.error(error);
      });
      if (!response) return;
      getProducts();
      messageApi.success(response);
    } catch (error) {
      messageApi.error("Failed to delete product");
      console.error(error);
    }
  };

  return (
    <Card className="bg-white hover:shadow-md overflow-hidden transition-shadow duration-200">
      <div className="flex sm:flex-row flex-col">
        {/* Product Image */}
        <div className="relative w-full sm:w-1/3 lg:w-1/4 aspect-[4/3] sm:aspect-square overflow-hidden">
          <img
            src={product.displayImage.url}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Ad badges - positioned at the bottom of image */}
          {hasAds && (
            <div className="md:hidden right-0 bottom-0 left-0 absolute flex flex-wrap gap-1 bg-black/20 p-1">
              {verifiedAdsCount > 0 && (
                <button
                  onClick={handleAdClick}
                  className="flex items-center gap-1 bg-green-100 hover:bg-green-200 px-2 py-1 rounded-full font-medium text-green-700 text-xs transition-colors"
                >
                  <CheckCircle className="w-3 h-3" />
                  <span>{verifiedAdsCount} Verified Ads</span>
                </button>
              )}
              {unverifiedAdsCount > 0 && (
                <button
                  onClick={handleAdClick}
                  className="flex items-center gap-1 bg-yellow-100 hover:bg-yellow-200 px-2 py-1 rounded-full font-medium text-yellow-700 text-xs transition-colors"
                >
                  <AlertCircle className="w-3 h-3" />
                  <span>{unverifiedAdsCount} Unverified Ads</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1 p-4">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-start gap-4 mb-2">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm">{product.category}</p>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-gray-400" />
                <span className="bg-gray-100 px-2 py-1 rounded-full font-medium text-sm">
                  {product.stock}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="mb-4 text-gray-600 text-sm line-clamp-2">
              {product.details}
            </p>

            {/* Price */}
            <div className="mb-4 font-semibold text-Primary text-lg">
              {formatPrice(product.price)}
            </div>

            {/* Ad info for larger screens */}
            {hasAds && (
              <div className="hidden sm:flex flex-wrap gap-2 mb-3">
                {verifiedAdsCount > 0 && (
                  <button
                    onClick={handleAdClick}
                    className="flex items-center gap-1 bg-green-50 px-3 py-1 border border-green-200 rounded-md text-green-700 text-sm"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>
                      {verifiedAdsCount} Verified Ad
                      {verifiedAdsCount !== 1 ? "s" : ""}
                    </span>
                  </button>
                )}
                {unverifiedAdsCount > 0 && (
                  <button
                    onClick={handleAdClick}
                    className="flex items-center gap-1 bg-yellow-50 px-3 py-1 border border-yellow-200 rounded-md text-yellow-700 text-sm"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>
                      {unverifiedAdsCount} Unverified Ad
                      {unverifiedAdsCount !== 1 ? "s" : ""}
                    </span>
                  </button>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2 mt-auto">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Edit className="w-4 h-4" />
                <span className="hidden sm:inline">Edit</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 hover:bg-red-50 text-red-600 hover:text-red-700"
                onClick={handleDelete}
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Delete</span>
              </Button>
              <Link
                to={`/dashboard/products/select-plan?productId=${product.id}`}
                className="inline-flex items-center gap-1 bg-Primary hover:bg-Primary/90 ml-auto px-4 py-2 rounded-full font-medium text-white text-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Run as Ad</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
