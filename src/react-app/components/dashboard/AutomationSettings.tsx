import React, { useState } from 'react';
import { Settings, Save, RotateCcw } from 'lucide-react';

interface AutomationSettingsProps {
  onSave: (settings: any) => void;
}

const AutomationSettings: React.FC<AutomationSettingsProps> = ({ onSave }) => {
  const [settings, setSettings] = useState({
    responseDelay: 5, // segundos
    dailyLimit: 100,
    safeMode: true,
    notifications: true,
    autoPauseOnError: true
  });

  const handleChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onSave(settings);
    alert('Configurações salvas com sucesso!');
  };

  const handleReset = () => {
    setSettings({
      responseDelay: 5,
      dailyLimit: 100,
      safeMode: true,
      notifications: true,
      autoPauseOnError: true
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configurações de Automação
          </h3>
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Resetar
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Salvar
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Delay de Resposta */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Delay de Resposta (segundos)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="60"
              value={settings.responseDelay}
              onChange={(e) => handleChange('responseDelay', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-800 w-12">
              {settings.responseDelay}s
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Tempo de espera antes de enviar respostas automáticas
          </p>
        </div>
        
        {/* Limite Diário */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Limite Diário de Interações
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={settings.dailyLimit}
              onChange={(e) => handleChange('dailyLimit', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-800 w-16">
              {settings.dailyLimit}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Número máximo de interações por dia para evitar bloqueios
          </p>
        </div>
        
        {/* Modo Seguro */}
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Modo Seguro
            </label>
            <p className="text-xs text-gray-500 mt-1">
              Revisar automações antes de enviar (recomendado)
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.safeMode}
              onChange={(e) => handleChange('safeMode', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        {/* Notificações */}
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notificações
            </label>
            <p className="text-xs text-gray-500 mt-1">
              Receber notificações por email sobre automações
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => handleChange('notifications', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        {/* Pausa Automática em Erros */}
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pausa Automática em Erros
            </label>
            <p className="text-xs text-gray-500 mt-1">
              Pausar automações automaticamente se detectar erros
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.autoPauseOnError}
              onChange={(e) => handleChange('autoPauseOnError', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default AutomationSettings;