import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  const loadWishlist = () => {
    const saved = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(saved);
  };

  useEffect(() => {
    loadWishlist();
    window.addEventListener('wishlistUpdated', loadWishlist);
    return () => window.removeEventListener('wishlistUpdated', loadWishlist);
  }, []);

  return (
    <div className="pt-6 pb-24 px-4 w-full mx-auto min-h-[70vh]">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight mb-2">Wishlist</h1>
        <p className="text-text-secondary">Your saved items for later.</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="bg-background-secondary rounded-2xl p-8 flex flex-col items-center justify-center text-center border border-border-primary min-h-[400px]">
          <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center text-accent mb-4">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-text-primary mb-2">No saved items</h2>
          <p className="text-text-secondary mb-6 max-w-md">Keep track of the eyewear you love by tapping the heart icon on any product.</p>
          <a href="/shop" className="bg-background border-2 border-primary text-primary hover:bg-primary hover:text-background px-8 py-3 rounded-xl font-bold text-base transition-colors shadow-sm">
            Browse Products
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {wishlist.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
