import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MESSAGE_API_CONTEXT } from "@/contexts";
import { deleteProductApi } from "@/lib/api/productApi";
import { Plus, Edit, Trash2, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { formatPrice } from "@/lib/util";

export function ProductCard({ product, getProducts }) {
  const messageApi = useContext(MESSAGE_API_CONTEXT);

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
    <Card className="overflow-hidden bg-white hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col sm:flex-row">
        {/* Product Image */}
        <div className="relative w-full sm:w-1/3 lg:w-1/4 aspect-[4/3] sm:aspect-square overflow-hidden">
          <img
            src={product.displayImage.url}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 p-4">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">{product.category}</p>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-gray-400" />
                <span className="px-2 py-1 text-sm font-medium bg-gray-100 rounded-full">
                  {product.stock}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 line-clamp-2 mb-4">
              {product.details}
            </p>

            {/* Price */}
            <div className="text-lg font-semibold text-Primary mb-4">
              {formatPrice(product.price)}
            </div>

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
                className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleDelete}
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Delete</span>
              </Button>
              <Link
                to={`/dashboard/products/select-plan?productId=${product.id}`}
                className="ml-auto inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-Primary hover:bg-Primary/90 rounded-full transition-colors"
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
