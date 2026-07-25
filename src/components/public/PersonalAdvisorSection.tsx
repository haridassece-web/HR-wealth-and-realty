import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Award, ShieldCheck, CheckCircle2, Calendar, MessageCircle, Globe, UserCheck, Star } from 'lucide-react';

export const PersonalAdvisorSection: React.FC = () => {
  const { t } = useLanguage();

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hello ${t('advisorName')}, I would like to schedule a personal wealth advisory call for Ageas Federal Insurance and Real Estate.`);
    window.open(`https://wa.me/919884933079?text=${text}`, '_blank');
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="advisor" className="py-20 bg-[#07152F] text-white relative border-b border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#0F1E3C] border border-[#D4AF37]/35 rounded-3xl p-8 sm:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Advisor Monogram Card & Accreditation */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-gradient-to-br from-[#07152F] via-[#0B1E3D] to-[#07152F] border-2 border-[#D4AF37]/40 rounded-3xl p-8 text-center space-y-6 shadow-2xl relative">
              
              {/* Monogram Badge */}
              <div className="w-24 h-24 mx-auto rounded-3xl gradient-gold-bg text-[#07152F] font-black text-4xl flex items-center justify-center shadow-xl shadow-amber-500/30">
                HR
              </div>

              <div>
                <h4 className="font-extrabold text-white text-2xl font-heading">{t('advisorName')}</h4>
                <p className="text-sm text-[#D4AF37] font-bold mt-1">{t('advisorRole')}</p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold mt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" /> Ageas Federal Life Insurance
                </div>
                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  {t('advisorBio')}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-center gap-2 text-xs text-slate-300">
                <Globe className="w-4 h-4 text-[#2563EB]" /> Languages: <span className="text-white font-bold">English, Tamil, Hindi, Telugu</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3.5 bg-[#07152F] rounded-2xl border border-amber-400/30">
                <div className="text-sm font-extrabold text-amber-400 font-heading">10+ Years</div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">{t('statExperience')}</div>
              </div>
              <div className="p-3.5 bg-[#07152F] rounded-2xl border border-blue-500/30">
                <div className="text-sm font-extrabold text-[#2563EB] font-heading">500+</div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">{t('statClients')}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Credibility & Personal Biography */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                <UserCheck className="w-4 h-4 text-[#D4AF37]" /> {t('advisorBadge')}
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
                {t('advisorTitle')} <span className="gradient-gold-text">{t('advisorName')}</span>
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t('advisorBio')}
            </p>

            {/* Certifications Badge Grid */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">Official Credentials & Accreditation</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 bg-[#07152F] p-3 rounded-xl border border-slate-800">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span className="text-white font-semibold">Financial Consultant - Ageas Federal Life</span>
                </div>
                <div className="flex items-center gap-2 bg-[#07152F] p-3 rounded-xl border border-slate-800">
                  <Award className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span className="text-white font-semibold">10+ Years Dedicated Client Service</span>
                </div>
                <div className="flex items-center gap-2 bg-[#07152F] p-3 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-white font-semibold">IRDAI Certified Protection Strategist</span>
                </div>
                <div className="flex items-center gap-2 bg-[#07152F] p-3 rounded-xl border border-slate-800">
                  <Star className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span className="text-white font-semibold">100% Transparent Tax & Asset Guidance</span>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={scrollToContact}
                className="btn-gold text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" /> {t('advisorBookCall')}
              </button>

              <button
                onClick={handleWhatsApp}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                <MessageCircle className="w-4 h-4" /> {t('advisorWhatsAppCall')}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
