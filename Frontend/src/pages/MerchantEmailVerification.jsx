import React, { useContext, useState } from "react";
import { Button, Input, Form, Card } from "antd";
import {
  sendVerificationMerchantEmailApi,
  verifyMerchantEmailOtp,
} from "@/lib/api/authApi";
import { MESSAGE_API_CONTEXT, USER_PROFILE_CONTEXT } from "@/contexts";
import { useErrorLogger } from "@/hooks";
import logo from "@/assets/Logo.svg";
import { Mail, Shield, RefreshCw, CheckCircle } from "lucide-react";

export default function MerchantEmailVerification() {
  const [form] = Form.useForm();
  const { userProfile, setUserProfile } = useContext(USER_PROFILE_CONTEXT);
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const errorLogger = useErrorLogger();

  const handleVerify = async (values) => {
    setLoading(true);
    try {
      const result = await verifyMerchantEmailOtp(
        userProfile.email,
        values.verificationCode,
        errorLogger
      );

      if (result) {
        messageApi.success("Email verified successfully!");
        // Update the user profile with verified email
        setUserProfile({
          ...userProfile,
          emailVerifiedAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      errorLogger("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResendLoading(true);
    try {
      await sendVerificationMerchantEmailApi(userProfile.email, errorLogger);

      messageApi.success("Verification code has been sent to your email");
      setCountdown(60);

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      errorLogger("Failed to resend verification code");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-Primary/5 to-transparent flex flex-col justify-center items-center p-4">
      <Card className="w-full max-w-md bg-white shadow-xl rounded-2xl border border-gray-100">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <img src={logo} alt="9ja Markets Logo" className="h-16" />
          </div>
        </div>

        <div className="mb-8 text-center">
          <h2 className="font-bold text-2xl text-gray-800 mb-3">
            Verify Your Email
          </h2>
          <div className="flex items-center justify-center gap-2 text-gray-600 bg-Primary/5 py-2 px-4 rounded-lg">
            <Mail className="w-5 h-5 text-Primary" />
            <p className="text-sm">{userProfile?.email}</p>
          </div>
        </div>

        <Form
          form={form}
          onFinish={handleVerify}
          layout="vertical"
          className="space-y-6"
        >
          <div className="relative">
            <Form.Item
              name="verificationCode"
              rules={[
                {
                  required: true,
                  message: "Please enter the verification code",
                },
              ]}
            >
              <Input
                placeholder="verification code sent to your mail"
                size="large"
                className="h-12 text-sm rounded-xl border-gray-200 hover:border-Primary/50 focus:border-Primary transition-colors"
                maxLength={6}
              />
            </Form.Item>
            {loading && (
              <CheckCircle className="absolute right-3 top-3 w-6 h-6 text-Primary" />
            )}
          </div>

          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full h-12 text-base font-medium rounded-xl bg-Primary hover:bg-Primary/90 border-none shadow-lg shadow-Primary/20 hover:shadow-xl hover:shadow-Primary/30 transition-all"
            >
              Verify Email
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-8 text-center">
          <p className="mb-3 text-gray-600">
            Did not receive a code?{" "}
            <span className="text-Primary underline cursor-pointer">
              Check your spam folder
            </span>
          </p>
          <Button
            type="link"
            onClick={handleResendCode}
            disabled={countdown > 0 || resendLoading}
            loading={resendLoading}
            className="flex items-center justify-center gap-2 mx-auto hover:text-Primary/80"
            icon={countdown > 0 && <RefreshCw className="w-4 h-4 animate-spin" />}
          >
            {countdown > 0
              ? `Resend code in ${countdown}s`
              : "Resend verification code"}
          </Button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-3 justify-center text-gray-500 text-sm">
            <Shield className="w-4 h-4" />
            <p>Need help? Contact our support team</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
