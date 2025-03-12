import { Link } from "react-router-dom";
import { Bookmark, BookmarkCheck } from "lucide-react";
import {
  useTrackAdView,
  useTrackProductClick,
  useTrackAdClick,
} from "@/hooks/useTracking";

const MarketProductCard = ({
  product,
  isBookmarked,
  onBookmarkToggle,
  getAdBadge,
}) => {
  // Add tracking hooks - safe to use here at component level
  const handleProductClick = useTrackProductClick();
  const handleAdClick = useTrackAdClick();

  // Create ref for ad view tracking - safe because it's at component level
  const adViewRef = product.adStatus?.isAd
    ? useTrackAdView(product.adStatus?.adId || product.id)
    : null;

  return (
    <div
      ref={product.adStatus?.isAd ? adViewRef : null}
      className="bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden transition-all"
    >
      <div className="relative">
        <Link
          to={`/products/${product.id}`}
          onClick={() => {
            // Track product click
            handleProductClick(product.id);

            // If it's also an ad, track ad click
            if (product.adStatus?.isAd) {
              handleAdClick(product.adStatus?.adId || product.id);
            }
          }}
        >
          <div className="aspect-square">
            <img
              src={product.displayImage?.url || "/path/to/fallback.jpg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBookmarkToggle(product.id);
          }}
          className="top-2 right-2 absolute bg-Primary/80 hover:bg-Primary p-2 rounded-full transition-colors"
        >
          {isBookmarked ? (
            <BookmarkCheck className="w-5 h-5 text-white" />
          ) : (
            <Bookmark className="w-5 h-5 text-white" />
          )}
        </button>

        {/* Premium Ad Badge */}
        {product.adStatus?.isAd && getAdBadge(product.adStatus.level) && (
          <div
            className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
              getAdBadge(product.adStatus.level).classes
            }`}
          >
            {getAdBadge(product.adStatus.level).icon}
            <span>{getAdBadge(product.adStatus.level).label}</span>
          </div>
        )}
      </div>
      <Link
        to={`/products/${product.id}`}
        onClick={() => {
          // Track product click
          handleProductClick(product.id);

          // If it's also an ad, track ad click
          if (product.adStatus?.isAd) {
            handleAdClick(product.adStatus?.adId || product.id);
          }
        }}
      >
        <div className="p-2">
          <h3 className="font-medium truncate">{product.name}</h3>
          <p className="font-bold text-Primary text">
            ₦{product.price?.toLocaleString()}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default MarketProductCard;
