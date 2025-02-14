import { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Send, 
  Clock,
  Facebook,
  Twitter,
  Instagram,
  AlertCircle
} from "lucide-react";
import { Button } from "../components/ui/button";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      details: ["+234 XXX-XXX-XXXX", "+234 XXX-XXX-XXXX"],
      action: "tel:+234XXXXXXXXXX"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: ["support@9jamarket.com", "info@9jamarket.com"],
      action: "mailto:support@9jamarket.com"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Office",
      details: ["123 Market Street,", "Lagos, Nigeria"],
      action: "https://maps.google.com"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Working Hours",
      details: ["Monday - Friday: 8am - 6pm", "Saturday: 9am - 4pm"],
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSending(false);
    setSent(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    
    // Reset success message after 5 seconds
    setTimeout(() => setSent(false), 5000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-Primary/80 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Get in Touch
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto text-center">
            Have questions? We&apos;d love to hear from you. Send us a message and 
            we&apos;ll respond as soon as possible.
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="container mx-auto pt-16 px-4 -mt-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map((info, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-orange/10 text-orange p-3 rounded-full">
                  {info.icon}
                </span>
                <h3 className="text-lg font-semibold">{info.title}</h3>
              </div>
              <div className="space-y-1">
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600">{detail}</p>
                ))}
              </div>
              {info.action && (
                <a 
                  href={info.action}
                  target={info.action.startsWith('http') ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="text-Primary hover:underline mt-3 inline-block"
                >
                  Contact →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-Primary" />
              Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-Primary focus:border-Primary"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-Primary focus:border-Primary"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-Primary focus:border-Primary"
                  placeholder="How can we help?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-Primary focus:border-Primary"
                  placeholder="Your message here..."
                />
              </div>

              <Button 
                type="submit" 
                className="w-full text-white"
                disabled={sending}
              >
                {sending ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Send Message
                  </span>
                )}
              </Button>

              {sent && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                  <AlertCircle className="h-5 w-5" />
                  Message sent successfully!
                </div>
              )}
            </form>
          </div>

          {/* Social Media & Map */}
          <div className="space-y-8">
            {/* Social Media */}
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
              <div className="grid grid-cols-3 gap-4">
                <a 
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Facebook className="h-8 w-8 text-blue-600 mb-2" />
                  <span className="text-sm font-medium">Facebook</span>
                </a>
                <a 
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-4 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors"
                >
                  <Twitter className="h-8 w-8 text-sky-500 mb-2" />
                  <span className="text-sm font-medium">Twitter</span>
                </a>
                <a 
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
                >
                  <Instagram className="h-8 w-8 text-pink-600 mb-2" />
                  <span className="text-sm font-medium">Instagram</span>
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Visit Our Office</h2>
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7277267760334!2d3.3791163!3d6.4515738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2s!4v1647095757814!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs; 