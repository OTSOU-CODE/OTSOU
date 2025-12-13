import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const LOGOS = [
  { name: 'Mercedes', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/1200px-Mercedes-Logo.svg.png' },
  { name: 'Audi', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/1200px-Audi-Logo_2016.svg.png' },
  { name: 'BMW', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/1200px-BMW.svg.png' },
  { name: 'Porsche', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/20230206124559%21Porsche_Wappen.svg/1200px-20230206124559%21Porsche_Wappen.svg.png' },
  { name: 'Ferrari', url: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/Ferrari-Logo.svg/800px-Ferrari-Logo.svg.png' },
  { name: 'Lamborghini', url: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Lamborghini_Logo.svg/800px-Lamborghini_Logo.svg.png' },
  { name: 'Bentley', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Bentley_logo_black.svg/1200px-Bentley_logo_black.svg.png' },
  { name: 'Land Rover', url: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Land_Rover_logo_black.svg/1200px-Land_Rover_logo_black.svg.png' },
  { name: 'Toyota', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/1200px-Toyota_carlogo.svg.png' },
  { name: 'Honda', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Honda_Logo.svg/1200px-Honda_Logo.svg.png' },
  { name: 'Ford', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/1200px-Ford_logo_flat.svg.png' },
  { name: 'Volkswagen', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/1200px-Volkswagen_logo_2019.svg.png' },
  { name: 'Jeep', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Jeep_logo.svg/1200px-Jeep_logo.svg.png' },
  { name: 'Tesla', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tesla_T_symbol.svg/1200px-Tesla_T_symbol.svg.png' },
  { name: 'Maserati', url: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/Maserati_trident_logo.svg/1200px-Maserati_trident_logo.svg.png' },
  { name: 'Peugeot', url: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/Peugeot_2021_Logo.svg/1200px-Peugeot_2021_Logo.svg.png' },
];

const Home: React.FC = () => {
  const contactFormRef = useRef<HTMLFormElement>(null);
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [hash]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! We will contact you shortly.");
    if (contactFormRef.current) contactFormRef.current.reset();
  };

  return (
    <div className="overflow-x-hidden bg-dark-bg text-white">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
        {/* Background Image with Slow Zoom Animation */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1920" 
            alt="Luxury Interior" 
            className="w-full h-full object-cover animate-slow-zoom opacity-40"
          />
          {/* Gradients to merge image with dark background */}
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent"></div>
          
          {/* Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-20">
          <div className="max-w-6xl space-y-8 animate-fade-up">
            <div className="flex items-center gap-4 reveal active">
               <span className="h-[2px] w-16 bg-primary shadow-[0_0_10px_#D4AF37]"></span>
               <span className="text-primary font-bold tracking-[0.4em] uppercase text-sm drop-shadow-lg">Est. 2015</span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-bold leading-none tracking-tight drop-shadow-2xl">
              <span className="block text-white">Redefining</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#FDF5E6] to-primary animate-gradient-x drop-shadow-sm filter brightness-110 pb-4">Automotive</span>
              <span className="block text-white/90">Excellence</span>
            </h1>
            
            <p className="text-gray-300 text-lg md:text-2xl font-light max-w-xl leading-relaxed border-l-4 border-primary/30 pl-6 reveal active delay-200 backdrop-blur-sm">
              Premium upholstery restoration and customization. 
              Where <span className="text-white font-medium">unparalleled comfort</span> meets <span className="text-white font-medium">bespoke design</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 pt-8 reveal active delay-500">
              <a href="#contact" className="group relative px-10 py-5 bg-primary text-black font-display font-bold text-lg uppercase tracking-wider overflow-hidden hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                <span className="absolute inset-0 w-full h-full bg-white transform -translate-x-full transition-transform duration-300 group-hover:translate-x-0"></span>
                <span className="relative z-10 transition-colors duration-300">Get Your Quote</span>
              </a>
              <Link to="/gallery" className="group px-10 py-5 border border-white/20 text-white font-display font-bold text-lg uppercase tracking-wider hover:border-primary hover:bg-white/5 transition-all duration-300 flex items-center gap-2">
                View Portfolio
                <i className="fas fa-arrow-right transform -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-primary"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-70 cursor-pointer" onClick={() => document.getElementById('stats')?.scrollIntoView({behavior: 'smooth'})}>
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-primary to-transparent mx-auto"></div>
          <p className="text-[10px] uppercase tracking-widest text-primary mt-2">Scroll</p>
        </div>
      </section>

      {/* Stats / Trust Strip */}
      <div id="stats" className="bg-dark-surface border-y border-white/5 py-16 relative z-20 shadow-2xl">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { num: '10+', label: 'Years Experience' },
            { num: '1k+', label: 'Cars Restored' },
            { num: '100%', label: 'Satisfaction' },
            { num: '3-7', label: 'Day Turnaround' },
          ].map((stat, idx) => (
            <div key={idx} className="text-center group reveal" style={{ transitionDelay: `${idx * 100}ms` }}>
              <h3 className="text-5xl md:text-6xl font-display font-bold text-white/20 group-hover:text-primary group-hover:scale-110 transition-all duration-500">{stat.num}</h3>
              <p className="text-primary font-bold uppercase tracking-widest mt-2 text-xs md:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Trusted Brands (Logo Loop) - FIXED */}
      <section className="py-20 bg-dark-surface relative overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute top-0 left-0 w-20 md:w-60 h-full bg-gradient-to-r from-dark-surface to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-20 md:w-60 h-full bg-gradient-to-l from-dark-surface to-transparent z-10"></div>
        
        <div className="container mx-auto px-6 mb-16 text-center relative z-20">
          <p className="text-primary font-bold uppercase tracking-[0.4em] text-xs mb-2">Compatiblity</p>
          <h2 className="text-3xl font-serif text-white">Trusted By Owners Of</h2>
        </div>
        
        {/* Seamless Loop Container - Fixed Structure */}
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-scroll hover:pause">
                 {/* Set 1 */}
                 {LOGOS.map((logo, idx) => (
                    <li key={idx} className="w-40 h-24 flex items-center justify-center flex-shrink-0 group cursor-pointer transition-all duration-300">
                      <img 
                        src={logo.url} 
                        alt={logo.name} 
                        className="max-w-[120px] max-h-[70px] object-contain brightness-0 invert opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]" 
                      />
                    </li>
                  ))}
                 {/* Set 2 (Duplicate) */}
                 {LOGOS.map((logo, idx) => (
                    <li key={`dup-${idx}`} className="w-40 h-24 flex items-center justify-center flex-shrink-0 group cursor-pointer transition-all duration-300">
                      <img 
                        src={logo.url} 
                        alt={logo.name} 
                        className="max-w-[120px] max-h-[70px] object-contain brightness-0 invert opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]" 
                      />
                    </li>
                  ))}
            </ul>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-dark-bg relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 reveal">
            <div>
               <h2 className="text-primary font-display font-bold tracking-widest uppercase mb-4 flex items-center gap-3">
                 <span className="w-8 h-[1px] bg-primary"></span> Our Expertise
               </h2>
               <h3 className="text-4xl md:text-6xl font-serif font-bold text-white">Masterful Craftsmanship</h3>
            </div>
            <p className="text-gray-400 max-w-md text-justify text-lg leading-relaxed border-l border-white/10 pl-6">
              Every stitch counts. We combine traditional techniques with modern materials to deliver interiors that are as durable as they are beautiful.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Service Card 1 */}
             <div className="group relative h-[500px] overflow-hidden rounded-sm reveal hover-card-glow border border-white/5">
                <img src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600" alt="Restoration" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 p-10 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
                   <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center mb-6 text-primary bg-black/40 backdrop-blur-md group-hover:bg-primary group-hover:text-black transition-colors duration-300 shadow-lg">
                     <i className="fas fa-wrench text-xl"></i>
                   </div>
                   <h4 className="text-3xl font-display font-bold text-white mb-4">Seat Restoration</h4>
                   <p className="text-gray-300 text-lg opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-100">
                     Complete rebuilding of foam, springs, and leather for factory-fresh comfort.
                   </p>
                </div>
             </div>

             {/* Service Card 2 */}
             <div className="group relative h-[500px] overflow-hidden rounded-sm reveal hover-card-glow border border-white/5" style={{ transitionDelay: '200ms' }}>
                <img src="https://images.unsplash.com/photo-1563720360172-67b8f3dce741?q=80&w=800" alt="Custom" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 p-10 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
                    <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center mb-6 text-primary bg-black/40 backdrop-blur-md group-hover:bg-primary group-hover:text-black transition-colors duration-300 shadow-lg">
                     <i className="fas fa-palette text-xl"></i>
                   </div>
                   <h4 className="text-3xl font-display font-bold text-white mb-4">Custom Upholstery</h4>
                   <p className="text-gray-300 text-lg opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-100">
                     Bespoke designs, two-tone leather, and diamond stitching to match your style.
                   </p>
                </div>
             </div>

             {/* Service Card 3 */}
             <div className="group relative h-[500px] overflow-hidden rounded-sm reveal hover-card-glow border border-white/5" style={{ transitionDelay: '400ms' }}>
                <img src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=600" alt="Bike" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 p-10 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
                   <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center mb-6 text-primary bg-black/40 backdrop-blur-md group-hover:bg-primary group-hover:text-black transition-colors duration-300 shadow-lg">
                     <i className="fas fa-motorcycle text-xl"></i>
                   </div>
                   <h4 className="text-3xl font-display font-bold text-white mb-4">Moto & Marine</h4>
                   <p className="text-gray-300 text-lg opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-100">
                     Weather-resistant materials for motorcycles, boats, and open-top vehicles.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-dark-card relative overflow-hidden">
         {/* Decorative big text */}
         <div className="absolute -top-20 -right-20 text-[30rem] font-display font-bold text-white/[0.02] leading-none pointer-events-none select-none animate-pulse">
            01
         </div>

         <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-xl mb-20 reveal">
              <h2 className="text-primary font-display font-bold tracking-widest uppercase mb-4 flex items-center gap-3">
                 <span className="w-8 h-[1px] bg-primary"></span> The Process
              </h2>
              <h3 className="text-4xl md:text-5xl font-serif font-bold text-white">Seamless Transformation</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
               {/* Connecting Line (Desktop) */}
               <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-[1px] bg-white/10 z-0"></div>

               <div className="space-y-6 relative z-10 reveal group hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-16 h-16 border border-primary bg-dark-surface rounded-full flex items-center justify-center text-primary text-2xl font-bold shadow-[0_0_20px_rgba(212,175,55,0.1)] group-hover:bg-primary group-hover:text-black transition-all duration-500 z-10 relative">1</div>
                  <h4 className="text-2xl font-bold text-white">Consultation</h4>
                  <p className="text-gray-400 leading-relaxed text-lg">We discuss your vision, select materials from our premium swatches, and provide a transparent quote.</p>
               </div>
               <div className="space-y-6 relative z-10 reveal group hover:-translate-y-2 transition-transform duration-300" style={{ transitionDelay: '200ms' }}>
                  <div className="w-16 h-16 bg-dark-bg border border-white/10 rounded-full flex items-center justify-center text-white text-2xl font-bold group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.05)] z-10 relative">2</div>
                  <h4 className="text-2xl font-bold text-white">Crafting</h4>
                  <p className="text-gray-400 leading-relaxed text-lg">Our master upholsterers strip the old interior, repair the foundation, and stitch the new design with precision.</p>
               </div>
               <div className="space-y-6 relative z-10 reveal group hover:-translate-y-2 transition-transform duration-300" style={{ transitionDelay: '400ms' }}>
                  <div className="w-16 h-16 bg-dark-bg border border-white/10 rounded-full flex items-center justify-center text-white text-2xl font-bold group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.05)] z-10 relative">3</div>
                  <h4 className="text-2xl font-bold text-white">Installation</h4>
                  <p className="text-gray-400 leading-relaxed text-lg">We professionally install the new components, perform a final quality check, and hand back your transformed vehicle.</p>
               </div>
            </div>
         </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-dark-bg relative">
        <div className="container mx-auto px-6">
          <div className="bg-dark-card rounded-3xl p-8 md:p-16 border border-white/5 flex flex-col lg:flex-row gap-20 relative overflow-hidden reveal shadow-2xl">
             {/* Glow effect */}
             <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none animate-pulse-glow"></div>

             <div className="lg:w-1/2 space-y-10 relative z-10">
               <div>
                 <h2 className="text-primary font-display font-bold tracking-widest uppercase mb-4">Contact Us</h2>
                 <h3 className="text-5xl md:text-7xl font-serif font-bold text-white leading-none">Let's Talk <br/><span className="text-gray-500">Interiors.</span></h3>
               </div>
               <p className="text-gray-400 text-xl leading-relaxed">
                 Visit our workshop or send us a message to get a quote. We usually reply within 24 hours.
               </p>
               
               <div className="space-y-8 pt-6">
                 <div className="flex items-center gap-8 group">
                   <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-primary text-2xl group-hover:bg-primary group-hover:text-black transition-all duration-300"><i className="fas fa-phone"></i></div>
                   <div>
                     <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Phone</p>
                     <p className="text-2xl font-bold text-white group-hover:text-primary transition-colors">+212 715637340</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-8 group">
                   <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-primary text-2xl group-hover:bg-primary group-hover:text-black transition-all duration-300"><i className="fas fa-map-marker-alt"></i></div>
                   <div>
                     <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Location</p>
                     <p className="text-2xl font-bold text-white group-hover:text-primary transition-colors">Ait Iazza, Taroudant, Morocco</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-8 group">
                   <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-primary text-2xl group-hover:bg-primary group-hover:text-black transition-all duration-300"><i className="fas fa-clock"></i></div>
                   <div>
                     <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Working Hours</p>
                     <p className="text-2xl font-bold text-white group-hover:text-primary transition-colors">Sat - Thu : 09:00 AM - 6:00 PM</p>
                   </div>
                 </div>
               </div>
             </div>

             <div className="lg:w-1/2 bg-white/[0.02] p-8 md:p-10 rounded-2xl backdrop-blur-md border border-white/10 shadow-inner relative z-10">
                <form ref={contactFormRef} onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2 group">
                       <label className="text-xs text-primary font-bold uppercase tracking-widest ml-1">Name</label>
                       <input required type="text" className="w-full bg-dark-bg border border-white/10 rounded-lg px-5 py-4 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all group-hover:border-white/30 placeholder-gray-600" placeholder="John Doe" />
                     </div>
                     <div className="space-y-2 group">
                       <label className="text-xs text-primary font-bold uppercase tracking-widest ml-1">Phone</label>
                       <input required type="tel" className="w-full bg-dark-bg border border-white/10 rounded-lg px-5 py-4 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all group-hover:border-white/30 placeholder-gray-600" placeholder="+212 ..." />
                     </div>
                  </div>
                  <div className="space-y-2 group">
                     <label className="text-xs text-primary font-bold uppercase tracking-widest ml-1">Vehicle Model</label>
                     <input required type="text" placeholder="e.g. BMW X5 2021" className="w-full bg-dark-bg border border-white/10 rounded-lg px-5 py-4 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all group-hover:border-white/30 placeholder-gray-600" />
                  </div>
                  <div className="space-y-2 group">
                     <label className="text-xs text-primary font-bold uppercase tracking-widest ml-1">Message</label>
                     <textarea required rows={5} className="w-full bg-dark-bg border border-white/10 rounded-lg px-5 py-4 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all group-hover:border-white/30 placeholder-gray-600 resize-none" placeholder="Tell us about your project..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-primary text-black font-display font-bold text-xl uppercase tracking-widest py-5 rounded-lg hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transform hover:-translate-y-1">
                    Send Request
                  </button>
                </form>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;