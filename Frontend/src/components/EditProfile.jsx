import React from "react";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { Pencil, Check, X, Plus, MapPin, Phone, Trash } from "lucide-react";
import PropTypes from 'prop-types';
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "./ui/card";
import { MESSAGE_API_CONTEXT, USER_PROFILE_CONTEXT, LOGOUT_MODAL_CONTEXT } from "@/contexts";
import { updateCustomerProfileApi } from "@/lib/api/serviceApi";
import { Popconfirm, ConfigProvider } from "antd";
import OTPModal from "@/componets-utils/OTPModal";
import {
  sendVerificationCustomerEmailApi,
  verifyEmailOtp,
} from "@/lib/api/authApi";

// Add PropTypes for form components
const fieldPropTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
};

const addressPropTypes = {
  address: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    country: PropTypes.string,
    zipCode: PropTypes.string,
    postalCode: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default function EditProfile() {
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  const { userProfile: profile, setUserProfile: setProfile } =
    useContext(USER_PROFILE_CONTEXT);
  const { setLogoutOpen } = useContext(LOGOUT_MODAL_CONTEXT);
  const errorLogger = (message) => {
    messageApi.error("Failed to update the field ");
    console.error(message);
  };
  const handleUpdate = async (field, value) => {
    // Simulate API call
    const payload = { [field]: value };
    const updatedProfile = await updateCustomerProfileApi(
      payload,
      errorLogger,
      (msg) => {
        console.log(`Updated ${field} successfully`, msg);
      }
    );
    if (!updatedProfile) return;
    console.log({ updatedData: updatedProfile });
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
    const updatedProfile = await updateCustomerProfileApi(
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
    const updatedProfile = await updateCustomerProfileApi(
      { addresses: filteredAddresses },
      errorLogger,
      (msg) => {
        console.log(`Deleted address successfully`, msg);
      }
    );
    if (!updatedProfile) return;
    setProfile(updatedProfile);
  };

  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <div className="bg-Primary/5 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Profile Settings
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-1 bg-white rounded-lg shadow-sm p-2 flex flex-col h-[calc(100vh-120px)]">
              <button className="w-full text-left px-4 py-2 rounded-md bg-Primary/5 text-Primary font-medium">
                Personal Information
              </button>
              <button className="w-full text-left px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50">
                Security
              </button>
              <button className="w-full text-left px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50">
                Notifications
              </button>
              
              {/* Logout button at bottom */}
              <div className="mt-auto">
                <button 
                  onClick={() => setLogoutOpen(true)}
                  className="w-full text-left px-4 py-2 rounded-md text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Form Sections */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information Card */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
                <p className="mt-1 text-sm text-gray-600">
                  Update your personal details and contact information
                </p>
              </div>
              <div className="px-6 py-6 space-y-6">
                <EmailField
                  label="Email Address"
                  value={profile.email}
                  onUpdate={(value) => handleUpdate("email", value)}
                  type="email"
                  required
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <ProfileField
                    label="Primary Phone"
                    value={profile.phoneNumbers[0].number}
                    onUpdate={(value) =>
                      handleUpdate("phoneNumbers", [value, profile.phoneNumbers[1].number])
                    }
                    required
                  />
                  <ProfileField
                    label="Secondary Phone"
                    value={profile.phoneNumbers[1].number}
                    onUpdate={(value) =>
                      handleUpdate("phoneNumbers", [profile.phoneNumbers[0].number, value])
                    }
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <ProfileField
                    label="Date of Birth"
                    value={profile.dateOfBirth || ""}
                    onUpdate={(value) => handleUpdate("dateOfBirth", value)}
                    type="date"
                  />
                  <div className="flex flex-col justify-end">
                    <Link
                      to="/forget-password"
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-Primary hover:bg-Primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-Primary"
                    >
                      Change Password
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Card */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                <h2 className="text-lg font-medium text-gray-900">Security</h2>
                <p className="mt-1 text-sm text-gray-600">
                  Manage your account security settings
                </p>
              </div>
              <div className="px-6 py-6 space-y-6">
                <div className="flex flex-col space-y-4">
                  <Link
                    to="/forget-password"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-Primary hover:bg-Primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-Primary w-full sm:w-auto"
                  >
                    Change Password
                  </Link>
                  
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Danger Zone</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button
                      onClick={() => setDeleteAccountOpen(true)}
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 w-full sm:w-auto"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Addresses Card */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Addresses</h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Manage your delivery addresses
                  </p>
                </div>
                {(!profile.addresses || profile.addresses.length < 2) && (
                  <Button
                    onClick={handleAddAddress}
                    className="bg-Primary hover:bg-Primary/90 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Address
                  </Button>
                )}
              </div>
              <div className="p-6 space-y-6">
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
      </div>
    </div>
  );
}

// Add PropTypes to components
EmailField.propTypes = fieldPropTypes;
ProfileField.propTypes = fieldPropTypes;
PhoneNumberField.propTypes = {
  phoneNumbers: PropTypes.arrayOf(PropTypes.string).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
AddressForm.propTypes = addressPropTypes;

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
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <MapPin className="w-5 h-5 text-Primary" />
          <h3 className="font-medium text-gray-900">
            {address.name || "New Address"}
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          {!isEditing ? (
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="border-Primary text-Primary hover:bg-Primary/5"
            >
              Edit
            </Button>
          ) : null}
          <Button 
            variant="ghost" 
            onClick={onDelete} 
            disabled={isLoading}
            className="text-red-600 hover:bg-red-50 hover:text-red-700"
          >
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
    </div>
  );
}
