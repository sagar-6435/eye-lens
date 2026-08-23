import React, { useState, useEffect } from 'react';

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  }, []);

  const handleRemove = (id) => {
    const newCart = cart.filter(item => item._id !== id);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const priceNum = parseFloat(item.price.replace(/[^0-9.-]+/g, '')) || 0;
      return total + priceNum * (item.quantity || 1);
    }, 0).toFixed(2);
  };

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    
    const adminMobile = import.meta.env.VITE_ADMIN_MOBILE;
    let message = `Hi, I would like to buy the following items from the cart:%0A%0A`;
    
    cart.forEach((item, index) => {
      const idText = item.adminId ? ` (Admin ID: ${item.adminId})` : ` (Product ID: ${item._id})`;
      message += `${index + 1}. *${item.name}*${idText} - ${item.price}%0A`;
    });
    
    message += `%0A*Total: ₹${calculateTotal()}*`;
    
    const whatsappUrl = `https://wa.me/${adminMobile}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="pt-6 pb-24 px-4 w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight mb-2">Your Cart</h1>
        <p className="text-text-secondary">Review your items before checkout.</p>
      </div>

      {cart.length === 0 ? (
        <div className="bg-background-secondary rounded-2xl p-8 flex flex-col items-center justify-center text-center border border-border-primary min-h-[400px]">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-text-primary mb-2">Your cart is empty</h2>
          <p className="text-text-secondary mb-6 max-w-md">Looks like you haven't added anything to your cart yet. Discover our premium eyewear collection.</p>
          <a href="/shop" className="bg-primary hover:bg-primary-hover text-background px-8 py-3 rounded-xl font-bold text-base transition-colors shadow-lg shadow-primary/20">
            Start Shopping
          </a>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="bg-background-secondary rounded-2xl border border-border-primary overflow-hidden">
              {cart.map(item => (
                <div key={item._id} className="flex items-center gap-4 p-4 border-b border-border-primary last:border-0">
                  <div className="w-24 h-24 bg-background rounded-xl overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-text-primary">{item.name}</h3>
                    <p className="text-sm text-text-secondary">{item.category}</p>
                    <p className="font-semibold text-primary mt-1">{item.price}</p>
                  </div>
                  <button 
                    onClick={() => handleRemove(item._id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-full lg:w-80 shrink-0">
            <div className="bg-background-secondary rounded-2xl p-6 border border-border-primary sticky top-24">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2 text-text-secondary">
                <span>Subtotal ({cart.length} items)</span>
                <span>₹{calculateTotal()}</span>
              </div>
              <div className="flex justify-between mb-4 text-text-secondary">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="border-t border-border-primary pt-4 mb-6">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">₹{calculateTotal()}</span>
                </div>
              </div>
              <button 
                onClick={handleWhatsAppCheckout}
                className="w-full py-4 bg-[#25D366] text-white rounded-xl font-bold shadow-lg shadow-[#25D366]/20 hover:bg-[#20bd5a] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                </svg>
                Buy via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
