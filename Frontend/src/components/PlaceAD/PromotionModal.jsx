import React from "react";
import { X } from "lucide-react";
import { PlanCard } from "./PlanCard";

export function PromotionModal({ onClose, onSelectPlan }) {
  const plans = [
    {
      title: "Free Plan",
      price: "3 days",
      features: [
        "Quick visibility for short-term ads",
        "Ideal for small, local promotions",
        "Limited exposure to test the platform"
      ],
      buttonText: "Current Plan",
      isCurrent: true
    },
    {
      title: "Standard Plan",
      price: "₦1,500",
      features: [
        "7 days",
        "Perfect for weekly campaigns",
        "Moderate reach for your ad"
      ],
      buttonText: "Select Plan",
      planId: "standard"
    },
    {
      title: "Premium Plan",
      price: "₦3,500",
      features: [
        "30 days",
        "Maximize visibility for a month",
        "Reach a wider audience consistently",
        "Boost engagement and conversions"
      ],
      buttonText: "Select Plan",
      planId: "premium"
    },
    {
      title: "Boost Plan",
      price: "₦10,000",
      features: [
        "90 days",
        "Maximum visibility",
        "Priority placement",
        "Advanced analytics",
        "Premium support"
      ],
      buttonText: "Select Plan",
      planId: "boost"
    }
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-[95vw] max-w-[1000px] p-4 sm:p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-Primary transition-colors"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Promote your advert</h2>
          <p className="text-base text-gray-600 mt-2">
            Choose a promotion type for your ad to post it
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {plans.map((plan, index) => (
            <PlanCard
              key={index}
              title={plan.title}
              price={plan.price}
              features={plan.features}
              buttonText={plan.buttonText}
              onClick={() => plan.planId ? onSelectPlan(plan.planId) : null}
              isCurrent={plan.isCurrent}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
