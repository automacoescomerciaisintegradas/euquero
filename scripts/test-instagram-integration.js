#!/usr/bin/env node

/**
 * Script de teste para integração Instagram + EuQuero
 * Testa os endpoints da API e a integração com Python
 */

const https = require('https');
const http = require('http');

// Configuração
const config = {
  baseUrl: process.env.API_URL || 'http://localhost:8787',
  testUser: 'test_user_123',
  testCredentials: {
    username: 'usuario_teste',
    password: 'senha_teste'
  }
};

// Função para fazer requisições HTTP
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const protocol = options.protocol === 'https:' ? https : http;
    
    const req = protocol.request(options, (res) => {
      let body = '';
      
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = {
            statusCode: res.statusCode,
            headers: res.headers,
            body: body ? JSON.parse(body) : null
          };
          resolve(response);
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: body
          });
        }
      });
    });
    
    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// Testes
async function testInstagramConnection() {
  console.log('🔗 Testando conexão com Instagram...');
  
  try {
    const url = new URL(`${config.baseUrl}/api/instagram/connect`);
    
    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const data = {
      userId: config.testUser,
      username: config.testCredentials.username,
      password: config.testCredentials.password
    };
    
    const response = await makeRequest(options, data);
    
    if (response.statusCode === 200 && response.body.success) {
      console.log('✅ Conexão Instagram: SUCESSO');
      console.log(`   Usuário: @${response.body.connection.accountInfo.username}`);
      console.log(`   Seguidores: ${response.body.connection.accountInfo.followers_count}`);
      return true;
    } else {
      console.log('❌ Conexão Instagram: FALHOU');
      console.log(`   Status: ${response.statusCode}`);
      console.log(`   Erro: ${response.body?.message || 'Erro desconhecido'}`);
      return false;
    }
  } catch (error) {
    console.log('❌ Conexão Instagram: ERRO');
    console.log(`   Erro: ${error.message}`);
    return false;
  }
}

async function testAccountInfo() {
  console.log('📊 Testando informações da conta...');
  
  try {
    const url = new URL(`${config.baseUrl}/api/instagram/account/${config.testUser}`);
    
    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname,
      method: 'GET'
    };
    
    const response = await makeRequest(options);
    
    if (response.statusCode === 200 && response.body.success) {
      console.log('✅ Informações da conta: SUCESSO');
      console.log(`   Conectado: ${response.body.account.connected ? 'Sim' : 'Não'}`);
      if (response.body.account.connected) {
        console.log(`   Usuário: @${response.body.account.username}`);
        console.log(`   Tipo: ${response.body.account.is_business ? 'Empresarial' : 'Pessoal'}`);
      }
      return true;
    } else {
      console.log('❌ Informações da conta: FALHOU');
      console.log(`   Status: ${response.statusCode}`);
      return false;
    }
  } catch (error) {
    console.log('❌ Informações da conta: ERRO');
    console.log(`   Erro: ${error.message}`);
    return false;
  }
}

async function testPhotoUpload() {
  console.log('📸 Testando upload de foto...');
  
  try {
    const url = new URL(`${config.baseUrl}/api/instagram/upload-photo`);
    
    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const data = {
      userId: config.testUser,
      imageUrl: 'https://via.placeholder.com/1080x1080/4F46E5/FFFFFF?text=EuQuero+Test',
      caption: 'Teste de automação do EuQuero! 🚀',
      hashtags: ['euquero', 'automacao', 'instagram', 'teste']
    };
    
    const response = await makeRequest(options, data);
    
    if (response.statusCode === 200 && response.body.success) {
      console.log('✅ Upload de foto: SUCESSO');
      console.log(`   Media ID: ${response.body.upload.media_id}`);
      console.log(`   Legenda: ${response.body.upload.caption.substring(0, 50)}...`);
      return true;
    } else {
      console.log('❌ Upload de foto: FALHOU');
      console.log(`   Status: ${response.statusCode}`);
      console.log(`   Erro: ${response.body?.message || 'Erro desconhecido'}`);
      return false;
    }
  } catch (error) {
    console.log('❌ Upload de foto: ERRO');
    console.log(`   Erro: ${error.message}`);
    return false;
  }
}

async function testAutomationFeatures() {
  console.log('⚙️ Testando funcionalidades de automação...');
  
  try {
    const url = new URL(`${config.baseUrl}/api/automation/features`);
    
    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname,
      method: 'GET'
    };
    
    const response = await makeRequest(options);
    
    if (response.statusCode === 200 && response.body.features) {
      console.log('✅ Funcionalidades de automação: SUCESSO');
      console.log(`   Funcionalidades disponíveis: ${response.body.features.length}`);
      response.body.features.forEach(feature => {
        console.log(`   - ${feature.name}: R$ ${feature.price.toFixed(2)}`);
      });
      return true;
    } else {
      console.log('❌ Funcionalidades de automação: FALHOU');
      console.log(`   Status: ${response.statusCode}`);
      return false;
    }
  } catch (error) {
    console.log('❌ Funcionalidades de automação: ERRO');
    console.log(`   Erro: ${error.message}`);
    return false;
  }
}

// Função principal
async function runTests() {
  console.log('🧪 Iniciando testes de integração Instagram + EuQuero\n');
  console.log(`📍 URL Base: ${config.baseUrl}`);
  console.log(`👤 Usuário de teste: ${config.testUser}\n`);
  
  const results = [];
  
  // Executar testes
  results.push(await testAutomationFeatures());
  results.push(await testAccountInfo());
  results.push(await testInstagramConnection());
  results.push(await testPhotoUpload());
  
  // Resumo
  console.log('\n📋 Resumo dos Testes:');
  const passed = results.filter(r => r).length;
  const total = results.length;
  
  console.log(`✅ Passou: ${passed}/${total}`);
  console.log(`❌ Falhou: ${total - passed}/${total}`);
  
  if (passed === total) {
    console.log('\n🎉 Todos os testes passaram! Integração funcionando corretamente.');
  } else {
    console.log('\n⚠️ Alguns testes falharam. Verifique a configuração.');
  }
  
  console.log('\n📚 Para mais informações, consulte: docs/INSTAGRAM_SETUP.md');
}

// Executar se chamado diretamente
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests };