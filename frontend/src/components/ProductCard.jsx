import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = React.useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    await addToCart(product._id, 1);
    setIsAdding(false);
  };

  return (
    <div className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Badge for featured products */}
        {product.featured && (
          <div className="absolute top-3 right-3 bg-black text-white text-xs font-semibold px-2 py-1">
            FEATURED
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-gray-500 uppercase tracking-wide">
            {product.category}
          </span>
        </div>
        
        <h3 className="text-base font-medium text-gray-900 mb-2 line-clamp-2 hover:text-gray-700 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <div className="text-xl font-bold text-gray-900">
              ₹{product.price.toLocaleString('en-IN')}
            </div>
            {product.stock < 10 && (
              <div className="text-xs text-red-600 font-medium mt-1">
                Only {product.stock} left!
              </div>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="bg-black hover:bg-gray-800 text-white px-4 py-2 transition-colors disabled:opacity-50 flex items-center gap-1"
          >
            <PlusIcon className="w-4 h-4" />
            {isAdding ? 'Adding...' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
