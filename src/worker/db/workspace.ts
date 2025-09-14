import { db } from './index';
import { workspaces, workspaceMembers, workspaceInvites } from './schema';
import { eq, and } from 'drizzle-orm';
import { generateToken } from '../utils';

export async function createWorkspace(data: {
  name: string;
  description?: string;
  ownerId: string;
  visibility?: 'public' | 'private' | 'team';
  settings?: Record<string, any>;
}) {
  const workspace = await db.transaction(async (tx) => {
    const [workspace] = await tx
      .insert(workspaces)
      .values({
        name: data.name,
        description: data.description,
        ownerId: data.ownerId,
        visibility: data.visibility || 'private',
        settings: data.settings ? JSON.stringify(data.settings) : null,
      })
      .returning();

    await tx.insert(workspaceMembers).values({
      workspaceId: workspace.id,
      userId: data.ownerId,
      role: 'owner',
    });

    return workspace;
  });

  return workspace;
}

export async function getWorkspace(id: string) {
  const workspace = await db.query.workspaces.findFirst({
    where: eq(workspaces.id, id),
    with: {
      owner: true,
      members: {
        with: {
          user: true,
        },
      },
    },
  });

  return workspace;
}

export async function updateWorkspace(id: string, data: {
  name?: string;
  description?: string;
  visibility?: 'public' | 'private' | 'team';
  settings?: Record<string, any>;
}) {
  const [workspace] = await db
    .update(workspaces)
    .set({
      name: data.name,
      description: data.description,
      visibility: data.visibility,
      settings: data.settings ? JSON.stringify(data.settings) : undefined,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(workspaces.id, id))
    .returning();

  return workspace;
}

export async function deleteWorkspace(id: string) {
  await db.delete(workspaces).where(eq(workspaces.id, id));
}

export async function addWorkspaceMember(workspaceId: string, userId: string, role: 'admin' | 'member' | 'viewer' = 'member') {
  const [member] = await db
    .insert(workspaceMembers)
    .values({
      workspaceId,
      userId,
      role,
    })
    .returning();

  return member;
}

export async function removeWorkspaceMember(workspaceId: string, userId: string) {
  await db
    .delete(workspaceMembers)
    .where(
      and(
        eq(workspaceMembers.workspaceId, workspaceId),
        eq(workspaceMembers.userId, userId)
      )
    );
}

export async function updateWorkspaceMemberRole(workspaceId: string, userId: string, role: 'admin' | 'member' | 'viewer') {
  const [member] = await db
    .update(workspaceMembers)
    .set({ role })
    .where(
      and(
        eq(workspaceMembers.workspaceId, workspaceId),
        eq(workspaceMembers.userId, userId)
      )
    )
    .returning();

  return member;
}

export async function createWorkspaceInvite(data: {
  workspaceId: string;
  inviterId: string;
  inviteeEmail: string;
  role?: 'admin' | 'member' | 'viewer';
  expiresIn?: number; // em horas, padrão 48h
}) {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + (data.expiresIn || 48));

  const [invite] = await db
    .insert(workspaceInvites)
    .values({
      workspaceId: data.workspaceId,
      inviterId: data.inviterId,
      inviteeEmail: data.inviteeEmail,
      role: data.role || 'member',
      token: generateToken(),
      expiresAt: expiresAt.toISOString(),
    })
    .returning();

  return invite;
}

export async function acceptWorkspaceInvite(token: string, userId: string) {
  return await db.transaction(async (tx) => {
    const [invite] = await tx
      .update(workspaceInvites)
      .set({
        status: 'accepted',
        acceptedAt: new Date().toISOString(),
      })
      .where(
        and(
          eq(workspaceInvites.token, token),
          eq(workspaceInvites.status, 'pending')
        )
      )
      .returning();

    if (!invite) {
      throw new Error('Convite inválido ou expirado');
    }

    const member = await tx
      .insert(workspaceMembers)
      .values({
        workspaceId: invite.workspaceId,
        userId,
        role: invite.role,
      })
      .returning();

    return { invite, member };
  });
}