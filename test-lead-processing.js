// Script para testar o processamento de leads
async function testLeadProcessing() {
  const leadData = {
    email: "teste@exemplo.com",
    name: "Teste Exemplo",
    phone: "(88) 98871-2711",
    dataConsent: true,
    password: "senha12345",
    registeredAt: new Date().toISOString()
  };

  try {
    // Simular o envio para o webhook do n8n
    console.log("Enviando lead para n8n...");
    const n8nResponse = await fetch("https://n8n.iau2.com.br/webhook-test/dashboard", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...leadData,
        timestamp: new Date().toISOString(),
        source: 'euquero_registration_test'
      }),
    });

    console.log("Resposta do n8n:", n8nResponse.status, n8nResponse.statusText);

    // Simular o armazenamento no Supabase
    console.log("Armazenando lead no Supabase...");
    // Aqui você colocaria a lógica real de armazenamento no Supabase

    console.log("Processamento de lead concluído com sucesso!");
  } catch (error) {
    console.error("Erro ao processar lead:", error);
  }
}

// Executar o teste
testLeadProcessing();