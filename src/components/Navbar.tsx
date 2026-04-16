import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/useCartStore';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems());
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link 
          to="/" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-2xl font-bold tracking-tighter text-primary"
        >
          EYELENS
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-accent' : 'hover:text-accent'}`}
          >
            HOME
          </Link>
          <Link to="/shop" className="text-sm font-medium hover:text-accent transition-colors">EYEGLASSES</Link>
          <Link to="/shop?category=Sunglasses" className="text-sm font-medium hover:text-accent transition-colors">SUNGLASSES</Link>
          <Link to="/shop?category=Computer Glasses" className="text-sm font-medium hover:text-accent transition-colors">SCREEN GLASSES</Link>
        </div>

        <div className="flex items-center space-x-4 md:space-x-6">
          <div className="hidden sm:flex items-center border border-border rounded-full px-3 py-1.5 bg-white/50 focus-within:bg-white focus-within:border-primary transition-all">
            <Search size={16} className="text-muted-foreground mr-2" />
            <input 
              type="text" 
              placeholder="Search frames..." 
              className="bg-transparent border-none outline-none text-sm w-32 focus:w-48 transition-all"
            />
          </div>
          
          <button className="text-muted-foreground hover:text-primary transition-colors">
            <Heart size={20} />
          </button>
          
          <Link to="/auth" className="text-muted-foreground hover:text-primary transition-colors">
            <User size={20} />
          </Link>

          <Link to="/cart" className="relative text-muted-foreground hover:text-primary transition-colors">
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-accent text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          <button 
            className="md:hidden text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-border overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-4">
              <Link 
                to="/" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-lg font-medium border-b border-border pb-2"
              >
                Home
              </Link>
              <Link to="/shop" className="text-lg font-medium border-b border-border pb-2">Eyeglasses</Link>
              <Link to="/shop?category=Sunglasses" className="text-lg font-medium border-b border-border pb-2">Sunglasses</Link>
              <Link to="/shop?category=Computer Glasses" className="text-lg font-medium border-b border-border pb-2">Screen Glasses</Link>
              <Link to="/offers" className="text-lg font-medium">Offers</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
