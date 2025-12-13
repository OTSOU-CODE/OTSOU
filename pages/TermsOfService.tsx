import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-bg text-white py-24 px-4 pt-[120px]">
      <div className="max-w-3xl mx-auto bg-dark-card rounded-3xl shadow-2xl p-8 md:p-16 border border-white/5 animate-fade-up">
        <Link to="/" className="inline-flex items-center gap-2 text-primary font-bold mb-10 hover:translate-x-[-5px] transition-transform">
          <i className="fas fa-arrow-left"></i> Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Terms of Service</h1>
        <p className="text-gray-500 mb-12 italic border-l-2 border-primary pl-4">Last updated: October 21, 2025</p>

        <div className="space-y-12 text-gray-400 leading-relaxed text-lg">
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 font-display uppercase tracking-widest">1. Service Agreement</h2>
            <p>By engaging SHERIF-SIEGE-AUTO for auto upholstery services, you agree to these terms. Services include seat restoration, custom upholstery, and interior repairs.</p>
          </section>

          <section>
             <h2 className="text-2xl font-bold text-primary mb-4 font-display uppercase tracking-widest">2. Warranty</h2>
             <p>We provide a 1-year warranty on craftsmanship. Normal wear and tear is not covered.</p>
          </section>

          <section>
             <h2 className="text-2xl font-bold text-primary mb-4 font-display uppercase tracking-widest">3. Payments</h2>
             <p>Payment is due upon completion of services. We accept cash and bank transfers.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;