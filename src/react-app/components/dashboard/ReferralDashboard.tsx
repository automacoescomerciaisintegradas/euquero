import React, { useState, useEffect } from 'react';
import { User, Copy, Share2, Gift, Users, CreditCard } from 'lucide-react';
import type { User as UserType } from '@/shared/types';

interface ReferralStats {
  total: number;
  completed: number;
  pending: number;
  rewardsEarned: number;
}

const ReferralDashboard = ({ user }: { user: UserType }) => {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch referral code
        const codeResponse = await fetch(`/api/referrals/my-code?userId=${user.id}`);
        const codeData = await codeResponse.json();
        
        if (codeData.code) {
          setReferralCode(codeData.code);
        } else {
          // Generate referral code if doesn't exist
          const generateResponse = await fetch('/api/referrals/generate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: user.id }),
          });
          
          const generateData = await generateResponse.json();
          if (generateData.success) {
            setReferralCode(generateData.code);
          }
        }
        
        // Fetch stats
        const statsResponse = await fetch(`/api/referrals/stats?userId=${user.id}`);
        const statsData = await statsResponse.json();
        
        if (statsData.success) {
          setStats(statsData.stats);
        }
      } catch (err) {
        setError('Erro ao carregar dados de indicação');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const copyToClipboard = () => {
    if (referralCode) {
      navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareReferral = async () => {
    if (referralCode) {
      const referralLink = `${window.location.origin}/?ref=${referralCode}`;
      
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Indique e Ganhe - EuQuero',
            text: 'Ganhe créditos indicando o EuQuero para seus amigos!',
            url: referralLink,
          });
        } catch (err) {
          console.log('Erro ao compartilhar:', err);
        }
      } else {
        copyToClipboard();
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Indique e Ganhe</h2>
        <p className="opacity-90">
          Ganhe R$10 em créditos para cada amigo que se cadastrar usando seu código de indicação!
        </p>
      </div>

      {/* Referral Code Card */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Seu Código de Indicação</h3>
          <Gift className="w-5 h-5 text-blue-600" />
        </div>
        
        {referralCode ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="bg-gray-100 rounded-lg px-4 py-3 font-mono text-lg font-bold text-gray-900">
              {referralCode}
            </div>
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <Copy className="w-4 h-4" />
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
              <button
                onClick={shareReferral}
                className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Compartilhar
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Gerando seu código de indicação...</p>
        )}
        
        <p className="mt-4 text-sm text-gray-600">
          Compartilhe seu código com amigos. Quando eles se cadastrarem, vocês dois ganham R$10 em créditos!
        </p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Indicados</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Completos</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <CreditCard className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Pendentes</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <User className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Créditos Ganhos</p>
                <p className="text-2xl font-bold text-purple-600">R$ {stats.rewardsEarned.toFixed(2)}</p>
              </div>
              <Gift className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>
      )}

      {/* How it works */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Como Funciona</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
              <span className="text-blue-600 font-bold">1</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Compartilhe</h4>
            <p className="text-gray-600 text-sm">
              Compartilhe seu código de indicação com amigos
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3">
              <span className="text-purple-600 font-bold">2</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Indique</h4>
            <p className="text-gray-600 text-sm">
              Seu amigo se cadastra usando o código
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
              <span className="text-green-600 font-bold">3</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Ganhe</h4>
            <p className="text-gray-600 text-sm">
              Vocês dois ganham R$10 em créditos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralDashboard;