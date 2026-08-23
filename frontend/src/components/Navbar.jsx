import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const [isSearchOpen, setIsSearchOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [placeholderText, setPlaceholderText] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.length);
    };

    updateCount();
    window.addEventListener('cartUpdated', updateCount);
    return () => window.removeEventListener('cartUpdated', updateCount);
  }, []);

  const getLinkClasses = (path) => {
    return `text-sm font-bold transition-colors ${
      location.pathname === path ? 'text-primary' : 'text-text-secondary hover:text-primary'
    }`;
  };

  useEffect(() => {
    if (!isSearchOpen) {
      setPlaceholderText('');
      return;
    }
    const words = ["Sunglasses...", "Spectacles..."];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingTimer;

    const type = () => {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        setPlaceholderText(currentWord.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setPlaceholderText(currentWord.substring(0, charIndex + 1));
        charIndex++;
      }

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 1500; // Pause when word is fully typed
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 300; // Pause before starting new word
      }

      typingTimer = setTimeout(type, typeSpeed);
    };

    typingTimer = setTimeout(type, 100);

    return () => clearTimeout(typingTimer);
  }, [isSearchOpen]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/shop', { state: { searchQuery: searchQuery.trim() } });
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border-primary overflow-hidden">
      <div className="px-4 py-3">
        <div className="flex justify-between items-center h-12">
          
          <div className="flex items-center shrink-0">
            <Link to="/" className="text-[30px] font-bold tracking-tighter text-primary">Eye Lens</Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            <Link to="/" className={getLinkClasses('/')}>Home</Link>
            <Link to="/shop" className={getLinkClasses('/shop')}>Shop</Link>
            <Link to="/wishlist" className={getLinkClasses('/wishlist')}>Wishlist</Link>
            <Link to="/help" className={getLinkClasses('/help')}>Help</Link>
            <Link to="/cart" className={`${getLinkClasses('/cart')} flex items-center relative`}>
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3.5 bg-primary text-background text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 justify-end flex-1">
            {userInfo && userInfo.role === 'admin' && (
              <Link to="/admin" className="text-sm font-bold text-red-500 bg-red-50 px-3 py-1 rounded-full border border-red-100 shrink-0 hidden sm:block">
                Admin
              </Link>
            )}
            
            <div className="flex items-center relative justify-end">
              <form 
                onSubmit={handleSearch}
                className={`transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] overflow-hidden flex items-center ${isSearchOpen ? 'w-[160px] sm:w-[200px] opacity-100 mr-1' : 'w-0 opacity-0 mr-0'}`}
              >
                <input 
                  type="text" 
                  placeholder={placeholderText} 
                  className="w-full bg-background-secondary border border-border-primary text-text-primary rounded-full pl-4 pr-2 py-2 focus:outline-none focus:border-primary text-sm shadow-inner placeholder:text-text-secondary/70"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              
              <button 
                onClick={() => {
                  if (isSearchOpen && searchQuery.trim()) {
                    handleSearch();
                  } else {
                    setIsSearchOpen(!isSearchOpen);
                    if (isSearchOpen) setSearchQuery('');
                  }
                }} 
                className={`animate-fade-in-up animation-delay-300 p-2 rounded-full transition-colors shrink-0 z-10 ${isSearchOpen ? 'text-primary bg-primary/10' : 'text-text-primary hover:text-primary'}`}
              >
                {isSearchOpen && !searchQuery.trim() ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
