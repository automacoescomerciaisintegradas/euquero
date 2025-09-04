import React, { useState } from 'react';
import { X, CheckCircle, UploadCloud, File as FileIcon } from 'lucide-react';
import PixQRCode from './PixQRCode';

interface PixPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  pixKey: string;
  pixEmail: string;
  pixCode: string;
  onPaymentConfirmed: (receiptFile: File) => void;
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
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setReceiptFile(event.target.files[0]);
    }
  };

  const handlePaymentConfirmed = () => {
    if (receiptFile) {
      onPaymentConfirmed(receiptFile);
    } else {
      alert('Por favor, anexe o comprovante de pagamento.');
    }
  };

  const handleClose = () => {
    setReceiptFile(null); // Reset file on close
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
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <PixQRCode
            amount={amount}
            pixKey={pixKey}
            pixEmail={pixEmail}
            pixCode={pixCode}
          />
          
          {/* Receipt Upload Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Anexar Comprovante</h3>
            <p className="text-sm text-gray-600 mb-4">
              Para agilizar a liberação do seu acesso, por favor, anexe o comprovante do pagamento PIX.
            </p>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                {receiptFile ? (
                  <>
                    <FileIcon className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
                    <p className="mt-2 text-sm font-semibold text-gray-600">{receiptFile.name}</p>
                    <p className="text-xs text-gray-500">{(receiptFile.size / 1024).toFixed(2)} KB</p>
                    <button
                      onClick={() => setReceiptFile(null)}
                      className="mt-4 text-sm font-medium text-red-600 hover:text-red-500"
                    >
                      Remover
                    </button>
                  </>
                ) : (
                  <>
                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                      >
                        <span>Carregue um arquivo</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/png, image/jpeg, application/pdf" />
                      </label>
                      <p className="pl-1">ou arraste e solte</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, PDF até 10MB</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <div className="text-sm text-gray-600">
            Aguardando confirmação do pagamento...
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Fechar
            </button>
            <button
              onClick={handlePaymentConfirmed}
              disabled={!receiptFile}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Já Paguei e Anexei o Comprovante
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
