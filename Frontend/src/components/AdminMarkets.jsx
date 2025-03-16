import React, { useState } from "react";
import { Search, Filter, Plus, Edit, Trash2, ExternalLink } from "lucide-react";

const AdminMarkets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  // Dummy data for markets
  const markets = [
    {
      id: 1,
      name: "Balogun Market",
      location: "Lagos Island",
      vendors: 254,
      status: "active",
    },
    {
      id: 2,
      name: "Computer Village",
      location: "Ikeja",
      vendors: 310,
      status: "active",
    },
    {
      id: 3,
      name: "Tejuosho Market",
      location: "Yaba",
      vendors: 186,
      status: "active",
    },
    {
      id: 4,
      name: "Alaba International Market",
      location: "Ojo",
      vendors: 423,
      status: "active",
    },
    {
      id: 5,
      name: "Idumota Market",
      location: "Lagos Island",
      vendors: 198,
      status: "inactive",
    },
    {
      id: 6,
      name: "Oyingbo Market",
      location: "Ebute Metta",
      vendors: 137,
      status: "active",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Markets Management</h1>
        <button className="flex items-center bg-orange px-4 py-2 rounded-lg text-white">
          <Plus className="mr-2 w-4 h-4" />
          Add New Market
        </button>
      </div>

      {/* Search and filter */}
      <div className="flex sm:flex-row flex-col justify-between gap-4">
        <div className="relative flex-grow max-w-md">
          <Search className="top-1/2 left-3 absolute w-5 h-5 text-gray-400 -translate-y-1/2 transform" />
          <input
            type="text"
            placeholder="Search markets..."
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

              <h3 className="mt-4 mb-2 font-medium">Filter by Location</h3>
              <select className="p-2 border border-gray-300 rounded-md w-full">
                <option value="">All Locations</option>
                <option value="Lagos Island">Lagos Island</option>
                <option value="Ikeja">Ikeja</option>
                <option value="Yaba">Yaba</option>
              </select>

              <div className="flex justify-end mt-4">
                <button className="bg-orange px-3 py-1 rounded-md text-white">
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Markets table */}
      <div className="bg-white shadow-sm rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="divide-y divide-gray-200 min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider"
                >
                  Market Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider"
                >
                  Location
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider"
                >
                  Vendors
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
              {markets.map((market) => (
                <tr key={market.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {market.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500">{market.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500">{market.vendors}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        market.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {market.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-sm text-right whitespace-nowrap">
                    <div className="flex justify-end items-center space-x-2">
                      <button className="hover:bg-gray-100 p-1 rounded-full">
                        <ExternalLink className="w-5 h-5 text-gray-500" />
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
    </div>
  );
};

export default AdminMarkets;
