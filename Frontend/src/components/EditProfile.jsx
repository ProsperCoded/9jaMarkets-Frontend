import React from "react";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { Pencil, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card } from "./ui/card";
import { Trash } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MapPin } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/config";
import {
  MALLS_DATA_CONTEXT,
  MARKET_DATA_CONTEXT,
  MESSAGE_API_CONTEXT,
  USER_PROFILE_CONTEXT,
} from "@/contexts";
import {
  updateCustomerProfileApi,
  updateMerchantProfileApi,
} from "@/lib/api/serviceApi";
import { Popconfirm } from "antd";
import { ConfigProvider } from "antd";
import OTPModal from "@/componets-utils/OTPModal";
import {
  sendVerificationCustomerEmailApi,
  verifyEmailOtp,
} from "@/lib/api/authApi";
import { useEffect } from "react";

export default function EditProfile() {
  const messageApi = useContext(MESSAGE_API_CONTEXT);

  const { userProfile: profile, setUserProfile: setProfile } =
    useContext(USER_PROFILE_CONTEXT);
  const isMerchant = profile.userType === "merchant";
  const errorLogger = (message) => {
    messageApi.error("Failed to update the field ");
    console.error(message);
  };
  const updateProfileApi = isMerchant
    ? updateMerchantProfileApi
    : updateCustomerProfileApi;
  const handleUpdate = async (field, value) => {
    // Simulate API call

    const payload = { [field]: value };
    const updatedProfile = await updateProfileApi(
      payload,
      errorLogger,
      (msg) => {
        console.log(`Updated ${field} successfully`, msg);
      }
    );
    if (!updatedProfile) return;
    console.log({ updatedData: updatedProfile });
    messageApi.success(`Updated ${field} successfully`);
    setProfile(updatedProfile);
  };

  const handleAddAddress = async () => {
    const defaultAddress = {
      name: "",
      address: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      postalCode: "",
    };
    let newAddresses = [...(profile.addresses || []), defaultAddress];
    setProfile({ ...profile, addresses: newAddresses });
  };
  const handleUpdateAddress = async (index, address) => {
    const updatedAddresses = profile.addresses?.map((a, i) =>
      i === index ? address : a
    );
    console.log({ updatedAddresses });
    const extracted = updatedAddresses.map(
      ({ name, address, city, state, country, zipCode, postalCode }) => ({
        name,
        address,
        city,
        state,
        country,
        zipCode,
        postalCode,
      })
    );
    const updatedProfile = await updateProfileApi(
      { addresses: extracted },
      errorLogger,
      (msg) => {
        console.log(`Updated address successfully`, msg);
      }
    );
    if (!updatedProfile) return;
    setProfile(updatedProfile);
  };

  const handleDeleteAddress = async (index) => {
    const filteredAddresses = profile.addresses?.filter((_, i) => i !== index);
    const updatedProfile = await updateProfileApi(
      { addresses: filteredAddresses },
      errorLogger,
      (msg) => {
        console.log(`Deleted address successfully`, msg);
      }
    );
    if (!updatedProfile) return;
    setProfile(updatedProfile);
  };

  return (
    <div>
      <h1 className="mt-4 mb-8 font-extrabold text-5xl text-center text-Primary">
        EDIT PROFILE
      </h1>
      <div className="items-start gap-10 lg:gap-5 grid grid-cols-1 lg:grid-cols-2">
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
              {isMerchant ? (
                <div>
                  <ProfileField
                    label="Brand Name"
                    value={profile.brandName}
                    onUpdate={(value) => handleUpdate("brandName", value)}
                    required
                  />
                </div>
              ) : (
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
              )}
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
              <div className="gap-4 grid grid-cols-2">
                {!isMerchant && (
                  <ProfileField
                    label="Date of Birth"
                    value={profile.dateOfBirth || ""}
                    onUpdate={(value) => handleUpdate("dateOfBirth", value)}
                    type="date"
                  />
                )}
                <div className="flex flex-col">
                  <label className="mb-3 font-medium text-muted-foreground text-sm">
                    Password
                  </label>

                  <Link
                    to="/forget-password"
                    className="font-semibold text-Primary hover:underline"
                  >
                    Change Password
                  </Link>
                </div>
              </div>
              <div>
                <MarketSelect
                  id={profile.marketId}
                  onUpdate={(value) => handleUpdate("marketName", value)}
                />
              </div>
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

function MarketSelect({ onUpdate, id }) {
  const { marketsData } = useContext(MARKET_DATA_CONTEXT);
  const { mallsData } = useContext(MALLS_DATA_CONTEXT);
  const availableMarkets = marketsData.map((market) => market.name);
  const [marketName, setMarketId] = useState(
    marketsData.find((market) => market.id === id)?.name || ""
  );
  const [mallId, setMallId] = useState("");
  const availableMalls = mallsData.map((mall) => mall.name);
  useEffect(() => {
    setMarketId(marketsData.find((market) => market.id === id)?.name || "");
  }, [marketsData]);
  return (
    <div className="flex items-end gap-4">
      <div>
        <label className="font-medium text-muted-foreground text-sm">
          Affiliation:
        </label>
        <Tabs defaultValue="market" className="w-full">
          <TabsList>
            <TabsTrigger value="market"> Market</TabsTrigger>
            <TabsTrigger value="malls"> Malls</TabsTrigger>
          </TabsList>
          <TabsContent value="market" className="w-full">
            <div>
              <label
                htmlFor="marketName"
                className="block font-medium text-red-400 text-sm"
              >
                * Choose this option of you are a market merchant
              </label>
              <select
                id="marketName"
                value={marketName}
                onChange={(e) => setMarketId(e.target.value)}
                className="border-gray-300 px-4 py-2 border rounded-md w-full"
                required
              >
                <option>-- Select Market --</option>
                {availableMarkets.map((market, ind) => {
                  return (
                    <option
                      key={ind}
                      value={market}
                      selected={marketName === market}
                    >
                      {market}
                    </option>
                  );
                })}
              </select>
            </div>
          </TabsContent>
          <TabsContent value="malls">
            <div>
              <label
                htmlFor="mallName"
                className="block font-medium text-red-400 text-sm"
              >
                * Choose this option of you are a mall merchant
              </label>
              <select
                id="mallName"
                value={mallId}
                onChange={(e) => setMallId(e.target.value)}
                className="border-gray-300 px-4 py-2 border rounded-md w-full"
                required
              >
                <option selected>-- Select Mall --</option>
                {availableMalls.map((mall, ind) => {
                  return (
                    <option key={ind} value={mall}>
                      {mall}
                    </option>
                  );
                })}
              </select>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <Button
          variant="outline"
          onClick={() => onUpdate(marketName || mallId)}
        >
          Update
        </Button>
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
  const [confirmedOTP2, setConfirmedOTP2] = useState(false);
  const [OTP2ModalOpen, setOTP2ModalOpen] = useState(false);
  const [OTPModalOpen, setOTPModalOpen] = useState(false);
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  // const [popConfirmOpen, setPopConfirmOpen] = useState(false);
  const sendVerificationEmail = async () => {
    const email = value;
    const response = await sendVerificationCustomerEmailApi(
      email,
      (message) => {
        messageApi.error("Failed to send Verification");
        console.error(message);
      }
    );
    if (response) {
      console.log(response);
      messageApi.success("Email Verification Sent");
      setOTPModalOpen(true);
    }
  };
  const sendVerificationEmail2 = async () => {
    if (!editValue) return;
    const email = editValue;
    const response = await sendVerificationCustomerEmailApi(
      email,
      (message) => {
        messageApi.error("Failed to send Verification");
        console.error(message);
      }
    );
    if (response) {
      console.log(response);
      messageApi.success("Email Verification Sent");
      setOTP2ModalOpen(true);
    }
  };
  const handleUpdate = async () => {
    if (!editValue && required) return;
    setIsLoading(true);
    try {
      // update email field
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
      <OTPModal
        title="VERIFY EMAIL"
        open={OTPModalOpen}
        setOpen={(open) => setOTPModalOpen(open)}
        verifyEmail={async (otp) => {
          const email = value;
          const response = await verifyEmailOtp(email, otp, (message) => {
            messageApi.error("Invalid Token");
            console.error(message);
          });
          if (response) {
            messageApi.success("Email Verified");
            setOTPModalOpen(false);
            setConfirmedOTP(true);
            setIsEditing(true);
          }
        }}
        sendVerificationEmail={sendVerificationEmail}
      />
      <OTPModal
        title="VERIFY NEW EMAIL"
        open={OTP2ModalOpen}
        setOpen={(open) => setOTP2ModalOpen(open)}
        verifyEmail={async (otp) => {
          const email = editValue;
          const response = await verifyEmailOtp(email, otp, (message) => {
            messageApi.error("Invalid Token");
            console.error(message);
          });
          if (response) {
            messageApi.success("New Email Verified");
            setOTP2ModalOpen(false);
            setConfirmedOTP2(true);
            handleUpdate();
          }
        }}
        sendVerificationEmail={sendVerificationEmail2}
      />
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
              onConfirm={() => sendVerificationEmail()}
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
              onClick={sendVerificationEmail2}
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
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
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
