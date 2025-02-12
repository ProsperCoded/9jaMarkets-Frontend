import { 
  Shield, 
  Lock, 
  Database, 
  UserCog, 
  Mail,
  ShieldCheck,
  UserCheck
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { Button } from "./ui/button";

const PrivacyPage = () => {
  const sections = [
    {
      id: "collect",
      icon: <Database className="h-6 w-6"/>,
      title: "Information We Collect",
      items: [
        "Personal Information: Name, email, phone number, and address",
        "Transaction Data: Payment details and order history",
        "Usage Data: Browsing behavior and device information"
      ]
    },
    {
      id: "use",
      icon: <UserCog className="h-6 w-6"/>,
      title: "How We Use Your Information",
      items: [
        "Facilitate secure transactions and order processing",
        "Improve platform functionality and user experience",
        "Provide customer support and resolve disputes",
        "Send marketing communications (opt-out available)"
      ]
    },
    {
      id: "protect",
      icon: <ShieldCheck className="h-6 w-6"/>,
      title: "Data Protection & Security",
      items: [
        "Industry-standard encryption and security measures",
        "Restricted access to authorized personnel only",
        "No data sharing without user consent"
      ]
    },
    {
      id: "rights",
      icon: <UserCheck className="h-6 w-6"/>,
      title: "Your Rights & Choices",
      items: [
        "Access and review your personal data",
        "Request corrections or deletion",
        "Opt-out of promotional communications"
      ]
    }
  ];

  // const timeline = [
  //   {
  //     year: "2024",
  //     title: "Enhanced Security Measures",
  //     description: "Implementation of advanced encryption and two-factor authentication"
  //   },
  //   {
  //     year: "2023",
  //     title: "Data Protection Compliance",
  //     description: "Alignment with Nigerian Data Protection Regulation (NDPR)"
  //   },
  //   {
  //     year: "2022",
  //     title: "Privacy First Initiative",
  //     description: "Launch of our comprehensive privacy protection program"
  //   }
  // ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-Primary/10 to-transparent">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center text-center">
            <div className="p-3 bg-Primary/10 rounded-full mb-6">
              <Lock className="h-8 w-8 text-Primary"/>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-Primary mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              At 9ja Market, we prioritize your privacy and are committed to 
              protecting your personal information.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Alert className="mb-12 border-Primary/20 bg-Primary/5">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            This policy outlines how we collect, use, and safeguard your data when 
            you interact with our platform.
          </AlertDescription>
        </Alert>

        <div className="grid md:grid-cols-2 gap-8">
          {sections.map((section) => (
            <Card key={section.id} className="border-2 hover:border-Primary shadow-md transition-all">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-Primary/10 rounded-lg">
                    {section.icon}
                  </div>
                  <CardTitle>{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.items.map((item, index) => (
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

        {/* Timeline Section
        <div className="mt-16 mb-12">
          <h2 className="text-2xl font-bold text-center mb-8 text-Primary">
            Our Privacy Journey
          </h2>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-24 pt-2">
                  <span className="text-orange font-bold">{item.year}</span>
                </div>
                <div className="flex-1 relative pb-8">
                  <div className="absolute top-2 -left-3 h-full w-0.5 bg-gray-200" />
                  <div className="absolute -left-3.5 top-2 h-2 w-2 rounded-full bg-orange" />
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Contact Section */}
        <Card className="mt-12 border-orange">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-orange"/>
              Contact Us
            </CardTitle>
            <CardDescription>
              For privacy concerns or data-related requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="hover:bg-orange hover:text-white transition-all"
              onClick={() => window.location.href = 'mailto:privacy@9jamarket.com'}
            >
              <Mail className="mr-2 h-4 w-4" />
              privacy@9jamarket.com
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPage; 