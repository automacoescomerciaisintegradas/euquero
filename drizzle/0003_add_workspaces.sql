-- Criar tabela de workspaces
CREATE TABLE workspaces (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT NOT NULL,
  description TEXT,
  owner_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  visibility TEXT CHECK(visibility IN ('public', 'private', 'team')) DEFAULT 'private',
  settings TEXT, -- JSON para configurações flexíveis
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Criar tabela de membros do workspace
CREATE TABLE workspace_members (
  workspace_id TEXT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role TEXT CHECK(role IN ('owner', 'admin', 'member', 'viewer')) DEFAULT 'member',
  joined_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (workspace_id, user_id)
);

-- Criar tabela de convites para workspace
CREATE TABLE workspace_invites (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  workspace_id TEXT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  inviter_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  invitee_email TEXT NOT NULL,
  role TEXT CHECK(role IN ('admin', 'member', 'viewer')) DEFAULT 'member',
  token TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  accepted_at TEXT,
  status TEXT CHECK(status IN ('pending', 'accepted', 'rejected', 'expired')) DEFAULT 'pending'
);

-- Criar índices
CREATE INDEX idx_workspaces_owner ON workspaces(owner_id);
CREATE INDEX idx_workspace_members_user ON workspace_members(user_id);
CREATE INDEX idx_workspace_invites_email ON workspace_invites(invitee_email);
CREATE INDEX idx_workspace_invites_token ON workspace_invites(token);