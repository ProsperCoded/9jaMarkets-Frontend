import React, { useState, useEffect } from "react"
import { CreditCard, Building2, Wallet } from 'lucide-react'
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Separator } from "./ui/separator"
import { useNavigate, useLocation } from 'react-router-dom'

const paymentMethods = [
  { id: "card", name: "Credit/Debit Card", icon: CreditCard },
  { id: "bank", name: "Bank Transfer", icon: Building2 },
  { id: "wallet", name: "Mobile Wallet", icon: Wallet },
]

const plans = {
  standard: {
    id: "standard",
    name: "Standard Plan",
    price: 1500,
    duration: "7 days",
    benefits: [
      "Perfect for weekly campaigns",
      "Moderate reach for your ad",
      "Basic visibility features"
    ],
  },
  premium: {
    id: "premium",
    name: "Premium Plan",
    price: 3500,
    duration: "30 days",
    benefits: [
      "Maximum visibility",
      "Reach a wider audience consistently",
      "Boost engagement and conversions",
      "Premium placement in search results"
    ],
  },
  boost: {
    id: "boost",
    name: "Boost Plan",
    price: 10000,
    duration: "30 days",
    benefits: [
      "Highlighted placement for top visibility",
      "Fast-track reach with premium exposure"
    ],
  }
}

export default function BillingPage() {
  const [selectedMethod, setSelectedMethod] = useState("card")
  const [selectedPlan, setSelectedPlan] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const planId = params.get('plan')
    if (planId && plans[planId]) {
      setSelectedPlan(plans[planId])
    } else {
      navigate('/products')
    }
  }, [location, navigate])

  if (!selectedPlan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="container max-w-4xl mx-auto">
        <div className="space-y-4 text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Complete Your Payment</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Choose a payment method and complete your transaction to activate your plan.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <Card className="lg:col-span-2 order-2 lg:order-1">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Select your preferred payment method</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup
                value={selectedMethod}
                onValueChange={setSelectedMethod}
                className="grid gap-4"
              >
                {paymentMethods.map((method) => {
                  const Icon = method.icon
                  return (
                    <Label
                      key={method.id}
                      className="flex items-center p-3 md:p-4 border rounded-lg cursor-pointer hover:border-Primary [&:has(:checked)]:bg-Primary/10 [&:has(:checked)]:border-Primary transition-all"
                    >
                      <RadioGroupItem value={method.id} className="mr-4" />
                      <Icon className="w-5 h-5 mr-3" />
                      {method.name}
                    </Label>
                  )
                })}
              </RadioGroup>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Billing Information</h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter your full name" className="w-full" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter your email" className="w-full" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input id="phone" type="tel" placeholder="Enter your phone number" className="w-full" />
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
                <div className="flex justify-between">
                  <span className="font-medium">{selectedPlan.name}</span>
                  <span>₦{selectedPlan.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Duration</span>
                  <span>{selectedPlan.duration}</span>
                </div>
                <Separator />
                <div className="space-y-2">
                  <span className="text-sm font-medium">Plan Benefits:</span>
                  <ul className="text-sm text-muted-foreground space-y-1">
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
                <Button className="w-full bg-Primary hover:bg-Primary/90 text-white" size="lg">
                  Review and Confirm
                </Button>
              </CardFooter>
            </Card>
            <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-muted-foreground">
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
  )
}
