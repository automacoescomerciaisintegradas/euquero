import React from 'react';
import { Check, Star, Zap } from 'lucide-react';
import type { SubscriptionPlan } from '../../../shared/types';

interface SubscriptionPlansProps {
  currentPlan?: SubscriptionPlan;
  onSelectPlan: (plan: SubscriptionPlan) => void;
}

const plans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Plano Grátis (testes)',
    type: 'free',
    price: 0,
    credits: 3,
    badge: 'Teste',
    features: [
      'R$ 3,00 em créditos para teste',
      'Acesso a todas as funcionalidades',
      'Suporte por email',
      'Validade de 12 meses',
    ],
  },
  {
    id: 'pay_per_use',
    name: 'Plano pay-per-use (pix)',
    type: 'pay_per_use',
    price: 50,
    credits: 50,
    highlighted: true,
    badge: 'Recomendado',
    features: [
      'Recarga mínima de R$ 50,00',
      'Pagamento via PIX instantâneo',
      'Sem mensalidades ou taxas fixas',
      'Pague apenas pelo que usar',
      'Créditos válidos por 12 meses',
      'Suporte prioritário',
      'Transparência total de custos',
      'Relatórios detalhados de uso',
    ],
  },
];

export default function SubscriptionPlans({ currentPlan, onSelectPlan }: SubscriptionPlansProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Assinaturas</h2>
        <p className="text-gray-600">
          Contrate um novo plano! Aproveite nossas ofertas e tenha acesso a todos os recursos disponíveis.
        </p>
        <div className="text-center mt-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            Ver planos: Plano Grátis (testes) | Plano pay-per-use (pix)
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-xl border-2 p-6 transition-all ${
              plan.highlighted
                ? 'border-blue-500 bg-blue-50/50'
                : 'border-gray-200 hover:border-gray-300'
            } ${
              currentPlan?.id === plan.id
                ? 'ring-2 ring-green-500 ring-offset-2'
                : ''
            }`}
          >
            {/* Badge */}
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  plan.highlighted
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-600 text-white'
                }`}>
                  {plan.highlighted && <Star className="w-3 h-3 mr-1" />}
                  {plan.badge}
                </span>
              </div>
            )}

            {/* Plano atual */}
            {currentPlan?.id === plan.id && (
              <div className="absolute -top-3 right-4">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                  <Check className="w-3 h-3 mr-1" />
                  Atual
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              
              {plan.type === 'free' ? (
                <div>
                  <div className="text-3xl font-bold text-gray-900">Grátis</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {formatCurrency(plan.credits)} para teste
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-3xl font-bold text-gray-900">
                    {formatCurrency(plan.price)}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Recarga mínima via PIX
                  </div>
                </div>
              )}
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Botão */}
            <button
              onClick={() => onSelectPlan(plan)}
              disabled={currentPlan?.id === plan.id}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                currentPlan?.id === plan.id
                  ? 'bg-green-100 text-green-800 cursor-not-allowed'
                  : plan.highlighted
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              {currentPlan?.id === plan.id ? (
                'Plano Atual'
              ) : plan.type === 'free' ? (
                'Começar Grátis'
              ) : (
                <>
                  <Zap className="w-4 h-4 inline mr-2" />
                  Ver planos
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Informações adicionais */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-2">Sistema de Créditos Flexível</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• <strong>Modelo Pay-per-use:</strong> Sem planos fixos, pague apenas pelo que usar</li>
          <li>• <strong>Crédito inicial gratuito:</strong> R$ 3,00 para teste</li>
          <li>• <strong>Validade de 12 meses:</strong> Sistema temporal de créditos</li>
          <li>• <strong>Recarga mínima:</strong> R$ 50,00 via PIX</li>
          <li>• <strong>Transparência total:</strong> Custos por funcionalidade</li>
        </ul>
      </div>
    </div>
  );
}