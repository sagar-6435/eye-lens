import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '../utils/dummyData';
import { useCartStore } from '../store/useCartStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-premium transition-all duration-500"
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isBestSeller && (
          <span className="bg-primary text-white text-[9px] font-black px-3 py-1.5 rounded-lg tracking-[0.2em]">
            BEST SELLER
          </span>
        )}
        {product.isNewArrival && (
          <span className="bg-accent text-white text-[9px] font-black px-3 py-1.5 rounded-lg tracking-[0.2em]">
            NEW ARRIVAL
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-muted-foreground hover:text-red-500 transition-colors shadow-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300">
        <Heart size={18} />
      </button>

      {/* Image Gallery */}
      <div className="block overflow-hidden relative aspect-[4/5] bg-zinc-50">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <motion.img
            src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out"
            animate={{ scale: isHovered ? 1.05 : 1 }}
          />
        </Link>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{product.brand}</p>
            <Link to={`/product/${product.id}`}>
              <h3 className="text-sm font-bold group-hover:text-accent transition-colors truncate max-w-[150px]">{product.name}</h3>
            </Link>
          </div>
          <div className="flex items-center gap-1 bg-zinc-50 px-2 py-1 rounded-lg">
            <Star size={10} className="fill-accent text-accent" />
            <span className="text-[10px] font-bold">{product.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex -space-x-1">
            {product.colors.map((color, i) => (
              <div 
                key={i} 
                className="w-3 h-3 rounded-full border border-white ring-1 ring-zinc-200"
                style={{ backgroundColor: color.toLowerCase() }}
              />
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground">+{product.colors.length} colors</span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-lg font-bold">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice}</span>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => addItem(product)}
            className="p-3 bg-secondary rounded-2xl text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
          >
            <Plus size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
