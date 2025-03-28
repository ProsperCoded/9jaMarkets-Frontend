import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Separator } from "../ui/separator";
import { useNavigate, useLocation } from "react-router-dom";
import { plans } from "@/config";
import { useContext } from "react";
import { MESSAGE_API_CONTEXT, USER_PROFILE_CONTEXT } from "@/contexts";
import { getProduct } from "@/lib/api/productApi";
import { useErrorLogger } from "@/hooks";
import {
  initializeAdApi,
  verifyAdPayment,
  activateFreeAd,
} from "@/lib/api/adApi";
import Paystack from "@paystack/inline-js";
import { LoadingOverlay } from "../ui/LoadingOverlay";
import { CreditCard } from "lucide-react";

const paymentMethods = [
  { id: "card", name: "Pay with Paystack", icon: <CreditCard /> },
];

export default function BillingPage() {
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const { userProfile } = useContext(USER_PROFILE_CONTEXT);
  const navigate = useNavigate();
  const location = useLocation();
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  const errorLogger = useErrorLogger();
  let url = new URL(window.location.href);
  let planId = url.searchParams.get("plan");
  let productId = url.searchParams.get("productId");

  useEffect(() => {
    // const params = new URLSearchParams(location.search);
    if (!(planId && plans[planId])) {
      navigate("/products");
      messageApi.error("Must Select a valid plan");
      return;
    }
    if (!productId) {
      navigate("/products");
      messageApi.error("Must Select a valid product");
      return;
    }
    let plan = plans[planId];
    if (!plan) {
      messageApi.error("Invalid selected plan");
      return;
    }
    setSelectedPlan(plan);
    getProduct(productId, errorLogger).then((data) => {
      if (!data) {
        navigate("/products");
        messageApi.error("Product not found");
        return;
      }
      setProductData(data);
    });
  }, [location, navigate]);

  async function handlePayment() {
    // Implement payment logic here
    const level = selectedPlan.level;

    try {
      if (level === 0) {
        // Show loading for free ad activation
        setLoadingMessage("Activating Free Ad...");
        setLoading(true);

        const freeAd = await activateFreeAd(productId, errorLogger);
        setLoading(false);

        if (freeAd) {
          messageApi.success("Free Ad activated successfully");
          navigate("/dashboard/products", { replace: true });
        }
        return;
      }

      // Show loading while initializing payment
      setLoadingMessage("Loading Payment Interface...");
      setLoading(true);

      const paymentData = await initializeAdApi(level, productId, errorLogger);
      if (!paymentData) {
        setLoading(false);
        messageApi.error("Failed to initialize payment");
        return;
      }

      const config = {
        email: userProfile.email,
        amount: selectedPlan.price * 100, // Amount in kobo
        key: "pk_test_675c37205e748ec82da0b59a67c0c6ad26aa0cc3",
        publicKey: "pk_test_675c37205e748ec82da0b59a67c0c6ad26aa0cc3",
        reference: paymentData.reference,
        onSuccess: async (response) => {
          // Show loading while verifying payment
          setLoadingMessage("Verifying Ad Payment...");
          setLoading(true);

          const verified = await verifyAdPayment(
            response.reference,
            errorLogger
          );
          setLoading(false);

          if (verified) {
            messageApi.success("Ad Payment Verified Successfully");
            navigate("/dashboard/products", { replace: true });
          } else {
            messageApi.error("Payment verification failed");
          }
        },
        onClose: () => {
          messageApi.warning("Ad payment was Canceled");
        },
        onLoad: () => {
          // Hide loading when Paystack iframe is loaded
          setLoading(false);
        },
      };

      const popup = new Paystack();
      popup.newTransaction(config);
    } catch (error) {
      console.error("Payment process error:", error);
      setLoading(false);
      messageApi.error("An error occurred during payment process");
    }
  }

  if (!selectedPlan || !userProfile) {
    return (
      <div className="flex justify-center items-center bg-gray-50 min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 px-4 py-8 min-h-screen">
      {/* Loading Overlay */}
      <LoadingOverlay isVisible={loading} message={loadingMessage} />

      <div className="mx-auto max-w-4xl container">
        <div className="space-y-4 mb-8 text-center">
          <h1 className="font-bold text-2xl md:text-3xl tracking-tight">
            Complete Your Payment
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Choose a payment method and complete your transaction to activate
            your plan.
          </p>
        </div>

        <div className="gap-8 grid lg:grid-cols-3">
          <Card className="order-2 lg:order-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>
                Select your preferred payment method
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup
                value={selectedMethod}
                onValueChange={setSelectedMethod}
                className="gap-4 grid"
              >
                <Label
                  className="flex items-center [&:has(:checked)]:bg-Primary/10 p-3 md:p-4 border [&:has(:checked)]:border-Primary hover:border-Primary rounded-lg transition-all cursor-pointer"
                >
                  <RadioGroupItem value="card" className="mr-4" />
                  <CreditCard className="mr-3 w-5 h-5" />
                  Pay with Paystack
                </Label>
              </RadioGroup>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium text-lg">Billing Information</h3>
                <div className="gap-4 grid">
                  <div className="gap-2 grid">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      // expected to be a merchant
                      value={userProfile.brandName}
                      className="w-full"
                      disabled={true}
                    />
                  </div>
                  <div className="gap-2 grid">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userProfile.email}
                      placeholder="Enter your email"
                      className="w-full"
                      disabled={true}
                    />
                  </div>
                  <div className="gap-2 grid">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={userProfile.phoneNumbers[0].number}
                      placeholder="Enter your phone number"
                      className="w-full"
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4 order-1 lg:order-2">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="relative rounded-md w-16 h-16 overflow-hidden shrink-0">
                      <img
                        src={productData?.displayImage.url}
                        alt={productData?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-sm md:text-base truncate">
                        {productData?.name}
                      </h4>
                      <p className="text-muted-foreground text-xs md:text-sm line-clamp-2">
                        {productData?.details}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-x-3 my-4">
                  <span className="font-medium">{selectedPlan.name}</span>
                  <span>₦{selectedPlan.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground text-sm">
                  <span>Duration</span>
                  <span>{selectedPlan.duration}</span>
                </div>
                <Separator />
                <div className="space-y-2">
                  <span className="font-medium text-sm">Plan Benefits:</span>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    {selectedPlan.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>₦{selectedPlan.price.toLocaleString()}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="bg-Primary hover:bg-Primary/90 w-full text-white"
                  size="lg"
                  onClick={handlePayment}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Review and Confirm"}
                </Button>
              </CardFooter>
            </Card>
            <div className="flex justify-center items-center gap-2 text-muted-foreground text-xs md:text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-600"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              </svg>
              Your payment is secure with 256-bit SSL encryption
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
