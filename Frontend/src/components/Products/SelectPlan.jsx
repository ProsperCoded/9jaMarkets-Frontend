import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { plans } from "@/config";
import { Star, Award, Rocket, Zap } from "lucide-react";
import { useContext } from "react";
import { MESSAGE_API_CONTEXT } from "@/contexts";
import { useNavigate } from "react-router-dom";

function getIconForPlan(id) {
  switch (id) {
    case "free":
      return <Zap className="w-6 h-6 text-gray-500" />;
    case "standard":
      return <Star className="w-6 h-6 text-orange" />;
    case "premium":
      return <Award className="w-6 h-6 text-purple-500" />;
    case "boost":
      return <Rocket className="w-6 h-6 text-blue-500" />;
    default:
      return null;
  }
}

export default function SelectPlan() {
  // Reorder plans to have free first, then standard, boost, and premium
  const orderedPlans = [plans.free, plans.standard, plans.boost, plans.premium];
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  const navigate = useNavigate();

  return (
    <div className="py-6 animate-fadeIn">
      <div className="text-center mb-12">
        <h2 className="font-bold text-4xl mb-4">Choose Your Plan</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select the perfect plan to showcase your products and reach more customers
        </p>
      </div>
      
      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto px-4">
        {orderedPlans.map((plan) => {
          const isBoost = plan.id === "boost";
          const isPremium = plan.id === "premium";
          
          const cardClasses = `
            relative border-2 bg-white shadow-lg hover:shadow-2xl 
            transform transition-all duration-300 ease-in-out
            ${isBoost ? 'scale-105 hover:scale-110 z-10 border-blue-500' : 'hover:scale-105'}
            ${isPremium ? 'border-purple-500' : plan.id === 'standard' ? 'border-orange' : plan.id === 'free' ? 'border-gray-300' : ''}
          `;

          return (
            <Card key={plan.id} className={cardClasses}>
              {(isBoost || isPremium) && (
                <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-white text-sm font-semibold ${isBoost ? 'bg-blue-500' : 'bg-purple-500'}`}>
                  {isBoost ? 'Most Popular' : 'Best Value'}
                </div>
              )}
              
              <CardHeader className="flex items-center gap-2 border-gray-200 pb-2 border-b">
                <div className="p-3 rounded-full bg-gray-50">
                  {getIconForPlan(plan.id)}
                </div>
                <div className="text-center w-full">
                  <h3 className={`font-semibold text-2xl ${
                    isBoost ? 'text-blue-700' : 
                    isPremium ? 'text-purple-700' : 
                    plan.id === 'standard' ? 'text-orange' :
                    'text-gray-700'
                  }`}>
                    {plan.name}
                  </h3>
                  <p className={`mx-auto px-3 py-2 rounded-md w-fit font-bold text-center text-white ${
                    isBoost ? 'bg-blue-600' :
                    isPremium ? 'bg-purple-600' :
                    plan.id === 'standard' ? 'bg-orange' :
                    'bg-gray-600'
                  }`}>
                    {plan.duration}
                  </p>
                </div>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold">
                    ₦{plan.price.toLocaleString()}
                  </span>
                </div>
                <ul className="space-y-3">
                  {plan.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <svg className={`w-5 h-5 ${
                        isBoost ? 'text-blue-500' :
                        isPremium ? 'text-purple-500' :
                        plan.id === 'standard' ? 'text-orange' :
                        'text-gray-500'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter className="pt-6">
                <Button
                  variant="primary"
                  className={`w-full font-semibold transition-colors duration-300 ${
                    isBoost ? 'bg-blue-600 hover:bg-blue-700' :
                    isPremium ? 'bg-purple-600 hover:bg-purple-700' :
                    plan.id === 'standard' ? 'bg-orange hover:bg-orange/80' :
                    'bg-gray-600 hover:bg-gray-700'
                  } text-white`}
                  onClick={() => {
                    let url = new URL(window.location);
                    let productId = url.searchParams.get("productId");
                    if (!productId) {
                      messageApi.warning("Please select a product first");
                      return;
                    }
                    let newUrl = `/dashboard/products/ad-payment?productId=${productId}&plan=${plan.id}`;
                    navigate(newUrl);
                  }}
                >
                  {plan.id === 'free' ? 'Get Started' : 'Select Plan'}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
