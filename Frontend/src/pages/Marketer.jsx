import {  Users, Rocket, CheckCircle2, ArrowRight, Coins, Target, BadgePercent, Banknote, Zap, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MarketerSignupButton } from "@/components/MarketerSignupButton";
  
  const steps = [
    {
      title: "Sign Up",
      description: "Join our marketer program by filling out the form below. Our team will review and approve your registration.",
      icon: <CheckCircle2 className="w-6 h-6 text-Primary" />,
    },
    {
      title: "Refer Merchants",
      description: "Introduce vendors, store owners, or entrepreneurs to 9jaMarkets and help them sign up.",
      icon: <Users className="w-6 h-6 text-Primary" />,
    },
    {
      title: "Get Paid!",
      description: "Every time your referred merchant runs an ad, you earn a percentage of their ad spend, tracked manually by our team.",
      icon: <Banknote className="w-6 h-6 text-Primary" />,
    },
  ];
  
  const benefits = [
    {
      title: "Earn Passive Income",
      description: "Keep earning as long as your merchants advertise.",
      icon: <Coins className="w-6 h-6 text-Primary" />,
    },
    {
      title: "No Upfront Costs",
      description: "It's 100% free to join.",
      icon: <BadgePercent className="w-6 h-6 text-Primary" />,
    },
    {
      title: "Manual Tracking",
      description: "Our dedicated team ensures you get your commissions.",
      icon: <Target className="w-6 h-6 text-Primary" />,
    },
    {
      title: "Unlimited Potential",
      description: "The more merchants you bring, the more you make!",
      icon: <Rocket className="w-6 h-6 text-Primary" />,
    },
  ];
  
  const faqs = [
    {
      question: "How do I ensure my referral is tracked?",
      answer: "All merchants must mention your name and phone number when signing up. Our team will manually track their ad spending."
    },
    {
      question: "When do I get paid?",
      answer: "Payments are made monthly (for 6 months only), directly to your bank account."
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
      <div className="min-h-screen bg-white">
        {/* Hero Section with pattern */}
        <section className="pt-20 pb-16 px-4 bg-Primary/80 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
          <div className="container mx-auto text-center max-w-4xl relative z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Become a 9jaMarket Marketer & Earn a percentage on Ads!
            </h1>
            <p className="text-lg sm:text-xl mb-8">
              Turn Your Network into Cash! 
            </p>
            <div className="flex justify-center gap-4">
              <MarketerSignupButton className="flex items-center justify-center mt-6 px-6 py-3 bg-orange text-white rounded-full hover:bg-orange/90 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Start Earning Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </MarketerSignupButton>
            </div>
          </div>
        </section>
  
        {/* How It Works */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12 text-Primary">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <Card key={index} className="relative hover:shadow-lg transition-shadow border border-Primary">
                  <CardHeader>
                    <div className="mb-4">{step.icon}</div>
                    <CardTitle className="text-lg text-Primary">Step {index + 1}: {step.title}</CardTitle>
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
        <section className="py-16 px-4 bg-site-bg/35">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12 text-Primary">Why Join?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow border border-Primary">
                  <CardHeader>
                    <div className="mb-2 text-orange">{benefit.icon}</div>
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
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="bg-Primary rounded-2xl text-white p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8">Who Can Be a Marketer?</h2>
            <div className="grid sm:grid-cols-2 gap-6 text-left">
              <div className="flex items-center space-x-3 bg-white/10 p-4 rounded-lg hover:bg-P2/20 transition-colors">
                <Zap className="w-6 h-6 flex-shrink-0 text-white" />
                <span>Social media influencers & content creators</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 p-4 rounded-lg hover:bg-P2/20 transition-colors">
                <Target className="w-6 h-6 flex-shrink-0 text-white" />
                <span>Business consultants & marketing professionals</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 p-4 rounded-lg hover:bg-P2/20 transition-colors">
                <Users className="w-6 h-6 flex-shrink-0 text-white" />
                <span>Digital marketers & sales agents</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 p-4 rounded-lg hover:bg-P2/20 transition-colors">
                <Rocket className="w-6 h-6 flex-shrink-0 text-white" />
                <span>Anyone with a strong network of business owners</span>
              </div>
            </div>
          </div>
        </section>
  
        {/* FAQs */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-12 text-Primary">
              <HelpCircle className="w-8 h-8 inline-block mr-2 text-Primary" />
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
  
        {/* CTA Section */}
        <section className="py-16 px-4 bg-site-bg/35">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6 text-Primary">Ready to Start Earning?</h2>
            <p className="text-gray-600 mb-8">
              Fill out the form now and become a 9jaMarket Marketer!
            </p>
            <MarketerSignupButton className="inline-flex items-center mt-6 px-6 py-3 bg-orange text-white rounded-full hover:bg-orange/90 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Sign Up as a Marketer
              <ArrowRight className="ml-2 w-5 h-5" />
            </MarketerSignupButton>
          </div>
        </section>
      </div>
    );
  }