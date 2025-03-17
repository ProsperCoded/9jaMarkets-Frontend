import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Trash2,
  Loader,
  AlertTriangle,
  ImageOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

const LocationsTable = ({
  title,
  data,
  onDelete,
  onDeleteAll,
  onCreate,
  loading,
  type = "market", // or "mall"
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState({
    active: true,
    inactive: true,
  });
  const [locationFilter, setLocationFilter] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteAllModalVisible, setDeleteAllModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Filter logic here
  // ...existing filter code from AdminMarkets...

  return (
    <div className="relative space-y-6">
      {loading && (
        <div className="z-50 absolute inset-0 flex justify-center items-center bg-white bg-opacity-70">
          <Loader className="w-8 h-8 text-primary animate-spin" />
        </div>
      )}

      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">{title}</h1>
        <div className="flex space-x-2">
          {type === "market" && (
            <Button
              onClick={() => setDeleteAllModalVisible(true)}
              variant="destructive"
              className="flex items-center"
            >
              <Trash2 className="mr-2 w-4 h-4" />
              Delete All
            </Button>
          )}
          <Button
            onClick={onCreate}
            className="flex items-center bg-orange hover:bg-orange/90 text-white"
          >
            <Plus className="mr-2 w-4 h-4" />
            Add New {type === "market" ? "Market" : "Mall"}
          </Button>
        </div>
      </div>

      {/* Search and filter section */}
      {/* ...existing code... */}

      {/* Table section with enhanced image display */}
      <div className="bg-white shadow-sm rounded-xl overflow-hidden">
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden transition-shadow"
            >
              <div className="relative aspect-video">
                {item.displayImage ? (
                  <img
                    src={item.displayImage}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex justify-center items-center bg-gray-100 w-full h-full">
                    <ImageOff className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                <span
                  className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${
                    !item.deletedAt
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {!item.deletedAt ? "active" : "inactive"}
                </span>
              </div>

              <div className="p-4">
                <h3 className="mb-1 font-semibold text-lg">{item.name}</h3>
                <p className="mb-2 text-gray-500 text-sm">
                  {item.city && item.state
                    ? `${item.city}, ${item.state}`
                    : item.city || item.state || item.address || "N/A"}
                </p>
                {item.description && (
                  <p className="mb-2 text-gray-600 text-sm line-clamp-2">
                    {item.description}
                  </p>
                )}
                <p className="text-gray-500 text-sm">
                  {item.merchants?.length || 0} merchants
                </p>

                <div className="flex justify-end space-x-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedItem(item);
                      setDeleteModalVisible(true);
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteModalVisible} onOpenChange={setDeleteModalVisible}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-500">
              <AlertTriangle className="mr-2 w-5 h-5" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedItem?.name}"?
              <p className="mt-2">This action cannot be undone.</p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteModalVisible(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => onDelete(selectedItem)}
              disabled={loading}
            >
              {loading && <Loader className="mr-2 w-4 h-4 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete All Confirmation Dialog */}
      {type === "market" && (
        <Dialog
          open={deleteAllModalVisible}
          onOpenChange={setDeleteAllModalVisible}
        >
          {/* ...existing delete all dialog code... */}
        </Dialog>
      )}
    </div>
  );
};

export default LocationsTable;
