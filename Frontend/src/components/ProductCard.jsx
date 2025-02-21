import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <Link
      to={`/products/${product.id}`}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
    >
      <div className="aspect-square relative">
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <img
          src={product.displayImage}
          alt={product.name}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
        />
      </div>
      <div className="p-3">
        <h3 className="font-medium text-gray-900 group-hover:text-Primary transition-colors line-clamp-2">
          {product.name}
        </h3>
        <p className="text-Primary font-bold mt-1">
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
    displayImage: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard; 