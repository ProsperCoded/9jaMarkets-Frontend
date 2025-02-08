import { useState } from "react";
import { ProductCard } from "./Product";
import { useEffect } from "react";
import { getProductsApi } from "@/lib/api/productApi";

// Sample data to match the screenshot

export default function ViewProducts() {
  const [products, setProducts] = useState([]);
  async function getProducts() {
    // Make an API call to fetch products

    const products = await getProductsApi((error) => {
      console.error(error);
    });
    if (!products) return;
    console.log({ products });
    setProducts(products);
  }

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="py-6 container">
      <div className="flex flex-col gap-2 lg:grid grid-cols-2 grid-flow-row">
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
