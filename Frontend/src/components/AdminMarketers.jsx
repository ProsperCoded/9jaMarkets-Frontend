import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Mail,
  UserCheck,
  UserX,
  Calendar,
} from "lucide-react";

const AdminMarketers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewDetails, setViewDetails] = useState(null);

  // Dummy data for marketers
  const marketers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+234 812 345 6789",
      markets: 10,
      status: "active",
      joinDate: "2023-03-15",
      commission: "₦52,400",
      progress: 75,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+234 802 123 4567",
      markets: 7,
      status: "active",
      joinDate: "2023-04-20",
      commission: "₦38,200",
      progress: 62,
    },
    {
      id: 3,
      name: "David Wilson",
      email: "david.wilson@example.com",
      phone: "+234 703 987 6543",
      markets: 5,
      status: "inactive",
      joinDate: "2023-05-10",
      commission: "₦21,800",
      progress: 35,
    },
    {
      id: 4,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      phone: "+234 908 765 4321",
      markets: 12,
      status: "active",
      joinDate: "2023-02-05",
      commission: "₦64,500",
      progress: 90,
    },
    {
      id: 5,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "+234 817 234 5678",
      markets: 8,
      status: "active",
      joinDate: "2023-06-18",
      commission: "₦43,600",
      progress: 70,
    },
    {
      id: 6,
      name: "Amanda Lee",
      email: "amanda.lee@example.com",
      phone: "+234 809 876 5432",
      markets: 3,
      status: "inactive",
      joinDate: "2023-07-25",
      commission: "₦12,300",
      progress: 20,
    },
  ];

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Marketers Management</h1>
        <button className="flex items-center bg-orange px-4 py-2 rounded-lg text-white">
          <Plus className="mr-2 w-4 h-4" />
          Add New Marketer
        </button>
      </div>

      {/* Search and filter */}
      <div className="flex sm:flex-row flex-col justify-between gap-4">
        <div className="relative flex-grow max-w-md">
          <Search className="top-1/2 left-3 absolute w-5 h-5 text-gray-400 -translate-y-1/2 transform" />
          <input
            type="text"
            placeholder="Search marketers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="py-2 pr-4 pl-10 border border-gray-300 focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-orange w-full"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center space-x-2 hover:bg-gray-50 px-4 py-2 border border-gray-300 rounded-lg"
          >
            <Filter className="w-5 h-5" />
            <span>Filter</span>
          </button>

          {filterOpen && (
            <div className="right-0 z-10 absolute bg-white shadow-lg mt-2 p-4 border border-gray-200 rounded-lg w-64">
              <h3 className="mb-2 font-medium">Filter by Status</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Active</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Inactive</span>
                </label>
              </div>

              <h3 className="mt-4 mb-2 font-medium">Join Date</h3>
              <div className="space-y-2">
                <div>
                  <label className="text-gray-500 text-xs">From</label>
                  <input
                    type="date"
                    className="p-1 border border-gray-300 rounded-md w-full text-sm"
                  />
                </div>
                <div>
                  <label className="text-gray-500 text-xs">To</label>
                  <input
                    type="date"
                    className="p-1 border border-gray-300 rounded-md w-full text-sm"
                  />
                </div>
              </div>

              <h3 className="mt-4 mb-2 font-medium">Markets Count</h3>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  placeholder="Min"
                  className="p-1 border border-gray-300 rounded-md w-1/2 text-sm"
                />
                <span>-</span>
                <input
                  type="number"
                  min="0"
                  placeholder="Max"
                  className="p-1 border border-gray-300 rounded-md w-1/2 text-sm"
                />
              </div>

              <div className="flex justify-end mt-4">
                <button className="bg-orange px-3 py-1 rounded-md text-white">
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Marketers table */}
      <div className="bg-white shadow-sm rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="divide-y divide-gray-200 min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider"
                >
                  Marketer Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider"
                >
                  Contact Information
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider"
                >
                  Markets
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider"
                >
                  Join Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-medium text-gray-500 text-xs text-right uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {marketers.map((marketer) => (
                <tr key={marketer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {marketer.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900 text-sm">
                      {marketer.email}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {marketer.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900 text-sm">
                      {marketer.markets} markets
                    </div>
                    <div className="text-gray-500 text-sm">
                      Commission: {marketer.commission}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="mr-1 w-4 h-4" />
                      {formatDate(marketer.joinDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        marketer.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {marketer.status}
                    </span>
                    <div className="bg-gray-200 mt-1 rounded-full w-full h-1.5">
                      <div
                        className="bg-orange rounded-full h-1.5"
                        style={{ width: `${marketer.progress}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-sm text-right whitespace-nowrap">
                    <div className="flex justify-end items-center space-x-2">
                      <button
                        className="hover:bg-gray-100 p-1 rounded-full"
                        onClick={() => setViewDetails(marketer)}
                      >
                        {marketer.status === "active" ? (
                          <UserCheck className="w-5 h-5 text-green-500" />
                        ) : (
                          <UserX className="w-5 h-5 text-gray-500" />
                        )}
                      </button>
                      <button className="hover:bg-gray-100 p-1 rounded-full">
                        <Mail className="w-5 h-5 text-gray-500" />
                      </button>
                      <button className="hover:bg-gray-100 p-1 rounded-full">
                        <Edit className="w-5 h-5 text-gray-500" />
                      </button>
                      <button className="hover:bg-gray-100 p-1 rounded-full">
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center px-6 py-3 border-gray-200 border-t">
          <div className="text-gray-500 text-sm">
            Showing 1 to 6 of 6 entries
          </div>
          <div className="flex space-x-2">
            <button className="bg-white disabled:opacity-50 px-3 py-1 border border-gray-300 rounded-md text-sm">
              Previous
            </button>
            <button className="bg-orange bg-white px-3 py-1 border border-gray-300 rounded-md text-white text-sm">
              1
            </button>
            <button className="bg-white disabled:opacity-50 px-3 py-1 border border-gray-300 rounded-md text-sm">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Marketer details modal */}
      {viewDetails && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 p-4">
          <div className="bg-white shadow-xl rounded-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-xl">Marketer Details</h2>
                <button
                  onClick={() => setViewDetails(null)}
                  className="hover:bg-gray-100 p-1 rounded-full"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 font-semibold text-gray-500">
                    Personal Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-500 text-sm">Name</span>
                      <p className="font-medium">{viewDetails.name}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">Email</span>
                      <p className="font-medium">{viewDetails.email}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">Phone</span>
                      <p className="font-medium">{viewDetails.phone}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">Join Date</span>
                      <p className="font-medium">
                        {formatDate(viewDetails.joinDate)}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">Status</span>
                      <p
                        className={`font-medium ${
                          viewDetails.status === "active"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {viewDetails.status.charAt(0).toUpperCase() +
                          viewDetails.status.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold text-gray-500">
                    Performance
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-500 text-sm">
                        Markets Managed
                      </span>
                      <p className="font-medium">{viewDetails.markets}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">
                        Commission Earned
                      </span>
                      <p className="font-medium">{viewDetails.commission}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">
                        Performance Score
                      </span>
                      <div className="flex items-center">
                        <div className="flex-grow bg-gray-200 mr-2 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${
                              viewDetails.progress > 70
                                ? "bg-green-500"
                                : viewDetails.progress > 40
                                ? "bg-orange"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${viewDetails.progress}%` }}
                          ></div>
                        </div>
                        <span className="font-medium text-sm">
                          {viewDetails.progress}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <h3 className="mt-6 mb-2 font-semibold text-gray-500">
                    Actions
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <button className="flex items-center bg-blue-50 px-3 py-1.5 rounded-lg text-blue-600 text-sm">
                      <Mail className="mr-1 w-4 h-4" />
                      Send Email
                    </button>
                    <button className="flex items-center bg-green-50 px-3 py-1.5 rounded-lg text-green-600 text-sm">
                      <Edit className="mr-1 w-4 h-4" />
                      Edit Details
                    </button>
                    {viewDetails.status === "active" ? (
                      <button className="flex items-center bg-orange-50 px-3 py-1.5 rounded-lg text-orange-600 text-sm">
                        <UserX className="mr-1 w-4 h-4" />
                        Deactivate
                      </button>
                    ) : (
                      <button className="flex items-center bg-green-50 px-3 py-1.5 rounded-lg text-green-600 text-sm">
                        <UserCheck className="mr-1 w-4 h-4" />
                        Activate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end bg-gray-50 p-6 border-t">
              <button
                onClick={() => setViewDetails(null)}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMarketers;
