import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, Filter, Download, Calendar } from 'lucide-react';
import type { CreditTransaction } from '../../../shared/types';

interface TransactionHistoryProps {
  transactions: CreditTransaction[];
  onExport?: () => void;
}

export default function TransactionHistory({ transactions, onExport }: TransactionHistoryProps) {
  const [filter, setFilter] = useState<'all' | 'credit' | 'debit'>('all');
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');

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
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluído';
      case 'pending':
        return 'Pendente';
      case 'failed':
        return 'Falhou';
      default:
        return status;
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (filter !== 'all' && transaction.type !== filter) return false;
    
    const transactionDate = new Date(transaction.createdAt);
    const now = new Date();
    
    switch (dateRange) {
      case '7d':
        return transactionDate >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      case '30d':
        return transactionDate >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      case '90d':
        return transactionDate >= new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      default:
        return true;
    }
  });

  const totalCredits = filteredTransactions
    .filter(t => t.type === 'credit' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalDebits = filteredTransactions
    .filter(t => t.type === 'debit' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Histórico de Transações</h2>
        {onExport && (
          <button
            onClick={onExport}
            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </button>
        )}
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'credit' | 'debit')}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todas as transações</option>
            <option value="credit">Apenas créditos</option>
            <option value="debit">Apenas débitos</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as '7d' | '30d' | '90d' | 'all')}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
            <option value="90d">Últimos 90 dias</option>
            <option value="all">Todo o período</option>
          </select>
        </div>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-1">
            <ArrowDownLeft className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">Total Creditado</span>
          </div>
          <div className="text-2xl font-bold text-green-900">
            {formatCurrency(totalCredits)}
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-1">
            <ArrowUpRight className="w-4 h-4 text-red-600" />
            <span className="text-sm font-medium text-red-800">Total Utilizado</span>
          </div>
          <div className="text-2xl font-bold text-red-900">
            {formatCurrency(totalDebits)}
          </div>
        </div>
      </div>

      {/* Lista de Transações */}
      <div className="space-y-3">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-lg mb-2">Nenhuma transação encontrada</div>
            <div className="text-sm">Ajuste os filtros para ver mais resultados</div>
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'credit' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-red-100 text-red-600'
                }`}>
                  {transaction.type === 'credit' ? (
                    <ArrowDownLeft className="w-4 h-4" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4" />
                  )}
                </div>

                <div>
                  <div className="font-medium text-gray-900">
                    {transaction.description}
                  </div>
                  <div className="text-sm text-gray-500">
                    {transaction.service} • {formatDate(transaction.createdAt)}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className={`font-semibold ${
                  transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'credit' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </div>
                <div className="text-right mt-1">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    getStatusColor(transaction.status)
                  }`}>
                    {getStatusLabel(transaction.status)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Paginação (se necessário) */}
      {filteredTransactions.length > 10 && (
        <div className="flex justify-center mt-6">
          <button className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 hover:underline">
            Ver mais transações
          </button>
        </div>
      )}
    </div>
  );
}