import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, List } from "lucide-react";
import AddProduct from "./AddProduct";
import ViewProducts from "./ViewProduct";
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

//# sourceMappingURL=ProductPage.jsx.map

export default function ProductPage() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname !== "/dashboard/products") {
    return <Outlet />;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50/50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Products</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your product listings and inventory
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="add" className="w-full">
          <TabsList className="inline-flex h-12 items-center justify-center rounded-lg bg-white p-1 text-muted-foreground shadow-sm">
            <TabsTrigger
              value="add"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-Primary data-[state=active]:text-white data-[state=active]:shadow"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </TabsTrigger>
            <TabsTrigger
              value="view"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-Primary data-[state=active]:text-white data-[state=active]:shadow"
            >
              <List className="mr-2 h-4 w-4" />
              View Products
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="add" className="bg-white rounded-lg shadow-sm p-6">
              <AddProduct />
            </TabsContent>
            <TabsContent value="view" className="bg-white rounded-lg shadow-sm p-6">
              <ViewProducts />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
