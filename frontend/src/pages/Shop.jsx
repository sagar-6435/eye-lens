import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

function Shop({ products }) {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(location.state?.category || 'All');
  const [searchQuery, setSearchQuery] = useState(location.state?.searchQuery || '');
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    if (location.state?.category) {
      setActiveCategory(location.state.category);
    }
    if (location.state?.searchQuery !== undefined) {
      setSearchQuery(location.state.searchQuery);
      // Reset category if user is specifically searching
      if (location.state.searchQuery) setActiveCategory('All');
    }
  }, [location.state?.category, location.state?.searchQuery]);
  
  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        const catNames = data.map(c => c.name);
        setCategories(['All', ...catNames]);
      })
      .catch(err => console.error(err));
  }, []);
  
  let filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  if (searchQuery) {
    const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
    const q = normalize(searchQuery);
    
    filteredProducts = filteredProducts.filter(p => {
      const pName = normalize(p.name);
      const pCat = normalize(p.category);
      
      if (pName.includes(q) || pCat.includes(q)) return true;
      
      // Fuzzy matching: check if characters appear in the same order
      let searchIndex = 0;
      for (let i = 0; i < pName.length; i++) {
        if (pName[i] === q[searchIndex]) {
          searchIndex++;
        }
        if (searchIndex === q.length) return true;
      }
      
      return false;
    });
  }

  return (
    <div className="pt-6 pb-24 px-4 w-full mx-auto">
      {searchQuery && (
        <div className="mb-6 flex justify-center md:justify-start">
          <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20 w-fit">
            <span>Results for "{searchQuery}"</span>
            <button onClick={() => setSearchQuery('')} className="hover:text-primary-hover p-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
        </div>
      )}

      {/* Categories Filter */}
      <div className="flex gap-3 overflow-x-auto pb-4 mb-6 snap-x hide-scrollbar">
        {categories.map((cat, i) => (
          <button 
            key={i} 
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium snap-start transition-colors ${
              activeCategory === cat 
                ? 'bg-primary text-background shadow-md' 
                : 'bg-background-secondary text-text-secondary border border-border-primary hover:bg-border-primary/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-secondary">No products found in this category.</p>
          <button 
            onClick={() => setActiveCategory('All')}
            className="mt-4 text-primary font-medium hover:underline"
          >
            View all products
          </button>
        </div>
      )}
    </div>
  );
}

export default Shop;
