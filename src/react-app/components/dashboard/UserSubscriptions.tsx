import React from 'react';
import { Calendar, CreditCard, Clock, CheckCircle, XCircle } from 'lucide-react';

interface Subscription {
  id: number;
  uuid: string;
  userId: string;
  planId: string;
  planType: 'free' | 'pay_per_use' | 'monthly';
  status: 'active' | 'cancelled' | 'expired' | 'pending';
  startDate: string;
  endDate: string | null;
  autoRenew: boolean;
  amount: number | null;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

interface UserSubscriptionsProps {
  subscriptions: Subscription[];
  onCancelSubscription: (subscriptionId: number) => void;
}

export default function UserSubscriptions({ subscriptions, onCancelSubscription }: UserSubscriptionsProps) {
  const formatCurrency = (amount: number | null) => {
    if (!amount) return 'Gratuito';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'active':
        return { text: 'Ativa', icon: CheckCircle, className: 'text-green-600' };
      case 'cancelled':
        return { text: 'Cancelada', icon: XCircle, className: 'text-red-600' };
      case 'expired':
        return { text: 'Expirada', icon: Clock, className: 'text-gray-600' };
      case 'pending':
        return { text: 'Pendente', icon: Clock, className: 'text-yellow-600' };
      default:
        return { text: status, icon: Clock, className: 'text-gray-600' };
    }
  };

  const getPlanTypeName = (planType: string) => {
    switch (planType) {
      case 'free':
        return 'Gratuito';
      case 'pay_per_use':
        return 'Pay-per-use';
      case 'monthly':
        return 'Mensal';
      default:
        return planType;
    }
  };

  if (subscriptions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
        <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma assinatura ativa</h3>
        <p className="text-gray-500">Você ainda não tem nenhuma assinatura. Escolha um plano para começar.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Minhas Assinaturas</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {subscriptions.map((subscription) => {
          const statusInfo = getStatusInfo(subscription.status);
          const StatusIcon = statusInfo.icon;
          
          return (
            <div key={subscription.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <CreditCard className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {subscription.planId === 'basic-monthly' ? 'Plano Básico' : 
                       subscription.planId === 'pro-monthly' ? 'Plano Pro' : 
                       'Plano ' + subscription.planId}
                    </h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-500">
                        {getPlanTypeName(subscription.planType)}
                      </span>
                      <span className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                        {formatDate(subscription.startDate)}
                        {subscription.endDate && (
                          <>
                            <span className="mx-1">-</span>
                            {formatDate(subscription.endDate)}
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-medium text-gray-900">
                      {formatCurrency(subscription.amount)}
                    </div>
                    <div className="flex items-center text-sm">
                      <StatusIcon className={`w-4 h-4 mr-1 ${statusInfo.className}`} />
                      <span className={statusInfo.className}>{statusInfo.text}</span>
                    </div>
                  </div>
                  
                  {subscription.status === 'active' && subscription.planType === 'monthly' && (
                    <button
                      onClick={() => onCancelSubscription(subscription.id)}
                      className="px-3 py-1 text-sm text-red-600 hover:text-red-800 border border-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
              
              {subscription.autoRenew && subscription.status === 'active' && (
                <div className="mt-3 flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Renovação automática ativada</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}