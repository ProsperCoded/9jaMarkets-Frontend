import { useState } from "react";
import PropTypes from 'prop-types';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { 
  User, 
  Mail, 
  Phone, 
  AtSign, 
  Lock, 
  Building, 
  Briefcase,
  Wallet,
  Bank
} from "lucide-react";

const businessTypes = [
  "Affiliate Marketer",
  "Digital Marketer",
  "Social Media Influencer",
  "Content Creator",
  "Brand Ambassador",
  "Other"
];

const paymentMethods = [
  "Bank Transfer",
  "Wallet"
];

const banks = [
  "Access Bank",
  "First Bank",
  "GT Bank",
  "UBA",
  "Zenith Bank",
  // Add more banks
];

// Separate the MarketerSignup dialog component
function MarketerSignupDialog({ open, onOpenChange }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    businessType: "",
    paymentMethod: "",
    bankName: "",
    accountName: "",
    accountNumber: "",
    experience: "",
    agreeToTerms: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-Primary">
            Become a Marketer
          </DialogTitle>
          <DialogDescription>
            Join our marketing team and start earning by promoting products on 9jaMarkets.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="fullName"
                    placeholder="John Doe"
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="phone"
                    placeholder="+234"
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="username"
                    placeholder="unique_username"
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="password"
                    type="password"
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="confirmPassword"
                    type="password"
                    className="pl-9"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Business Information</h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name (Optional)</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="businessName"
                    placeholder="Your Business Name"
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type</Label>
                <Select required>
                  <SelectTrigger className="pl-9 relative">
                    <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase()}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Payment Information</h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Preferred Payment Method</Label>
                <Select required>
                  <SelectTrigger className="pl-9 relative">
                    <Wallet className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method} value={method.toLowerCase()}>
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Select required>
                  <SelectTrigger className="pl-9 relative">
                    <Bank className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <SelectValue placeholder="Select your bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {banks.map((bank) => (
                      <SelectItem key={bank} value={bank.toLowerCase()}>
                        {bank}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountName">Account Name</Label>
                <Input 
                  id="accountName"
                  placeholder="As shown on your bank account"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input 
                  id="accountNumber"
                  placeholder="10-digit account number"
                  maxLength={10}
                  required
                />
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <Label htmlFor="experience">Marketing Experience (Optional)</Label>
            <Textarea 
              id="experience"
              placeholder="Brief description of your marketing experience or links to past work..."
              className="h-24"
            />
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" required />
            <Label htmlFor="terms" className="text-sm">
              I agree to the{" "}
              <a href="/terms" className="text-Primary hover:underline">
                Terms and Conditions
              </a>
            </Label>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-Primary hover:bg-Primary/90">
            Submit Application
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

MarketerSignupDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired
};

// Main Marketer component
export default function Marketer() {
  const [showSignupDialog, setShowSignupDialog] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-Primary/10 to-transparent">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-Primary mb-6">
          Become a 9jaMarkets Marketer
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join our growing community of marketers and earn by promoting products from various markets.
        </p>
        <Button 
          onClick={() => setShowSignupDialog(true)}
          className="bg-Primary hover:bg-Primary/90 text-white px-8 py-6 rounded-full text-lg"
        >
          Start Earning Today
        </Button>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        {/* ... other content ... */}
        <div className="text-center mt-12">
          <Button 
            onClick={() => setShowSignupDialog(true)}
            className="bg-orange hover:bg-orange/90 text-white px-8 py-6 rounded-full text-lg"
          >
            Signup as a Marketer
          </Button>
        </div>
      </section>

      {/* Signup Dialog */}
      <MarketerSignupDialog 
        open={showSignupDialog} 
        onOpenChange={setShowSignupDialog}
      />
    </div>
  );
} 