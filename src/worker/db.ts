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

export async function createUser(DB: D1Database, user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
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
    `INSERT INTO users (id, email, name, phone, provider, provider_id, email_verified, subscription_status, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
  .bind(
    newUser.id,
    newUser.email,
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

export async function getUserByEmail(DB: D1Database, email: string): Promise<User | null> {
  const result = await DB.prepare("SELECT id, email, name, phone, provider, provider_id as providerId, email_verified as emailVerified, subscription_status, created_at as createdAt, updated_at as updatedAt FROM users WHERE email = ?").bind(email).first<User>();
  if (!result) return null;
  return {
      ...result,
      emailVerified: Boolean(result.emailVerified),
      createdAt: new Date(result.createdAt),
      updatedAt: new Date(result.updatedAt)
  };
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

export async function createOrUpdateUser(DB: D1Database, profile: { email: string; name?: string; provider: string; providerId: string }): Promise<User> {
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
        phone: undefined
    });

    return newUser;
}


export async function updateUserSubscriptionStatus(DB: D1Database, userId: string, status: 'inactive' | 'pending_verification' | 'active'): Promise<void> {
  await DB.prepare("UPDATE users SET subscription_status = ?, updated_at = ? WHERE id = ?")
    .bind(status, new Date().toISOString(), userId)
    .run();
}
