import { ProductCard } from "./Product";

// Sample data to match the screenshot
const products = [
  {
    id: "1",
    name: "Brown Laptop Bag",
    date: "2024-12-22",
    image: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Gaming Mouse",
    date: "2024-12-21",
    image: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Gaming PC Keyboard",
    date: "2024-12-23",
    image: "/placeholder.svg",
  },
  {
    id: "4",
    name: "Samsung Monitor",
    date: "2024-12-23",
    image: "/placeholder.svg",
  },
  {
    id: "5",
    name: "Laptop Charger",
    date: "2024-11-03",
    image: "/placeholder.svg",
  },
  {
    id: "6",
    name: "32GB Harddrive",
    date: "2024-11-11",
    image: "/placeholder.svg",
  },
];

export default function ViewProducts() {
  return (
    <div className="py-6 container">
      <div className="gap-2 grid grid-cols-2 grid-flow-row">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
