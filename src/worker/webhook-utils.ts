import type { N8nNotificationPayload, WebhookQueueItem } from "@/shared/types";
import { addCreditsToBalance, createCreditTransaction } from "./db";
import type { D1Database } from "@cloudflare/workers-types";

interface WebhookEnv {
  N8N_WEBHOOK_URL: string;
  INTERNAL_SECRET: string;
}

// Simulação de banco de dados em memória para a fila de webhooks
const webhookQueue: WebhookQueueItem[] = [];

/**
 * Envia notificação para o N8n de forma segura
 */
export async function notifyN8n(env: WebhookEnv, payload: N8nNotificationPayload): Promise<boolean> {
  try {
    const response = await fetch(env.N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${env.INTERNAL_SECRET}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`N8n respondeu com status ${response.status}: ${response.statusText}`);
      return false;
    }

    console.log("Notificação enviada com sucesso para o N8n");
    return true;
  } catch (error) {
    console.error("Erro ao notificar N8n:", error);
    return false;
  }
}

/**
 * Adiciona item à fila de retry
 */
export function addToRetryQueue(item: Omit<WebhookQueueItem, 'id' | 'created_at'>): void {
  const queueItem: WebhookQueueItem = {
    ...item,
    id: `queue_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    created_at: new Date(),
  };
  
  webhookQueue.push(queueItem);
  console.log(`Item adicionado à fila de retry: ${queueItem.id}`);
}

/**
 * Processa fila de retry
 */
export async function processRetryQueue(env: WebhookEnv): Promise<{ processed: number; failed: number }> {
  const pendingItems = webhookQueue.filter(
    item => item.status === 'pending' && item.retries < 5
  );

  if (pendingItems.length === 0) {
    return { processed: 0, failed: 0 };
  }

  let processed = 0;
  let failed = 0;

  for (const item of pendingItems) {
    const payload: N8nNotificationPayload = {
      event: "PIX_PAYMENT_CONFIRMED",
      user_id: item.user_id,
      payment_id: item.payment_id,
      amount: item.amount,
      timestamp: new Date().toISOString(),
    };

    const success = await notifyN8n(env, payload);
    
    if (success) {
      item.status = 'completed';
      processed++;
      console.log(`Item processado com sucesso: ${item.id}`);
    } else {
      item.retries++;
      item.last_attempt = new Date();
      
      if (item.retries >= 5) {
        item.status = 'failed';
        failed++;
        console.error(`Item falhou após 5 tentativas: ${item.id}`);
      }
    }
  }

  return { processed, failed };
}

/**
 * Atualiza o saldo do usuário no banco de dados
 */
export async function creditUserBalance(DB: D1Database, userId: string, amount: number): Promise<boolean> {
  try {
    await addCreditsToBalance(DB, userId, amount);
    await createCreditTransaction(DB, {
      userId,
      type: 'credit',
      amount,
      description: `Recarga via PIX`,
      service: 'Recarga',
      status: 'completed',
      createdAt: new Date()
    });
    
    console.log(`Creditando R$ ${amount} para o usuário ${userId}`);
    return true;
  } catch (error) {
    console.error("Erro ao creditar saldo:", error);
    return false;
  }
}

/**
 * Registra log de auditoria
 */
export function logAuditEvent(event: string, userId: string, details: any): void {
  const auditLog = {
    id: `audit_${Date.now()}`,
    event,
    user_id: userId,
    details,
    timestamp: new Date().toISOString(),
  };
  
  console.log("Audit Log:", JSON.stringify(auditLog, null, 2));
}
