import React, { useState, useEffect } from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import OAuthButtons from '../components/auth/OAuthButtons';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import ResetPasswordForm from '../components/auth/ResetPasswordForm';
import { type LoginData, type RegisterData } from '../../shared/types';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'forgot-password' | 'reset-password'>('login');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [referralCode, setReferralCode] = useState<string | null>(null);

  useEffect(() => {
    // Capturar código de indicação da URL
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    if (refCode) {
      setReferralCode(refCode);
      // Armazenar no localStorage para uso posterior
      localStorage.setItem('referralCode', refCode);
    }
  }, []);
  const [referralCode, setReferralCode] = useState<string | null>(null);

  const handleLogin = async (data: LoginData) => {
    setLoading(true);
    setMessage(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setMessage({ type: 'success', text: result.message || 'Login realizado com sucesso!' });

        // Redirecionar para dashboard
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
      } else {
        setMessage({ type: 'error', text: result.message || 'Erro ao fazer login. Tente novamente.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro de conexão. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (data: RegisterData) => {
    setLoading(true);
    setMessage(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      
      // Incluir código de indicação se existir
      const registrationData = {
        ...data,
        referralCode: referralCode || localStorage.getItem('referralCode')
      };

      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setMessage({
          type: 'success',
          text: result.message || 'Cadastro realizado com sucesso! Verifique seu email para confirmar a conta.'
        });
        setActiveTab('login');
        
        // Limpar código de indicação do localStorage após uso
        localStorage.removeItem('referralCode');
      } else {
        setMessage({ type: 'error', text: result.message || 'Erro ao fazer cadastro. Tente novamente.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro de conexão. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (email: string) => {
    setLoading(true);
    setMessage(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setMessage({
          type: 'success',
          text: result.message || 'Se o email estiver cadastrado, enviaremos instruções para recuperação da senha.'
        });
      } else {
        setMessage({ type: 'error', text: result.message || 'Erro ao solicitar recuperação de senha. Tente novamente.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro de conexão. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (token: string, newPassword: string) => {
    setLoading(true);
    setMessage(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setMessage({
          type: 'success',
          text: result.message || 'Senha redefinida com sucesso!'
        });
      } else {
        setMessage({ type: 'error', text: result.message || 'Erro ao redefinir senha. Tente novamente.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro de conexão. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  // Sempre redireciona para rotas relativas (GET)
  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google';
  };

  const handleGitHubLogin = () => {
    window.location.href = '/api/auth/github';
  };

  const handleFacebookLogin = () => {
    window.location.href = '/api/auth/facebook';
  };

  const handleWhatsAppLogin = () => {
    // Para o WhatsApp, vamos abrir diretamente o chat
    const phoneNumber = '5588988712711'; // Número do WhatsApp configurado
    const message = encodeURIComponent('Olá! Gostaria de fazer login na plataforma EuQuero.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
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

        {/* Tabs - apenas para login/register */}
        {(activeTab === 'login' || activeTab === 'register') && (
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
        )}
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
              <LoginForm 
                onSubmit={handleLogin} 
                loading={loading} 
                onForgotPassword={() => setActiveTab('forgot-password')}
              />
              <div className="mt-6">
                <OAuthButtons
                  loading={loading}
                  onGoogleLogin={handleGoogleLogin}
                  onGitHubLogin={handleGitHubLogin}
                  onFacebookLogin={handleFacebookLogin}
                  onWhatsAppLogin={handleWhatsAppLogin}
                />
              </div>
            </div>
          ) : activeTab === 'register' ? (
            <div>
              <RegisterForm onSubmit={handleRegister} loading={loading} />
              <div className="mt-6">
                <OAuthButtons
                  loading={loading}
                  onGoogleLogin={handleGoogleLogin}
                  onGitHubLogin={handleGitHubLogin}
                  onFacebookLogin={handleFacebookLogin}
                  onWhatsAppLogin={handleWhatsAppLogin}
                />
              </div>
            </div>
          ) : activeTab === 'forgot-password' ? (
            <div>
              <ForgotPasswordForm 
                onSubmit={handleForgotPassword} 
                onBackToLogin={() => setActiveTab('login')} 
                loading={loading} 
              />
            </div>
          ) : (
            <div>
              <ResetPasswordForm 
                onSubmit={handleResetPassword} 
                loading={loading} 
              />
            </div>
          )}
        </div>

        {/* Links */}
        <div className="mt-6 text-center">
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