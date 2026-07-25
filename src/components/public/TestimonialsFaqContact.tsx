import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp, MapPin, Phone, Send, CheckCircle2, ShieldCheck, Headphones, UserCheck, Calendar, Mail, Share2, Globe, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';

export const TestimonialsFaqContact: React.FC = () => {
  const { addLead } = useApp();
  const { t } = useLanguage();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Appointment Form State
  const [apptForm, setApptForm] = useState({
    name: '',
    phone: '',
    email: '',
    monthlyIncome: '100000',
    need: 'Insurance' as 'Insurance' | 'Real Estate' | 'Investment',
    prefDateTime: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  // Newsletter Form State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apptForm.name || !apptForm.phone) return;

    addLead({
      name: apptForm.name,
      mobile: apptForm.phone,
      email: apptForm.email || 'client@appointment.com',
      category: apptForm.need === 'Real Estate' ? 'Real Estate' : apptForm.need === 'Insurance' ? 'Insurance' : 'Investment',
      budget: Number(apptForm.monthlyIncome) * 12 || 1200000,
      status: 'New Lead',
      assignedAdvisorId: 'usr-1',
      assignedAdvisorName: 'Haridass Ramalingam',
      notes: `Appointment booked for ${apptForm.prefDateTime || 'Flexible Date'}. Notes: ${apptForm.notes || 'N/A'}`,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setApptForm({
        name: '',
        phone: '',
        email: '',
        monthlyIncome: '100000',
        need: 'Insurance',
        prefDateTime: '',
        notes: '',
      });
    }, 4000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setTimeout(() => setNewsletterSubscribed(false), 4000);
    setNewsletterEmail('');
  };

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Senior Vice President, Tech Matrix',
      location: 'ECR Chennai',
      text: 'Excellent advice! Our financial planning became much clearer after consulting Haridass Ramalingam. Structured our Ageas Federal Life savings plan seamlessly.',
      rating: 5,
      initials: 'RK',
    },
    {
      name: 'Dr. Ananya Reddy',
      role: 'Chief Surgeon, Apollo Hospitals',
      location: 'Anna Nagar, Chennai, Tamil Nadu',
      text: 'Highly personal and credible guidance. The SIP investment strategy and tax planning gave our family 100% confidence for the future.',
      rating: 5,
      initials: 'AR',
    },
    {
      name: 'Vikramaditya Singh',
      role: 'NRI Investor & Business Owner',
      location: 'Dubai & Financial District',
      text: 'Outstanding experience. Haridass Ramalingam helped us acquire a high-yield pre-leased commercial floor with complete legal clearance.',
      rating: 5,
      initials: 'VS',
    },
  ];

  const faqs = [
    {
      question: 'Why choose Ageas Federal Life Insurance policies through HR Wealthy & Realty?',
      answer: 'Ageas Federal Life is a joint venture between Ageas (a top European insurance leader with 190+ years of history) and Federal Bank. Haridass Ramalingam provides customized policy structuring, instant underwriting assistance, and 100% dedicated claims support.',
    },
    {
      question: 'How does the 2-column split appointment booking work?',
      answer: 'Simply fill out your preferred date, time, and advisory need (Insurance, Investment, or Real Estate). You will receive an instant appointment confirmation via SMS and WhatsApp.',
    },
    {
      question: 'What property legal verification is included with HR Realty?',
      answer: 'Every property listed under HR Realty undergoes 100% RERA title verification, encumbrance certificate checking, and master layout approval before client site visits.',
    },
  ];

  return (
    <div className="bg-[#07152F] text-white font-body">
      
      {/* Trust & Accreditations Strip */}
      <section className="py-12 bg-[#040C1A] border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="glass-card p-6 rounded-2xl space-y-3 flex flex-col items-center">
              <div className="p-3 bg-[#D4AF37]/15 border border-[#D4AF37]/30 rounded-2xl text-[#D4AF37]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-2xl font-extrabold text-white font-heading">Ageas Partner</div>
              <div className="text-[11px] text-slate-300 font-semibold uppercase">Authorized Corporate Advisor</div>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-3 flex flex-col items-center">
              <div className="p-3 bg-purple-500/15 border border-purple-500/30 rounded-2xl text-purple-400">
                <Star className="w-6 h-6 fill-purple-400" />
              </div>
              <div className="text-2xl font-extrabold text-white font-heading">99.9%</div>
              <div className="text-[11px] text-slate-300 font-semibold uppercase">Client Satisfaction</div>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-3 flex flex-col items-center">
              <div className="p-3 bg-cyan-500/15 border border-cyan-500/30 rounded-2xl text-cyan-400">
                <Headphones className="w-6 h-6" />
              </div>
              <div className="text-2xl font-extrabold text-white font-heading">24×7</div>
              <div className="text-[11px] text-slate-300 font-semibold uppercase">Dedicated Support</div>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-3 flex flex-col items-center">
              <div className="p-3 bg-amber-500/15 border border-amber-500/30 rounded-2xl text-amber-400">
                <UserCheck className="w-6 h-6" />
              </div>
              <div className="text-2xl font-extrabold text-[#D4AF37] font-heading">10+ Yrs Exp</div>
              <div className="text-[11px] text-slate-300 font-semibold uppercase">Haridass Ramalingam</div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. Client Testimonials (Three Elegant Cards) */}
      <section id="testimonials" className="py-20 bg-[#07152F] border-t border-[#D4AF37]/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-3">
              Client Reviews & Feedback
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
              What Our <span className="gradient-gold-text">Clients Say</span>
            </h2>
          </div>

          {/* Three Elegant Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-[#0F1E3C] border border-[#D4AF37]/35 p-8 rounded-3xl space-y-6 shadow-xl hover:border-[#D4AF37] hover:-translate-y-2 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* ★★★★★ 5 Gold Stars Rating */}
                  <div className="flex gap-1 text-[#D4AF37]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>

                  <p className="text-sm text-slate-200 italic font-medium leading-relaxed">
                    "{t.text}"
                  </p>
                </div>

                {/* Client Avatar Badge & Name */}
                <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
                  <div className="w-12 h-12 rounded-xl gradient-gold-bg text-[#07152F] font-extrabold text-base flex items-center justify-center shadow-md shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-heading">
                      – {t.name}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      {t.role} | <span className="text-[#D4AF37]">{t.location}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. FAQ Section */}
      <section id="faq" className="py-20 bg-[#0B1E3D] border-t border-slate-800 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
              Got <span className="gradient-gold-text">Questions</span>?
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-[#0F1E3C] border border-slate-800 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-white hover:text-[#D4AF37] transition-colors"
                >
                  <span>{faq.question}</span>
                  {activeFaq === idx ? <ChevronUp className="w-5 h-5 text-[#D4AF37]" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Book Consultation (2-Column Wireframe Split Layout) */}
      <section id="contact" className="py-20 bg-[#07152F] border-t border-[#D4AF37]/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
              <Calendar className="w-4 h-4 text-[#D4AF37]" /> Priority Advisory Desk
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
              BOOK AN <span className="gradient-gold-text">APPOINTMENT</span>
            </h2>
          </div>

          <div className="bg-[#0F1E3C] border border-[#D4AF37]/35 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Advisor Profile Badge & Checkmarks */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#07152F] via-[#0B1E3D] to-[#07152F] p-8 flex flex-col justify-between text-white border-b lg:border-b-0 lg:border-r border-slate-800 space-y-6">
              
              <div className="space-y-6">
                
                {/* Advisor Profile Badge Card */}
                <div className="p-6 bg-[#07152F] rounded-3xl border border-[#D4AF37]/35 space-y-3 text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl gradient-gold-bg text-[#07152F] font-black text-xl flex items-center justify-center shadow-lg">
                    HR
                  </div>
                  <div>
                    <div className="font-extrabold text-white text-lg font-heading">Haridass Ramalingam</div>
                    <div className="text-xs text-[#D4AF37] font-semibold">Financial Consultant</div>
                  </div>
                  <div className="text-[11px] text-slate-300 bg-white/5 p-2 rounded-xl border border-white/10">
                    Ageas Federal Life Insurance (10+ Yrs Exp)
                  </div>
                </div>

                {/* Wireframe Checkmarks */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm font-bold text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>✔ Free Consultation</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    <span>✔ Tax Planning</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-[#2563EB] shrink-0" />
                    <span>✔ Investment Planning</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                    <span>✔ Real Estate Advisory</span>
                  </div>
                </div>

              </div>

              <div className="pt-4 border-t border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" /> Plot 11, Greenwood Appartment, Noombal Road, Navasakthi Nagar, Chennai, Tamil Nadu
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400" /> +91 98849 33079
                </div>
              </div>

            </div>

            {/* Right Column: 2-Column Split Input Grid Form */}
            <div className="lg:col-span-7 p-8 sm:p-10 space-y-6">
              
              {submitted ? (
                <div className="p-8 bg-emerald-500/20 border border-emerald-500/40 rounded-3xl text-center space-y-4 my-auto">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="text-2xl font-bold font-heading text-white">Appointment Scheduled!</h3>
                  <p className="text-xs text-slate-300">
                    Thank you, <strong className="text-white">{apptForm.name}</strong>. Senior Advisor Haridass Ramalingam will call you shortly to confirm your consultation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApptSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rajesh Kumar"
                        value={apptForm.name}
                        onChange={(e) => setApptForm({ ...apptForm, name: e.target.value })}
                        className="form-input text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98849 33079"
                        value={apptForm.phone}
                        onChange={(e) => setApptForm({ ...apptForm, phone: e.target.value })}
                        className="form-input text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="name@company.com"
                        value={apptForm.email}
                        onChange={(e) => setApptForm({ ...apptForm, email: e.target.value })}
                        className="form-input text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Monthly Income (₹)</label>
                      <select
                        value={apptForm.monthlyIncome}
                        onChange={(e) => setApptForm({ ...apptForm, monthlyIncome: e.target.value })}
                        className="form-input text-xs"
                      >
                        <option value="50000">₹50,000 - ₹1 Lakh</option>
                        <option value="100000">₹1 Lakh - ₹2.5 Lakhs</option>
                        <option value="250000">₹2.5 Lakhs - ₹5 Lakhs</option>
                        <option value="500000">Above ₹5 Lakhs (HNI)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Advisory Need</label>
                      <select
                        value={apptForm.need}
                        onChange={(e) => setApptForm({ ...apptForm, need: e.target.value as any })}
                        className="form-input text-xs"
                      >
                        <option value="Insurance">Life Insurance (Ageas Federal)</option>
                        <option value="Investment">Investment & SIP Planning</option>
                        <option value="Real Estate">Luxury Real Estate Advisory</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Preferred Date & Time</label>
                      <input
                        type="datetime-local"
                        value={apptForm.prefDateTime}
                        onChange={(e) => setApptForm({ ...apptForm, prefDateTime: e.target.value })}
                        className="form-input text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Notes / Specific Requirements</label>
                    <textarea
                      rows={3}
                      placeholder="Mention any specific investment goals or preferred property locations..."
                      value={apptForm.notes}
                      onChange={(e) => setApptForm({ ...apptForm, notes: e.target.value })}
                      className="form-input text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-gold py-3.5 text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xl hover:scale-105 transition-all"
                  >
                    Schedule Appointment <Send className="w-4 h-4 text-[#07152F]" />
                  </button>
                </form>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* Bold Call to Action Banner */}
      <section className="py-16 bg-gradient-to-r from-[#D4AF37] via-[#F4D068] to-[#D4AF37] text-[#07152F] text-center shadow-2xl relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight">
            Ready to Secure Your Future?
          </h2>
          <p className="text-sm sm:text-base font-bold">
            Book a FREE Financial & Luxury Real Estate Consultation Today
          </p>
          <button
            onClick={() => scrollToSection('contact')}
            className="bg-[#07152F] hover:bg-[#0B1E3D] text-white font-black px-8 py-4 rounded-2xl text-sm uppercase tracking-wider shadow-2xl hover:scale-105 transition-all mt-2 inline-flex items-center gap-2"
          >
            Schedule Now <Send className="w-4 h-4 text-[#D4AF37]" />
          </button>
        </div>
      </section>

      {/* 12. 4-Column Luxury Footer */}
      <footer className="bg-[#07152F] border-t border-[#D4AF37]/35 text-slate-400 text-xs py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            
            {/* Column 1: Company Profile & Social Media */}
            <div className="space-y-4">
              <div className="text-2xl font-extrabold text-white font-heading tracking-tight">
                HR Wealthy <span className="text-[#D4AF37]">&</span> Realty
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Authorized corporate insurance advisor for Ageas Federal Life & premier luxury real estate advisory firm serving High Net Worth Individuals (HNIs).
              </p>
              
              {/* Social Media Links */}
              <div className="space-y-2 pt-1">
                <div className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider">Connect With Us</div>
                <div className="flex items-center gap-2">
                  <a href="#social" title="Global Advisory" className="p-2 rounded-xl bg-slate-800/80 hover:bg-[#D4AF37] hover:text-[#07152F] text-slate-300 transition-all">
                    <Globe className="w-4 h-4" />
                  </a>
                  <a href="#social" title="Direct Contact" className="p-2 rounded-xl bg-slate-800/80 hover:bg-[#2563EB] hover:text-white text-slate-300 transition-all">
                    <Phone className="w-4 h-4" />
                  </a>
                  <a href="#social" title="WhatsApp Chat" className="p-2 rounded-xl bg-slate-800/80 hover:bg-emerald-500 hover:text-white text-slate-300 transition-all">
                    <MessageSquare className="w-4 h-4" />
                  </a>
                  <a href="#social" title="Email Advisory" className="p-2 rounded-xl bg-slate-800/80 hover:bg-sky-400 hover:text-white text-slate-300 transition-all">
                    <Mail className="w-4 h-4" />
                  </a>
                  <a href="#social" title="Share Portfolio" className="p-2 rounded-xl bg-slate-800/80 hover:bg-purple-500 hover:text-white text-slate-300 transition-all">
                    <Share2 className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: Insurance Products */}
            <div className="space-y-3">
              <h4 className="font-bold text-white uppercase tracking-wider text-xs border-b border-[#D4AF37]/30 pb-2 inline-block">
                Insurance Solutions
              </h4>
              <ul className="space-y-2 text-slate-300">
                <li><button onClick={() => scrollToSection('insurance')} className="hover:text-[#D4AF37] transition-colors">Ageas Federal Super Cash Plan</button></li>
                <li><button onClick={() => scrollToSection('insurance')} className="hover:text-[#D4AF37] transition-colors">Magic Savings Plan</button></li>
                <li><button onClick={() => scrollToSection('insurance')} className="hover:text-[#D4AF37] transition-colors">Guaranteed Wealth Plan</button></li>
                <li><button onClick={() => scrollToSection('insurance')} className="hover:text-[#D4AF37] transition-colors">Term Protection u/s 80C</button></li>
              </ul>
            </div>

            {/* Column 3: Real Estate & Resources */}
            <div className="space-y-3">
              <h4 className="font-bold text-white uppercase tracking-wider text-xs border-b border-[#D4AF37]/30 pb-2 inline-block">
                Real Estate & Resources
              </h4>
              <ul className="space-y-2 text-slate-300">
                <li><button onClick={() => scrollToSection('properties')} className="hover:text-[#D4AF37] transition-colors">ECR Beachfront Luxury Villas</button></li>
                <li><button onClick={() => scrollToSection('properties')} className="hover:text-[#D4AF37] transition-colors">Jubilee Hills Estates</button></li>
                <li><button onClick={() => scrollToSection('calculators')} className="hover:text-[#D4AF37] transition-colors">SIP Wealth Calculator</button></li>
                <li><button onClick={() => scrollToSection('calculators')} className="hover:text-[#D4AF37] transition-colors">Home Loan EMI Calculator</button></li>
              </ul>
            </div>

            {/* Column 4: Contact, Newsletter & Map Link */}
            <div className="space-y-4">
              <h4 className="font-bold text-white uppercase tracking-wider text-xs border-b border-[#D4AF37]/30 pb-2 inline-block">
                Contact & Newsletter
              </h4>
              
              <div className="space-y-1.5 text-slate-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" /> <span className="font-bold text-white">+91 98849 33079</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#2563EB]" /> contact@hrwealthy.com
                </div>
              </div>

              {/* Newsletter Signup Form */}
              <div className="space-y-2">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Subscribe to Market Insights</div>
                {newsletterSubscribed ? (
                  <div className="text-[11px] text-emerald-400 font-bold">✓ Subscribed successfully!</div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex gap-1.5">
                    <input
                      type="email"
                      required
                      placeholder="Your email address..."
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="form-input text-[11px] py-1.5 px-3 flex-1"
                    />
                    <button type="submit" className="btn-gold py-1.5 px-3 text-[11px]">
                      Join
                    </button>
                  </form>
                )}
              </div>

              {/* Google Maps Link */}
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#2563EB] hover:text-[#D4AF37] pt-1 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> View Office on Google Maps
              </a>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-800 text-center text-slate-400 text-[11px] flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>© 2026 HR Wealthy & Realty. {t('footerRights')}</div>
            <div className="text-[#D4AF37] font-semibold">{t('footerAddress')}</div>
          </div>

        </div>
      </footer>

    </div>
  );
};
