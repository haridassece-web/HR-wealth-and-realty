import React, { useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';

export const FinancialPlanner: React.FC = () => {
  const [monthlySip, setMonthlySip] = useState<number>(25000);
  const [investmentYears, setInvestmentYears] = useState<number>(15);
  const [expectedReturn, setExpectedReturn] = useState<number>(13); // 13% CAGR
  const [selectedGoal, setSelectedGoal] = useState<string>('Retirement');

  // SIP Compound Interest Formula
  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 12 / 100;
    const months = investmentYears * 12;
    const totalInvested = monthlySip * months;
    
    // Future Value formula = P * [({(1+r)^n} - 1) / r] * (1+r)
    const futureValue = monthlySip * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    const estimatedReturns = Math.max(0, futureValue - totalInvested);

    return {
      totalInvested: Math.round(totalInvested),
      futureValue: Math.round(futureValue),
      estimatedReturns: Math.round(estimatedReturns),
    };
  };

  const { totalInvested, futureValue, estimatedReturns } = calculateSIP();

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakhs`;
    return `₹${val.toLocaleString('en-IN')}`;
  };

  return (
    <section id="financial-planning" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            Smart Financial & Investment Engine
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Visualize Your <span className="gradient-gold-text">Wealth Growth</span>
          </h2>
          <p className="text-slate-300 text-base">
            Calculate your SIP compounded returns and get algorithmic asset allocation recommendation across Equity, Debt, Ageas Federal Guaranteed Plans & Real Estate.
          </p>
        </div>

        {/* SIP Calculator Container */}
        <div className="bg-[#0B132B] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Goal Buttons */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Select Primary Goal</label>
              <div className="grid grid-cols-3 gap-2">
                {['Retirement', 'Child Education', 'Wealth Creation'].map((goal) => (
                  <button
                    key={goal}
                    onClick={() => setSelectedGoal(goal)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      selectedGoal === goal
                        ? 'bg-amber-400 text-[#0B132B] border-amber-400 font-bold'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 1: Monthly Investment */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-300">Monthly SIP Amount</span>
                <span className="text-amber-400 text-lg font-bold font-heading">{formatCurrency(monthlySip)}</span>
              </div>
              <input
                type="range"
                min={5000}
                max={200000}
                step={5000}
                value={monthlySip}
                onChange={(e) => setMonthlySip(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                <span>₹5,000</span>
                <span>₹1,000,000</span>
                <span>₹200,000</span>
              </div>
            </div>

            {/* Slider 2: Horizon Years */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-300">Time Horizon (Years)</span>
                <span className="text-amber-400 text-lg font-bold font-heading">{investmentYears} Years</span>
              </div>
              <input
                type="range"
                min={3}
                max={30}
                step={1}
                value={investmentYears}
                onChange={(e) => setInvestmentYears(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                <span>3 Yrs</span>
                <span>15 Yrs</span>
                <span>30 Yrs</span>
              </div>
            </div>

            {/* Slider 3: Expected CAGR */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-300">Expected Annual Rate (CAGR)</span>
                <span className="text-emerald-400 text-lg font-bold font-heading">{expectedReturn}%</span>
              </div>
              <input
                type="range"
                min={6}
                max={18}
                step={0.5}
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                <span>6% (Debt/Guaranteed)</span>
                <span>12% (Balanced)</span>
                <span>18% (High Equity)</span>
              </div>
            </div>

          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-700/80 p-8 rounded-2xl space-y-6 shadow-xl">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Calculator className="w-4 h-4" /> Projected Goal Corpus
            </div>

            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">Expected Future Corpus</div>
              <div className="text-4xl font-extrabold text-amber-400 font-heading tracking-tight mt-1">
                {formatCurrency(futureValue)}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Total Invested Amount:</span>
                <span className="font-bold text-slate-200">{formatCurrency(totalInvested)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Estimated Wealth Gain:</span>
                <span className="font-bold text-emerald-400">{formatCurrency(estimatedReturns)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Goal Target:</span>
                <span className="font-bold text-cyan-400">{selectedGoal} Goal</span>
              </div>
            </div>

            <button
              onClick={() => {
                const elem = document.getElementById('contact');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full gradient-gold-bg text-[#0B132B] font-extrabold py-3.5 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider hover:shadow-lg transition-all"
            >
              Get Free Portfolio Plan <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
