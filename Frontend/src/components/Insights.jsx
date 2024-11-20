import { useState, useEffect } from "react";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

//ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Insights = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data for the bar chart
    const fetchInsights = async () => {
      try {
        setLoading(true);

        // Replace with your actual backend API endpoint
        const response = await axios.get("/api/insights");

        const data = response.data;

        // Transform the backend data for the chart
        const transformedData = {
          labels: data.dates, // e.g., ["July", "August", "September"]
          datasets: [
            {
              label: "Impressions",
              data: data.impressions, // e.g., [200, 300, 400]
              backgroundColor: "rgba(34, 197, 94, 0.6)", // Green
            },
            {
              label: "Visitors",
              data: data.visitors, // e.g., [150, 250, 350]
              backgroundColor: "rgba(59, 130, 246, 0.6)", // Blue
            },
            {
              label: "Phone Views",
              data: data.phoneViews, // e.g., [100, 200, 300]
              backgroundColor: "rgba(251, 191, 36, 0.6)", // Yellow
            },
            {
              label: "Chat Requests",
              data: data.chatRequests, // e.g., [50, 100, 150]
              backgroundColor: "rgba(239, 68, 68, 0.6)", // Red
            },
          ],
        };

        setChartData(transformedData);
      } catch (err) {
        setError("Failed to load insights data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  return (
    <div className="flex-1 p-8 bg-gray-100">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Insights</h1>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {loading ? (
          <p className="text-center text-gray-500">Loading chart...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Performance Insights",
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Insights;
