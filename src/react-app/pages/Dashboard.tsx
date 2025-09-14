import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, LogOut, Bell, Menu, X, BarChart3, CreditCard as CreditIcon, History, Zap, DollarSign, Clock, Users } from 'lucide-react';
import type { 
  User as UserType, 
  CreditBalance, 
  CreditTransaction, 
  SubscriptionPlan,
  CreditRechargeData 
} from '../../shared/types';
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
import UserSubscriptions from '../components/dashboard/UserSubscriptions';
import TwoFactorStatus from '../components/dashboard/TwoFactorStatus';
import LeadManagement from '../components/dashboard/LeadManagement';
import useAutomationRules from '../hooks/useAutomationRules';

// Componentes (assumindo que existem ou stubs)
const FinancialControl = () => (
  <div className="grid md:grid-cols-3 gap-6">
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-2">Receitas</h3>
      <p className="text-2xl font-bold text-green-600">R$ 1.250,00</p>
    </div>
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-2">Despesas</h3>
      <p className="text-2xl font-bold text-red-600">R$ 750,00</p>
    </div>
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-2">Lucro</h3>
      <p className="text-2xl font-bold text-blue-600">R$ 500,00</p>
    </div>
  </div>
);

const AutomationPlaceholder = ({ status, onUnlock }: { status: string; onUnlock: () => void }) => (
  <div className="text-center py-12 bg-gradient-to-b from-gray-50 to-white rounded-xl shadow-lg border border-gray-200">
    <Zap className="mx-auto w-16 h-16 text-blue-500 mb-4" />
    <h3 className="text-xl font-bold text-gray-900 mb-2">
      {status === 'pending_verification' ? 'Verificando Pagamento' : 'Ative a Automação'}
    </h3>
    <p className="text-gray-600 mb-6">Conecte sua conta e automatize interações no Instagram.</p>
    {status !== 'pending_verification' && (
      <button 
        onClick={onUnlock} 
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
      >
        Ativar Agora
      </button>
    )}
  </div>
);

const PlanCards = ({ currentPlan, onSelect }: { currentPlan: SubscriptionPlan; onSelect: (plan: SubscriptionPlan) => void }) => (
  <div className="grid md:grid-cols-3 gap-6">
    {[ { name: 'Básico', price: 0, features: ['1 Automação'] }, { name: 'Pro', price: 49, features: ['Todas Automatizações'], highlighted: true }, { name: 'Enterprise', price: 199, features: ['Suporte Dedicado'] } ].map(plan => (
      <div key={plan.name} className={`p-6 rounded-xl border ${plan.highlighted ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} shadow-md hover:shadow-lg transition-all`}>
        <h3 className="font-bold text-lg mb-2">{plan.name}</h3>
        <p className="text-2xl font-bold text-gray-900">R$ {plan.price}/mês</p>
        <ul className="mt-4 space-y-2">
          {plan.features.map(f => <li key={f} className="text-sm text-gray-600">• {f}</li>)}
        </ul>
        <button 
          onClick={() => onSelect(plan)} 
          className="mt-6 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Escolher Plano
        </button>
      </div>
    ))}
  </div>
);

