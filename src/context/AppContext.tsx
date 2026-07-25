import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  User, Customer, Policy, Lead, FollowUp, Property, InvestmentPlan,
  CommissionRecord, SystemDocument, AppNotification, AuditLog, Role
} from '../types';
import {
  initialUsers, initialCustomers, initialPolicies, initialProperties,
  initialLeads, initialFollowUps, initialCommissions, initialInvestmentPlans,
  initialDocuments, initialNotifications, initialAuditLogs
} from '../data/mockData';

import {
  customerService, policyService, leadService, propertyService,
  investmentService, documentService
} from '../services';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  customers: Customer[];
  policies: Policy[];
  properties: Property[];
  leads: Lead[];
  followUps: FollowUp[];
  commissions: CommissionRecord[];
  investmentPlans: InvestmentPlan[];
  documents: SystemDocument[];
  notifications: AppNotification[];
  auditLogs: AuditLog[];
  activeView: 'public' | 'admin';
  activeTab: string;
  isApiConnected: boolean;
  setActiveView: (view: 'public' | 'admin') => void;
  setActiveTab: (tab: string) => void;
  login: (email: string, role: Role) => boolean;
  logout: () => void;
  switchRole: (role: Role) => void;
  refreshFromBackend: () => Promise<void>;
  
  // CRUD actions
  addCustomer: (customer: Omit<Customer, 'id' | 'createdAt'>) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  softDeleteCustomer: (id: string) => void;
  restoreCustomer: (id: string) => void;

  addPolicy: (policy: Omit<Policy, 'id'>) => void;
  updatePolicy: (id: string, policy: Partial<Policy>) => void;
  deletePolicy: (id: string) => void;

  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateLeadStatus: (id: string, status: Lead['status']) => void;
  updateLead: (id: string, lead: Partial<Lead>) => void;

  addFollowUp: (followUp: Omit<FollowUp, 'id'>) => void;
  completeFollowUp: (id: string) => void;

  addProperty: (property: Omit<Property, 'id'>) => void;
  updateProperty: (id: string, property: Partial<Property>) => void;

  addInvestmentPlan: (plan: Omit<InvestmentPlan, 'id' | 'createdAt'>) => void;

  addDocument: (doc: Omit<SystemDocument, 'id' | 'uploadedAt'>) => void;
  markNotificationRead: (id: string) => void;
  addAuditLog: (action: string, details: string) => void;
  
  // Data reset / backup / restore
  exportSystemData: () => string;
  importSystemData: (jsonData: string) => boolean;
  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from local storage or fall back to defaults
  const loadInitialState = <T,>(key: string, fallback: T): T => {
    const saved = localStorage.getItem(`hr_wealthy_${key}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(`Failed to parse localStorage key hr_wealthy_${key}`, e);
      }
    }
    return fallback;
  };

  const [users, setUsers] = useState<User[]>(() => loadInitialState('users', initialUsers));
  const [currentUser, setCurrentUser] = useState<User | null>(() => loadInitialState('currentUser', initialUsers[0]));
  const [customers, setCustomers] = useState<Customer[]>(() => loadInitialState('customers', initialCustomers));
  const [policies, setPolicies] = useState<Policy[]>(() => loadInitialState('policies', initialPolicies));
  const [properties, setProperties] = useState<Property[]>(() => loadInitialState('properties', initialProperties));
  const [leads, setLeads] = useState<Lead[]>(() => loadInitialState('leads', initialLeads));
  const [followUps, setFollowUps] = useState<FollowUp[]>(() => loadInitialState('followUps', initialFollowUps));
  const [commissions, setCommissions] = useState<CommissionRecord[]>(() => loadInitialState('commissions', initialCommissions));
  const [investmentPlans, setInvestmentPlans] = useState<InvestmentPlan[]>(() => loadInitialState('investmentPlans', initialInvestmentPlans));
  const [documents, setDocuments] = useState<SystemDocument[]>(() => loadInitialState('documents', initialDocuments));
  const [notifications, setNotifications] = useState<AppNotification[]>(() => loadInitialState('notifications', initialNotifications));
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => loadInitialState('auditLogs', initialAuditLogs));

  const [activeView, setActiveView] = useState<'public' | 'admin'>('public');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isApiConnected, setIsApiConnected] = useState<boolean>(false);

  // Persistence triggers
  useEffect(() => { localStorage.setItem('hr_wealthy_users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('hr_wealthy_currentUser', JSON.stringify(currentUser)); }, [currentUser]);
  useEffect(() => { localStorage.setItem('hr_wealthy_customers', JSON.stringify(customers)); }, [customers]);
  useEffect(() => { localStorage.setItem('hr_wealthy_policies', JSON.stringify(policies)); }, [policies]);
  useEffect(() => { localStorage.setItem('hr_wealthy_properties', JSON.stringify(properties)); }, [properties]);
  useEffect(() => { localStorage.setItem('hr_wealthy_leads', JSON.stringify(leads)); }, [leads]);
  useEffect(() => { localStorage.setItem('hr_wealthy_followUps', JSON.stringify(followUps)); }, [followUps]);
  useEffect(() => { localStorage.setItem('hr_wealthy_commissions', JSON.stringify(commissions)); }, [commissions]);
  useEffect(() => { localStorage.setItem('hr_wealthy_investmentPlans', JSON.stringify(investmentPlans)); }, [investmentPlans]);
  useEffect(() => { localStorage.setItem('hr_wealthy_documents', JSON.stringify(documents)); }, [documents]);
  useEffect(() => { localStorage.setItem('hr_wealthy_notifications', JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { localStorage.setItem('hr_wealthy_auditLogs', JSON.stringify(auditLogs)); }, [auditLogs]);

  // Attempt sync from Backend API endpoints on mount
  const refreshFromBackend = async () => {
    try {
      const custRes = await customerService.getAll();
      if (custRes.data && Array.isArray(custRes.data)) {
        setCustomers(custRes.data);
        setIsApiConnected(true);
      }
      const polRes = await policyService.getAll();
      if (polRes.data && Array.isArray(polRes.data)) setPolicies(polRes.data);
      
      const propRes = await propertyService.getAll();
      if (propRes.data && Array.isArray(propRes.data)) setProperties(propRes.data);

      const leadRes = await leadService.getAllLeads();
      if (leadRes.data && Array.isArray(leadRes.data)) setLeads(leadRes.data);

      const planRes = await investmentService.getAllPlans();
      if (planRes.data && Array.isArray(planRes.data)) setInvestmentPlans(planRes.data);

      const docRes = await documentService.getAll();
      if (docRes.data && Array.isArray(docRes.data)) setDocuments(docRes.data);
    } catch (e) {
      // Backend not yet running or offline; remain in fallback mode smoothly
      setIsApiConnected(false);
    }
  };

  useEffect(() => {
    refreshFromBackend();
  }, []);

  const addAuditLog = (action: string, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      user: currentUser ? `${currentUser.name} (${currentUser.role})` : 'System',
      action,
      details,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const login = (email: string, role: Role): boolean => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() || u.role === role);
    if (user) {
      setCurrentUser({ ...user, role });
      addAuditLog('LOGIN', `Logged in as ${user.name} with role ${role}`);
      return true;
    }
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].toUpperCase(),
      email,
      role,
      mobile: '+91 99999 88888',
      active: true,
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    addAuditLog('LOGIN_NEW_USER', `Created & logged in user ${newUser.name} with role ${role}`);
    return true;
  };

  const logout = () => {
    if (currentUser) {
      addAuditLog('LOGOUT', `User ${currentUser.name} logged out`);
    }
    setCurrentUser(null);
    setActiveView('public');
  };

  const switchRole = (role: Role) => {
    if (currentUser) {
      const updated = { ...currentUser, role };
      setCurrentUser(updated);
      addAuditLog('ROLE_SWITCH', `Switched role to ${role}`);
    }
  };

  // Customers CRUD
  const addCustomer = (customerData: Omit<Customer, 'id' | 'createdAt'>) => {
    const newCustomer: Customer = {
      ...customerData,
      id: `cust-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      isDeleted: false,
    };
    setCustomers(prev => [newCustomer, ...prev]);
    addAuditLog('CUSTOMER_CREATED', `Added customer ${newCustomer.name}`);
  };

  const updateCustomer = (id: string, patch: Partial<Customer>) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, ...patch } : c));
    addAuditLog('CUSTOMER_UPDATED', `Updated customer ID ${id}`);
  };

  const softDeleteCustomer = (id: string) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, isDeleted: true } : c));
    addAuditLog('CUSTOMER_SOFT_DELETED', `Soft deleted customer ID ${id}`);
  };

  const restoreCustomer = (id: string) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, isDeleted: false } : c));
    addAuditLog('CUSTOMER_RESTORED', `Restored customer ID ${id}`);
  };

  // Insurance CRUD + Automatic Commission calculation
  const addPolicy = (policyData: Omit<Policy, 'id'>) => {
    const newPolicy: Policy = {
      ...policyData,
      id: `pol-${Date.now()}`,
    };
    setPolicies(prev => [newPolicy, ...prev]);

    // Calculate commission record automatically
    const companyCommPct = newPolicy.commissionPercentage;
    const grossComm = (newPolicy.premiumAmount * companyCommPct) / 100;
    const advisorCommPct = 70; // 70% share to advisor
    const advisorAmount = (grossComm * advisorCommPct) / 100;
    const companyNet = grossComm - advisorAmount;

    const commRecord: CommissionRecord = {
      id: `comm-${Date.now()}`,
      policyId: newPolicy.id,
      dealTitle: `${newPolicy.company} - ${newPolicy.customerName}`,
      customerName: newPolicy.customerName,
      grossAmount: newPolicy.premiumAmount,
      companyCommissionPct: companyCommPct,
      advisorCommissionPct: advisorCommPct,
      advisorCommissionAmount: advisorAmount,
      companyNetRevenue: companyNet,
      advisorId: newPolicy.advisorId || 'usr-2',
      advisorName: newPolicy.advisorName || 'Ananya Sharma',
      date: newPolicy.startDate,
      month: new Date(newPolicy.startDate).toLocaleString('default', { month: 'long' }),
      year: new Date(newPolicy.startDate).getFullYear(),
    };

    setCommissions(prev => [commRecord, ...prev]);
    addAuditLog('POLICY_CREATED', `Added policy ${newPolicy.policyNumber} for ${newPolicy.customerName}`);
  };

  const updatePolicy = (id: string, patch: Partial<Policy>) => {
    setPolicies(prev => prev.map(p => p.id === id ? { ...p, ...patch } : p));
    addAuditLog('POLICY_UPDATED', `Updated policy ID ${id}`);
  };

  const deletePolicy = (id: string) => {
    setPolicies(prev => prev.filter(p => p.id !== id));
    addAuditLog('POLICY_DELETED', `Deleted policy ID ${id}`);
  };

  // Lead Pipeline CRUD
  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => {
    const today = new Date().toISOString().split('T')[0];
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: today,
      updatedAt: today,
    };
    setLeads(prev => [newLead, ...prev]);
    addAuditLog('LEAD_CREATED', `New lead received from ${newLead.name} (${newLead.category})`);
  };

  const updateLeadStatus = (id: string, status: Lead['status']) => {
    const today = new Date().toISOString().split('T')[0];
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status, updatedAt: today } : l));
    addAuditLog('LEAD_STATUS_CHANGED', `Lead ID ${id} status changed to ${status}`);
  };

  const updateLead = (id: string, patch: Partial<Lead>) => {
    const today = new Date().toISOString().split('T')[0];
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...patch, updatedAt: today } : l));
    addAuditLog('LEAD_UPDATED', `Updated lead details for ID ${id}`);
  };

  // Follow-ups
  const addFollowUp = (fUpData: Omit<FollowUp, 'id'>) => {
    const newFup: FollowUp = {
      ...fUpData,
      id: `fup-${Date.now()}`,
    };
    setFollowUps(prev => [newFup, ...prev]);
    addAuditLog('FOLLOWUP_CREATED', `Scheduled follow-up with ${newFup.contactName}`);
  };

  const completeFollowUp = (id: string) => {
    setFollowUps(prev => prev.map(f => f.id === id ? { ...f, status: 'Completed' } : f));
    addAuditLog('FOLLOWUP_COMPLETED', `Completed follow-up ID ${id}`);
  };

  // Real Estate CRUD
  const addProperty = (propData: Omit<Property, 'id'>) => {
    const newProp: Property = {
      ...propData,
      id: `prop-${Date.now()}`,
    };
    setProperties(prev => [newProp, ...prev]);
    addAuditLog('PROPERTY_ADDED', `Listed property ${newProp.propertyName}`);
  };

  const updateProperty = (id: string, patch: Partial<Property>) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, ...patch } : p));
    addAuditLog('PROPERTY_UPDATED', `Updated property ${id}`);
  };

  // Investment Planning Engine
  const addInvestmentPlan = (planData: Omit<InvestmentPlan, 'id' | 'createdAt'>) => {
    const newPlan: InvestmentPlan = {
      ...planData,
      id: `inv-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setInvestmentPlans(prev => [newPlan, ...prev]);
    addAuditLog('INVESTMENT_PLAN_CREATED', `Generated financial goal plan for ${newPlan.customerName}`);
  };

  // Documents & Notifications
  const addDocument = (docData: Omit<SystemDocument, 'id' | 'uploadedAt'>) => {
    const newDoc: SystemDocument = {
      ...docData,
      id: `doc-${Date.now()}`,
      uploadedAt: new Date().toISOString().split('T')[0],
    };
    setDocuments(prev => [newDoc, ...prev]);
    addAuditLog('DOCUMENT_UPLOADED', `Uploaded file ${newDoc.title}`);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  // System Backup & Import
  const exportSystemData = (): string => {
    const dump = {
      users,
      customers,
      policies,
      properties,
      leads,
      followUps,
      commissions,
      investmentPlans,
      documents,
      auditLogs,
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(dump, null, 2);
  };

  const importSystemData = (jsonData: string): boolean => {
    try {
      const data = JSON.parse(jsonData);
      if (data.customers) setCustomers(data.customers);
      if (data.policies) setPolicies(data.policies);
      if (data.properties) setProperties(data.properties);
      if (data.leads) setLeads(data.leads);
      if (data.followUps) setFollowUps(data.followUps);
      if (data.commissions) setCommissions(data.commissions);
      if (data.investmentPlans) setInvestmentPlans(data.investmentPlans);
      if (data.documents) setDocuments(data.documents);
      addAuditLog('SYSTEM_DATA_IMPORTED', 'Restored database from JSON backup');
      return true;
    } catch (e) {
      console.error('Failed to import JSON system data', e);
      return false;
    }
  };

  const resetToDefaults = () => {
    setUsers(initialUsers);
    setCustomers(initialCustomers);
    setPolicies(initialPolicies);
    setProperties(initialProperties);
    setLeads(initialLeads);
    setFollowUps(initialFollowUps);
    setCommissions(initialCommissions);
    setInvestmentPlans(initialInvestmentPlans);
    setDocuments(initialDocuments);
    setNotifications(initialNotifications);
    setAuditLogs(initialAuditLogs);
    localStorage.clear();
    addAuditLog('SYSTEM_RESET', 'Reset all system database records to factory defaults');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        customers,
        policies,
        properties,
        leads,
        followUps,
        commissions,
        investmentPlans,
        documents,
        notifications,
        auditLogs,
        activeView,
        activeTab,
        isApiConnected,
        setActiveView,
        setActiveTab,
        login,
        logout,
        switchRole,
        refreshFromBackend,
        addCustomer,
        updateCustomer,
        softDeleteCustomer,
        restoreCustomer,
        addPolicy,
        updatePolicy,
        deletePolicy,
        addLead,
        updateLeadStatus,
        updateLead,
        addFollowUp,
        completeFollowUp,
        addProperty,
        updateProperty,
        addInvestmentPlan,
        addDocument,
        markNotificationRead,
        addAuditLog,
        exportSystemData,
        importSystemData,
        resetToDefaults,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
