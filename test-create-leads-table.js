// Script para testar a criação da tabela de leads
// Execute este script no terminal com: node test-create-leads-table.js

async function testCreateLeadsTable() {
  try {
    console.log('Testando criação da tabela de leads...');
    
    // Em um ambiente real, você chamaria a API do Supabase
    // para criar a tabela. Aqui estamos apenas simulando.
    
    console.log('SQL para criar a tabela de leads:');
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
    
    console.log('✅ Tabela de leads pronta para ser criada no Supabase');
    
  } catch (error) {
    console.error('❌ Erro ao testar criação da tabela:', error);
  }
}

testCreateLeadsTable();