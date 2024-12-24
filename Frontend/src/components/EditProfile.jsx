import React from "react";
import { useState, useContext } from "react";
import { Pencil, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card } from "./ui/card";
import { MapPin } from "lucide-react";
import { MESSAGE_API_CONTEXT, USER_PROFILE_CONTEXT } from "@/contexts";
import { updateCustomerProfileApi } from "@/lib/api/serviceApi";
import { Popconfirm } from "antd";
import { ConfigProvider } from "antd";
import OTPModal from "@/componets-utils/OTPModal";
import { sendVerificationCustomerEmailApi } from "@/lib/api/authApi";

export default function EditProfile() {
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  const { userProfile: profile, setUserProfile: setProfile } =
    useContext(USER_PROFILE_CONTEXT);
  const errorLogger = (message) => {
    messageApi.error("Failed to update the field ");
    console.error(message);
  };
  const handleUpdate = async (field, value) => {
    // Simulate API call
    const payload = { [field]: value };
    const updatedData = await updateCustomerProfileApi(
      payload,
      errorLogger,
      (msg) => {
        console.log(`Updated ${field} successfully`, msg);
      }
    );
    if (!updatedData) return;
    console.log({ updatedData });
    setProfile(updatedData);
  };

  const handleAddAddress = () => {
    setProfile((prev) => ({
      ...prev,
      addresses: [
        ...(prev.addresses || []),
        {
          address: "",
          city: "",
          state: "",
          country: "",
        },
      ],
    }));
  };
  const handleUpdateAddress = async (index, address) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setProfile((prev) => ({
      ...prev,
      addresses: prev.addresses?.map((a, i) => (i === index ? address : a)),
    }));
  };

  const handleDeleteAddress = async (index) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setProfile((prev) => ({
      ...prev,
      addresses: prev.addresses?.filter((_, i) => i !== index),
    }));
  };

  return (
    <div>
      <h1 className="mt-4 mb-8 font-extrabold text-5xl text-center text-Primary">
        EDIT PROFILE
      </h1>
      <div className="items-start gap-5 grid grid-cols-2">
        <div className="gap-6 grid">
          <div className="gap-4 grid">
            <h2 className="font-semibold text-xl">Personal Information</h2>
            <div className="gap-4 grid bg-card shadow p-4 rounded-lg">
              <EmailField
                label="Email"
                value={profile.email}
                onUpdate={(value) => handleUpdate("email", value)}
                type="email"
                required
              />
              {/* <ProfileField
                label="Password"
                value={profile.password}
                onUpdate={(value) => handleUpdate("password", value)}
                type="password"
                required
              /> */}
              <div className="gap-4 grid grid-cols-2">
                <ProfileField
                  label="First Name"
                  value={profile.firstName}
                  onUpdate={(value) => handleUpdate("firstName", value)}
                  required
                />
                <ProfileField
                  label="Last Name"
                  value={profile.lastName}
                  onUpdate={(value) => handleUpdate("lastName", value)}
                  required
                />
              </div>
              <div className="gap-4 grid grid-cols-2">
                <ProfileField
                  label="Phone 1"
                  value={profile.phoneNumbers[0].number}
                  onUpdate={(value) =>
                    handleUpdate("phoneNumbers", [
                      value,
                      profile.phoneNumbers[1].number,
                    ])
                  }
                  required
                />
                <ProfileField
                  label="Phone 2"
                  value={profile.phoneNumbers[1].number}
                  onUpdate={(value) =>
                    handleUpdate("phoneNumbers", [
                      profile.phoneNumbers[0].number,
                      value,
                    ])
                  }
                  required
                />
              </div>
              <ProfileField
                label="Date of Birth"
                value={profile.dateOfBirth || ""}
                onUpdate={(value) => handleUpdate("dateOfBirth", value)}
                type="date"
              />
            </div>
          </div>
        </div>
        <div className="gap-4 grid">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl">Addresses</h2>
            {(!profile.addresses || profile.addresses.length < 2) && (
              <Button
                onClick={handleAddAddress}
                className="bg-[#236C13] hover:bg-[#236C13]/90"
              >
                <Plus className="mr-2 w-4 h-4" />
                Add Address
              </Button>
            )}
          </div>
          <div className="gap-4 grid">
            {profile.addresses?.map((address, index) => (
              <AddressForm
                key={index}
                address={address}
                onUpdate={(updatedAddress) =>
                  handleUpdateAddress(index, updatedAddress)
                }
                onDelete={() => handleDeleteAddress(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function EmailField({
  label,
  value,
  onUpdate,
  type = "text",
  required = false,
  className,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmedOTP, setConfirmedOTP] = useState(false);
  const [OTPModalOpen, setOTPMOdalOpen] = useState(false);
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  const errorLogger = (message) => {
    messageApi.error("Failed to update the field ");
    console.error(message);
  };
  // const [popConfirmOpen, setPopConfirmOpen] = useState(false);
  const sendVerification = async () => {
    const email = value;
    const response = await sendVerificationCustomerEmailApi(email, errorLogger);
    if (response) {
      console.log(response);
      messageApi.success("Email Verification Sent");
      // setConfirmedOTP(true);
      setOTPMOdalOpen(true);
    }
  };
  const handleUpdate = async () => {
    if (!editValue && required) return;

    setIsLoading(true);
    try {
      await onUpdate(editValue);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      <OTPModal open={OTPModalOpen} setOpen={(open) => setOTPMOdalOpen(open)} />
      <div className="flex justify-between items-center">
        <label className="font-medium text-muted-foreground text-sm">
          {label}
        </label>
        {!isEditing ? (
          <ConfigProvider
            theme={{
              components: {
                Popconfirm: {},
              },
            }}
          >
            <Popconfirm
              title="Are you sure you want to change your email?"
              description="New Email will Serve as New Identification "
              onConfirm={() => sendVerification()}
              // onCancel={() => setPopConfirmOpen(false)}
              // open={popConfirmOpen}
              okText="Change Email"
              okButtonProps={{ danger: true }}
              cancelButtonProps={{ type: "primary" }}
              cancelText="Cancel"
            >
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8"
                onClick={() => {
                  // setPopConfirmOpen(true);
                }}
              >
                <Pencil className="w-4 h-4 text-[#F8912D]" />
              </Button>
            </Popconfirm>
          </ConfigProvider>
        ) : (
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleUpdate}
              disabled={isLoading}
              className="w-8 h-8"
            >
              <Check className="w-4 h-4 text-[#21CA1B]" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsEditing(false);
                setEditValue(value);
              }}
              disabled={isLoading}
              className="w-8 h-8"
            >
              <X className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        )}
      </div>
      {isEditing ? (
        <Input
          type={type}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="border-[#236C13] focus-visible:ring-[#21CA1B]"
          required={required}
          disabled={isLoading}
        />
      ) : (
        <p className="text-foreground">{value}</p>
      )}
    </div>
  );
}
export function ProfileField({
  label,
  value,
  onUpdate,
  type = "text",
  required = false,
  className,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async () => {
    if (!editValue && required) return;

    setIsLoading(true);
    try {
      await onUpdate(editValue);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      <div className="flex justify-between items-center">
        <label className="font-medium text-muted-foreground text-sm">
          {label}
        </label>
        {!isEditing ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(true)}
            className="w-8 h-8"
          >
            <Pencil className="w-4 h-4 text-[#F8912D]" />
          </Button>
        ) : (
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleUpdate}
              disabled={isLoading}
              className="w-8 h-8"
            >
              <Check className="w-4 h-4 text-[#21CA1B]" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsEditing(false);
                setEditValue(value);
              }}
              disabled={isLoading}
              className="w-8 h-8"
            >
              <X className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        )}
      </div>
      {isEditing ? (
        <Input
          type={type}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="border-[#236C13] focus-visible:ring-[#21CA1B]"
          required={required}
          disabled={isLoading}
        />
      ) : (
        <p className="text-foreground">
          {type === "password" ? "••••••••" : value}
        </p>
      )}
    </div>
  );
}

export function PhoneNumberField({ phoneNumbers, onUpdate }) {
  const [numbers, setNumbers] = useState(phoneNumbers);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = () => {
    if (numbers.length < 2) {
      setNumbers([...numbers, ""]);
    }
  };

  const handleRemove = (index) => {
    setNumbers(numbers.filter((_, i) => i !== index));
  };

  const handleChange = (index, value) => {
    const newNumbers = [...numbers];
    newNumbers[index] = value;
    setNumbers(newNumbers);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await onUpdate(numbers.filter((n) => n));
    } catch (error) {
      console.error("Failed to update phone numbers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="space-y-4 p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Phone className="w-5 h-5 text-[#F8912D]" />
          <h3 className="font-medium">Phone Numbers</h3>
        </div>
        {numbers.length < 2 && (
          <Button
            variant="outline"
            onClick={handleAdd}
            disabled={isLoading}
            className="border-[#236C13] hover:bg-[#21CA1B]/10"
          >
            <Plus className="mr-2 w-4 h-4" />
            Add Phone
          </Button>
        )}
      </div>

      <div className="space-y-2">
        {numbers.map((number, index) => (
          <div key={index} className="flex space-x-2">
            <Input
              type="tel"
              value={number}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder="Phone number"
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleRemove(index)}
              disabled={isLoading}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button
        onClick={handleSubmit}
        disabled={isLoading}
        className="bg-[#236C13] hover:bg-[#236C13]/90 w-full"
      >
        Save Phone Numbers
      </Button>
    </Card>
  );
}

export function AddressForm({ address, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(address);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onUpdate(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update address:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="space-y-4 p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-[#F8912D]" />
          <h3 className="font-medium">Address</h3>
        </div>
        <div className="space-x-2">
          {!isEditing && (
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="border-[#236C13] hover:bg-[#21CA1B]/10"
            >
              Edit
            </Button>
          )}
          <Button variant="destructive" onClick={onDelete} disabled={isLoading}>
            Delete
          </Button>
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Street Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            required
          />
          <div className="gap-4 grid grid-cols-2">
            <Input
              placeholder="City"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              required
            />
            <Input
              placeholder="State"
              value={formData.state}
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
              }
              required
            />
          </div>
          <div className="gap-4 grid grid-cols-2">
            <Input
              placeholder="Country"
              value={formData.country}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
              required
            />
            <Input
              placeholder="ZIP/Postal Code"
              value={formData.zipCode || formData.postalCode || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  zipCode: e.target.value,
                  postalCode: e.target.value,
                })
              }
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setIsEditing(false);
                setFormData(address);
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#236C13] hover:bg-[#236C13]/90"
            >
              Save
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-2">
          <p>{address.address}</p>
          <p>{`${address.city}, ${address.state}`}</p>
          <p>{address.country}</p>
          {(address.zipCode || address.postalCode) && (
            <p>{address.zipCode || address.postalCode}</p>
          )}
        </div>
      )}
    </Card>
  );
}
