import { useState, useEffect, useContext } from "react";
import { MESSAGE_API_CONTEXT } from "@/contexts";
import {
  getAllMarketersApi,
  verifyMarketerApi,
  deleteMarketerApi,
} from "@/lib/api/marketerApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import {
  Check,
  X,
  Eye,
  Trash2,
  ExternalLink,
  Loader2,
  Search,
  ShieldCheck,
  ShieldAlert,
  ImageIcon,
} from "lucide-react";
import { Input } from "./ui/input";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const AdminMarketers = () => {
  const [marketers, setMarketers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMarketer, setSelectedMarketer] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [processingId, setProcessingId] = useState(null);
  const [activeTab, setActiveTab] = useState("unverified");
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const messageApi = useContext(MESSAGE_API_CONTEXT);

  // Fetch all marketers
  useEffect(() => {
    const fetchMarketers = async () => {
      try {
        setLoading(true);
        const data = await getAllMarketersApi((message) =>
          messageApi.error(message || "Failed to fetch marketers")
        );
        if (data) {
          setMarketers(data);
        }
      } catch (error) {
        console.error("Error fetching marketers:", error);
        messageApi.error("Failed to load marketers");
      } finally {
        setLoading(false);
      }
    };

    fetchMarketers();
  }, [messageApi]);

  // View marketer details - Updated to use existing data instead of fetching again
  const handleViewMarketer = (id) => {
    // Find the marketer in the existing array by id
    const marketer = marketers.find((m) => m.id === id);

    if (marketer) {
      setSelectedMarketer(marketer);
      setViewDialogOpen(true);
    } else {
      messageApi.error("Marketer not found");
    }
  };

  // Verify marketer
  const handleVerifyMarketer = async (id) => {
    try {
      setProcessingId(id);
      const result = await verifyMarketerApi(
        id,
        (message) => messageApi.error(message || "Failed to verify marketer"),
        (message) =>
          messageApi.success(message || "Marketer verified successfully")
      );

      if (result) {
        // Update marketers list
        setMarketers((prev) =>
          prev.map((marketer) =>
            marketer.id === id ? { ...marketer, verified: true } : marketer
          )
        );

        // Close the view dialog if it's open
        if (viewDialogOpen && selectedMarketer?.id === id) {
          setSelectedMarketer({ ...selectedMarketer, verified: true });
        }
      }
    } catch (error) {
      console.error("Error verifying marketer:", error);
      messageApi.error("Failed to verify marketer");
    } finally {
      setProcessingId(null);
    }
  };

  // Delete marketer
  const handleDeleteMarketer = async () => {
    if (!selectedMarketer) return;

    try {
      setProcessingId(selectedMarketer.id);
      const result = await deleteMarketerApi(
        selectedMarketer.id,
        (message) => messageApi.error(message || "Failed to delete marketer"),
        (message) =>
          messageApi.success(message || "Marketer deleted successfully")
      );

      if (result) {
        // Remove from marketers list
        setMarketers((prev) =>
          prev.filter((marketer) => marketer.id !== selectedMarketer.id)
        );
        setDeleteDialogOpen(false);
        setViewDialogOpen(false);
      }
    } catch (error) {
      console.error("Error deleting marketer:", error);
      messageApi.error("Failed to delete marketer");
    } finally {
      setProcessingId(null);
    }
  };

  // Open image in modal
  const handleImageClick = (imageUrl, marketer) => {
    setSelectedImage({
      url: imageUrl,
      idType: marketer.IdentityCredentialType,
      marketer: `${marketer.firstName} ${marketer.lastName}`,
    });
    setImageModalOpen(true);
  };

  // Filter marketers based on verified status and search term
  const filteredMarketers = marketers.filter(
    (marketer) =>
      (activeTab === "verified" ? marketer.verified : !marketer.verified) &&
      (searchTerm === "" ||
        marketer.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        marketer.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        marketer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        marketer.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        marketer.phoneNumber?.includes(searchTerm))
  );

  // Count verified and unverified marketers
  const verifiedCount = marketers.filter((m) => m.verified).length;
  const unverifiedCount = marketers.filter((m) => !m.verified).length;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 text-Primary animate-spin" />
        <span className="ml-2">Loading marketers...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-Primary text-2xl">
          Marketers Management
        </h1>
        <div className="relative w-64">
          <Search className="top-3 left-3 absolute w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search marketers..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs
        defaultValue="unverified"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="unverified" className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            <span className="hidden sm:inline">Pending Verification</span>
            <Badge className="bg-yellow-100 ml-1 text-yellow-800">
              {unverifiedCount}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="verified" className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span className="hidden sm:inline">Verified Marketers</span>
            <Badge className="bg-green-100 ml-1 text-green-800">
              {verifiedCount}
            </Badge>
          </TabsTrigger>
        </TabsList>

        {["verified", "unverified"].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue} className="mt-0">
            {marketers.length === 0 ? (
              <div className="py-8 text-gray-500 text-center">
                No marketers found. Marketers will appear here once they
                register.
              </div>
            ) : filteredMarketers.length === 0 ? (
              <div className="py-8 text-gray-500 text-center">
                No {tabValue} marketers found.
              </div>
            ) : (
              <div className="bg-white border rounded-md overflow-x-auto">
                <div className="min-w-[1000px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[150px]">Marketer</TableHead>
                        <TableHead className="min-w-[100px]">Username</TableHead>
                        <TableHead className="min-w-[200px]">Contact</TableHead>
                        <TableHead className="min-w-[120px]">Business Type</TableHead>
                        <TableHead className="min-w-[120px]">ID Type</TableHead>
                        <TableHead className="min-w-[120px]">Registered</TableHead>
                        <TableHead className="text-right min-w-[120px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMarketers.map((marketer) => (
                        <TableRow key={marketer.id}>
                          <TableCell className="font-medium">
                            {marketer.firstName} {marketer.lastName}
                          </TableCell>
                          <TableCell>{marketer.username}</TableCell>
                          <TableCell>
                            <div>{marketer.email}</div>
                            <div className="text-gray-500 text-sm">
                              {marketer.phoneNumber}
                            </div>
                          </TableCell>
                          <TableCell>
                            {marketer.BusinessType || "Not specified"}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="text-sm">
                                {marketer.IdentityCredentialType}
                              </div>
                              {marketer.IdentityCredentialImage && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="hover:bg-gray-100 rounded-full w-8 h-8"
                                  onClick={() =>
                                    handleImageClick(
                                      marketer.IdentityCredentialImage,
                                      marketer
                                    )
                                  }
                                >
                                  <ImageIcon className="w-4 h-4 text-gray-600" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            {marketer.createdAt
                              ? format(
                                  new Date(marketer.createdAt),
                                  "MMM d, yyyy"
                                )
                              : "N/A"}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewMarketer(marketer.id)}
                                disabled={processingId === marketer.id}
                                title="View details"
                              >
                                {processingId === marketer.id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </Button>
                              {!marketer.verified && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-green-600 hover:text-green-700"
                                  onClick={() =>
                                    handleVerifyMarketer(marketer.id)
                                  }
                                  disabled={processingId === marketer.id}
                                  title="Verify marketer"
                                >
                                  {processingId === marketer.id ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <Check className="w-4 h-4" />
                                  )}
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-white hover:bg-red-600"
                                onClick={() => {
                                  setSelectedMarketer(marketer);
                                  setDeleteDialogOpen(true);
                                }}
                                disabled={processingId === marketer.id}
                                title="Delete marketer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* View Marketer Details Dialog */}
      {selectedMarketer && (
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">Marketer Details</DialogTitle>
              <DialogDescription>
                Complete information about the selected marketer.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* Status Badge */}
              <div className="flex justify-end">
                {selectedMarketer.verified ? (
                  <Badge className="flex items-center gap-1 bg-green-100 text-green-800">
                    <ShieldCheck className="w-3 h-3" /> Verified
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 bg-yellow-100 text-yellow-800"
                  >
                    <ShieldAlert className="w-3 h-3" /> Pending Verification
                  </Badge>
                )}
              </div>

              {/* Personal Information */}
              <div>
                <h3 className="mb-3 font-semibold text-gray-800">
                  Personal Information
                </h3>
                <div className="gap-4 grid grid-cols-2">
                  <div>
                    <h4 className="font-medium text-gray-500 text-sm">Name</h4>
                    <p>
                      {selectedMarketer.firstName} {selectedMarketer.lastName}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-500 text-sm">
                      Username
                    </h4>
                    <p>{selectedMarketer.username}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-500 text-sm">Email</h4>
                    <p>{selectedMarketer.email}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-500 text-sm">Phone</h4>
                    <p>{selectedMarketer.phoneNumber}</p>
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div>
                <h3 className="mb-3 font-semibold text-gray-800">
                  Business Information
                </h3>
                <div className="gap-4 grid grid-cols-2">
                  <div>
                    <h4 className="font-medium text-gray-500 text-sm">
                      Referrer Code
                    </h4>
                    <p className="inline-block bg-gray-100 px-2 py-1 rounded font-mono">
                      {selectedMarketer.referrerCode}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-500 text-sm">
                      Business Type
                    </h4>
                    <p>{selectedMarketer.BusinessType || "Not specified"}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-500 text-sm">
                      Registered On
                    </h4>
                    <p>
                      {selectedMarketer.createdAt
                        ? format(
                            new Date(selectedMarketer.createdAt),
                            "MMM d, yyyy"
                          )
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Marketing Experience */}
              <div>
                <h3 className="mb-3 font-semibold text-gray-800">
                  Marketing Experience
                </h3>
                <p className="bg-gray-50 p-3 rounded text-gray-700 text-sm">
                  {selectedMarketer.marketingExperience || "None provided"}
                </p>
              </div>

              {/* Bank Details */}
              <div>
                <h3 className="mb-3 font-semibold text-gray-800">
                  Bank Details
                </h3>
                <div className="gap-4 grid grid-cols-3">
                  <div>
                    <h4 className="font-medium text-gray-500 text-sm">
                      Bank Name
                    </h4>
                    <p>{selectedMarketer.accountBank}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-500 text-sm">
                      Account Name
                    </h4>
                    <p>{selectedMarketer.accountName}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-500 text-sm">
                      Account Number
                    </h4>
                    <p>{selectedMarketer.accountNumber}</p>
                  </div>
                </div>
              </div>

              {/* Identity Verification */}
              <div>
                <h3 className="mb-3 font-semibold text-gray-800">
                  Identity Verification
                </h3>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-500 text-sm">
                      ID Type
                    </h4>
                    <p>{selectedMarketer.IdentityCredentialType}</p>
                  </div>
                  {selectedMarketer.IdentityCredentialImage && (
                    <div className="text-center">
                      <h4 className="mb-2 font-medium text-gray-500 text-sm">
                        ID Image
                      </h4>
                      <div
                        className="hover:opacity-90 border rounded overflow-hidden transition-opacity cursor-pointer"
                        onClick={() =>
                          handleImageClick(
                            selectedMarketer.IdentityCredentialImage,
                            selectedMarketer
                          )
                        }
                      >
                        <img
                          src={selectedMarketer.IdentityCredentialImage}
                          alt="ID Credential"
                          className="w-32 h-20 object-cover"
                        />
                      </div>
                      <p className="mt-1 text-gray-500 text-xs">
                        Click to enlarge
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between pt-4">
                {!selectedMarketer.verified && (
                  <Button
                    variant="default"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleVerifyMarketer(selectedMarketer.id)}
                    disabled={processingId === selectedMarketer.id}
                  >
                    {processingId === selectedMarketer.id ? (
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    ) : (
                      <Check className="mr-2 w-4 h-4" />
                    )}
                    Approve Marketer
                  </Button>
                )}
                <Button
                  variant="default"
                  className="bg-red-600 hover:bg-red-700 ml-auto"
                  onClick={() => {
                    setViewDialogOpen(false);
                    setDeleteDialogOpen(true);
                  }}
                >
                  <Trash2 className="mr-2 w-4 h-4" /> Delete Marketer
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* ID Image Modal */}
      <Dialog open={imageModalOpen} onOpenChange={setImageModalOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Identity Document</DialogTitle>
            <DialogDescription>
              {selectedImage?.idType} for {selectedImage?.marketer}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            {selectedImage && (
              <img
                src={selectedImage.url}
                alt="ID Document"
                className="shadow-md rounded-md max-w-full max-h-[60vh] object-contain"
              />
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setImageModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this marketer? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              <X className="mr-2 w-4 h-4" /> Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteMarketer}
              disabled={processingId === selectedMarketer?.id}
            >
              {processingId === selectedMarketer?.id ? (
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="mr-2 w-4 h-4" />
              )}
              Delete Marketer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminMarketers;
