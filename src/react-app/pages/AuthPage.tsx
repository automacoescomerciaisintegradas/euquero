import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import OAuthButtons from '../components/auth/OAuthButtons';
import { type LoginData, type RegisterData } from '../../shared/types';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleLogin = async (data: LoginData) => {
    setLoading(true);
    setMessage(null);

    try {
      // Simular login bem-sucedido para demo
      await new Promise(resolve => setTimeout(resolve, 1000));

      setMessage({ type: 'success', text: 'Login realizado com sucesso!' });

      // Redirecionar para dashboard
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);

    } catch {
      setMessage({ type: 'error', text: 'Erro de conexão. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (data: RegisterData) => {
    setLoading(true);
    setMessage(null);

    try {
      // Simular cadastro bem-sucedido para demo
      await new Promise(resolve => setTimeout(resolve, 1000));

      setMessage({
        type: 'success',
        text: 'Cadastro realizado com sucesso! Verifique seu email para confirmar a conta.'
      });
      setActiveTab('login');

    } catch {
      setMessage({ type: 'error', text: 'Erro de conexão. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google';
  };

  const handleGitHubLogin = () => {
    window.location.href = '/api/auth/github';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Eu<span className="text-blue-600">Quero</span>
          </h1>
        </div>

        {/* Tabs */}
        <div className="mt-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 px-4 text-center border-b-2 font-medium text-sm ${activeTab === 'login'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Entrar
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2 px-4 text-center border-b-2 font-medium text-sm ${activeTab === 'register'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Cadastrar
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Mensagem de feedback */}
          {message && (
            <div className={`mb-6 p-4 rounded-md ${message.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
              <p className="text-sm">{message.text}</p>
            </div>
          )}

          {/* Formulários */}
          {activeTab === 'login' ? (
            <div>
              <LoginForm onSubmit={handleLogin} loading={loading} />
              <div className="mt-6">
                <OAuthButtons
                  loading={loading}
                  onGoogleLogin={handleGoogleLogin}
                  onGitHubLogin={handleGitHubLogin}
                />
              </div>
            </div>
          ) : (
            <div>
              <RegisterForm onSubmit={handleRegister} loading={loading} />
              <div className="mt-6">
                <OAuthButtons
                  loading={loading}
                  onGoogleLogin={handleGoogleLogin}
                  onGitHubLogin={handleGitHubLogin}
                />
              </div>
            </div>
          )}
        </div>

        {/* Links */}
        <div className="mt-6 text-center space-y-2">
          <div>
            <a
              href="/dashboard"
              className="text-sm text-green-600 hover:text-green-800 hover:underline font-medium"
            >
              🚀 Acessar Dashboard (Demo)
            </a>
          </div>
          <div>
            <a
              href="/"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              ← Voltar para página inicial
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}