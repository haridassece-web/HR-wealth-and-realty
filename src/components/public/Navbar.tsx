import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { Shield, LogIn, Menu, X, Award, MessageCircle, ChevronRight, MapPin, Phone, Clock, Mail, Globe, ChevronDown, HeartHandshake, TrendingUp } from 'lucide-react';

interface NavbarProps {
  onOpenLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenLogin }) => {
  const { setActiveView, currentUser } = useApp();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('top');
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    setSolutionsDropdownOpen(false);
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello HR Wealthy & Realty, I would like to inquire about your Insurance, Investment, and Luxury Real Estate services.");
    window.open(`https://wa.me/919884933079?text=${message}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      
      {/* 1. Premium Top Bar */}
      <div className="bg-[#040C1A] text-slate-300 text-[11px] py-2 border-b border-[#D4AF37]/25 hidden md:block">
        <div className="w-full px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          
          {/* Left Info Badges */}
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> {t('location')}
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-emerald-400" /> {t('workingHours')}
            </span>
          </div>

          {/* Right Contact & Language Selector */}
          <div className="flex items-center gap-6 font-medium">
            <a href="tel:+919884933079" className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" /> <span className="font-bold text-white">{t('phone')}</span>
            </a>
            <a href="mailto:contact@hrwealthy.com" className="flex items-center gap-1.5 hover:text-[#2563EB] transition-colors">
              <Mail className="w-3.5 h-3.5 text-[#2563EB]" /> contact@hrwealthy.com
            </a>
            
            {/* Language Selector Pill */}
            <div className="flex items-center gap-1.5 bg-[#07152F] px-2.5 py-1 rounded-full border border-slate-800 text-xs">
              <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
              <button 
                onClick={() => setLanguage('EN')} 
                className={`transition-colors ${language === 'EN' ? 'text-[#D4AF37] font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                English
              </button>
              <span className="text-slate-600">|</span>
              <button 
                onClick={() => setLanguage('TA')} 
                className={`transition-colors ${language === 'TA' ? 'text-[#D4AF37] font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                தமிழ்
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Main Floating Island Glass Navbar */}
      <div className="px-3 sm:px-6 lg:px-12 py-2.5 w-full">
        <div className="w-full bg-[#07152F]/92 backdrop-blur-2xl border border-[#D4AF37]/35 rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/60 px-4 sm:px-8 py-3 transition-all">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer group" 
              onClick={() => scrollToSection('top')}
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl gradient-gold-bg flex items-center justify-center text-[#07152F] font-black text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                HR
              </div>
              <div>
                <div className="text-lg sm:text-xl font-extrabold tracking-tight font-heading text-white">
                  HR Wealthy <span className="text-[#D4AF37]">&</span> Realty
                </div>
                <div className="text-[9px] sm:text-[10px] text-amber-300 font-semibold tracking-widest uppercase flex items-center gap-1">
                  <Award className="w-3 h-3 text-[#D4AF37]" /> Luxury Wealth & Asset Advisory
                </div>
              </div>
            </div>

            {/* Desktop Nav Links (Wireframe: Home | Solutions ▼ | Properties | Calculators | Contact) */}
            <nav className="hidden lg:flex items-center gap-1 bg-[#040C1A]/80 p-1.5 rounded-full border border-slate-800 text-xs font-bold tracking-wide">
              
              {/* Home */}
              <button 
                onClick={() => scrollToSection('top')} 
                className={`px-4 py-2 rounded-full transition-all ${
                  activeTab === 'top' ? 'bg-[#D4AF37] text-[#07152F] shadow-md' : 'text-slate-300 hover:text-white'
                }`}
              >
                {t('navHome')}
              </button>

              {/* Solutions Dropdown Menu */}
              <div 
                className="relative"
                onMouseEnter={() => setSolutionsDropdownOpen(true)}
                onMouseLeave={() => setSolutionsDropdownOpen(false)}
              >
                <button 
                  onClick={() => setSolutionsDropdownOpen(!solutionsDropdownOpen)}
                  className={`px-4 py-2 rounded-full transition-all flex items-center gap-1.5 ${
                    ['insurance', 'financial-planning'].includes(activeTab) 
                      ? 'bg-[#D4AF37] text-[#07152F] shadow-md' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {t('navSolutions')} <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${solutionsDropdownOpen ? 'rotate-180 text-[#D4AF37]' : ''}`} />
                </button>

                {/* Dropdown Menu Card */}
                {solutionsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-[#0F1E3C] border border-[#D4AF37]/40 rounded-2xl p-2 shadow-2xl z-50 animate-fade-in backdrop-blur-xl">
                    <button
                      onClick={() => scrollToSection('insurance')}
                      className="w-full text-left p-3 rounded-xl hover:bg-[#07152F] flex items-center gap-3 transition-colors group"
                    >
                      <div className="p-2 bg-amber-400/10 border border-amber-400/30 rounded-lg text-[#D4AF37] group-hover:scale-110 transition-transform">
                        <HeartHandshake className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-white font-bold text-xs">{t('navInsurance')}</div>
                        <div className="text-[10px] text-slate-400">Ageas Life & Tax Protection</div>
                      </div>
                    </button>

                    <button
                      onClick={() => scrollToSection('financial-planning')}
                      className="w-full text-left p-3 rounded-xl hover:bg-[#07152F] flex items-center gap-3 transition-colors group"
                    >
                      <div className="p-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-[#2563EB] group-hover:scale-110 transition-transform">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-white font-bold text-xs">{t('navSolutions')}</div>
                        <div className="text-[10px] text-slate-400">SIP Mutuals & Retirement</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Properties */}
              <button 
                onClick={() => scrollToSection('services')} 
                className={`px-4 py-2 rounded-full transition-all ${
                  activeTab === 'services' ? 'bg-[#D4AF37] text-[#07152F] shadow-md' : 'text-slate-300 hover:text-white'
                }`}
              >
                {t('navRealEstate')}
              </button>

              {/* Calculators */}
              <button 
                onClick={() => scrollToSection('calculators')} 
                className={`px-4 py-2 rounded-full transition-all ${
                  activeTab === 'calculators' ? 'bg-[#D4AF37] text-[#07152F] shadow-md' : 'text-slate-300 hover:text-white'
                }`}
              >
                {t('navCalculators')}
              </button>

              {/* Contact */}
              <button 
                onClick={() => scrollToSection('contact')} 
                className={`px-4 py-2 rounded-full transition-all ${
                  activeTab === 'contact' ? 'bg-[#D4AF37] text-[#07152F] shadow-md' : 'text-slate-300 hover:text-white'
                }`}
              >
                {t('navContact')}
              </button>

            </nav>

            {/* Right Action CTAs (WhatsApp + Login) */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={handleWhatsApp}
                className="bg-emerald-600/20 border border-emerald-500/40 hover:bg-emerald-600 text-emerald-300 hover:text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" /> WhatsApp
              </button>

              {currentUser ? (
                <button
                  onClick={() => setActiveView('admin')}
                  className="bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#D4AF37] border border-[#D4AF37]/40 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                >
                  <Shield className="w-4 h-4 text-[#D4AF37]" /> {t('navDashboard')} ({currentUser.role})
                </button>
              ) : (
                <button
                  onClick={onOpenLogin}
                  className="gradient-gold-bg text-[#07152F] px-5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 hover:shadow-lg hover:shadow-amber-500/20 transition-all transform hover:-translate-y-0.5"
                >
                  <LogIn className="w-4 h-4" /> {t('navLogin')}
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-800/80 border border-slate-700"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pb-4 animate-fade-in">
          <div className="bg-[#07152F] border border-[#D4AF37]/35 rounded-2xl p-5 space-y-3 shadow-2xl">
            <button
              onClick={() => scrollToSection('top')}
              className="flex items-center justify-between w-full text-left py-2 text-slate-200 font-semibold border-b border-slate-800 text-xs"
            >
              Home <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
            </button>

            {/* Solutions Submenu */}
            <div className="space-y-2 border-b border-slate-800 pb-2">
              <div className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider">Solutions</div>
              <button
                onClick={() => scrollToSection('insurance')}
                className="flex items-center justify-between w-full text-left py-1.5 text-slate-300 font-semibold text-xs pl-3"
              >
                Insurance <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                onClick={() => scrollToSection('financial-planning')}
                className="flex items-center justify-between w-full text-left py-1.5 text-slate-300 font-semibold text-xs pl-3"
              >
                Investment <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>

            <button
              onClick={() => scrollToSection('services')}
              className="flex items-center justify-between w-full text-left py-2 text-slate-200 font-semibold border-b border-slate-800 text-xs"
            >
              Properties <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
            <button
              onClick={() => scrollToSection('calculators')}
              className="flex items-center justify-between w-full text-left py-2 text-slate-200 font-semibold border-b border-slate-800 text-xs"
            >
              Calculators <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="flex items-center justify-between w-full text-left py-2 text-slate-200 font-semibold border-b border-slate-800 text-xs"
            >
              Contact <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
            </button>

            <div className="pt-3 flex flex-col gap-2">
              <button
                onClick={handleWhatsApp}
                className="w-full text-center bg-emerald-600 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </button>

              {currentUser ? (
                <button
                  onClick={() => { setActiveView('admin'); setMobileMenuOpen(false); }}
                  className="w-full text-center gradient-gold-bg text-[#07152F] font-bold py-2.5 rounded-xl text-xs"
                >
                  Go to CRM ({currentUser.role})
                </button>
              ) : (
                <button
                  onClick={() => { onOpenLogin(); setMobileMenuOpen(false); }}
                  className="w-full text-center gradient-gold-bg text-[#07152F] font-extrabold py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs"
                >
                  <LogIn className="w-4 h-4" /> Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </header>
  );
};
