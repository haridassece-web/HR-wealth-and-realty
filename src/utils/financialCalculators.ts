/**
 * Financial & Mathematical Calculation JavaScript Functions
 */

export interface SipResult {
  totalInvested: number;
  futureValue: number;
  totalReturns: number;
}

export interface EmiResult {
  monthlyEmi: number;
  totalInterest: number;
  totalPayable: number;
}

/**
 * Calculates Mutual Fund SIP Future Value
 */
export const calculateSIP = (
  monthly: number,
  annualRatePct: number,
  tenureYears: number
): SipResult => {
  const i = annualRatePct / 12 / 100;
  const n = tenureYears * 12;
  const totalInvested = monthly * n;
  const futureValue = Math.round(monthly * (((Math.pow(1 + i, n) - 1) / i) * (1 + i)));
  const totalReturns = Math.max(0, futureValue - totalInvested);
  return { totalInvested, futureValue, totalReturns };
};

/**
 * Calculates Recommended Life Insurance Sum Assured
 */
export const calculateInsuranceCover = (
  age: number,
  annualIncome: number,
  existingLoans: number = 0,
  dependentsCount: number = 2
): number => {
  const multiplier = age < 40 ? 15 : age < 50 ? 10 : 7;
  const incomeCover = annualIncome * multiplier;
  const totalCover = incomeCover + existingLoans + dependentsCount * 500000;
  return totalCover;
};

/**
 * Calculates Human Life Value (HLV)
 */
export const calculateHLV = (
  currentAge: number,
  retirementAge: number,
  annualIncome: number,
  personalExpensePct: number = 30
): number => {
  const yearsToRetire = Math.max(1, retirementAge - currentAge);
  const netFamilyIncome = annualIncome * (1 - personalExpensePct / 100);
  const hlv = Math.round(netFamilyIncome * yearsToRetire * 0.65);
  return hlv;
};

/**
 * Calculates Home Loan EMI
 */
export const calculateEMI = (
  loanAmount: number,
  annualRatePct: number,
  tenureYears: number
): EmiResult => {
  const r = annualRatePct / 12 / 100;
  const n = tenureYears * 12;
  const monthlyEmi = Math.round((loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
  const totalPayable = monthlyEmi * n;
  const totalInterest = totalPayable - loanAmount;
  return { monthlyEmi, totalInterest, totalPayable };
};

/**
 * Calculates estimated Section 80C Tax Benefit (30% slab, max cap 1.5L)
 */
export const calculateTaxSavedSec80C = (annualPremium: number): number => {
  return Math.round(Math.min(annualPremium * 0.312, 46800));
};
