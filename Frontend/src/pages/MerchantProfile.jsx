import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Phone, Mail, Store, Package, Star, Clock, AlertCircle, ArrowLeft } from "lucide-react";
import { MESSAGE_API_CONTEXT } from "@/contexts";
import { getMerchantProfileApi } from "@/lib/api/serviceApi";
import { getMerchantProducts } from "@/lib/api/productApi";
import LoadingPage from "@/componets-utils/LoadingPage";
import ProductCard from "@/components/ProductCard";
import { useErrorLogger } from "@/hooks";

const MerchantProfile = () => {
  // const { merchantId } = useParams();
  // ! for testing
  const merchantId = "00fa223c-5dff-4de5-ae2f-a36d474de195";
  const [merchant, setMerchant] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("products"); // products, about, reviews
  const messageApi = useContext(MESSAGE_API_CONTEXT);
  const errorLogger = useErrorLogger();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMerchantData = async () => {
      try {
        const merchantData = await getMerchantProfileApi(
          merchantId,
          errorLogger
        );
        if (merchantData) {
          setMerchant(merchantData);
          const merchantProducts = await getMerchantProducts(merchantId);
          setProducts(merchantProducts || []);
        }
      } catch (error) {
        messageApi.error("Failed to load merchant profile");
      } finally {
        setLoading(false);
      }
    };

    fetchMerchantData();
  }, [merchantId]);

  if (loading) return <LoadingPage />;
  if (!merchant) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-Primary/5 to-transparent pt-20">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-Primary transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>

          <div className="max-w-md mx-auto text-center">
            <div className="bg-white rounded-xl shadow-sm p-8">
              {/* Icon */}
              <div className="mb-6 relative">
                <Store className="w-16 h-16 text-gray-200 mx-auto" />
                <AlertCircle className="w-8 h-8 text-orange absolute bottom-0 right-1/2 translate-x-8" />
              </div>

              {/* Text Content */}
              <h1 className="text-2xl font-semibold text-gray-900 mb-3">
                Merchant Not Found
              </h1>
              <p className="text-gray-600 mb-8">
                We couldn't find the merchant you're looking for. They may have moved or no longer exist.
              </p>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => navigate("/markets")}
                  className="w-full bg-Primary text-white py-2.5 px-4 rounded-lg hover:bg-Primary/90 transition-colors"
                >
                  Explore Markets
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="w-full bg-gray-50 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Return Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 pt-4 min-h-screen">
      <div className="mx-auto px-4 container">
        {/* Merchant Header */}
        <div className="bg-white shadow-sm mb-6 p-6 rounded-xl">
          <div className="flex md:flex-row flex-col gap-6">
            {/* Merchant Logo/Image */}
            <div className="flex-shrink-0 rounded-xl w-32 h-32 overflow-hidden">
              <img
                src={merchant.logo || "/merchant.png"}
                alt={merchant.brandName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Merchant Info */}
            <div className="flex-grow">
              <h1 className="mb-2 font-bold text-2xl text-gray-900">
                {merchant.brandName}
              </h1>

              <div className="flex flex-wrap gap-4 mb-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{merchant.addresses[0].address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span>{merchant.phoneNumbers[0].number}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  <span>{merchant.email}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-Primary" />
                  <span>{products.length} Products</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span>4.5 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-Primary" />
                  <span>
                    Member since {new Date(merchant.createdAt).getFullYear()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-gray-200 mb-6 border-b">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-6 py-3 font-medium text-sm transition-colors ${
              activeTab === "products"
                ? "border-b-2 border-Primary text-Primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`px-6 py-3 font-medium text-sm transition-colors ${
              activeTab === "about"
                ? "border-b-2 border-Primary text-Primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            About
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-6 py-3 font-medium text-sm transition-colors ${
              activeTab === "reviews"
                ? "border-b-2 border-Primary text-Primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Reviews
          </button>
        </div>

        {/* Content Sections */}
        {activeTab === "products" && (
          <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {products.length === 0 && (
              <div className="col-span-full py-12 text-center">
                <Store className="mx-auto mb-4 w-16 h-16 text-gray-300" />
                <h3 className="font-medium text-gray-900 text-lg">
                  No Products Yet
                </h3>
                <p className="text-gray-500">
                  This merchant hasn't added any products yet.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "about" && (
          <div className="bg-white p-6 rounded-xl">
            <h2 className="mb-4 font-semibold text-xl">
              About {merchant.brandName}
            </h2>
            <p className="text-gray-600 whitespace-pre-line">
              {merchant.description}
            </p>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="bg-white p-6 rounded-xl">
            <h2 className="mb-4 font-semibold text-xl">Customer Reviews</h2>
            {/* Add reviews component here */}
            <p className="py-8 text-center text-gray-500">
              Reviews coming soon
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MerchantProfile;
