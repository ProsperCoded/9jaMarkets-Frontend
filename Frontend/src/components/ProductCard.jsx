import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <Link
      to={`/products/${product.id}`}
      className="bg-white shadow-sm hover:shadow-md rounded-lg transition-all duration-300 overflow-hidden group"
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
      </div>
      <div className="p-3">
        <h3 className="group-hover:text-Primary line-clamp-2 font-medium text-gray-900 transition-colors">
          {product.name}
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
    displayImage: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
