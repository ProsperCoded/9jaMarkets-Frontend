import { useState, useContext } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
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
  FileUp,
  Handshake,
  InfoIcon,
  Loader2,
} from "lucide-react";
import { Combobox } from "./ui/Combobox";
import { SUPPORTED_BANKS } from "../config";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { MESSAGE_API_CONTEXT, USER_PROFILE_CONTEXT } from "@/contexts";
import { createMarketerApi } from "@/lib/api/marketerApi";

const businessTypes = [
  "Affiliate Marketer",
  "Digital Marketer",
  "Social Media Influencer",
  "Content Creator",
  "Brand Ambassador",
  "Other",
];

// Export the dialog component so it can be used by MarketerSignupButton
export function MarketerSignupDialog({ open, onOpenChange }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
    idType: "",
    idImage: null,
    businessName: "",
    businessType: "",
    bankName: "",
    accountName: "",
    accountNumber: "",
    marketingExperience: "",
    agreeToTerms: false,
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  const { userProfile } = useContext(USER_PROFILE_CONTEXT);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.agreeToTerms) {
      messageApi.error("You must agree to the terms and conditions");
      return;
    }

    if (!formData.idImage) {
      messageApi.error("ID image is required");
      return;
    }

    // Check max file size (5MB)
    if (formData.idImage && formData.idImage.size > 5 * 1024 * 1024) {
      messageApi.error("ID image must be less than 5MB");
      return;
    }

    try {
      setLoading(true);

      // Create FormData object for file upload
      const marketerFormData = new FormData();

      // Add required fields
      marketerFormData.append("email", formData.email);
      marketerFormData.append("firstName", formData.firstName);
      marketerFormData.append("lastName", formData.lastName);
      marketerFormData.append("username", formData.username);
      marketerFormData.append("phoneNumber", formData.phone);
      marketerFormData.append("accountName", formData.accountName);
      marketerFormData.append("accountBank", formData.bankName);
      marketerFormData.append("accountNumber", formData.accountNumber);
      marketerFormData.append("BusinessType", formData.businessType);
      marketerFormData.append("IdentityCredentialType", formData.idType);

      // Add optional fields
      if (formData.marketingExperience) {
        marketerFormData.append(
          "marketingExperience",
          formData.marketingExperience
        );
      }

      // Add ID image
      marketerFormData.append("IdentityCredentialImage", formData.idImage);

      // Submit form using API
      const result = await createMarketerApi(
        marketerFormData,
        (error) => messageApi.error(error || "Failed to submit application"),
        (success) =>
          messageApi.success(success || "Application submitted successfully")
      );

      if (result) {
        onOpenChange(false); // Close the main dialog
        setTimeout(() => {
          setShowSuccess(true); // Show success modal with a slight delay
        }, 100);

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          username: "",
          idType: "",
          idImage: null,
          businessName: "",
          businessType: "",
          paymentMethod: "",
          bankName: "",
          accountName: "",
          accountNumber: "",
          marketingExperience: "",
          agreeToTerms: false,
        });
      }
    } catch (error) {
      console.error("Marketer signup failed:", error);
      messageApi.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Format bank options for Combobox
  const bankOptions = SUPPORTED_BANKS.map((bank) => ({
    value: bank,
    label: bank,
  }));

  // Handle bank selection
  const handleBankSelect = (bank) => {
    setFormData((prev) => ({
      ...prev,
      bankName: bank,
    }));
  };

  // Add ID type options
  const idTypes = [
    "National ID (NIN)",
    "Driver's License",
    "Voter's Card",
    "International Passport",
  ];

  // Handle ID image upload
  const handleIdImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        messageApi.error("File size should be less than 5MB");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        idImage: file,
      }));
    }
  };

  // Pre-fill form with user data if logged in
  const prefillFromUserProfile = () => {
    if (userProfile) {
      setFormData((prev) => ({
        ...prev,
        firstName: userProfile.firstName || prev.firstName,
        lastName: userProfile.lastName || prev.lastName,
        email: userProfile.email || prev.email,
        phone: userProfile.phoneNumber || prev.phone,
      }));
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Marketer Application
            </DialogTitle>
            <DialogDescription className="text-center">
              Fill out the form below to become a 9jaMarkets marketer
            </DialogDescription>
          </DialogHeader>

          {/* Add Info Alert here */}
          <div className="bg-Primary/5 border border-Primary/10 p-4 rounded-lg mb-6">
            <p className="flex items-start gap-2 text-sm text-gray-700">
              <InfoIcon className="flex-shrink-0 mt-0.5 w-5 h-5 text-Primary" />
              <span>
                When applying, use an email you have created a 9jaMarket account with, 
                to track your application status and merchants that signup with your code.
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 text-lg">
                Personal Information
              </h3>

              <div className="gap-4 grid md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="top-3 left-3 absolute w-4 h-4 text-gray-400" />
                    <Input
                      id="firstName"
                      placeholder="John"
                      className="pl-9"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          firstName: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <div className="relative">
                    <User className="top-3 left-3 absolute w-4 h-4 text-gray-400" />
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      className="pl-9"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          lastName: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <AtSign className="top-3 left-3 absolute w-4 h-4 text-gray-400" />
                    <Input
                      id="username"
                      placeholder="unique_username"
                      className="pl-9"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          username: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <InfoIcon className="w-4 h-4 text-Primary cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-white shadow-lg p-3 rounded-md max-w-xs text-gray-800">
                          <p>
                            To track your application status, create a user
                            account with this same email. You can then check
                            your application in the profile dashboard.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="relative">
                    <Mail className="top-3 left-3 absolute w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-9"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="top-3 left-3 absolute w-4 h-4 text-gray-400" />
                    <Input
                      id="phone"
                      placeholder="+234"
                      className="pl-9"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idType">ID Type</Label>
                  <Select
                    required
                    value={formData.idType}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, idType: value }))
                    }
                  >
                    <SelectTrigger className="relative pl-9">
                      <Lock className="top-3 left-3 absolute w-4 h-4 text-gray-400" />
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent>
                      {idTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idImage">ID Image Upload</Label>
                  <div className="relative">
                    <Input
                      id="idImage"
                      type="file"
                      accept="image/*"
                      onChange={handleIdImageUpload}
                      className="pl-9"
                      required
                    />
                    <FileUp className="top-3 left-3 absolute w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-xs">
                    Upload a clear image of your selected ID (Max: 5MB)
                  </p>
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 text-lg">
                Business Information
              </h3>

              <div className="gap-4 grid md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name (Optional)</Label>
                  <div className="relative">
                    <Building className="top-3 left-3 absolute w-4 h-4 text-gray-400" />
                    <Input
                      id="businessName"
                      placeholder="Your Business Name"
                      className="pl-9"
                      value={formData.businessName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          businessName: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select
                    required
                    value={formData.businessType}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, businessType: value }))
                    }
                  >
                    <SelectTrigger className="relative pl-9">
                      <Briefcase className="top-3 left-3 absolute w-4 h-4 text-gray-400" />
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type} value={type}>
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
              <h3 className="font-semibold text-gray-900 text-lg">
                Payment Information
              </h3>

              <div className="gap-4 grid md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name</Label>
                  <div className="relative">
                    <Combobox
                      options={bankOptions}
                      value={formData.bankName}
                      handleSelect={handleBankSelect}
                      message="Select your bank"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountName">Account Name</Label>
                  <Input
                    id="accountName"
                    placeholder="As shown on your bank account"
                    value={formData.accountName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        accountName: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    placeholder="10-digit account number"
                    maxLength={10}
                    value={formData.accountNumber}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        accountNumber: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-2">
              <Label htmlFor="marketingExperience">
                Marketing Experience (Optional)
              </Label>
              <Textarea
                id="marketingExperience"
                placeholder="Brief description of your marketing experience or links to past work..."
                className="h-24"
                value={formData.marketingExperience}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    marketingExperience: e.target.value,
                  }))
                }
              />
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, agreeToTerms: checked }))
                }
                required
              />
              <Label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <a href="/terms" className="text-Primary hover:underline">
                  Terms and Conditions
                </a>
              </Label>
            </div>

            {/* Auto-fill from profile button - show only if user is logged in */}
            {userProfile && (
              <Button
                type="button"
                variant="outline"
                className="mb-4"
                onClick={prefillFromUserProfile}
              >
                Auto-fill from my profile
              </Button>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="bg-Primary hover:bg-Primary/90 w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Simplified Success Modal */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center items-center bg-orange/10 mx-auto mb-4 rounded-full w-20 h-20">
              <Handshake className="w-12 h-12 text-orange" />
            </div>
            <DialogTitle className="font-bold text-Primary text-2xl text-center">
              Welcome to 9jaMarkets!
            </DialogTitle>
            <DialogDescription className="text-center">
              <p className="mt-2 text-gray-700 text-lg">
                Your application has been received successfully!
              </p>
              <div className="space-y-2 mt-4 text-gray-600 text-sm text-left">
                <p>
                  • Our team will review your application within 24-48 hours
                </p>
                <p>• You&apos;ll receive an email with your account details</p>
                <p>• Get ready to start earning with 9jaMarkets!</p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button
              onClick={() => setShowSuccess(false)}
              className="bg-Primary hover:bg-Primary/90 px-8 text-white"
            >
              Start Your Journey
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

MarketerSignupDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
};

// Main Marketer component
export default function Marketer() {
  const [showSignupDialog, setShowSignupDialog] = useState(false);

  return (
    <div className="bg-gradient-to-b from-Primary/10 to-transparent min-h-screen">
      {/* Hero Section */}
      <section className="mx-auto px-4 py-16 text-center container">
        <h1 className="mb-6 font-bold text-Primary text-4xl md:text-5xl">
          Become a 9jaMarkets Marketer
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-gray-600 text-xl">
          Join our growing community of marketers and earn by promoting products
          from various markets.
        </p>
        <div className="bg-Primary/10 mx-auto mb-8 p-4 rounded-md max-w-2xl">
          <p className="flex items-center text-gray-700 text-sm">
            <InfoIcon className="flex-shrink-0 mr-2 w-5 h-5 text-Primary" />
            <span>
              <strong>Pro Tip:</strong> When signing up, use an email address
              you can create a 9jaMarket account with. This will allow you to
              track your marketer application status in your profile dashboard.
            </span>
          </p>
        </div>
        <Button
          onClick={() => setShowSignupDialog(true)}
          className="bg-Primary hover:bg-Primary/90 px-8 py-6 rounded-full text-white text-lg"
        >
          Start Earning Today
        </Button>
      </section>

      {/* Features Section */}
      <section className="mx-auto px-4 py-16 container">
        {/* ... other content ... */}
        <div className="mt-12 text-center">
          <Button
            onClick={() => setShowSignupDialog(true)}
            className="bg-orange hover:bg-orange/90 px-8 py-6 rounded-full text-white text-lg"
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
