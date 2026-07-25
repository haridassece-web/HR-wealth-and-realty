export type Role = 'Admin' | 'Advisor' | 'Employee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  mobile: string;
  avatar?: string;
  active: boolean;
}

export interface Customer {
  id: string;
  name: string;
  mobile: string;
  email: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  occupation: string;
  monthlyIncome: number;
  address: string;
  pan: string;
  aadhaar: string;
  nomineeName: string;
  nomineeRelation: string;
  createdAt: string;
  isDeleted?: boolean;
}

export type InsuranceCompany = 'Ageas Federal Life' | 'HDFC Life' | 'ICICI Prudential' | 'Tata AIA' | 'Max Life' | 'LIC';
export type PolicyStatus = 'Active' | 'Pending Renewal' | 'Lapsed' | 'Matured';
export type PaymentFrequency = 'Monthly' | 'Quarterly' | 'Half-Yearly' | 'Yearly';

export interface Policy {
  id: string;
  policyNumber: string;
  customerId: string;
  customerName: string;
  company: InsuranceCompany;
  productName: string;
  premiumAmount: number;
  frequency: PaymentFrequency;
  policyTermYears: number;
  pptYears: number; // Premium Paying Term
  startDate: string;
  maturityDate: string;
  nextRenewalDate: string;
  sumAssured: number; // Life Cover
  commissionPercentage: number;
  advisorCommissionAmount: number;
  maturityValueEstimate: number;
  nominee: string;
  status: PolicyStatus;
  advisorId: string;
  advisorName: string;
}

export type LeadStatus = 'New Lead' | 'Interested' | 'Follow-up' | 'Proposal Sent' | 'Closed Won' | 'Closed Lost';
export type LeadCategory = 'Insurance' | 'Real Estate' | 'Investment' | 'Wealth Bundle';

export interface Lead {
  id: string;
  name: string;
  mobile: string;
  email: string;
  category: LeadCategory;
  budget: number;
  status: LeadStatus;
  assignedAdvisorId: string;
  assignedAdvisorName: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export type FollowUpType = 'Call' | 'WhatsApp' | 'SMS' | 'Meeting' | 'Email';
export type FollowUpStatus = 'Scheduled' | 'Completed' | 'Overdue';

export interface FollowUp {
  id: string;
  leadId?: string;
  customerId?: string;
  contactName: string;
  contactMobile: string;
  type: FollowUpType;
  scheduledDate: string;
  time: string;
  notes: string;
  status: FollowUpStatus;
  assignedTo: string;
}

export type PropertyType = 'Apartment' | 'Villa' | 'Commercial Office' | 'Plot / Land' | 'Penthouse';
export type PropertyStatus = 'Available' | 'Under Offer' | 'Sold';

export interface Property {
  id: string;
  propertyName: string;
  ownerName: string;
  ownerMobile: string;
  type: PropertyType;
  location: string;
  city: string;
  price: number;
  areaSqFt: number;
  bedrooms: number;
  bathrooms: number;
  parkingSpots: number;
  images: string[];
  documents: string[];
  status: PropertyStatus;
  featured?: boolean;
  description: string;
}

export type GoalType = 'Retirement' | 'Child Education' | 'Wealth Creation' | 'Home Purchase' | 'Tax Saving';

export interface InvestmentPlan {
  id: string;
  customerId: string;
  customerName: string;
  goal: GoalType;
  targetAmount: number;
  investmentAmount: number;
  monthlySip: number;
  horizonYears: number;
  riskTolerance: 'Low' | 'Moderate' | 'High';
  recommendedAllocations: {
    category: string;
    percentage: number;
    amount: number;
    recommendedProducts: string[];
  }[];
  createdAt: string;
}

export interface CommissionRecord {
  id: string;
  policyId?: string;
  propertyId?: string;
  dealTitle: string;
  customerName: string;
  grossAmount: number;
  companyCommissionPct: number;
  advisorCommissionPct: number;
  advisorCommissionAmount: number;
  companyNetRevenue: number;
  advisorId: string;
  advisorName: string;
  date: string;
  month: string;
  year: number;
}

export interface SystemDocument {
  id: string;
  title: string;
  category: 'Aadhaar' | 'PAN' | 'Policy Copy' | 'Property Document' | 'Sale Agreement' | 'Financial Statement';
  associatedEntityName: string;
  fileUrl: string;
  fileSize: string;
  uploadedAt: string;
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'renewal' | 'birthday' | 'followup' | 'property';
  date: string;
  read: boolean;
}
