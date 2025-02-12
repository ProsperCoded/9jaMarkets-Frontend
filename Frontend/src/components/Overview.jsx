import React, { useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Stats Component
const Stats = ({ stats }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {[
      { 
        title: "Total Sales", 
        value: stats.totalSales, 
        color: "orange",
        bgColor: "bg-orange-50",
        textColor: "text-orange-700" 
      },
      { 
        title: "Orders", 
        value: stats.orders, 
        color: "blue",
        bgColor: "bg-blue-50",
        textColor: "text-blue-700"
      },
      { 
        title: "Expenses", 
        value: stats.expenses, 
        color: "red",
        bgColor: "bg-red-50",
        textColor: "text-red-700"
      },
      { 
        title: "Profit", 
        value: stats.profit, 
        color: "green",
        bgColor: "bg-green-50",
        textColor: "text-green-700"
      },
    ].map((stat) => (
      <div
        key={stat.title}
        className={`${stat.bgColor} rounded-lg shadow-sm p-6 transition-transform hover:scale-105`}
      >
        <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
        <p className={`mt-2 text-2xl font-semibold ${stat.textColor}`}>
          ₦{stat.value.toLocaleString()}
        </p>
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
        borderRadius: 10,
        data: salesAnalysis.map((item) => item.sales),
      },
      {
        label: "Expenses",
        backgroundColor: "#FF3D00",
        borderRadius: 10,
        data: salesAnalysis.map((item) => item.expenses),
      },
      {
        label: "Profit",
        backgroundColor: "#236C13",
        borderRadius: 10,
        data: salesAnalysis.map((item) => item.profit),
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Sales Analysis</h3>
      <div className="h-[300px]">
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
        data: [
          orderStatus.completed,
          orderStatus.pending,
          orderStatus.cancelled,
        ],
        backgroundColor: ["#236C13", "#F8912D", "#FF3D00"],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Order Status</h3>
      <div className="h-[300px] flex items-center justify-center">
        <Doughnut data={doughnutData} options={options} />
      </div>
    </div>
  );
};

// Recent Orders Component
const RecentOrders = ({ recentOrders }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 overflow-hidden">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
      <button className="text-sm text-Primary hover:text-Primary/90">
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
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {recentOrders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {order.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.product}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ₦{order.price.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
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
  <div className="bg-white rounded-lg shadow-sm p-6">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-lg font-medium text-gray-900">Top Products</h3>
      <button className="text-sm text-Primary hover:text-Primary/90">
        View All
      </button>
    </div>
    <div className="space-y-4">
      {topProducts.map((product, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50"
        >
          <span className="text-sm text-gray-600">{product.name}</span>
          <span className="text-sm font-medium text-gray-900">
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
    <div className="space-y-6 p-6">
      <Stats stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesAnalysisChart salesAnalysis={stats.salesAnalysis} />
        <OrderStatusChart orderStatus={stats.orderStatus} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders recentOrders={stats.recentOrders} />
        <TopProducts topProducts={stats.topProducts} />
      </div>
    </div>
  );
};

export default DefaultProfileContent;