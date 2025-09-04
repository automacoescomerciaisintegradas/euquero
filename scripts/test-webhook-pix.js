#!/usr/bin/env node

/**
 * Script para testar o webhook PIX
 * Uso: node scripts/test-webhook-pix.js [ambiente]
 * 
 * Ambientes:
 * - local: http://localhost:8787
 * - dev: https://seu-dominio-dev.workers.dev
 * - prod: https://seu-dominio.com
 */

const https = require('https');
const http = require('http');

// Configurações por ambiente
const environments = {
  local: 'http://localhost:8787',
  dev: 'https://euquero-dev.workers.dev',
  prod: 'https://euquero.com'
};

const env = process.argv[2] || 'local';
const baseUrl = environments[env];

if (!baseUrl) {
  console.error('❌ Ambiente inválido. Use: local, dev ou prod');
  process.exit(1);
}

console.log(`🚀 Testando webhook PIX no ambiente: ${env}`);
console.log(`📍 URL base: ${baseUrl}`);

// Dados de teste
const testPayloads = [
  {
    name: 'Pagamento Aprovado - Usuário Válido',
    data: {
      data: { id: 'payment_123456789' },
      metadata: { user_id: 'user_abc123def456' },
      transaction_amount: 50.00,
      status: 'approved'
    }
  },
  {
    name: 'Pagamento Pendente',
    data: {
      data: { id: 'payment_987654321' },
      metadata: { user_id: 'user_xyz789abc123' },
      transaction_amount: 100.00,
      status: 'pending'
    }
  },
  {
    name: 'Dados Inválidos - Sem user_id',
    data: {
      data: { id: 'payment_invalid' },
      transaction_amount: 25.00,
      status: 'approved'
    }
  }
];

// Função para fazer requisição HTTP/HTTPS
function makeRequest(url, data) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const client = isHttps ? https : http;
    
    const postData = JSON.stringify(data);
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = client.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonResponse = JSON.parse(responseData);
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: jsonResponse
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: responseData
          });
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.write(postData);
    req.end();
  });
}

// Função para testar um payload
async function testPayload(payload) {
  console.log(`\n📋 Testando: ${payload.name}`);
  console.log('📤 Payload:', JSON.stringify(payload.data, null, 2));
  
  try {
    const response = await makeRequest(`${baseUrl}/api/webhooks/pix`, payload.data);
    
    console.log(`📥 Status: ${response.status}`);
    console.log('📥 Resposta:', JSON.stringify(response.data, null, 2));
    
    if (response.status >= 200 && response.status < 300) {
      console.log('✅ Teste passou!');
    } else {
      console.log('⚠️  Teste com aviso (status não 2xx)');
    }
  } catch (error) {
    console.log('❌ Teste falhou:', error.message);
  }
}

// Função para testar fila de retry
async function testRetryQueue() {
  console.log('\n🔄 Testando fila de retry...');
  
  try {
    const response = await makeRequest(`${baseUrl}/api/webhooks/retry-queue`, {});
    response.method = 'GET'; // Simular GET
    
    console.log(`📥 Status: ${response.status}`);
    console.log('📥 Resposta:', JSON.stringify(response.data, null, 2));
    
    if (response.status >= 200 && response.status < 300) {
      console.log('✅ Fila de retry funcionando!');
    } else {
      console.log('⚠️  Fila de retry com problemas');
    }
  } catch (error) {
    console.log('❌ Erro na fila de retry:', error.message);
  }
}

// Função para testar status da fila
async function testQueueStatus() {
  console.log('\n📊 Testando status da fila...');
  
  try {
    const response = await makeRequest(`${baseUrl}/api/webhooks/queue-status`, {});
    response.method = 'GET'; // Simular GET
    
    console.log(`📥 Status: ${response.status}`);
    console.log('📥 Resposta:', JSON.stringify(response.data, null, 2));
    
    if (response.status >= 200 && response.status < 300) {
      console.log('✅ Status da fila funcionando!');
    } else {
      console.log('⚠️  Status da fila com problemas');
    }
  } catch (error) {
    console.log('❌ Erro no status da fila:', error.message);
  }
}

// Executar todos os testes
async function runAllTests() {
  console.log('🧪 Iniciando testes do webhook PIX...\n');
  
  // Testar payloads do webhook
  for (const payload of testPayloads) {
    await testPayload(payload);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Aguardar 1s entre testes
  }
  
  // Testar endpoints auxiliares
  await testRetryQueue();
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  await testQueueStatus();
  
  console.log('\n🏁 Testes concluídos!');
  console.log('\n📝 Próximos passos:');
  console.log('1. Verificar logs do servidor');
  console.log('2. Confirmar se N8n recebeu as notificações');
  console.log('3. Testar com dados reais do gateway PIX');
}

// Executar testes
runAllTests().catch(console.error);