import React, { useState } from 'react';
import { Copy, Check, Download } from 'lucide-react';

interface PixQRCodeProps {
  amount: number;
  pixKey: string;
  pixEmail: string;
  pixCode: string;
}

export default function PixQRCode({ amount, pixKey, pixEmail, pixCode }: PixQRCodeProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      console.error('Erro ao copiar:', error);
    }
  };

  // QR Code real da imagem fornecida
  const QRCodeImage = () => {
    return (
      <div className="w-64 h-64 bg-white border-2 border-gray-300 rounded-lg p-4 flex items-center justify-center">
        <img 
          src="/pix-qrcode.png" 
          alt="QR Code PIX para pagamento" 
          className="w-full h-full object-contain"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* QR Code */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          QR Code PIX - {formatCurrency(amount)}
        </h3>
        <div className="flex justify-center mb-4">
          <QRCodeImage />
        </div>
        <p className="text-sm text-gray-600">
          Escaneie o QR Code com seu app bancário ou copie as informações abaixo
        </p>
      </div>

      {/* Informações PIX */}
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Chave PIX (UUID):</span>
            <button
              onClick={() => copyToClipboard(pixKey, 'key')}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
            >
              {copiedField === 'key' ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>
          <div className="text-sm text-gray-900 font-mono break-all">
            {pixKey}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Email PIX:</span>
            <button
              onClick={() => copyToClipboard(pixEmail, 'email')}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
            >
              {copiedField === 'email' ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>
          <div className="text-sm text-gray-900">
            {pixEmail}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Código PIX Copia e Cola:</span>
            <button
              onClick={() => copyToClipboard(pixCode, 'code')}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
            >
              {copiedField === 'code' ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>
          <div className="text-xs text-gray-900 font-mono break-all bg-white p-2 rounded border">
            {pixCode}
          </div>
        </div>
      </div>

      {/* Instruções */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Como pagar:</h4>
        <ol className="text-sm text-blue-800 space-y-1">
          <li>1. Abra o app do seu banco</li>
          <li>2. Escolha a opção PIX</li>
          <li>3. Escaneie o QR Code ou cole o código PIX</li>
          <li>4. Confirme o pagamento de {formatCurrency(amount)}</li>
          <li>5. Seus créditos serão adicionados automaticamente</li>
        </ol>
      </div>

      {/* Aviso importante */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>Importante:</strong> O pagamento via PIX é processado instantaneamente. 
          Após a confirmação, seus créditos estarão disponíveis em até 5 minutos.
        </p>
      </div>
    </div>
  );
}