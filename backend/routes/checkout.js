const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');

// @route   POST /api/checkout
// @desc    Process checkout and create order
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { userDetails } = req.body;
    
    // Validate user details
    if (!userDetails || !userDetails.name || !userDetails.email || !userDetails.address) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required user details (name, email, address)'
      });
    }
    
    // Get cart
    const cart = await Cart.findOne({ userId: 'guest' }).populate('items.productId');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Cart is empty'
      });
    }
    
    // Generate unique order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // Prepare cart items for order
    const cartItems = cart.items.map(item => ({
      productId: item.productId._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      total: item.total,
      image: item.image
    }));
    
    // Create order
    const order = new Order({
      orderId,
      cartItems,
      userDetails: {
        name: userDetails.name,
        email: userDetails.email,
        address: userDetails.address
      },
      subTotal: cart.subTotal,
      tax: cart.tax,
      total: cart.total,
      timestamp: new Date()
    });
    
    await order.save();
    
    // Clear cart after successful checkout
    cart.items = [];
    await cart.save();
    
    // Send receipt data
    res.status(201).json({
      success: true,
      message: 'Order placed successfully! 🎉',
      data: {
        orderId: order.orderId,
        total: order.total,
        subTotal: order.subTotal,
        tax: order.tax,
        timestamp: order.timestamp,
        userDetails: order.userDetails,
        items: order.cartItems,
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
      }
    });
  } catch (error) {
    console.error('Error processing checkout:', error);
    res.status(500).json({
      success: false,
      error: 'Checkout failed. Please try again.',
      message: error.message
    });
  }
});

// @route   GET /api/checkout/orders
// @desc    Get all orders (for order history)
// @access  Public
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(10);
    
    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch orders',
      message: error.message
    });
  }
});

// @route   GET /api/checkout/orders/:orderId
// @desc    Get single order by order ID
// @access  Public
router.get('/orders/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }
    
    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch order',
      message: error.message
    });
  }
});

module.exports = router;
