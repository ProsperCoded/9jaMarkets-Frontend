import { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useErrorLogger } from "@/hooks";
import WhatsappIcon from "@/assets/whatsapp-icon.svg";
import LoadingPage from "@/componets-utils/LoadingPage";
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Store,
  Phone,
  PackageSearch,
  Tags,
  ShoppingBasket,
  Mail,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Crown,
  Star,
  Award,
  Calendar,
} from "lucide-react";
import { Button } from "./ui/button";
import { getProduct } from "@/lib/api/productApi";
import { getAdByProduct } from "@/lib/api/adApi";
import {
  USER_PROFILE_CONTEXT,
  MESSAGE_API_CONTEXT,
  BOOKMARK_CONTEXT,
} from "@/contexts";
import {
  addToBookmarks,
  removeFromBookmarks,
  getBookmarks,
} from "@/lib/api/bookmarkApi";
import { trackProductClick, trackAdClick } from "@/lib/api/trackingApi";

// Function to get ad status info
const getAdStatusInfo = (adLevel) => {
  switch (adLevel) {
    case 3:
      return {
        icon: <Crown className="w-5 h-5" />,
        title: "Premium Ad",
        color: "from-purple-500 to-indigo-600",
        textColor: "text-purple-700",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
        description:
          "This product is featured with our highest tier premium advertising",
      };
    case 2:
      return {
        icon: <Star className="w-5 h-5" />,
        title: "Featured Ad",
        color: "from-orange-400 to-amber-500",
        textColor: "text-orange-700",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
        description: "This product is promoted with enhanced visibility",
      };
    case 1:
      return {
        icon: <Award className="w-5 h-5" />,
        title: "Standard Ad",
        color: "from-cyan-500 to-blue-500",
        textColor: "text-blue-700",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        description: "This product is advertised with standard promotion",
      };
    default:
      return null;
  }
};

