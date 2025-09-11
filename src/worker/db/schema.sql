-- USUÁRIOS
create table users (
  id text default (lower(hex(randomblob(16)))) primary key,
  username text not null unique,
  email text not null unique,
  password_hash text not null,
  display_name text,
  bio text,
  avatar_url text,
  created_at text default (datetime('now')),
  updated_at text default (datetime('now'))
);

-- POSTS
create table posts (
  id integer primary key autoincrement,
  uuid text default (lower(hex(randomblob(16)))) not null unique,
  author_id text not null references users(id) on delete cascade,
  content text not null,
  media text, -- JSON string
  visibility text not null default 'public' check (visibility in ('public','private','friends','group')),
  group_id integer references groups(id) on delete set null,
  likes_count integer default 0,
  comments_count integer default 0,
  created_at text default (datetime('now')),
  updated_at text default (datetime('now'))
);

-- COMENTÁRIOS
create table comments (
  id integer primary key autoincrement,
  uuid text default (lower(hex(randomblob(16)))) not null unique,
  post_id integer not null references posts(id) on delete cascade,
  author_id text not null references users(id) on delete cascade,
  parent_comment_id integer references comments(id) on delete cascade,
  content text not null,
  likes_count integer default 0,
  created_at text default (datetime('now')),
  updated_at text default (datetime('now'))
);

-- CONVERSAS (CHAT THREADS)
create table conversations (
  id integer primary key autoincrement,
  uuid text default (lower(hex(randomblob(16)))) not null unique,
  title text,
  is_group boolean default false,
  created_by text references users(id) on delete set null,
  created_at text default (datetime('now')),
  updated_at text default (datetime('now'))
);

-- PARTICIPANTES DE CONVERSA
create table conversation_participants (
  conversation_id integer not null references conversations(id) on delete cascade,
  user_id text not null references users(id) on delete cascade,
  role text default 'member' check (role in ('member','admin')),
  joined_at text default (datetime('now')),
  primary key (conversation_id, user_id)
);

-- MENSAGENS
create table messages (
  id integer primary key autoincrement,
  conversation_id integer not null references conversations(id) on delete cascade,
  sender_id text not null references users(id) on delete cascade,
  content text,
  attachments text, -- JSON string
  read_by text default '[]', -- JSON array como string
  created_at text default (datetime('now'))
);

-- GRUPOS
create table groups (
  id integer primary key autoincrement,
  uuid text default (lower(hex(randomblob(16)))) not null unique,
  owner_id text not null references users(id) on delete cascade,
  name text not null,
  description text,
  visibility text default 'public' check (visibility in ('public','private','hidden')),
  members_count integer default 0,
  created_at text default (datetime('now')),
  updated_at text default (datetime('now'))
);

-- MEMBROS DE GRUPO
create table group_members (
  group_id integer not null references groups(id) on delete cascade,
  user_id text not null references users(id) on delete cascade,
  role text default 'member' check (role in ('member','moderator','owner')),
  joined_at text default (datetime('now')),
  primary key (group_id, user_id)
);

-- REAÇÕES
create table reactions (
  id integer primary key autoincrement,
  user_id text not null references users(id) on delete cascade,
  target_type text not null check (target_type in ('post','comment','message')),
  target_id integer not null,
  reaction_type text not null,
  created_at text default (datetime('now')),
  unique (user_id, target_type, target_id, reaction_type)
);

-- CARTEIRAS (WALLETS)
create table wallets (
  user_id text primary key references users(id) on delete cascade,
  balance numeric(12,2) default 0,
  currency text default 'BRL',
  updated_at text default (datetime('now'))
);

-- PAGAMENTOS PIX
create table pix_payments (
  id integer primary key autoincrement,
  uuid text default (lower(hex(randomblob(16)))) not null unique,
  user_id text not null references users(id) on delete cascade,
  amount numeric(12,2) not null check (amount > 0),
  gateway_payment_id text,
  pix_key text,
  qr_code text,
  qr_code_base64 text,
  status text default 'pending' check (status in ('pending','paid','cancelled','expired','failed')),
  expires_at text,
  paid_at text,
  metadata text,
  created_at text default (datetime('now'))
);

-- TRANSAÇÕES
create table transactions (
  id integer primary key autoincrement,
  wallet_user_id text not null references wallets(user_id) on delete cascade,
  pix_payment_id integer references pix_payments(id) on delete set null,
  type text not null check (type in ('credit','debit','refund','fee')),
  amount numeric(12,2) not null,
  balance_before numeric(12,2),
  balance_after numeric(12,2),
  description text,
  metadata text,
  created_at text default (datetime('now'))
);

-- WEBHOOK LOGS
create table webhook_logs (
  id integer primary key autoincrement,
  event_source text not null,
  event_type text,
  payload text,
  status text default 'pending' check (status in ('pending','sent','failed')),
  attempts integer default 0,
  last_attempt_at text,
  created_at text default (datetime('now'))
);

-- ÍNDICES
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