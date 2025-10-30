import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI } from '../utils/api';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  // Update cart count whenever cart changes
  useEffect(() => {
    if (cart && cart.items) {
      const count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    } else {
      setCartCount(0);
    }
  }, [cart]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await cartAPI.get();
      setCart(response.data.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await cartAPI.add(productId, quantity);
      setCart(response.data.data);
      toast.success('Item added to cart! 🛒', {
        position: 'bottom-right',
        autoClose: 2000,
      });
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error(error.response?.data?.error || 'Failed to add item to cart');
      return false;
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      const response = await cartAPI.update(itemId, quantity);
      setCart(response.data.data);
      toast.success('Cart updated');
      return true;
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Failed to update cart');
      return false;
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const response = await cartAPI.remove(itemId);
      setCart(response.data.data);
      toast.info('Item removed from cart');
      return true;
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item');
      return false;
    }
  };

  const clearCart = async () => {
    try {
      await cartAPI.clear();
      setCart({ items: [], subTotal: 0, tax: 0, total: 0 });
      toast.info('Cart cleared');
      return true;
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
      return false;
    }
  };

  const value = {
    cart,
    loading,
    cartCount,
    fetchCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
