import { useState, useEffect } from "react";
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
} from "lucide-react";
import { Button } from "./ui/button";
import { getProduct } from "@/lib/api/productApi";

const ProductDetails = () => {
  const { productId } = useParams();
  const errorLogger = useErrorLogger();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [merchant, setMerchant] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

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

  if (!product) return <LoadingPage message="Loading product details..." />;

  return (
    <div className="bg-gray-50 pt-16 min-h-screen">
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
          <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden aspect-square">
                <img
                  src={
                    product.images?.[selectedImage]?.url ||
                    product.displayImage?.url
                  }
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Thumbnail Gallery */}
              {product.images && product.images.length > 1 && (
                <div className="gap-2 grid grid-cols-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 ${
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
            <div className="space-y-8">
              <div className="flex justify-between items-start">
                <h1 className="font-semibold text-2xl capitalize tracking-tight">
                  {product.name}
                </h1>
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="hover:bg-gray-100 p-2 rounded-full transition-colors"
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="w-6 h-6 text-Primary" />
                  ) : (
                    <Bookmark className="w-6 h-6 text-gray-400" />
                  )}
                </button>
              </div>

              <div className="space-y-4">
                <p className="flex items-center gap-2 font-bold text-Primary text-xl lg:text-2xl">
                  <Tags className="size-6" />₦{product.price?.toLocaleString()}
                </p>

                {/* Merchant Info */}
                <div className="flex flex-col gap-3 border-Primary/10 bg-Primary/5 p-4 border rounded-lg">
                  <div className="flex items-center gap-2 text-gray-800">
                    <Store className="text-Primary size-5" />
                    <span className="font-semibold">Merchant:</span>
                    <span className="font-medium">
                      {product.merchant.brandName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-800">
                    <Phone className="text-Primary size-5" />
                    <span className="font-semibold">Contact:</span>
                    <span className="font-medium">
                      {product.merchant.phoneNumbers[0].number}
                    </span>
                  </div>
                  {product.merchant.phoneNumbers[1] &&
                    product.merchant.phoneNumbers[1].number && (
                      <div className="flex items-center gap-2 text-gray-800">
                        <Phone className="text-Primary size-5" />
                        <span className="font-semibold">Contact 2:</span>
                        <span className="font-medium">
                          {product.merchant.phoneNumbers[1].number}
                        </span>
                      </div>
                    )}
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

              <div className="flex flex-col gap-3 pt-4">
                <h2 className="mb-2 font-semibold text-center text-gray-900 text-lg">
                  CONTACT MERCHANT
                </h2>
                <div className="gap-4 grid grid-cols-2">
                  <Button
                    className="flex justify-center items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] py-6 rounded-full w-full font-medium text-base text-white lg:text-lg"
                    onClick={() => {
                      window.open(
                        `https://wa.me/${product.merchant.phoneNumbers[0].number}`,
                        "_blank"
                      );
                    }}
                  >
                    <img src={WhatsappIcon} alt="WhatsApp" className="size-6" />
                    WhatsApp
                  </Button>

                  <Button
                    className="flex justify-center items-center gap-2 bg-Primary hover:bg-P2 py-6 rounded-full w-full font-medium text-base text-white lg:text-lg"
                    onClick={() => {
                      window.open(`mailto:${product.merchant.email}`, "_blank");
                    }}
                  >
                    <Mail className="size-6" />
                    Email
                  </Button>
                  {/* <a
                    className="flex justify-center items-center gap-2 bg-Primary hover:bg-P2 py-6 rounded-full w-full font-medium text-base text-white lg:text-lg"
                    href={`mailto:${product.merchant.email}`}
                  >
                    <Mail className="size-6" />
                    Email
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
