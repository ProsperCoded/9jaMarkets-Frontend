import { 
  Store,
  Shield,
  Search,
  MessageSquare,
  Building2,
  Rocket,
  ArrowRight
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const features = [
    {
      icon: <Store className="h-8 w-8"/>,
      title: "Diverse Marketplace",
      description: "From electronics and fashion to groceries and handmade crafts"
    },
    {
      icon: <Search className="h-8 w-8"/>,
      title: "User-Centric Experience",
      description: "Intuitive navigation, smart search filters, and personalized recommendations"
    },
    {
      icon: <Shield className="h-8 w-8"/>,
      title: "Reliable Payment & Delivery",
      description: "Secure payment options and trusted logistics partnerships"
    },
    {
      icon: <MessageSquare className="h-8 w-8"/>,
      title: "Community Engagement",
      description: "Connect, review, and build trust within the marketplace"
    }
  ];

  const missions = [
    {
      icon: <Building2 className="h-6 w-6"/>,
      title: "Support Local Businesses",
      description: "Empower Nigerian vendors with an accessible, tech-driven platform"
    },
    {
      icon: <Rocket className="h-6 w-6"/>,
      title: "Enhance Convenience",
      description: "Enable customers to discover and purchase quality products easily"
    },
    {
      icon: <Shield className="h-6 w-6"/>,
      title: "Ensure Security",
      description: "Implement advanced measures to protect users and transactions"
    }
  ];

  const storyPoints = [
    {
      title: "Our Founders' Vision",
      content: "Founded by Mr. Chioma Achonu Ekenulo and Mr. Felix Agu, 9ja Markets was born from a vision to empower Nigerian entrepreneurs. Our platform is designed to help genuine business operators, regardless of size, reach new heights in the global marketplace."
    },
    {
      title: "Our Mission",
      content: "We're dedicated to expanding business horizons for Nigerian entrepreneurs, connecting them with a global audience. Our goal is to help them grow their customer base, increase revenue, and make meaningful impacts in the global market."
    },
    {
      title: "Empowering Growth",
      content: "At 9ja Markets, we believe every business deserves to thrive, regardless of size or location. We're building more than a marketplace - we're creating a community where African entrepreneurs, traders, and innovators shape the continent's economic future."
    },
    {
      title: "Global Connection",
      content: "For Nigerians worldwide, we're breaking down barriers and unlocking new opportunities. Whether you're a local vendor or in the diaspora, 9ja Markets is your bridge to global commerce and cultural exchange."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-Primary/10 to-transparent">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-Primary mb-6 text-center">
            Welcome to 9ja Markets: Shaping Africa's Economic Future
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center leading-relaxed">
            Nigeria's premier online marketplace dedicated to bridging the gap between 
            buyers and sellers nationwide.
          </p>

          {/* Story Points - Updated styling */}
          <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {storyPoints.map((point, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all
                          border-l-4 border-Primary transform hover:-translate-y-1 
                          flex flex-col"
              >
                <h3 className="text-xl font-semibold text-Primary mb-4 flex items-center gap-2">
                  <span className="bg-Primary/10 p-2 rounded-full">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                  {point.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {point.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-16 ">
        <h2 className="text-3xl font-bold text-center mb-12 text-Primary">Our Mission</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {missions.map((mission, index) => (
            <Card key={index} className="border-2 shadow-lg hover:border-Primary transition-all">
              <CardContent className="pt-6">
                <div className="rounded-full bg-Primary/10 text-Primary p-3 w-fit mb-4">
                  {mission.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{mission.title}</h3>
                <p className="text-gray-600">{mission.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-orange">What We Offer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-full text-orange p-4 w-fit mx-auto mb-4 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="bg-Primary rounded-2xl text-white p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join the 9ja Market Community
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Whether you're a small business looking to scale or a shopper seeking 
            authentic Nigerian products, 9ja Market is your destination for growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg" className=" rounded-full bg-orange hover:bg-orange/90">
              <Link to="/merchant-signup">Start Selling</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className=" rounded-full bg-transparent hover:bg-white hover:text-Primary">
              <Link to="/markets">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 