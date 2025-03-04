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
import { AlertCircle } from "lucide-react";
import { USER_PROFILE_CONTEXT } from "@/contexts";
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
  function quickLogout() {
    // This is only useful when the user is already signed in
    setUserProfile(null);
    deleteAuth();
    navigate("/");
  }
  const sendVerificationEmail = async () => {
    const response = await sendForgetPasswordApi(email, (message) => {
      messageApi.error("Failed to send Verification");
      console.error(message);
    });
    if (response) {
      console.log(response);
      messageApi.success("Email Verification Sent");
      setOTPModalOpen(true);
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
  return (
    <div className="w-full h-screen">
      <OTPModal
        title="ENTER OTP"
        open={OTPModalOpen}
        setOpen={(open) => setOTPModalOpen(open)}
        verifyEmail={storeOTP}
        sendVerificationEmail={sendVerificationEmail}
      />
      <div className="flex justify-center items-center h-full">
        <Card className="mx-2 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
          {!resetCode ? (
            <>
              <CardHeader>
                <CardTitle className="text-Primary">Forgot Password</CardTitle>
                <CardDescription>
                  Enter your email to reset your password
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="items-center gap-4 grid w-full">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  className="bg-[#F8912D] hover:bg-Primary w-full"
                  onClick={sendVerificationEmail}
                >
                  Reset Password
                </Button>
              </CardFooter>
            </>
          ) : (
            <>
              <CardHeader>
                <CardTitle className="text-[#236C13]">
                  Change Password
                </CardTitle>
                <CardDescription>
                  Enter your old and new password
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleChangePassword}>
                  <div className="items-center gap-4 grid w-full">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="confirmPassword">
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col">
                <div className="mb-4 w-full text-center">
                  {/* resend verification */}
                  <a
                    href="#"
                    className="text-[#236C13] text-sm hover:text-[#21CA1B]"
                    onClick={(e) => {
                      e.preventDefault();
                      sendVerificationEmail();
                    }}
                  >
                    Didn't receive the reset link ?
                    <b className="ml-2 font-semibold">Resend</b>
                  </a>
                </div>
                {error && (
                  <div className="flex items-start bg-red-100 mb-4 p-2 rounded w-full text-red-700">
                    <AlertCircle className="mr-2" size={30} />
                    {error}
                  </div>
                )}
                <Button
                  className="bg-[#F8912D] hover:bg-[#236C13] w-full"
                  onClick={handleChangePassword}
                >
                  Change Password
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

export default ForgetPassword;
