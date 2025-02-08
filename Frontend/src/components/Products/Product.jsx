import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MESSAGE_API_CONTEXT } from "@/contexts";
import { deleteProductApi } from "@/lib/api/productApi";
import { Plus } from "lucide-react";
import { Edit, Trash2 } from "lucide-react";
export function ProductCard({ product, getProducts }) {
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  return (
    <Card className="flex items-center gap-3 p-3">
      <div className="relative rounded-md w-1/3 h-16 overflow-hidden shrink-0">
        <img
          src={product.displayImage.url}
          alt={product.name}
          lazy
          className="object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="space-y-1">
          <h3 className="flex justify-between items-center gap-4 font-medium leading-none">
            <span className="truncate">{product.name}</span>
            <span className="bg-slate-300 p-1 rounded-md">{product.stock}</span>
          </h3>
          <p className="max-w-[25ch] xl:max-w-[30ch] text-muted-foreground text-sm truncate">
            {/* {new Date(product.date).toLocaleDateString()} */}
            {product.details}
          </p>
        </div>
        <div className="flex justify-end items-center gap-1">
          <Button size="icon" variant="ghost" className="w-8 h-8">
            <Edit className="w-4 h-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="w-8 h-8"
            onClick={async () => {
              // Make an API call to delete the product
              const response = await deleteProductApi(product.id, (error) => {
                messageApi.error(
                  "An error occurred while deleting the product."
                );
                console.error(error);
              });
              if (!response) return;
              getProducts();
              messageApi.success(response);
            }}
          >
            <Trash2 className="w-4 h-4" />
            <span className="sr-only">Delete</span>
          </Button>
          <Button size="sm" className="bg-Primary hover:bg-P2 rounded-full h-6">
            <Plus />
            Run as Ad
          </Button>
        </div>
      </div>
    </Card>
  );
}
