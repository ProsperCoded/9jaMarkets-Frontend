import React, { useState, useEffect, useContext } from "react";
import {
  BarChart3,
  Users,
  DollarSign,
  ShoppingBag,
  Store,
  Building2,
  BadgePercent,
} from "lucide-react";
import { getAllStatsApi } from "@/lib/api/statsApi";
import {
  MARKETS_DATA_CONTEXT,
  MALLS_DATA_CONTEXT,
  MESSAGE_API_CONTEXT,
} from "@/contexts";

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
  const { marketsData } = useContext(MARKETS_DATA_CONTEXT);
  const { mallsData } = useContext(MALLS_DATA_CONTEXT);
  const messageApi = useContext(MESSAGE_API_CONTEXT);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch all stats in parallel
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

  // Prepare stats data with real values
  const statsData = [
    {
      title: "Total Customers",
      value: loading
        ? "Loading..."
        : stats.totalCustomers?.toLocaleString() || "0",
      icon: <Users className="w-7 h-7" />,
    },
    {
      title: "Total Merchants",
      value: loading
        ? "Loading..."
        : stats.totalMerchants?.toLocaleString() || "0",
      icon: <Users className="w-7 h-7" />,
    },
    {
      title: "Total Marketers(verified)",
      value: loading
        ? "Loading..."
        : stats.totalMarketers?.toLocaleString() || "0",
      icon: <Users className="w-7 h-7" />,
    },
    {
      title: "Total Markets",
      value: loading
        ? "Loading..."
        : marketsData?.length?.toLocaleString() || "0",
      icon: <Store className="w-7 h-7" />,
    },
    {
      title: "Total Malls",
      value: loading
        ? "Loading..."
        : mallsData?.length?.toLocaleString() || "0",
      icon: <Building2 className="w-7 h-7" />,
    },
    {
      title: "Revenue",
      value: loading
        ? "Loading..."
        : `₦${stats.revenue?.totalRevenue?.toLocaleString() || "0"}`,
      subValues: [
        {
          label: "Monthly",
          value: loading
            ? "Loading..."
            : `₦${stats.revenue?.monthRevenue?.toLocaleString() || "0"}`,
        },
        {
          label: "Yearly",
          value: loading
            ? "Loading..."
            : `₦${stats.revenue?.yearRevenue?.toLocaleString() || "0"}`,
        },
      ],
      icon: <DollarSign className="w-7 h-7" />,
    },
    {
      title: "Total Products",
      value: loading
        ? "Loading..."
        : stats.totalProducts?.toLocaleString() || "0",
      icon: <ShoppingBag className="w-7 h-7" />,
    },
    {
      title: "Total Ads",
      value: loading ? "Loading..." : stats.totalAds?.toLocaleString() || "0",
      icon: <BadgePercent className="w-7 h-7" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Admin Dashboard</h1>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 text-sm">
            Last updated: {new Date().toLocaleString()}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="bg-white shadow-sm p-6 border border-gray-100 rounded-xl"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <h3 className="mt-1 font-bold text-2xl">{stat.value}</h3>
                {stat.subValues && (
                  <div className="space-y-1 mt-2">
                    {stat.subValues.map((subValue, i) => (
                      <div key={i} className="flex items-center text-sm">
                        <span className="mr-2 text-gray-500">
                          {subValue.label}:
                        </span>
                        <span className="font-medium text-orange">
                          {subValue.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="bg-orange/10 p-3 rounded-lg text-orange">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Analytics */}
      <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
        {/* Chart Placeholder */}
        <div className="bg-white shadow-sm p-6 border border-gray-100 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Revenue Overview</h2>
            <select className="p-1 border rounded-md text-sm">
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="flex justify-center items-center bg-gray-50 rounded-lg h-64">
            <div className="text-center">
              <BarChart3 className="mx-auto mb-2 w-12 h-12 text-gray-300" />
              <p className="text-gray-500">Chart will be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
