import { db } from './index';
import { users, pixPayments, transactions } from './schema';
import { eq } from 'drizzle-orm';
import { NotFoundError, UnauthorizedError } from './errors';

interface UserDataExport {
  personalInfo: {
    id: string;
    email: string;
    name?: string;
    phone?: string;
    createdAt: string;
  };
  payments: Array<{
    id: string;
    amount: number;
    status: string;
    createdAt: string;
  }>;
  transactions: Array<{
    id: string;
    type: string;
    amount: number;
    description?: string;
    createdAt: string;
  }>;
}

export async function getUserData(userId: string): Promise<UserDataExport> {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
    columns: {
      id: true,
      email: true,
      name: true,
      phone: true,
      createdAt: true
    }
  });

  if (!user) {
    throw new NotFoundError('Usuário não encontrado');
  }

  const payments = await db.query.pixPayments.findMany({
    where: eq(pixPayments.userId, userId),
    columns: {
      id: true,
      amount: true,
      status: true,
      createdAt: true
    }
  });

  const userTransactions = await db.query.transactions.findMany({
    where: eq(transactions.walletUserId, userId),
    columns: {
      id: true,
      type: true,
      amount: true,
      description: true,
      createdAt: true
    }
  });

  return {
    personalInfo: {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      createdAt: user.createdAt
    },
    payments: payments.map(payment => ({
      id: payment.id.toString(),
      amount: Number(payment.amount),
      status: payment.status,
      createdAt: payment.createdAt
    })),
    transactions: userTransactions.map(transaction => ({
      id: transaction.id.toString(),
      type: transaction.type,
      amount: Number(transaction.amount),
      description: transaction.description,
      createdAt: transaction.createdAt
    }))
  };
}

export async function deleteUserData(userId: string): Promise<void> {
  await db.transaction(async (tx) => {
    // Deletar todos os dados do usuário em ordem para respeitar as restrições de chave estrangeira
    await tx.delete(transactions).where(eq(transactions.walletUserId, userId));
    await tx.delete(pixPayments).where(eq(pixPayments.userId, userId));
    await tx.delete(users).where(eq(users.id, userId));
  });
}

export async function updateUserConsent(userId: string, consent: boolean): Promise<void> {
  const result = await db
    .update(users)
    .set({
      dataConsentGiven: consent,
      dataConsentGivenAt: consent ? new Date().toISOString() : null
    })
    .where(eq(users.id, userId));

  if (!result) {
    throw new NotFoundError('Usuário não encontrado');
  }
}

export async function requestDataDeletion(userId: string): Promise<void> {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId)
  });

  if (!user) {
    throw new NotFoundError('Usuário não encontrado');
  }

  // TODO: Implementar lógica de fila para processamento assíncrono
  // Por enquanto, vamos deletar diretamente
  await deleteUserData(userId);
}