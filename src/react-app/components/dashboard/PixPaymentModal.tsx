import React from 'react';
import { X, CheckCircle } from 'lucide-react';
import PixQRCode from './PixQRCode';

interface PixPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  pixKey: string;
  pixEmail: string;
  pixCode: string;
  onPaymentConfirmed?: () => void;
}

export default function PixPaymentModal({
  isOpen,
  onClose,
  amount,
  pixKey,
  pixEmail,
  pixCode,
  onPaymentConfirmed
}: PixPaymentModalProps) {
  if (!isOpen) return null;

  const handlePaymentConfirmed = () => {
    if (onPaymentConfirmed) {
      onPaymentConfirmed();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">PIX Gerado com Sucesso!</h2>
              <p className="text-sm text-gray-600">Complete o pagamento para receber seus créditos</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <PixQRCode
            amount={amount}
            pixKey={pixKey}
            pixEmail={pixEmail}
            pixCode={pixCode}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <div className="text-sm text-gray-600">
            Aguardando confirmação do pagamento...
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Fechar
            </button>
            <button
              onClick={handlePaymentConfirmed}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Já Paguei
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}