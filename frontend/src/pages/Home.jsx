import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBagIcon, TruckIcon, ShieldCheckIcon, CreditCardIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: TruckIcon,
      title: 'Free Shipping',
      description: 'On orders above ₹500'
    },
    {
      icon: CreditCardIcon,
      title: 'Secure Payment',
      description: 'Multiple payment methods'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Easy Returns',
      description: '7 days return policy'
    },
    {
      icon: ShoppingBagIcon,
      title: 'Quality Products',
      description: '100% authentic brands'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner Section */}
      <section className="bg-gray-100">
        <div className="container-custom py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Welcome to ShopEase
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Shop from a wide range of quality products from top Indian brands. Electronics, Fashion, Home & more at best prices.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => navigate('/products')}
                  className="bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors"
                >
                  Shop Now
                </button>
                <button
                  onClick={() => navigate('/orders')}
                  className="border border-gray-300 text-gray-700 px-8 py-3 hover:bg-gray-50 transition-colors"
                >
                  Track Orders
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div>
              <img 
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=500&fit=crop" 
                alt="Shopping" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 border-b border-gray-200">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gray-100 flex items-center justify-center mx-auto mb-3">
                  <feature.icon className="w-6 h-6 text-gray-700" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Shop by Category
            </h2>
            <p className="text-gray-600">
              Browse through our popular categories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Electronics', 'Fashion', 'Home', 'Sports'].map((category) => (
              <div
                key={category}
                onClick={() => navigate('/products')}
                className="cursor-pointer border border-gray-200 hover:border-black transition-colors p-6 text-center"
              >
                <div className="text-4xl mb-3">
                  {category === 'Electronics' && '🎧'}
                  {category === 'Fashion' && '👔'}
                  {category === 'Home' && '🏠'}
                  {category === 'Sports' && '⚽'}
                </div>
                <h3 className="font-semibold text-gray-900">
                  {category}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter/CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start Shopping Today
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Discover amazing products at unbeatable prices
          </p>
          <button
            onClick={() => navigate('/products')}
            className="bg-white text-black px-10 py-3 hover:bg-gray-100 transition-colors font-semibold"
          >
            Browse All Products
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
