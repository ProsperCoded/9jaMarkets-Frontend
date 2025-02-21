import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Phone, Mail, Store, Package, Star, Clock } from "lucide-react";
import { MESSAGE_API_CONTEXT } from "@/contexts";
import { getMerchantProfileApi } from "@/lib/api/serviceApi";
import { getMerchantProducts } from "@/lib/api/productApi";
import LoadingPage from "@/componets-utils/LoadingPage";
import ProductCard from "@/components/ProductCard";

const MerchantProfile = () => {
  const { merchantId } = useParams();
  const [merchant, setMerchant] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("products"); // products, about, reviews
  const messageApi = useContext(MESSAGE_API_CONTEXT);

  useEffect(() => {
    const fetchMerchantData = async () => {
      try {
        const merchantData = await getMerchantProfileApi(merchantId);
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
  }, [merchantId, messageApi]);

  if (loading) return <LoadingPage />;
  if (!merchant) return <div>Merchant not found</div>;

  return (
    <div className="bg-gray-50 min-h-screen pt-4">
      <div className="container mx-auto px-4">
        {/* Merchant Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Merchant Logo/Image */}
            <div className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src={merchant.logo || "/default-store.png"}
                alt={merchant.brandName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Merchant Info */}
            <div className="flex-grow">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {merchant.brandName}
              </h1>
              
              <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{merchant.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span>{merchant.phone}</span>
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
                  <span>Member since {new Date(merchant.createdAt).getFullYear()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {products.length === 0 && (
              <div className="col-span-full text-center py-12">
                <Store className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No Products Yet</h3>
                <p className="text-gray-500">This merchant hasn't added any products yet.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "about" && (
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">About {merchant.brandName}</h2>
            <p className="text-gray-600 whitespace-pre-line">{merchant.description}</p>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
            {/* Add reviews component here */}
            <p className="text-gray-500 text-center py-8">Reviews coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MerchantProfile; 