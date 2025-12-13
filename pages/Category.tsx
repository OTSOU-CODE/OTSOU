import React, { useState, useMemo } from 'react';
import { VEHICLE_DATA, BRAND_ICONS } from '../constants';
import { Link } from 'react-router-dom';

const Category: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const brands = useMemo(() => Array.from(new Set(VEHICLE_DATA.map(v => v.brand))).sort(), []);
  const years = useMemo(() => Array.from(new Set(VEHICLE_DATA.map(v => v.year))).sort((a, b) => Number(b) - Number(a)), []);

  const filteredVehicles = useMemo(() => {
    return VEHICLE_DATA.filter(vehicle => {
      const matchesSearch = 
        vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) || 
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = selectedBrand ? vehicle.brand === selectedBrand : true;
      const matchesYear = selectedYear ? vehicle.year === selectedYear : true;
      return matchesSearch && matchesBrand && matchesYear;
    });
  }, [searchTerm, selectedBrand, selectedYear]);

  return (
    <div className="min-h-screen bg-dark-bg text-white pb-20 pt-[80px]">
      {/* Header */}
      <div className="bg-dark-surface border-b border-white/5 py-24 px-4 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
        <div className="container mx-auto text-center relative z-10 animate-fade-up">
           <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Our Capabilities</span>
           <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">Vehicle Catalog</h1>
           <p className="text-gray-400 text-xl max-w-2xl mx-auto">Browse our supported models. We provide custom fitting for thousands of vehicles, ensuring a factory-level finish.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-6 sticky top-[90px] z-30 mb-16">
        <div className="bg-dark-card/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/10 flex flex-col md:flex-row gap-6 items-center justify-between reveal active transition-all duration-300 ring-1 ring-white/5">
           <div className="relative w-full md:w-1/3 group">
             <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-primary transition-colors"></i>
             <input 
               type="text" 
               placeholder="Search model..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-12 pr-4 py-3 bg-dark-bg border border-white/10 rounded-xl focus:outline-none focus:border-primary text-white transition-all placeholder-gray-600 focus:ring-1 focus:ring-primary/50"
             />
           </div>
           
           <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
             <select 
               value={selectedBrand} 
               onChange={(e) => setSelectedBrand(e.target.value)}
               className="px-6 py-3 bg-dark-bg border border-white/10 rounded-xl focus:outline-none focus:border-primary text-white cursor-pointer hover:border-white/30 transition-all appearance-none"
             >
               <option value="">All Brands</option>
               {brands.map(b => <option key={b} value={b}>{b}</option>)}
             </select>

             <select 
               value={selectedYear} 
               onChange={(e) => setSelectedYear(e.target.value)}
               className="px-6 py-3 bg-dark-bg border border-white/10 rounded-xl focus:outline-none focus:border-primary text-white cursor-pointer hover:border-white/30 transition-all appearance-none"
             >
               <option value="">All Years</option>
               {years.map(y => <option key={y} value={y}>{y}</option>)}
             </select>
           </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-6">
        {filteredVehicles.length === 0 ? (
          <div className="text-center py-20 opacity-50 border border-white/5 rounded-2xl bg-dark-card animate-fade-up">
             <i className="fas fa-search text-6xl mb-6 text-gray-700"></i>
             <h3 className="text-2xl font-bold text-white">No vehicles found</h3>
             <p className="text-gray-500 mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVehicles.map((vehicle, index) => (
              <div 
                key={vehicle.id} 
                className="group relative bg-white/[0.03] backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_10px_40px_-10px_rgba(212,175,55,0.2)] reveal hover:-translate-y-2 hover:bg-white/[0.06]"
                style={{ transitionDelay: `${(index % 8) * 50}ms` }}
              >
                 <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                 <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-xl text-primary group-hover:bg-primary group-hover:text-black transition-all duration-300 shadow-inner">
                      <i className={`fas ${BRAND_ICONS[vehicle.brand.toLowerCase()] || 'fa-car'}`}></i>
                    </div>
                    <span className="px-3 py-1 bg-white/5 text-gray-400 text-[10px] font-bold rounded-full border border-white/10 uppercase tracking-wider group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                      {vehicle.year}
                    </span>
                 </div>
                 
                 <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{vehicle.model}</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-6 pb-4 border-b border-white/5 group-hover:border-white/20 transition-colors">{vehicle.brand}</p>
                 </div>
                 
                 <Link to="/#contact" className="relative z-10 w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-black/40 text-center text-xs font-bold text-gray-300 group-hover:bg-primary group-hover:text-black transition-all uppercase tracking-widest overflow-hidden hover:shadow-lg">
                   Request Quote
                 </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;