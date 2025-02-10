import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { plans } from "@/config";
import { Star, Award, Rocket } from "lucide-react";
import { useContext } from "react";
import { MESSAGE_API_CONTEXT } from "@/contexts";
import { useNavigate } from "react-router-dom";

function getIconForPlan(id) {
  switch (id) {
    case "standard":
      return <Star className="w-6 h-6 text-green-500" />;
    case "premium":
      return <Award className="w-6 h-6 text-green-500" />;
    case "boost":
      return <Rocket className="w-6 h-6 text-green-500" />;
    default:
      return null;
  }
}

export default function SelectPlan() {
  // Reorder to have Boost plan in the middle
  const orderedPlans = [plans.standard, plans.boost, plans.premium];
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  const navigate = useNavigate();
  return (
    <div className="py-6 animate-fadeIn">
      <h2 className="mb-[5rem] font-bold text-4xl text-center">SELECT PLAN</h2>
      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {orderedPlans.map((plan) => {
          const boostExtra =
            plan.id === "boost"
              ? "scale-110 hover:scale-125 z-10"
              : "hover:scale-105";
          return (
            <Card
              key={plan.id}
              className={`border-2 bg-white shadow-lg hover:shadow-2xl border-transparent transform transition-transform duration-300 ease-in-out ${boostExtra} `}
            >
              <CardHeader className="flex items-center gap-2 border-gray-200 pb-2 border-b">
                {getIconForPlan(plan.id)}
                <div>
                  <h3 className="font-semibold text-2xl text-green-700">
                    {plan.name}
                  </h3>
                  <p className="bg-lime-600 mx-auto px-3 py-2 rounded-md w-fit font-bold text-center text-white">
                    {plan.duration}
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700 list-disc list-inside">
                  {plan.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex justify-between items-center pt-4">
                <span className="font-bold text-green-800 text-lg">
                  ₦{plan.price}
                </span>
                <Button
                  variant="primary"
                  className="bg-Primary hover:bg-P2 font-semibold hover:text-white transition-colors duration-300"
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
                  Select
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
