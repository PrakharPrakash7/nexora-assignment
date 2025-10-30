import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { checkoutAPI } from '../utils/api';

const CheckoutForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    try {
      const response = await checkoutAPI.process(formData);
      toast.success('Order placed successfully! 🎉', {
        position: 'top-center',
        autoClose: 3000,
      });
      onSuccess(response.data.data);
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.response?.data?.error || 'Checkout failed. Please try again.', {
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="card p-8 max-w-2xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-neutral-900 mb-2">
        Checkout Details
      </h2>
      <p className="text-neutral-600 mb-8">
        Please provide your information to complete the purchase
      </p>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
            Full Name <span className="text-danger-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`input-field ${errors.name ? 'border-danger-500 focus:ring-danger-500' : ''}`}
            placeholder="John Doe"
            disabled={loading}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-danger-600">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
            Email Address <span className="text-danger-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`input-field ${errors.email ? 'border-danger-500 focus:ring-danger-500' : ''}`}
            placeholder="john@example.com"
            disabled={loading}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-danger-600">{errors.email}</p>
          )}
        </div>

        {/* Address Field */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-2">
            Shipping Address <span className="text-danger-500">*</span>
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className={`input-field ${errors.address ? 'border-danger-500 focus:ring-danger-500' : ''}`}
            placeholder="123 Main St, City, Country, ZIP"
            disabled={loading}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-danger-600">{errors.address}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className="w-full mt-8 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing...
          </>
        ) : (
          'Complete Purchase'
        )}
      </motion.button>

      {/* Security Note */}
      <p className="text-xs text-neutral-500 text-center mt-4">
        🔒 This is a mock checkout. No real payment will be processed.
      </p>
    </motion.form>
  );
};

export default CheckoutForm;
