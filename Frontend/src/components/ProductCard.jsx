import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

const ProductCard = ({ product }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const navigate = useNavigate();

  const hasAds = product.ads && product.ads.length > 0;
  const verifiedAdsCount = hasAds
    ? product.ads.filter((ad) => ad.paidFor === true).length
    : 0;
  const unverifiedAdsCount = hasAds
    ? product.ads.filter((ad) => ad.paidFor === false).length
    : 0;

  const handleAdClick = (e) => {
    e.preventDefault(); // Prevent the parent link navigation
    navigate("/dashboard/ads/payments");
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group bg-white shadow-sm hover:shadow-md rounded-lg overflow-hidden transition-all duration-300"
    >
      <div className="relative aspect-square">
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <img
          src={product.displayImage.url}
          alt={product.name}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
        />

        {hasAds && (
          <div className="right-0 bottom-0 left-0 absolute flex flex-wrap gap-1 p-1">
            {verifiedAdsCount > 0 && (
              <button
                onClick={handleAdClick}
                className="flex items-center gap-1 bg-green-100 hover:bg-green-200 px-2 py-1 rounded-full font-medium text-green-700 text-xs transition-colors"
              >
                <CheckCircle className="w-3 h-3" />
                <span>{verifiedAdsCount} Verified</span>
              </button>
            )}
            {unverifiedAdsCount > 0 && (
              <button
                onClick={handleAdClick}
                className="flex items-center gap-1 bg-yellow-100 hover:bg-yellow-200 px-2 py-1 rounded-full font-medium text-yellow-700 text-xs transition-colors"
              >
                <AlertCircle className="w-3 h-3" />
                <span>{unverifiedAdsCount} Unverified</span>
              </button>
            )}
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="group-hover:text-Primary font-medium text-gray-900 line-clamp-2 transition-colors">
          {product.name}33
        </h3>
        <p className="mt-1 font-bold text-Primary">
          ₦{product.price?.toLocaleString()}
        </p>
      </div>
    </Link>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    displayImage: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    ads: PropTypes.arrayOf(
      PropTypes.shape({
        level: PropTypes.number,
        paidFor: PropTypes.bool,
        productId: PropTypes.string,
        expiresAt: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default ProductCard;
