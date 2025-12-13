import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Vehicles', path: '/category' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Services', path: '/#services' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled || isMobileMenuOpen
          ? 'glass-nav py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex justify-between items-center relative z-[101]">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative w-12 h-12 transition-transform duration-500 group-hover:rotate-180">
               <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#D4AF37" strokeWidth="1.5" fill="rgba(212, 175, 55, 0.1)"/>
                <path d="M2 17L12 22L22 17" stroke="#D4AF37" strokeWidth="1.5"/>
                <path d="M2 12L12 17L22 12" stroke="#D4AF37" strokeWidth="1.5"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-display font-bold text-white tracking-widest leading-none">SHERIF</h1>
              <span className="text-xs text-primary font-medium tracking-[0.3em] uppercase">Siege Auto</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-bold uppercase tracking-widest transition-all duration-300 relative group ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''}`}></span>
              </Link>
            ))}
            
            <a 
              href="#contact"
              className="px-6 py-3 bg-primary hover:bg-white hover:text-black text-black font-bold uppercase tracking-wider text-xs transition-all duration-300 clip-path-slant shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
            >
              Get Quote
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <a 
              href="#contact"
              className="px-4 py-2 bg-primary text-black font-bold uppercase tracking-wider text-[10px]"
            >
              Quote
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none w-10 h-10 flex items-center justify-center relative z-50"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl transition-all duration-300`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-0 left-0 w-full min-h-screen bg-black/95 backdrop-blur-xl transition-all duration-500 ease-in-out z-[90] flex items-center justify-center ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="px-6 py-8 space-y-8 flex flex-col items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-2xl font-display font-bold text-white hover:text-primary tracking-widest transition-colors transform hover:scale-110 duration-300"
            >
              {link.name}
            </Link>
          ))}
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-lg font-bold text-primary uppercase tracking-widest border border-primary px-8 py-3 mt-4 hover:bg-primary hover:text-black transition-all"
          >
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;