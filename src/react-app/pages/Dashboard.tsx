import React, { useState, useEffect } from 'react';
import { User, Settings, LogOut, Bell, Menu, X, BarChart3 } from 'lucide-react';
import CreditCard from '../components/dashboard/CreditCard';
import CreditRechargeModal from '../components/dashboard/CreditRechargeModal';
import SubscriptionPlans from '../components/dashboard/SubscriptionPlans';
import TransactionHistory from '../components/dashboard/TransactionHistory';
import PixPaymentModal from '../components/dashboard/PixPaymentModal';
import AutomationMetrics from '../components/dashboard/AutomationMetrics';
import AutomationFeatures from '../components/dashboard/AutomationFeatures';
import AutomationSettings from '../components/dashboard/AutomationSettings';
import AutomationReports from '../components/dashboard/AutomationReports';
import AutomationNotifications from '../components/dashboard/AutomationNotifications';
import AutomationTutorials from '../components/dashboard/AutomationTutorials';
import CommentAutomationRules from '../components/dashboard/CommentAutomationRules';
import DMAutomationRules from '../components/dashboard/DMAutomationRules';
import EngagementStats from '../components/dashboard/EngagementStats';
import ContentSuggestions from '../components/dashboard/ContentSuggestions';
import IndustryTrends from '../components/dashboard/IndustryTrends';
import ProfileCompetitors from '../components/dashboard/ProfileCompetitors';
import ImprovementRecommendations from '../components/dashboard/ImprovementRecommendations';
import SentimentAnalysis from '../components/dashboard/SentimentAnalysis';
import GrowthMetrics from '../components/dashboard/GrowthMetrics';
import AlertNotifications from '../components/dashboard/AlertNotifications';
import RealTimeMetrics from '../components/dashboard/RealTimeMetrics';
import HourlyPerformance from '../components/dashboard/HourlyPerformance';
import DailyPerformance from '../components/dashboard/DailyPerformance';
import WeeklyPerformance from '../components/dashboard/WeeklyPerformance';
import MonthlyPerformance from '../components/dashboard/MonthlyPerformance';
import YearlyPerformance from '../components/dashboard/YearlyPerformance';
import ContentPerformance from '../components/dashboard/ContentPerformance';
import HashtagPerformance from '../components/dashboard/HashtagPerformance';
import LocationPerformance from '../components/dashboard/LocationPerformance';
import DevicePerformance from '../components/dashboard/DevicePerformance';
import { InstagramSetup } from '../components/InstagramSetup';
import useAutomationRules from '../hooks/useAutomationRules';
import type { 
  User as UserType, 
  CreditBalance, 
  CreditTransaction, 
  SubscriptionPlan,
  CreditRechargeData, 
  SubscriptionStatus
} from '../../shared/types';

// Mock data
const mockUser: UserType = {
  id: '1', email: 'usuario@exemplo.com', name: 'João Silva', phone: '(88) 98871-2711', provider: 'email', emailVerified: true, createdAt: new Date('2024-01-15'), updatedAt: new Date(),
};
const mockBalance: CreditBalance = {
  id: '1', userId: '1', balance: 47.50, currency: 'BRL', expiresAt: new Date('2025-01-15'), createdAt: new Date('2024-01-15'), updatedAt: new Date(),
};
const mockTransactions: CreditTransaction[] = [
  { id: '1', userId: '1', type: 'credit', amount: 50.00, description: 'Recarga via PIX', service: 'Pagamento', status: 'completed', createdAt: new Date('2024-01-15T10:30:00') },
  { id: '2', userId: '1', type: 'debit', amount: 2.50, description: 'Geração de conteúdo IA', service: 'IA Content', status: 'completed', createdAt: new Date('2024-01-16T14:20:00') },
];
const mockAutomationMetrics = { totalAutomations: 5, activeAutomations: 3, totalResponses: 247, savedTime: '12.5h' };
const mockCurrentPlan: SubscriptionPlan = { id: 'pay_per_use', name: 'Plano Pay-per-use', type: 'pay_per_use', price: 50, credits: 50, features: [] };

