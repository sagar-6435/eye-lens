import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, CreditCard, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCartStore();
  
  const subtotal = totalPrice();
  const tax = subtotal * 0.12;
  const shipping = subtotal > 1000 ? 0 : 99;
  const total = subtotal + tax + shipping;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto"
        >
          <div className="w-32 h-32 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShoppingBag size={48} className="text-zinc-300" />
          </div>
          <h2 className="text-3xl font-bold mb-4 tracking-tight">Your cart is empty</h2>
          <p className="text-muted-foreground mb-12">Looking for some style? Explore our latest collection find your perfect pair.</p>
          <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
            START SHOPPING <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Left: Items */}
        <div className="flex-[2]">
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-border">
            <h1 className="text-3xl font-bold tracking-tight">My Bag <span className="text-muted-foreground font-normal ml-2">({totalItems()} items)</span></h1>
            <Link to="/shop" className="text-sm font-bold flex items-center gap-2 hover:translate-x-[-4px] transition-transform">
              <ChevronLeft size={16} /> CONTINUE SHOPPING
            </Link>
          </div>

          <div className="space-y-8">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex gap-6 p-6 rounded-[2rem] border border-border group hover:border-zinc-300 transition-all bg-white"
                >
                  <Link to={`/product/${item.id}`} className="w-32 sm:w-40 aspect-square bg-zinc-50 rounded-2xl overflow-hidden shrink-0 border border-zinc-100 p-2">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                  </Link>

                  <div className="flex-grow flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{item.brand}</p>
                        <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                        <p className="text-xs text-muted-foreground mb-4">Color: {item.colors[0]} | Type: {item.type}</p>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="flex items-end justify-between">
                      <div className="flex items-center gap-3 bg-zinc-100 p-1.5 rounded-xl">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-primary hover:text-white transition-all active:scale-90"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-bold text-sm tracking-tighter">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-primary hover:text-white transition-all active:scale-90"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="text-right">
                         <p className="text-xl font-bold">₹{item.price * item.quantity}</p>
                         <p className="text-[10px] text-zinc-400 font-bold">₹{item.price} / pair</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Offers Section */}
          <div className="mt-12 p-8 bg-zinc-50 rounded-[2.5rem] border border-dashed border-zinc-200">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold tracking-tight">Available Offers</h3>
                <span className="text-xs font-bold text-accent">3 OFFERS APPLIED</span>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {[
                 { title: 'Buy 1 Get 1', desc: 'Add one more frame for FREE', code: 'B1G1' },
                 { title: 'FirstPair50', desc: '50% off on your first order', code: 'FIRST50' }
               ].map((offer, i) => (
                 <div key={i} className="bg-white p-4 rounded-2xl flex items-center justify-between border border-border group hover:border-accent transition-all">
                    <div>
                      <p className="font-bold text-sm mb-1">{offer.title}</p>
                      <p className="text-xs text-muted-foreground">{offer.desc}</p>
                    </div>
                    <div className="px-3 py-1 bg-zinc-50 border border-dashed border-zinc-300 rounded text-[10px] font-bold group-hover:bg-accent/10 group-hover:border-accent transition-all">
                      {offer.code}
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="flex-1">
          <div className="sticky top-32 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-border shadow-premium">
               <h3 className="text-xl font-bold mb-8">Order Summary</h3>
               
               <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Bag Subtotal</span>
                    <span className="font-bold text-zinc-600">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Estimated Tax (12%)</span>
                    <span className="font-bold text-zinc-600">₹{tax.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping Fee</span>
                    <span className={`font-bold ${shipping === 0 ? 'text-green-600' : 'text-zinc-600'}`}>
                      {shipping === 0 ? 'FREE' : `₹${shipping}`}
                    </span>
                  </div>
               </div>

               <div className="pt-6 border-t border-border mb-8">
                 <div className="flex justify-between items-end mb-2">
                   <span className="font-bold">Estimated Total</span>
                   <span className="text-3xl font-extrabold tracking-tight">₹{total.toFixed(0)}</span>
                 </div>
                 <p className="text-[10px] text-muted-foreground font-medium text-right uppercase tracking-widest">Pricing as of today</p>
               </div>

               <Link to="/checkout" className="w-full btn-primary py-5 rounded-2xl flex items-center justify-center gap-3 text-lg mb-6">
                 CHECKOUT SECURELY <CreditCard size={20} />
               </Link>

               <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl">
                   <ShieldCheck size={20} className="text-zinc-400" />
                   <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Secure Payment & Buyer Protection</p>
                 </div>
               </div>
            </div>

            <div className="p-6 bg-zinc-50 rounded-[2rem] border border-zinc-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-accent shadow-sm">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest">1 Year Warranty</p>
                <p className="text-[10px] text-muted-foreground">Comprehensive coverage on all frames</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
