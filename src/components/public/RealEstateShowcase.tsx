import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { Property } from '../../types';
import { Bed, Bath, MapPin, Maximize2, Eye, Sparkles, X, CheckCircle2, PhoneCall, Building2, Home, Landmark } from 'lucide-react';

export const RealEstateShowcase: React.FC = () => {
  const { properties } = useApp();
  const [selectedType, setSelectedType] = useState<string>('All');
  const [activePropertyModal, setActivePropertyModal] = useState<Property | null>(null);

  const types = ['All', 'Villa', 'Penthouse', 'Apartment', 'Commercial Office'];

  const filtered = selectedType === 'All' ? properties : properties.filter(p => p.type === selectedType);

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(2)} Lakhs`;
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const getPropertyTypeIcon = (type: string) => {
    switch (type) {
      case 'Villa': return <Home className="w-12 h-12 text-[#D4AF37]" />;
      case 'Penthouse': return <Building2 className="w-12 h-12 text-[#2563EB]" />;
      case 'Commercial Office': return <Landmark className="w-12 h-12 text-emerald-400" />;
      default: return <Building2 className="w-12 h-12 text-[#D4AF37]" />;
    }
  };

  return (
    <section id="properties" className="py-20 bg-[#07152F] text-white relative border-b border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> HR Realty Premium Curated Assets
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
              Featured <span className="gradient-gold-text">Properties</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Verified high-value luxury villas, penthouses & gated apartments across prime coastal and urban growth corridors.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  selectedType === t
                    ? 'gradient-gold-bg text-[#07152F] shadow-lg shadow-amber-500/20'
                    : 'bg-[#0F1E3C] border border-slate-700 text-slate-300 hover:border-[#D4AF37]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Property Grid (Icon & Badge Cards, No External Photos) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((prop) => (
            <div
              key={prop.id}
              className="glass-card rounded-3xl overflow-hidden group flex flex-col justify-between border border-[#D4AF37]/30"
            >
              <div>
                {/* Sleek Gradient & Icon Header Card */}
                <div className="bg-gradient-to-br from-[#0B1E3D] via-[#07152F] to-[#0F1E3C] p-8 border-b border-slate-800 flex items-center justify-between relative overflow-hidden">
                  <div className="space-y-2 z-10">
                    <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/30">
                      {prop.type}
                    </span>
                    <div className="text-2xl font-extrabold text-white font-heading mt-2">
                      {formatPrice(prop.price)}
                    </div>
                  </div>

                  <div className="p-4 bg-[#07152F] rounded-2xl border border-slate-800 group-hover:scale-110 transition-transform shadow-xl">
                    {getPropertyTypeIcon(prop.type)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-300 text-xs mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>{prop.location}, {prop.city}</span>
                    </div>
                    <h3 className="text-xl font-bold font-heading text-white line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                      {prop.propertyName}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {prop.description}
                  </p>

                  {/* Specs Bar */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800 text-center text-xs">
                    <div className="flex items-center justify-center gap-1.5 text-slate-300">
                      <Bed className="w-4 h-4 text-[#D4AF37]" />
                      <span className="font-bold text-white">{prop.bedrooms} Beds</span>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 text-slate-300">
                      <Bath className="w-4 h-4 text-[#2563EB]" />
                      <span className="font-bold text-white">{prop.bathrooms} Baths</span>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 text-slate-300">
                      <Maximize2 className="w-4 h-4 text-emerald-400" />
                      <span className="font-bold text-white">{prop.areaSqFt} Sq.Ft</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setActivePropertyModal(prop)}
                  className="w-full btn-gold py-2.5 text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" /> View Details
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Property Details Modal */}
      {activePropertyModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#0F1E3C] border border-[#D4AF37]/40 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setActivePropertyModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/80 z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="bg-gradient-to-br from-[#0B1E3D] to-[#07152F] p-8 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/30">
                  {activePropertyModal.type}
                </span>
                <h3 className="text-3xl font-extrabold font-heading text-white">{formatPrice(activePropertyModal.price)}</h3>
              </div>
              <div className="p-4 bg-[#07152F] rounded-2xl border border-slate-800">
                {getPropertyTypeIcon(activePropertyModal.type)}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-1.5 text-slate-300 text-xs mb-1">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  <span>{activePropertyModal.location}, {activePropertyModal.city}</span>
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">{activePropertyModal.propertyName}</h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{activePropertyModal.description}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#07152F] border border-slate-800 text-center text-xs">
                <div>
                  <div className="text-slate-400 text-[10px] uppercase">Property Type</div>
                  <div className="font-bold text-white mt-0.5">{activePropertyModal.type}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px] uppercase">Bedrooms</div>
                  <div className="font-bold text-[#D4AF37] mt-0.5">{activePropertyModal.bedrooms} Bedrooms</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px] uppercase">Bathrooms</div>
                  <div className="font-bold text-[#2563EB] mt-0.5">{activePropertyModal.bathrooms} Bathrooms</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px] uppercase">Built-up Area</div>
                  <div className="font-bold text-emerald-400 mt-0.5">{activePropertyModal.areaSqFt} Sq.Ft</div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">Verified Legal Features</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>RERA Approved Layout & Registration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Clear Title & Encumbrance Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>GHMC Master Plan Layout Approval</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Pre-Approved Home Loans (HDFC/ICICI)</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    const text = `Hello HR Realty, I am interested in viewing details for: *${activePropertyModal.propertyName}* (${formatPrice(activePropertyModal.price)}) located in ${activePropertyModal.location}. Please contact me.`;
                    window.open(`https://wa.me/919884933079?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <PhoneCall className="w-4 h-4" /> Request Site Visit via WhatsApp
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
