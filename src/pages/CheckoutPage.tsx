import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Truck, CheckCircle2, ChevronRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';

const CheckoutPage: React.FC = () => {
  const { items, totalPrice, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = totalPrice();
  const total = subtotal + (subtotal * 0.12);

  const handlePlaceOrder = () => {
    setIsSuccess(true);
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto"
        >
          <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={56} />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Order Placed!</h1>
          <p className="text-muted-foreground mb-12">Your vision is on its way. We've sent the order details and tracking link to your email.</p>
          <div className="bg-zinc-50 p-6 rounded-3xl mb-12 inline-block text-left w-full">
             <div className="flex justify-between items-center mb-4">
               <span className="text-sm text-muted-foreground">Order ID:</span>
               <span className="font-bold">#EYE-90210-2026</span>
             </div>
             <div className="flex justify-between items-center">
               <span className="text-sm text-muted-foreground">Status:</span>
               <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Processing</span>
             </div>
          </div>
          <Link to="/shop" className="btn-primary">CONTINUE SHOPPING</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Left: Checkout Flow */}
        <div className="flex-[2] space-y-12">
          {/* Progress Bar */}
          <div className="flex items-center gap-4 mb-12 overflow-x-auto no-scrollbar pb-4">
             {[
               { n: 1, label: 'Shipping' },
               { n: 2, label: 'Payment' },
               { n: 3, label: 'Review' }
             ].map((s) => (
               <React.Fragment key={s.n}>
                 <div className="flex items-center gap-3 shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= s.n ? 'bg-primary text-white' : 'bg-zinc-100 text-zinc-400'}`}>
                      {s.n}
                    </div>
                    <span className={`text-sm font-bold uppercase tracking-wider ${step >= s.n ? 'text-primary' : 'text-zinc-400'}`}>{s.label}</span>
                 </div>
                 {s.n < 3 && <div className={`w-12 h-[2px] shrink-0 ${step > s.n ? 'bg-primary' : 'bg-zinc-100'}`} />}
               </React.Fragment>
             ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-10"
              >
                <div>
                   <h2 className="text-3xl font-bold mb-8">Shipping Information</h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                        <input type="text" placeholder="John Doe" className="w-full px-6 py-4 bg-zinc-50 border border-border rounded-2xl outline-none focus:border-primary transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Phone Number</label>
                        <input type="tel" placeholder="+91 98765-43210" className="w-full px-6 py-4 bg-zinc-50 border border-border rounded-2xl outline-none focus:border-primary transition-all" />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Street Address</label>
                        <input type="text" placeholder="House no, Street name" className="w-full px-6 py-4 bg-zinc-50 border border-border rounded-2xl outline-none focus:border-primary transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">City</label>
                        <input type="text" placeholder="New Delhi" className="w-full px-6 py-4 bg-zinc-50 border border-border rounded-2xl outline-none focus:border-primary transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Pincode</label>
                        <input type="text" placeholder="110001" className="w-full px-6 py-4 bg-zinc-50 border border-border rounded-2xl outline-none focus:border-primary transition-all" />
                      </div>
                   </div>
                </div>

                <div className="p-6 bg-zinc-50 rounded-[2rem] border border-zinc-100">
                   <div className="flex gap-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                        <Truck size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-sm">Express Delivery</p>
                        <p className="text-xs text-muted-foreground">Estimated delivery between 3rd - 5th May</p>
                        <p className="text-xs font-bold text-green-600 mt-1 uppercase tracking-wider">Free Shipping Applied</p>
                      </div>
                   </div>
                </div>

                <button onClick={() => setStep(2)} className="w-full md:w-auto btn-primary px-12 py-5 rounded-2xl flex items-center justify-center gap-2 text-lg">
                  CONTINUE TO PAYMENT <ChevronRight size={20} />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-10"
              >
                <div>
                   <h2 className="text-3xl font-bold mb-8">Choose Payment Method</h2>
                   <div className="grid grid-cols-1 gap-4">
                      {[
                        { id: 'card', name: 'Credit / Debit Card', icon: <CreditCard />, desc: 'Visa, Mastercard, RuPay supported' },
                        { id: 'upi', name: 'UPI', icon: <div className="font-black italic">UPI</div>, desc: 'Google Pay, PhonePe, Paytm' },
                        { id: 'cod', name: 'Cash on Delivery', icon: <Truck />, desc: 'Pay when you receive the order' }
                      ].map((method) => (
                        <button 
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={`p-6 rounded-3xl text-left border-3 transition-all flex items-center gap-6 ${paymentMethod === method.id ? 'border-primary bg-primary/5' : 'border-zinc-100 hover:border-zinc-200 bg-white'}`}
                        >
                           <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${paymentMethod === method.id ? 'bg-primary text-white' : 'bg-zinc-50 text-zinc-400'}`}>
                              {method.icon}
                           </div>
                           <div className="flex-grow">
                             <p className="font-bold text-lg">{method.name}</p>
                             <p className="text-xs text-muted-foreground">{method.desc}</p>
                           </div>
                           <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? 'border-primary bg-white' : 'border-zinc-200'}`}>
                              {paymentMethod === method.id && <div className="w-3 h-3 bg-primary rounded-full" />}
                           </div>
                        </button>
                      ))}
                   </div>
                </div>

                {paymentMethod === 'card' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 border border-border rounded-[2.5rem] bg-zinc-50">
                    <div className="md:col-span-2 space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Card Number</label>
                       <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-5 py-3 border border-border rounded-xl outline-none focus:border-primary bg-white" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Expiry Date</label>
                       <input type="text" placeholder="MM/YY" className="w-full px-5 py-3 border border-border rounded-xl outline-none focus:border-primary bg-white" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">CVV</label>
                       <input type="password" placeholder="***" className="w-full px-5 py-3 border border-border rounded-xl outline-none focus:border-primary bg-white" />
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="btn-outline px-8">Back</button>
                  <button onClick={() => setStep(3)} className="btn-primary flex-grow md:flex-none px-12 py-5 rounded-2xl flex items-center justify-center gap-2 text-lg">
                    REVIEW ORDER <ChevronRight size={20} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-10"
              >
                <div className="space-y-8">
                   <h2 className="text-3xl font-bold">Review & Place Order</h2>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="p-6 bg-zinc-50 rounded-3xl space-y-4">
                         <div className="flex justify-between items-center">
                            <h4 className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Shipping To</h4>
                            <button onClick={() => setStep(1)} className="text-[10px] font-bold text-accent">CHANGE</button>
                         </div>
                         <div className="flex gap-3">
                            <MapPin size={18} className="text-zinc-400 shrink-0" />
                            <p className="text-sm font-medium">John Doe<br/>123 Vision Avenue, Eye Park<br/>New Delhi, 110001</p>
                         </div>
                      </div>

                      <div className="p-6 bg-zinc-50 rounded-3xl space-y-4">
                         <div className="flex justify-between items-center">
                            <h4 className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Paying Via</h4>
                            <button onClick={() => setStep(2)} className="text-[10px] font-bold text-accent">CHANGE</button>
                         </div>
                         <div className="flex gap-3">
                            <CreditCard size={18} className="text-zinc-400 shrink-0" />
                            <p className="text-sm font-medium uppercase">{paymentMethod}: **** 4242</p>
                         </div>
                      </div>
                   </div>

                   <div className="border border-border rounded-[2.5rem] p-8">
                      <h4 className="font-bold mb-6">In Your Bag ({items.length})</h4>
                      <div className="space-y-4 max-h-64 overflow-y-auto pr-4 no-scrollbar">
                         {items.map((item) => (
                           <div key={item.id} className="flex gap-4 items-center">
                              <div className="w-16 h-16 bg-zinc-100 rounded-xl p-1">
                                <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain" />
                              </div>
                              <div className="flex-grow">
                                <p className="font-bold text-sm truncate">{item.name}</p>
                                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                              </div>
                              <p className="font-bold">₹{item.price * item.quantity}</p>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep(2)} className="btn-outline px-8">Back</button>
                  <button onClick={handlePlaceOrder} className="btn-primary flex-grow md:flex-none px-12 py-5 rounded-2xl flex items-center justify-center gap-2 text-lg">
                    PLACE ORDER NOW ₹{total.toFixed(0)} <CheckCircle2 size={20} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Summary Stick (simplified) */}
        <div className="flex-1">
          <div className="sticky top-32 bg-white p-8 rounded-[2.5rem] border border-border shadow-premium">
             <h3 className="font-bold mb-6">Summary</h3>
             <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Items ({items.length})</span>
                  <span className="font-bold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-bold">₹{(subtotal*0.12).toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600 font-bold uppercase">Free</span>
                </div>
             </div>
             <div className="pt-6 border-t border-border flex justify-between items-end">
                <span className="font-bold">Payable Amount</span>
                <span className="text-2xl font-extrabold tracking-tight">₹{total.toFixed(0)}</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
