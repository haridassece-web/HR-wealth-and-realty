import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, RefreshCw, Send } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AIRecommendationEngine: React.FC = () => {
  const { addLead } = useApp();

  const [step, setStep] = useState(1);
  const [age, setAge] = useState(32);
  const [monthlyIncome, setMonthlyIncome] = useState('150000');
  const [occupation, setOccupation] = useState('Salaried Professional');
  const [familyStatus, setFamilyStatus] = useState('Married with Kids');
  const [goal, setGoal] = useState('Capital Protection & Wealth');
  const [budget, setBudget] = useState(25000);
  const [leadName, setLeadName] = useState('');
  const [leadMobile, setLeadMobile] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Recommendation Calculation Logic
  const getRecommendation = () => {
    const incomeNum = Number(monthlyIncome) || 100000;
    
    let insurancePlan = 'Ageas Federal Smart Protection Term Plan';
    let termCover = `₹${((incomeNum * 12 * 15) / 10000000).toFixed(1)} Crores`;
    let sipAllocation = '60% Equity Flexi-Cap + 40% Guaranteed Income';
    let propertyRealty = 'Pre-Leased Commercial REIT / Coastal Luxury Villa';
    let estimatedTaxSaved = '₹46,800 / year u/s 80C';

    if (goal.includes('Tax Saving')) {
      insurancePlan = 'Ageas Federal Magic Savings Plan';
      sipAllocation = '50% ELSS Tax Saver + 50% Ageas Federal Assured Growth';
    } else if (goal.includes('Retirement')) {
      insurancePlan = 'Ageas Federal Guaranteed Wealth Plan';
      sipAllocation = '70% High-Growth Equity SIP + 30% Sovereign Gold';
    } else if (goal.includes('Property')) {
      propertyRealty = 'Financial District Gated Penthouse / ECR Beachfront Villa';
    }

    return {
      insurancePlan,
      termCover,
      sipAllocation,
      propertyRealty,
      estimatedTaxSaved,
    };
  };

  const rec = getRecommendation();

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadMobile) return;
    addLead({
      name: leadName,
      mobile: leadMobile,
      email: 'ai.recommendation@client.com',
      category: 'Wealth Bundle',
      budget: budget * 12,
      status: 'New Lead',
      assignedAdvisorId: 'usr-2',
      assignedAdvisorName: 'Ananya Sharma',
      notes: `AI Recommendation Generated. Age: ${age}, Income: ₹${monthlyIncome}, Goal: ${goal}, Monthly SIP: ₹${budget}`,
    });
    setSubmitted(true);
  };

  return (
    <section id="ai-engine" className="py-20 bg-[#07152F] text-white relative border-b border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#D4AF37] animate-spin" /> Smart AI Portfolio Recommendation Engine
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
            Personalized Wealth & Asset <span className="gradient-gold-text">Advisor</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Answer a few quick questions to receive an algorithmic portfolio recommendation across Insurance, SIPs, Tax Optimization, and Luxury Real Estate.
          </p>
        </div>

        {/* AI Wizard Box */}
        <div className="max-w-4xl mx-auto bg-[#0F1E3C] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          
          {/* Progress Indicator Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-6 mb-8 text-xs font-bold text-slate-300">
            <span className={step >= 1 ? 'text-[#D4AF37]' : ''}>1. Profile Inputs</span>
            <span className={step >= 2 ? 'text-[#D4AF37]' : ''}>2. Goals & Budget</span>
            <span className={step >= 3 ? 'text-[#D4AF37]' : ''}>3. AI Solution</span>
          </div>

          {/* STEP 1: Profile Inputs */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">Your Current Age ({age} Years)</label>
                  <input
                    type="range"
                    min={18}
                    max={65}
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">Monthly Take-Home Income (₹)</label>
                  <select
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value)}
                    className="form-input text-xs font-semibold"
                  >
                    <option value="75000">₹50,000 - ₹1,00,000 / month</option>
                    <option value="150000">₹1,00,000 - ₹2,50,000 / month</option>
                    <option value="350000">₹2,50,000 - ₹5,00,000 / month</option>
                    <option value="750000">Above ₹5,00,000 / month (HNI)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">Occupation / Profession</label>
                  <select
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    className="form-input text-xs"
                  >
                    <option value="Salaried Professional">IT / Salaried Corporate Professional</option>
                    <option value="Business Owner">Business Owner / Entrepreneur</option>
                    <option value="Doctor/Lawyer">Medical Specialist / Legal Professional</option>
                    <option value="NRI">Non-Resident Indian (NRI)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">Family Status</label>
                  <select
                    value={familyStatus}
                    onChange={(e) => setFamilyStatus(e.target.value)}
                    className="form-input text-xs"
                  >
                    <option value="Single">Single / Early Career</option>
                    <option value="Married with Kids">Married with Young Children</option>
                    <option value="Parents Dependent">Married with Dependent Parents</option>
                    <option value="Senior Citizen">Pre-Retirement / Senior</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="btn-gold py-3 px-8 text-xs uppercase tracking-wider font-extrabold flex items-center gap-2"
                >
                  Next: Financial Goals <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Goals & Budget */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <label className="block text-xs font-bold text-[#D4AF37] mb-2">Primary Financial Objective</label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="form-input text-xs font-bold text-white"
                >
                  <option value="Capital Protection & Wealth">Capital Protection + Guaranteed Wealth</option>
                  <option value="Tax Saving & Sec 80C">Maximum Tax Saving u/s 80C & 10(10D)</option>
                  <option value="Higher Education Fund">Child Higher Education Fund</option>
                  <option value="Retirement Corpus">Early Retirement & Pension Corpus</option>
                  <option value="Property Investment">Luxury Villa & Real Estate Investment</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                  <span>Monthly Investment / Savings Budget</span>
                  <span className="text-[#D4AF37]">₹{budget.toLocaleString('en-IN')} / month</span>
                </div>
                <input
                  type="range"
                  min={5000}
                  max={200000}
                  step={5000}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-slate-400 hover:text-white font-bold"
                >
                  ← Back to Profile
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="btn-gold py-3 px-8 text-xs uppercase tracking-wider font-extrabold flex items-center gap-2"
                >
                  Generate AI Solution <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: AI Recommendation Output */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-wider">AI Tailored Portfolio</span>
                  <h3 className="text-xl font-bold font-heading text-white">Recommended Allocation Strategy</h3>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-xl"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Re-calculate
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#07152F] border border-amber-400/30 space-y-1">
                  <div className="text-[10px] text-amber-400 uppercase font-bold">Recommended Life Insurance Plan</div>
                  <div className="text-sm font-bold text-white">{rec.insurancePlan}</div>
                  <div className="text-xs text-emerald-400 font-semibold">Recommended Cover: {rec.termCover}</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#07152F] border border-blue-500/30 space-y-1">
                  <div className="text-[10px] text-[#2563EB] uppercase font-bold">SIP Asset Allocation</div>
                  <div className="text-sm font-bold text-white">{rec.sipAllocation}</div>
                  <div className="text-xs text-slate-300 font-semibold">Monthly Budget: ₹{budget.toLocaleString('en-IN')}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#07152F] border border-emerald-500/30 space-y-1">
                  <div className="text-[10px] text-emerald-400 uppercase font-bold">Matching Real Estate Asset</div>
                  <div className="text-sm font-bold text-white">{rec.propertyRealty}</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#07152F] border border-purple-500/30 space-y-1">
                  <div className="text-[10px] text-purple-400 uppercase font-bold">Tax Savings Benefit</div>
                  <div className="text-sm font-bold text-white">{rec.estimatedTaxSaved}</div>
                </div>
              </div>

              {/* Lead Capture form for Advisor Call */}
              <div className="pt-4 border-t border-slate-800 space-y-4">
                <div className="text-xs font-bold text-slate-300">Request Official Policy Brochure & Advisory Call</div>
                
                {submitted ? (
                  <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-center text-xs text-emerald-300 font-bold flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    AI Recommendation saved! Senior Wealth Manager will connect shortly.
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="form-input text-xs flex-1"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Mobile Number (+91)"
                      value={leadMobile}
                      onChange={(e) => setLeadMobile(e.target.value)}
                      className="form-input text-xs flex-1"
                    />
                    <button
                      type="submit"
                      className="btn-gold text-xs uppercase tracking-wider font-extrabold shrink-0 py-2.5 px-6"
                    >
                      <Send className="w-3.5 h-3.5" /> Speak to Advisor
                    </button>
                  </form>
                )}
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
