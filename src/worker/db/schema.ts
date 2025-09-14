import { sqliteTable, text, integer, numeric } from 'drizzle-orm/sqlite-core';
import { relations, type InferSelectModel, type InferInsertModel } from 'drizzle-orm';
import { primaryKey, unique } from 'drizzle-orm/sqlite-core';

// Tabela de Usuários
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  displayName: text('display_name'),
  bio: text('bio'),
  avatarUrl: text('avatar_url'),
  dataConsentGiven: integer('data_consent_given', { mode: 'boolean' }).default(false),
  dataConsentGivenAt: text('data_consent_given_at'),
  createdAt: text('created_at').default("datetime('now')"),
  updatedAt: text('updated_at').default("datetime('now')"),
  // Campos para recuperação de senha
  resetToken: text('reset_token'),
  resetTokenExpiry: text('reset_token_expiry'),
  // Campos para 2FA
  twoFactorSecret: text('two_factor_secret'),
  twoFactorEnabled: integer('two_factor_enabled', { mode: 'boolean' }).default(false),
  // Campo para verificação de email
  emailVerified: integer('email_verified', { mode: 'boolean' }).default(false),
  emailVerificationToken: text('email_verification_token'),
  emailVerificationExpiry: text('email_verification_expiry'),
});

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

// Relacionamentos dos Usuários
export const usersRelations = relations(users, ({ many, one }) => ({
  posts: many(posts),
  comments: many(comments),
  conversations: many(conversationParticipants),
  messages: many(messages),
  groups: many(groupMembers),
  reactions: many(reactions),
  wallet: one(wallets, {
    fields: [users.id],
    references: [wallets.userId],
  }),
  pixPayments: many(pixPayments),
}));

// Tabela de Posts
export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  uuid: text('uuid').notNull().unique(),
  authorId: text('author_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  media: text('media'), // JSON string
  visibility: text('visibility', { enum: ['public', 'private', 'friends', 'group'] })
    .notNull()
    .default('public'),
  groupId: integer('group_id').references(() => groups.id, { onDelete: 'set null' }),
  likesCount: integer('likes_count').default(0),
  commentsCount: integer('comments_count').default(0),
  createdAt: text('created_at').default("datetime('now')"),
  updatedAt: text('updated_at').default("datetime('now')"),
});

export type Post = InferSelectModel<typeof posts>;
export type NewPost = InferInsertModel<typeof posts>;

// Relacionamentos dos Posts
export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  group: one(groups, {
    fields: [posts.groupId],
    references: [groups.id],
  }),
  comments: many(comments),
  reactions: many(reactions),
}));

// Tabela de Comentários
export const comments = sqliteTable('comments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  uuid: text('uuid').notNull().unique(),
  postId: integer('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
  authorId: text('author_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  parentCommentId: integer('parent_comment_id').references(() => comments.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  likesCount: integer('likes_count').default(0),
  createdAt: text('created_at').default("datetime('now')"),
  updatedAt: text('updated_at').default("datetime('now')"),
});

export type Comment = InferSelectModel<typeof comments>;
export type NewComment = InferInsertModel<typeof comments>;

// Relacionamentos dos Comentários
export const commentsRelations = relations(comments, ({ one, many }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  author: one(users, {
    fields: [comments.authorId],
    references: [users.id],
  }),
  parent: one(comments, {
    fields: [comments.parentCommentId],
    references: [comments.id],
    relationName: 'parent',
  }),
  replies: many(comments, { relationName: 'parent' }),
  reactions: many(reactions),
}));

// Tabela de Conversas (Chat Threads)
export const conversations = sqliteTable('conversations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  uuid: text('uuid').notNull().unique(),
  title: text('title'),
  isGroup: integer('is_group', { mode: 'boolean' }).default(false),
  createdBy: text('created_by').references(() => users.id, { onDelete: 'set null' }),
  createdAt: text('created_at').default("datetime('now')"),
  updatedAt: text('updated_at').default("datetime('now')"),
});

export type Conversation = InferSelectModel<typeof conversations>;
export type NewConversation = InferInsertModel<typeof conversations>;

// Relacionamentos das Conversas
export const conversationsRelations = relations(conversations, ({ one, many }) => ({
  creator: one(users, {
    fields: [conversations.createdBy],
    references: [users.id],
  }),
  participants: many(conversationParticipants),
  messages: many(messages),
}));

