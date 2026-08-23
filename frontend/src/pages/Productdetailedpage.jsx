import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePopup } from '../components/PopupContext';

function Productdetailedpage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showPopup } = usePopup();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${id}`);
      if (res.ok) {
        const data = await res.json();
        setProduct(data);
      } else {
        showPopup('Product not found', 'error');
        navigate('/shop');
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    // Check if already in cart
    const exists = cart.find(item => item._id === product._id);
    if (!exists) {
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem('cart', JSON.stringify(cart));
      showPopup('Product added to cart!');
    } else {
      showPopup('Product is already in the cart.', 'error');
    }
  };

  const handleBuyNow = () => {
    const adminMobile = import.meta.env.VITE_ADMIN_MOBILE;
    const idText = product.adminId ? ` (Admin ID: ${product.adminId})` : ` (Product ID: ${product._id})`;
    const message = `Hi, I would like to buy the following product:%0A%0A*${product.name}*${idText}%0APrice: ${product.price}`;
    const whatsappUrl = `https://wa.me/${adminMobile}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return <div className="pt-24 text-center text-text-secondary">Loading product...</div>;
  }

  if (!product) return null;

  return (
    <div className="pt-8 pb-24 px-4 w-full mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-text-secondary hover:text-text-primary transition-colors font-medium text-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Product Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="bg-background-secondary rounded-3xl overflow-hidden border border-border-primary aspect-square relative">
            <img 
              src={product ? [product.image, ...(product.images || [])][activeImageIndex] : ''} 
              alt={product.name}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          </div>
          
          {/* Thumbnails */}
          {product && (product.images && product.images.length > 0) && (
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x hide-scrollbar">
              {[product.image, ...product.images].map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${activeImageIndex === idx ? 'border-primary opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt={`${product.name} \${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center">
          <span className="px-3 py-1 bg-background-secondary border border-border-primary text-text-secondary rounded-full text-xs font-semibold w-max mb-4">
            {product.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-4 first-letter:uppercase">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl font-black text-primary">{product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-text-secondary line-through font-medium">{product.originalPrice}</span>
            )}
          </div>

          <p className="text-text-secondary mb-8 leading-relaxed">
            Experience premium quality and style with the {product.name}. Designed to provide both aesthetic appeal and everyday comfort. This is a must-have addition to your collection.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <button 
              onClick={handleBuyNow}
              className="flex-1 py-4 bg-primary text-background rounded-2xl font-bold shadow-lg shadow-primary/25 hover:bg-primary-hover active:scale-95 transition-all text-center"
            >
              Buy Now
            </button>
            <button 
              onClick={handleAddToCart}
              className="flex-1 py-4 bg-background-secondary border-2 border-border-primary text-text-primary rounded-2xl font-bold hover:bg-border-primary active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Productdetailedpage;
