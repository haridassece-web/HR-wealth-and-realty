import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, Award, Building2, Users, ArrowRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-24 bg-[#07152F] text-white relative border-b border-[#D4AF37]/20">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Corporate Trophy & Accreditation Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-gradient-to-br from-[#0F1E3C] via-[#07152F] to-[#0B1E3D] border-2 border-[#D4AF37]/40 rounded-3xl p-8 text-center space-y-6 shadow-2xl relative">
              
              <div className="w-20 h-20 mx-auto rounded-3xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center shadow-xl">
                <Award className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold font-heading text-white">HR Wealthy & Realty</h3>
                <p className="text-xs text-[#D4AF37] font-bold">{t('aboutSub')}</p>
                <p className="text-xs text-slate-300 leading-relaxed pt-2">
                  {t('navAdvisor')}: <strong className="text-white">{t('aboutAdvisorName')}</strong> ({t('aboutAdvisorTitle')}).
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800 text-xs">
                <div className="p-3.5 bg-[#07152F] rounded-2xl border border-slate-800">
                  <div className="font-extrabold text-white text-base">10+ Years</div>
                  <div className="text-slate-400 text-[10px]">{t('statExperience')}</div>
                </div>
                <div className="p-3.5 bg-[#07152F] rounded-2xl border border-slate-800">
                  <div className="font-extrabold text-[#D4AF37] text-base">99.9%</div>
                  <div className="text-slate-400 text-[10px]">Claim Settlement</div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Corporate Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#D4AF37]" /> {t('aboutBadge')}
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
              {t('aboutTitle')}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t('aboutSub')}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#0F1E3C] border border-slate-800 hover:border-[#D4AF37]/40 transition-colors">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-xs sm:text-sm">{t('aboutPoint1')}</h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">{t('insurancePlan1Desc')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#0F1E3C] border border-slate-800 hover:border-[#2563EB]/40 transition-colors">
                <Building2 className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-xs sm:text-sm">{t('aboutPoint2')}</h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">{t('insurancePlan2Desc')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#0F1E3C] border border-slate-800 hover:border-emerald-400/40 transition-colors">
                <Users className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-xs sm:text-sm">{t('aboutPoint3')}</h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">{t('reSub')}</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToContact}
                className="btn-gold text-xs uppercase tracking-wider font-extrabold shadow-2xl hover:scale-105 transition-all"
              >
                {t('heroCtaAdvisor')} <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
