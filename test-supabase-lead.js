import { createClient } from '@supabase/supabase-js';

// Configurações do Supabase (substitua pelos seus valores reais)
const SUPABASE_URL = 'https://uunuonapovtyuwtelrng.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1bnVvbmFwb3Z0eXV3dGVscm5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0NTQ2OTksImV4cCI6MjA2NjAzMDY5OX0.t-yru5eAK00I3fxdidZuPQxiT_gSQNP62bSVVoFTxx8';

async function testLeadStorage() {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    // Tentar inserir um lead de teste
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          email: 'teste@exemplo.com',
          phone: '(88) 98871-2711',
          name: 'Teste Exemplo',
          type: 'quente',
          source: 'teste',
          data: {
            email: 'teste@exemplo.com',
            name: 'Teste Exemplo',
            phone: '(88) 98871-2711',
            dataConsent: true
          },
          created_at: new Date().toISOString()
        }
      ]);
    
    if (error) {
      console.error('Erro ao inserir lead:', error);
      return;
    }
    
    console.log('Lead inserido com sucesso:', data);
  } catch (error) {
    console.error('Erro de conexão:', error);
  }
}

testLeadStorage();