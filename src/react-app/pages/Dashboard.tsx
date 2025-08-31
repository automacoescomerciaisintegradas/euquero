import React, { useState } from 'react';
import { User, Settings, LogOut, Bell, Menu, X } from 'lucide-react';
import CreditCard from '../components/dashboard/CreditCard';
import CreditRechargeModal from '../components/dashboard/CreditRechargeModal';
import SubscriptionPlans from '../components/dashboard/SubscriptionPlans';
import TransactionHistory from '../components/dashboard/TransactionHistory';
import PixPaymentModal from '../components/dashboard/PixPaymentModal';
import type { 
  User as UserType, 
  CreditBalance, 
  CreditTransaction, 
  SubscriptionPlan,
  CreditRechargeData 
} from '../../shared/types';

// Mock data - em produção, isso viria da API
const mockUser: UserType = {
  id: '1',
  email: 'usuario@exemplo.com',
  name: 'João Silva',
  phone: '(88) 98871-2711',
  provider: 'email',
  emailVerified: true,
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date(),
};

const mockBalance: CreditBalance = {
  id: '1',
  userId: '1',
  balance: 47.50,
  currency: 'BRL',
  expiresAt: new Date('2025-01-15'),
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date(),
};

const mockTransactions: CreditTransaction[] = [
  {
    id: '1',
    userId: '1',
    type: 'credit',
    amount: 50.00,
    description: 'Recarga via PIX',
    service: 'Pagamento',
    status: 'completed',
    createdAt: new Date('2024-01-15T10:30:00'),
  },
  {
    id: '2',
    userId: '1',
    type: 'debit',
    amount: 2.50,
    description: 'Geração de conteúdo IA',
    service: 'IA Content',
    status: 'completed',
    createdAt: new Date('2024-01-16T14:20:00'),
  },
  {
    id: '3',
    userId: '1',
    type: 'debit',
    amount: 1.00,
    description: 'Envio de mensagem WhatsApp',
    service: 'WhatsApp API',
    status: 'completed',
    createdAt: new Date('2024-01-17T09:15:00'),
  },
];

const mockCurrentPlan: SubscriptionPlan = {
  id: 'pay_per_use',
  name: 'Plano Pay-per-use',
  type: 'pay_per_use',
  price: 50,
  credits: 50,
  features: [],
};

export default function Dashboard() {
  const [user] = useState<UserType>(mockUser);
  const [balance, setBalance] = useState<CreditBalance>(mockBalance);
  const [transactions, setTransactions] = useState<CreditTransaction[]>(mockTransactions);
  const [currentPlan] = useState<SubscriptionPlan>(mockCurrentPlan);
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'plans' | 'history'>('overview');
  const [isPixModalOpen, setIsPixModalOpen] = useState(false);
  const [pixAmount, setPixAmount] = useState(0);

  const handleRecharge = async (data: CreditRechargeData) => {
    try {
      // Simular chamada à API
      console.log('Recarregando créditos:', data);
      
      // Simular sucesso
      const newTransaction: CreditTransaction = {
        id: Date.now().toString(),
        userId: user.id,
        type: 'credit',
        amount: data.amount,
        description: `Recarga via ${data.paymentMethod.toUpperCase()}`,
        service: 'Pagamento',
        status: 'pending',
        createdAt: new Date(),
      };

      setTransactions(prev => [newTransaction, ...prev]);
      
      // Simular confirmação após alguns segundos
      setTimeout(() => {
        setTransactions(prev => 
          prev.map(t => 
            t.id === newTransaction.id 
              ? { ...t, status: 'completed' as const }
              : t
          )
        );
        setBalance(prev => ({
          ...prev,
          balance: prev.balance + data.amount,
          updatedAt: new Date(),
        }));
      }, 10000); // 10 segundos para simular processamento PIX

    } catch (error) {
      console.error('Erro ao recarregar créditos:', error);
      throw error;
    }
  };

  const handleShowPix = (amount: number) => {
    setPixAmount(amount);
    setIsPixModalOpen(true);
  };

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    console.log('Plano selecionado:', plan);
    if (plan.type === 'pay_per_use') {
      setIsRechargeModalOpen(true);
    }
  };

  const handleLogout = () => {
    // Implementar logout
    window.location.href = '/';
  };

  const handleExportTransactions = () => {
    // Implementar exportação
    console.log('Exportando transações...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Eu<span className="text-blue-600">Quero</span>
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Visão Geral
              </button>
              <button
                onClick={() => setActiveTab('plans')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'plans'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Planos
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'history'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Histórico
              </button>
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block text-right">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-400 hover:text-gray-600"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-2">
                <button
                  onClick={() => {
                    setActiveTab('overview');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 text-left text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'overview'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Visão Geral
                </button>
                <button
                  onClick={() => {
                    setActiveTab('plans');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 text-left text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'plans'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Planos
                </button>
                <button
                  onClick={() => {
                    setActiveTab('history');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 text-left text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'history'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Histórico
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Welcome */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Bem-vindo, {user.name?.split(' ')[0]}!
              </h2>
              <p className="text-gray-600">
                Gerencie seus créditos e acompanhe o uso da plataforma.
              </p>
            </div>

            {/* Credit Card */}
            <CreditCard 
              balance={balance} 
              onRecharge={() => setIsRechargeModalOpen(true)} 
            />

            {/* Recent Transactions */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Transações Recentes
                </h3>
                <button
                  onClick={() => setActiveTab('history')}
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Ver todas
                </button>
              </div>
              <TransactionHistory 
                transactions={transactions.slice(0, 5)} 
              />
            </div>
          </div>
        )}

        {activeTab === 'plans' && (
          <SubscriptionPlans 
            currentPlan={currentPlan}
            onSelectPlan={handleSelectPlan}
          />
        )}

        {activeTab === 'history' && (
          <TransactionHistory 
            transactions={transactions}
            onExport={handleExportTransactions}
          />
        )}
      </main>

      {/* Modals */}
      <CreditRechargeModal
        isOpen={isRechargeModalOpen}
        onClose={() => setIsRechargeModalOpen(false)}
        onRecharge={handleRecharge}
        currentBalance={balance.balance}
        onShowPix={handleShowPix}
      />

      <PixPaymentModal
        isOpen={isPixModalOpen}
        onClose={() => setIsPixModalOpen(false)}
        amount={pixAmount}
        pixKey="857e068a-f857-43be-aba7-b70f083b611d"
        pixEmail="pix@automacoescomerciais.com.br"
        pixCode="00020126580014BR.GOV.BCB.PIX0136857e068a-f857-43be-aba7-b70f083b611d5204000053039865802BR5925AUTOMACOES COMERCIAIS LTDA6009SAO PAULO62070503***6304"
        onPaymentConfirmed={() => {
          setIsPixModalOpen(false);
          // Simular confirmação imediata do pagamento
          setBalance(prev => ({
            ...prev,
            balance: prev.balance + pixAmount,
            updatedAt: new Date(),
          }));
        }}
      />
    </div>
  );
}