import React, { useContext, useState } from "react";
import { Button, Input, Form, message, Card, Spin } from "antd";
import {
  sendVerificationMerchantEmailApi,
  verifyMerchantEmailOtp,
} from "@/lib/api/authApi";
import { MESSAGE_API_CONTEXT, USER_PROFILE_CONTEXT } from "@/contexts";
import { useErrorLogger } from "@/hooks";
import logo from "@/assets/Logo.svg";

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
    <div className="flex flex-col justify-center items-center p-4 min-h-screen">
      <Card
        className="bg-slate-100 shadow-lg p-4 rounded-xl w-full max-w-md"
        title={
          <div className="flex justify-center">
            <img src={logo} alt="9ja Markets Logo" className="mb-4 h-12" />
          </div>
        }
      >
        <div className="mb-6 text-center">
          <h2 className="font-bold text-2xl text-gray-800">
            Verify Your Email
          </h2>
          <p className="mt-2 text-gray-600">
            Please check your email ({userProfile?.email}) and enter the
            verification code below.
          </p>
        </div>

        <Form form={form} onFinish={handleVerify} layout="vertical">
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
              placeholder="Enter verification code"
              size="large"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="rounded-md w-full h-12 font-medium text-base"
            >
              Verify Email
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-4 text-center">
          <p className="mb-2 text-gray-600">Didn't receive a code?</p>
          <Button
            type="link"
            onClick={handleResendCode}
            disabled={countdown > 0 || resendLoading}
            loading={resendLoading}
          >
            {countdown > 0
              ? `Resend code in ${countdown}s`
              : "Resend verification code"}
          </Button>
        </div>
      </Card>

      <div className="mt-6 text-center text-gray-500 text-sm">
        <p>If you're having trouble, please contact our support team.</p>
      </div>
    </div>
  );
}
