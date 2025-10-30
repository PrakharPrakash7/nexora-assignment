import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CheckoutForm from '../components/CheckoutForm';
import ReceiptModal from '../components/ReceiptModal';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);

  const handleCheckoutSuccess = (data) => {
    setOrderData(data);
    setShowReceipt(true);
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    navigate('/');
  };

  // Redirect if cart is empty
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
                Add some items to your cart before checking out.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/products')}
                className="btn-primary"
              >
                Start Shopping
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
            onClick={() => navigate('/cart')}
            className="flex items-center text-primary-600 hover:text-primary-700 font-medium mb-4"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Cart
          </button>
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">
            Checkout
          </h1>
          <p className="text-neutral-600">
            Complete your purchase
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <CheckoutForm onSuccess={handleCheckoutSuccess} />
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

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.items.map((item) => (
                  <div key={item._id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm text-neutral-900 line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-neutral-600">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <span className="font-semibold text-neutral-900">
                      ${item.total.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 pt-4 border-t border-neutral-200">
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
                <div className="pt-3 border-t border-neutral-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-neutral-900">Total</span>
                    <span className="text-3xl font-bold text-primary-600">
                      ${cart.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Receipt Modal */}
      <ReceiptModal
        isOpen={showReceipt}
        onClose={handleCloseReceipt}
        orderData={orderData}
      />
    </div>
  );
};

export default Checkout;
