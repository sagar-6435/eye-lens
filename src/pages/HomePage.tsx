import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, RefreshCw, Truck, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../utils/dummyData';

const HomePage: React.FC = () => {
  const bestSellers = products.filter(p => p.isBestSeller);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=1200&auto=format&fit=crop" 
            alt="Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="inline-block bg-accent px-4 py-1.5 rounded-full text-xs font-bold tracking-widest mb-6">
              NEW COLLECTION 2026
            </span>
            <h1 className="text-6xl md:text-8xl font-serif italic tracking-tight leading-none mb-8">
              Vision <br /> <span className="text-accent underline decoration-1 underline-offset-8">Beyond</span> <br /> Luxury.
            </h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed">
              Experience the perfect blend of style and precision. Get 50% off on your first pair of premium eyewear.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop" className="btn-primary flex items-center justify-center gap-2 group">
                SHOP COLLECTION <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Features */}
        <div className="absolute bottom-12 right-12 hidden lg:flex flex-col gap-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-4 rounded-3xl flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white">
              <Star size={24} className="fill-current" />
            </div>
            <div>
              <p className="text-sm font-bold">4.9/5 Rating</p>
              <p className="text-[10px] text-muted-foreground">From 10k+ customers</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Explore Categories</h2>
            <p className="text-muted-foreground">Find the perfect pair for every occasion.</p>
          </div>
          <Link to="/shop" className="text-primary font-bold text-sm flex items-center gap-2 group">
            VIEW ALL <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'EYEGLASSES', img: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=600&auto=format&fit=crop' },
            { name: 'SUNGLASSES', img: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=600&auto=format&fit=crop' },
            { name: 'SCREEN GLASSES', img: 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?q=80&w=600&auto=format&fit=crop' }
          ].map((cat, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden group cursor-pointer"
            >
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                <h3 className="text-white text-2xl font-bold mb-2">{cat.name}</h3>
                <p className="text-white/70 text-sm mb-4">Starting from ₹999</p>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                  <ArrowRight size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      {/* Best Sellers */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Our Best Sellers</h2>
            <p className="text-muted-foreground">Most loved frames this season.</p>
          </div>
          <Link to="/shop" className="text-primary font-bold text-sm flex items-center gap-2 group">
            VIEW ALL <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Trust Builder */}
      <section className="container mx-auto px-4 md:px-6 border-t border-border pt-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="text-center md:text-left">
            <div className="w-16 h-16 bg-zinc-100 rounded-3xl flex items-center justify-center text-primary mb-6 mx-auto md:mx-0">
              <Truck size={32} />
            </div>
            <h4 className="font-bold mb-2">Free Shipping</h4>
            <p className="text-sm text-muted-foreground">On all orders above ₹1000</p>
          </div>
          <div className="text-center md:text-left">
            <div className="w-16 h-16 bg-zinc-100 rounded-3xl flex items-center justify-center text-primary mb-6 mx-auto md:mx-0">
              <RefreshCw size={32} />
            </div>
            <h4 className="font-bold mb-2">14 Days Return</h4>
            <p className="text-sm text-muted-foreground">No questions asked return policy</p>
          </div>
          <div className="text-center md:text-left">
            <div className="w-16 h-16 bg-zinc-100 rounded-3xl flex items-center justify-center text-primary mb-6 mx-auto md:mx-0">
              <ShieldCheck size={32} />
            </div>
            <h4 className="font-bold mb-2">1 Year Warranty</h4>
            <p className="text-sm text-muted-foreground">Comprehensive frame warranty</p>
          </div>
          <div className="text-center md:text-left">
            <div className="w-16 h-16 bg-zinc-100 rounded-3xl flex items-center justify-center text-primary mb-6 mx-auto md:mx-0">
              <Star size={32} />
            </div>
            <h4 className="font-bold mb-2">Premium Quality</h4>
            <p className="text-sm text-muted-foreground">Sourced from top materials</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