const AutomationPlaceholder = ({ status, onUnlock }: { status: SubscriptionStatus, onUnlock: () => void }) => (
  <div className="text-center py-20 bg-white rounded-xl shadow-lg">
    <div className="mx-auto w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
        <BarChart3 className="w-8 h-8 text-white" />
      </div>
    </div>
    <h3 className="mt-6 text-2xl font-bold text-gray-900">
      {status === 'pending_verification' ? 'Pagamento em Verificação' : 'Desbloqueie o Poder da Automação'}
    </h3>
    <p className="mt-2 text-gray-600 max-w-md mx-auto">
      {status === 'pending_verification' ? 'Seu pagamento está sendo verificado. Você será notificado assim que for aprovado.' : 'Conecte sua conta do Instagram e comece a automatizar comentários, DMs e muito mais.'}
    </p>
    {status !== 'pending_verification' && (
      <button onClick={onUnlock} className="mt-8 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md">
        Ativar Automação
      </button>
    )}
  </div>
);

export default function Dashboard() {
  const [user] = useState<UserType>(mockUser);
  const [balance, setBalance] = useState<CreditBalance>(mockBalance);
  const [transactions, setTransactions] = useState<CreditTransaction[]>(mockTransactions);
  const [currentPlan] = useState<SubscriptionPlan>(mockCurrentPlan);
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'plans' | 'history' | 'automation'>('overview');
  const [isPixModalOpen, setIsPixModalOpen] = useState(false);
  const [pixAmount, setPixAmount] = useState(0);
  const [hasMadeRecharge, setHasMadeRecharge] = useState(balance.balance > 0);
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>('active');

  const { commentRules, dmRules, createCommentRule, createDmRule, updateRule, deleteRule } = useAutomationRules({ userId: user.id });

  const fetchUserStatus = async () => {
    try {
      const response = await fetch(`/api/user/${user.id}/status`); // Assumes an endpoint to get status
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setSubscriptionStatus(data.status);
        }
      }
    } catch (error) {
      console.error("Failed to fetch user status:", error);
      setSubscriptionStatus('inactive'); // Fallback
    }
  };

  useEffect(() => {
    // fetchUserBalance();
    // fetchUserTransactions();
    fetchUserStatus();
  }, [user.id]);

  const handleRecharge = async (data: CreditRechargeData) => { /* ... */ };
  const handleShowPix = (amount: number) => { /* ... */ };
  const handleSelectPlan = (plan: SubscriptionPlan) => { /* ... */ };
  const handleLogout = () => { window.location.href = '/'; };
  const handleExportTransactions = () => { console.log('Exportando transações...'); };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">{/* ... */}</header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && ( <div className="space-y-8"> {/* ... */} </div> )}

        {activeTab === 'automation' && (
          <div>
            {subscriptionStatus === 'active' ? (
              <div className="space-y-8">
                <InstagramSetup userId={user.id} onConnectionChange={() => {}} />
                <CommentAutomationRules rules={commentRules} onCreateRule={createCommentRule} onUpdateRule={updateRule} onDeleteRule={deleteRule} />
                <DMAutomationRules rules={dmRules} onCreateRule={createDmRule} onUpdateRule={updateRule} onDeleteRule={deleteRule} />
                <IndustryTrends trends={[{id: '1', title: '#MarketingDigital', description: 'Conteúdo sobre estratégias de marketing digital está em alta', growth: 12.5, posts: 12450}]} />
              </div>
            ) : (
              <AutomationPlaceholder status={subscriptionStatus} onUnlock={() => setActiveTab('plans')} />
            )}
          </div>
        )}

        {activeTab === 'plans' && ( <SubscriptionPlans currentPlan={currentPlan} onSelectPlan={handleSelectPlan} /> )}
        {activeTab === 'history' && ( <TransactionHistory transactions={transactions} onExport={handleExportTransactions} /> )}
      </main>

      {/* Modals */}
      <CreditRechargeModal isOpen={isRechargeModalOpen} onClose={() => setIsRechargeModalOpen(false)} onRecharge={handleRecharge} currentBalance={balance.balance} onShowPix={handleShowPix} userId={user.id} />
      <PixPaymentModal isOpen={isPixModalOpen} onClose={() => setIsPixModalOpen(false)} amount={pixAmount} pixKey="" pixEmail="" pixCode="" onPaymentConfirmed={() => {}} />
    </div>
  );
}