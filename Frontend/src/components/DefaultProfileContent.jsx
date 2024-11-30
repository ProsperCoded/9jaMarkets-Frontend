import { useEffect, useState } from 'react';

const DefaultProfileContent = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a backend fetch
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('/api/user'); // Replace with your actual API endpoint
        const data = await response.json();
        setUserDetails(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userDetails) {
    return <div>Failed to load user details.</div>;
  }

  return (
    <div className="p-6 bg-white shadow rounded-md">
      <h2 className="text-2xl font-bold mb-4">Personal Details</h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-gray-500 text-sm">First Name</p>
          <p className="text-lg font-medium">{userDetails.firstName}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Last Name</p>
          <p className="text-lg font-medium">{userDetails.lastName}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Email</p>
          <p className="text-lg font-medium">{userDetails.email}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Phone</p>
          <p className="text-lg font-medium">{userDetails.phone}</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-500 text-sm">Address</p>
          <p className="text-lg font-medium">{userDetails.address}</p>
        </div>
      </div>
    </div>
  );
};

export default DefaultProfileContent;
