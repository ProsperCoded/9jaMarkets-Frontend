import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  AlertTriangle,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
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
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 20;

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

  // Update filtered data when search term or data changes
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData(data || []);
    } else {
      const filtered = (data || []).filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm, data]);

  // Calculate pagination
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

  // Handle page changes
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm("");
  };

  // Generate pagination numbers
  const getPaginationNumbers = () => {
    const pages = [];

    // Always show first page
    pages.push(1);

    // Calculate range around current page
    let rangeStart = Math.max(2, currentPage - 1);
    let rangeEnd = Math.min(totalPages - 1, currentPage + 1);

    // Add ellipsis if there's a gap after page 1
    if (rangeStart > 2) {
      pages.push("ellipsis-start");
    }

    // Add pages in range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    // Add ellipsis if there's a gap before last page
    if (rangeEnd < totalPages - 1 && totalPages > 1) {
      pages.push("ellipsis-end");
    }

    // Always show last page if it exists
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-4">
        <h1 className="font-bold text-2xl">{title}</h1>
        <div className="flex items-center space-x-2">
          {onDeleteAll && (
            <Button
              variant="outline"
              className="border-red-200 text-red-500"
              onClick={() => setDeleteAllConfirmOpen(true)}
            >
              <Trash2 className="mr-2 w-4 h-4" />
              Delete All
            </Button>
          )}
          {onCreate && (
            <Button onClick={onCreate}>
              <Plus className="mr-2 w-4 h-4" />
              Create {type === "mall" ? "Mall" : "Market"}
            </Button>
          )}
        </div>
      </div>

      {/* Search input */}
      <div className="relative">
        <div className="flex items-center bg-white shadow-sm border rounded-lg overflow-hidden">
          <div className="px-3 text-gray-400">
            <Search className="w-5 h-5" />
          </div>
          <Input
            type="text"
            placeholder={`Search ${
              type === "mall" ? "malls" : "markets"
            } by name...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="px-3 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {filteredData.length > 0 ? (
        <>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.displayImage ? (
                        <img
                          src={item.displayImage}
                          alt={item.name}
                          className="rounded-md size-[5rem] object-cover"
                        />
                      ) : (
                        <div className="flex justify-center items-center bg-gray-100 rounded-md w-12 h-12">
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="overflow-clip">
                      <p className="font-semibold text-lg">{item.name}</p>
                      <p className="max-w-[25vw] overflow-ellipsis overflow-hidden text-gray-800 text-nowrap">
                        {item.description}
                      </p>
                    </TableCell>
                    <TableCell>{item.address}</TableCell>
                    <TableCell>{item.city || "—"}</TableCell>
                    <TableCell>{item.state || "—"}</TableCell>
                    <TableCell>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(item)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  {getPaginationNumbers().map((page, idx) => (
                    <PaginationItem key={`page-${page}-${idx}`}>
                      {page === "ellipsis-start" || page === "ellipsis-end" ? (
                        <PaginationEllipsis />
                      ) : (
                        <PaginationLink
                          isActive={page === currentPage}
                          onClick={() => goToPage(page)}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}

          <div className="text-gray-500 text-sm text-center">
            Showing {startIndex + 1}-{endIndex} of {totalItems}{" "}
            {type === "mall" ? "malls" : "markets"}
            {searchTerm && " (filtered)"}
          </div>
        </>
      ) : (
        <div className="py-10 border rounded-lg text-center">
          {searchTerm ? (
            <div className="space-y-2">
              <p className="text-gray-500">
                No {type === "mall" ? "malls" : "markets"} found matching "
                {searchTerm}".
              </p>
              <Button variant="outline" onClick={handleClearSearch} size="sm">
                Clear Search
              </Button>
            </div>
          ) : (
            <p className="text-gray-500">
              No {type === "mall" ? "malls" : "markets"} found. Click "Create{" "}
              {type === "mall" ? "Mall" : "Market"}" to add one.
            </p>
          )}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedItem?.name}"? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete All Confirmation Dialog */}
      <Dialog
        open={deleteAllConfirmOpen}
        onOpenChange={setDeleteAllConfirmOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertTriangle className="mr-2 w-5 h-5 text-red-500" />
              Confirm Delete All
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete ALL{" "}
              {type === "mall" ? "malls" : "markets"}? This action CANNOT be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteAllConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteAll}>
              Delete All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LocationsTable;