// Stub para TransactionHistory se necessário
const LocalTransactionHistory = ({ transactions, onExport }: { transactions: CreditTransaction[]; onExport: () => void }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden">
    <div className="flex justify-between items-center p-6 border-b">
      <h3 className="font-bold text-lg">Histórico de Transações</h3>
      <button onClick={onExport} className="text-blue-600 hover:text-blue-800">Exportar CSV</button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descrição</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4">{new Date(t.createdAt).toLocaleDateString()}</td>
              <td className={`px-6 py-4 ${t.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                {t.type === 'credit' ? 'Crédito' : 'Débito'}
              </td>
              <td className="px-6 py-4 font-medium">R$ {t.amount.toFixed(2)}</td>
              <td className="px-6 py-4 text-gray-900">{t.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default function Dashboard() {
  const [user, setUser] = useState<UserType | null>(null);
  const [balance, setBalance] = useState<CreditBalance | null>(null);
  const [transactions, setTransactions] = useState<CreditTransaction[]>([]);
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(null);
  const [userSubscriptions, setUserSubscriptions] = useState<any[]>([]);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'plans' | 'history' | 'automation'>('overview');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/auth');
      return;
    }

    // Fetch dados reais do backend
    const fetchData = async () => {
      try {
        setLoading(true);
        const [userRes, balanceRes, transRes, planRes, subscriptionsRes] = await Promise.all([
          fetch('/api/user', { headers: { Authorization: `Bearer ${token}` } }),
          fetch('/api/credits/balance/me', { headers: { Authorization: `Bearer ${token}` } }),
          fetch('/api/credits/transactions/me', { headers: { Authorization: `Bearer ${token}` } }),
          fetch('/api/subscription/plan', { headers: { Authorization: `Bearer ${token}` } }),
          fetch('/api/subscriptions/me', { headers: { Authorization: `Bearer ${token}` } })
        ]);

        if (!userRes.ok || !balanceRes.ok || !transRes.ok || !planRes.ok) throw new Error('Erro ao carregar dados');

        const userData = await userRes.json();
        const balanceData = await balanceRes.json();
        const transData = await transRes.json();
        const planData = await planRes.json();
        const subscriptionsData = await subscriptionsRes.json();

        setUser(userData);
        setBalance(balanceData);
        setTransactions(transData);
        setCurrentPlan(planData);
        setUserSubscriptions(subscriptionsData.subscriptions || []);
        setIs2FAEnabled(userData.twoFactorEnabled || false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        localStorage.removeItem('authToken');
        navigate('/auth');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-600">{error}</div>;
  if (!user) return <div className="flex items-center justify-center min-h-screen">Usuário não encontrado</div>;

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const handleSelectPlan = async (plan: SubscriptionPlan) => {
    if (!user) return;
    
    try {
      if (plan.type === 'monthly') {
        // Criar assinatura mensal
        const response = await fetch('/api/subscriptions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          },
          body: JSON.stringify({
            userId: user.id,
            planId: plan.id,
            planType: plan.type,
            amount: plan.price
          })
        });
        
        if (!response.ok) {
          throw new Error('Erro ao criar assinatura');
        }
        
        const result = await response.json();
        console.log('Assinatura criada:', result);
        // Aqui você pode redirecionar para pagamento ou mostrar mensagem de sucesso
      } else if (plan.type === 'pay_per_use') {
        // Redirecionar para recarga de créditos
        setActiveTab('history');
      } else {
        // Plano gratuito
        console.log('Selecionado plano gratuito:', plan.name);
      }
    } catch (error) {
      console.error('Erro ao selecionar plano:', error);
    }
  };

  const handleCancelSubscription = async (subscriptionId: number) => {
    try {
      const response = await fetch(`/api/subscriptions/${subscriptionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Erro ao cancelar assinatura');
      }
      
      // Atualizar a lista de assinaturas
      const updatedSubscriptions = userSubscriptions.map(sub => 
        sub.id === subscriptionId ? { ...sub, status: 'cancelled' } : sub
      );
      setUserSubscriptions(updatedSubscriptions);
      
      console.log('Assinatura cancelada com sucesso');
    } catch (error) {
      console.error('Erro ao cancelar assinatura:', error);
    }
  };

  const handleToggle2FA = async () => {
    try {
      // Em uma implementação real, isso chamaria a API para ativar/desativar 2FA
      setIs2FAEnabled(!is2FAEnabled);
      
      // Atualizar no localStorage também
      const token = localStorage.getItem('authToken');
      if (token) {
        const user = JSON.parse(atob(token.split('.')[1]));
        user.twoFactorEnabled = !is2FAEnabled;
        const newToken = btoa(JSON.stringify(user));
        localStorage.setItem('authToken', newToken);
      }
    } catch (error) {
      console.error('Erro ao alternar 2FA:', error);
    }
  };

  const handleExportTransactions = () => {
    // Export CSV simples
    const csv = transactions.map(t => `${new Date(t.createdAt).toLocaleDateString()},${t.type},${t.amount},${t.description}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transacoes.csv';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Responsivo */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-900">
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white ml-4">Dashboard EuQuero</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="w-6 h-6 text-gray-500 cursor-pointer" />
              <User className="w-8 h-8 rounded-full bg-blue-100 p-1" />
              <button onClick={handleLogout} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        </div>
        {/* Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <nav className="px-4 py-2 space-y-1">
              <button onClick={() => { setActiveTab('overview'); setIsMobileMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-md text-gray-900 dark:text-white font-medium">Overview</button>
              <button onClick={() => { setActiveTab('automation'); setIsMobileMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-md text-gray-900 dark:text-white font-medium">Automação</button>
              <button onClick={() => { setActiveTab('leads'); setIsMobileMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-md text-gray-900 dark:text-white font-medium">Leads</button>
              <button onClick={() => { setActiveTab('plans'); setIsMobileMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-md text-gray-900 dark:text-white font-medium">Planos</button>
              <button onClick={() => { setActiveTab('history'); setIsMobileMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-md text-gray-900 dark:text-white font-medium">Histórico</button>
            </nav>
          </div>
        )}
      </header>

      {/* Sidebar Desktop */}
      <div className="flex">
        <aside className="hidden md:block w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <nav className="p-4 space-y-2">
            <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md ${activeTab === 'overview' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
              <BarChart3 className="w-5 h-5" />
              <span>Overview</span>
            </button>
            <button onClick={() => setActiveTab('automation')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md ${activeTab === 'automation' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
              <Zap className="w-5 h-5" />
              <span>Automação</span>
            </button>
            <button onClick={() => setActiveTab('leads')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md ${activeTab === 'leads' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
              <Users className="w-5 h-5" />
              <span>Leads</span>
            </button>
            <button onClick={() => setActiveTab('plans')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md ${activeTab === 'plans' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
              <DollarSign className="w-5 h-5" />
              <span>Planos</span>
            </button>
            <button onClick={() => setActiveTab('history')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md ${activeTab === 'history' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
              <History className="w-5 h-5" />
              <span>Histórico</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Olá, {user.name}!</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Gerencie suas automações e finanças aqui.</p>
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-4 gap-6">
                <CreditCard balance={balance!} />
                {/* Outras métricas */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Automação Ativas</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
                    </div>
                    <Zap className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Respostas Hoje</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">47</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Tempo Economizado</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">12.5h</p>
                    </div>
                    <Clock className="w-8 h-8 text-purple-500" />
                  </div>
                </div>
              </div>
              <TwoFactorStatus 
                is2FAEnabled={is2FAEnabled} 
                onToggle2FA={handleToggle2FA} 
              />
              <FinancialControl />
            </div>
          )}

          {activeTab === 'automation' && (
            <div className="space-y-8">
              <InstagramSetup userId={user.id} onConnectionChange={() => {}} />
              {/* Stubs para regras - implemente com fetch */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-bold mb-4">Regras de Automação</h3>
                <p>Implemente regras de comentários e DMs aqui.</p>
              </div>
            </div>
          )}

          {activeTab === 'plans' && (
            <div className="space-y-6">
              <UserSubscriptions 
                subscriptions={userSubscriptions} 
                onCancelSubscription={handleCancelSubscription} 
              />
              <SubscriptionPlans 
                currentPlan={currentPlan!} 
                onSelectPlan={handleSelectPlan} 
              />
            </div>
          )}
          
          {activeTab === 'leads' && (
            <div className="space-y-6">
              <LeadManagement />
            </div>
          )}
          {activeTab === 'history' && <LocalTransactionHistory transactions={transactions} onExport={handleExportTransactions} />}
        </main>
      </div>
    </div>
  );
}