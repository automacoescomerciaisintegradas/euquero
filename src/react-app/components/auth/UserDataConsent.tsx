import React from 'react';

interface UserDataConsentProps {
  onConsentChange: (consent: boolean) => void;
  consentGiven: boolean;
  disabled?: boolean;
}

const UserDataConsent = ({ onConsentChange, consentGiven, disabled = false }: UserDataConsentProps) => {
  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 mb-2">
          Consentimento para Processamento de Dados
        </h4>
        <p className="text-xs text-gray-600 mb-4">
          Ao criar uma conta, você concorda que possamos coletar e processar seus dados pessoais de acordo com nossa 
          <a href="/privacidade" className="text-blue-600 hover:text-blue-800 ml-1">
            Política de Privacidade
          </a>
          . Seus dados serão utilizados para:
        </p>
        <ul className="text-xs text-gray-600 space-y-2">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Fornecer e melhorar nossos serviços de automação</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Processar suas transações e gerenciar sua conta</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Enviar comunicações importantes sobre o serviço</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Personalizar sua experiência na plataforma</span>
          </li>
        </ul>
      </div>

      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          id="dataConsent"
          checked={consentGiven}
          onChange={(e) => onConsentChange(e.target.checked)}
          disabled={disabled}
          className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <div>
          <label htmlFor="dataConsent" className="text-sm text-gray-700 font-medium">
            Concordo com o processamento dos meus dados pessoais
          </label>
          <p className="text-xs text-gray-500 mt-1">
            Você pode revogar este consentimento a qualquer momento através das configurações da sua conta.
            A revogação não afeta a legalidade do processamento com base no consentimento antes da revogação.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDataConsent;