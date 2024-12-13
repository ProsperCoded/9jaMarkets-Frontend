import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Edit, Trash2 } from "lucide-react";

export function ProductCard({ product }) {
  return (
    <Card className="flex items-center gap-3 p-3">
      <div className="relative rounded-md w-1/3 h-16 overflow-hidden shrink-0">
        <img src={product.image} alt={product.name} className="object-cover" />
      </div>
      <div className="flex-1">
        <div className="space-y-1">
          <h3 className="font-medium leading-none">{product.name}</h3>
          <p className="text-muted-foreground text-sm">
            {new Date(product.date).toLocaleDateString()}
          </p>
        </div>
        <div className="flex justify-end items-center gap-1">
          <Button size="icon" variant="ghost" className="w-8 h-8">
            <Edit className="w-4 h-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button size="icon" variant="ghost" className="w-8 h-8">
            <Trash2 className="w-4 h-4" />
            <span className="sr-only">Delete</span>
          </Button>
          <Button
            size="sm"
            className="bg-green hover:bg-hover-green rounded-full h-6"
          >
            <Plus />
            Run as Ad
          </Button>
        </div>
      </div>
    </Card>
  );
}
