# ShopEase - Full Stack E-Commerce Shopping Cart

A modern, full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring Indian products with INR pricing.

## 🚀 Features

- **Product Catalog**: Browse 15 curated Indian products across multiple categories
- **Shopping Cart**: Add/remove items with real-time cart updates
- **Checkout System**: Complete purchase flow with order confirmation
- **Order History**: View all past orders with detailed information
- **Responsive Design**: Clean, professional UI optimized for all devices
- **Search & Filter**: Find products by name or category
- **Indian Products**: Authentic Indian brands with INR pricing

## 🛠️ Tech Stack

### Frontend
- **React** 18.2.0 - UI library
- **React Router** 6.20.1 - Client-side routing
- **Tailwind CSS** 3.4.0 - Utility-first styling
- **Axios** 1.6.2 - HTTP client
- **Heroicons** 2.1.1 - Icon library
- **React Toastify** 9.1.3 - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express** 4.18.2 - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** 8.0.3 - ODM for MongoDB
- **CORS** 2.8.5 - Cross-origin resource sharing
- **dotenv** 16.3.1 - Environment variable management

## 📦 Products

The application features 15 Indian products including:
- boAt Rockerz 450 Bluetooth Headphones - ₹1,499
- Noise ColorFit Pro 3 Smartwatch - ₹2,999
- Wildcraft Leather Wallet - ₹799
- Mi 10000mAh Power Bank - ₹1,799
- Green Soul Ergonomic Chair - ₹12,999
- And 10 more exciting products!

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/PrakharPrakash7/nexora-assignment.git
   cd nexora-assignment
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Create backend .env file**
   ```bash
   # Copy .env.example to .env
   cp .env.example .env
   ```
   
   Update `.env` with your MongoDB URI:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. **Seed the Database**
   ```bash
   node seedDatabase.js
   ```

5. **Start Backend Server**
   ```bash
   node server.js
   ```
   Backend runs on `http://localhost:5000`

6. **Frontend Setup** (in a new terminal)
   ```bash
   cd frontend
   npm install
   ```

7. **Create frontend .env file**
   ```bash
   # Copy .env.example to .env
   cp .env.example .env
   ```
   
   Update `.env` with backend URL:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

8. **Start Frontend**
   ```bash
   npm start
   ```
   Frontend runs on `http://localhost:3000`

## 📁 Project Structure

```
nexora-assignment/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   ├── Product.js            # Product schema
│   │   ├── Cart.js               # Cart schema
│   │   └── Order.js              # Order schema
│   ├── routes/
│   │   ├── products.js           # Product routes
│   │   ├── cart.js               # Cart routes
│   │   └── checkout.js           # Checkout & order routes
│   ├── seedDatabase.js           # Database seeding script
│   ├── server.js                 # Express server
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Navigation bar
│   │   │   ├── ProductCard.jsx   # Product card component
│   │   │   ├── CartSidebar.jsx   # Cart sidebar
│   │   │   ├── CheckoutForm.jsx  # Checkout form
│   │   │   └── ReceiptModal.jsx  # Order receipt modal
│   │   ├── context/
│   │   │   └── CartContext.jsx   # Cart state management
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Landing page
│   │   │   ├── Products.jsx      # Product listing
│   │   │   ├── Cart.jsx          # Cart page
│   │   │   ├── Checkout.jsx      # Checkout page
│   │   │   └── Orders.jsx        # Order history
│   │   ├── utils/
│   │   │   └── api.js            # API utilities
│   │   ├── App.jsx               # Main app component
│   │   ├── index.js              # Entry point
│   │   └── index.css             # Global styles
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart

### Checkout & Orders
- `POST /api/checkout` - Create order and clear cart
- `GET /api/checkout/orders` - Get all orders
- `GET /api/checkout/orders/:orderId` - Get specific order

## 🎨 Design Philosophy

The application features a clean, professional e-commerce design with:
- **Color Palette**: Black (#000), White (#FFF), Gray scale (50-900)
- **Typography**: System fonts for optimal readability
- **Layout**: Minimal shadows, clean borders, professional spacing
- **UX**: Intuitive navigation, instant feedback, responsive interactions

## 🔐 Environment Variables

### Backend (.env)
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

## 📝 Available Scripts

### Backend
- `node server.js` - Start the Express server
- `node seedDatabase.js` - Seed database with products

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## 🌟 Key Features Explained

### Cart Management
- Uses React Context API for global cart state
- Persistent cart across navigation
- Real-time quantity updates
- Total price calculation

### Order System
- Generates unique order IDs
- Stores complete order details
- Order history with delivery status
- Receipt modal with order confirmation

### Product Filtering
- Search by product name
- Filter by category
- Real-time filter updates

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Set environment variables in hosting platform
2. Deploy from GitHub repository
3. Ensure MongoDB Atlas is accessible

### Frontend Deployment (Vercel/Netlify)
1. Connect GitHub repository
2. Set `REACT_APP_API_URL` to production backend URL
3. Build command: `npm run build`
4. Publish directory: `build`

## 🤝 Contributing

This is a screening assignment project for Nexora. Contributions are not currently accepted.

## 📄 License

This project is created for educational purposes as part of the Nexora screening assignment.

## 👤 Author

**Prakhar Prakash**
- GitHub: [@PrakharPrakash7](https://github.com/PrakharPrakash7)
- Repository: [nexora-assignment](https://github.com/PrakharPrakash7/nexora-assignment)

## 🙏 Acknowledgments

- Indian product brands featured in the catalog
- MERN stack community for excellent resources
- Tailwind CSS for the utility-first framework

---

**Built with ❤️ for Nexora Screening Assignment**
