import React, { useState, useEffect, useContext } from "react";
import {
  Table,
  Tabs,
  Tag,
  Empty,
  Spin,
  Typography,
  Avatar,
  Button,
  Space,
  Modal,
  Descriptions,
  Popconfirm,
  Badge,
} from "antd";
import {
  CheckCircle2,
  User,
  CreditCard,
  RefreshCw,
  CheckCircle,
  AlertOctagon,
  Users,
} from "lucide-react";
import {
  getAllMarketersWithEarnings,
  getMarketerPaidEarnings,
  getMarketerUnpaidEarnings,
  markEarningsAsPaid,
} from "@/lib/api/marketerEarningsApi";
import { MESSAGE_API_CONTEXT } from "@/contexts";
import { LoadingOverlay } from "./ui/LoadingOverlay";
import { formatPrice } from "@/lib/util";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const AdminSettlements = () => {
  const [marketers, setMarketers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [selectedMarketer, setSelectedMarketer] = useState(null);
  const [earningsDetails, setEarningsDetails] = useState({
    paid: { earnings: [], totalPaidEarnings: 0 },
    unpaid: { earnings: [], totalUnpaidEarnings: 0 },
  });
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const messageApi = useContext(MESSAGE_API_CONTEXT);

  // Fetch all marketers with earnings
  const fetchMarketers = async () => {
    setLoading(true);
    try {
      const data = await getAllMarketersWithEarnings((error) => {
        messageApi.error(error);
      });
      setMarketers(data || []);
    } catch (error) {
      console.error("Error fetching marketers:", error);
      messageApi.error("Failed to fetch marketers");
    } finally {
      setLoading(false);
    }
  };

  // Fetch marketer details including paid and unpaid earnings
  const fetchMarketerDetails = async (marketer) => {
    setDetailsLoading(true);
    setSelectedMarketer(marketer);
    setDetailsModalVisible(true);

    try {
      const [paidData, unpaidData] = await Promise.all([
        getMarketerPaidEarnings(marketer.id, (error) => {
          messageApi.error(error);
        }),
        getMarketerUnpaidEarnings(marketer.id, (error) => {
          messageApi.error(error);
        }),
      ]);

      setEarningsDetails({
        paid: paidData || { earnings: [], totalPaidEarnings: 0 },
        unpaid: unpaidData || { earnings: [], totalUnpaidEarnings: 0 },
      });
    } catch (error) {
      console.error("Error fetching marketer details:", error);
      messageApi.error("Failed to fetch marketer details");
    } finally {
      setDetailsLoading(false);
    }
  };

  // Handle payment process
  const handleMakePayment = async (marketerId) => {
    setProcessingPayment(true);
    try {
      const result = await markEarningsAsPaid(
        marketerId,
        (error) => {
          messageApi.error(error);
        },
        (success) => {
          messageApi.success(success);
        }
      );

      if (result) {
        // Refresh the marketers list and close the modal
        await fetchMarketers();

        // If the modal is open, refresh the marketer details
        if (
          detailsModalVisible &&
          selectedMarketer &&
          selectedMarketer.id === marketerId
        ) {
          await fetchMarketerDetails(selectedMarketer);
        }

        // Replace toast with messageApi
        messageApi.success(
          `Payment marked as completed. ${
            result.markedAsPaid
          } earnings totaling ${formatPrice(result.totalPaid)} marked as paid.`
        );
      }
    } catch (error) {
      console.error("Error making payment:", error);
      messageApi.error("Failed to process payment");
    } finally {
      setProcessingPayment(false);
    }
  };

  useEffect(() => {
    fetchMarketers();
  }, []);

  // Table columns for marketers
  const columns = [
    {
      title: "Marketer",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar
            style={{ backgroundColor: record.verified ? "#21CA1B" : "#f56a00" }}
            icon={<User size={16} />}
          />
          <div>
            <div className="font-medium">{`${record.firstName} ${record.lastName}`}</div>
            <div className="text-gray-500 text-xs">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "verified",
      key: "verified",
      render: (verified) => (
        <Tag color={verified ? "success" : "warning"}>
          {verified ? "Verified" : "Pending Verification"}
        </Tag>
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Bank Details",
      key: "bankDetails",
      render: (_, record) => (
        <div>
          <div>{record.accountBank}</div>
          <div className="text-gray-500 text-xs">{record.accountNumber}</div>
        </div>
      ),
    },
    {
      title: "Paid Earnings",
      dataIndex: ["earnings", "paid"],
      key: "paidEarnings",
      render: (paid) => (
        <span className="text-green-600">{formatPrice(paid || 0)}</span>
      ),
      sorter: (a, b) => (a.earnings?.paid || 0) - (b.earnings?.paid || 0),
    },
    {
      title: "Unpaid Earnings",
      dataIndex: ["earnings", "unpaid"],
      key: "unpaidEarnings",
      render: (unpaid) => (
        <span className="text-amber-600">{formatPrice(unpaid || 0)}</span>
      ),
      sorter: (a, b) => (a.earnings?.unpaid || 0) - (b.earnings?.unpaid || 0),
      defaultSortOrder: "descend",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            onClick={() => fetchMarketerDetails(record)}
          >
            View Details
          </Button>
          {record.earnings?.unpaid > 0 && record.verified && (
            <Popconfirm
              title="Confirm Payment"
              description={`Are you sure you want to mark ${formatPrice(
                record.earnings.unpaid
              )} as paid to ${record.firstName} ${record.lastName}?`}
              onConfirm={() => handleMakePayment(record.id)}
              okText="Yes, Confirm Payment"
              cancelText="No"
            >
              <Button
                type="default"
                size="small"
                className="bg-green-500 hover:bg-green-600 border-none text-white"
              >
                Make Payment
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  // Table columns for earnings details
  const earnningsColumns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Merchant",
      dataIndex: ["merchant", "brandName"],
      key: "merchant",
      render: (brandName, record) => (
        <div>
          <div className="font-medium">{brandName}</div>
          <div className="text-gray-500 text-xs">{record.merchant?.email}</div>
        </div>
      ),
    },
    {
      title: "Ad Level",
      dataIndex: ["Ad", "level"],
      key: "adLevel",
      render: (level) => (
        <Tag color={level === 3 ? "gold" : level === 2 ? "blue" : "green"}>
          Level {level}
        </Tag>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (
        <span className="font-medium">{formatPrice(amount)}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "paid",
      key: "status",
      render: (paid) => (
        <Tag color={paid ? "success" : "warning"}>
          {paid ? "Paid" : "Pending"}
        </Tag>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Title level={3}>Marketer Settlements</Title>
        <Button
          type="default"
          icon={<RefreshCw size={16} />}
          onClick={fetchMarketers}
          loading={loading}
        >
          Refresh
        </Button>
      </div>

      <div className="gap-4 grid grid-cols-1 md:grid-cols-3 mb-6">
        <div className="bg-white shadow-sm p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Users className="text-blue-600" size={20} />
            </div>
            <div>
              <Text type="secondary">Total Marketers</Text>
              <Title level={4} className="m-0">
                {marketers.length}
              </Title>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-full">
              <CheckCircle2 className="text-green-600" size={20} />
            </div>
            <div>
              <Text type="secondary">Total Paid</Text>
              <Title level={4} className="m-0">
                {formatPrice(
                  marketers.reduce(
                    (acc, marketer) => acc + (marketer.earnings?.paid || 0),
                    0
                  )
                )}
              </Title>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-2 rounded-full">
              <CreditCard className="text-amber-600" size={20} />
            </div>
            <div>
              <Text type="secondary">Pending Payments</Text>
              <Title level={4} className="m-0">
                {formatPrice(
                  marketers.reduce(
                    (acc, marketer) => acc + (marketer.earnings?.unpaid || 0),
                    0
                  )
                )}
              </Title>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 rounded-lg">
        <Table
          dataSource={marketers}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50"],
          }}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No marketers found"
              />
            ),
          }}
        />
      </div>

      {/* Marketer Details Modal */}
      <Modal
        title={
          <div className="flex items-center gap-3">
            <Avatar
              style={{
                backgroundColor: selectedMarketer?.verified
                  ? "#21CA1B"
                  : "#f56a00",
              }}
              icon={<User size={16} />}
            />
            <span>
              {selectedMarketer
                ? `${selectedMarketer.firstName} ${selectedMarketer.lastName}`
                : "Marketer Details"}
            </span>
            {selectedMarketer?.verified && (
              <Tag color="success" className="ml-2">
                Verified
              </Tag>
            )}
          </div>
        }
        open={detailsModalVisible}
        onCancel={() => setDetailsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailsModalVisible(false)}>
            Close
          </Button>,
          selectedMarketer &&
            earningsDetails.unpaid.totalUnpaidEarnings > 0 && (
              <Popconfirm
                key="makePayment"
                title="Confirm Payment"
                description={`Are you sure you want to mark ${formatPrice(
                  earningsDetails.unpaid.totalUnpaidEarnings
                )} as paid to ${selectedMarketer?.firstName} ${
                  selectedMarketer?.lastName
                }?`}
                onConfirm={() => handleMakePayment(selectedMarketer.id)}
                okText="Yes, Confirm Payment"
                cancelText="No"
              >
                <Button
                  type="primary"
                  loading={processingPayment}
                  className="bg-green-500 hover:bg-green-600"
                >
                  Mark as Paid ($
                  {(earningsDetails.unpaid.totalUnpaidEarnings || 0).toFixed(2)}
                  )
                </Button>
              </Popconfirm>
            ),
        ]}
        width={900}
      >
        {detailsLoading ? (
          <div className="flex justify-center items-center py-12">
            <Spin size="large" />
          </div>
        ) : (
          <div className="space-y-6">
            {selectedMarketer && (
              <>
                <Descriptions
                  title="Marketer Information"
                  bordered
                  size="small"
                  column={{ xxl: 3, xl: 3, lg: 2, md: 2, sm: 1, xs: 1 }}
                >
                  <Descriptions.Item label="Email">
                    {selectedMarketer.email}
                  </Descriptions.Item>
                  <Descriptions.Item label="Username">
                    {selectedMarketer.username}
                  </Descriptions.Item>
                  <Descriptions.Item label="Phone">
                    {selectedMarketer.phoneNumber}
                  </Descriptions.Item>
                  <Descriptions.Item label="Account Name">
                    {selectedMarketer.accountName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Bank">
                    {selectedMarketer.accountBank}
                  </Descriptions.Item>
                  <Descriptions.Item label="Account Number">
                    {selectedMarketer.accountNumber}
                  </Descriptions.Item>
                  <Descriptions.Item label="Business Type">
                    {selectedMarketer.BusinessType}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="Experience"
                    className="overflow-ellipsis overflow-hidden"
                  >
                    {selectedMarketer.marketingExperience || "Not specified"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Joined">
                    {new Date(selectedMarketer.createdAt).toLocaleDateString()}
                  </Descriptions.Item>
                </Descriptions>

                <div className="gap-4 grid grid-cols-1 md:grid-cols-2 mb-6">
                  <div className="bg-white shadow-sm p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <CheckCircle className="text-green-600" size={20} />
                      </div>
                      <div>
                        <Text type="secondary">Total Paid Earnings</Text>
                        <Title level={4} className="m-0">
                          {formatPrice(earningsDetails.paid.totalPaidEarnings)}
                        </Title>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white shadow-sm p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-amber-100 p-2 rounded-full">
                        <AlertOctagon className="text-amber-600" size={20} />
                      </div>
                      <div>
                        <Text type="secondary">Pending Payments</Text>
                        <Title level={4} className="m-0">
                          {formatPrice(
                            earningsDetails.unpaid.totalUnpaidEarnings
                          )}
                        </Title>
                      </div>
                    </div>
                  </div>
                </div>

                <Tabs activeKey={activeTab} onChange={setActiveTab}>
                  <TabPane
                    tab={
                      <span>
                        <Badge status="success" />
                        Paid Earnings
                      </span>
                    }
                    key="1"
                  >
                    <Table
                      dataSource={earningsDetails.paid.earnings}
                      columns={earnningsColumns}
                      rowKey="id"
                      pagination={{
                        defaultPageSize: 5,
                        showSizeChanger: true,
                        pageSizeOptions: ["5", "10", "20"],
                      }}
                      locale={{
                        emptyText: (
                          <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description="No paid earnings found"
                          />
                        ),
                      }}
                    />
                  </TabPane>
                  <TabPane
                    tab={
                      <span>
                        <Badge status="warning" />
                        Unpaid Earnings
                      </span>
                    }
                    key="2"
                  >
                    <Table
                      dataSource={earningsDetails.unpaid.earnings}
                      columns={earnningsColumns}
                      rowKey="id"
                      pagination={{
                        defaultPageSize: 5,
                        showSizeChanger: true,
                        pageSizeOptions: ["5", "10", "20"],
                      }}
                      locale={{
                        emptyText: (
                          <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description="No unpaid earnings found"
                          />
                        ),
                      }}
                    />
                  </TabPane>
                </Tabs>
              </>
            )}
          </div>
        )}
      </Modal>

      {/* Processing payment overlay */}
      <LoadingOverlay
        isVisible={processingPayment}
        message="Processing payment. Please wait..."
      />
    </div>
  );
};

export default AdminSettlements;
