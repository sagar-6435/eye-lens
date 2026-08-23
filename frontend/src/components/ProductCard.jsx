import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product, featured = false }) {
  const navigate = useNavigate();
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (saved.some(p => p._id === product._id)) {
      setInWishlist(true);
    }
  }, [product._id]);

  const toggleWishlist = (e) => {
    e.stopPropagation();
    let saved = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (inWishlist) {
      saved = saved.filter(p => p._id !== product._id);
      setInWishlist(false);
    } else {
      saved.push(product);
      setInWishlist(true);
    }
    localStorage.setItem('wishlist', JSON.stringify(saved));
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  return (
    <div 
      onClick={() => navigate(`/product/${product._id}`)}
      className={(featured ? "min-w-[160px] w-[160px] sm:min-w-[200px] snap-start " : "w-full ") + "cursor-pointer group"}
    >
      <div className="relative overflow-hidden rounded-2xl bg-background-secondary border border-border-primary mb-3 aspect-square group-hover:shadow-md transition-shadow">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        <button 
          onClick={toggleWishlist}
          className="absolute top-2 right-2 p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-background transition-colors z-10"
        >
          <svg 
            className={`w-5 h-5 transition-colors ${inWishlist ? 'text-accent fill-accent' : 'text-text-secondary fill-transparent hover:text-accent'}`} 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
        </button>
      </div>
      <div>
        <p className="text-xs text-text-secondary font-medium mb-0.5">{product.category}</p>
        <h3 className="text-base font-bold text-text-primary mb-1 truncate first-letter:uppercase">{product.name}</h3>
        <div className="flex items-center gap-2">
          <p className="text-base font-semibold text-primary">{product.price}</p>
          {product.originalPrice && (
            <p className="text-xs text-text-secondary line-through">{product.originalPrice}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
