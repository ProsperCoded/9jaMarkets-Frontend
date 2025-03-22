import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  Table,
  Skeleton,
  Typography,
  Empty,
  Tag,
  Statistic,
  Avatar,
  Tabs,
  Alert,
  Tooltip,
  Badge,
} from "antd";
import { getCustomerMarketerReferralsApi } from "@/lib/api/customerMarketerApi";
import { MESSAGE_API_CONTEXT, USER_PROFILE_CONTEXT } from "@/contexts";
import {
  DollarSign,
  Users,
  Store,
  Calendar,
  ChevronRight,
  Building,
  Phone,
  AlertCircle,
  CheckCircle2,
  Clock,
  Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "@/lib/util";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const MarketerReferrals = () => {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
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
    const fetchReferrals = async () => {
      setLoading(true);
      try {
        const data = await getCustomerMarketerReferralsApi((error) => {
          messageApi.error(error);
        });
        setReferrals(data || []);
      } catch (error) {
        console.error("Error fetching referrals:", error);
        messageApi.error("Failed to fetch referrals");
      } finally {
        setLoading(false);
      }
    };

    fetchReferrals();
  }, [messageApi]);

  // Calculate total earnings
  const totalPaidEarnings = referrals.reduce(
    (total, merchant) => total + (merchant.profits?.paid || 0),
    0
  );
  const totalUnpaidEarnings = referrals.reduce(
    (total, merchant) => total + (merchant.profits?.unpaid || 0),
    0
  );
  const totalEarnings = totalPaidEarnings + totalUnpaidEarnings;

  // Filter merchants based on active tab
  const filteredReferrals = referrals.filter((merchant) => {
    if (activeTab === "with-earnings")
      return merchant.profits.paid > 0 || merchant.profits.unpaid > 0;
    if (activeTab === "pending-earnings") return merchant.profits.unpaid > 0;
    if (activeTab === "paid-earnings") return merchant.profits.paid > 0;
    return true; // all tab
  });

  const columns = [
    {
      title: "Merchant",
      dataIndex: "brandName",
      key: "brandName",
      render: (brandName, record) => (
        <div className="flex items-start gap-3">
          <Avatar
            src={record.displayImage}
            icon={<Store size={16} />}
            shape="square"
          />
          <div>
            <div className="font-medium">{brandName}</div>
            <div className="flex items-center gap-1 text-gray-500 text-xs">
              <Mail size={12} />
              <span>{record.email}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Location",
      key: "location",
      render: (_, record) => {
        const market = record.market;
        const address =
          record.addresses && record.addresses.length > 0
            ? record.addresses[0]
            : null;

        return (
          <div>
            {market && (
              <div className="flex items-center gap-1 mb-1">
                <Building size={14} className="text-gray-500" />
                <span>{market.name}</span>
              </div>
            )}
            {address && (
              <div className="text-gray-500 text-xs">
                {`${address.city}, ${address.state}`}
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: "Contact",
      key: "contact",
      render: (_, record) => {
        const phone =
          record.phoneNumbers && record.phoneNumbers.length > 0
            ? record.phoneNumbers[0]
            : null;

        return phone ? (
          <div className="flex items-center gap-1">
            <Phone size={14} className="text-gray-500" />
            <span>{phone.number}</span>
          </div>
        ) : (
          <span className="text-gray-400">No phone number</span>
        );
      },
    },
    {
      title: "Joined",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => (
        <div className="flex items-center gap-1">
          <Calendar size={14} className="text-gray-500" />
          <span>{new Date(date).toLocaleDateString()}</span>
        </div>
      ),
    },
    {
      title: "Paid Earnings",
      dataIndex: ["profits", "paid"],
      key: "paidEarnings",
      render: (paid) => (
        <span className="font-medium text-green-600">
          {formatPrice(paid || 0)}
        </span>
      ),
      sorter: (a, b) => (a.profits?.paid || 0) - (b.profits?.paid || 0),
    },
    {
      title: "Unpaid Earnings",
      dataIndex: ["profits", "unpaid"],
      key: "unpaidEarnings",
      render: (unpaid) => (
        <span className="font-medium text-amber-600">
          {formatPrice(unpaid || 0)}
        </span>
      ),
      sorter: (a, b) => (a.profits?.unpaid || 0) - (b.profits?.unpaid || 0),
      defaultSortOrder: "descend",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Tooltip title="View Merchant">
          <a
            href={`/merchant/${record.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
          >
            <span>View</span>
            <ChevronRight size={16} />
          </a>
        </Tooltip>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="space-y-4">
        <Card>
          <Skeleton active paragraph={{ rows: 2 }} />
        </Card>
        <Card>
          <Skeleton active paragraph={{ rows: 6 }} />
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Title level={2} className="flex items-center gap-2">
        <DollarSign className="text-orange" size={28} />
        <span className="bg-clip-text bg-gradient-to-r from-Primary to-orange text-transparent">
          Referrals & Earnings
        </span>
      </Title>

      {/* Statistics Cards */}
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-md hover:shadow-lg border-Primary/20 transition-shadow">
          <Statistic
            title={
              <div className="flex items-center gap-2">
                <Users className="text-Primary" size={16} />
                <span className="font-medium text-Primary/80">
                  Total Referrals
                </span>
              </div>
            }
            value={referrals.length}
            valueStyle={{ color: "#236C13" }}
          />
        </Card>

        <Card className="shadow-md hover:shadow-lg border-orange/20 transition-shadow">
          <Statistic
            title={
              <div className="flex items-center gap-2">
                <DollarSign className="text-orange" size={16} />
                <span className="font-medium text-orange/80">
                  Total Earnings
                </span>
              </div>
            }
            value={formatPrice(totalEarnings)}
            valueStyle={{ color: "#F8912D" }}
          />
        </Card>

        <Card className="shadow-md hover:shadow-lg border-green-500/20 transition-shadow">
          <Statistic
            title={
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-green-600" size={16} />
                <span className="font-medium text-green-600/80">
                  Paid Earnings
                </span>
              </div>
            }
            value={formatPrice(totalPaidEarnings)}
            valueStyle={{ color: "#16a34a" }}
          />
        </Card>

        <Card className="shadow-md hover:shadow-lg border-amber-500/20 transition-shadow">
          <Statistic
            title={
              <div className="flex items-center gap-2">
                <Clock className="text-amber-600" size={16} />
                <span className="font-medium text-amber-600/80">
                  Pending Earnings
                </span>
              </div>
            }
            value={formatPrice(totalUnpaidEarnings)}
            valueStyle={{ color: "#d97706" }}
          />
        </Card>
      </div>

      {/* Merchant Referrals Table */}
      <Card
        title={
          <span className="font-medium text-Primary">
            Your Referred Merchants
          </span>
        }
        extra={
          <Tag color={referrals.length > 0 ? "green" : "orange"}>
            {referrals.length} Merchants
          </Tag>
        }
        headStyle={{ borderBottom: "1px solid rgba(35, 108, 19, 0.2)" }}
        className="shadow-md border-Primary/20"
      >
        {referrals.length === 0 ? (
          <Empty
            description={
              <span>
                You haven't referred any merchants yet. Share your referral link
                to start earning!
              </span>
            }
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : (
          <>
            <Alert
              message="Important: Earnings Rules"
              description="You will only receive earnings from merchants who have been registered for less than 6 months. After 6 months, you will no longer receive commissions from their ad purchases."
              type="info"
              showIcon
              icon={<AlertCircle className="text-Primary" />}
              className="bg-Primary/5 mb-4 border-Primary/30"
            />

            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              type="card"
              className="custom-tabs"
            >
              <TabPane
                tab={
                  <span className="flex items-center gap-1">
                    <Badge status="processing" color="#236C13" />
                    All Referrals
                  </span>
                }
                key="all"
              />
              <TabPane
                tab={
                  <span className="flex items-center gap-1">
                    <Badge status="success" />
                    With Earnings
                  </span>
                }
                key="with-earnings"
              />
              <TabPane
                tab={
                  <span className="flex items-center gap-1">
                    <Badge status="warning" />
                    Pending Payments
                  </span>
                }
                key="pending-earnings"
              />
              <TabPane
                tab={
                  <span className="flex items-center gap-1">
                    <Badge status="default" />
                    Paid History
                  </span>
                }
                key="paid-earnings"
              />
            </Tabs>

            <Table
              dataSource={filteredReferrals}
              columns={columns}
              rowKey="id"
              pagination={{
                defaultPageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "20", "50"],
              }}
              className="custom-table"
              rowClassName="hover:bg-Primary/5"
              locale={{
                emptyText: (
                  <Empty
                    description={
                      <span>No merchants found with the selected filters</span>
                    }
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                ),
              }}
            />
          </>
        )}
      </Card>

      {/* FAQ Section */}
      <Card
        title={
          <span className="font-medium text-orange">
            Frequently Asked Questions
          </span>
        }
        headStyle={{ borderBottom: "1px solid rgba(248, 145, 45, 0.2)" }}
        className="shadow-md border-orange/20"
      >
        <div className="space-y-6">
          <div className="hover:bg-orange/5 p-4 rounded-lg transition-colors">
            <Title level={5} className="text-orange">
              How are my earnings calculated?
            </Title>
            <Text>
              Earnings are calculated based on a percentage of the ad payments
              made by merchants you've referred. The exact percentage depends on
              the ad level and current platform policies.
            </Text>
          </div>

          <div className="hover:bg-orange/5 p-4 rounded-lg transition-colors">
            <Title level={5} className="text-orange">
              When will I receive my payments?
            </Title>
            <Text>
              Payments are processed by the admin team on a regular basis.
              You'll be notified when your earnings are paid to your registered
              bank account.
            </Text>
          </div>

          <div className="hover:bg-orange/5 p-4 rounded-lg transition-colors">
            <Title level={5} className="text-orange">
              Why can't I see all my referred merchants' earnings?
            </Title>
            <Text>
              You only earn commission from merchants who have been registered
              for less than 6 months. After that period, you will no longer
              receive commissions from their ad purchases.
            </Text>
          </div>

          <div className="hover:bg-orange/5 p-4 rounded-lg transition-colors">
            <Title level={5} className="text-orange">
              How can I increase my earnings?
            </Title>
            <Text>
              Refer more merchants to the platform using your unique referral
              link and help them understand the benefits of promoting their
              products through our ad system.
            </Text>
          </div>
        </div>
      </Card>

      {/* Custom styling for tables and tabs */}
      <style jsx global>{`
        .custom-table .ant-table-thead > tr > th {
          background-color: rgba(35, 108, 19, 0.05);
          color: #236c13;
          font-weight: 500;
        }

        .custom-tabs .ant-tabs-tab.ant-tabs-tab-active {
          background-color: #236c13;
        }

        .custom-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
          color: white;
        }

        .custom-tabs .ant-tabs-tab:hover {
          color: #236c13;
        }

        .custom-tabs .ant-tabs-ink-bar {
          background-color: #236c13;
        }
      `}</style>
    </div>
  );
};

export default MarketerReferrals;
