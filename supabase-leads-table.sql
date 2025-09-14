-- Script SQL para criar a tabela de leads no Supabase
-- Execute este script no SQL Editor do painel do Supabase

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

-- Inserir alguns dados de exemplo (opcional)
INSERT INTO leads (email, phone, name, type, source, data) VALUES
  ('exemplo1@dominio.com', '(11) 99999-9999', 'Exemplo Um', 'quente', 'registration', '{"consent": true}'),
  ('exemplo2@dominio.com', '(21) 88888-8888', 'Exemplo Dois', 'frio', 'registration', '{"consent": false}');