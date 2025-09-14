import { createClient } from '@supabase/supabase-js';
import { Env } from './env';

// Função para verificar se a tabela de leads existe
export async function checkLeadsTableExists(env: Env): Promise<boolean> {
  try {
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
    
    // Tentar selecionar um registro da tabela para verificar se ela existe
    const { data, error } = await supabase
      .from('leads')
      .select('id')
      .limit(1);
    
    // Se não houver erro, a tabela existe
    return !error || !error.message.includes('relation "leads" does not exist');
  } catch (error) {
    console.error('Erro ao verificar tabela de leads:', error);
    return false;
  }
}

// Função para criar a tabela de leads
export async function createLeadsTable(env: Env): Promise<boolean> {
  try {
    // Esta função não pode criar tabelas diretamente com o cliente público
    // Você precisa executar o script SQL no painel do Supabase
    console.log('Para criar a tabela de leads, execute o seguinte SQL no painel do Supabase:');
    console.log(`
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
      
      CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
      CREATE INDEX IF NOT EXISTS idx_leads_type ON leads(type);
      CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
    `);
    
    return false;
  } catch (error) {
    console.error('Erro ao criar tabela de leads:', error);
    return false;
  }
}

// Função para inicializar o sistema de leads
export async function initLeadsSystem(env: Env): Promise<boolean> {
  try {
    const tableExists = await checkLeadsTableExists(env);
    
    if (!tableExists) {
      console.log('Tabela de leads não encontrada. Criando...');
      return await createLeadsTable(env);
    } else {
      console.log('Tabela de leads já existe.');
      return true;
    }
  } catch (error) {
    console.error('Erro ao inicializar sistema de leads:', error);
    return false;
  }
}