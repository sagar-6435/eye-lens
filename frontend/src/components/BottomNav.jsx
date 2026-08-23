import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function BottomNav() {
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.length);
    };

    updateCount();
    window.addEventListener('cartUpdated', updateCount);
    return () => window.removeEventListener('cartUpdated', updateCount);
  }, []);

  const getLinkClasses = (path) => {
    return `flex flex-col items-center justify-center w-full h-full ${
      location.pathname === path ? 'text-primary' : 'text-text-secondary'
    }`;
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border-primary z-50 pb-safe">
      <div className="flex justify-around items-center h-20">
        <Link to="/" className={getLinkClasses('/')}>
          <svg className="w-7 h-7 mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link to="/shop" className={getLinkClasses('/shop')}>
          <svg className="w-7 h-7 mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
          </svg>
          <span className="text-[10px] font-medium">Shop</span>
        </Link>
        <Link to="/wishlist" className={getLinkClasses('/wishlist')}>
          <svg className="w-7 h-7 mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
          <span className="text-[10px] font-medium">Wishlist</span>
        </Link>
        <Link to="/help" className={getLinkClasses('/help')}>
          <svg className="w-7 h-7 mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span className="text-[10px] font-medium">Help</span>
        </Link>
        <Link to="/cart" className={getLinkClasses('/cart')}>
          <div className="relative flex justify-center">
            <svg className="w-7 h-7 mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-primary text-background text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Cart</span>
        </Link>
      </div>
    </div>
  );
}

export default BottomNav;
