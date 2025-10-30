const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @route   GET /api/cart
// @desc    Get cart with all items
// @access  Public
router.get('/', async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: 'guest' }).populate('items.productId');
    
    if (!cart) {
      return res.json({
        success: true,
        data: {
          items: [],
          subTotal: 0,
          tax: 0,
          total: 0
        }
      });
    }
    
    res.json({
      success: true,
      data: cart
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch cart',
      message: error.message
    });
  }
});

// @route   POST /api/cart
// @desc    Add item to cart
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    // Validate input
    if (!productId) {
      return res.status(400).json({
        success: false,
        error: 'Product ID is required'
      });
    }
    
    // Find product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    
    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        error: 'Insufficient stock'
      });
    }
    
    // Find or create cart
    let cart = await Cart.findOne({ userId: 'guest' });
    
    if (!cart) {
      // Create new cart
      cart = new Cart({
        userId: 'guest',
        items: []
      });
    }
    
    // Check if product already in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );
    
    if (existingItemIndex !== -1) {
      // Update existing item
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].total = 
        cart.items[existingItemIndex].quantity * product.price;
    } else {
      // Add new item
      cart.items.push({
        productId: product._id,
        quantity,
        price: product.price,
        total: quantity * product.price,
        name: product.name,
        image: product.image
      });
    }
    
    await cart.save();
    
    // Populate product details
    await cart.populate('items.productId');
    
    res.status(201).json({
      success: true,
      message: 'Item added to cart',
      data: cart
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to add item to cart',
      message: error.message
    });
  }
});

// @route   PUT /api/cart/:itemId
// @desc    Update cart item quantity
// @access  Public
router.put('/:itemId', async (req, res) => {
  try {
    const { quantity } = req.body;
    
    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        error: 'Invalid quantity'
      });
    }
    
    const cart = await Cart.findOne({ userId: 'guest' });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        error: 'Cart not found'
      });
    }
    
    const item = cart.items.id(req.params.itemId);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Item not found in cart'
      });
    }
    
    item.quantity = quantity;
    item.total = item.quantity * item.price;
    
    await cart.save();
    await cart.populate('items.productId');
    
    res.json({
      success: true,
      message: 'Cart updated',
      data: cart
    });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update cart',
      message: error.message
    });
  }
});

// @route   DELETE /api/cart/:itemId
// @desc    Remove item from cart
// @access  Public
router.delete('/:itemId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: 'guest' });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        error: 'Cart not found'
      });
    }
    
    // Remove item
    cart.items = cart.items.filter(
      item => item._id.toString() !== req.params.itemId
    );
    
    await cart.save();
    await cart.populate('items.productId');
    
    res.json({
      success: true,
      message: 'Item removed from cart',
      data: cart
    });
  } catch (error) {
    console.error('Error removing item:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to remove item',
      message: error.message
    });
  }
});

// @route   DELETE /api/cart
// @desc    Clear entire cart
// @access  Public
router.delete('/', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: 'guest' });
    
    if (!cart) {
      return res.json({
        success: true,
        message: 'Cart is already empty'
      });
    }
    
    cart.items = [];
    await cart.save();
    
    res.json({
      success: true,
      message: 'Cart cleared',
      data: cart
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to clear cart',
      message: error.message
    });
  }
});

module.exports = router;
