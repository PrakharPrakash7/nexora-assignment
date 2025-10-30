import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const ReceiptModal = ({ isOpen, onClose, orderData }) => {
  const navigate = useNavigate();

  if (!orderData) return null;

  const handleContinueShopping = () => {
    onClose();
    navigate('/products');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="relative p-8 bg-gradient-to-br from-success-50 to-primary-50 border-b border-neutral-200">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>

                <div className="flex items-center justify-center mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                  >
                    <CheckCircleIcon className="w-20 h-20 text-success-500" />
                  </motion.div>
                </div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold text-center text-neutral-900 mb-2"
                >
                  Order Confirmed!
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-center text-neutral-600"
                >
                  Thank you for your purchase, {orderData.userDetails.name}
                </motion.p>
              </div>

              {/* Order Details */}
              <div className="p-8 space-y-6">
                {/* Order ID */}
                <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                  <span className="text-sm text-neutral-600">Order ID</span>
                  <span className="font-mono font-semibold text-primary-600">
                    {orderData.orderId}
                  </span>
                </div>

                {/* Customer Details */}
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-3">
                    Customer Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Email:</span>
                      <span className="font-medium">{orderData.userDetails.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Shipping Address:</span>
                      <span className="font-medium text-right max-w-xs">
                        {orderData.userDetails.address}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-3">
                    Order Items
                  </h3>
                  <div className="space-y-3">
                    {orderData.items.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center gap-4 p-3 bg-neutral-50 rounded-lg"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-neutral-900 text-sm">
                            {item.name}
                          </p>
                          <p className="text-xs text-neutral-600">
                            Qty: {item.quantity} × ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <span className="font-semibold text-neutral-900">
                          ${item.total.toFixed(2)}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t border-neutral-200 pt-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-neutral-600">
                      <span>Subtotal</span>
                      <span>${orderData.subTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-neutral-600">
                      <span>Tax (10%)</span>
                      <span>${orderData.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-neutral-900 pt-2 border-t border-neutral-200">
                      <span>Total</span>
                      <span className="text-primary-600">${orderData.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="p-4 bg-primary-50 rounded-lg">
                  <p className="text-sm text-primary-900">
                    <span className="font-semibold">📦 Estimated Delivery:</span>{' '}
                    {new Date(orderData.estimatedDelivery).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleContinueShopping}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-colors"
                  >
                    Continue Shopping
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.print()}
                    className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-semibold py-3 rounded-lg transition-colors"
                  >
                    Print Receipt
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ReceiptModal;
