import { Env } from "./env";
import { getSupabaseClient } from "./supabase";

// Função para enviar lead para o webhook do n8n
export async function sendLeadToN8n(env: Env, leadData: any) {
  try {
    const response = await fetch(env.N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...leadData,
        timestamp: new Date().toISOString(),
        source: 'euquero_registration'
      }),
    });

    if (!response.ok) {
      console.error('Falha ao enviar lead para n8n:', response.status, response.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro ao enviar lead para n8n:', error);
    return false;
  }
}

// Função para armazenar lead no Supabase
export async function storeLeadInSupabase(env: Env, leadData: any) {
  try {
    const supabase = getSupabaseClient(env);
    
    // Determinar se o lead é frio ou quente
    const leadType = determineLeadType(leadData);
    
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          email: leadData.email,
          phone: leadData.phone,
          name: leadData.name || null,
          type: leadType,
          source: 'registration',
          data: {
            ...leadData,
            metadata: leadData.metadata
          },
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('Erro ao armazenar lead no Supabase:', error);
      return false;
    }

    console.log('Lead armazenado no Supabase com ID:', data?.[0]?.id);
    return true;
  } catch (error) {
    console.error('Erro ao conectar com Supabase:', error);
    return false;
  }
}

// Função para determinar se o lead é frio ou quente
function determineLeadType(leadData: any): 'frio' | 'quente' {
  // Critérios para lead quente:
  // 1. Preencheu o telefone
  // 2. Nome completo (mais de uma palavra)
  // 3. Consentimento de dados concedido
  // 4. Senha forte (já validada pelo schema)
  
  const hasPhone = leadData.phone && leadData.phone.length > 10;
  const hasFullName = leadData.name && leadData.name.trim().includes(' ');
  const hasConsent = leadData.dataConsent === true;
  
  // Lead é considerado quente se tiver telefone, nome completo e consentimento
  if (hasPhone && hasFullName && hasConsent) {
    return 'quente';
  }
  
  return 'frio';
}

// Função para extrair metadados adicionais do lead
function extractLeadMetadata(leadData: any): any {
  return {
    userAgent: leadData.userAgent || 'unknown',
    ipAddress: leadData.ipAddress || 'unknown',
    referrer: leadData.referrer || 'direct',
    timestamp: leadData.registeredAt || new Date().toISOString(),
    source: 'registration'
  };
}

// Função principal para processar o lead
export async function processLead(env: Env, leadData: any) {
  console.log('Processando lead:', leadData.email);
  
  // Adicionar metadados ao lead
  const leadWithMetadata = {
    ...leadData,
    metadata: extractLeadMetadata(leadData)
  };
  
  // Enviar para n8n
  const n8nSuccess = await sendLeadToN8n(env, leadWithMetadata);
  console.log('Envio para n8n:', n8nSuccess ? 'SUCESSO' : 'FALHA');
  
  // Armazenar no Supabase
  const supabaseSuccess = await storeLeadInSupabase(env, leadWithMetadata);
  console.log('Armazenamento no Supabase:', supabaseSuccess ? 'SUCESSO' : 'FALHA');
  
  return {
    n8nSuccess,
    supabaseSuccess
  };
}

// Função para inicializar a tabela de leads (para uso em migrações)
export async function initLeadsTable(env: Env) {
  try {
    const supabase = getSupabaseClient(env);
    
    // Verificar se a tabela existe tentando selecionar um registro
    const { data, error } = await supabase
      .from('leads')
      .select('id')
      .limit(1);
    
    // Se houver erro de tabela não encontrada, criar a tabela
    if (error && error.message.includes('relation "leads" does not exist')) {
      console.log('Tabela de leads não encontrada, criando...');
      
      // Neste caso, você precisaria criar a tabela manualmente no painel do Supabase
      // ou usar uma função RPC se tiver permissões de administrador
      console.log('Por favor, crie a tabela de leads no painel do Supabase com o seguinte SQL:');
      console.log(`
        CREATE TABLE leads (
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
        
        CREATE INDEX idx_leads_email ON leads(email);
        CREATE INDEX idx_leads_type ON leads(type);
        CREATE INDEX idx_leads_created_at ON leads(created_at);
      `);
      
      return false;
    }
    
    console.log('Tabela de leads já existe');
    return true;
  } catch (error) {
    console.error('Erro ao verificar/criar tabela de leads:', error);
    return false;
  }
}