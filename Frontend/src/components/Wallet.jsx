import { useState, useEffect } from 'react';
//import axios from 'axios'; 

const Wallet = () => {
  const [balance, setBalance] = useState(null); // State to store wallet balance
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error messages

  useEffect(() => {
    // Fetch wallet balance from the server
    const fetchBalance = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get('/api/wallet/balance'); // Replace with your API endpoint
        setBalance(response.data.balance); // Update state with fetched balance
      } catch (err) {
        setError('Failed to load wallet balance. Please try again.');
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchBalance();
  }, []); // Empty dependency array means this runs only once on component mount

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* Wallet Balance Card */}
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : (
          <>
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-4">₦{balance}</h2>
            <p className="text-center text-gray-600">
              Your wallet content can be used to purchase premium services and place ads on 9jaMarkets.
            </p>
            <button className="w-full mt-6 px-4 py-2 bg-green-600 text-white font-medium rounded-lg shadow hover:bg-green-500">
              Recharge
            </button>
            <p className="mt-4 text-center text-sm text-gray-500">
              Want to reach a wider audience?{' '}
              <a href="/profile/premium" className="text-green-600 underline">
                Subscribe to our Premium Model
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Wallet;
