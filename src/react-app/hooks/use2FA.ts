import { useState } from 'react';

interface Use2FAProps {
  onSuccess: () => void;
  onError: (error: string) => void;
}

export function use2FA({ onSuccess, onError }: Use2FAProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [is2FASetup, setIs2FASetup] = useState(false);
  const [qrCodeUri, setQrCodeUri] = useState<string | null>(null);

  const setup2FA = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Não autenticado');
      }

      const response = await fetch('/api/auth/2fa/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-User-ID': JSON.parse(atob(token.split('.')[1])).id // Extrair ID do token JWT
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Falha ao configurar 2FA');
      }

      setQrCodeUri(data.uri);
      setIs2FASetup(true);
      onSuccess();
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  const verify2FA = async (token: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/2fa/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-ID': localStorage.getItem('userId') || '' // Em produção, usar token JWT
        },
        body: JSON.stringify({ token })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Falha ao verificar 2FA');
      }

      // Atualizar estado do usuário localmente
      localStorage.setItem('twoFactorEnabled', 'true');
      onSuccess();
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  const disable2FA = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Não autenticado');
      }

      // Em uma implementação real, seria necessário chamar uma API para desativar 2FA
      localStorage.removeItem('twoFactorEnabled');
      setIs2FASetup(false);
      setQrCodeUri(null);
      onSuccess();
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    is2FASetup,
    qrCodeUri,
    setup2FA,
    verify2FA,
    disable2FA
  };
}