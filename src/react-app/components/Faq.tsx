import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqItems = [
  {
    question: 'Por que usar o InstaNinja em vez de responder manualmente?',
    answer: 'Porque cada segundo conta. 78% dos clientes desistem se você demora mais de 30 segundos para responder. A automação garante que você nunca perca uma venda por demora.',
  },
  {
    question: 'É seguro usar a ferramenta?',
    answer: 'Sim, 100% seguro. O InstaNinja utiliza a API oficial do Instagram (Meta), o que garante total conformidade com as políticas da plataforma e a segurança da sua conta.',
  },
  {
    question: 'Como a ferramenta ajuda com o bem-estar digital?',
    answer: 'Ao automatizar tarefas repetitivas, o InstaNinja reduz a necessidade de estar online o tempo todo, permitindo que você foque em outras áreas do seu negócio e tenha mais tempo livre.',
  },
  {
    question: 'Qual é a política de cancelamento?',
    answer: 'Você pode cancelar sua assinatura a qualquer momento, sem burocracia ou multas. O acesso permanece ativo até o final do período já pago.',
  },
  {
    question: 'O que exatamente a ferramenta faz?',
    answer: 'O InstaNinja automatiza interações no Instagram, como responder comentários, enviar mensagens diretas de boas-vindas, compartilhar links, e muito mais, funcionando 24/7 para você.',
  },
];

const FaqItem = ({ item }: { item: typeof faqItems[0] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700 py-4">
      <button
        className="w-full flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold">{item.question}</h3>
        <ChevronDown
          className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="mt-4 text-gray-400">
          <p>{item.answer}</p>
        </div>
      )}
    </div>
  );
};

const Faq = () => {
  return (
    <section id="faq" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Dúvidas Frequentes</h2>
        </div>
        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <FaqItem key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
