import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, List } from "lucide-react";
import AddProduct from "./AddProduct";
import ViewProducts from "./ViewProduct";
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function ProductPage() {
  const location = useLocation();

  if (location.pathname !== "/dashboard/products") {
    return <Outlet />;
  }

  return (
    <div className="bg-gray-50/50 min-h-[calc(100vh-4rem)]">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-bold text-2xl text-gray-900 sm:text-3xl">
            Products
          </h1>
          <p className="mt-2 text-gray-600 text-sm">
            Manage your product listings and inventory
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="add" className="w-full">
          <TabsList className="inline-flex justify-center items-center bg-white shadow-sm p-1 rounded-lg h-12 text-muted-foreground">
            <TabsTrigger
              value="add"
              className="inline-flex justify-center items-center data-[state=active]:bg-Primary disabled:opacity-50 data-[state=active]:shadow px-4 py-2.5 rounded-md focus-visible:ring-2 focus-visible:ring-ring ring-offset-background focus-visible:ring-offset-2 font-medium text-sm data-[state=active]:text-white whitespace-nowrap transition-all disabled:pointer-events-none focus-visible:outline-none"
            >
              <Plus className="mr-2 w-4 h-4" />
              Add Product
            </TabsTrigger>
            <TabsTrigger
              value="view"
              className="inline-flex justify-center items-center data-[state=active]:bg-Primary disabled:opacity-50 data-[state=active]:shadow px-4 py-2.5 rounded-md focus-visible:ring-2 focus-visible:ring-ring ring-offset-background focus-visible:ring-offset-2 font-medium text-sm data-[state=active]:text-white whitespace-nowrap transition-all disabled:pointer-events-none focus-visible:outline-none"
            >
              <List className="mr-2 w-4 h-4" />
              View Products
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent
              value="add"
              className="bg-white shadow-sm p-6 rounded-lg"
            >
              <AddProduct />
            </TabsContent>
            <TabsContent
              value="view"
              className="bg-white shadow-sm p-6 rounded-lg"
            >
              <ViewProducts />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
