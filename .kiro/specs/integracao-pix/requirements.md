# Documento de Requisitos - Integração PIX

## Introdução

Este documento especifica os requisitos para implementar um sistema completo de integração PIX no projeto EuQuero, incluindo recarga de créditos, painel de usuário, sistema de assinaturas e notificações via webhook. O sistema deve seguir as melhores práticas de segurança, mantendo operações sensíveis no backend e integrando com o n8n para automações.

## Requisitos

### Requisito 1 - Sistema de Autenticação e Painel do Usuário

**User Story:** Como usuário, eu quero fazer login/cadastro automático e acessar meu painel individual, para que eu possa gerenciar minha conta e créditos de forma segura.

#### Critérios de Aceitação

1. QUANDO um usuário se cadastra ENTÃO o sistema DEVE criar automaticamente um painel individual com plano gratuito
2. QUANDO um usuário faz login ENTÃO o sistema DEVE exibir seu painel com informações de assinatura e créditos
3. QUANDO um usuário é criado ENTÃO o sistema DEVE conceder 3 créditos iniciais automaticamente
4. QUANDO um usuário acessa o painel ENTÃO o sistema DEVE mostrar plano atual, saldo de créditos e status de saldo baixo

### Requisito 2 - Sistema de Assinaturas

**User Story:** Como usuário, eu quero visualizar e gerenciar meus planos de assinatura (gratuito e pay-per-use), para que eu possa escolher o modelo de pagamento mais adequado.

#### Critérios de Aceitação

1. QUANDO um usuário acessa o painel ENTÃO o sistema DEVE exibir o plano atual (Grátis ou Pay-per-use)
2. QUANDO um usuário clica em "Ver Planos" ENTÃO o sistema DEVE mostrar opções de assinatura disponíveis
3. QUANDO um usuário tem plano gratuito ENTÃO o sistema DEVE permitir apenas testes limitados
4. QUANDO um usuário tem plano pay-per-use ENTÃO o sistema DEVE debitar créditos por uso

### Requisito 3 - Sistema de Créditos com Recarga PIX

**User Story:** Como usuário, eu quero recarregar meus créditos via PIX, para que eu possa continuar usando os serviços da plataforma.

#### Critérios de Aceitação

1. QUANDO um usuário solicita recarga ENTÃO o sistema DEVE exigir valor mínimo de R$50
2. QUANDO um usuário gera PIX ENTÃO o sistema DEVE criar QR Code válido via gateway de pagamento
3. QUANDO um pagamento PIX é confirmado ENTÃO o sistema DEVE creditar automaticamente o valor na conta
4. QUANDO o saldo está baixo (< R$5) ENTÃO o sistema DEVE exibir alerta de saldo baixo
5. QUANDO um usuário tem saldo insuficiente ENTÃO o sistema DEVE impedir operações que consomem créditos

### Requisito 4 - Estrutura para Campanhas Inteligentes

**User Story:** Como usuário, eu quero criar e gerenciar campanhas inteligentes, para que eu possa automatizar minhas ações de marketing.

#### Critérios de Aceitação

1. QUANDO um usuário acessa campanhas ENTÃO o sistema DEVE mostrar opção de criar nova campanha
2. QUANDO uma campanha é executada ENTÃO o sistema DEVE debitar créditos baseado no uso
3. QUANDO uma campanha é criada ENTÃO o sistema DEVE registrar logs de auditoria

### Requisito 5 - Sistema de Logs e Segurança

**User Story:** Como administrador, eu quero ter logs completos de todas as operações, para que eu possa auditar e garantir a segurança do sistema.

#### Critérios de Aceitação

1. QUANDO qualquer operação de crédito ocorre ENTÃO o sistema DEVE registrar log de auditoria
2. QUANDO um pagamento é processado ENTÃO o sistema DEVE registrar todos os detalhes da transação
3. QUANDO um usuário faz uma ação ENTÃO o sistema DEVE registrar metadata da operação
4. QUANDO ocorre um erro ENTÃO o sistema DEVE registrar log de erro sem expor dados sensíveis

### Requisito 6 - Webhook de Notificação Externa

**User Story:** Como sistema, eu quero enviar notificações para o n8n via webhook, para que automações externas possam ser executadas baseadas em eventos da plataforma.

#### Critérios de Aceitação

1. QUANDO um pagamento PIX é confirmado ENTÃO o sistema DEVE enviar POST para https://webhook.iau2.com.br/webhook/euquero
2. QUANDO um usuário é criado ENTÃO o sistema DEVE notificar o webhook com dados do usuário
3. QUANDO créditos são adicionados ENTÃO o sistema DEVE enviar notificação com detalhes da recarga
4. QUANDO uma campanha é executada ENTÃO o sistema DEVE notificar o webhook com resultados
5. SE o webhook falhar ENTÃO o sistema DEVE tentar reenvio até 3 vezes

### Requisito 7 - Segurança e Boas Práticas

**User Story:** Como desenvolvedor, eu quero que todas as operações sensíveis sejam executadas no backend, para que a segurança do sistema seja mantida.

#### Critérios de Aceitação

1. QUANDO operações de pagamento ocorrem ENTÃO o sistema DEVE processar apenas no backend
2. QUANDO webhooks são recebidos ENTÃO o sistema DEVE validar assinatura/autenticidade
3. QUANDO dados sensíveis são manipulados ENTÃO o sistema DEVE usar criptografia adequada
4. QUANDO APIs externas são chamadas ENTÃO o sistema DEVE usar tokens seguros em variáveis de ambiente
5. QUANDO erros ocorrem ENTÃO o sistema DEVE sanitizar mensagens antes de enviar ao frontend

### Requisito 8 - Integração com Gateway de Pagamento

**User Story:** Como usuário, eu quero que meus pagamentos PIX sejam processados de forma segura e confiável, para que eu tenha confiança no sistema.

#### Critérios de Aceitação

1. QUANDO um PIX é gerado ENTÃO o sistema DEVE usar API do Mercado Pago ou similar
2. QUANDO um pagamento é confirmado ENTÃO o sistema DEVE verificar status via API do gateway
3. QUANDO um webhook de pagamento é recebido ENTÃO o sistema DEVE validar origem e integridade
4. QUANDO um pagamento falha ENTÃO o sistema DEVE notificar o usuário adequadamente
5. QUANDO um pagamento é duplicado ENTÃO o sistema DEVE prevenir crédito duplo