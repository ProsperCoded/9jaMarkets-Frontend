import React from "react";
import { Users, Rocket } from "lucide-react";

export default function Customers() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center animate-pulse">
            <Users className="w-24 h-24 text-Primary/10" />
          </div>
          <Rocket className="w-24 h-24 text-Primary relative z-10 mx-auto transform -rotate-45" />
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Customer Management Coming Soon!
        </h2>
        
        <p className="text-gray-600 text-sm md:text-base max-w-sm mx-auto">
          We're building powerful tools to help you manage your customer relationships,
          track interactions, and grow your business effectively.
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-500">
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 bg-Primary rounded-full" />
            <span>Customer analytics</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 bg-Primary rounded-full" />
            <span>Order history</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 bg-Primary rounded-full" />
            <span>Customer insights</span>
          </div>
        </div>
      </div>
    </div>
  );
}
