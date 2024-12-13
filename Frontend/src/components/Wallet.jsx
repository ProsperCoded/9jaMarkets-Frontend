import { useState, useEffect } from "react";
// import axios from 'axios';

const Wallet = () => {
  const [balance, setBalance] = useState(null); // State to store wallet balance
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error messages
  const [recentTransactions, setRecentTransactions] = useState([]); // State for recent transactions

  useEffect(() => {
    // Fetch wallet balance and other data
    const fetchWalletData = async () => {
      try {
        setLoading(true); // Start loading

        // Simulating an API call
        // const balanceResponse = await axios.get('/api/wallet/balance'); // Replace with actual endpoint
        const transactionsResponse = await new Promise((resolve) =>
          setTimeout(() => {
            resolve({
              data: {
                transactions: [
                  {
                    id: 1,
                    date: "2024-11-18",
                    amount: -500,
                    description: "Ad Placement",
                  },
                  {
                    id: 2,
                    date: "2024-11-15",
                    amount: 2000,
                    description: "Wallet Recharge",
                  },
                  {
                    id: 3,
                    date: "2024-11-10",
                    amount: -1000,
                    description: "Premium Subscription",
                  },
                ],
              },
            });
          }, 1000)
        );

        setBalance(1500); // Simulated balance
        setRecentTransactions(transactionsResponse.data.transactions); // Update transactions
      } catch (err) {
        setError("Failed to load wallet data. Please try again.");
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchWalletData();
  }, []); // Empty dependency array means this runs only once on component mount

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      {/* Wallet Balance Card */}
      <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-3xl">
        {loading ? (
          <div className="text-center text-gray-600">
            Loading wallet balance...
          </div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : (
          <>
            <h2 className="mb-4 font-bold text-4xl text-center text-gray-800">
              ₦{balance}
            </h2>
            <p className="text-center text-gray-600">
              Your wallet content can be used to purchase premium services and
              place ads on 9jaMarkets.
            </p>
            <button className="bg-Primary hover:bg-green-500 shadow mt-6 px-4 py-2 rounded-lg w-full font-medium text-white">
              Recharge
            </button>
            <p className="mt-4 text-center text-gray-500 text-sm">
              Want to reach a wider audience?{" "}
              <a href="/profile/premium" className="text-Primary underline">
                Subscribe to our Premium Model
              </a>
            </p>
          </>
        )}
        <h3 className="mb-4 font-semibold text-2xl text-gray-800">
          Recent Transactions
        </h3>
        {loading ? (
          <div className="text-center text-gray-600">
            Loading transactions...
          </div>
        ) : recentTransactions.length === 0 ? (
          <div className="text-center text-gray-600">
            No recent transactions found.
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {recentTransactions.map((transaction) => (
              <li
                key={transaction.id}
                className="flex justify-between items-center py-4"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {transaction.description}
                  </p>
                  <p className="text-gray-500 text-sm">{transaction.date}</p>
                </div>
                <p
                  className={`font-semibold ${
                    transaction.amount < 0 ? "text-red-600" : "text-Primary-600"
                  }`}
                >
                  {transaction.amount < 0 ? "-" : "+"}₦
                  {Math.abs(transaction.amount)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Wallet;
