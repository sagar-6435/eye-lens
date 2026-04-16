
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ScrollToTop from './components/ScrollToTop';

// Placeholder Pages
const AuthPage = () => (
  <div className="container mx-auto px-4 py-24 max-w-md">
    <div className="bg-white p-10 rounded-[2.5rem] border border-border shadow-premium text-center">
       <h1 className="text-3xl font-bold mb-8">Welcome to Eyelens</h1>
       <div className="space-y-4">
          <input type="email" placeholder="Email Address" className="w-full px-6 py-4 bg-zinc-50 border border-border rounded-2xl outline-none focus:border-primary transition-all" />
          <input type="password" placeholder="Password" className="w-full px-6 py-4 bg-zinc-50 border border-border rounded-2xl outline-none focus:border-primary transition-all" />
          <button className="w-full btn-primary py-4">LOGIN</button>
       </div>
       <p className="mt-8 text-sm text-muted-foreground">Don't have an account? <span className="text-primary font-bold cursor-pointer underline">Sign up</span></p>
    </div>
  </div>
);

const OffersPage = () => (
  <div className="container mx-auto px-4 py-24">
    <h1 className="text-5xl font-bold mb-12 tracking-tighter">Exclusive Offers</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       {[
         { title: 'BUY 1 GET 1 FREE', desc: 'On all frames above ₹1999', color: 'bg-zinc-900 text-white', code: 'B1G1' },
         { title: 'FLAT 500 OFF', desc: 'On your first pair of sunglasses', color: 'bg-accent text-black', code: 'SUN500' },
         { title: 'EYELENS GOLD', desc: 'Membership benefits starting at ₹600', color: 'bg-zinc-100 text-zinc-900', code: 'GOLD' },
         { title: 'STUDENT DISCOUNT', desc: 'Extra 10% off for verified students', color: 'bg-blue-600 text-white', code: 'STUDENT10' }
       ].map((offer, i) => (
         <div key={i} className={`p-12 rounded-[3rem] ${offer.color} relative overflow-hidden group cursor-pointer`}>
            <div className="relative z-10">
              <h2 className="text-4xl font-black mb-4">{offer.title}</h2>
              <p className="text-lg opacity-80 mb-8">{offer.desc}</p>
              <div className="inline-block px-6 py-3 border-2 border-current rounded-full font-bold">
                USE CODE: {offer.code}
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
         </div>
       ))}
    </div>
  </div>
);

const PrescriptionPage = () => (
  <div className="container mx-auto px-4 py-24 max-w-2xl text-center">
    <div className="w-20 h-20 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-8">
       <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
    </div>
    <h1 className="text-4xl font-bold mb-4">Prescription Upload</h1>
    <p className="text-muted-foreground mb-12">Submit your eyeglass prescription to get the perfect lenses tailored for you.</p>
    <div className="p-12 border-4 border-dashed border-border rounded-[3rem] bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer mb-12">
       <p className="font-bold text-lg mb-2">Drop your prescription here</p>
       <p className="text-sm text-zinc-400">PDF, JPG or PNG formats supported</p>
    </div>
    <button className="btn-primary px-12">OR ENTER LENS POWER MANUALLY</button>
  </div>
);

const StaticPage = ({ title }: { title: string }) => (
  <div className="container mx-auto px-4 py-24 text-center">
    <h1 className="text-5xl font-bold mb-8">{title}</h1>
    <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
      This is a placeholder for the {title.toLowerCase()} page. In a full production app, this would contain detailed information about {title.toLowerCase()} and other relevant content.
    </p>
  </div>
);

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="product/:id" element={<ProductDetailsPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="offers" element={<OffersPage />} />
        <Route path="prescription" element={<PrescriptionPage />} />
        <Route path="about" element={<StaticPage title="About Eyelens" />} />
        <Route path="contact" element={<StaticPage title="Contact Us" />} />
        <Route path="return-policy" element={<StaticPage title="Return Policy" />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  );
}

export default App;
