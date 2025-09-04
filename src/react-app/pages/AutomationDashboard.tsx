import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { 
  MessageSquare, 
  Send, 
  Calendar, 
  BarChart3, 
  Settings, 
  Instagram,
  Plus,
  Play,
  Pause,
  Edit,
  Trash2
} from 'lucide-react';
import type { DMAutomationRule } from '../../shared/types';
import DMAutomationRules from '../components/dashboard/DMAutomationRules';

// Mocked user ID for development
const MOCK_USER_ID = '1';
const API_BASE_URL = 'http://127.0.0.1:8787'; // Make sure this matches your worker's address

export const AutomationDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('messages'); // Default to messages tab
  const [dmRules, setDmRules] = useState<DMAutomationRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
    { id: 'comments', label: 'Comentários', icon: MessageSquare },
    { id: 'messages', label: 'Mensagens', icon: Send },
    { id: 'posts', label: 'Agendamentos', icon: Calendar },
    { id: 'analytics', label: 'Relatórios', icon: BarChart3 },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  // Fetch DM rules from the worker
  useEffect(() => {
    const fetchDmRules = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/automation/dm-rules/${MOCK_USER_ID}`);
        if (!response.ok) {
          throw new Error('Falha ao buscar as regras de DM.');
        }
        const data = await response.json();
        // The worker returns dates as strings, so we convert them back to Date objects
        const rulesWithDates = data.rules.map((rule: any) => ({ ...rule, createdAt: new Date(rule.createdAt), updatedAt: new Date(rule.updatedAt) }));
        setDmRules(rulesWithDates);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === 'messages') {
      fetchDmRules();
    }
  }, [activeTab]);

  const handleCreateRule = async (ruleData: Omit<DMAutomationRule, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/automation/dm-rules`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...ruleData, userId: MOCK_USER_ID }),
      });
      if (!response.ok) {
        throw new Error('Falha ao criar a regra.');
      }
      const newRule = await response.json();
      const ruleWithDate = { ...newRule.rule, createdAt: new Date(newRule.rule.createdAt), updatedAt: new Date(newRule.rule.updatedAt) };
      setDmRules(prev => [...prev, ruleWithDate]);
    } catch (err: any) {
      setError(err.message);
      // Optionally re-throw or handle error display to the user
    }
  };

  const handleUpdateRule = async (id: string, updates: Partial<DMAutomationRule>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/automation/dm-rules/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!response.ok) {
        throw new Error('Falha ao atualizar a regra.');
      }
      const updatedRule = await response.json();
      const ruleWithDate = { ...updatedRule.rule, createdAt: new Date(updatedRule.rule.createdAt), updatedAt: new Date(updatedRule.rule.updatedAt) };
      setDmRules(prev => prev.map(rule => (rule.id === id ? ruleWithDate : rule)));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteRule = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/automation/dm-rules/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Falha ao excluir a regra.');
      }
      setDmRules(prev => prev.filter(rule => rule.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Mock data for other sections (can be replaced with real data later)
  const automations = [
    { id: 1, type: 'Comentários', name: 'Resposta para "preço"', status: 'active', triggers: 12, responses: 8 },
    { id: 2, type: 'DM', name: 'Boas-vindas automáticas', status: 'active', triggers: 25, responses: 25 },
    { id: 3, type: 'Agendamento', name: 'Posts diários', status: 'paused', triggers: 0, responses: 0 }
  ];
  const metrics = { totalAutomations: 3, activeAutomations: 2, totalResponses: 156, savedTime: '4.2h' };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header do Dashboard */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Painel de Automação</h1>
              <p className="text-gray-600">Gerencie suas automações de redes sociais</p>
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Nova Automação
            </button>
          </div>

          {/* Conexão com Instagram */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Instagram className="w-8 h-8" />
                <div>
                  <h3 className="text-lg font-semibold">Conectar Instagram</h3>
                  <p className="opacity-90">Conecte sua conta para começar a automatizar</p>
                </div>
              </div>
              <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Conectar Agora
              </button>
            </div>
          </div>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total de Automações</p>
                <p className="text-2xl font-bold text-gray-800">{metrics.totalAutomations}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Settings className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Automações Ativas</p>
                <p className="text-2xl font-bold text-green-600">{metrics.activeAutomations}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Play className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Respostas Enviadas</p>
                <p className="text-2xl font-bold text-purple-600">{metrics.totalResponses}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Send className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Tempo Economizado</p>
                <p className="text-2xl font-bold text-orange-600">{metrics.savedTime}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Automações Recentes</h3>
                <div className="space-y-4">
                  {automations.map((automation) => (
                    <div key={automation.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${
                          automation.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                        }`}></div>
                        <div>
                          <h4 className="font-medium text-gray-800">{automation.name}</h4>
                          <p className="text-sm text-gray-600">{automation.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-800">{automation.triggers}</p>
                          <p className="text-xs text-gray-600">Acionamentos</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-800">{automation.responses}</p>
                          <p className="text-xs text-gray-600">Respostas</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                            {automation.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'comments' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Automação de Comentários</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Nova Regra
                  </button>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Configure Respostas Automáticas</h4>
                  <p className="text-gray-600 mb-4">
                    Crie regras para responder automaticamente comentários com palavras-chave específicas
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Criar Primeira Regra
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div>
                {loading && <p>Carregando regras...</p>}
                {error && <p className="text-red-500">Erro: {error}</p>}
                {!loading && !error && (
                  <DMAutomationRules 
                    rules={dmRules}
                    onCreateRule={handleCreateRule}
                    onUpdateRule={handleUpdateRule}
                    onDeleteRule={handleDeleteRule}
                  />
                )}
              </div>
            )}

            {activeTab === 'posts' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Agendamento de Posts</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Agendar Post
                  </button>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Agende seus Posts</h4>
                  <p className="text-gray-600 mb-4">
                    Programe suas publicações para os melhores horários de engajamento
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Criar Agendamento
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Relatórios e Analytics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-gray-800 mb-4">Performance das Automações</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Taxa de Resposta</span>
                        <span className="font-medium">87%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tempo Médio de Resposta</span>
                        <span className="font-medium">2.3s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Satisfação do Cliente</span>
                        <span className="font-medium">94%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-gray-800 mb-4">Engajamento</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Comentários Respondidos</span>
                        <span className="font-medium">156</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">DMs Enviadas</span>
                        <span className="font-medium">89</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Posts Agendados</span>
                        <span className="font-medium">24</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Configurações</h3>
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-gray-800 mb-4">Contas Conectadas</h4>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white">
                      <div className="flex items-center gap-3">
                        <Instagram className="w-6 h-6 text-purple-600" />
                        <div>
                          <p className="font-medium text-gray-800">Instagram Business</p>
                          <p className="text-sm text-gray-600">Não conectado</p>
                        </div>
                      </div>
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                        Conectar
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-gray-800 mb-4">Configurações Gerais</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">Notificações por Email</p>
                          <p className="text-sm text-gray-600">Receba relatórios semanais</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">Modo Seguro</p>
                          <p className="text-sm text-gray-600">Revisar automações antes de enviar</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};