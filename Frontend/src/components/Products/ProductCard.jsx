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
    <Card className="bg-white hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="flex sm:flex-row flex-col">
        {/* Product Image */}
        <div className="relative w-full sm:w-1/3 lg:w-1/4 overflow-hidden aspect-[4/3] sm:aspect-square">
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
            <div className="flex justify-between items-start gap-4 mb-2">
              <div>
                <h3 className="line-clamp-1 font-semibold text-gray-900 text-lg">
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
            <p className="mb-4 line-clamp-2 text-gray-600 text-sm">
              {product.details}
            </p>

            {/* Price */}
            <div className="mb-4 font-semibold text-lg text-Primary">
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
                <span className="sm:inline hidden">Edit</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 hover:bg-red-50 text-red-600 hover:text-red-700"
                onClick={handleDelete}
              >
                <Trash2 className="w-4 h-4" />
                <span className="sm:inline hidden">Delete</span>
              </Button>
              <Link
                to={`/dashboard/products/select-plan?productId=${product.id}`}
                className="inline-flex items-center gap-1 bg-Primary hover:bg-Primary/90 ml-auto px-4 py-2 rounded-full font-medium text-sm text-white transition-colors"
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
