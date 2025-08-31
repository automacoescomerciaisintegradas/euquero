import React, { useState } from 'react';
import { X, CreditCard, Smartphone, FileText, AlertCircle } from 'lucide-react';
import { CreditRechargeSchema, type CreditRechargeData, type PaymentMethod } from '../../../shared/types';

interface CreditRechargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecharge: (data: CreditRechargeData) => Promise<void>;
  currentBalance: number;
  onShowPix: (amount: number) => void;
}

const paymentMethods: PaymentMethod[] = [
  {
    type: 'pix',
    minimumAmount: 50,
    processingTime: 'Instantâneo',
    fees: 0,
  },
];

const presetAmounts = [50, 100, 200, 500];

export default function CreditRechargeModal({ 
  isOpen, 
  onClose, 
  onRecharge, 
  currentBalance,
  onShowPix
}: CreditRechargeModalProps) {
  const [formData, setFormData] = useState<CreditRechargeData>({
    amount: 50,
    paymentMethod: 'pix',
  });
  const [customAmount, setCustomAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const selectedMethod = paymentMethods.find(m => m.type === formData.paymentMethod)!;
  const finalAmount = formData.amount + selectedMethod.fees;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const validatedData = CreditRechargeSchema.parse(formData);
      await onRecharge(validatedData);
      onShowPix(validatedData.amount);
      onClose();
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'errors' in error) {
        const newErrors: Record<string, string> = {};
        (error as { errors: Array<{ path: string[]; message: string }> }).errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAmountChange = (amount: number) => {
    setFormData(prev => ({ ...prev, amount }));
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 50) {
      setFormData(prev => ({ ...prev, amount: numValue }));
    }
  };

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case 'pix':
        return <Smartphone className="w-5 h-5" />;
      case 'credit_card':
        return <CreditCard className="w-5 h-5" />;
      case 'boleto':
        return <FileText className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getPaymentLabel = (type: string) => {
    switch (type) {
      case 'pix':
        return 'PIX';
      case 'credit_card':
        return 'Cartão de Crédito';
      case 'boleto':
        return 'Boleto Bancário';
      default:
        return type;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Recarregar Créditos</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Saldo Atual */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Saldo atual</div>
            <div className="text-2xl font-bold text-gray-900">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(currentBalance)}
            </div>
          </div>

          {/* Valores Pré-definidos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Valor da Recarga
            </label>
            <div className="grid grid-cols-2 gap-3 mb-3">
              {presetAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleAmountChange(amount)}
                  className={`p-3 rounded-lg border text-center transition-colors ${
                    formData.amount === amount && !customAmount
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(amount)}
                </button>
              ))}
            </div>

            {/* Valor Personalizado */}
            <div>
              <input
                type="number"
                placeholder="Valor personalizado (mín. R$ 50)"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="50"
                step="0.01"
              />
            </div>
            {errors.amount && (
              <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
            )}
          </div>

          {/* Método de Pagamento - PIX */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Método de Pagamento
            </label>
            <div className="flex items-center p-4 border-2 border-blue-500 bg-blue-50 rounded-lg">
              <Smartphone className="w-5 h-5 text-blue-600 mr-3" />
              <div className="flex-1">
                <div className="font-medium text-gray-900">PIX</div>
                <div className="text-sm text-gray-600">
                  Pagamento instantâneo • Sem taxas
                </div>
              </div>
              <div className="text-sm font-medium text-blue-600">
                Selecionado
              </div>
            </div>
          </div>

          {/* Resumo */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Valor da recarga:</span>
              <span className="font-medium">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(formData.amount)}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Taxa de processamento:</span>
              <span className="font-medium text-green-600">Grátis</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">Total a pagar:</span>
                <span className="font-bold text-lg text-blue-600">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(finalAmount)}
                </span>
              </div>
            </div>
          </div>

          {/* Informações PIX */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Informações PIX</h4>
            <div className="space-y-2 text-sm text-blue-800">
              <div>
                <strong>Email PIX:</strong> pix@automacoescomerciais.com.br
              </div>
              <div>
                <strong>Chave PIX:</strong> 857e068a-f857-43be-aba7-b70f083b611d
              </div>
            </div>
          </div>

          {/* Aviso */}
          <div className="flex items-start space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-800">
              <strong>Importante:</strong> Os créditos têm validade de 12 meses a partir da data de recarga.
            </div>
          </div>

          {/* Botões */}
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Processando...' : 'Recarregar'}
            </button>
          </div>
        </form>
      </div>


    </div>
  );
}