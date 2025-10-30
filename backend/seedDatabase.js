const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios');
const Product = require('./models/Product');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Indian products data with INR pricing
const indianProducts = [
  {
    name: "boAt Rockerz 450 Bluetooth Headphones",
    price: 1499,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    description: "Wireless Bluetooth headphones with 15-hour battery life, soft padded ear cushions and powerful bass.",
    stock: 45,
    category: "electronics",
    featured: true
  },
  {
    name: "Noise ColorFit Pro 4 Smart Watch",
    price: 2999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    description: "1.72 inch display, 60+ sports modes, heart rate monitoring, and 7-day battery life.",
    stock: 30,
    category: "electronics",
    featured: true
  },
  {
    name: "Wildcraft Genuine Leather Wallet",
    price: 799,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop",
    description: "Premium quality genuine leather bi-fold wallet with multiple card slots and RFID protection.",
    stock: 60,
    category: "fashion",
    featured: false
  },
  {
    name: "Mi Power Bank 3i 20000mAh",
    price: 1799,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop",
    description: "Triple output ports with 18W fast charging support. Charges iPhone 12 up to 4 times.",
    stock: 50,
    category: "electronics",
    featured: true
  },
  {
    name: "Green Soul Beast Gaming Chair",
    price: 12999,
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500&h=500&fit=crop",
    description: "Ergonomic gaming chair with adjustable armrests, lumbar support, and 180° recline function.",
    stock: 15,
    category: "home",
    featured: true
  },
  {
    name: "Milton Thermosteel Bottle 1000ml",
    price: 549,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop",
    description: "Double wall vacuum insulation keeps beverages hot for 24 hours and cold for 24 hours.",
    stock: 80,
    category: "home",
    featured: false
  },
  {
    name: "Cosmic Byte CB-GK-16 Gaming Keyboard",
    price: 1899,
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&h=500&fit=crop",
    description: "RGB mechanical gaming keyboard with Outemu Blue switches and anti-ghosting technology.",
    stock: 35,
    category: "electronics",
    featured: false
  },
  {
    name: "AGARO 33566 Aroma Diffuser",
    price: 1199,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=500&fit=crop",
    description: "400ml ultrasonic essential oil diffuser with 7 LED color changing lights and auto shut-off.",
    stock: 40,
    category: "home",
    featured: false
  },
  {
    name: "Strauss Yoga Mat 6mm with Bag",
    price: 699,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop",
    description: "Anti-skid textured surface, extra thick NBR foam for cushioning, comes with carry bag.",
    stock: 55,
    category: "sports",
    featured: false
  },
  {
    name: "Fastrack UV Protected Sunglasses",
    price: 1499,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=500&fit=crop",
    description: "Unisex UV400 polarized sunglasses with metal frame and stylish design.",
    stock: 70,
    category: "fashion",
    featured: true
  },
  {
    name: "Prestige Iris 750W Mixer Grinder",
    price: 3499,
    image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500&h=500&fit=crop",
    description: "750W powerful motor with 3 stainless steel jars for grinding and mixing.",
    stock: 25,
    category: "home",
    featured: false
  },
  {
    name: "Cello Venice Exclusive Bottle Set",
    price: 399,
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=500&fit=crop",
    description: "Set of 4 BPA-free plastic water bottles (1 liter each) with leak-proof caps.",
    stock: 90,
    category: "home",
    featured: false
  },
  {
    name: "Levi's Men's Regular Fit Jeans",
    price: 1999,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop",
    description: "Classic 511 slim fit jeans made from premium stretch denim for comfort and style.",
    stock: 40,
    category: "fashion",
    featured: true
  },
  {
    name: "Puma Unisex Backpack",
    price: 1299,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    description: "25L capacity backpack with padded laptop compartment, multiple pockets, and adjustable straps.",
    stock: 50,
    category: "fashion",
    featured: false
  },
  {
    name: "Amazon Basics Wireless Mouse",
    price: 499,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop",
    description: "Ergonomic wireless mouse with 2.4GHz connection and 18-month battery life.",
    stock: 100,
    category: "electronics",
    featured: false
  }
];

// Function to seed from Fake Store API (converted to INR)
const seedFromFakeStoreAPI = async () => {
  try {
    console.log('📦 Using Indian products with INR pricing...');
    return indianProducts;
  } catch (error) {
    console.log('⚠️  Using default Indian products');
    return indianProducts;
  }
};

// Main seed function
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('✅ Cleared existing products');
    
    // Try Fake Store API first, fallback to mock data
    const products = await seedFromFakeStoreAPI();
    
    // Insert products
    await Product.insertMany(products);
    console.log(`✅ Successfully seeded ${products.length} products`);
    
    // Display seeded products
    const seededProducts = await Product.find();
    console.log('\n📋 Seeded Products:');
    seededProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - $${product.price}`);
    });
    
    console.log('\n🎉 Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeding
seedDatabase();
