import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, UserCircle2, Bookmark, Store, Image as ImageIcon, MessageCircle } from "lucide-react";
import heroImage from "../assets/Hero.jpg";

const HowItWorksPage = () => {
  // State for testimonial carousel
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "I love how easy it is to find markets and products on 9ja Markets. It's my go-to for shopping local!",
      author: "Ada",
      role: "Buyer"
    },
    {
      quote: "Since joining 9ja Markets, my sales have doubled! It's easy to use, and buyers find me quickly.",
      author: "Chike",
      role: "Merchant"
    },
    {
      quote: "9ja Markets helped me discover vendors I would never have found on my own. It's an amazing tool!",
      author: "Tunde",
      role: "Buyer"
    },
    {
      quote: "The platform's reach has been incredible. I've received inquiries from all over the country.",
      author: "Ngozi",
      role: "Merchant"
    },
    {
      quote: "The bookmarking feature is a lifesaver. It makes it so easy to keep track of products I'm interested in.",
      author: "Fatima",
      role: "Buyer"
    }
  ];

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="How It Works"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            How 9ja Markets Works
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Your gateway to seamless market connections.
          </p>
          <Link 
            to="/signup"
            className="inline-flex items-center px-8 py-3 bg-Primary hover:bg-Primary/90 text-white rounded-full transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Steps Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Buyers Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-16">For Buyers</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-white shadow-sm">
              <div className="w-12 h-12 bg-Primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-Primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Explore Markets and Products</h3>
              <p className="text-gray-600">
                Discover Nigeria's leading markets and connect with merchants offering what you need.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-white shadow-sm">
              <div className="w-12 h-12 bg-Primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-Primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Search and Filter with Ease</h3>
              <p className="text-gray-600">
                Our powerful search and filter tools make it easy to find specific products, markets, or merchants near you.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-white shadow-sm">
              <div className="w-12 h-12 bg-Primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bookmark className="text-Primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Bookmark and Connect</h3>
              <p className="text-gray-600">
                Bookmark your favorite products and connect directly with vendors.
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link 
              to="/markets"
              className="inline-flex items-center px-8 py-3 bg-Primary hover:bg-Primary/90 text-white rounded-full transition-colors"
            >
              Explore Markets Now
            </Link>
          </div>
        </div>

        {/* Merchants Section */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-16">For Merchants</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-white shadow-sm">
              <div className="w-12 h-12 bg-Primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCircle2 className="text-Primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Create Your Profile</h3>
              <p className="text-gray-600">
                Sign up for free and list your business on 9ja Markets.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-white shadow-sm">
              <div className="w-12 h-12 bg-Primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="text-Primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Showcase Your Products</h3>
              <p className="text-gray-600">
                Upload high-quality images, product descriptions, and pricing to attract buyers.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-white shadow-sm">
              <div className="w-12 h-12 bg-Primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="text-Primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Engage and Grow</h3>
              <p className="text-gray-600">
                Leverage our platform to connect with interested buyers.
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link 
              to="/signup?type=merchant"
              className="inline-flex items-center px-8 py-3 bg-Primary hover:bg-Primary/90 text-white rounded-full transition-colors"
            >
              Sign Up as a Merchant
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-Primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="relative bg-white rounded-xl shadow-sm p-6 md:p-8">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 bg-Primary text-white rounded-full flex items-center justify-center">
                  <UserCircle2 />
                </div>
              </div>
              
              <blockquote className="text-gray-600 text-center mt-4 mb-6">
                "{testimonials[activeTestimonial].quote}"
              </blockquote>
              
              <div className="text-center">
                <p className="font-semibold">{testimonials[activeTestimonial].author}</p>
                <p className="text-sm text-gray-500">{testimonials[activeTestimonial].role}</p>
              </div>

              <div className="flex justify-center mt-6 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === activeTestimonial ? "bg-Primary" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
