import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MESSAGE_API_CONTEXT } from "@/contexts";
import { deleteProductApi } from "@/lib/api/productApi";
import { Plus } from "lucide-react";
import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
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
        <div className="flex justify-end items-center gap-1 h-max">
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
          <Link
            className="flex bg-Primary hover:bg-P2 px-3 py-2 rounded-full font-bold text-white"
            // onClick={() => {
            //   navigate(`/dashboard/products/run-ad?productId=${product.id}`);
            // }}
            to={`/dashboard/products/select-plan?productId=${product.id}`}
          >
            <Plus />
            <span>Run as Ad</span>
          </Link>
        </div>
      </div>
    </Card>
  );
}
