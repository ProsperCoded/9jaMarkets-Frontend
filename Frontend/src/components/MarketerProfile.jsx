import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  Skeleton,
  Typography,
  Descriptions,
  Badge,
  Tag,
  Button,
  Spin,
  Alert,
  Image,
} from "antd";
import { getCustomerMarketerProfileApi } from "@/lib/api/customerMarketerApi";
import { MESSAGE_API_CONTEXT, USER_PROFILE_CONTEXT } from "@/contexts";
import {
  Copy,
  UserCheck,
  Clock,
  Share2,
  AlertCircle,
  Link as LinkIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

const MarketerProfile = () => {
  const [marketerProfile, setMarketerProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  const { userProfile } = useContext(USER_PROFILE_CONTEXT);
  const navigate = useNavigate();

  // Redirect if not a marketer
  useEffect(() => {
    if (userProfile && userProfile.role !== "MARKETER") {
      messageApi.error("You don't have access to this page");
      navigate("/dashboard/overview");
    }
  }, [userProfile, navigate, messageApi]);

  useEffect(() => {
    const fetchMarketerProfile = async () => {
      setLoading(true);
      try {
        const data = await getCustomerMarketerProfileApi((error) => {
          messageApi.error(error);
        });
        setMarketerProfile(data);
      } catch (error) {
        console.error("Error fetching marketer profile:", error);
        messageApi.error("Failed to fetch marketer profile");
      } finally {
        setLoading(false);
      }
    };

    fetchMarketerProfile();
  }, [messageApi]);

  const copyReferralLink = () => {
    if (!marketerProfile?.referrerCode) return;

    const referralLink = `${window.location.origin}/merchant-signup?ref=${marketerProfile.referrerCode}`;
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      messageApi.success("Referral link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareReferralLink = () => {
    if (!marketerProfile?.referrerCode) return;

    const referralLink = `${window.location.origin}/merchant-signup?ref=${marketerProfile.referrerCode}`;
    if (navigator.share) {
      navigator
        .share({
          title: "Join 9jaMarkets as a Merchant",
          text: "Use my referral link to sign up as a merchant on 9jaMarkets!",
          url: referralLink,
        })
        .then(() => messageApi.success("Shared successfully"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      copyReferralLink();
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Card>
          <Skeleton active avatar paragraph={{ rows: 4 }} />
        </Card>
        <Card>
          <Skeleton active paragraph={{ rows: 6 }} />
        </Card>
      </div>
    );
  }

  if (!marketerProfile) {
    return (
      <Alert
        message="No Marketer Profile Found"
        description="You don't have a marketer profile associated with your account. Contact support if you believe this is an error."
        type="error"
        showIcon
        icon={<AlertCircle />}
      />
    );
  }

  const referralLink = `${window.location.origin}/merchant-signup?ref=${marketerProfile.referrerCode}`;

  return (
    <div className="space-y-6">
      <Title level={2} className="flex items-center gap-2">
        <UserCheck className="text-Primary" size={28} />
        <span className="bg-clip-text bg-gradient-to-r from-Primary to-orange text-transparent">
          Marketer Profile
        </span>
      </Title>

      {/* Referral Code Section */}
      <Card
        className="bg-gradient-to-r from-Primary/10 to-orange/5 shadow-md border-Primary/20"
        title={
          <div className="flex items-center gap-2">
            <LinkIcon className="text-orange" size={18} />
            <span className="font-medium text-Primary">Your Referral Link</span>
          </div>
        }
        headStyle={{ borderBottom: "1px solid rgba(35, 108, 19, 0.2)" }}
      >
        <div className="space-y-4">
          <div className="flex md:flex-row flex-col items-start md:items-center gap-4">
            <div className="flex-1 bg-white p-3 border border-Primary/20 rounded-md max-w-full overflow-auto text-sm md:text-base">
              {referralLink}
            </div>
            <div className="flex gap-2">
              <Button
                type="primary"
                icon={<Copy size={16} />}
                onClick={copyReferralLink}
                className={`bg-Primary hover:bg-Primary/90 border-none ${
                  copied ? "bg-green-600 hover:bg-green-700" : ""
                }`}
              >
                {copied ? "Copied!" : "Copy Link"}
              </Button>
              <Button
                icon={<Share2 size={16} />}
                onClick={shareReferralLink}
                className="hover:bg-Primary/10 border-Primary hover:border-Primary/80 text-Primary hover:text-Primary/90"
              >
                Share
              </Button>
            </div>
          </div>
          <Text type="secondary">
            Share this link with potential merchants. You'll earn commission
            when they register and purchase ads.
          </Text>
        </div>
      </Card>

      {/* Profile Details */}
      <Card
        title={
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <UserCheck className="text-Primary" size={18} />
              <span className="font-medium text-Primary">
                Marketer Information
              </span>
            </div>
            <Badge
              status={marketerProfile.verified ? "success" : "warning"}
              text={
                <span
                  className={
                    marketerProfile.verified ? "text-Primary" : "text-orange"
                  }
                >
                  {marketerProfile.verified
                    ? "Verified"
                    : "Pending Verification"}
                </span>
              }
            />
          </div>
        }
        headStyle={{ borderBottom: "1px solid rgba(35, 108, 19, 0.2)" }}
        className="shadow-md border-Primary/20"
      >
        <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Descriptions
              bordered
              size="small"
              column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
              labelStyle={{ backgroundColor: "rgba(35, 108, 19, 0.05)" }}
              contentStyle={{ backgroundColor: "white" }}
            >
              <Descriptions.Item label="Full Name">{`${marketerProfile.firstName} ${marketerProfile.lastName}`}</Descriptions.Item>
              <Descriptions.Item label="Username">
                {marketerProfile.username}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {marketerProfile.email}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {marketerProfile.phoneNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Business Type">
                {marketerProfile.BusinessType}
              </Descriptions.Item>
              <Descriptions.Item label="Experience">
                {marketerProfile.marketingExperience || "Not specified"}
              </Descriptions.Item>
              <Descriptions.Item label="Joined" span={2}>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>
                    {new Date(marketerProfile.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </Descriptions.Item>
            </Descriptions>

            <div className="mt-6">
              <Title level={5} className="text-Primary">
                Bank Account Information
              </Title>
              <Descriptions
                bordered
                size="small"
                column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
                labelStyle={{ backgroundColor: "rgba(35, 108, 19, 0.05)" }}
                contentStyle={{ backgroundColor: "white" }}
              >
                <Descriptions.Item label="Account Name">
                  {marketerProfile.accountName}
                </Descriptions.Item>
                <Descriptions.Item label="Bank">
                  {marketerProfile.accountBank}
                </Descriptions.Item>
                <Descriptions.Item label="Account Number">
                  {marketerProfile.accountNumber}
                </Descriptions.Item>
              </Descriptions>
            </div>
          </div>

          <div className="flex flex-col justify-start items-center">
            <div className="shadow-sm mb-4 p-2 border border-Primary/20 rounded-md">
              {marketerProfile.IdentityCredentialImage ? (
                <Image
                  src={marketerProfile.IdentityCredentialImage}
                  alt="Identity Credential"
                  width={200}
                  className="object-cover"
                />
              ) : (
                <div className="flex justify-center items-center bg-gray-50 w-[200px] h-[200px] text-gray-400">
                  No ID Image
                </div>
              )}
            </div>
            <Tag color="green">{marketerProfile.IdentityCredentialType} ID</Tag>
          </div>
        </div>
      </Card>

      {/* Instructions for Marketers */}
      <Card
        title={
          <span className="font-medium text-Primary">
            How to Earn as a Marketer
          </span>
        }
        headStyle={{ borderBottom: "1px solid rgba(35, 108, 19, 0.2)" }}
        className="shadow-md border-Primary/20"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex flex-shrink-0 justify-center items-center bg-orange rounded-full w-8 h-8 text-white">
              1
            </div>
            <div>
              <Title level={5} className="text-Primary">
                Share Your Referral Link
              </Title>
              <Paragraph>
                Copy and share your unique referral link with potential
                merchants who want to join 9jaMarkets.
              </Paragraph>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex flex-shrink-0 justify-center items-center bg-orange rounded-full w-8 h-8 text-white">
              2
            </div>
            <div>
              <Title level={5} className="text-Primary">
                Merchant Registration
              </Title>
              <Paragraph>
                When merchants register using your link, they are automatically
                linked to your profile.
              </Paragraph>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex flex-shrink-0 justify-center items-center bg-orange rounded-full w-8 h-8 text-white">
              3
            </div>
            <div>
              <Title level={5} className="text-Primary">
                Earn Commission
              </Title>
              <Paragraph>
                You'll earn commission when referred merchants purchase
                advertisements on the platform. Note that you will only earn
                from merchants who have been registered for less than 6 months.
              </Paragraph>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex flex-shrink-0 justify-center items-center bg-orange rounded-full w-8 h-8 text-white">
              4
            </div>
            <div>
              <Title level={5} className="text-Primary">
                Get Paid
              </Title>
              <Paragraph>
                Track your earnings in the "Referrals & Earnings" tab. Payments
                are processed by the admin.
              </Paragraph>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MarketerProfile;
