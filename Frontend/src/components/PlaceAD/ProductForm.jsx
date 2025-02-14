import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function ProductForm({ formData, handleInputChange, onCancel, onSubmit }) {
  return (
    <div className="gap-4 grid">
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="product-name">Product Name</Label>
          <Input 
            id="product-name" 
            placeholder="Laptop" 
            value={formData.productName}
            onChange={(e) => handleInputChange('productName', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="education">Education & Stationery</SelectItem>
              <SelectItem value="real-estate">Real Estate & Housing</SelectItem>
              <SelectItem value="events">Events & Entertainment</SelectItem>
              <SelectItem value="tech-services">Technology Services</SelectItem>
              <SelectItem value="cultural-experiences">Cultural Experiences</SelectItem>
              <SelectItem value="food">Food & Groceries</SelectItem>
              <SelectItem value="electronics">Electronics & Gadgets</SelectItem>
              <SelectItem value="fashion">Fashion & Accessories</SelectItem>
              <SelectItem value="health">Health & Wellness</SelectItem>
              <SelectItem value="home">Home & Living</SelectItem>
              <SelectItem value="automobile">Automobile Needs</SelectItem>
              <SelectItem value="traditional-crafts">Traditional Crafts</SelectItem>
              <SelectItem value="sports">Sports & Outdoor</SelectItem>
              <SelectItem value="kids">Kids & Baby Products</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input 
            id="price" 
            placeholder="₦100,000.00" 
            value={formData.price}
            onChange={(e) => handleInputChange('price', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock">In Stock?</Label>
          <Select value={formData.inStock} onValueChange={(value) => handleInputChange('inStock', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Stock Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Product Description</Label>
        <Textarea
          id="description"
          placeholder="Describe your product briefly here"
          className="min-h-[150px]"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
        />
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-5 mt-6 sm:mt-10">
        <Button 
          className="w-full sm:w-auto border-Primary bg-transparent hover:bg-P2 px-6 border rounded-full text-Primary hover:text-white"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          className="w-full sm:w-auto bg-Primary hover:bg-P2 px-6 rounded-full text-white"
          onClick={onSubmit}
        >
          Add Product
        </Button>
      </div>
    </div>
  );
}
