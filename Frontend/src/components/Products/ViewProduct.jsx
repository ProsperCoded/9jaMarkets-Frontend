import { useState } from "react";
import { ProductCard } from "./Product";
import { useEffect } from "react";
import { getProductsApi } from "@/lib/api/productApi";
import { Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getProducts() {
    try {
      setIsLoading(true);
      const products = await getProductsApi((error) => {
        console.error(error);
      });
      if (!products) return;
      setProducts(products);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-gray-400">Loading products...</div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Package className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Products Yet</h3>
        <p className="text-gray-500 mb-6 max-w-sm">
          You haven't added any products to your store. Start selling by adding your first product.
        </p>
        <Button
          onClick={() => {
            const addTab = document.querySelector('[value="add"]');
            if (addTab) {
              addTab.click();
            }
          }}
          className="bg-Primary hover:bg-Primary/80 text-white inline-flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Your First Product
        </Button>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="flex flex-col gap-4 lg:grid grid-cols-2 grid-flow-row">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            getProducts={getProducts}
          />
        ))}
      </div>
    </div>
  );
}