// Tabela de Participantes de Conversa
export const conversationParticipants = sqliteTable('conversation_participants', {
  conversationId: integer('conversation_id')
    .notNull()
    .references(() => conversations.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  role: text('role', { enum: ['member', 'admin'] }).default('member'),
  joinedAt: text('joined_at').default("datetime('now')"),
}, (table) => ({
  pk: primaryKey({ columns: [table.conversationId, table.userId] }),
}));

export type ConversationParticipant = InferSelectModel<typeof conversationParticipants>;
export type NewConversationParticipant = InferInsertModel<typeof conversationParticipants>;

// Relacionamentos dos Participantes de Conversa
export const conversationParticipantsRelations = relations(conversationParticipants, ({ one }) => ({
  conversation: one(conversations, {
    fields: [conversationParticipants.conversationId],
    references: [conversations.id],
  }),
  user: one(users, {
    fields: [conversationParticipants.userId],
    references: [users.id],
  }),
}));

// Tabela de Mensagens
export const messages = sqliteTable('messages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  conversationId: integer('conversation_id')
    .notNull()
    .references(() => conversations.id, { onDelete: 'cascade' }),
  senderId: text('sender_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  content: text('content'),
  attachments: text('attachments'), // JSON string
  readBy: text('read_by').default('[]'), // JSON array como string
  createdAt: text('created_at').default("datetime('now')"),
});

export type Message = InferSelectModel<typeof messages>;
export type NewMessage = InferInsertModel<typeof messages>;

// Relacionamentos das Mensagens
export const messagesRelations = relations(messages, ({ one, many }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],
  }),
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
  }),
  reactions: many(reactions),
}));

// Tabela de Grupos
export const groups = sqliteTable('groups', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  uuid: text('uuid').notNull().unique(),
  ownerId: text('owner_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  visibility: text('visibility', { enum: ['public', 'private', 'hidden'] }).default('public'),
  membersCount: integer('members_count').default(0),
  createdAt: text('created_at').default('datetime(\'now\')'),
  updatedAt: text('updated_at').default('datetime(\'now\')'),
});

export type Group = InferSelectModel<typeof groups>;
export type NewGroup = InferInsertModel<typeof groups>;

// Relacionamentos dos Grupos
export const groupsRelations = relations(groups, ({ one, many }) => ({
  owner: one(users, {
    fields: [groups.ownerId],
    references: [users.id],
  }),
  members: many(groupMembers),
  posts: many(posts),
}));

// Tabela de Membros de Grupo
export const groupMembers = sqliteTable('group_members', {
  groupId: integer('group_id')
    .notNull()
    .references(() => groups.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  role: text('role', { enum: ['member', 'moderator', 'owner'] }).default('member'),
  joinedAt: text('joined_at').default('datetime(\'now\')'),
}, (table) => ({
  pk: primaryKey({ columns: [table.groupId, table.userId] }),
}));

export type GroupMember = InferSelectModel<typeof groupMembers>;
export type NewGroupMember = InferInsertModel<typeof groupMembers>;

// Relacionamentos dos Membros de Grupo
export const groupMembersRelations = relations(groupMembers, ({ one }) => ({
  group: one(groups, {
    fields: [groupMembers.groupId],
    references: [groups.id],
  }),
  user: one(users, {
    fields: [groupMembers.userId],
    references: [users.id],
  }),
}));

// Tabela de Reações
export const reactions = sqliteTable('reactions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  targetType: text('target_type', { enum: ['post', 'comment', 'message'] }).notNull(),
  targetId: integer('target_id').notNull(),
  reactionType: text('reaction_type').notNull(),
  createdAt: text('created_at').default('datetime(\'now\')'),
}, (table) => ({
  unq: unique().on(table.userId, table.targetType, table.targetId, table.reactionType),
}));

export type Reaction = InferSelectModel<typeof reactions>;
export type NewReaction = InferInsertModel<typeof reactions>;

// Relacionamentos das Reações
export const reactionsRelations = relations(reactions, ({ one }) => ({
  user: one(users, {
    fields: [reactions.userId],
    references: [users.id],
  }),
  // Note: Relations to post, comment, message would require polymorphic handling
}));

// Tabela de Carteiras (Wallets)
export const wallets = sqliteTable('wallets', {
  userId: text('user_id')
    .primaryKey()
    .references(() => users.id, { onDelete: 'cascade' }),
  balance: numeric('balance', { precision: 12, scale: 2 }).default(0),
  currency: text('currency').default('BRL'),
  updatedAt: text('updated_at').default('datetime(\'now\')'),
});

export type Wallet = InferSelectModel<typeof wallets>;
export type NewWallet = InferInsertModel<typeof wallets>;

// Relacionamentos das Carteiras
export const walletsRelations = relations(wallets, ({ one, many }) => ({
  user: one(users, {
    fields: [wallets.userId],
    references: [users.id],
  }),
  transactions: many(transactions),
}));

