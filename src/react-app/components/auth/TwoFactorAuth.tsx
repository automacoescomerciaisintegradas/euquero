import React, { useState } from 'react';
import { use2FA } from '../hooks/use2FA';
import { QrCode, Shield, X } from 'lucide-react';

interface TwoFactorAuthProps {
  onClose: () => void;
}

export default function TwoFactorAuth({ onClose }: TwoFactorAuthProps) {
  const [token, setToken] = useState('');
  const [step, setStep] = useState<'setup' | 'verify' | 'success'>('setup');

  const { isLoading, qrCodeUri, setup2FA, verify2FA } = use2FA({
    onSuccess: () => {
      if (step === 'setup') {
        setStep('verify');
      } else if (step === 'verify') {
        setStep('success');
        // Fechar modal após 2 segundos
        setTimeout(onClose, 2000);
      }
    },
    onError: (error) => {
      console.error('Erro 2FA:', error);
      alert(error);
    }
  });

  const handleSetup = async () => {
    await setup2FA();
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (token.length === 6) {
      await verify2FA(token);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Autenticação de Dois Fatores</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'setup' && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="mx-auto bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Proteja sua conta</h4>
              <p className="text-sm text-gray-500">
                Adicione uma camada extra de segurança à sua conta.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="font-medium text-blue-800 mb-2">Como funciona?</h5>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Instale um app de autenticação (Google Authenticator, Authy, etc.)</li>
                <li>• Escaneie o código QR ou insira o código manualmente</li>
                <li>• Digite o código de 6 dígitos gerado pelo app</li>
              </ul>
            </div>

            <button
              onClick={handleSetup}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {isLoading ? 'Configurando...' : 'Configurar 2FA'}
            </button>
          </div>
        )}

        {step === 'verify' && (
          <div className="space-y-4">
            <div className="text-center">
              <h4 className="font-medium text-gray-900 mb-2">Configurar 2FA</h4>
              <p className="text-sm text-gray-500 mb-4">
                Escaneie o código QR com seu app de autenticação
              </p>
            </div>

            {qrCodeUri ? (
              <div className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrCodeUri)}&size=200x200`} 
                    alt="QR Code para 2FA" 
                    className="w-48 h-48"
                  />
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Ou insira manualmente este código no seu app de autenticação
                </p>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="bg-gray-200 rounded-lg w-48 h-48 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            )}

            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-1">
                  Código de Verificação
                </label>
                <input
                  type="text"
                  id="token"
                  value={token}
                  onChange={(e) => setToken(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-lg tracking-widest"
                  maxLength={6}
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || token.length !== 6}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {isLoading ? 'Verificando...' : 'Verificar Código'}
              </button>
            </form>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-6">
            <div className="mx-auto bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">2FA Ativada!</h4>
            <p className="text-sm text-gray-500">
              A autenticação de dois fatores foi ativada com sucesso.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}