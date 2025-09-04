import type { D1Database } from "@cloudflare/workers-types";
import type { CreditBalance, CreditTransaction, User } from "../shared/types";

/**
 * Inicializa o banco de dados criando as tabelas necessárias
 */
export async function initializeDatabase(DB: D1Database): Promise<void> {
  const statements = [
    // Tabela de Usuários
    `CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT,
      name TEXT,
      phone TEXT,
      provider TEXT NOT NULL,
      provider_id TEXT,
      email_verified INTEGER NOT NULL DEFAULT 0,
      subscription_status TEXT NOT NULL DEFAULT 'inactive',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );`,
    // Tabela de Saldos de Créditos
    `CREATE TABLE IF NOT EXISTS credit_balances (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL UNIQUE,
      balance REAL NOT NULL DEFAULT 0,
      currency TEXT NOT NULL DEFAULT 'BRL',
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );`,
    // Tabela de Transações de Créditos
    `CREATE TABLE IF NOT EXISTS credit_transactions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      type TEXT NOT NULL, -- 'credit' ou 'debit'
      amount REAL NOT NULL,
      description TEXT NOT NULL,
      service TEXT NOT NULL,
      status TEXT NOT NULL, -- 'pending', 'completed', 'failed'
      created_at TEXT NOT NULL
    );`,
    // Índices
    "CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);",
    "CREATE UNIQUE INDEX IF NOT EXISTS idx_users_provider_id ON users(provider, provider_id);",
    "CREATE INDEX IF NOT EXISTS idx_credit_balances_user_id ON credit_balances(user_id);",
    "CREATE INDEX IF NOT EXISTS idx_credit_transactions_user_id ON credit_transactions(user_id);",
  ];

  try {
    await DB.batch(statements.map(stmt => DB.prepare(stmt)));
    console.log("Banco de dados inicializado com sucesso.");
  } catch (error) {
    console.error("Erro ao inicializar o banco de dados:", error);
    throw error;
  }
}

// Funções de Usuário

export type UserWithPasswordHash = User & { password_hash: string | null };

