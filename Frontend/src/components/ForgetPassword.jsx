import React, { useState, useContext } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  resetPasswordCustomerApi,
  sendForgetPasswordCustomerApi,
  sendForgetPasswordMerchantApi,
  resetPasswordMerchantApi,
} from "@/lib/api/authApi";
import { MESSAGE_API_CONTEXT } from "@/contexts";
import OTPModal from "@/componets-utils/OTPModal";
import { useNavigate } from "react-router-dom";
import { deleteAuth, isStrongPassword } from "@/lib/util";
import { AlertCircle, ArrowLeft, Mail, Loader2 } from "lucide-react";
import { USER_PROFILE_CONTEXT } from "@/contexts";
import { toast } from "sonner";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  const [OTPModalOpen, setOTPModalOpen] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [resetCode, setResetCode] = useState("");
  const { userProfile, setUserProfile } = useContext(USER_PROFILE_CONTEXT);
  const navigate = useNavigate();
  const sendForgetPasswordApi =
    userProfile.userType === "merchant"
      ? sendForgetPasswordMerchantApi
      : sendForgetPasswordCustomerApi;

  const resetPasswordApi =
    userProfile.userType === "merchant"
      ? resetPasswordMerchantApi
      : resetPasswordCustomerApi;

  const [isLoading, setIsLoading] = useState(false);

  function quickLogout() {
    // This is only useful when the user is already signed in
    setUserProfile(null);
    deleteAuth();
    navigate("/");
  }

  const sendVerificationEmail = async () => {
    setIsLoading(true);
    try {
      const response = await sendForgetPasswordApi(email, (message) => {
        messageApi.error("Failed to send Verification");
        console.error(message);
      });
      if (response) {
        console.log(response);
        messageApi.success("Email Verification Sent");
        setOTPModalOpen(true);
      }
    } catch (error) {
      toast.error("Failed to send reset link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const storeOTP = (otp) => {
    setResetCode(otp);
    setOTPModalOpen(false);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!resetCode) {
      setError("Ensure OTP is correct ");
      return;
    } else if (!isStrongPassword(newPassword)) {
      return setError(
        "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character"
      );
    } else if (newPassword !== confirmPassword) {
      return setError("Confirm Password must match");
    }
    const errorLogger = (msg) => {
      setError(msg);
      console.error(msg);
    };
    const payload = { email, resetCode, newPassword };
    const response = await resetPasswordApi(payload, errorLogger);
    if (!response) return;
    messageApi.success("Password Changed Successfully");
    quickLogout();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await sendVerificationEmail();
    } catch (error) {
      toast.error("Failed to send reset link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-site-bg/35 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="flex items-center text-gray-600 hover:text-Primary"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-Primary mb-2">
            Forgot Password?
          </h2>
          <p className="text-gray-600">
            No worries! Enter your email and we'll send you reset instructions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="pl-10 py-6"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-Primary hover:bg-Primary/90 text-white py-6"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending Reset Link...
              </>
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>

        <div className="text-center text-sm">
          <p className="text-gray-600">
            Remember your password?{" "}
            <Button
              variant="link"
              className="text-Primary hover:text-Primary/90 p-0"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
