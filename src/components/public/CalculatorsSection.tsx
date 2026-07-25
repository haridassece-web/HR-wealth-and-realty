import React, { useState } from 'react';
import { Calculator, TrendingUp, Shield, Heart, Landmark, GraduationCap, Home, Send, CheckCircle2, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';

export const CalculatorsSection: React.FC = () => {
  const { addLead } = useApp();
  const { t } = useLanguage();

  const [activeCalc, setActiveCalc] = useState<
    'sip' | 'insurance' | 'hlv' | 'retirement' | 'child' | 'emi'
  >('sip');

  // Lead capture state
  const [calcLeadName, setCalcLeadName] = useState('');
  const [calcLeadMobile, setCalcLeadMobile] = useState('');
  const [calcLeadSubmitted, setCalcLeadSubmitted] = useState(false);

  // 1. SIP State
  const [sipMonthly, setSipMonthly] = useState(10000);
  const [sipReturnRate, setSipReturnRate] = useState(12);
  const [sipYears, setSipYears] = useState(15);

  // 2. Life Insurance State
  const [insAge, setInsAge] = useState(32);
  const [insIncome, setInsIncome] = useState(1200000);
  const [insLoans, setInsLoans] = useState(3000000);
  const [insDependents, setInsDependents] = useState(3);

  // 3. HLV State
  const [hlvCurrentAge, setHlvCurrentAge] = useState(30);
  const [hlvRetireAge, setHlvRetireAge] = useState(60);
  const [hlvAnnualIncome, setHlvAnnualIncome] = useState(1500000);
  const [hlvPersonalExpPct, setHlvPersonalExpPct] = useState(30);

  // 4. Retirement State
  const [retCurrentAge, setRetCurrentAge] = useState(30);
  const [retAge, setRetAge] = useState(60);
  const [retMonthlyExp, setRetMonthlyExp] = useState(50000);
  const [retInflation, setRetInflation] = useState(6);

  // 5. Child Education State
  const [childAge, setChildAge] = useState(5);
  const [collegeAge, setCollegeAge] = useState(18);
  const [currentCost, setCurrentCost] = useState(1500000);
  const [eduInflation, setEduInflation] = useState(8);

  // 6. Home Loan EMI State
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenureYears, setLoanTenureYears] = useState(20);

  // Math Calculations

  // 1. SIP Math
  const calculateSIP = () => {
    const i = sipReturnRate / 12 / 100;
    const n = sipYears * 12;
    const totalInvested = sipMonthly * n;
    const futureValue = Math.round(sipMonthly * (((Math.pow(1 + i, n) - 1) / i) * (1 + i)));
    const totalReturns = Math.max(0, futureValue - totalInvested);
    return { totalInvested, futureValue, totalReturns };
  };

  // 2. Insurance Cover Math
  const calculateInsuranceCover = () => {
    const multiplier = insAge < 40 ? 15 : insAge < 50 ? 10 : 7;
    const incomeCover = insIncome * multiplier;
    const totalRecommendedCover = incomeCover + insLoans + (insDependents * 500000);
    return totalRecommendedCover;
  };

  // 3. HLV Math
  const calculateHLV = () => {
    const yearsToRetire = Math.max(1, hlvRetireAge - hlvCurrentAge);
    const netIncomeForFamily = hlvAnnualIncome * (1 - hlvPersonalExpPct / 100);
    const totalHLV = Math.round(netIncomeForFamily * yearsToRetire * 0.65);
    return totalHLV;
  };

  // 4. Retirement Math
  const calculateRetirement = () => {
    const yearsLeft = Math.max(1, retAge - retCurrentAge);
    const futureMonthlyExp = retMonthlyExp * Math.pow(1 + retInflation / 100, yearsLeft);
    const requiredCorpus = Math.round(futureMonthlyExp * 12 * 22);
    const requiredMonthlySip = Math.round(requiredCorpus / (((Math.pow(1 + 0.01, yearsLeft * 12) - 1) / 0.01) * 1.01));
    return { futureMonthlyExp: Math.round(futureMonthlyExp), requiredCorpus, requiredMonthlySip };
  };

  // 5. Child Edu Math
  const calculateChildEdu = () => {
    const yearsLeft = Math.max(1, collegeAge - childAge);
    const futureCost = Math.round(currentCost * Math.pow(1 + eduInflation / 100, yearsLeft));
    const requiredMonthlySip = Math.round(futureCost / (((Math.pow(1 + 0.01, yearsLeft * 12) - 1) / 0.01) * 1.01));
    return { futureCost, requiredMonthlySip };
  };

  // 6. EMI Math
  const calculateEMI = () => {
    const r = interestRate / 12 / 100;
    const n = loanTenureYears * 12;
    const monthlyEmi = Math.round((loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    const totalPayable = monthlyEmi * n;
    const totalInterest = totalPayable - loanAmount;
    return { monthlyEmi, totalPayable, totalInterest };
  };

  const formatLakhs = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakhs`;
    return `₹${val.toLocaleString('en-IN')}`;
  };

  const sip = calculateSIP();
  const cover = calculateInsuranceCover();
  const hlv = calculateHLV();
  const ret = calculateRetirement();
  const child = calculateChildEdu();
  const emi = calculateEMI();

  const handleCalculatorLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!calcLeadName || !calcLeadMobile) return;

    addLead({
      name: calcLeadName,
      mobile: calcLeadMobile,
      email: 'calc.lead@client.com',
      category: activeCalc === 'emi' ? 'Real Estate' : activeCalc === 'insurance' || activeCalc === 'hlv' ? 'Insurance' : 'Investment',
      budget: activeCalc === 'sip' ? sipMonthly * 12 : 1200000,
      status: 'New Lead',
      assignedAdvisorId: 'usr-1',
      assignedAdvisorName: 'Haridass R',
      notes: `Lead generated from ${activeCalc.toUpperCase()} Calculator. Details submitted by user for official report.`,
    });

    setCalcLeadSubmitted(true);
    setTimeout(() => setCalcLeadSubmitted(false), 5000);
  };

  return (
    <section id="calculators" className="py-20 bg-[#07152F] text-white relative border-b border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-4 h-4 text-[#D4AF37]" /> {t('calcBadge')}
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
            {t('calcTitle')}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            {t('calcSub')}
          </p>
        </div>

        {/* Calculator Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveCalc('sip')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeCalc === 'sip'
                ? 'gradient-gold-bg text-[#07152F] shadow-lg shadow-amber-500/20'
                : 'bg-[#0F1E3C] border border-slate-700 text-slate-300 hover:border-[#D4AF37]'
            }`}
          >
            <TrendingUp className="w-4 h-4" /> {t('tabSip')}
          </button>

          <button
            onClick={() => setActiveCalc('insurance')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeCalc === 'insurance'
                ? 'gradient-gold-bg text-[#07152F] shadow-lg shadow-amber-500/20'
                : 'bg-[#0F1E3C] border border-slate-700 text-slate-300 hover:border-[#D4AF37]'
            }`}
          >
            <Shield className="w-4 h-4" /> {t('navInsurance')}
          </button>

          <button
            onClick={() => setActiveCalc('hlv')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeCalc === 'hlv'
                ? 'gradient-gold-bg text-[#07152F] shadow-lg shadow-amber-500/20'
                : 'bg-[#0F1E3C] border border-slate-700 text-slate-300 hover:border-[#D4AF37]'
            }`}
          >
            <Heart className="w-4 h-4" /> {t('tabHlv')}
          </button>

          <button
            onClick={() => setActiveCalc('retirement')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeCalc === 'retirement'
                ? 'gradient-gold-bg text-[#07152F] shadow-lg shadow-amber-500/20'
                : 'bg-[#0F1E3C] border border-slate-700 text-slate-300 hover:border-[#D4AF37]'
            }`}
          >
            <Landmark className="w-4 h-4" /> {t('tabTax')}
          </button>

          <button
            onClick={() => setActiveCalc('child')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeCalc === 'child'
                ? 'gradient-gold-bg text-[#07152F] shadow-lg shadow-amber-500/20'
                : 'bg-[#0F1E3C] border border-slate-700 text-slate-300 hover:border-[#D4AF37]'
            }`}
          >
            <GraduationCap className="w-4 h-4" /> Child Edu Planner
          </button>

          <button
            onClick={() => setActiveCalc('emi')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeCalc === 'emi'
                ? 'gradient-gold-bg text-[#07152F] shadow-lg shadow-amber-500/20'
                : 'bg-[#0F1E3C] border border-slate-700 text-slate-300 hover:border-[#D4AF37]'
            }`}
          >
            <Home className="w-4 h-4" /> EMI Calculator
          </button>
        </div>

        {/* Calculator Display Panel */}
        <div className="bg-[#0F1E3C] border border-[#D4AF37]/30 p-6 sm:p-10 rounded-3xl shadow-2xl max-w-4xl mx-auto space-y-8">
          
          {/* 1. SIP CALCULATOR */}
          {activeCalc === 'sip' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                    <span>Monthly Investment Budget</span>
                    <span className="text-[#D4AF37]">₹{sipMonthly.toLocaleString('en-IN')} / month</span>
                  </div>
                  <input
                    type="range"
                    min={1000}
                    max={200000}
                    step={1000}
                    value={sipMonthly}
                    onChange={(e) => setSipMonthly(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                    <span>Expected Annual Return (%)</span>
                    <span className="text-[#2563EB]">{sipReturnRate}% p.a.</span>
                  </div>
                  <input
                    type="range"
                    min={6}
                    max={20}
                    step={0.5}
                    value={sipReturnRate}
                    onChange={(e) => setSipReturnRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                    <span>Investment Duration (Years)</span>
                    <span className="text-emerald-400">{sipYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={30}
                    value={sipYears}
                    onChange={(e) => setSipYears(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#07152F] p-6 rounded-2xl border border-[#D4AF37]/30 space-y-4 text-center">
                <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Estimated Wealth Corpus</div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#D4AF37] font-heading">
                  {formatLakhs(sip.futureValue)}
                </div>

                <div className="space-y-2 text-xs pt-3 border-t border-slate-800 text-left">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Invested Amount:</span>
                    <span className="text-white font-bold">₹{sip.totalInvested.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Est. Wealth Gain:</span>
                    <span className="text-emerald-400 font-bold">₹{sip.totalReturns.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. LIFE INSURANCE CALCULATOR */}
          {activeCalc === 'insurance' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Your Age ({insAge} Years)</label>
                  <input
                    type="range"
                    min={18}
                    max={60}
                    value={insAge}
                    onChange={(e) => setInsAge(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Annual Take-Home Income (₹)</label>
                  <input
                    type="number"
                    value={insIncome}
                    onChange={(e) => setInsIncome(Number(e.target.value))}
                    className="form-input text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Existing Loans / Liabilities (₹)</label>
                    <input
                      type="number"
                      value={insLoans}
                      onChange={(e) => setInsLoans(Number(e.target.value))}
                      className="form-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">No. of Family Dependents</label>
                    <input
                      type="number"
                      value={insDependents}
                      onChange={(e) => setInsDependents(Number(e.target.value))}
                      className="form-input text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#07152F] p-6 rounded-2xl border border-amber-400/30 space-y-4 text-center">
                <div className="text-xs text-amber-400 uppercase tracking-wider font-bold">Recommended Life Cover</div>
                <div className="text-3xl font-extrabold text-white font-heading">
                  {formatLakhs(cover)}
                </div>
                <p className="text-[11px] text-slate-400">Provides 100% tax-free family security with Ageas Federal Smart Protection Plan.</p>
              </div>
            </div>
          )}

          {/* 3. HLV CALCULATOR */}
          {activeCalc === 'hlv' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
              <div className="lg:col-span-7 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Current Age ({hlvCurrentAge} Yrs)</label>
                    <input
                      type="range"
                      min={20}
                      max={55}
                      value={hlvCurrentAge}
                      onChange={(e) => setHlvCurrentAge(Number(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Target Retirement ({hlvRetireAge} Yrs)</label>
                    <input
                      type="range"
                      min={50}
                      max={70}
                      value={hlvRetireAge}
                      onChange={(e) => setHlvRetireAge(Number(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Annual Gross Income (₹)</label>
                  <input
                    type="number"
                    value={hlvAnnualIncome}
                    onChange={(e) => setHlvAnnualIncome(Number(e.target.value))}
                    className="form-input text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Personal Expense Percentage ({hlvPersonalExpPct}%)</label>
                  <input
                    type="range"
                    min={10}
                    max={50}
                    value={hlvPersonalExpPct}
                    onChange={(e) => setHlvPersonalExpPct(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#07152F] p-6 rounded-2xl border border-[#D4AF37]/30 space-y-4 text-center">
                <div className="text-xs text-[#D4AF37] uppercase tracking-wider font-bold">Economic Human Life Value (HLV)</div>
                <div className="text-3xl font-extrabold text-white font-heading">
                  {formatLakhs(hlv)}
                </div>
                <p className="text-[11px] text-slate-400">Total economic financial value generated for your family throughout your earning career.</p>
              </div>
            </div>
          )}

          {/* 4. RETIREMENT PLANNER */}
          {activeCalc === 'retirement' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
              <div className="lg:col-span-7 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Current Age ({retCurrentAge})</label>
                    <input
                      type="range"
                      min={20}
                      max={55}
                      value={retCurrentAge}
                      onChange={(e) => setRetCurrentAge(Number(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Retirement Age ({retAge})</label>
                    <input
                      type="range"
                      min={50}
                      max={70}
                      value={retAge}
                      onChange={(e) => setRetAge(Number(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Current Household Monthly Expense (₹)</label>
                  <input
                    type="number"
                    value={retMonthlyExp}
                    onChange={(e) => setRetMonthlyExp(Number(e.target.value))}
                    className="form-input text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Inflation Rate ({retInflation}%)</label>
                  <input
                    type="range"
                    min={4}
                    max={12}
                    value={retInflation}
                    onChange={(e) => setRetInflation(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#07152F] p-6 rounded-2xl border border-emerald-500/30 space-y-4 text-center">
                <div className="text-xs text-emerald-400 uppercase tracking-wider font-bold">Required Retirement Corpus</div>
                <div className="text-3xl font-extrabold text-white font-heading">
                  {formatLakhs(ret.requiredCorpus)}
                </div>
                <div className="text-xs text-slate-300 pt-2 border-t border-slate-800">
                  Required Monthly SIP: <span className="text-[#D4AF37] font-bold">₹{ret.requiredMonthlySip.toLocaleString('en-IN')}/mo</span>
                </div>
              </div>
            </div>
          )}

          {/* 5. CHILD EDUCATION PLANNER */}
          {activeCalc === 'child' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
              <div className="lg:col-span-7 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Child's Current Age ({childAge})</label>
                    <input
                      type="range"
                      min={0}
                      max={15}
                      value={childAge}
                      onChange={(e) => setChildAge(Number(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">College Entry Age ({collegeAge})</label>
                    <input
                      type="range"
                      min={16}
                      max={22}
                      value={collegeAge}
                      onChange={(e) => setCollegeAge(Number(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Today's Course Cost (₹)</label>
                  <input
                    type="number"
                    value={currentCost}
                    onChange={(e) => setCurrentCost(Number(e.target.value))}
                    className="form-input text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Education Inflation ({eduInflation}%)</label>
                  <input
                    type="range"
                    min={5}
                    max={14}
                    value={eduInflation}
                    onChange={(e) => setEduInflation(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
                  />
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#07152F] p-6 rounded-2xl border border-[#4DA3FF]/30 space-y-4 text-center">
                <div className="text-xs text-[#4DA3FF] uppercase tracking-wider font-bold">Future Higher Education Target</div>
                <div className="text-3xl font-extrabold text-white font-heading">
                  {formatLakhs(child.futureCost)}
                </div>
                <div className="text-xs text-slate-300 pt-2 border-t border-slate-800">
                  Required SIP: <span className="text-[#D4AF37] font-bold">₹{child.requiredMonthlySip.toLocaleString('en-IN')}/mo</span>
                </div>
              </div>
            </div>
          )}

          {/* 6. HOME LOAN EMI CALCULATOR */}
          {activeCalc === 'emi' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Property Loan Amount (₹)</label>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="form-input text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Interest Rate ({interestRate}%)</label>
                    <input
                      type="range"
                      min={6}
                      max={14}
                      step={0.1}
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Loan Tenure ({loanTenureYears} Years)</label>
                    <input
                      type="range"
                      min={5}
                      max={30}
                      value={loanTenureYears}
                      onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#07152F] p-6 rounded-2xl border border-emerald-400/30 space-y-4 text-center">
                <div className="text-xs text-emerald-400 uppercase tracking-wider font-bold">Monthly Home Loan EMI</div>
                <div className="text-3xl font-extrabold text-white font-heading">
                  ₹{emi.monthlyEmi.toLocaleString('en-IN')}
                </div>

                <div className="space-y-1 text-xs pt-3 border-t border-slate-800 text-left">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Interest Payable:</span>
                    <span className="text-amber-400 font-bold">₹{emi.totalInterest.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Loan Amount + Interest:</span>
                    <span className="text-white font-bold">₹{emi.totalPayable.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* High-Converting Lead Generation Action Bar */}
          <div className="pt-6 border-t border-slate-800">
            <div className="bg-[#07152F] p-6 rounded-2xl border border-[#D4AF37]/30 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm font-heading flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#D4AF37]" /> Download Full PDF Report & Expert Consultation
                  </h4>
                  <p className="text-xs text-slate-400">Enter your name & mobile number to get this calculation sent to your WhatsApp.</p>
                </div>
              </div>

              {calcLeadSubmitted ? (
                <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-center text-xs text-emerald-300 font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Calculation details saved! Our Senior Advisor will WhatsApp your PDF report shortly.
                </div>
              ) : (
                <form onSubmit={handleCalculatorLeadSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name *"
                    value={calcLeadName}
                    onChange={(e) => setCalcLeadName(e.target.value)}
                    className="form-input text-xs flex-1"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Mobile Number (+91) *"
                    value={calcLeadMobile}
                    onChange={(e) => setCalcLeadMobile(e.target.value)}
                    className="form-input text-xs flex-1"
                  />
                  <button
                    type="submit"
                    className="btn-gold text-xs uppercase tracking-wider font-extrabold shrink-0 py-2.5 px-6 flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" /> Get PDF Breakdown
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
