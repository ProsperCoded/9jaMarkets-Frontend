import { 
  Cookie, 
  Shield, 
  BarChart, 
  Settings,
  Info
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";

const CookiePolicyPage = () => {
  const cookieTypes = [
    {
      icon: <Shield className="h-6 w-6"/>,
      title: "Essential Cookies",
      description: "Required for site functionality, including login and security features",
      examples: ["Authentication", "Security", "Basic Functions"]
    },
    {
      icon: <BarChart className="h-6 w-6"/>,
      title: "Performance Cookies",
      description: "Help us analyze user interactions to enhance platform efficiency",
      examples: ["Analytics", "Site Metrics", "User Behavior"]
    },
    {
      icon: <Settings className="h-6 w-6"/>,
      title: "Marketing Cookies",
      description: "Used to deliver personalized advertisements and promotions",
      examples: ["Ad Preferences", "Campaign Tracking", "User Interests"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-Primary/10 to-transparent">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center text-center">
            <div className="p-3 bg-Primary/10 rounded-full mb-6">
              <Cookie className="h-8 w-8 text-Primary"/>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-Primary mb-4">
              Cookie Policy
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              9ja Market uses cookies to enhance your browsing experience and 
              improve platform performance.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Alert className="mb-12 border-Primary/20 bg-Primary/5">
          <Info className="h-4 w-4" />
          <AlertDescription>
            By using our website, you agree to our cookie policy.
          </AlertDescription>
        </Alert>

        {/* What Are Cookies Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-Primary">What Are Cookies?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Cookies are small text files stored on your device to help improve website 
              functionality, personalize content, and analyze user behavior.
            </p>
          </CardContent>
        </Card>

        {/* Cookie Types */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {cookieTypes.map((type, index) => (
            <Card key={index} className="border-2 hover:border-Primary shadow-md transition-all">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-Primary/10 rounded-lg text-Primary">
                    {type.icon}
                  </div>
                  <CardTitle>{type.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{type.description}</p>
                <div className="flex flex-wrap gap-2">
                  {type.examples.map((example, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-orange/10 text-orange rounded-full text-sm"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CookiePolicyPage; 