import { 
  CreditCard, 
  RefreshCcw, 
  AlertCircle,
  BadgeHelp,
  ShieldCheck,
  ArrowLeftRight,
  Mail
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "../components/ui/badge";
import InterswitchLogo from "../assets/billing/InterswitchLogo.svg";

const BillingPolicyPage = () => {
  const policies = [
    {
      id: "processing",
      icon: <ShieldCheck className="h-6 w-6"/>,
      title: "Payment Processing",
      items: [
        "Secure third-party payment gateways",
        "Encryption protocols for all transactions",
        "Verification for fraud prevention",
        "Order confirmation after successful payment"
      ]
    },
    {
      id: "refunds",
      icon: <ArrowLeftRight className="h-6 w-6"/>,
      title: "Refunds & Cancellations",
      items: [
        "Available for defects and non-delivery",
        "Request within 7 days of purchase",
        "Processing time: 5-10 business days"
      ]
    },
    {
      id: "subscriptions",
      icon: <RefreshCcw className="h-6 w-6"/>,
      title: "Subscription & Recurring",
      items: [
        "Automatic billing based on plan",
        "48-hour cancellation notice required",
        "No refunds for partial use"
      ]
    },
    {
      id: "disputes",
      icon: <AlertCircle className="h-6 w-6"/>,
      title: "Disputed Payments",
      items: [
        "Report unauthorized charges within 3 days",
        "Chargeback claims may affect account status",
        "Support available for resolution"
      ]
    }
  ];

  const faqs = [
    {
      question: "How secure are my payment details?",
      answer: "We use industry-standard encryption and never store your complete card information. All transactions are processed through certified payment gateways."
    },
    {
      question: "What happens if my payment fails?",
      answer: "If a payment fails, the transaction will be cancelled and any held funds will be released. You can try again or use a different payment method."
    },
    {
      question: "How long do refunds take?",
      answer: "Refunds typically process within 5-10 business days, depending on your bank or payment provider."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-Primary/10 to-transparent">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center text-center">
            <div className="p-3 bg-Primary/10 rounded-full mb-6">
              <CreditCard className="h-8 w-8 text-Primary"/>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-Primary mb-4">
              Billing Policy
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Clear and transparent payment policies for a seamless transaction experience.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Methods Section - Updated */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 text-center text-Primary">
          Supported Payment Method
        </h2>
        <Card className="mb-12 max-w-2xl mx-auto hover:border-orange hover:shadow-lg transform hover:-translate-y-1 duration-200 transition-all">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <img 
                src={InterswitchLogo} 
                alt="Interswitch Logo" 
                className="h-16 object-contain"
              />
            </div>
            <CardDescription className="text-base">
              Currently, Interswitch is the only supported payment method. All transactions 
              must be completed through Interswitch's secure payment gateway. Other payment 
              methods may be introduced in the future.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Badge variant="outline" className="bg-orange/10">
              Secure Payment Gateway
            </Badge>
          </CardContent>
        </Card>

        {/* Policy Details */}
        <div className="grid md:grid-cols-2 gap-8">
          {policies.map((policy) => (
            <Card key={policy.id} className="border-2 shadow-md hover:border-Primary transition-all">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-Primary/10 rounded-lg">
                    {policy.icon}
                  </div>
                  <CardTitle>{policy.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {policy.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-Primary mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center text-Primary">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <Card className="mt-12 border-orange">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BadgeHelp className="h-5 w-5 text-orange"/>
              Billing Support
            </CardTitle>
            <CardDescription>
              For billing inquiries and payment-related issues
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="hover:bg-orange hover:text-white transition-all"
              onClick={() => window.location.href = 'mailto:9ijamarkets@gmail.com'}
            >
              <Mail className="mr-2 h-4 w-4" />
              9ijamarkets@gmail.com
            </Button>
            <p className="mt-2 text-sm text-gray-500">
              For immediate assistance, try our chat support in the bottom right corner.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BillingPolicyPage; 