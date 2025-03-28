import {
  Users,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Coins,
  Target,
  BadgePercent,
  Banknote,
  Zap,
  HelpCircle,
  InfoIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MarketerSignupButton } from "@/components/MarketerSignupButton";

const steps = [
  {
    title: "Sign Up",
    description:
      "Join our marketer program by filling out the form below. Our team will review and approve your registration.",
    icon: <CheckCircle2 className="w-6 h-6 text-Primary" />,
  },
  {
    title: "Refer Merchants",
    description:
      "Introduce vendors, store owners, or entrepreneurs to 9jaMarkets and help them sign up.",
    icon: <Users className="w-6 h-6 text-Primary" />,
  },
  {
    title: "Get Paid!",
    description:
      "Every time your referred merchant runs an ad, you earn a percentage of their ad spend, tracked manually by our team.",
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
    answer:
      "All merchants must mention your name and phone number when signing up. Our team will manually track their ad spending.",
  },
  {
    question: "When do I get paid?",
    answer:
      "Payments are made monthly (for 6 months only), directly to your bank account.",
  },
  {
    question: "What if a merchant stops running ads?",
    answer:
      "You only earn commissions when merchants advertise, so encourage them to keep running promotions!",
  },
  {
    question: "Is there a limit to how many merchants I can refer?",
    answer: "No! The more you refer, the more you earn. 🚀",
  },
];

export default function MarketerPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section with pattern */}
      <section className="relative bg-Primary/80 px-4 pt-20 pb-16 overflow-hidden text-white">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="z-10 relative mx-auto max-w-4xl text-center container">
          <h1 className="mb-6 font-bold text-3xl sm:text-4xl md:text-5xl">
            Become a 9jaMarket Marketer & Earn a percentage on Ads!
          </h1>
          <p className="mb-4 text-lg sm:text-xl">
            Turn Your Network into Cash!
          </p>
          <div className="flex justify-center gap-4">
            <MarketerSignupButton className="flex justify-center items-center bg-orange hover:bg-orange/90 shadow-lg hover:shadow-xl mt-6 px-6 py-3 rounded-full text-white transition-colors hover:-translate-y-1 duration-300 transform">
              Start Earning Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </MarketerSignupButton>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl container">
          <h2 className="mb-12 font-bold text-Primary text-3xl text-center">
            How It Works
          </h2>
          <div className="gap-8 grid md:grid-cols-3">
            {steps.map((step, index) => (
              <Card
                key={index}
                className="relative hover:shadow-lg border border-Primary transition-shadow"
              >
                <CardHeader>
                  <div className="mb-4">{step.icon}</div>
                  <CardTitle className="text-Primary text-lg">
                    Step {index + 1}: {step.title}
                  </CardTitle>
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
      <section className="bg-site-bg/35 px-4 py-16">
        <div className="mx-auto max-w-6xl container">
          <h2 className="mb-12 font-bold text-Primary text-3xl text-center">
            Why Join?
          </h2>
          <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="hover:shadow-lg border border-Primary transition-shadow"
              >
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
      <section className="mx-auto px-4 py-16 text-center container">
        <div className="bg-Primary p-8 md:p-12 rounded-2xl text-white">
          <h2 className="mb-8 font-bold text-3xl">Who Can Be a Marketer?</h2>
          <div className="gap-6 grid sm:grid-cols-2 text-left">
            <div className="flex items-center space-x-3 bg-white/10 hover:bg-P2/20 p-4 rounded-lg transition-colors">
              <Zap className="flex-shrink-0 w-6 h-6 text-white" />
              <span>Social media influencers & content creators</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/10 hover:bg-P2/20 p-4 rounded-lg transition-colors">
              <Target className="flex-shrink-0 w-6 h-6 text-white" />
              <span>Business consultants & marketing professionals</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/10 hover:bg-P2/20 p-4 rounded-lg transition-colors">
              <Users className="flex-shrink-0 w-6 h-6 text-white" />
              <span>Digital marketers & sales agents</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/10 hover:bg-P2/20 p-4 rounded-lg transition-colors">
              <Rocket className="flex-shrink-0 w-6 h-6 text-white" />
              <span>Anyone with a strong network of business owners</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl container">
          <h2 className="mb-12 font-bold text-Primary text-3xl text-center">
            <HelpCircle className="inline-block mr-2 w-8 h-8 text-Primary" />
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
            <AccordionItem value="track-application">
              <AccordionTrigger className="text-lg text-left">
                How can I track my marketer status?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                When applying as a marketer, use an email address that you can
                create a 9jaMarket account with. After submitting your
                application, create a regular user account with the same email
                if you don't have one already. You'll be able to track your
                application status through your profile dashboard.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-site-bg/35 px-4 py-16">
        <div className="mx-auto max-w-4xl text-center container">
          <h2 className="mb-6 font-bold text-Primary text-3xl">
            Ready to Start Earning?
          </h2>
          <p className="mb-8 text-gray-600">
            Fill out the form now and become a 9jaMarket Marketer!
          </p>
          <MarketerSignupButton className="inline-flex items-center bg-orange hover:bg-orange/90 shadow-lg hover:shadow-xl mt-6 px-6 py-3 rounded-full text-white transition-colors hover:-translate-y-1 duration-300 transform">
            Sign Up as a Marketer
            <ArrowRight className="ml-2 w-5 h-5" />
          </MarketerSignupButton>
        </div>
      </section>
    </div>
  );
}
