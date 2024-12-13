import { useState, useEffect } from 'react';
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
                  { id: 1, date: '2024-11-18', amount: -500, description: 'Ad Placement' },
                  { id: 2, date: '2024-11-15', amount: 2000, description: 'Wallet Recharge' },
                  { id: 3, date: '2024-11-10', amount: -1000, description: 'Premium Subscription' },
                ],
              },
            });
          }, 1000)
        );

        setBalance(1500); // Simulated balance
        setRecentTransactions(transactionsResponse.data.transactions); // Update transactions
      } catch (err) {
        setError('Failed to load wallet data. Please try again.');
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchWalletData();
  }, []); // Empty dependency array means this runs only once on component mount

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Wallet Balance Card */}
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
        {loading ? (
          <div className="text-center text-gray-600">Loading wallet balance...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : (
          <>
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-4">₦{balance}</h2>
            <p className="text-center text-gray-600">
              Your wallet content can be used to purchase premium services and place ads on 9jaMarkets.
            </p>
            <button className="w-full mt-6 px-4 py-2 bg-Primary text-white font-medium rounded-lg shadow hover:bg-green-500">
              Recharge
            </button>
            <p className="mt-4 text-center text-sm text-gray-500">
              Want to reach a wider audience?{' '}
              <a href="/profile/premium" className="text-Primary underline">
                Subscribe to our Premium Model
              </a>
            </p>
          </>
        )}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Recent Transactions</h3>
        {loading ? (
          <div className="text-center text-gray-600">Loading transactions...</div>
        ) : recentTransactions.length === 0 ? (
          <div className="text-center text-gray-600">No recent transactions found.</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {recentTransactions.map((transaction) => (
              <li key={transaction.id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="text-gray-800 font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
                <p
                  className={`font-semibold ${
                    transaction.amount < 0 ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {transaction.amount < 0 ? '-' : '+'}₦{Math.abs(transaction.amount)}
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
