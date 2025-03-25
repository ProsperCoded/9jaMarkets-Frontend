import React, { useState, useEffect, useContext } from "react";
import {
  BarChart3,
  Users,
  DollarSign,
  ShoppingBag,
  Store,
  Building2,
  BadgePercent,
  Loader,
  Package,
  BadgeDollarSign,
} from "lucide-react";
import { getAllStatsApi } from "@/lib/api/statsApi";
import {
  MARKETS_DATA_CONTEXT,
  MALLS_DATA_CONTEXT,
  MESSAGE_API_CONTEXT,
} from "@/contexts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    customerCount: 0,
    merchantCount: 0,
    revenue: {
      monthRevenue: 0,
      yearRevenue: 0,
      totalRevenue: 0,
    },
  });
  const [loading, setLoading] = useState(true);
  const [chartPeriod, setChartPeriod] = useState("month");
  const { marketsData } = useContext(MARKETS_DATA_CONTEXT);
  const { mallsData } = useContext(MALLS_DATA_CONTEXT);
  const messageApi = useContext(MESSAGE_API_CONTEXT);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const statsData = await getAllStatsApi((error) =>
          messageApi.error(error || "Failed to fetch statistics")
        );

        if (statsData) {
          setStats(statsData);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        messageApi.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [messageApi]);

  const statsData = [
    {
      title: "Total Customers",
      value: loading ? "..." : stats.totalCustomers?.toLocaleString() || "0",
      icon: <Users className="w-7 h-7" />,
      description: "Active users on the platform",
      color: "bg-blue-500",
    },
    {
      title: "Total Merchants",
      value: loading ? "..." : stats.totalMerchants?.toLocaleString() || "0",
      icon: <ShoppingBag className="w-7 h-7" />,
      description: "Registered merchants",
      color: "bg-green-500",
    },
    {
      title: "Total Marketers",
      value: loading ? "..." : stats.totalMarketers?.toLocaleString() || "0",
      icon: <BadgePercent className="w-7 h-7" />,
      description: "Verified marketers",
      color: "bg-purple-500",
    },
    {
      title: "Total Markets",
      value: loading ? "..." : marketsData?.length?.toLocaleString() || "0",
      icon: <Store className="w-7 h-7" />,
      description: "Active markets",
      color: "bg-orange",
    },
    {
      title: "Total Malls",
      value: loading ? "..." : mallsData?.length?.toLocaleString() || "0",
      icon: <Building2 className="w-7 h-7" />,
      description: "Active shopping malls",
      color: "bg-pink-500",
    },
    {
      title: "Total Revenue",
      value: loading
        ? "..."
        : `₦${stats.revenue?.totalRevenue?.toLocaleString() || "0"}`,
      icon: <DollarSign className="w-7 h-7" />,
      description: "Platform revenue",
      color: "bg-teal-500",
      subValues: [
        {
          label: "Monthly",
          value: `₦${stats.revenue?.monthRevenue?.toLocaleString() || "0"}`,
        },
        {
          label: "Yearly",
          value: `₦${stats.revenue?.yearRevenue?.toLocaleString() || "0"}`,
        },
      ],
    },
    {
      title: "Total Products",
      value: loading ? "..." : stats.totalProducts?.toLocaleString() || "0",
      icon: <Package className="w-7 h-7" />,
      description: "Products listed on platform",
      color: "bg-Primary",
    },
    {
      title: "Total Ads",
      value: loading ? "..." : stats.totalAds?.toLocaleString() || "0",
      icon: <BadgeDollarSign className="w-7 h-7" />,
      description: "Active advertisements",
      color: "bg-orange",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your marketplace statistics
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statsData.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div
                  className={`${stat.color} p-2 rounded-lg text-white shadow-lg`}
                >
                  {stat.icon}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
              {stat.subValues && (
                <div className="mt-4 space-y-2">
                  {stat.subValues.map((subValue, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-muted-foreground">
                        {subValue.label}
                      </span>
                      <span className="font-medium">{subValue.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Revenue Overview</CardTitle>
              <Select
                value={chartPeriod}
                onValueChange={setChartPeriod}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="lastMonth">Last Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center bg-gray-50 rounded-lg h-64">
              <div className="text-center">
                <BarChart3 className="mx-auto mb-2 w-12 h-12 text-Primary opacity-20" />
                <p className="text-muted-foreground">Revenue chart coming soon</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center bg-gray-50 rounded-lg h-64">
              <div className="text-center">
                <BarChart3 className="mx-auto mb-2 w-12 h-12 text-orange opacity-20" />
                <p className="text-muted-foreground">Activity chart coming soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
