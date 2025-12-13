import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-bg text-white py-24 px-4 pt-[120px]">
      <div className="max-w-3xl mx-auto bg-dark-card rounded-3xl shadow-2xl p-8 md:p-16 border border-white/5 animate-fade-up">
        <Link to="/" className="inline-flex items-center gap-2 text-primary font-bold mb-10 hover:translate-x-[-5px] transition-transform">
          <i className="fas fa-arrow-left"></i> Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Privacy Policy</h1>
        <p className="text-gray-500 mb-12 italic border-l-2 border-primary pl-4">Last updated: October 21, 2025</p>

        <div className="space-y-12 text-gray-400 leading-relaxed text-lg">
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 font-display uppercase tracking-widest">1. Information We Collect</h2>
            <p>SHERIF-SIEGE-AUTO collects information you provide directly to us, such as when you contact us through our website form, call our workshop, or communicate via WhatsApp.</p>
          </section>

          <section>
             <h2 className="text-2xl font-bold text-primary mb-4 font-display uppercase tracking-widest">2. How We Use Information</h2>
             <ul className="list-none space-y-3">
               <li className="flex items-center gap-3"><i className="fas fa-check text-primary text-xs"></i> Provide our auto upholstery services.</li>
               <li className="flex items-center gap-3"><i className="fas fa-check text-primary text-xs"></i> Respond to your inquiries and quotes.</li>
               <li className="flex items-center gap-3"><i className="fas fa-check text-primary text-xs"></i> Improve our customer service.</li>
             </ul>
          </section>

          <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
            <h3 className="font-bold text-white mb-2 text-xl">Contact Us</h3>
            <p>If you have any questions about this Privacy Policy, please contact us at <span className="text-primary font-bold">+212 715637340</span>.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;