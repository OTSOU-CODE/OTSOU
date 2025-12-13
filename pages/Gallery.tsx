import React from 'react';
import { GALLERY_DATA } from '../constants';
import { Link } from 'react-router-dom';

const Gallery: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-bg text-white pb-20 pt-10">
      {/* Header */}
      <div className="container mx-auto px-6 py-24 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/leather.png')] pointer-events-none"></div>
        
        <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4 block relative z-10">Showcase</span>
        <h1 className="text-5xl md:text-8xl font-serif font-bold mb-6 relative z-10 drop-shadow-2xl">Our Portfolio</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed relative z-10">
          Explore a curated selection of our finest automotive interior transformations. 
          Where precision meets passion.
        </p>
      </div>

      {/* Masonry-ish Grid */}
      <div className="container mx-auto px-6">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {GALLERY_DATA.map((item, idx) => (
            <Link 
              to={`/preview/${item.id}`} 
              key={item.id} 
              className="group block relative rounded-sm overflow-hidden break-inside-avoid shadow-2xl bg-dark-card hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all duration-300 border border-transparent hover:border-primary/30"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={item.src} 
                  alt={item.title} 
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${idx % 3 === 0 ? 'aspect-[3/4]' : 'aspect-square'}`}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-6 backdrop-blur-sm">
                    <span className="text-primary text-sm font-bold uppercase tracking-widest mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">View Project</span>
                    <h3 className="text-3xl font-serif font-bold text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{item.title}</h3>
                </div>
              </div>
              
              <div className="p-5 bg-dark-surface border-t border-white/5 flex justify-between items-center">
                 <h4 className="font-bold text-gray-200 font-display tracking-wide">{item.title}</h4>
                 <div className="w-8 h-8 rounded-full flex items-center justify-center border border-white/20 group-hover:border-primary group-hover:text-primary transition-colors">
                    <i className="fas fa-arrow-right -rotate-45 group-hover:rotate-0 transition-transform duration-300"></i>
                 </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;