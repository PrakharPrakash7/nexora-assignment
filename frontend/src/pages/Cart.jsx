import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { MinusIcon, PlusIcon, TrashIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const Cart = () => {
  const { cart, loading, removeFromCart, updateCartItem } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = async (itemId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      await updateCartItem(itemId, newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 py-16">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-16"
            >
              <div className="w-32 h-32 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-6xl">🛒</span>
              </div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Your cart is empty
              </h2>
              <p className="text-neutral-600 mb-8">
                Looks like you haven't added anything to your cart yet.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/products')}
                className="btn-primary inline-flex items-center space-x-2"
              >
                <span>Start Shopping</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/products')}
            className="flex items-center text-primary-600 hover:text-primary-700 font-medium mb-4"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Continue Shopping
          </button>
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-neutral-600">
            {cart.items.length} item{cart.items.length !== 1 ? 's' : ''} in your cart
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card p-6"
              >
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="w-32 h-32 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <h3 className="text-lg font-semibold text-neutral-900">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-danger-600 hover:text-danger-700 p-2"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>

                    <p className="text-neutral-600 mb-4">
                      ${item.price.toFixed(2)} each
                    </p>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-neutral-300 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(item._id, item.quantity, -1)}
                          className="p-3 hover:bg-neutral-100 transition-colors"
                        >
                          <MinusIcon className="w-5 h-5" />
                        </button>
                        <span className="px-6 py-2 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item._id, item.quantity, 1)}
                          className="p-3 hover:bg-neutral-100 transition-colors"
                        >
                          <PlusIcon className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="text-2xl font-bold text-neutral-900">
                          ${item.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card p-6 sticky top-24"
            >
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-medium">${cart.subTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Tax (10%)</span>
                  <span className="font-medium">${cart.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Shipping</span>
                  <span className="font-medium text-success-600">FREE</span>
                </div>
                <div className="pt-4 border-t border-neutral-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-neutral-900">Total</span>
                    <span className="text-3xl font-bold text-primary-600">
                      ${cart.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/checkout')}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 rounded-lg transition-colors mb-3"
              >
                Proceed to Checkout
              </motion.button>

              <p className="text-xs text-center text-neutral-500">
                🔒 Secure checkout powered by Vibe Commerce
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
