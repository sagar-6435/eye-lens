import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

function Home({ products }) {
  const [categories, setCategories] = useState(['All']);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        const catNames = data.map(c => c.name);
        setCategories(['All', ...catNames]);
      })
      .catch(err => console.error(err));
  }, []);
  return (
    <>
      {/* Hero Section (Mobile Optimized) */}
      <section 
        className="relative bg-background-secondary overflow-hidden pb-12 lg:pb-32"
        style={{ paddingTop: 'calc(var(--spacing) * 2)' }}
      >
        <div className="px-4 sm:px-6 w-full mx-auto">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 items-center">
            
            {/* Text Content */}
            <div className="w-full z-10 text-center lg:text-left mt-6 lg:mt-0">
              <div className="flex flex-col gap-3 px-2 lg:px-0 mb-6">
                <button 
                  onClick={() => navigate('/shop', { state: { category: 'Spectacles' } })}
                  className="animate-fade-in-up bg-primary active:bg-primary-hover text-background w-full py-3.5 rounded-2xl font-bold text-base shadow-lg shadow-primary/20 flex items-center justify-center transition-colors"
                >
                  Shop Spectacles
                </button>
                <button 
                  onClick={() => navigate('/shop', { state: { category: 'Sunglasses' } })}
                  className="animate-fade-in-up animation-delay-150 bg-background border-2 border-border-primary active:bg-background-secondary text-text-primary w-full py-3.5 rounded-2xl font-bold text-base transition-colors"
                >
                  Explore Sunglasses
                </button>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-xs mb-4 border border-primary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                Summer '26
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold text-text-primary tracking-tight mb-4 leading-tight">
                See with <br/>
                <span className="text-primary relative inline-block mt-1">
                  Clarity
                  <span className="absolute bottom-1 left-0 w-full h-2 bg-accent/30 -z-10 transform -rotate-1 rounded-full"></span>
                </span> 
                {' '}&amp;{' '}
                <span className="text-accent">Style</span>
              </h1>
              <p className="text-base md:text-xl text-text-secondary leading-relaxed px-2 lg:px-0">
                Premium eyewear designed to elevate your everyday look with unmatched comfort.
              </p>
            </div>

            {/* Image Content */}
            <div className="relative w-4/5 max-w-[280px] md:max-w-sm aspect-[4/5] lg:w-full lg:max-w-[400px] lg:aspect-auto lg:h-[550px] mx-auto mt-8 lg:mt-2">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/30 to-primary/30 rounded-[2rem] transform rotate-2"></div>
              <img 
                src="/hero_model.jpg" 
                alt="Stylish model with spectacles" 
                className="relative rounded-[2rem] shadow-xl object-cover w-full h-full z-10 border-4 border-background"
              />
              {/* Mobile optimized floating badge */}
              <div className="absolute -bottom-4 right-4 bg-background px-3 py-2.5 rounded-xl shadow-lg z-20 flex items-center gap-2 border border-border-primary">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                  <p className="font-bold text-text-primary text-xs leading-none">Premium</p>
                  <p className="text-[10px] text-text-secondary mt-0.5">Acetate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories (Mobile App Style) */}
      <section className="py-6 px-4 w-full mx-auto">
        <div className="flex gap-3 overflow-x-auto pb-4 snap-x hide-scrollbar">
          {categories.map((cat, i) => (
            <button 
              key={i} 
              onClick={() => navigate('/shop', { state: { category: cat } })}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium snap-start transition-colors ${i === 0 ? 'bg-primary text-background hover:bg-primary-hover' : 'bg-background-secondary text-text-secondary border border-border-primary hover:bg-border-primary/50'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Collection (Horizontal Scroll for Mobile) */}
      <section className="py-6 bg-background">
        <div className="w-full mx-auto">
          <div className="px-4 flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-text-primary">Trending Now</h2>
            <a href="/shop" className="text-primary font-medium text-sm">See All</a>
          </div>

          <div className="flex overflow-x-auto gap-4 px-4 pb-8 snap-x">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} featured={true} />
            ))}
          </div>
        </div>
      </section>


    </>
  );
}

export default Home;
