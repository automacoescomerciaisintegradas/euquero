import React, { useState, useEffect } from 'react';
import { 
  Instagram, 
  CheckCircle, 
  AlertCircle, 
  Upload, 
  Image, 
  Hash,
  MessageSquare,
  Bot,
  Video
} from 'lucide-react';

interface InstagramAccount {
  connected: boolean;
  username?: string;
  full_name?: string;
  followers_count?: number;
  following_count?: number;
  media_count?: number;
  is_verified?: boolean;
  is_business?: boolean;
  last_sync?: string;
}

interface AutomationFeature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  usageCount: number;
}

interface InstagramSetupProps {
  userId: string;
  onConnectionChange?: (connected: boolean) => void;
}

export const InstagramSetup: React.FC<InstagramSetupProps> = ({
  userId,
  onConnectionChange
}) => {
  const [account, setAccount] = useState<InstagramAccount>({ connected: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadData, setUploadData] = useState({
    imageUrl: '',
    caption: '',
    hashtags: ''
  });
  const [activeAutomationTab, setActiveAutomationTab] = useState<'post' | 'dm' | 'live'>('post');
  const [automationFeatures, setAutomationFeatures] = useState<AutomationFeature[]>([
    {
      id: 'post-comments',
      name: 'Respostas a Comentários',
      description: 'Responda automaticamente a comentários em posts',
      enabled: false,
      usageCount: 0
    },
    {
      id: 'post-dms',
      name: 'Mensagens Diretas',
      description: 'Envie DMs automáticas após interações',
      enabled: false,
      usageCount: 0
    },
    {
      id: 'dm-auto',
      name: 'Autoatendimento',
      description: 'Responda perguntas frequentes automaticamente',
      enabled: false,
      usageCount: 0
    },
    {
      id: 'live-chat',
      name: 'Chat ao Vivo',
      description: 'Respostas automáticas durante transmissões',
      enabled: false,
      usageCount: 0
    }
  ]);

  // Buscar informações da conta conectada
  const fetchAccountInfo = async () => {
    try {
      const response = await fetch(`/api/instagram/account/${userId}`);
      const data = await response.json();
      
      if (response.ok && data.success) {
        setAccount({
          connected: data.connected,
          ...data.account
        });
        onConnectionChange?.(data.connected);
      } else {
        // Se não houver conta conectada, mantém o estado desconectado
        setAccount({ connected: false });
        onConnectionChange?.(false);
      }
    } catch (_err) {
      console.error('Erro ao buscar informações da conta:', _err);
      setAccount({ connected: false });
      onConnectionChange?.(false);
    }
  };

  // Conectar conta do Instagram via OAuth
  const connectInstagram = () => {
    // Redirecionar para o endpoint de autenticação do Facebook/Instagram OAuth
    window.location.href = '/api/auth/facebook';
  };

  // Desconectar conta
  const disconnectInstagram = async () => {
    setLoading(true);

    try {
      const response = await fetch(`/api/instagram/disconnect/${userId}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setAccount({ connected: false });
        onConnectionChange?.(false);
      } else {
        setError(data.message || 'Erro ao desconectar conta');
      }
    } catch (_err) {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  // Upload de foto
  const uploadPhoto = async () => {
    if (!uploadData.imageUrl || !uploadData.caption) {
      setError('Por favor, preencha URL da imagem e legenda');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const hashtags = uploadData.hashtags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const response = await fetch('/api/instagram/upload-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          imageUrl: uploadData.imageUrl,
          caption: uploadData.caption,
          hashtags
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setUploadData({ imageUrl: '', caption: '', hashtags: '' });
        setShowUpload(false);
        alert('Foto enviada com sucesso para o Instagram!');
      } else {
        setError(data.message || 'Erro ao enviar foto');
      }
    } catch (_err) {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  // Alternar estado de automação
  const toggleAutomationFeature = (id: string) => {
    setAutomationFeatures(prev => 
      prev.map(feature => 
        feature.id === id 
          ? { ...feature, enabled: !feature.enabled } 
          : feature
      )
    );
  };

  // Configurar automação de comentários
  const configureCommentAutomation = () => {
    alert('Configuração de automação de comentários aberta');
  };

  // Configurar automação de DMs
  const configureDMAutomation = () => {
    alert('Configuração de automação de DMs aberta');
  };

  // Configurar automação ao vivo
  const configureLiveAutomation = () => {
    alert('Configuração de automação ao vivo aberta');
  };

  useEffect(() => {
    fetchAccountInfo();
  }, [userId, fetchAccountInfo]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Instagram className="w-8 h-8 text-pink-600" />
        <h3 className="text-xl font-bold text-gray-800">Configuração do Instagram</h3>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {!account.connected ? (
        /* Formulário de Conexão OAuth */
        <div>
          <p className="text-gray-600 mb-6">
            Conecte sua conta do Instagram Business para começar a automatizar suas postagens.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-900 mb-2">Requisitos:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Conta do Instagram Business</li>
              <li>• Conta do Facebook conectada ao Instagram</li>
              <li>• Permissões de administrador nas contas</li>
            </ul>
          </div>

          <button
            onClick={connectInstagram}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Redirecionando...
              </>
            ) : (
              <>
                <Instagram className="w-5 h-5" />
                Conectar com Facebook
              </>
            )}
          </button>

          <p className="text-xs text-gray-500 mt-4 text-center">
            Você será redirecionado para o Facebook para autorizar a conexão com sua conta do Instagram Business.
          </p>
        </div>
      ) : (
        /* Conta Conectada */
        <div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-800">Conta conectada com sucesso!</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Usuário:</span> @{account.username}
              </div>
              <div>
                <span className="font-medium">Nome:</span> {account.full_name}
              </div>
              <div>
                <span className="font-medium">Seguidores:</span> {account.followers_count?.toLocaleString()}
              </div>
              <div>
                <span className="font-medium">Seguindo:</span> {account.following_count?.toLocaleString()}
              </div>
              <div>
                <span className="font-medium">Posts:</span> {account.media_count}
              </div>
              <div>
                <span className="font-medium">Tipo:</span> {account.is_business ? 'Empresarial' : 'Pessoal'}
              </div>
            </div>
          </div>

          {/* Abas de Automação */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveAutomationTab('post')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeAutomationTab === 'post'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  Postagens
                </button>
                <button
                  onClick={() => setActiveAutomationTab('dm')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeAutomationTab === 'dm'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Bot className="w-4 h-4 inline mr-2" />
                  DMs
                </button>
                <button
                  onClick={() => setActiveAutomationTab('live')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeAutomationTab === 'live'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Video className="w-4 h-4 inline mr-2" />
                  Lives
                </button>
              </nav>
            </div>

            <div className="mt-4">
              {activeAutomationTab === 'post' && (
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-800">Automação de Postagens</h4>
                  <p className="text-sm text-gray-600">
                    Configure respostas automáticas para comentários em posts, stories, reels e remixes.
                  </p>
                  <button
                    onClick={configureCommentAutomation}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Configurar Automação
                  </button>
                </div>
              )}

              {activeAutomationTab === 'dm' && (
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-800">Automação de Mensagens Diretas</h4>
                  <p className="text-sm text-gray-600">
                    Configure mensagens automáticas de boas-vindas e respostas para perguntas frequentes.
                  </p>
                  <button
                    onClick={configureDMAutomation}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Configurar Automação
                  </button>
                </div>
              )}

              {activeAutomationTab === 'live' && (
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-800">Automação em Lives</h4>
                  <p className="text-sm text-gray-600">
                    Configure respostas automáticas durante transmissões ao vivo e envio de links de compra.
                  </p>
                  <button
                    onClick={configureLiveAutomation}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Configurar Automação
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Recursos de Automação */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-800 mb-3">Recursos de Automação</h4>
            <div className="space-y-3">
              {automationFeatures.map((feature) => (
                <div key={feature.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{feature.name}</p>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{feature.usageCount} usos</span>
                    <button
                      onClick={() => toggleAutomationFeature(feature.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        feature.enabled ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          feature.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {!showUpload ? (
            <div className="flex gap-3">
              <button
                onClick={() => setShowUpload(true)}
                className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Upload className="w-5 h-5" />
                Enviar Foto
              </button>
              
              <button
                onClick={disconnectInstagram}
                disabled={loading}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Desconectar
              </button>
            </div>
          ) : (
            /* Formulário de Upload */
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Image className="w-4 h-4 inline mr-2" />
                  URL da Imagem
                </label>
                <input
                  type="url"
                  value={uploadData.imageUrl}
                  onChange={(e) => setUploadData(prev => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="https://exemplo.com/imagem.jpg"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Legenda
                </label>
                <textarea
                  value={uploadData.caption}
                  onChange={(e) => setUploadData(prev => ({ ...prev, caption: e.target.value }))}
                  placeholder="Escreva a legenda da sua postagem..."
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Hash className="w-4 h-4 inline mr-2" />
                  Hashtags (separadas por vírgula)
                </label>
                <input
                  type="text"
                  value={uploadData.hashtags}
                  onChange={(e) => setUploadData(prev => ({ ...prev, hashtags: e.target.value }))}
                  placeholder="instagram, automacao, marketing"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={uploadPhoto}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? 'Enviando...' : 'Enviar Foto'}
                </button>
                
                <button
                  onClick={() => setShowUpload(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};