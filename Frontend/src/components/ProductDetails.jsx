import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useErrorLogger } from "@/hooks";
import WhatsappIcon from "@/assets/whatsapp-icon.svg";
import LoadingPage from "@/componets-utils/LoadingPage";
import { ArrowLeft, Bookmark, BookmarkCheck, Store, Phone, PackageSearch, Tags, ShoppingBasket, Mail, Copy, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { getProduct } from "@/lib/api/productApi";
import { USER_PROFILE_CONTEXT, MESSAGE_API_CONTEXT, BOOKMARK_CONTEXT } from "@/contexts";
import { addToBookmarks, removeFromBookmarks, getBookmarks } from "@/lib/api/bookmarkApi";

const ProductDetails = () => {
  const { productId } = useParams();
  const errorLogger = useErrorLogger();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(null);
  const { userProfile } = useContext(USER_PROFILE_CONTEXT);
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  const { updateBookmarkCount } = useContext(BOOKMARK_CONTEXT);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const productDetails = await getProduct(productId, errorLogger);
      if (productDetails) {
        setProduct(productDetails);
        setSelectedImage(0);
      }
    };
    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (!userProfile) return;
      try {
        const bookmarks = await getBookmarks(userProfile.id, messageApi.error);
        setIsBookmarked(
          bookmarks?.some((b) => b.productId === productId) || false
        );
      } catch (err) {
        console.error("Failed to check bookmark status:", err);
      }
    };
    checkBookmarkStatus();
  }, [productId, userProfile]);

  const handleCopyPhone = (phone) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  const handleBookmarkToggle = async () => {
    if (!userProfile) {
      messageApi.error("Please login to bookmark products");
      return;
    }

    try {
      if (isBookmarked) {
        const result = await removeFromBookmarks(productId, messageApi.error);
        if (result) {
          setIsBookmarked(false);
          messageApi.success("Product removed from bookmarks");
          updateBookmarkCount();
        }
      } else {
        const result = await addToBookmarks(productId, messageApi.error);
        if (result) {
          setIsBookmarked(true);
          messageApi.success("Product added to bookmarks");
          updateBookmarkCount();
        }
      }
    } catch (err) {
      messageApi.error("Failed to update bookmark");
    }
  };

  if (!product) return <LoadingPage message="Loading product details..." />;

  return (
    <div className="bg-gray-50 pt-2 min-h-screen">
      <div className="mx-auto px-4 py-8 container">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-gray-600 hover:text-Primary"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white shadow-md p-6 rounded-lg">
          <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden aspect-square relative">
                <img
                  src={
                    product.images?.[selectedImage]?.url ||
                    product.displayImage?.url
                  }
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Image Navigation Arrows */}
                {product.images && product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                      className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>
              {/* Thumbnail Gallery */}
              {product.images && product.images.length > 1 && (
                <div className="gap-2 grid grid-cols-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-4 ${
                        selectedImage === index
                          ? "border-Primary"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6 sm:space-y-8">
              <div className="flex justify-between items-start">
                <h1 className="font-semibold text-xl sm:text-2xl capitalize tracking-tight">
                  {product.name}
                </h1>
                <button
                  onClick={handleBookmarkToggle}
                  className={`bg-Primary text-white hover:bg-Primary p-2 rounded-full transition-colors`}
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="w-6 h-6" />
                  ) : (
                    <Bookmark className="w-6 h-6" />
                  )}
                </button>
              </div>

              <div className="space-y-4">
                <p className="flex items-center gap-2 font-bold text-Primary text-xl lg:text-2xl truncate">
                  <Tags className="size-6 flex-shrink-0" />
                  <span className="truncate">₦{product.price?.toLocaleString()}</span>
                </p>

                {/* Merchant Info Card */}
                <div className="bg-gradient-to-br from-Primary/5 to-Primary/10 rounded-xl p-4 sm:p-6 border border-Primary/20">
                  <div className="flex flex-col xl:flex-row gap-4 sm:gap-6">
                    {/* Merchant Logo & Basic Info */}
                    <div className="flex flex-col text-left xl:w-1/2 xl:items-start">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border-2 border-Primary/20">
                        <img
                          src={product.merchant.logo || "/merchant-image.png"}
                          alt={product.merchant.brandName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="mt-3">
                        <h3 className="font-semibold text-base sm:text-lg text-gray-900">
                          {product.merchant.brandName}
                        </h3>
                        <button
                          onClick={() => navigate(`/merchant/${product.merchant.id}`)}
                          className="flex items-center gap-1.5 text-Primary hover:text-Primary/80 font-medium text-sm mt-1"
                        >
                          <Store className="w-4 h-4" />
                          Visit Store
                        </button>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col gap-2 sm:gap-3 xl:w-1/2">
                      {/* Primary Phone */}
                      <div className="flex items-center justify-between gap-2 bg-white/60 p-2 sm:p-2.5 rounded-lg">
                        <div className="flex items-center gap-2 min-w-0">
                          <Phone className="w-4 h-4 text-Primary flex-shrink-0" />
                          <span className="text-gray-700 font-medium truncate">
                            {product.merchant.phoneNumbers[0].number}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            handleCopyPhone(product.merchant.phoneNumbers[0].number);
                            messageApi.success("Phone number copied to clipboard");
                          }}
                          className="hover:bg-white p-1.5 rounded-md transition-colors flex-shrink-0"
                          title="Copy phone number"
                        >
                          {copiedPhone === product.merchant.phoneNumbers[0].number ? (
                            <Check className="w-4 h-4 text-Primary" />
                          ) : (
                            <Copy className="w-4 h-4 text-orange" />
                          )}
                        </button>
                      </div>

                      {/* Secondary Phone (only if exists and has a number) */}
                      {product.merchant.phoneNumbers[1]?.number && (
                        <div className="flex items-center justify-between gap-2 bg-white/60 p-2 sm:p-2.5 rounded-lg">
                          <div className="flex items-center gap-2 min-w-0">
                            <Phone className="w-4 h-4 text-Primary flex-shrink-0" />
                            <span className="text-gray-700 font-medium truncate">
                              {product.merchant.phoneNumbers[1].number}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              handleCopyPhone(product.merchant.phoneNumbers[1].number);
                              messageApi.success("Phone number copied to clipboard");
                            }}
                            className="hover:bg-white p-1.5 rounded-md transition-colors flex-shrink-0"
                            title="Copy phone number"
                          >
                            {copiedPhone === product.merchant.phoneNumbers[1].number ? (
                              <Check className="w-4 h-4 text-Primary" />
                            ) : (
                              <Copy className="w-4 h-4 text-orange" />
                            )}
                          </button>
                        </div>
                      )}

                      {/* Email */}
                      <div className="flex items-center justify-between gap-2 bg-white/60 p-2 sm:p-2.5 rounded-lg">
                        <div className="flex items-center gap-2 min-w-0">
                          <Mail className="w-4 h-4 text-Primary flex-shrink-0" />
                          <span className="text-gray-700 font-medium truncate">
                            {product.merchant.email}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(product.merchant.email);
                            setCopiedPhone('email');
                            messageApi.success("Email copied to clipboard");
                          }}
                          className="hover:bg-white p-1.5 rounded-md transition-colors flex-shrink-0"
                          title="Copy email"
                        >
                          {copiedPhone === 'email' ? (
                            <Check className="w-4 h-4 text-Primary" />
                          ) : (
                            <Copy className="w-4 h-4 text-orange" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
                    <Button
                      onClick={() => {
                        window.open(
                          `https://wa.me/${product.merchant.phoneNumbers[0].number}`,
                          "_blank"
                        );
                      }}
                      className="flex justify-center items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] py-4 sm:py-6 rounded-xl w-full font-medium text-white text-sm sm:text-base"
                    >
                      <img src={WhatsappIcon} alt="WhatsApp" className="w-5 h-5 sm:w-6 sm:h-6" />
                      Chat on WhatsApp
                    </Button>

                    <Button
                      onClick={() => navigate(`/merchant/${product.merchant.id}`)}
                      className="flex justify-center items-center gap-2 bg-Primary hover:bg-Primary/90 py-4 sm:py-6 rounded-xl w-full font-medium text-white text-sm sm:text-base"
                    >
                      <Store className="w-5 h-5 sm:w-6 sm:h-6" />
                      View All Products
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col gap-3 bg-gray-50 p-4 rounded-lg">
                  <p className="flex items-center gap-3 text-gray-600">
                    <PackageSearch className="text-Primary size-5" />
                    <span className="font-semibold">Category</span>
                    <span className="bg-white px-3 py-1 rounded-lg font-medium text-gray-900">
                      {product.category}
                    </span>
                  </p>
                  <p className="flex items-center gap-3 text-gray-600">
                    <ShoppingBasket className="text-Primary size-5" />
                    <span className="font-semibold">Stock</span>
                    <span className="bg-white px-3 py-1 rounded-lg font-medium text-gray-900">
                      {product.stock}
                    </span>
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="font-semibold text-gray-900 text-lg">
                  Description
                </h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