export async function createUser(DB: D1Database, user: Omit<UserWithPasswordHash, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
  const userId = `user_${Date.now()}${Math.random().toString(36).slice(2, 9)}`;
  const now = new Date().toISOString();
  
  const newUser: User = {
    id: userId,
    email: user.email,
    name: user.name,
    phone: user.phone,
    provider: user.provider,
    providerId: user.providerId,
    emailVerified: user.emailVerified || false,
    subscription_status: 'inactive',
    createdAt: new Date(now),
    updatedAt: new Date(now),
  };

  await DB.prepare(
    `INSERT INTO users (id, email, password_hash, name, phone, provider, provider_id, email_verified, subscription_status, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
  .bind(
    newUser.id,
    newUser.email,
    user.password_hash,
    newUser.name || null,
    newUser.phone || null,
    newUser.provider,
    newUser.providerId || null,
    newUser.emailVerified ? 1 : 0,
    newUser.subscription_status,
    now,
    now
  )
  .run();

  return newUser;
}

export async function getUserByEmail(DB: D1Database, email: string): Promise<UserWithPasswordHash | null> {
  const result = await DB.prepare("SELECT *, password_hash FROM users WHERE email = ?").bind(email).first<UserWithPasswordHash>();
  return result;
}

export async function getUserById(DB: D1Database, userId: string): Promise<User | null> {
  const result = await DB.prepare("SELECT id, email, name, phone, provider, provider_id as providerId, email_verified as emailVerified, subscription_status, created_at as createdAt, updated_at as updatedAt FROM users WHERE id = ?").bind(userId).first<User>();
  if (!result) return null;
  return {
      ...result,
      emailVerified: Boolean(result.emailVerified),
      createdAt: new Date(result.createdAt),
      updatedAt: new Date(result.updatedAt)
  };
}

export async function createOrUpdateUserFromOAuth(DB: D1Database, profile: { email: string; name?: string; provider: 'google' | 'github'; providerId: string }): Promise<User> {
    const existingUser = await DB.prepare("SELECT * FROM users WHERE provider = ? AND provider_id = ?").bind(profile.provider, profile.providerId).first<User>();

    if (existingUser) {
        return getUserById(DB, existingUser.id) as Promise<User>;
    }

    // Check if a user with this email exists but used a different provider
    const userByEmail = await getUserByEmail(DB, profile.email);
    if (userByEmail) {
        // Here you might want to link accounts, but for now we'll throw an error to prevent account takeover
        throw new Error("Um usuário com este email já existe com um método de login diferente.");
    }

    const newUser = await createUser(DB, {
        email: profile.email,
        name: profile.name,
        provider: profile.provider,
        providerId: profile.providerId,
        emailVerified: true, // OAuth emails are typically verified
        password_hash: null,
        phone: undefined
    });

    return newUser;
}


export async function updateUserSubscriptionStatus(DB: D1Database, userId: string, status: 'inactive' | 'pending_verification' | 'active'): Promise<void> {
  await DB.prepare("UPDATE users SET subscription_status = ?, updated_at = ? WHERE id = ?")
    .bind(status, new Date().toISOString(), userId)
    .run();
}


// Funções de Crédito

export async function getCreditBalance(DB: D1Database, userId: string): Promise<CreditBalance | null> {
  const result = await DB.prepare("SELECT id, user_id as userId, balance, currency, expires_at as expiresAt, created_at as createdAt, updated_at as updatedAt FROM credit_balances WHERE user_id = ?").bind(userId).first<CreditBalance>();
  return result ? { ...result, expiresAt: new Date(result.expiresAt), createdAt: new Date(result.createdAt), updatedAt: new Date(result.updatedAt) } : null;
}

export async function upsertCreditBalance(DB: D1Database, creditBalance: Omit<CreditBalance, 'id'> & { id?: string }): Promise<CreditBalance> {
    const now = new Date();
    if (!creditBalance.id) {
      const newBalance: CreditBalance = {
        id: `credit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...creditBalance,
        createdAt: now,
        updatedAt: now,
      };
      await DB.prepare("INSERT INTO credit_balances (id, user_id, balance, currency, expires_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)")
        .bind(newBalance.id, newBalance.userId, newBalance.balance, newBalance.currency, newBalance.expiresAt.toISOString(), newBalance.createdAt.toISOString(), newBalance.updatedAt.toISOString())
        .run();
      return newBalance;
    } else {
      await DB.prepare("UPDATE credit_balances SET balance = ?, updated_at = ? WHERE id = ?")
        .bind(creditBalance.balance, now.toISOString(), creditBalance.id)
        .run();
      return { ...creditBalance, id: creditBalance.id, updatedAt: now } as CreditBalance;
    }
}

export async function addCreditsToBalance(DB: D1Database, userId: string, amount: number): Promise<CreditBalance> {
    const existingBalance = await getCreditBalance(DB, userId);
    if (existingBalance) {
        existingBalance.balance += amount;
        return upsertCreditBalance(DB, existingBalance);
    } else {
        const now = new Date();
        const newBalanceData = {
            userId,
            balance: amount,
            currency: "BRL",
            expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
            createdAt: now,
            updatedAt: now,
        };
        return upsertCreditBalance(DB, newBalanceData);
    }
}

export async function createCreditTransaction(DB: D1Database, transaction: Omit<CreditTransaction, 'id'>): Promise<CreditTransaction> {
  const newTransaction: CreditTransaction = {
    id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    ...transaction,
  };
  await DB.prepare("INSERT INTO credit_transactions (id, user_id, type, amount, description, service, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(newTransaction.id, newTransaction.userId, newTransaction.type, newTransaction.amount, newTransaction.description, newTransaction.service, newTransaction.status, newTransaction.createdAt.toISOString())
    .run();
  return newTransaction;
}

export async function getCreditTransactions(DB: D1Database, userId: string): Promise<CreditTransaction[]> {
  const { results } = await DB.prepare("SELECT id, user_id as userId, type, amount, description, service, status, created_at as createdAt FROM credit_transactions WHERE user_id = ? ORDER BY created_at DESC").bind(userId).all<CreditTransaction>();
  return (results || []).map(txn => ({ ...txn, createdAt: new Date(txn.createdAt) }));
}
