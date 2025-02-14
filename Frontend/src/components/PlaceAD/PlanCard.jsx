import React from "react";

export function PlanCard({ title, price, features, buttonText, onClick, isCurrent }) {
  return (
    <div className="group rounded-xl border border-gray-200 p-6 hover:bg-Primary hover:border-Primary transition-all duration-300">
      <h3 className="text-xl font-semibold text-Primary group-hover:text-white">{title}</h3>
      <div className="mt-4 space-y-3">
        <p className="text-base group-hover:text-white">{price}</p>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-600 group-hover:text-white">
              <span className="text-Primary group-hover:text-white">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={onClick}
        className="mt-6 w-full rounded-full bg-Primary text-white px-6 py-2 text-sm font-medium group-hover:bg-white group-hover:text-Primary transition-colors"
      >
        {buttonText}
      </button>
    </div>
  );
}
