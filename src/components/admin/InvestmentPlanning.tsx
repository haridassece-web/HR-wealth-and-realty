import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { GoalType } from '../../types';
import { PieChart, Sparkles } from 'lucide-react';

export const InvestmentPlanning: React.FC = () => {
  const { customers, addInvestmentPlan } = useApp();

  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0]?.id || '');
  const [goal, setGoal] = useState<GoalType>('Retirement');
  const [targetAmount, setTargetAmount] = useState<number>(20000000);
  const [investmentAmount] = useState<number>(500000);
  const [monthlySip, setMonthlySip] = useState<number>(35000);
  const [horizonYears, setHorizonYears] = useState<number>(15);
  const [riskTolerance, setRiskTolerance] = useState<'Low' | 'Moderate' | 'High'>('Moderate');

  const generateRecommendations = () => {
    let alloc = [];
    if (riskTolerance === 'Low') {
      alloc = [
        { category: 'Ageas Federal Assured Growth (Guaranteed)', percentage: 50, amount: Math.round(monthlySip * 0.5), recommendedProducts: ['Ageas Federal Smart Protection', 'Sovereign Gold Bonds'] },
        { category: 'Corporate Debt & Debt Mutual Funds', percentage: 30, amount: Math.round(monthlySip * 0.3), recommendedProducts: ['HDFC Corporate Bond Fund'] },
        { category: 'Index SIP Funds (Nifty 50)', percentage: 20, amount: Math.round(monthlySip * 0.2), recommendedProducts: ['UTI Nifty 50 Index'] },
      ];
    } else if (riskTolerance === 'Moderate') {
      alloc = [
        { category: 'Flexi Cap Equity SIP Mutual Funds', percentage: 50, amount: Math.round(monthlySip * 0.5), recommendedProducts: ['Parag Parikh Flexi Cap', 'Mirae Asset Large Cap'] },
        { category: 'Ageas Federal Guaranteed Income', percentage: 30, amount: Math.round(monthlySip * 0.3), recommendedProducts: ['Ageas Federal Assured Growth Plan'] },
        { category: 'Commercial Real Estate REITs', percentage: 20, amount: Math.round(monthlySip * 0.2), recommendedProducts: ['Embassy Office Parks REIT'] },
      ];
    } else {
      alloc = [
        { category: 'Small & Mid Cap High Growth Equity SIP', percentage: 60, amount: Math.round(monthlySip * 0.6), recommendedProducts: ['Nippon India Small Cap', 'Quant Mid Cap'] },
        { category: 'Ageas Federal Wealth Builder ULIP', percentage: 25, amount: Math.round(monthlySip * 0.25), recommendedProducts: ['Ageas Federal ULIP Wealth Builder'] },
        { category: 'Luxury Realty Fractional Ownership', percentage: 15, amount: Math.round(monthlySip * 0.15), recommendedProducts: ['HR Realty Pre-Leased Commercial Floor'] },
      ];
    }
    return alloc;
  };

  const handleCreatePlan = () => {
    const cust = customers.find(c => c.id === selectedCustomerId);
    const alloc = generateRecommendations();
    addInvestmentPlan({
      customerId: selectedCustomerId,
      customerName: cust ? cust.name : 'Vikramaditya Singh',
      goal,
      targetAmount,
      investmentAmount,
      monthlySip,
      horizonYears,
      riskTolerance,
      recommendedAllocations: alloc,
    });
  };

  const allocations = generateRecommendations();

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h2 className="text-xl font-bold font-heading text-white">Smart Investment & Goal Recommendation Engine</h2>
          <p className="text-xs text-slate-400">Algorithmic asset allocation across Equity SIPs, Ageas Federal Guaranteed Plans & Real Estate.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recommendation Controls */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-xl">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> Goal Parameters Inputs
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Select Client Profile</label>
              <select
                value={selectedCustomerId}
                onChange={(e) => setSelectedCustomerId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
              >
                {customers.map(c => <option key={c.id} value={c.id}>{c.name} ({c.occupation})</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Goal Type</label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                >
                  <option value="Retirement">Retirement</option>
                  <option value="Child Education">Child Education</option>
                  <option value="Wealth Creation">Wealth Creation</option>
                  <option value="Home Purchase">Home Purchase</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Risk Appetite</label>
                <select
                  value={riskTolerance}
                  onChange={(e) => setRiskTolerance(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm font-bold text-amber-400"
                >
                  <option value="Low">Low Risk (Capital Protect)</option>
                  <option value="Moderate">Moderate (Balanced)</option>
                  <option value="High">High Growth (Aggressive)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Goal Corpus (₹)</label>
                <input
                  type="number"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Monthly SIP Budget (₹)</label>
                <input
                  type="number"
                  value={monthlySip}
                  onChange={(e) => setMonthlySip(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Investment Horizon ({horizonYears} Years)</label>
              <input
                type="range"
                min={3}
                max={30}
                value={horizonYears}
                onChange={(e) => setHorizonYears(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Live Recommendation Output */}
        <div className="lg:col-span-6 bg-[#0B132B] border border-amber-400/30 p-8 rounded-3xl space-y-6 shadow-2xl">
          <div className="flex justify-between items-center">
            <div className="text-amber-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <PieChart className="w-4 h-4" /> Algorithmic Portfolio Mix
            </div>
            <span className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-bold">
              {riskTolerance} Risk Profile
            </span>
          </div>

          <div className="space-y-4">
            {allocations.map((item, idx) => (
              <div key={idx} className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-white">{item.category}</span>
                  <span className="text-amber-400 font-heading text-sm">{item.percentage}% (₹{item.amount.toLocaleString()}/mo)</span>
                </div>

                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400" style={{ width: `${item.percentage}%` }} />
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {item.recommendedProducts.map((p, pIdx) => (
                    <span key={pIdx} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleCreatePlan}
            className="w-full gradient-gold-bg text-[#0B132B] font-extrabold py-3.5 rounded-xl uppercase tracking-wider text-xs hover:shadow-xl transition-all"
          >
            Save & Dispatch Portfolio Proposal
          </button>
        </div>

      </div>

    </div>
  );
};
