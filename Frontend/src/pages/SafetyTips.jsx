import { Shield, AlertTriangle } from "lucide-react";

const SafetyTips = () => {
  const buyerTips = [
    "Verify Listings: Check product descriptions, reviews, and seller ratings before making a purchase.",
    "Secure Payments: Only use our official payment gateway to complete transactions. Avoid direct bank transfers.",
    "Inspect on Delivery: If possible, verify the item before finalizing the transaction."
  ];

  const sellerTips = [
    "Be Transparent: Provide accurate descriptions, pricing, and images of your products.",
    "Beware of Fraudulent Buyers: Avoid deals that seem too good to be true and report suspicious inquiries.",
    "Use Verified Delivery Services: Partner with reliable logistics providers to ensure safe deliveries.",
    "Protect Your Data: Do not share sensitive information like bank details outside the official platform."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-Primary/10 to-transparent py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-8 w-8 text-Primary" />
          <h1 className="text-3xl font-bold text-Primary">Safety Tips</h1>
        </div>
        
        <p className="text-lg text-gray-600 mb-8">
          At 9jaMarkets, your safety is our top priority. Whether you're buying or selling, 
          follow these guidelines to ensure a secure experience:
        </p>

        {/* Buyer Tips */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-Primary mb-4">For Buyers</h2>
          <ul className="space-y-3">
            {buyerTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-700">
                <span className="text-Primary mt-1">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Seller Tips */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-Primary mb-4">For Sellers</h2>
          <ul className="space-y-3">
            {sellerTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-700">
                <span className="text-Primary mt-1">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Report Section */}
        <div className="bg-orange/10 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-orange" />
            <h2 className="text-xl font-semibold text-gray-900">Report Suspicious Activity</h2>
          </div>
          <p className="text-gray-700">
            If you notice fraudulent listings or users violating our policies, report them 
            immediately to our support team at{' '}
            <a href="mailto:9ijamarkets@gmail.com" className="text-Primary hover:underline">
              9ijamarkets@gmail.com
            </a>
            {' '}or use our live chat support for immediate assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SafetyTips; 