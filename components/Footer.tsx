import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] text-white pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Column */}
          <div className="space-y-8">
            <div className="flex flex-col">
              <h3 className="text-3xl font-display font-bold text-white tracking-widest leading-none">SHERIF</h3>
              <span className="text-xs text-primary font-medium tracking-[0.5em] uppercase">Siege Auto</span>
            </div>
            <p className="text-gray-500 leading-relaxed max-w-sm">
              We define the standard for automotive interior luxury in Morocco. 
              Meticulous craftsmanship for the discerning driver.
            </p>
            <div className="flex gap-4">
               {['facebook-f', 'instagram', 'whatsapp', 'youtube'].map(icon => (
                 <a key={icon} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-black hover:border-primary transition-all duration-300">
                   <i className={`fab fa-${icon}`}></i>
                 </a>
               ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-8 uppercase tracking-widest border-b border-white/10 pb-4 inline-block">Explore</h4>
            <ul className="space-y-4">
              {[
                { label: 'Home', path: '/' },
                { label: 'Gallery', path: '/gallery' },
                { label: 'Vehicle Catalog', path: '/category' },
                { label: 'Services', path: '/#services' },
                { label: 'Contact', path: '/#contact' },
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.path} className="text-gray-500 hover:text-primary transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-4 h-[1px] bg-primary transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold text-white mb-8 uppercase tracking-widest border-b border-white/10 pb-4 inline-block">Expertise</h4>
            <ul className="space-y-4 text-gray-500">
              <li className="hover:text-white transition-colors cursor-pointer">Leather Restoration</li>
              <li className="hover:text-white transition-colors cursor-pointer">Custom Embroidery</li>
              <li className="hover:text-white transition-colors cursor-pointer">Dashboard Repair</li>
              <li className="hover:text-white transition-colors cursor-pointer">Headliner Replacement</li>
              <li className="hover:text-white transition-colors cursor-pointer">Marine Upholstery</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-8 uppercase tracking-widest border-b border-white/10 pb-4 inline-block">Visit Us</h4>
            <div className="space-y-6">
              <div>
                <span className="text-xs text-primary font-bold uppercase tracking-wider block mb-1">Address</span>
                <p className="text-gray-400">Ait Iazza, Taroudant<br/>Morocco, 83000</p>
              </div>
              <div>
                <span className="text-xs text-primary font-bold uppercase tracking-wider block mb-1">Contact</span>
                <p className="text-gray-400 text-xl font-display font-bold">+212 715637340</p>
                <p className="text-gray-500 text-sm mt-1">contact@sherif-siege.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            &copy; 2025 SHERIF-SIEGE-AUTO. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-sm text-gray-600">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;