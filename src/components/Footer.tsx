import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-50 border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <Link to="/" className="text-2xl font-bold tracking-tighter text-primary mb-6 block">
              EYELENS
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              Premium eyewear for every vision. We combine style, comfort, and advanced technology to bring you the best in eye care.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white rounded-full border border-border hover:text-accent transition-colors shadow-sm">
                <Globe size={18} />
              </a>
              <a href="#" className="p-2 bg-white rounded-full border border-border hover:text-accent transition-colors shadow-sm">
                <Globe size={18} />
              </a>
              <a href="#" className="p-2 bg-white rounded-full border border-border hover:text-accent transition-colors shadow-sm">
                <Globe size={18} />
              </a>
              <a href="#" className="p-2 bg-white rounded-full border border-border hover:text-accent transition-colors shadow-sm">
                <Globe size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-wider">Shopping</h4>
            <ul className="space-y-4">
              <li><Link to="/shop" className="text-muted-foreground text-sm hover:text-primary transition-colors">Men Eyewear</Link></li>
              <li><Link to="/shop" className="text-muted-foreground text-sm hover:text-primary transition-colors">Women Eyewear</Link></li>
              <li><Link to="/shop" className="text-muted-foreground text-sm hover:text-primary transition-colors">Kids Eyewear</Link></li>
              <li><Link to="/shop?category=Sunglasses" className="text-muted-foreground text-sm hover:text-primary transition-colors">Sunglasses</Link></li>
              <li><Link to="/offers" className="text-muted-foreground text-sm hover:text-primary transition-colors">Current Offers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-wider">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/contact" className="text-muted-foreground text-sm hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/about" className="text-muted-foreground text-sm hover:text-primary transition-colors">About Eyelens</Link></li>
              <li><Link to="/return-policy" className="text-muted-foreground text-sm hover:text-primary transition-colors">Return Policy</Link></li>
              <li><Link to="/eye-test" className="text-muted-foreground text-sm hover:text-primary transition-colors">Book Eye Test</Link></li>
              <li><Link to="/prescription" className="text-muted-foreground text-sm hover:text-primary transition-colors">Upload Prescription</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-wider">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start text-sm text-muted-foreground">
                <MapPin size={18} className="mr-3 text-primary shrink-0" />
                <span>123 Vision Avenue, Eye Park, New Delhi, 110001</span>
              </li>
              <li className="flex items-center text-sm text-muted-foreground">
                <Phone size={18} className="mr-3 text-primary shrink-0" />
                <span>+91 1800-123-4567</span>
              </li>
              <li className="flex items-center text-sm text-muted-foreground">
                <Mail size={18} className="mr-3 text-primary shrink-0" />
                <span>support@eyelens.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center bg-zinc-50">
          <p className="text-xs text-muted-foreground mb-4 md:mb-0">
            © 2026 Eyelens Eyewear Pvt Ltd. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-primary">Terms of Service</Link>
            <Link to="/shipping" className="text-xs text-muted-foreground hover:text-primary">Shipping Info</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
