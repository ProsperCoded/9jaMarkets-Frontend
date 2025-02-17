import { Copyright, FileText, Mail, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

const CopyrightPage = () => {
  const protectedContent = [
    "Logos and Brand Identity",
    "Trademarks and Trade Names",
    "Text Content and Descriptions",
    "Graphics and Images",
    "Digital Media Assets",
    "User Interface Elements"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-Primary/10 to-transparent">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center text-center">
            <div className="p-3 bg-Primary/10 rounded-full mb-6">
              <Copyright className="h-8 w-8 text-Primary"/>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-Primary mb-4">
              Copyright Notice
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              © {new Date().getFullYear()} 9jaMarkets. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Protected Content */}
        <Card className="mb-12 border-2 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-Primary"/>
              Protected Content
            </CardTitle>
            <CardDescription>
              The following content is protected under copyright law:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {protectedContent.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 p-3 bg-Primary/5 rounded-lg"
                >
                  <span className="text-Primary">•</span>
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Warning Notice */}
        <Card className="mb-12 border-orange bg-orange/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange">
              <AlertTriangle className="h-6 w-6"/>
              Important Notice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Unauthorized use, reproduction, or distribution of our materials without 
              prior written consent is strictly prohibited.
            </p>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="border-Primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-Primary"/>
              Contact Us
            </CardTitle>
            <CardDescription>
              For copyright-related concerns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="hover:bg-Primary hover:text-white transition-all"
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

export default CopyrightPage; 