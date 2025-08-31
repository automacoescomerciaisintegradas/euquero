import React from 'react';
import { Wallet, Plus, Clock } from 'lucide-react';
import type { CreditBalance } from '../../../shared/types';

interface CreditCardProps {
  balance: CreditBalance;
  onRecharge: () => void;
}

export default function CreditCard({ balance, onRecharge }: CreditCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(date));
  };

  const isLowBalance = balance.balance < 10;
  const isExpiringSoon = new Date(balance.expiresAt).getTime() - Date.now() < 30 * 24 * 60 * 60 * 1000; // 30 dias

  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Wallet className="w-6 h-6" />
          <h3 className="text-lg font-semibold">Saldo de Créditos</h3>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-3xl font-bold mb-1">
          {formatCurrency(balance.balance)}
        </div>
        <div className="text-blue-100 text-sm">
          Saldo disponível
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>Válido até: {formatDate(balance.expiresAt)}</span>
        </div>
        {isExpiringSoon && (
          <span className="bg-yellow-500/20 text-yellow-100 px-2 py-1 rounded text-xs">
            Expira em breve
          </span>
        )}
      </div>

      {/* Botão de Recarga Grande e Responsivo */}
      <button
        onClick={onRecharge}
        className="w-full mt-4 bg-white/20 hover:bg-white/30 active:bg-white/40 rounded-xl p-4 transition-all duration-200 transform hover:scale-105 active:scale-95 border border-white/30 hover:border-white/50"
      >
        <div className="flex items-center justify-center space-x-3">
          <div className="bg-white/30 rounded-full p-2">
            <Plus className="w-6 h-6" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-lg">Recarregar Créditos</div>
            <div className="text-sm text-blue-100">Via PIX • Instantâneo</div>
          </div>
        </div>
      </button>

      {isLowBalance && (
        <div className="mt-4 bg-red-500/20 border border-red-400/30 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <span className="text-sm">Saldo baixo - Recarregue para continuar usando</span>
          </div>
        </div>
      )}
    </div>
  );
}