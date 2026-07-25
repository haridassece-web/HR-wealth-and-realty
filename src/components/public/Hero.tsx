import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Shield, TrendingUp, Building2, ArrowRight, CheckCircle2, Sparkles, Home, ShieldCheck, UserCheck, FileCheck, Headphones, PiggyBank, Landmark, GraduationCap, BarChart3, Lock, Users, LineChart } from 'lucide-react';

const AnimatedCounter: React.FC<{ end: number; prefix?: string; suffix?: string; decimals?: number }> = ({ end, prefix = '', suffix = '', decimals = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1600;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end]);

  return (
    <span>
      {prefix}{decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}
    </span>
  );
};

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const serviceCards = [
    {
      id: 's1',
      title: t('insuranceTitle'),
      subtitle: t('insuranceSub'),
      icon: <Shield className="w-10 h-10 text-[#D4AF37]" />,
      sectionId: 'insurance',
      borderColor: 'border-[#D4AF37]/35',
      hoverText: 'text-[#D4AF37]',
      btnBg: 'text-[#D4AF37]',
    },
    {
      id: 's2',
      title: t('calcTitle'),
      subtitle: t('calcSub'),
      icon: <TrendingUp className="w-10 h-10 text-[#2563EB]" />,
      sectionId: 'financial-planning',
      borderColor: 'border-[#2563EB]/40',
      hoverText: 'text-[#2563EB]',
      btnBg: 'text-[#2563EB]',
    },
    {
      id: 's3',
      title: t('reTitle'),
      subtitle: t('reSub'),
      icon: <Building2 className="w-10 h-10 text-emerald-400" />,
      sectionId: 'services',
      borderColor: 'border-emerald-500/40',
      hoverText: 'text-emerald-400',
      btnBg: 'text-emerald-400',
    },
    {
      id: 's4',
      title: t('tabTax'),
      subtitle: t('insuranceTaxSaved'),
      icon: <PiggyBank className="w-10 h-10 text-purple-400" />,
      sectionId: 'calculators',
      borderColor: 'border-purple-500/40',
      hoverText: 'text-purple-400',
      btnBg: 'text-purple-400',
    },
    {
      id: 's5',
      title: 'Retirement Planner',
      subtitle: 'Build inflation-adjusted retirement corpus.',
      icon: <Landmark className="w-10 h-10 text-cyan-400" />,
      sectionId: 'calculators',
      borderColor: 'border-cyan-500/40',
      hoverText: 'text-cyan-400',
      btnBg: 'text-cyan-400',
    },
    {
      id: 's6',
      title: 'Child Education Planner',
      subtitle: 'Fund global college tuition & higher education.',
      icon: <GraduationCap className="w-10 h-10 text-amber-400" />,
      sectionId: 'calculators',
      borderColor: 'border-amber-500/40',
      hoverText: 'text-amber-400',
      btnBg: 'text-amber-400',
    },
  ];

  return (
    <section className="relative min-h-screen w-full bg-[#07152F] text-white flex flex-col justify-between overflow-hidden pt-4 pb-12">
      
      {/* Full Window Cinematic Background Image with 60% Opacity Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85')`,
        }}
      >
        <div className="absolute inset-0 bg-[#07152F]/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07152F] via-transparent to-[#07152F]/40" />
      </div>

      {/* Full Window Width Hero Layout (No Half Page Waste) */}
      <div className="w-full px-4 sm:px-8 lg:px-12 relative z-10 my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[82vh]">
          
          {/* Left Side (7 Columns - Expanded Full Coverage) */}
          <div className="lg:col-span-7 space-y-8 animate-fade-in pr-0 lg:pr-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-xl">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" /> {t('heroBadge')}
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black font-heading tracking-tight leading-[1.10] text-white drop-shadow-lg">
              {t('heroTitleMain')}.<br />
              <span className="gradient-gold-text">{t('heroTitleSub')}</span>.
            </h1>

            {/* Sub-headline bar */}
            <div className="flex flex-wrap items-center gap-6 text-base font-bold text-slate-100 drop-shadow-md">
              <span className="flex items-center gap-2 text-amber-300">
                <CheckCircle2 className="w-5.5 h-5.5 text-[#D4AF37]" /> {t('navInsurance')}
              </span>
              <span className="text-slate-500">|</span>
              <span className="flex items-center gap-2 text-blue-300">
                <CheckCircle2 className="w-5.5 h-5.5 text-[#2563EB]" /> {t('navCalculators')}
              </span>
              <span className="text-slate-500">|</span>
              <span className="flex items-center gap-2 text-emerald-300">
                <CheckCircle2 className="w-5.5 h-5.5 text-emerald-400" /> {t('navRealEstate')}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-5 pt-4">
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-gold text-base font-extrabold shadow-2xl hover:scale-105 transition-all py-4 px-8"
              >
                {t('heroCtaAdvisor')} <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => scrollToSection('services')}
                className="btn-outline-gold text-base font-extrabold bg-black/40 backdrop-blur-md shadow-2xl hover:scale-105 transition-all py-4 px-8"
              >
                {t('heroCtaExplore')}
              </button>
            </div>

          </div>

          {/* Right Side (5 Columns - Full Width Composite Illustration) */}
          <div className="lg:col-span-5 w-full flex justify-center items-center">
            <div className="w-full bg-[#0F1E3C]/95 border-2 border-[#D4AF37]/50 rounded-3xl p-7 space-y-6 shadow-2xl relative overflow-hidden group backdrop-blur-2xl hover:-translate-y-2 hover:border-[#D4AF37] transition-all duration-300">
              
              {/* Dashboard UI Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#D4AF37]/15 border border-[#D4AF37]/30 rounded-xl text-[#D4AF37]">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base font-heading">3D Wealth & Asset Console</h3>
                    <p className="text-[10px] sm:text-xs text-emerald-400 font-semibold flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Ageas Federal & RERA Approved
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-extrabold text-[#D4AF37] uppercase bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/30">
                    Live Advisory
                  </span>
                </div>
              </div>

              {/* Multi-layered Graphic Cards */}
              <div className="space-y-3.5">
                
                {/* 📈 Investment Growth Chart Card */}
                <div className="bg-[#07152F] p-4 rounded-2xl border border-blue-500/35 flex items-center justify-between hover:border-blue-400 transition-colors">
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 bg-blue-500/15 border border-blue-500/30 rounded-xl text-[#2563EB]">
                      <LineChart className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">📈 Wealth Growth</div>
                      <div className="text-xs font-extrabold text-white mt-0.5">Equity SIP Portfolio (+14.2% CAGR)</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm sm:text-base font-black text-[#2563EB] font-heading">₹45.00 Lakhs</div>
                    <div className="text-[9px] text-emerald-400 font-bold">Compounded Growth</div>
                  </div>
                </div>

                {/* 🏡 Property Card */}
                <div className="bg-[#07152F] p-4 rounded-2xl border border-emerald-500/35 flex items-center justify-between hover:border-emerald-400 transition-colors">
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-400">
                      <Home className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">🏡 Property Card</div>
                      <div className="text-xs font-extrabold text-white mt-0.5">ECR Beachfront Luxury Villa (5 BHK)</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm sm:text-base font-black text-emerald-400 font-heading">₹3.20 Crores</div>
                    <div className="text-[9px] text-slate-300 font-bold">RERA Title Verified</div>
                  </div>
                </div>

                {/* 🛡 Insurance Card */}
                <div className="bg-[#07152F] p-4 rounded-2xl border border-amber-400/35 flex items-center justify-between hover:border-[#D4AF37] transition-colors">
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 bg-amber-400/15 border border-amber-400/30 rounded-xl text-[#D4AF37]">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">🛡 Insurance Card</div>
                      <div className="text-xs font-extrabold text-white mt-0.5">Ageas Smart Protection Plan</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm sm:text-base font-black text-[#D4AF37] font-heading">₹1.50 Crore</div>
                    <div className="text-[9px] text-amber-300 font-bold">100% Tax-Free u/s 10(10D)</div>
                  </div>
                </div>

                {/* 👨‍👩‍👧‍👦 Family Security Badge */}
                <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
                  <span className="flex items-center gap-2 font-bold">
                    <Users className="w-4 h-4 text-emerald-400" /> Family Wealth & Asset Protection Active
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded font-extrabold text-emerald-400 border border-emerald-500/40">
                    500+ Families Shielded
                  </span>
                </div>

              </div>

              {/* Action Button */}
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full btn-gold py-3.5 text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2"
              >
                View Customized Advisory Proposal <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </div>

        </div>
      </div>

      {/* Why Choose Us Full-Width Strip */}
      <div className="relative z-10 border-y border-[#D4AF37]/35 bg-[#040C1A]/95 backdrop-blur-2xl py-5 w-full">
        <div className="w-full px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center justify-between text-center">
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/40 hover:-translate-y-1 transition-all">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0" />
              <span className="text-xs font-extrabold text-white">IRDAI Compliant</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-[#2563EB]/40 hover:-translate-y-1 transition-all">
              <UserCheck className="w-5 h-5 text-[#2563EB] shrink-0" />
              <span className="text-xs font-extrabold text-white">Personalized Advice</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-400/40 hover:-translate-y-1 transition-all">
              <FileCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-xs font-extrabold text-white">Transparent Guidance</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400/40 hover:-translate-y-1 transition-all">
              <Headphones className="w-5 h-5 text-purple-400 shrink-0" />
              <span className="text-xs font-extrabold text-white">End-to-End Support</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/40 hover:-translate-y-1 transition-all">
              <Building2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
              <span className="text-xs font-extrabold text-white">Property Advisory</span>
            </div>

          </div>
        </div>
      </div>

      {/* Full-Width Animated Counter Statistics Bar */}
      <div className="relative z-10 border-b border-[#D4AF37]/25 bg-[#07152F]/95 backdrop-blur-xl py-6 w-full">
        <div className="w-full px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#D4AF37] font-heading">
                <AnimatedCounter end={150} prefix="₹" suffix="+ Cr" />
              </div>
              <div className="text-xs text-slate-300 font-medium mt-1">Financial Goals Guided</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#2563EB] font-heading">
                <AnimatedCounter end={500} suffix="+" />
              </div>
              <div className="text-xs text-slate-300 font-medium mt-1">Families Assisted</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-heading">
                <AnimatedCounter end={15} suffix="+ Years" />
              </div>
              <div className="text-xs text-slate-300 font-medium mt-1">Professional Experience</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#D4AF37] font-heading">
                <AnimatedCounter end={99.9} suffix="%" decimals={1} />
              </div>
              <div className="text-xs text-slate-300 font-medium mt-1">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* 6-Card Responsive Grid Services Section */}
      <div id="services" className="w-full px-4 sm:px-8 lg:px-12 relative z-10 pt-16 pb-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-2 border border-[#D4AF37]/30">
            Integrated Solutions Portfolio
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
            Our Integrated <span className="gradient-gold-text">Solutions</span>
          </h2>
        </div>

        {/* 6 Visual Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCards.map((card) => (
            <div
              key={card.id}
              onClick={() => scrollToSection(card.sectionId)}
              className={`bg-[#0F1E3C] border ${card.borderColor} p-8 rounded-3xl cursor-pointer group space-y-6 text-center flex flex-col justify-between hover:-translate-y-2.5 transition-all duration-300 shadow-xl hover:shadow-2xl hover:border-[#D4AF37]`}
            >
              <div className="space-y-4 flex flex-col items-center">
                <div className="p-5 bg-[#07152F] rounded-2xl border border-slate-800 shadow-inner group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>

                <h3 className={`text-2xl font-bold font-heading text-white ${card.hoverText} transition-colors`}>
                  {card.title}
                </h3>

                <p className="text-xs text-slate-300 font-medium">
                  {card.subtitle}
                </p>
              </div>

              {/* Action Link Button */}
              <div className={`text-xs font-black uppercase tracking-wider ${card.btnBg} flex items-center justify-center gap-1.5 pt-4 border-t border-slate-800 group-hover:gap-3 transition-all`}>
                Learn More <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
