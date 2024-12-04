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
  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
    {[
      { title: "Total Sales", value: stats.totalSales, color: "green" },
      { title: "Orders", value: stats.orders, color: "blue" },
      { title: "Expenses", value: stats.expenses, color: "red" },
      { title: "Profit", value: stats.profit, color: "yellow" },
    ].map((stat, idx) => (
      <div
        key={idx}
        className={`bg-${stat.color}-100 text-${stat.color}-600 p-5 rounded shadow`}
      >
        <h3 className="text-sm">{stat.title}</h3>
        <p className="text-xl font-semibold">₦ {stat.value.toLocaleString()}</p>
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
        backgroundColor: "#3B82F6",
        data: salesAnalysis.map((item) => item.sales),
      },
      {
        label: "Expenses",
        backgroundColor: "#F87171",
        data: salesAnalysis.map((item) => item.expenses),
      },
      {
        label: "Profit",
        backgroundColor: "#10B981",
        data: salesAnalysis.map((item) => item.profit),
      },
    ],
  };

  return (
    <div className="bg-white p-5 rounded shadow">
      <h3 className="text-lg font-semibold mb-4">Sales Analysis</h3>
      <Bar data={barData} />
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
        backgroundColor: ["#10B981", "#FBBF24", "#EF4444"],
      },
    ],
  };

  return (
    <div className="bg-white p-5 rounded shadow">
      <h3 className="text-lg font-semibold mb-4">Order Status</h3>
      <Doughnut data={doughnutData} />
    </div>
  );
};

// Recent Orders Component
const RecentOrders = ({ recentOrders }) => (
  <div className="bg-white p-5 rounded shadow">
    <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="border px-4 py-2">Order ID</th>
          <th className="border px-4 py-2">Product</th>
          <th className="border px-4 py-2">Date</th>
          <th className="border px-4 py-2">Price</th>
          <th className="border px-4 py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {recentOrders.map((order, idx) => (
          <tr key={idx}>
            <td className="border px-4 py-2">{order.id}</td>
            <td className="border px-4 py-2">{order.product}</td>
            <td className="border px-4 py-2">{order.date}</td>
            <td className="border px-4 py-2">₦ {order.price.toLocaleString()}</td>
            <td
              className={`border px-4 py-2 text-${
                order.status === "completed"
                  ? "green"
                  : order.status === "pending"
                  ? "yellow"
                  : "red"
              }-500`}
            >
              {order.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Top Products Component
const TopProducts = ({ topProducts }) => (
  <div className="bg-white p-5 rounded shadow">
    <h3 className="text-lg font-semibold mb-4">Top Products</h3>
    <ul>
      {topProducts.map((product, idx) => (
        <li
          key={idx}
          className="flex justify-between py-2 border-b last:border-none"
        >
          <span>{product.name}</span>
          <span className="font-semibold">₦ {product.sales.toLocaleString()}</span>
        </li>
      ))}
    </ul>
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
      { id: "#123456", product: "HP EliteBook", date: "05-12-2024", price: 250000, status: "completed" },
      { id: "#123457", product: "DELL Inspiron", date: "06-12-2024", price: 190000, status: "cancelled" },
      { id: "#123458", product: "MacBook Air", date: "10-12-2024", price: 420000, status: "pending" },
      { id: "#123459", product: "Alienware", date: "12-12-2024", price: 600000, status: "completed" },
    ],
    topProducts: [
      { name: "MacBook Air Laptop", sales: 742000 },
      { name: "DELL Inspiron Laptop", sales: 430000 },
      { name: "HP EliteBook Laptop", sales: 250000 },
      { name: "Alienware Laptop", sales: 600000 },
    ],
  });

  return (  
      <main>
        <Stats stats={stats} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <SalesAnalysisChart salesAnalysis={stats.salesAnalysis} />
          <OrderStatusChart orderStatus={stats.orderStatus} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <RecentOrders recentOrders={stats.recentOrders} />
          <TopProducts topProducts={stats.topProducts} />
        </div>
      </main>
  );
};

export default DefaultProfileContent;
