import { Link } from "react-router-dom";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  useTrackAdView,
  useTrackAdClick,
  useTrackProductClick,
} from "@/hooks/useTracking";

export default function ProductCard({
  product,
  getAdBadge,
  isBookmarked,
  onBookmarkToggle,
}) {
  // Initialize tracking hooks at component top level
  const adViewRef = useTrackAdView(
    product.adStatus?.isAd ? product.adStatus.adId : null,
    {
      enabled: product.adStatus?.isAd,
    }
  );
  const handleProductClick = useTrackProductClick();
  const handleAdClick = useTrackAdClick();

  return (
    <Link
      to={`/products/${product.id}`}
      onClick={() => {
        handleProductClick(product.id);
        if (product.adStatus?.isAd) {
          handleAdClick(product.adStatus.adId);
        }
      }}
    >
      <Card
        className="group relative overflow-hidden"
        ref={product.adStatus?.isAd ? adViewRef : null}
      >
        <div className="relative bg-gray-100 aspect-square">
          <img
            src={product.image || product.displayImage?.url}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Premium Ad Badge */}
          {product.adStatus?.isAd && getAdBadge(product.adStatus.level) && (
            <div
              className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-md ${
                getAdBadge(product.adStatus.level).classes
              }`}
            >
              {getAdBadge(product.adStatus.level).icon}
              <span>{getAdBadge(product.adStatus.level).label}</span>
            </div>
          )}

          <Button
            size="icon"
            variant="ghost"
            className="top-2 right-2 absolute bg-Primary/80 hover:bg-Primary rounded-full text-white transition-colors"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onBookmarkToggle(product.id);
            }}
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-5 h-5" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </Button>
        </div>
        <CardContent className="p-3">
          <h3 className="font-medium text-sm truncate">{product.name}</h3>
          <p className="font-bold text-Primary text-sm">
            ₦{product.price?.toLocaleString() || "N/A"}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
