# Configuração do Sistema de Leads

## 1. Criar Tabela de Leads no Supabase

Execute o seguinte SQL no SQL Editor do painel do Supabase:

```sql
-- Criar tabela de leads
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  name VARCHAR(255),
  type VARCHAR(10) NOT NULL DEFAULT 'frio',
  source VARCHAR(50) NOT NULL DEFAULT 'registration',
  data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_type ON leads(type);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);

-- Criar função para atualizar o campo updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Criar trigger para atualizar o campo updated_at automaticamente
DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at 
    BEFORE UPDATE ON leads 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
```

## 2. Configurar Webhook do n8n

1. Acesse seu painel do n8n
2. Crie um novo webhook na URL: `https://n8n.iau2.com.br/webhook-test/dashboard`
3. Configure o workflow para processar os dados recebidos

## 3. Verificar Variáveis de Ambiente

Certifique-se de que as seguintes variáveis estão configuradas no seu `.env`:

```env
# Webhook n8n
N8N_WEBHOOK_URL=https://n8n.iau2.com.br/webhook-test/dashboard

# Supabase
SUPABASE_URL=sua_url_do_supabase
SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

## 4. Testar o Sistema

1. Faça um novo cadastro na página de login
2. Verifique se os dados são enviados para o n8n
3. Verifique se os dados são armazenados no Supabase
4. Acesse o dashboard e verifique se os leads aparecem na aba "Leads"

## 5. Classificação de Leads

Os leads são classificados automaticamente como:
- **Quente**: Quando o usuário preenche nome completo, telefone e aceita os termos
- **Frio**: Quando o usuário não preenche todos os campos obrigatórios

## 6. Monitoramento

Você pode monitorar o desempenho do sistema através:
- Dashboard de leads no painel administrativo
- Logs do Cloudflare Workers
- Métricas do Supabase