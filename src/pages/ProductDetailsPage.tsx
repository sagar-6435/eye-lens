import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingBag, ShieldCheck, Truck, RefreshCw, ChevronRight, Upload, Info } from 'lucide-react';
import { products } from '../utils/dummyData';
import { useCartStore } from '../store/useCartStore';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [lensType, setLensType] = useState('single-vision');
  const addItem = useCartStore((state) => state.addItem);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link to="/shop" className="text-accent underline mt-4 inline-block">Back to shop</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-12 overflow-x-auto whitespace-nowrap pb-2">
        <Link to="/" className="hover:text-primary transition-colors">HOME</Link>
        <ChevronRight size={12} />
        <Link to="/shop" className="hover:text-primary transition-colors">SHOP</Link>
        <ChevronRight size={12} />
        <Link to={`/shop?category=${product.category}`} className="hover:text-primary transition-colors uppercase">{product.category}</Link>
        <ChevronRight size={12} />
        <span className="text-primary font-bold uppercase">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Image Gallery */}
        <div className="space-y-6">
          <div className="relative aspect-[4/5] bg-zinc-50 rounded-[2.5rem] overflow-hidden border border-border">
            <motion.img 
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={product.images[selectedImage] || product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6 flex flex-col gap-3">
               <button className="p-3 bg-white/80 backdrop-blur-md rounded-full text-muted-foreground hover:text-red-500 shadow-sm transition-all active:scale-90">
                 <Heart size={20} />
               </button>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, i) => (
              <button 
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${selectedImage === i ? 'border-primary ring-2 ring-primary/10' : 'border-transparent hover:border-zinc-300'}`}
              >
                <img src={img} alt={`${product.name} ${i}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info & Actions */}
        <div className="flex flex-col">
          <div className="mb-8">
            <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-2 block">{product.brand}</span>
            <h1 className="text-4xl font-bold tracking-tight mb-4">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded-full text-sm font-bold">
                <Star size={16} className="fill-current" />
                <span>{product.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground font-medium underline cursor-pointer hover:text-primary">{product.reviewsCount} verified reviews</span>
            </div>
          </div>

          <div className="mb-10 p-6 bg-zinc-50 rounded-[2rem] border border-zinc-100">
             <div className="flex items-end gap-3 mb-1">
               <span className="text-3xl font-bold">₹{product.price}</span>
               {product.originalPrice && (
                 <span className="text-lg text-muted-foreground line-through mb-1">₹{product.originalPrice}</span>
               )}
               <span className="text-green-600 font-bold ml-2 mb-1">40% OFF</span>
             </div>
             <p className="text-sm text-muted-foreground">Inclusive of all taxes & lens coating</p>
          </div>

          <div className="space-y-10">
            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Select Frame Color: <span className="text-muted-foreground capitalize font-normal ml-2">{selectedColor}</span></h3>
              <div className="flex gap-4">
                {product.colors.map((color) => (
                  <button 
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 p-1 transition-all ${selectedColor === color ? 'border-primary' : 'border-transparent'}`}
                  >
                    <div 
                      className="w-full h-full rounded-full shadow-inner" 
                      style={{ backgroundColor: color.toLowerCase() }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Lens Type */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider">Select Lens Type</h3>
                <button className="text-xs text-primary font-bold flex items-center gap-1 underline"><Info size={12}/> Lens Guide</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'single-vision', name: 'Single Vision', desc: 'For distance or near vision' },
                  { id: 'zero-power', name: 'Zero Power', desc: 'Screen protection only' },
                  { id: 'bifocal', name: 'Bifocal / Progressive', desc: 'Dual power lenses' },
                  { id: 'frame-only', name: 'Frame Only', desc: 'No prescription lenses' }
                ].map((type) => (
                  <button 
                    key={type.id}
                    onClick={() => setLensType(type.id)}
                    className={`p-4 rounded-2xl text-left border-2 transition-all ${lensType === type.id ? 'border-primary bg-primary/5' : 'border-border hover:border-zinc-300'}`}
                  >
                    <p className="font-bold text-sm mb-1">{type.name}</p>
                    <p className="text-xs text-muted-foreground leading-tight">{type.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Prescription Choice */}
            {lensType !== 'frame-only' && lensType !== 'zero-power' && (
              <div className="p-6 border-2 border-dashed border-border rounded-[2rem] bg-white text-center">
                <h4 className="font-bold mb-2">Need Prescription?</h4>
                <p className="text-sm text-muted-foreground mb-6">You can upload now or provide it later.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 btn-outline py-2.5 text-xs flex items-center justify-center gap-2"><Upload size={14}/> Upload File</button>
                  <button className="flex-1 btn-outline py-2.5 text-xs">Enter Manually</button>
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button 
                onClick={() => addItem(product)}
                className="flex-[2] btn-primary py-5 rounded-2xl flex items-center justify-center gap-3 text-lg"
              >
                <ShoppingBag size={22} /> ADD TO CART
              </button>
              <button className="flex-1 btn-outline py-5 rounded-2xl font-bold border-2">BUY NOW</button>
            </div>
          </div>

          {/* Delivery & Trust */}
          <div className="mt-16 grid grid-cols-3 gap-4 py-8 border-y border-border">
            <div className="flex flex-col items-center text-center">
              <Truck size={24} className="mb-2 text-zinc-400" />
              <span className="text-[10px] font-bold text-muted-foreground">FREE DELIVERY</span>
              <span className="text-[10px] text-zinc-400">Estimate: 3-5 days</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <RefreshCw size={24} className="mb-2 text-zinc-400" />
              <span className="text-[10px] font-bold text-muted-foreground">14 DAYS RETURN</span>
              <span className="text-[10px] text-zinc-400">Easy & Contactless</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <ShieldCheck size={24} className="mb-2 text-zinc-400" />
              <span className="text-[10px] font-bold text-muted-foreground">WARRANTY</span>
              <span className="text-[10px] text-zinc-400">1 Year Frame Protection</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className="mt-24">
        <div className="border-b border-border flex gap-12 mb-12 overflow-x-auto no-scrollbar">
          <button className="pb-4 border-b-2 border-primary font-bold">Specifications</button>
          <button className="pb-4 text-muted-foreground font-medium hover:text-primary transition-colors">Customer Reviews</button>
          <button className="pb-4 text-muted-foreground font-medium hover:text-primary transition-colors">FAQs</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h3 className="text-2xl font-bold">Product Details</h3>
            <div className="grid grid-cols-2 gap-y-6">
              <div>
                <p className="text-xs text-muted-foreground uppercase mb-1">Frame Shape</p>
                <p className="font-bold">{product.frameShape}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase mb-1">Material</p>
                <p className="font-bold">{product.material}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase mb-1">Gender</p>
                <p className="font-bold">{product.category}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase mb-1">Frame Type</p>
                <p className="font-bold">Full Rim</p>
              </div>
            </div>
          </div>
          
          <div className="bg-zinc-50 p-8 rounded-[2.5rem]">
             <h3 className="text-xl font-bold mb-6">Why buy this frame?</h3>
             <ul className="space-y-4">
               {[
                 'Ultra-lightweight for all-day comfort',
                 'Durable TR90/Acetate material used',
                 'Classic design suitable for most face shapes',
                 'Anti-scratch & Anti-glare lens options available'
               ].map((item, i) => (
                 <li key={i} className="flex gap-3 text-sm text-zinc-600">
                   <ShieldCheck size={18} className="text-green-600 shrink-0" />
                   <span>{item}</span>
                 </li>
               ))}
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