// Tabela de Pagamentos PIX
export const pixPayments = sqliteTable('pix_payments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  uuid: text('uuid').notNull().unique(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
  gatewayPaymentId: text('gateway_payment_id'),
  pixKey: text('pix_key'),
  qrCode: text('qr_code'),
  qrCodeBase64: text('qr_code_base64'),
  status: text('status', { enum: ['pending', 'paid', 'cancelled', 'expired', 'failed'] })
    .default('pending'),
  expiresAt: text('expires_at'),
  paidAt: text('paid_at'),
  metadata: text('metadata'),
  createdAt: text('created_at').default('datetime(\'now\')'),
});

export type PixPayment = InferSelectModel<typeof pixPayments>;
export type NewPixPayment = InferInsertModel<typeof pixPayments>;

// Relacionamentos dos Pagamentos PIX
export const pixPaymentsRelations = relations(pixPayments, ({ one, many }) => ({
  user: one(users, {
    fields: [pixPayments.userId],
    references: [users.id],
  }),
  transactions: many(transactions),
}));

// Tabela de Transações
export const transactions = sqliteTable('transactions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  walletUserId: text('wallet_user_id')
    .notNull()
    .references(() => wallets.userId, { onDelete: 'cascade' }),
  pixPaymentId: integer('pix_payment_id').references(() => pixPayments.id, {
    onDelete: 'set null',
  }),
  type: text('type', { enum: ['credit', 'debit', 'refund', 'fee'] }).notNull(),
  amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
  balanceBefore: numeric('balance_before', { precision: 12, scale: 2 }),
  balanceAfter: numeric('balance_after', { precision: 12, scale: 2 }),
  description: text('description'),
  metadata: text('metadata'),
  createdAt: text('created_at').default('datetime(\'now\')'),
});

export type Transaction = InferSelectModel<typeof transactions>;
export type NewTransaction = InferInsertModel<typeof transactions>;

// Relacionamentos das Transações
export const transactionsRelations = relations(transactions, ({ one }) => ({
  wallet: one(wallets, {
    fields: [transactions.walletUserId],
    references: [wallets.userId],
  }),
  pixPayment: one(pixPayments, {
    fields: [transactions.pixPaymentId],
    references: [pixPayments.id],
  }),
}));

// Tabela de Logs de Webhook
export const webhookLogs = sqliteTable('webhook_logs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  eventSource: text('event_source').notNull(),
  eventType: text('event_type'),
  payload: text('payload'),
  status: text('status', { enum: ['pending', 'sent', 'failed'] }).default('pending'),
  attempts: integer('attempts').default(0),
  lastAttemptAt: text('last_attempt_at'),
  createdAt: text('created_at').default('datetime(\'now\')'),
});

export type WebhookLog = InferSelectModel<typeof webhookLogs>;
export type NewWebhookLog = InferInsertModel<typeof webhookLogs>;

// Tabela de Assinaturas
export const subscriptions = sqliteTable('subscriptions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  uuid: text('uuid').notNull().unique(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  planId: text('plan_id').notNull(),
  planType: text('plan_type', { enum: ['free', 'pay_per_use', 'monthly'] }).notNull(),
  status: text('status', { enum: ['active', 'cancelled', 'expired', 'pending'] }).default('pending'),
  startDate: text('start_date').notNull(),
  endDate: text('end_date'),
  autoRenew: integer('auto_renew', { mode: 'boolean' }).default(true),
  amount: numeric('amount', { precision: 12, scale: 2 }),
  currency: text('currency').default('BRL'),
  metadata: text('metadata'), // JSON string
  createdAt: text('created_at').default('datetime(\'now\')'),
  updatedAt: text('updated_at').default('datetime(\'now\')'),
});

export type Subscription = InferSelectModel<typeof subscriptions>;
export type NewSubscription = InferInsertModel<typeof subscriptions>;

// Relacionamentos das Assinaturas
export const subscriptionsRelations = relations(subscriptions, ({ one, many }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
  transactions: many(transactions),
}));

// ÍNDICES (definidos como comentários, pois DrizzleORM não os gerencia diretamente)
/*
create index idx_posts_author_id on posts (author_id);
create index idx_posts_group_id on posts (group_id);
create index idx_posts_created_at on posts (created_at);
create index idx_comments_post_id on comments (post_id);
create index idx_comments_author_id on comments (author_id);
create index idx_conversation_participants_user_id on conversation_participants (user_id);
create index idx_messages_conversation_id on messages (conversation_id, created_at);
create index idx_groups_owner_id on groups (owner_id);
create index idx_pix_payments_user_id on pix_payments (user_id);
create index idx_pix_payments_status on pix_payments (status);
create index idx_transactions_wallet_user_id on transactions (wallet_user_id, created_at);
create index idx_subscriptions_user_id on subscriptions (user_id);
create index idx_subscriptions_status on subscriptions (status);
*/