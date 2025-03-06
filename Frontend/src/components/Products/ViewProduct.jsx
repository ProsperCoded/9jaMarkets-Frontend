import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { useEffect } from "react";
import { getProductsApi } from "@/lib/api/productApi";
import { Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { TabContext } from "./ProductPage";

export default function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setActiveTab } = useContext(TabContext);

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
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-gray-400 animate-pulse">Loading products...</div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center p-8 min-h-[400px] text-center">
        <div className="flex justify-center items-center bg-gray-100 mb-4 rounded-full w-16 h-16">
          <Package className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="mb-2 font-semibold text-gray-900 text-lg">
          No Products Yet
        </h3>
        <p className="mb-6 max-w-sm text-gray-500">
          You haven&apos;t added any products to your store. Start selling by
          adding your first product.
        </p>
        <Button
          onClick={() => setActiveTab("add")}
          className="inline-flex items-center gap-2 bg-Primary hover:bg-Primary/80 text-white"
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
        {products.map((product) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              getProducts={getProducts}
            />
          );
        })}
      </div>
    </div>
  );
}