const ProductDetails = () => {
  const { productId } = useParams();
  const errorLogger = useErrorLogger();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [adStatus, setAdStatus] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(null);
  const { userProfile } = useContext(USER_PROFILE_CONTEXT);
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  const { updateBookmarkCount } = useContext(BOOKMARK_CONTEXT);

  // Track that this product was viewed
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    // Ensure we track the product click only once when the component mounts
    if (productId && !hasTrackedRef.current) {
      // * skip product clicking for this route
      // trackProductClick(productId);
      hasTrackedRef.current = true;
    }
  }, [productId]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const productDetails = await getProduct(productId, errorLogger);
      if (productDetails) {
        setProduct(productDetails);
        setSelectedImage(0);

        // Fetch ad status for this product
        const productAd = await getAdByProduct(productId);

        if (productAd) {
          setAdStatus({
            level: productAd.level,
            adId: productAd.id,
            expiresAt: new Date(productAd.expiresAt),
          });

          // If this is an ad, track the ad click too
          // * skip ad clicking for this component
          // trackAdClick(productAd.id);
        }
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

  const adStatusInfo = adStatus ? getAdStatusInfo(adStatus.level) : null;

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
          {/* Ad Status Banner (if product is advertised) */}
          {/* {adStatusInfo && (
            <div
              className={`mb-6 p-4 rounded-lg border ${adStatusInfo.borderColor} ${adStatusInfo.bgColor}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full bg-gradient-to-r ${adStatusInfo.color} text-white`}
                >
                  {adStatusInfo.icon}
                </div>
                <div>
                  <h3 className={`font-semibold ${adStatusInfo.textColor}`}>
                    {adStatusInfo.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {adStatusInfo.description}
                  </p>
                  {adStatus.expiresAt && (
                    <div className="flex items-center gap-2 mt-1 text-gray-500 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Expires: {adStatus.expiresAt.toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )} */}

          <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative rounded-lg aspect-square overflow-hidden">
                <img
                  src={
                    product.images?.[selectedImage]?.url ||
                    product.displayImage?.url
                  }
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                  style={{ transform: "scale(1.01)" }}
                />

                {/* Image Navigation Arrows */}
                {product.images && product.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setSelectedImage((prev) =>
                          prev === 0 ? product.images.length - 1 : prev - 1
                        )
                      }
                      className="top-1/2 left-1 absolute bg-black/50 hover:bg-black/70 p-2 rounded-full text-white hover:scale-110 active:scale-95 transition-all -translate-y-1/2"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() =>
                        setSelectedImage((prev) =>
                          prev === product.images.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="top-1/2 right-1 absolute bg-black/50 hover:bg-black/70 p-2 rounded-full text-white hover:scale-110 active:scale-95 transition-all -translate-y-1/2"
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
              <div className="flex justify-between items-start gap-4">
                <h1 className="font-semibold text-lg sm:text-xl lg:text-2xl capitalize tracking-tight">
                  {product.name}
                  {adStatus && (
                    <span
                      className={`ml-2 inline-flex items-center px-2 py-1 text-xs rounded-full bg-gradient-to-r ${
                        getAdStatusInfo(adStatus.level).color
                      } text-white`}
                    >
                      {getAdStatusInfo(adStatus.level).icon}
                      <span className="ml-1">
                        {getAdStatusInfo(adStatus.level).title}
                      </span>
                    </span>
                  )}
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
                  <Tags className="flex-shrink-0 size-6" />
                  <span className="truncate">
                    ₦{product.price?.toLocaleString()}
                  </span>
                </p>

                {/* Merchant Info Card */}
                <div className="bg-gradient-to-br from-Primary/5 to-Primary/10 p-3 sm:p-4 lg:p-6 border border-Primary/20 rounded-xl">
                  <div className="flex sm:flex-row flex-col gap-3 sm:gap-4 lg:gap-6">
                    <div className="flex sm:flex-col items-center sm:items-start sm:w-1/3 lg:w-1/2">
                      <div className="border-2 border-Primary/20 rounded-lg w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 overflow-hidden">
                        <img
                          src={product.merchant.logo || "/merchant-image.png"}
                          alt={product.merchant.brandName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="sm:mt-5 ml-4 sm:ml-0">
                        <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
                          {product.merchant.brandName}
                        </h3>
                        <button
                          onClick={() =>
                            navigate(`/merchant/${product.merchantId}`)
                          }
                          className="flex items-center gap-1.5 mt-2 font-medium text-Primary hover:text-Primary/80 text-sm"
                        >
                          <Store className="w-4 h-4" />
                          Visit Store
                        </button>
                      </div>
                    </div>

                    {/* Contact Info - more compact */}
                    <div className="flex flex-col gap-2 sm:w-2/3 lg:w-1/2">
                      {/* Primary Phone */}
                      <div className="flex justify-between items-center gap-2 bg-white/60 p-2 rounded-lg">
                        <div className="flex items-center gap-2 min-w-0">
                          <Phone className="flex-shrink-0 w-4 h-4 text-Primary" />
                          <span className="font-medium text-gray-700 truncate">
                            {product.merchant.phoneNumbers[0].number}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            handleCopyPhone(
                              product.merchant.phoneNumbers[0].number
                            );
                            messageApi.success(
                              "Phone number copied to clipboard"
                            );
                          }}
                          className="flex-shrink-0 hover:bg-white p-1.5 rounded-md transition-colors"
                          title="Copy phone number"
                        >
                          {copiedPhone ===
                          product.merchant.phoneNumbers[0].number ? (
                            <Check className="w-4 h-4 text-Primary" />
                          ) : (
                            <Copy className="w-4 h-4 text-orange" />
                          )}
                        </button>
                      </div>

                      {/* Secondary Phone (only if exists and has a number) */}
                      {product.merchant.phoneNumbers[1]?.number && (
                        <div className="flex justify-between items-center gap-2 bg-white/60 p-2 rounded-lg">
                          <div className="flex items-center gap-2 min-w-0">
                            <Phone className="flex-shrink-0 w-4 h-4 text-Primary" />
                            <span className="font-medium text-gray-700 truncate">
                              {product.merchant.phoneNumbers[1].number}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              handleCopyPhone(
                                product.merchant.phoneNumbers[1].number
                              );
                              messageApi.success(
                                "Phone number copied to clipboard"
                              );
                            }}
                            className="flex-shrink-0 hover:bg-white p-1.5 rounded-md transition-colors"
                            title="Copy phone number"
                          >
                            {copiedPhone ===
                            product.merchant.phoneNumbers[1].number ? (
                              <Check className="w-4 h-4 text-Primary" />
                            ) : (
                              <Copy className="w-4 h-4 text-orange" />
                            )}
                          </button>
                        </div>
                      )}

                      {/* Email */}
                      <div className="flex justify-between items-center gap-2 bg-white/60 p-2 rounded-lg">
                        <div className="flex items-center gap-2 min-w-0">
                          <Mail className="flex-shrink-0 w-4 h-4 text-Primary" />
                          <span className="font-medium text-gray-700 truncate">
                            {product.merchant.email}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(
                              product.merchant.email
                            );
                            setCopiedPhone("email");
                            messageApi.success("Email copied to clipboard");
                          }}
                          className="flex-shrink-0 hover:bg-white p-1.5 rounded-md transition-colors"
                          title="Copy email"
                        >
                          {copiedPhone === "email" ? (
                            <Check className="w-4 h-4 text-Primary" />
                          ) : (
                            <Copy className="w-4 h-4 text-orange" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Buttons - more compact */}
                  <div className="gap-2 sm:gap-3 grid grid-cols-1 sm:grid-cols-2 mt-3 sm:mt-4 lg:mt-6">
                    <Button
                      onClick={() => {
                        window.open(
                          `https://wa.me/${product.merchant.phoneNumbers[0].number}`,
                          "_blank"
                        );
                      }}
                      className="flex justify-center items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] py-3 sm:py-4 lg:py-6 rounded-xl w-full font-medium text-white text-sm"
                    >
                      <img
                        src={WhatsappIcon}
                        alt="WhatsApp"
                        className="w-5 sm:w-6 h-5 sm:h-6"
                      />
                      Chat on WhatsApp
                    </Button>

                    <Button
                      onClick={() => {
                        navigate(`/merchant/${product.merchantId}`);
                      }}
                      className="flex justify-center items-center gap-2 bg-Primary hover:bg-Primary/90 py-3 sm:py-4 lg:py-6 rounded-xl w-full font-medium text-white text-sm"
                    >
                      <Store className="w-5 sm:w-6 h-5 sm:h-6" />
                      View All Products
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col gap-3 bg-gray-50 p-4 rounded-lg">
                  <p className="flex items-center gap-3 text-gray-600">
                    <PackageSearch className="size-5 text-Primary" />
                    <span className="font-semibold">Category</span>
                    <span className="bg-white px-3 py-1 rounded-lg font-medium text-gray-900">
                      {product.category}
                    </span>
                  </p>
                  <p className="flex items-center gap-3 text-gray-600">
                    <ShoppingBasket className="size-5 text-Primary" />
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

        {/* Disclaimer section */}
        <div className="bg-orange/5 mt-8 p-4 sm:p-6 border border-orange/10 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertCircle className="flex-shrink-0 mt-0.5 w-5 h-5 text-orange" />
            <div className="space-y-1">
              <h3 className="font-medium text-gray-900">Disclaimer</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                9jaMarkets acts as a platform connecting buyers with merchants.
                We do not handle transactions, shipping, or product fulfillment.
                Please verify all details with the merchant before making any
                payments. Exercise due diligence when conducting business
                transactions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
