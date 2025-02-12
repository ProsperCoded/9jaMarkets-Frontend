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
      }
    ].map((stat, index) => (
      <div
        key={index}
        className={` ${stat.bgColor} p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow`}
      >
        <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
        <p className={` ${stat.textColor} text-2xl font-bold mt-2`}>
          {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
        </p>
      </div>
    ))}
  </div>
);

// Sales Analysis Chart Component
const SalesAnalysisChart = ({ salesAnalysis }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales Analysis',
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="h-[300px] sm:h-[400px]">
        <Bar options={options} data={salesAnalysis} />
      </div>
    </div>
  );
};

// Order Status Chart Component
const OrderStatusChart = ({ orderStatus }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Order Status',
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="h-[300px]">
        <Doughnut options={options} data={orderStatus} />
      </div>
    </div>
  );
};

// Recent Orders Component
const RecentOrders = ({ recentOrders }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm overflow-x-auto">
    <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
    <table className="min-w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left py-2 px-4">Order ID</th>
          <th className="text-left py-2 px-4">Customer</th>
          <th className="text-left py-2 px-4">Product</th>
          <th className="text-left py-2 px-4">Amount</th>
          <th className="text-left py-2 px-4">Status</th>
        </tr>
      </thead>
      <tbody>
        {recentOrders.map((order) => (
          <tr key={order.id} className="border-b hover:bg-gray-50">
            <td className="py-2 px-4">{order.id}</td>
            <td className="py-2 px-4">{order.customer}</td>
            <td className="py-2 px-4">{order.product}</td>
            <td className="py-2 px-4">₦{order.amount.toLocaleString()}</td>
            <td className="py-2 px-4">
              <span className={`
                px-2 py-1 rounded-full text-xs
                ${order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'}
              `}>
                {order.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Top Products Component
const TopProducts = ({ topProducts }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm">
    <h3 className="text-lg font-semibold mb-4">Top Products</h3>
    <div className="space-y-4">
      {topProducts.map((product) => (
        <div key={product.id} className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
            <div>
              <h4 className="font-medium">{product.name}</h4>
              <p className="text-sm text-gray-500">{product.category}</p>
            </div>
          </div>
          <span className="font-semibold">₦{product.sales.toLocaleString()}</span>
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
    salesAnalysis: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Sales',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(35, 108, 19, 0.5)',
      }]
    },
    orderStatus: {
      labels: ['Completed', 'Pending', 'Cancelled'],
      datasets: [{
        data: [12, 19, 3],
        backgroundColor: [
          'rgba(35, 108, 19, 0.5)',
          'rgba(248, 145, 45, 0.5)',
          'rgba(239, 68, 68, 0.5)',
        ],
      }]
    },
    recentOrders: [
      { id: '1', customer: 'John Doe', product: 'Product A', amount: 1200, status: 'Completed' },
      { id: '2', customer: 'Jane Smith', product: 'Product B', amount: 950, status: 'Pending' },
      { id: '3', customer: 'Bob Johnson', product: 'Product C', amount: 750, status: 'Cancelled' },
    ],
    topProducts: [
      { id: 1, name: 'Product A', category: 'Category 1', sales: 50000, image: '/placeholder.jpg' },
      { id: 2, name: 'Product B', category: 'Category 2', sales: 45000, image: '/placeholder.jpg' },
      { id: 3, name: 'Product C', category: 'Category 3', sales: 40000, image: '/placeholder.jpg' },
    ]
  });

  return (
    <div className="space-y-6 p-6">
      <Stats stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesAnalysisChart salesAnalysis={stats.salesAnalysis} />
        </div>
        <div>
          <OrderStatusChart orderStatus={stats.orderStatus} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentOrders recentOrders={stats.recentOrders} />
        </div>
        <div>
          <TopProducts topProducts={stats.topProducts} />
        </div>
      </div>
    </div>
  );
};

export default DefaultProfileContent;
