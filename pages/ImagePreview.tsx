import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GALLERY_DATA } from '../constants';

const ImagePreview: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = GALLERY_DATA.find(p => p.id === Number(id));

  const [activeVariant, setActiveVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Standard');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <button onClick={() => navigate('/gallery')} className="px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-black transition-all">Back to Gallery</button>
        </div>
      </div>
    );
  }

  const variants = product.variants && product.variants.length > 0 ? product.variants : [{ src: product.src, title: 'Main' }];

  return (
    <div className="min-h-screen bg-dark-bg text-white pb-24 pt-[100px]">
      <div className="container mx-auto px-6 py-8 grid md:grid-cols-2 gap-16">
        {/* Gallery Section */}
        <div className="space-y-6">
          <div className="aspect-[4/3] rounded-sm overflow-hidden bg-dark-card relative shadow-2xl border border-white/5 group">
             <img 
               src={variants[activeVariant].src} 
               alt={product.title} 
               className="w-full h-full object-cover animate-zoom-in" 
             />
             <div className="absolute top-4 right-4 bg-black/70 backdrop-blur px-4 py-2 text-white text-xs font-bold uppercase tracking-widest border border-white/10">
               {activeVariant + 1} / {variants.length}
             </div>
          </div>
          
          {/* Thumbnails */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {variants.map((v, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveVariant(idx)}
                className={`flex-shrink-0 w-24 h-24 overflow-hidden border transition-all duration-300 ${activeVariant === idx ? 'border-primary opacity-100' : 'border-transparent opacity-50 hover:opacity-80'}`}
              >
                <img src={v.src} alt={v.title} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="space-y-10 flex flex-col justify-center">
           <div>
             <div className="flex justify-between items-start mb-4">
               <span className="text-primary font-bold text-xs uppercase tracking-[0.2em]">Sherif Siege Collection</span>
               <div className="flex items-center gap-1 text-primary text-sm">
                 <i className="fas fa-star"></i>
                 <i className="fas fa-star"></i>
                 <i className="fas fa-star"></i>
                 <i className="fas fa-star"></i>
                 <i className="fas fa-star"></i>
               </div>
             </div>
             <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">{product.title}</h1>
             <p className="text-3xl font-display font-bold text-white">Price Upon Request</p>
           </div>

           <div className="border-t border-b border-white/10 py-8">
             <p className="text-gray-400 leading-relaxed text-lg">{product.description}</p>
           </div>

           {/* Configuration */}
           <div className="space-y-4">
             <h3 className="font-bold text-white uppercase tracking-wider text-sm">Finishing Options</h3>
             <div className="flex flex-wrap gap-4">
               {['Standard', 'Premium Leather', 'Diamond Stitch', 'Perforated'].map((opt) => (
                 <button 
                   key={opt}
                   onClick={() => setSelectedSize(opt)}
                   className={`px-6 py-3 border transition-all duration-300 text-sm font-bold uppercase tracking-wider ${selectedSize === opt ? 'bg-white text-black border-white' : 'border-white/20 text-gray-400 hover:border-primary hover:text-primary'}`}
                 >
                   {opt}
                 </button>
               ))}
             </div>
           </div>

           {/* Color Variant Visual */}
           <div className="space-y-4">
             <h3 className="font-bold text-white uppercase tracking-wider text-sm">Primary Tone</h3>
             <div className="w-16 h-16 rounded-full ring-2 ring-offset-4 ring-offset-dark-bg ring-primary" style={{ background: product.colorCode }}></div>
           </div>

           {/* Desktop Action */}
           <div className="hidden md:flex gap-6 pt-6">
              <a href="#contact" className="flex-grow py-5 px-8 bg-primary hover:bg-white text-black font-bold uppercase tracking-widest text-center transition-all duration-300">
                Request Custom Quote
              </a>
           </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-dark-surface border-t border-white/10 md:hidden z-40">
         <a href="#contact" className="block w-full py-4 bg-primary text-black font-bold uppercase tracking-widest text-center">
            Request Quote
         </a>
      </div>
    </div>
  );
};

export default ImagePreview;