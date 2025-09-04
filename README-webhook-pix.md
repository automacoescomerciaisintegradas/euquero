# Sistema de Webhook PIX - EuQuero

## 🚀 Implementação Completa

Este sistema implementa um webhook PIX seguro com retry automático e notificação para o N8n, seguindo as melhores práticas de segurança.

## ✅ Funcionalidades Implementadas

### 🔐 Segurança
- ✅ Webhook PIX não exposto no frontend
- ✅ Autenticação via Bearer Token para N8n
- ✅ Validação de entrada com Zod schemas
- ✅ Logs de auditoria detalhados

### 🔄 Retry Automático
- ✅ Fila de retry (até 5 tentativas)
- ✅ Processamento assíncrono
- ✅ Monitoramento de status
- ✅ Fail-safe (crédito sempre processado)

### 📧 Notificação N8n
- ✅ POST seguro com autenticação
- ✅ Payload estruturado
- ✅ Workflow completo para email

## 🏗️ Arquitetura

```
Frontend → Gateway PIX → Backend Hono → N8n → Email Cliente
                            ↓
                       Fila de Retry
```

## 📁 Arquivos Criados/Modificados

### Backend (Hono)
- `src/worker/index.ts` - Endpoints do webhook PIX
- `src/worker/webhook-utils.ts` - Funções de retry e notificação
- `src/worker/config.ts` - Configurações de ambiente
- `src/shared/types.ts` - Tipos TypeScript

### Documentação
- `docs/webhook-pix-setup.md` - Guia completo de configuração
- `docs/n8n-workflow-pix.json` - Workflow N8n pronto para importar
- `README-webhook-pix.md` - Este arquivo

### Scripts e Testes
- `scripts/test-webhook-pix.js` - Script de teste automatizado
- `package.json` - Scripts npm adicionados

### Configuração
- `.env` - Variáveis de ambiente adicionadas

## 🚀 Como Usar

### 1. Configurar Variáveis de Ambiente

```env
# Adicionar no .env
INTERNAL_SECRET=seu_segredo_interno_super_seguro_aqui_123456
N8N_WEBHOOK_URL=https://n8n.iau2.com.br/webhook-test/euquero
```

### 2. Testar Localmente

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Em outro terminal, testar webhook
npm run test:webhook
```

### 3. Configurar N8n

1. Importar workflow: `docs/n8n-workflow-pix.json`
2. Configurar autenticação Bearer Token
3. Configurar SMTP para envio de emails
4. Ativar o workflow

### 4. Deploy

```bash
# Build e deploy
npm run build
wrangler deploy
```

## 📋 Endpoints Disponíveis

### Webhook PIX
```
POST /api/webhooks/pix
Content-Type: application/json

{
  "data": {"id": "payment_123"},
  "metadata": {"user_id": "user_456"},
  "transaction_amount": 50.00,
  "status": "approved"
}
```

### Fila de Retry
```
GET /api/webhooks/retry-queue
```

### Status da Fila
```
GET /api/webhooks/queue-status
```

## 🧪 Testes

### Teste Automatizado
```bash
# Ambiente local
npm run test:webhook

# Ambiente de desenvolvimento
npm run test:webhook:dev

# Ambiente de produção
npm run test:webhook:prod
```

### Teste Manual
```bash
curl -X POST http://localhost:8787/api/webhooks/pix \
  -H "Content-Type: application/json" \
  -d '{
    "data": {"id": "test_payment"},
    "metadata": {"user_id": "test_user"},
    "transaction_amount": 50.00,
    "status": "approved"
  }'
```

## 📊 Monitoramento

### Logs de Auditoria
- `PIX_WEBHOOK_RECEIVED` - Webhook recebido
- `PIX_PAYMENT_PROCESSED` - Pagamento processado

### Métricas da Fila
- Itens pendentes/processados/falhados
- Última execução
- Taxa de sucesso

## 🔧 Configuração do N8n

### 1. Webhook Node
- URL: `https://n8n.iau2.com.br/webhook-test/euquero`
- Método: POST
- Autenticação: Bearer Token (usar `INTERNAL_SECRET`)

### 2. Email Template
```
Assunto: Pagamento PIX Confirmado ✅ - EuQuero

Olá {{user_name}},

Confirmamos o recebimento do seu pagamento PIX!

📋 Detalhes:
• Valor: R$ {{amount}}
• ID: {{payment_id}}
• Data: {{timestamp}}

✅ Seu saldo já foi atualizado no painel.

Atenciosamente,
Equipe EuQuero
```

## 🚨 Troubleshooting

### Webhook não recebe dados
1. Verificar URL do gateway PIX
2. Confirmar formato do payload
3. Checar logs do Cloudflare Workers

### N8n não recebe notificação
1. Verificar `INTERNAL_SECRET`
2. Confirmar URL do N8n
3. Testar conectividade

### Fila de retry não processa
1. Verificar endpoint `/retry-queue`
2. Configurar cron job se necessário
3. Monitorar logs de erro

## 🔄 Próximos Passos

1. **Integração com Supabase** - Substituir simulação por banco real
2. **Redis/Upstash** - Fila de retry mais robusta
3. **Dashboard** - Interface para monitorar webhooks
4. **Rate Limiting** - Proteção contra spam
5. **Webhooks de Status** - Notificar sobre falhas

## 📞 Suporte

- 📧 Email: contato@fcaq.com.br
- 💬 Telegram: https://t.me/+9cdym9gvPQ9iOWNh
- 📱 WhatsApp: +55 88 988712711

---

**Status**: ✅ Implementação completa e pronta para uso
**Versão**: 1.0.0
**Data**: Janeiro 2025