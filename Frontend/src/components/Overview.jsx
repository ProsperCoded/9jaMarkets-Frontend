import React, { useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { Wallet, Package, Banknote, ShoppingCart } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

ChartJS.register( CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend );

// Stats Component
const Stats = ({ stats }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
    {[
      { 
        title: "Total Sales", 
        value: stats.totalSales, 
        icon: <Banknote className="w-5 h-5 text-orange" />,
        bgColor: "bg-orange/5",
        iconBg: "bg-orange/20",
        textColor: "text-orange",
      },
      { 
        title: "Orders", 
        value: stats.orders, 
        icon: <Package className="w-5 h-5 text-blue-500" />,
        bgColor: "bg-blue-50",
        iconBg: "bg-blue-200", 
        textColor: "text-blue-500",
      },
      { 
        title: "Expenses", 
        value: stats.expenses, 
        icon: <Wallet className="w-5 h-5 text-red-500" />,
        bgColor: "bg-red-50",
        iconBg: "bg-red-200",
        textColor: "text-red-500",
      },
      { 
        title: "Profit", 
        value: stats.profit, 
        icon: <span className="text-lg text-Primary px-2 font-bold">₦</span>,
        bgColor: "bg-Primary/5",
        iconBg: "bg-Primary/20",
        textColor: "text-Primary",
      },
    ].map((stat) => (
      <div
        key={stat.title}
        className={`${stat.bgColor} rounded-lg shadow-sm p-4`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`${stat.iconBg} p-2 rounded-full`}>
              {stat.icon}
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">{stat.title}</h3>
              <p className={`mt-1 text-lg font-semibold ${stat.textColor}`}>
                ₦{stat.value.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Sales Analysis Chart Component
const SalesAnalysisChart = ({ salesAnalysis }) => {
  const barData = {
    labels: salesAnalysis.map((item) => item.week),
    datasets: [
      {
        label: "Total Sales",
        backgroundColor: "#F8912D",
        borderRadius: 6,
        data: salesAnalysis.map((item) => item.sales),
        barThickness: 12,
      },
      {
        label: "Expenses",
        backgroundColor: "#FF3D00",
        borderRadius: 6,
        data: salesAnalysis.map((item) => item.expenses),
        barThickness: 12,
      },
      {
        label: "Profit",
        backgroundColor: "#236C13",
        borderRadius: 6,
        data: salesAnalysis.map((item) => item.profit),
        barThickness: 12,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 11
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
          color: '#E5E7EB'
        },
        ticks: {
          font: {
            size: 11
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11
          }
        },
        barPercentage: 0.8,
        categoryPercentage: 0.7
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-medium text-gray-900">Sales Analysis</h3>
        <Select>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="january">January</SelectItem>
            <SelectItem value="february">February</SelectItem>
            <SelectItem value="march">March</SelectItem>
            <SelectItem value="april">April</SelectItem>
            <SelectItem value="may">May</SelectItem>
            <SelectItem value="june">June</SelectItem>
            <SelectItem value="july">July</SelectItem>
            <SelectItem value="august">August</SelectItem>
            <SelectItem value="september">September</SelectItem>
            <SelectItem value="october">October</SelectItem>
            <SelectItem value="november">November</SelectItem>
            <SelectItem value="december">December</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="h-[250px]">
        <Bar data={barData} options={options} />
      </div>
    </div>
  );
};

// Order Status Chart Component
const OrderStatusChart = ({ orderStatus }) => {
  const doughnutData = {
    labels: ["Completed", "Pending", "Cancelled"],
    datasets: [
      {
        data: [75, 15, 10],
        backgroundColor: ["#236C13", "#F8912D", "#FF3D00"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'right',
        align: 'center',
        labels: {
          usePointStyle: true,
          padding: 20,
          boxWidth: 8,
          font: {
            size: 11
          },
          generateLabels: function(chart) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => ({
                text: `${label} ${data.datasets[0].data[i]}%`,
                fillStyle: data.datasets[0].backgroundColor[i],
                hidden: false,
                index: i
              }));
            }
            return [];
          }
        }
      }
    },
    layout: {
      padding: {
        right: 80
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-base font-medium text-gray-900 mb-4">Order Status</h3>
      <div className="h-[250px] relative">
        <Doughnut data={doughnutData} options={options} />
      </div>
    </div>
  );
};

// Recent Orders Component
const RecentOrders = ({ recentOrders }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 overflow-hidden">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-base font-medium text-gray-900">Recent Orders</h3>
      <button className="text-xs text-Primary hover:text-Primary/90">
        View All
      </button>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {["Order ID", "Product", "Date", "Price", "Status"].map((header) => (
              <th
                key={header}
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {recentOrders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 whitespace-nowrap text-xs font-medium text-gray-900">
                {order.id}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">
                {order.product}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">
                {order.date}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">
                ₦{order.price.toLocaleString()}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                    ${
                      order.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Top Products Component
const TopProducts = ({ topProducts }) => (
  <div className="bg-white rounded-lg shadow-sm p-4">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-base font-medium text-gray-900">Top Products</h3>
      <button className="text-xs text-Primary hover:text-Primary/90">
        View All
      </button>
    </div>
    <div className="space-y-3">
      {topProducts.map((product, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
        >
          <span className="text-xs text-gray-600">{product.name}</span>
          <span className="text-xs font-medium text-gray-900">
            ₦{product.sales.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  </div>
);

// Main Dashboard Component
const DefaultProfileContent = () => {
  const [stats] = useState({
    totalSales: 50255,
    orders: 102,
    expenses: 10290,
    profit: 39965,
    salesAnalysis: [
      { week: "Week 1", sales: 12000, expenses: 4000, profit: 8000 },
      { week: "Week 2", sales: 15000, expenses: 7000, profit: 8000 },
      { week: "Week 3", sales: 10000, expenses: 2000, profit: 8000 },
      { week: "Week 4", sales: 13000, expenses: 3000, profit: 10000 },
    ],
    orderStatus: { completed: 77, pending: 20, cancelled: 5 },
    recentOrders: [
      {
        id: "#123456",
        product: "HP EliteBook",
        date: "05-12-2024",
        price: 250000,
        status: "completed",
      },
      {
        id: "#123457",
        product: "DELL Inspiron",
        date: "06-12-2024",
        price: 190000,
        status: "cancelled",
      },
      {
        id: "#123458",
        product: "MacBook Air",
        date: "10-12-2024",
        price: 420000,
        status: "pending",
      },
      {
        id: "#123459",
        product: "Alienware",
        date: "12-12-2024",
        price: 600000,
        status: "completed",
      },
    ],
    topProducts: [
      { name: "MacBook Air Laptop", sales: 742000 },
      { name: "DELL Inspiron Laptop", sales: 430000 },
      { name: "HP EliteBook Laptop", sales: 250000 },
      { name: "Alienware Laptop", sales: 600000 },
    ],
  });

  return (
    <div className="space-y-4 p-4 max-w-7xl mx-auto">
      <Stats stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SalesAnalysisChart salesAnalysis={stats.salesAnalysis} />
        <OrderStatusChart orderStatus={stats.orderStatus} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RecentOrders recentOrders={stats.recentOrders} />
        <TopProducts topProducts={stats.topProducts} />
      </div>
    </div>
  );
};

export default DefaultProfileContent;