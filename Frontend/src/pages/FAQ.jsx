import { HelpCircle } from "lucide-react";
import { useState } from "react";

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState("general");

  const categories = {
    general: "General Questions",
    buying: "Buying on 9jaMarkets",
    payments: "Payments & Refunds",
    selling: "Selling on 9jaMarkets",
    shipping: "Shipping & Delivery",
    security: "Security & Support"
  };

  const faqs = {
    general: [
      {
        question: "What is 9jaMarkets?",
        answer: "9jaMarkets is Nigeria's premier online marketplace that connects buyers and sellers, making it easy to buy and sell goods securely."
      },
      {
        question: "Do I need an account to shop on 9jaMarkets?",
        answer: "Yes, creating a free account allows you to track orders, communicate with sellers, and enjoy a personalized shopping experience."
      },
      {
        question: "Is 9jaMarkets available nationwide?",
        answer: "Yes, 9jaMarkets operates across Nigeria, allowing buyers and sellers to connect from different states."
      },
      {
        question: "Is shopping on 9jaMarkets safe?",
        answer: "Absolutely! We use secure payment gateways and enforce strict seller verification to ensure safe transactions."
      }
    ],
    buying: [
      {
        question: "How do I search for a product?",
        answer: "Use the search bar at the top of the homepage or browse through categories to find what you need."
      },
      {
        question: "How do I place an order?",
        answer: "Browse or search for your desired product, click Bthe bookmark icon, proceed to the bookmark page, contact the seller and make payment."
      },
      {
        question: "Can I cancel an order after placing it?",
        answer: "Order cancellations depend on the seller's policy. Contact the seller immediately if you need to cancel an order."
      },
      {
        question: "What should I do if I receive the wrong or damaged product?",
        answer: "Contact the seller immediately and report the issue through the Dispute Resolution section. If unresolved, reach out to our support team."
      }
    ],
    payments: [
      {
        question: "What payment methods are supported?",
        answer: "Currently, we support Interswitch as our official payment gateway, with more options coming soon."
      },
      {
        question: "Can I pay on delivery?",
        answer: "Some sellers offer Cash on Delivery (COD). Check the seller's payment options before purchasing."
      },
      {
        question: "How do refunds work?",
        answer: "Refunds are processed based on the seller's return policy. If eligible, you will receive your refund within 7-10 business days."
      }
    ],
    selling: [
      {
        question: "How do I become a seller?",
        answer: "Click Sign Up as a Seller, provide business details, and upload your first product listing to start selling."
      },
      {
        question: "Are there fees for selling on 9jaMarkets?",
        answer: "Basic listings are free, but premium ads and featured placements come with a fee for better visibility."
      },
      {
        question: "How do I receive payments from customers?",
        answer: "Payments are processed through 9jaMarkets's secure system and transferred to your registered bank account."
      }
    ],
    shipping: [
      {
        question: "How does shipping work?",
        answer: "Sellers handle shipping, but we partner with logistics companies to ensure fast and safe deliveries."
      },
      {
        question: "What are the delivery time estimates?",
        answer: "Delivery varies by location but generally takes 1-5 business days within Nigeria."
      },
      {
        question: "Can I choose my preferred delivery service?",
        answer: "Yes, you can select from available delivery options provided by the seller."
      }
    ],
    security: [
      {
        question: "How do I report a fraudulent seller or scam?",
        answer: "Click the Report User button on their profile or email report@9jaMarkets.com with details."
      },
      {
        question: "Can I delete my account?",
        answer: "Yes, go to Account Settings and request account deletion, or contact support@9jaMarkets.com."
      },
      {
        question: "What should I do if I forget my password?",
        answer: "Click Forgot Password? on the login page and follow the reset instructions sent to your email."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-Primary/10 to-transparent py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <HelpCircle className="h-8 w-8 text-Primary" />
          <h1 className="text-3xl font-bold text-Primary">
            Frequently Asked Questions (FAQ)
          </h1>
        </div>

        {/* Category Navigation */}
        <div className="overflow-x-auto pb-2 mb-8 -mx-4 px-4">
          <div className="flex gap-2 w-max">
            {Object.entries(categories).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
                  ${activeCategory === key 
                    ? 'bg-Primary text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-300'}`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-6">
          {faqs[activeCategory]?.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-Primary mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 bg-orange/10 rounded-lg p-6 text-center">
          <p className="text-gray-700 mb-2">
            Can't find what you're looking for?
          </p>
          <p className="text-gray-700">
            Contact our support team at{' '}
            <a href="mailto:support@9jaMarkets.com" className="text-Primary hover:underline">
              support@9jaMarkets.com
            </a>
            {' '}or call our helpline at +234 XXX-XXX-XXXX
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 