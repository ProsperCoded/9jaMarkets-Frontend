import { 
  CreditCard, 
  RefreshCcw, 
  AlertCircle,
  BadgeHelp,
  ShieldCheck,
  ArrowLeftRight,
  Mail,
  Wallet,
  Landmark,
  SmartphoneNfc
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "./ui/card";
import { Button } from "./ui/button";
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

  const paymentMethods = [
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Cards",
      description: "Pay securely with Verve, Mastercard, or Visa cards through Interswitch's payment gateway."
    },
    {
      icon: <SmartphoneNfc className="h-6 w-6" />,
      title: "USSD Payments",
      description: "Quick and easy payments using bank-specific USSD codes for instant transactions."
    },
    {
      icon: <Landmark className="h-6 w-6" />,
      title: "Bank Transfers",
      description: "Direct payments from any Nigerian bank account through secure bank transfer."
    },
    {
      icon: <Wallet className="h-6 w-6" />,
      title: "Digital Wallets",
      description: "Convenient payments using supported digital wallet services."
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
            <h1 className="text-4xl md:text-5xl font-bold text-Primary">
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
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold mb-4 text-Primary">
            Accepted Payment Methods
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Currently powered by Interswitch's secure payment gateway
          </p>
          <div className="mt-4">
            <img 
              src={InterswitchLogo} 
              alt="Interswitch Logo" 
              className="h-6 mx-auto"
            />
          </div>
        </div>

        {/* Payment Method Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {paymentMethods.map((method, index) => (
            <Card 
              key={index}
              className="border-2 hover:border-orange transition-all duration-300 hover:shadow-lg"
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-orange/10 rounded-lg text-orange">
                    {method.icon}
                  </div>
                  <CardTitle className="text-lg">{method.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {method.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

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