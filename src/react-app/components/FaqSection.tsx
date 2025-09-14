import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "É seguro conectar minha conta do Instagram?",
    answer: "Sim, totalmente seguro! Usamos os métodos oficiais de autenticação do Instagram e não armazenamos suas senhas. Além disso, seguimos todas as diretrizes de segurança e privacidade da plataforma."
  },
  {
    question: "Como funciona a automação de respostas?",
    answer: "Nossa IA analisa o contexto dos comentários e mensagens recebidos e gera respostas personalizadas e naturais. Você pode definir regras específicas e tom de voz para as respostas, garantindo que elas sempre estejam alinhadas com sua marca."
  },
  {
    question: "Posso personalizar as respostas automáticas?",
    answer: "Absolutamente! Você tem controle total sobre o tom, estilo e conteúdo das respostas. Nossa IA aprende com suas preferências e se adapta ao seu estilo de comunicação."
  },
  {
    question: "Existe limite de mensagens por dia?",
    answer: "Dependendo do seu plano, existem diferentes limites. O plano Professional oferece mensagens ilimitadas, enquanto o plano Starter tem um limite de 100 mensagens por dia."
  },
  {
    question: "Como faço para começar?",
    answer: "É super simples! Basta criar sua conta, escolher um plano, conectar seu Instagram e configurar suas preferências de automação. Todo o processo leva menos de 5 minutos."
  },
  {
    question: "Posso cancelar a qualquer momento?",
    answer: "Sim! Não há contratos longos. Você pode cancelar sua assinatura a qualquer momento sem multas ou taxas adicionais."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-zinc-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4">
            Perguntas
            <span className="bg-gradient-to-r from-[#CCFF00] to-green-400 text-transparent bg-clip-text"> frequentes</span>
          </h2>
          <p className="text-lg leading-8 text-zinc-400">
            Tire suas dúvidas sobre nossa plataforma
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-zinc-800 last:border-0"
            >
              <button
                className="w-full py-6 flex items-center justify-between text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-semibold text-white">
                  {faq.question}
                </span>
                <span className="ml-6 flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="h-6 w-6 text-[#CCFF00]" />
                  ) : (
                    <Plus className="h-6 w-6 text-[#CCFF00]" />
                  )}
                </span>
              </button>
              
              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                }`}
              >
                <p className="text-zinc-400">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional help */}
        <div className="mt-16 text-center">
          <p className="text-zinc-400 mb-4">
            Ainda tem dúvidas? Entre em contato com nossa equipe
          </p>
          <button className="px-8 py-4 bg-zinc-800 text-white font-semibold rounded-full hover:bg-zinc-700 transition-all duration-200">
            Falar com Suporte
          </button>
        </div>
      </div>
    </div>
  );
}