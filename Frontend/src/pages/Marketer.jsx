import { 
    DollarSign, 
    Users, 
    Rocket, 
    CheckCircle2, 
    ArrowRight, 
    Coins, 
    Target, 
    BadgePercent,
    Zap,
    HelpCircle
  } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
  const steps = [
    {
      title: "Sign Up",
      description: "Join our marketer program by filling out the form below. Our team will review and approve your registration.",
      icon: <CheckCircle2 className="w-6 h-6 text-Primary" />,
    },
    {
      title: "Refer Merchants",
      description: "Introduce vendors, store owners, or entrepreneurs to 9ja Market and help them sign up.",
      icon: <Users className="w-6 h-6 text-Primary" />,
    },
    {
      title: "Get Paid!",
      description: "Every time your referred merchant runs an ad, you earn 10% of their ad spend—tracked manually by our team.",
      icon: <DollarSign className="w-6 h-6 text-Primary" />,
    },
  ];
  
  const benefits = [
    {
      title: "Earn Passive Income",
      description: "Keep earning as long as your merchants advertise.",
      icon: <Coins className="w-6 h-6" />,
    },
    {
      title: "No Upfront Costs",
      description: "It's 100% free to join.",
      icon: <BadgePercent className="w-6 h-6" />,
    },
    {
      title: "Manual Tracking",
      description: "Our dedicated team ensures you get your commissions.",
      icon: <Target className="w-6 h-6" />,
    },
    {
      title: "Unlimited Potential",
      description: "The more merchants you bring, the more you make!",
      icon: <Rocket className="w-6 h-6" />,
    },
  ];
  
  const faqs = [
    {
      question: "How do I ensure my referral is tracked?",
      answer: "All merchants must mention your name and phone number when signing up. Our team will manually track their ad spending."
    },
    {
      question: "When do I get paid?",
      answer: "Payments are made monthly, directly to your bank account."
    },
    {
      question: "What if a merchant stops running ads?",
      answer: "You only earn commissions when merchants advertise, so encourage them to keep running promotions!"
    },
    {
      question: "Is there a limit to how many merchants I can refer?",
      answer: "No! The more you refer, the more you earn. 🚀"
    }
  ];
  
  export default function MarketerPage() {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4">
          <div className="container mx-auto text-center max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Become a <span className="text-Primary">9jaMarket</span> Marketer & Earn 10% on Ads!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Turn Your Network into Cash! 💰
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-Primary hover:bg-Primary/90">
                Start Earning Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>
  
        {/* How It Works */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <Card key={index} className="relative hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mb-4">{step.icon}</div>
                    <CardTitle>Step {index + 1}: {step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
  
        {/* Benefits */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Why Join?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mb-2 text-Primary">{benefit.icon}</div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
  
        {/* Who Can Be Section */}
        <section className="py-16 px-4 bg-Primary text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-8">Who Can Be a Marketer?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3 bg-white/10 p-4 rounded-lg">
                <Zap className="w-6 h-6 flex-shrink-0" />
                <span>Social media influencers & content creators</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 p-4 rounded-lg">
                <Target className="w-6 h-6 flex-shrink-0" />
                <span>Business consultants & marketing professionals</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 p-4 rounded-lg">
                <Users className="w-6 h-6 flex-shrink-0" />
                <span>Digital marketers & sales agents</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 p-4 rounded-lg">
                <Rocket className="w-6 h-6 flex-shrink-0" />
                <span>Anyone with a strong network of business owners</span>
              </div>
            </div>
          </div>
        </section>
  
        {/* FAQs */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              <HelpCircle className="w-8 h-8 inline-block mr-2 text-Primary" />
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
  
        {/* CTA Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Earning?</h2>
            <p className="text-gray-600 mb-8">
              Fill out the form now and become a 9jaMarket Marketer!
            </p>
            <Button size="lg" className="bg-Primary hover:bg-Primary/90">
              Sign Up as a Marketer
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </section>
      </div>
    );
  }