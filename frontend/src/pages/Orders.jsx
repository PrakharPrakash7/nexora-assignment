import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ClockIcon, CheckCircleIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import api from '../utils/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get('/checkout/orders');
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="container-custom py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-custom py-12">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={fetchOrders}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">View and track your order history</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 p-16 text-center">
            <div className="w-20 h-20 bg-gray-200 flex items-center justify-center mx-auto mb-6">
              <ShoppingBagIcon className="w-10 h-10 text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">Start shopping and your orders will appear here</p>
            <Link
              to="/products"
              className="inline-block bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors font-semibold"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Order ID</p>
                      <p className="font-bold text-gray-900">{order.orderId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Order Date</p>
                      <p className="font-medium text-gray-900 flex items-center gap-1">
                        <ClockIcon className="w-4 h-4 text-gray-500" />
                        {formatDate(order.timestamp)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Total Amount</p>
                      <p className="text-xl font-bold text-gray-900">
                        ₹{order.total.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div>
                      <span className={`px-3 py-1 text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="px-6 py-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <ShoppingBagIcon className="w-4 h-4" />
                    Order Items
                  </h3>
                  <div className="space-y-3">
                    {order.cartItems.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 py-2 border-b border-gray-100 last:border-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover bg-gray-50 border border-gray-200"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-gray-900">₹{item.total.toLocaleString('en-IN')}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="bg-green-50 px-6 py-4 border-t border-gray-200">
                  <div className="flex items-start gap-2">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Delivery Information</p>
                      <p className="text-sm text-gray-700">{order.userDetails.name}</p>
                      <p className="text-sm text-gray-700">{order.userDetails.address}</p>
                      <p className="text-sm text-gray-700">{order.userDetails.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
