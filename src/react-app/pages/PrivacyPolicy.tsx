import { Container, Typography, Box } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Política de Privacidade
      </Typography>

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          1. Introdução
        </Typography>
        <Typography paragraph>
          Bem-vindo à Política de Privacidade do EuQuero. Esta política descreve como coletamos, usamos, processamos, armazenamos e protegemos seus dados pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          2. Controlador dos Dados
        </Typography>
        <Typography paragraph>
          EuQuero - Automação Comercial é o controlador dos seus dados pessoais e pode ser contatado através do email: [seu-email@dominio.com].
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          3. Dados Pessoais que Coletamos
        </Typography>
        <Typography paragraph>
          Coletamos os seguintes tipos de dados pessoais:
        </Typography>
        <Typography component="ul">
          <li>Dados de identificação (nome, CPF, endereço)</li>
          <li>Dados de contato (email, telefone)</li>
          <li>Dados de acesso (logs, IP, dados do dispositivo)</li>
          <li>Dados de automação (métricas, configurações)</li>
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          4. Base Legal para o Tratamento
        </Typography>
        <Typography paragraph>
          Processamos seus dados pessoais com base nas seguintes justificativas legais:
        </Typography>
        <Typography component="ul">
          <li>Consentimento do titular</li>
          <li>Execução de contrato</li>
          <li>Cumprimento de obrigação legal</li>
          <li>Interesses legítimos</li>
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          5. Finalidades do Tratamento
        </Typography>
        <Typography paragraph>
          Utilizamos seus dados pessoais para:
        </Typography>
        <Typography component="ul">
          <li>Fornecer nossos serviços de automação</li>
          <li>Processar pagamentos</li>
          <li>Enviar comunicações sobre o serviço</li>
          <li>Melhorar nossos produtos e serviços</li>
          <li>Cumprir obrigações legais</li>
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          6. Compartilhamento de Dados
        </Typography>
        <Typography paragraph>
          Podemos compartilhar seus dados com:
        </Typography>
        <Typography component="ul">
          <li>Prestadores de serviços essenciais</li>
          <li>Parceiros de processamento de pagamento</li>
          <li>Autoridades governamentais (quando exigido por lei)</li>
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          7. Seus Direitos
        </Typography>
        <Typography paragraph>
          Você tem os seguintes direitos em relação aos seus dados pessoais:
        </Typography>
        <Typography component="ul">
          <li>Confirmação da existência de tratamento</li>
          <li>Acesso aos dados</li>
          <li>Correção de dados incompletos ou desatualizados</li>
          <li>Anonimização, bloqueio ou eliminação de dados desnecessários</li>
          <li>Portabilidade dos dados</li>
          <li>Eliminação dos dados (quando aplicável)</li>
          <li>Revogação do consentimento</li>
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          8. Segurança dos Dados
        </Typography>
        <Typography paragraph>
          Implementamos medidas técnicas e organizacionais apropriadas para proteger seus dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          9. Retenção de Dados
        </Typography>
        <Typography paragraph>
          Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades para as quais foram coletados, exceto quando um período maior for exigido ou permitido por lei.
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          10. Cookies e Tecnologias Similares
        </Typography>
        <Typography paragraph>
          Utilizamos cookies e tecnologias similares para melhorar sua experiência em nosso site. Você pode controlar o uso de cookies através das configurações do seu navegador.
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          11. Alterações na Política
        </Typography>
        <Typography paragraph>
          Podemos atualizar esta política periodicamente. A versão mais recente estará sempre disponível em nosso site.
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          12. Contato
        </Typography>
        <Typography paragraph>
          Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato através do email: [seu-email@dominio.com]
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

export default PrivacyPolicy;