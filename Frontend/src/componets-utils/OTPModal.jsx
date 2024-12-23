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

export default function OTPModal({ open, setOpen, setConfirmed }) {
  const [otpValue, setOtpValue] = useState("");
  useEffect(() => {
    console.log({ otpValue });
  }, [otpValue]);

  return (
    <Modal
      title="CONFIRM OTP"
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => {
        setOpen(false);
      }}
      okText="Confirm"
      cancelText="Cancel"
      okButtonProps={{ danger: true }}
      cancelButtonProps={{ className: "cancel-button" }}
    >
      <div className="">
        <p className="flex my-4 font-bold text-lg">
          <MessageCircleWarning size={20} className="mr-2 text-red-700" />
          <span>
            You will be logged out and must log in with the new email.
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
