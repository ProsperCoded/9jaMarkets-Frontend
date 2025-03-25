import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  AlertTriangle,
  Image as ImageIcon,
  Search,
  X,
  Store,
  Building2,
  LayoutGrid,
  Table2,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Card } from "@/components/ui/card";

const ITEMS_PER_PAGE = 10; // Reduced for better mobile view

const LocationsTable = ({
  title,
  data,
  onDelete,
  onDeleteAll,
  onCreate,
  type,
}) => {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteAllConfirmOpen, setDeleteAllConfirmOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data || []);
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'cards'

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData(data || []);
    } else {
      const filtered = (data || []).filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
    setCurrentPage(1);
  }, [searchTerm, data]);

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const currentItems = filteredData.slice(startIndex, endIndex);

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    onDelete && selectedItem && onDelete(selectedItem);
    setDeleteConfirmOpen(false);
  };

  const confirmDeleteAll = () => {
    onDeleteAll && onDeleteAll();
    setDeleteAllConfirmOpen(false);
  };

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const EmptyState = () => (
    <div className="text-center py-12">
      {type === "market" ? (
        <Store className="w-12 h-12 mx-auto text-gray-400 mb-4" />
      ) : (
        <Building2 className="w-12 h-12 mx-auto text-gray-400 mb-4" />
      )}
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No {type}s found
      </h3>
      <p className="text-gray-500 mb-4">
        {searchTerm
          ? `No ${type}s match your search criteria`
          : `Get started by creating a new ${type}`}
      </p>
      {!searchTerm && (
        <Button onClick={onCreate} className="inline-flex text-white items-center">
          <Plus className="w-4 h-4 mr-2" />
          Create {type}
        </Button>
      )}
    </div>
  );

  const CardView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {currentItems.map((item) => (
        <Card key={item.id} className="p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {item.name}
              </h3>
              <p className="mt-1 text-xs text-gray-500 truncate">
                {item.address}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {item.city}, {item.state}
              </p>
            </div>
            {item.displayImage ? (
              <img
                src={item.displayImage}
                alt={item.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-gray-400" />
              </div>
            )}
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDeleteClick(item)}
              className="text-xs bg-red-500 text-white hover:bg-red-600"
            >
              <Trash2 className="w-3 h-3 mr-1" />
              Delete
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="text-gray-500 mt-1">
            Manage your {type}s and their information
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button onClick={onCreate} className="flex-1 sm:flex-none">
            <Plus className="w-4 h-4 mr-2" />
            Create {type}
          </Button>
          {data.length > 0 && (
            <Button
              variant="destructive"
              onClick={() => setDeleteAllConfirmOpen(true)}
              className="flex-1 sm:flex-none bg-red-500 text-white hover:bg-red-600"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete All
            </Button>
          )}
        </div>
      </div>

      {data.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder={`Search ${type}s...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-8"
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2 top-2.5"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("table")}
              className="sm:flex"
            >
              <Table2 className="h-4 w-4" />
              <span className="sr-only">Table View</span>
            </Button>
            <Button
              variant={viewMode === "cards" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("cards")}
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="sr-only">Card View</span>
            </Button>
          </div>
        </div>
      )}

      {filteredData.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="bg-white rounded-lg border">
          {viewMode === "table" ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden sm:table-cell">Address</TableHead>
                    <TableHead className="hidden sm:table-cell">City</TableHead>
                    <TableHead className="hidden sm:table-cell">State</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {item.displayImage ? (
                            <img
                              src={item.displayImage}
                              alt={item.name}
                              className="w-8 h-8 rounded object-cover"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                              <ImageIcon className="w-4 h-4 text-gray-400" />
                            </div>
                          )}
                          <span className="truncate">{item.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {item.address}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {item.city}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {item.state}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteClick(item)}
                          className="bg-red-500 text-white hover:bg-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="p-4">
              <CardView />
            </div>
          )}

          {totalPages > 1 && (
            <div className="py-4 px-2 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationPrevious
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  {currentPage > 1 && (
                    <PaginationLink onClick={() => goToPage(1)}>1</PaginationLink>
                  )}
                  {currentPage > 2 && <PaginationEllipsis />}
                  <PaginationLink isActive>{currentPage}</PaginationLink>
                  {currentPage < totalPages - 1 && <PaginationEllipsis />}
                  {currentPage < totalPages && (
                    <PaginationLink onClick={() => goToPage(totalPages)}>
                      {totalPages}
                    </PaginationLink>
                  )}
                  <PaginationNext
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      )}

      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Confirm Deletion
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to delete {selectedItem?.name}? This action
            cannot be undone.
          </DialogDescription>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} className="bg-red-500 text-white hover:bg-red-600">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteAllConfirmOpen} onOpenChange={setDeleteAllConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Confirm Bulk Deletion
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to delete all {type}s? This action cannot be
            undone.
          </DialogDescription>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteAllConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteAll} className="bg-red-500 text-white hover:bg-red-600">
              Delete All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LocationsTable;
