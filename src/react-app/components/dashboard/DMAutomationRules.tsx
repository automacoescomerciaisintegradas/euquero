import React, { useState } from 'react';
import { Plus, Edit, Trash2, Play, Pause } from 'lucide-react';
import type { DMAutomationRule } from '../../../shared/types';

interface DMAutomationRulesProps {
  rules: DMAutomationRule[];
  onCreateRule: (rule: Omit<DMAutomationRule, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<any>;
  onUpdateRule: (id: string, updates: Partial<DMAutomationRule>) => Promise<any>;
  onDeleteRule: (id: string) => Promise<any>;
}

const DMAutomationRules: React.FC<DMAutomationRulesProps> = ({
  rules,
  onCreateRule,
  onUpdateRule,
  onDeleteRule
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingRule, setEditingRule] = useState<DMAutomationRule | null>(null);
  const [formData, setFormData] = useState({
    triggerType: 'welcome' as 'welcome' | 'keyword' | 'story_reply',
    keywords: '',
    message: '',
    delay: 0,
    active: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const ruleData = {
      triggerType: formData.triggerType,
      keywords: formData.keywords ? formData.keywords.split(',').map(k => k.trim()).filter(k => k) : undefined,
      message: formData.message,
      delay: formData.delay,
      active: formData.active
    };
    
    if (editingRule) {
      await onUpdateRule(editingRule.id, ruleData);
    } else {
      await onCreateRule(ruleData);
    }
    
    resetForm();
  };

  const handleEdit = (rule: DMAutomationRule) => {
    setEditingRule(rule);
    setFormData({
      triggerType: rule.triggerType,
      keywords: rule.keywords ? rule.keywords.join(', ') : '',
      message: rule.message,
      delay: rule.delay || 0,
      active: rule.active
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta regra?')) {
      await onDeleteRule(id);
    }
  };

  const resetForm = () => {
    setEditingRule(null);
    setFormData({
      triggerType: 'welcome',
      keywords: '',
      message: '',
      delay: 0,
      active: true
    });
    setShowForm(false);
  };

  const toggleRuleStatus = async (id: string, active: boolean) => {
    await onUpdateRule(id, { active: !active });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            Regras de Automação de Mensagens Diretas
          </h3>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nova Regra
          </button>
        </div>
      </div>
      
      {showForm && (
        <div className="p-6 border-b border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Gatilho
              </label>
              <select
                value={formData.triggerType}
                onChange={(e) => setFormData(prev => ({ ...prev, triggerType: e.target.value as any }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="welcome">Mensagem de Boas-vindas</option>
                <option value="keyword">Resposta a Palavra-chave</option>
                <option value="story_reply">Resposta a Story</option>
              </select>
            </div>
            
            {formData.triggerType === 'keyword' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Palavras-chave (separadas por vírgula)
                </label>
                <input
                  type="text"
                  value={formData.keywords}
                  onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
                  placeholder="ex: dúvida, ajuda, suporte"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mensagem Automática
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Digite a mensagem que será enviada automaticamente"
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delay (minutos)
              </label>
              <input
                type="number"
                min="0"
                max="1440"
                value={formData.delay}
                onChange={(e) => setFormData(prev => ({ ...prev, delay: parseInt(e.target.value) || 0 }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Tempo de espera antes de enviar a mensagem (0 para enviar imediatamente)
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Regra ativa</span>
              </label>
              
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingRule ? 'Atualizar' : 'Criar'} Regra
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      
      <div className="divide-y divide-gray-200">
        {rules.length === 0 ? (
          <div className="p-12 text-center">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Edit className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-800 mb-2">Nenhuma regra configurada</h4>
            <p className="text-gray-600 mb-4">
              Crie sua primeira regra para automatizar mensagens diretas
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Criar Primeira Regra
            </button>
          </div>
        ) : (
          rules.map((rule) => (
            <div key={rule.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-flex w-3 h-3 rounded-full ${rule.active ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                    <h4 className="font-medium text-gray-800">
                      {rule.triggerType === 'welcome' && 'Boas-vindas'}
                      {rule.triggerType === 'keyword' && `Palavras-chave: ${rule.keywords?.join(', ')}`}
                      {rule.triggerType === 'story_reply' && 'Resposta a Story'}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{rule.message}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>
                      Delay: {rule.delay || 0} min
                    </span>
                    <span>
                      Criada em: {rule.createdAt.toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleRuleStatus(rule.id, rule.active)}
                    className={`p-2 rounded-lg ${rule.active ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}
                  >
                    {rule.active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleEdit(rule)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-gray-100 rounded-lg"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(rule.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DMAutomationRules;