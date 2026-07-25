import React, { useState } from 'react';
import { Shield, HeartPulse, PiggyBank, GraduationCap, Check, ArrowRight, Calculator, FileText, Send, Sparkles, X, Star } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface PolicyCard {
  id: string;
  title: string;
  category: string;
  company: string;
  coverRange: string;
  taxBenefit: string;
  description: string;
  features: string[];
  rating: number;
  icon: React.ReactNode;
}

export const InsuranceServices: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  // Quote Calculator State
  const [calcPlan, setCalcPlan] = useState('Ageas Federal Super Cash Plan');
  const [calcAge, setCalcAge] = useState(30);
  const [calcSumAssured, setCalcSumAssured] = useState(10000000);
  const [calcTerm, setCalcTerm] = useState(30);
  const [calcIsSmoker, setCalcIsSmoker] = useState(false);
  const [calcFrequency, setCalcFrequency] = useState<'Monthly' | 'Yearly'>('Monthly');

  const policies: PolicyCard[] = [
    {
      id: 'p1',
      title: 'Ageas Federal Super Cash Plan',
      category: 'Guaranteed Income',
      company: 'Ageas Federal Life Insurance',
      coverRange: 'Guaranteed Cash Payouts',
      taxBenefit: '100% Tax Free u/s 10(10D)',
      description: 'Guaranteed annual cash payouts starting from year 2 onwards along with comprehensive life insurance protection.',
      features: ['Regular Guaranteed Money Back Cash Payouts', 'Life Protection Cover up to Age 85', 'Tax Savings under Section 80C', 'Terminal Illness Payout'],
      rating: 5,
      icon: <Shield className="w-8 h-8 text-[#D4AF37]" />,
    },
    {
      id: 'p2',
      title: 'Ageas Federal Magic Savings Plan',
      category: 'Tax Benefits',
      company: 'Ageas Federal Life Insurance',
      coverRange: 'Guaranteed Savings + Maturity',
      taxBenefit: 'Maximum Tax Benefit u/s 80C',
      description: 'Zero market risk plan ensuring high guaranteed additions, annual cash boosters, and tax-free maturity fund.',
      features: ['Guaranteed Annual Income Boosters', 'Flexible PPT of 5 to 12 Years', 'Tax-free Lump Sum Maturity', 'Loyalty Booster Bonuses'],
      rating: 5,
      icon: <PiggyBank className="w-8 h-8 text-[#2563EB]" />,
    },
    {
      id: 'p3',
      title: 'Ageas Federal Guaranteed Wealth Plan',
      category: 'Long-term Growth',
      company: 'Ageas Federal Life Insurance',
      coverRange: '₹50 Lakhs - ₹5 Crores',
      taxBenefit: 'Section 80C & 10(10D)',
      description: 'Compounded long-term wealth accumulation for retirement, child education, and estate wealth transfer.',
      features: ['Automatic Premium Waiver on Death', 'Milestone Payouts at College Entry', 'Inflation-Indexed Goal Fund', 'Customizable Rider Add-ons'],
      rating: 5,
      icon: <GraduationCap className="w-8 h-8 text-emerald-400" />,
    },
    {
      id: 'p4',
      title: 'Ageas Federal Wealth Builder ULIP',
      category: 'Market Linked ULIP',
      company: 'Ageas Federal Life Insurance',
      coverRange: 'Market CAGR + 10x Sum Assured',
      taxBenefit: 'Tax Exemption under 10(10D)',
      description: 'Invest in high performing equity and debt funds with unlimited free fund switches and life cover.',
      features: ['Unlimited Free Fund Switches', 'Zero Premium Allocation Charges', 'Return of Mortality Charges', 'Systematic Transfer Plan (STP)'],
      rating: 5,
      icon: <HeartPulse className="w-8 h-8 text-purple-400" />,
    },
  ];

  const categories = ['All', 'Guaranteed Income', 'Tax Benefits', 'Long-term Growth', 'Market Linked ULIP'];
  const filtered = selectedCategory === 'All' ? policies : policies.filter(p => p.category === selectedCategory);

  const calculateEstimatedPremium = () => {
    let baseRatePerThousand = 0.85;
    if (calcAge > 30) baseRatePerThousand += (calcAge - 30) * 0.05;
    if (calcAge < 30) baseRatePerThousand -= (30 - calcAge) * 0.02;
    if (calcIsSmoker) baseRatePerThousand *= 1.45;

    if (calcPlan.includes('Super Cash')) baseRatePerThousand = 4.2;
    if (calcPlan.includes('Magic Savings')) baseRatePerThousand = 3.8;
    if (calcPlan.includes('Guaranteed Wealth')) baseRatePerThousand = 3.5;

    const yearly = Math.round((calcSumAssured / 1000) * baseRatePerThousand);
    const monthly = Math.round(yearly / 12);
    const taxSavedSec80C = Math.min(yearly * 0.312, 46800);

    return { yearly, monthly, taxSavedSec80C: Math.round(taxSavedSec80C) };
  };

  const quote = calculateEstimatedPremium();

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFillColor(7, 21, 47);
    doc.rect(0, 0, 210, 35, 'F');
    doc.setTextColor(212, 175, 55);
    doc.setFontSize(18);
    doc.text('HR WEALTHY & REALTY - AGEAS FEDERAL QUOTE', 14, 20);
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text('Official Insurance Premium Estimate & Tax Savings Breakdown', 14, 28);

    doc.setTextColor(17, 24, 39);
    doc.setFontSize(12);
    doc.text(`Generated Date: ${new Date().toLocaleDateString()}`, 14, 45);

    autoTable(doc, {
      startY: 52,
      head: [['Quote Parameter', 'Details / Values']],
      body: [
        ['Selected Plan', calcPlan],
        ['Applicant Age', `${calcAge} Years`],
        ['Smoker Status', calcIsSmoker ? 'Smoker' : 'Non-Smoker'],
        ['Life Cover (Sum Assured)', `INR ${(calcSumAssured / 100000).toFixed(1)} Lakhs`],
        ['Policy Horizon Term', `${calcTerm} Years`],
        ['Estimated Monthly Premium', `INR ${quote.monthly.toLocaleString('en-IN')}`],
        ['Estimated Annual Premium', `INR ${quote.yearly.toLocaleString('en-IN')}`],
        ['Est. Section 80C Tax Saving', `INR ${quote.taxSavedSec80C.toLocaleString('en-IN')} / year`],
        ['Maturity Benefit Exemption', '100% Tax Free under Sec 10(10D)'],
      ],
      theme: 'grid',
      headStyles: { fillColor: [7, 21, 47], textColor: [212, 175, 55], fontStyle: 'bold' },
    });

    doc.save(`Ageas_Federal_Quote_${Date.now()}.pdf`);
  };

  const handleWhatsAppSend = () => {
    const text = `Hello HR Wealthy Advisor, I generated an Ageas Federal Insurance Quote:\n*Plan:* ${calcPlan}\n*Age:* ${calcAge}\n*Cover:* ₹${(calcSumAssured / 100000).toFixed(1)} Lakhs\n*Estimated Premium:* ₹${quote.monthly.toLocaleString('en-IN')}/month\nPlease call or WhatsApp me the official policy brochure.`;
    window.open(`https://wa.me/919884933079?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="insurance" className="py-20 bg-[#07152F] text-white relative border-b border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Authorized Ageas Federal Life Insurance Partner
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
              Insurance <span className="gradient-gold-text">Plans</span>
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Guaranteed income, tax exemption, and long-term capital protection plans tailored for doctors, IT professionals, & business owners.
            </p>
          </div>

          <button
            onClick={() => setShowQuoteModal(true)}
            className="btn-gold shrink-0 self-start md:self-auto"
          >
            <Calculator className="w-4 h-4" /> Instant Quote Engine
          </button>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'gradient-gold-bg text-[#07152F] shadow-lg shadow-amber-500/20'
                  : 'bg-[#0F1E3C] border border-slate-700 text-slate-300 hover:border-[#D4AF37]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid with Gold Borders & Star Ratings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="glass-card p-8 rounded-3xl relative overflow-hidden group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3.5 bg-[#07152F] border border-[#D4AF37]/30 rounded-2xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="text-right">
                    <div className="flex gap-1 text-[#D4AF37] mb-1 justify-end">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/30">
                      {item.category}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold font-heading text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                  {item.description}
                </p>

                <div className="space-y-2 mb-6">
                  {item.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Benefit Type</div>
                  <div className="text-sm font-extrabold text-[#D4AF37] font-heading">{item.coverRange}</div>
                </div>
                <button
                  onClick={() => {
                    setCalcPlan(item.title);
                    setShowQuoteModal(true);
                  }}
                  className="btn-gold py-2 px-4 text-xs"
                >
                  View Benefits <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Quote Calculator Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#0F1E3C] border border-[#D4AF37]/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setShowQuoteModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/80"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-2xl text-[#D4AF37]">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-heading text-white">Ageas Federal Premium Quote Calculator</h3>
                <p className="text-xs text-slate-400">Instant premium estimate, Sec 80C tax savings & PDF download</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Select Policy Plan</label>
                <select
                  value={calcPlan}
                  onChange={(e) => setCalcPlan(e.target.value)}
                  className="form-input text-xs"
                >
                  {policies.map(p => <option key={p.id} value={p.title}>{p.title}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Applicant Age ({calcAge} Years)</label>
                <input
                  type="range"
                  min={18}
                  max={65}
                  value={calcAge}
                  onChange={(e) => setCalcAge(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37] mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Sum Assured Life Cover (₹)</label>
                <select
                  value={calcSumAssured}
                  onChange={(e) => setCalcSumAssured(Number(e.target.value))}
                  className="form-input text-xs"
                >
                  <option value={5000000}>₹50 Lakhs</option>
                  <option value={10000000}>₹1 Crore</option>
                  <option value={20000000}>₹2 Crores</option>
                  <option value={50000000}>₹5 Crores</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Policy Term ({calcTerm} Years)</label>
                <input
                  type="range"
                  min={10}
                  max={40}
                  value={calcTerm}
                  onChange={(e) => setCalcTerm(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37] mt-2"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#07152F] rounded-2xl border border-slate-700">
              <span className="text-xs text-slate-300 font-semibold">Do you consume tobacco/cigarettes?</span>
              <button
                onClick={() => setCalcIsSmoker(!calcIsSmoker)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  calcIsSmoker ? 'bg-rose-500 text-white' : 'bg-slate-700 text-slate-300'
                }`}
              >
                {calcIsSmoker ? 'Smoker' : 'Non-Smoker'}
              </button>
            </div>

            {/* Estimated Quote Card Output */}
            <div className="p-6 rounded-2xl bg-[#07152F] border border-[#D4AF37]/30 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-wider">Estimated Premium ({calcFrequency})</div>
                  <div className="text-3xl font-extrabold text-white font-heading">
                    ₹{calcFrequency === 'Monthly' ? quote.monthly.toLocaleString('en-IN') : quote.yearly.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="flex gap-2 bg-[#0F1E3C] p-1 rounded-xl border border-slate-700">
                  <button
                    onClick={() => setCalcFrequency('Monthly')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${calcFrequency === 'Monthly' ? 'bg-[#D4AF37] text-[#07152F]' : 'text-slate-400'}`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setCalcFrequency('Yearly')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${calcFrequency === 'Yearly' ? 'bg-[#D4AF37] text-[#07152F]' : 'text-slate-400'}`}
                  >
                    Yearly
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs pt-2 border-t border-slate-800">
                <div>
                  <span className="text-slate-400">Est. Sec 80C Tax Saved:</span>
                  <div className="text-emerald-400 font-bold">₹{quote.taxSavedSec80C.toLocaleString('en-IN')} / yr</div>
                </div>
                <div>
                  <span className="text-slate-400">Maturity Benefit:</span>
                  <div className="text-[#2563EB] font-bold">100% Tax Free u/s 10(10D)</div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleDownloadPDF}
                className="flex-1 btn-outline-gold py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4 text-[#D4AF37]" /> Download PDF Quote
              </button>
              <button
                onClick={handleWhatsAppSend}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" /> Send to WhatsApp
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
