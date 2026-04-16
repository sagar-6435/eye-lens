import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, Search, Grid, List as ListIcon } from 'lucide-react';
import { products, categories, shapes } from '../utils/dummyData';
import ProductCard from '../components/ProductCard';

const ShopPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedShapes, setSelectedShapes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(5000);
  const [sortBy, setSortBy] = useState('popularity');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = !selectedCategory || p.category === selectedCategory || p.type === selectedCategory;
      const matchShape = selectedShapes.length === 0 || selectedShapes.includes(p.frameShape);
      const matchPrice = p.price <= priceRange;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchShape && matchPrice && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, selectedShapes, priceRange, sortBy, searchQuery]);

  const toggleShape = (shape: string) => {
    setSelectedShapes(prev => 
      prev.includes(shape) ? prev.filter(s => s !== shape) : [...prev, shape]
    );
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Shop All Eyewear</h1>
          <p className="text-muted-foreground">{filteredProducts.length} styles found</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text" 
              placeholder="Search frames..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-border rounded-xl outline-none focus:border-primary transition-all"
            />
          </div>
          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden btn-outline flex items-center gap-2 py-2.5 px-4"
          >
            <Filter size={18} /> Filters
          </button>
        </div>
      </div>

      <div className="flex gap-12">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-8 sticky top-32 h-fit">
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 flex items-center justify-between">
              Categories
              <Filter size={14} className="text-muted-foreground" />
            </h3>
            <div className="space-y-2">
              <button 
                onClick={() => setSelectedCategory(null)}
                className={`block w-full text-left py-2 px-3 rounded-lg text-sm transition-colors ${!selectedCategory ? 'bg-primary text-white' : 'hover:bg-zinc-100'}`}
              >
                All Products
              </button>
              {categories.map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`block w-full text-left py-2 px-3 rounded-lg text-sm transition-colors ${selectedCategory === cat ? 'bg-primary text-white' : 'hover:bg-zinc-100'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4">Frame Shape</h3>
            <div className="grid grid-cols-2 gap-2">
              {shapes.map((shape) => (
                <button 
                  key={shape}
                  onClick={() => toggleShape(shape)}
                  className={`py-2 px-1 border rounded-xl text-[11px] font-medium transition-all ${selectedShapes.includes(shape) ? 'bg-zinc-900 text-white border-zinc-900' : 'border-border hover:border-zinc-400'}`}
                >
                  {shape}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-sm uppercase tracking-wider">Price Range</h3>
              <span className="text-sm font-medium">Up to ₹{priceRange}</span>
            </div>
            <input 
              type="range" 
              min="500" 
              max="10000" 
              step="500"
              value={priceRange}
              onChange={(e) => setPriceRange(parseInt(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
        </aside>

        {/* Main Grid */}
        <div className="flex-grow">
          {/* Toolbar */}
          <div className="flex justify-between items-center mb-8 bg-zinc-50 p-3 rounded-2xl">
            <div className="flex items-center gap-2">
              <button className="p-2 bg-white rounded-lg shadow-sm text-primary"><Grid size={18} /></button>
              <button className="p-2 text-muted-foreground hover:text-primary"><ListIcon size={18} /></button>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-muted-foreground hidden sm:block">Sort by:</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary cursor-pointer"
              >
                <option value="popularity">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Average Rating</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-24 bg-zinc-50 rounded-[3rem]">
              <div className="w-20 h-20 bg-zinc-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-zinc-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No products found</h2>
              <p className="text-muted-foreground mb-8">Try adjusting your filters or search terms.</p>
              <button 
                onClick={() => {
                   setSelectedCategory(null);
                   setSelectedShapes([]);
                   setPriceRange(10000);
                   setSearchQuery('');
                }}
                className="btn-primary"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-xs bg-white p-8 overflow-y-auto shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-bold uppercase tracking-tight">Filters</h3>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 rounded-full bg-zinc-100"><X size={20} /></button>
              </div>
              
              <div className="space-y-12">
                <div>
                   <h3 className="font-bold text-sm uppercase tracking-widest mb-6">Categories</h3>
                   <div className="flex flex-wrap gap-2">
                     {['All', ...categories].map((cat) => (
                        <button 
                          key={cat}
                          onClick={() => setSelectedCategory(cat === 'All' ? null : cat)}
                          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${((cat === 'All' && !selectedCategory) || selectedCategory === cat) ? 'bg-primary text-white border-primary' : 'bg-transparent border-zinc-200'}`}
                        >
                          {cat}
                        </button>
                     ))}
                   </div>
                </div>

                <div>
                   <h3 className="font-bold text-sm uppercase tracking-widest mb-6 border-t border-zinc-100 pt-8">Frame Shape</h3>
                   <div className="grid grid-cols-2 gap-3">
                     {shapes.map((shape) => (
                        <button 
                          key={shape}
                          onClick={() => toggleShape(shape)}
                          className={`px-4 py-3 rounded-2xl text-xs font-semibold border transition-all ${selectedShapes.includes(shape) ? 'bg-primary text-white border-primary' : 'bg-transparent border-zinc-200'}`}
                        >
                          {shape}
                        </button>
                     ))}
                   </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-6 border-t border-zinc-100 pt-8">
                    <h3 className="font-bold text-sm uppercase tracking-widest">Price Range</h3>
                    <span className="text-sm font-bold">₹{priceRange}</span>
                  </div>
                  <input 
                    type="range" 
                    min="500" 
                    max="10000" 
                    step="500"
                    value={priceRange}
                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                    className="w-full accent-primary h-2 bg-zinc-200 rounded-full appearance-none cursor-pointer"
                  />
                </div>

                <div className="pt-8">
                   <button 
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="w-full btn-primary"
                   >
                     Apply Filters
                   </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShopPage;
