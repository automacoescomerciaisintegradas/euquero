import { Container, Typography, Box } from '@mui/material';

const TermsOfUse = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Termos de Uso
      </Typography>

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          1. Aceitação dos Termos
        </Typography>
        <Typography paragraph>
          Ao acessar e usar o EuQuero, você concorda com estes Termos de Uso e com nossa Política de Privacidade. Se você não concordar com qualquer parte destes termos, não deverá usar nossos serviços.
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          2. Descrição do Serviço
        </Typography>
        <Typography paragraph>
          O EuQuero oferece serviços de automação comercial para interações em redes sociais, incluindo:
        </Typography>
        <Typography component="ul">
          <li>Automação de interações no Instagram</li>
          <li>Gerenciamento de campanhas</li>
          <li>Análise de métricas</li>
          <li>Integração com sistemas de pagamento</li>
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          3. Cadastro e Conta
        </Typography>
        <Typography paragraph>
          Para utilizar nossos serviços, você deve:
        </Typography>
        <Typography component="ul">
          <li>Ter idade mínima de 18 anos</li>
          <li>Fornecer informações verdadeiras e atualizadas</li>
          <li>Manter a segurança de suas credenciais de acesso</li>
          <li>Notificar-nos sobre qualquer uso não autorizado</li>
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          4. Responsabilidades do Usuário
        </Typography>
        <Typography paragraph>
          Ao usar nossos serviços, você concorda em:
        </Typography>
        <Typography component="ul">
          <li>Não violar direitos de terceiros</li>
          <li>Não realizar atividades ilegais ou fraudulentas</li>
          <li>Não interferir no funcionamento do serviço</li>
          <li>Manter conformidade com as políticas das redes sociais</li>
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          5. Propriedade Intelectual
        </Typography>
        <Typography paragraph>
          Todo o conteúdo disponibilizado em nossa plataforma, incluindo mas não se limitando a textos, gráficos, logos, ícones, imagens, clips de áudio e software, é de propriedade exclusiva do EuQuero ou de seus licenciadores.
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          6. Pagamentos e Reembolsos
        </Typography>
        <Typography paragraph>
          Detalhes sobre preços, pagamentos e política de reembolso:
        </Typography>
        <Typography component="ul">
          <li>Os preços são apresentados em Reais (BRL)</li>
          <li>Aceitamos pagamentos via Pix e cartão de crédito</li>
          <li>Reembolsos podem ser solicitados em até 7 dias após a contratação</li>
          <li>Cancelamentos após 7 dias seguem política específica</li>
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          7. Limitação de Responsabilidade
        </Typography>
        <Typography paragraph>
          O EuQuero não se responsabiliza por:
        </Typography>
        <Typography component="ul">
          <li>Interrupções ou indisponibilidade das redes sociais</li>
          <li>Perdas ou danos indiretos</li>
          <li>Conteúdo gerado por usuários</li>
          <li>Ações de terceiros</li>
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          8. Modificações do Serviço
        </Typography>
        <Typography paragraph>
          Reservamo-nos o direito de modificar, suspender ou descontinuar qualquer aspecto do serviço a qualquer momento, com ou sem aviso prévio.
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          9. Rescisão
        </Typography>
        <Typography paragraph>
          Podemos encerrar ou suspender seu acesso ao serviço imediatamente, sem aviso prévio ou responsabilidade, por qualquer motivo, incluindo, sem limitação, se você violar estes Termos.
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          10. Lei Aplicável
        </Typography>
        <Typography paragraph>
          Estes termos são regidos pelas leis do Brasil. Qualquer disputa será resolvida nos tribunais da comarca de [Sua Cidade], Brasil.
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          11. Disposições Gerais
        </Typography>
        <Typography paragraph>
          Se qualquer disposição destes termos for considerada inválida ou inexequível, as demais disposições permanecerão em pleno vigor e efeito.
        </Typography>
      </Box>

      <Box>
        <Typography variant="body2" color="text.secondary">
          Última atualização: {new Date().toLocaleDateString('pt-BR')}
        </Typography>
      </Box>
    </Container>
  );
};

export default TermsOfUse;