import React, { useState } from "react";
import { Modal } from "antd";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { MessageCircleWarning } from "lucide-react";
import { useEffect } from "react";
import { useContext } from "react";
import { MESSAGE_API_CONTEXT } from "@/contexts";

export default function OTPModal({
  title,
  open,
  setOpen,
  verifyEmail,
  sendVerificationEmail,
}) {
  const [otpValue, setOtpValue] = useState("");
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  const [sendSnooze, setSendSnooze] = useState(false);
  useEffect(() => {
    if (otpValue) {
      verifyEmail(otpValue);
    }
  }, [otpValue]);

  return (
    <Modal
      title={title}
      open={open}
      onOk={() => {
        if (otpValue.length === 6) {
          verifyEmail(otpValue);
        } else {
          if (sendSnooze) {
            messageApi.error("OTP already sent. Please wait for a while. 30s");
            return;
          }
          sendVerificationEmail();
          setSendSnooze(true);
          setTimeout(() => {
            setSendSnooze(false);
          }, 30000);
        }
      }}
      onCancel={() => {
        setOpen(false);
      }}
      okText={otpValue.length === 6 ? "Confirm" : "Resend"}
      cancelText="Cancel"
      okButtonProps={otpValue.length === 6 && { danger: true }}
      cancelButtonProps={{ className: "cancel-button" }}
    >
      <div className="">
        <p className="flex my-4 font-bold text-lg">
          <MessageCircleWarning size={20} className="mr-2 text-red-700" />
          <span>
            You will be logged out and must log in with the new password.
          </span>
        </p>
        <div className="flex flex-col justify-center items-center my-10">
          <p className="mb-3 font-bold text-base underline tracking-wide">
            Confirm the OTP sent to your new email.
          </p>
          <InputOTP
            maxLength={6}
            onComplete={(value) => {
              setOtpValue(value);
            }}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>
    </Modal>
  );
}
