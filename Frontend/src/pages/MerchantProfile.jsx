import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Store,
  Package,
  Star,
  Clock,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { MESSAGE_API_CONTEXT } from "@/contexts";
import { getMerchantProfileApi } from "@/lib/api/serviceApi";
import { getMerchantProducts } from "@/lib/api/productApi";
import LoadingPage from "@/componets-utils/LoadingPage";
import ProductCard from "@/components/ProductCard";
import { useErrorLogger } from "@/hooks";

const MerchantProfile = () => {
  const { merchantId } = useParams();
  // ! for testing
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
      <div className="bg-gradient-to-b from-Primary/10 to-transparent pt-20 min-h-screen">
        <div className="mx-auto px-4 container">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-8 text-gray-600 hover:text-Primary transition-all duration-300 hover:-translate-x-1"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>

          <div className="mx-auto max-w-md text-center">
            <div className="bg-white shadow-lg p-8 rounded-xl border border-gray-100">
              <div className="relative mb-6">
                <div className="bg-Primary/5 p-4 rounded-full inline-block">
                  <Store className="mx-auto w-16 h-16 text-Primary" />
                </div>
                <AlertCircle className="right-1/2 bottom-0 absolute w-8 h-8 text-orange animate-bounce translate-x-8" />
              </div>

              <h1 className="mb-3 font-bold text-2xl text-gray-900">
                Merchant Not Found
              </h1>
              <p className="mb-8 text-gray-600">
                We couldn't find the merchant you're looking for. They may have moved or no longer exist.
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => navigate("/markets")}
                  className="bg-Primary hover:bg-Primary/90 px-6 py-3 rounded-lg w-full text-white transition-all duration-300 hover:shadow-lg hover:shadow-Primary/20"
                >
                  Explore Markets
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="bg-gray-50 hover:bg-gray-100 px-6 py-3 rounded-lg w-full text-gray-700 transition-all duration-300 border border-gray-200 hover:border-Primary"
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
    <div className="bg-gradient-to-b from-Primary/5 to-transparent min-h-screen">
      <div className="mx-auto px-4 container py-6">
        {/* Merchant Header */}
        <div className="bg-white shadow-lg mb-8 p-8 rounded-2xl border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
          <div className="flex md:flex-row flex-col gap-8">
            {/* Merchant Logo/Image */}
            <div className="flex-shrink-0 rounded-2xl w-40 h-40 overflow-hidden border-4 border-Primary/10 shadow-lg">
              <img
                src={merchant.logo || "/merchant.png"}
                alt={merchant.brandName}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>

            {/* Merchant Info */}
            <div className="flex-grow">
              <h1 className="mb-4 font-bold text-3xl text-gray-900 flex items-center gap-3">
                {merchant.brandName}
                <span className="bg-Primary/10 text-Primary text-sm px-3 py-1 rounded-full">
                  Verified Merchant
                </span>
              </h1>

              <div className="flex flex-wrap gap-6 mb-6 text-gray-600">
                <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg hover:bg-Primary/5 transition-colors">
                  <MapPin className="w-5 h-5 text-Primary" />
                  <span>{merchant.addresses[0].address}</span>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg hover:bg-Primary/5 transition-colors">
                  <Phone className="w-5 h-5 text-Primary" />
                  <span>{merchant.phoneNumbers[0].number}</span>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg hover:bg-Primary/5 transition-colors">
                  <Mail className="w-5 h-5 text-Primary" />
                  <span>{merchant.email}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-8 text-sm">
                <div className="flex items-center gap-2 bg-Primary/5 px-4 py-2 rounded-full">
                  <Package className="w-5 h-5 text-Primary" />
                  <span className="font-medium">{products.length} Products</span>
                </div>
                <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full">
                  <Star fill="orange" className="w-5 h-5 text-orange" />
                  <span className="font-medium">4.5 Rating</span>
                </div>
                <div className="flex items-center gap-2 bg-Primary/5 px-4 py-2 rounded-full">
                  <Clock className="w-5 h-5 text-Primary" />
                  <span className="font-medium">
                    Member since {new Date(merchant.createdAt).getFullYear()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-gray-200 mb-8 border-b bg-white rounded-t-lg px-2">
          {["products", "about", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-4 font-medium text-sm transition-all relative
                ${activeTab === tab
                  ? "text-Primary"
                  : "text-gray-500 hover:text-gray-700"
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-Primary rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        {activeTab === "products" && (
          <div className="gap-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {products.length === 0 && (
              <div className="col-span-full py-16 text-center bg-white rounded-xl shadow-sm">
                <div className="bg-Primary/5 p-4 rounded-full inline-block mb-4">
                  <Store className="w-16 h-16 text-Primary" />
                </div>
                <h3 className="font-semibold text-gray-900 text-xl mb-2">
                  No Products Yet
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  This merchant hasn't added any products yet. Check back later for updates.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "about" && (
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="mb-6 font-semibold text-2xl flex items-center gap-3">
              About {merchant.brandName}
              <Store className="w-6 h-6 text-Primary" />
            </h2>
            <p className="text-gray-600 whitespace-pre-line leading-relaxed">
              {merchant.description || "No description available."}
            </p>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="mb-6 font-semibold text-2xl flex items-center gap-3">
              Customer Reviews
              <Star className="w-6 h-6 text-yellow-400" />
            </h2>
            <div className="py-12 text-center">
              <div className="bg-gray-50 p-4 rounded-full inline-block mb-4">
                <Star className="w-16 h-16 text-gray-300" />
              </div>
              <p className="text-gray-500 max-w-md mx-auto">
                Reviews are coming soon! Stay tuned for customer feedback and ratings.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MerchantProfile;
