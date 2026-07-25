import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/public/Navbar';
import { Hero } from './components/public/Hero';
import { InsuranceServices } from './components/public/InsuranceServices';
import { FinancialPlanner } from './components/public/FinancialPlanner';
import { CalculatorsSection } from './components/public/CalculatorsSection';
import { PersonalAdvisorSection } from './components/public/PersonalAdvisorSection';
import { AboutSection } from './components/public/AboutSection';
import { TestimonialsFaqContact } from './components/public/TestimonialsFaqContact';
import { WhatsAppButton } from './components/public/WhatsAppButton';
import { LoginModal } from './components/auth/LoginModal';

import { AdminLayout } from './components/admin/AdminLayout';
import { DashboardView } from './components/admin/DashboardView';
import { CustomerManagement } from './components/admin/CustomerManagement';
import { InsuranceManagement } from './components/admin/InsuranceManagement';
import { RealEstateManagement } from './components/admin/RealEstateManagement';
import { InvestmentPlanning } from './components/admin/InvestmentPlanning';
import { LeadManagement } from './components/admin/LeadManagement';
import { FollowUpManagement } from './components/admin/FollowUpManagement';
import { CommissionModule } from './components/admin/CommissionModule';
import { ReportsModule } from './components/admin/ReportsModule';
import { DocumentManagement } from './components/admin/DocumentManagement';
import { UserManagement } from './components/admin/UserManagement';
import { SettingsModule } from './components/admin/SettingsModule';
import { WhatsAppEmailModal } from './components/admin/WhatsAppEmailModal';
import { MessageSquare } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeView, activeTab } = useApp();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  if (activeView === 'admin') {
    return (
      <AdminLayout>
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'customers' && <CustomerManagement />}
        {activeTab === 'insurance' && <InsuranceManagement />}
        {activeTab === 'properties' && <RealEstateManagement />}
        {activeTab === 'investment' && <InvestmentPlanning />}
        {activeTab === 'leads' && <LeadManagement />}
        {activeTab === 'followups' && <FollowUpManagement />}
        {activeTab === 'commission' && <CommissionModule />}
        {activeTab === 'reports' && <ReportsModule />}
        {activeTab === 'documents' && <DocumentManagement />}
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'settings' && <SettingsModule />}

        {/* Floating WhatsApp / Email Share Button for Admin */}
        <button
          onClick={() => setIsShareModalOpen(true)}
          className="fixed bottom-6 right-6 z-40 gradient-gold-bg text-[#07152F] font-extrabold p-4 rounded-full shadow-2xl hover:scale-105 transition-all flex items-center gap-2 text-xs uppercase tracking-wider border border-amber-400/40"
        >
          <MessageSquare className="w-5 h-5" /> Quick Share
        </button>

        <WhatsAppEmailModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
        />
      </AdminLayout>
    );
  }

  return (
    <div className="min-h-screen bg-[#07152F]">
      {/* 1. Header Navigation */}
      <Navbar onOpenLogin={() => setIsLoginOpen(true)} />

      {/* 2. Hero Section + Trusted Partners + Services */}
      <Hero />

      {/* 3. Insurance Plans */}
      <InsuranceServices />

      {/* 4. Investment Solutions */}
      <FinancialPlanner />

      {/* 5. Financial Calculators */}
      <CalculatorsSection />

      {/* 6. Personal Advisor Profile */}
      <PersonalAdvisorSection />

      {/* 9. About / Legacy */}
      <AboutSection />

      {/* 10. Why Choose Us -> Testimonials -> Appointment Booking -> FAQ -> Contact & Footer */}
      <TestimonialsFaqContact />

      {/* Floating WhatsApp Quick Action Button */}
      <WhatsAppButton />

      {/* Auth Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </div>
  );
};

import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <MainContent />
      </AppProvider>
    </LanguageProvider>
  );
}
