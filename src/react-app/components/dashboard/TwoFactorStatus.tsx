import React, { useState } from 'react';
import { Shield, ShieldCheck, ShieldX, QrCode } from 'lucide-react';
import TwoFactorAuth from '../auth/TwoFactorAuth';

interface TwoFactorStatusProps {
  is2FAEnabled: boolean;
  onToggle2FA: () => void;
}

export default function TwoFactorStatus({ is2FAEnabled, onToggle2FA }: TwoFactorStatusProps) {
  const [show2FAModal, setShow2FAModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {is2FAEnabled ? (
              <ShieldCheck className="w-8 h-8 text-green-500" />
            ) : (
              <ShieldX className="w-8 h-8 text-red-500" />
            )}
            <div>
              <h3 className="font-semibold text-gray-900">Autenticação de Dois Fatores</h3>
              <p className="text-sm text-gray-500">
                {is2FAEnabled 
                  ? '2FA está ativada na sua conta' 
                  : 'Adicione uma camada extra de segurança'}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setShow2FAModal(true)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              is2FAEnabled
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            {is2FAEnabled ? 'Desativar' : 'Ativar'}
          </button>
        </div>
        
        {!is2FAEnabled && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <QrCode className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-700">
                Recomendamos ativar a 2FA para proteger sua conta contra acessos não autorizados.
              </p>
            </div>
          </div>
        )}
      </div>

      {show2FAModal && (
        <TwoFactorAuth onClose={() => setShow2FAModal(false)} />
      )}
    </>
  );
}