import Icon from './ui/Icon';

const features = [
  { icon: 'Bot', title: 'Respostas Automáticas', description: 'Em comentários de posts, reels e stories.' },
  { icon: 'ExternalLink', title: 'Links no Direct', description: 'Envie links de compra ou para o WhatsApp na DM.' },
  { icon: 'MessageSquare', title: 'DM Automática', description: 'Envie uma mensagem no inbox após interações.' },
  { icon: 'Video', title: 'Automação em Lives', description: 'Interaja com seu público durante as transmissões ao vivo.' },
  { icon: 'Heart', title: 'Mensagem de Boas-Vindas', description: 'Receba novos seguidores de forma automática e personalizada.' },
  { icon: 'MessageCircle', title: 'Autoatendimento', description: 'Responda dúvidas frequentes de forma instantânea.' },
  { icon: 'BarChart3', title: 'Relatórios Estratégicos', description: 'Acompanhe o desempenho de suas automações.' },
  { icon: 'Zap', title: 'Envio para WhatsApp', description: 'Crie grupos e envie mensagens em massa.' },
  { icon: 'CheckCircle', title: 'Funciona 24/7', description: 'Sua automação trabalhando para você sem parar.' },
];

const FeaturesSection = () => {
  return (
    <section id="beneficios" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore tudo o que o InstaNinja pode oferecer
          </h2>
          <p className="text-lg text-gray-600">Prepare-se para crescer!</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Icon name={feature.icon} size={24} className="text-primary mr-4" />
                <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;