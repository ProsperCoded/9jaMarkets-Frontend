"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AddProduct from "./AddProduct";
import ViewProducts from "./ViewProduct";
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
export default function ProductPage() {
  const navigate = useNavigate();
  const location = useLocation();
  if (location.pathname !== "/dashboard/products") {
    return <Outlet />;
  }
  return (
    <div className="mx-auto p-4 w-full max-w-6xl">
      <Tabs defaultValue="add" className="w-full">
        <TabsList className="grid grid-cols-2 mb-8 w-full">
          <TabsTrigger
            value="add"
            className="data-[state=active]:border-green-600 data-[state=active]:border-b-2"
          >
            Add a Product
          </TabsTrigger>
          <TabsTrigger value="view">View Products</TabsTrigger>
        </TabsList>
        <TabsContent value="add">
          <AddProduct />
        </TabsContent>
        <TabsContent value="view">
          <ViewProducts />
        </TabsContent>
      </Tabs>
    </div>
  );
}
