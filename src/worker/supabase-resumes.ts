import { getSupabaseClient } from './supabase';
import type { Env } from './env';
import type { Resume } from '../shared/types';

/**
 * Create a new resume record in Supabase
 */
export async function createResume(env: Env, resume: Omit<Resume, 'id' | 'createdAt'>): Promise<Resume> {
  const supabase = getSupabaseClient(env);
  
  const newResume: Resume = {
    id: `resume_${Date.now()}${Math.random().toString(36).slice(2, 9)}`,
    userId: resume.userId,
    fileName: resume.fileName,
    filePath: resume.filePath,
    createdAt: new Date(),
  };

  const { data, error } = await supabase
    .from('resumes')
    .insert(newResume)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create resume record: ${error.message}`);
  }

  return data;
}

/**
 * Get resumes by user ID
 */
export async function getResumesByUserId(env: Env, userId: string): Promise<Resume[]> {
  const supabase = getSupabaseClient(env);

  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('userId', userId)
    .order('createdAt', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch resumes: ${error.message}`);
  }

  return data.map(resume => ({
    ...resume,
    createdAt: new Date(resume.createdAt),
  }));
}

/**
 * Get a resume by ID
 */
export async function getResumeById(env: Env, id: string): Promise<Resume | null> {
  const supabase = getSupabaseClient(env);

  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows returned
      return null;
    }
    throw new Error(`Failed to fetch resume: ${error.message}`);
  }

  return {
    ...data,
    createdAt: new Date(data.createdAt),
  };
}

/**
 * Delete a resume record
 */
export async function deleteResume(env: Env, id: string): Promise<void> {
  const supabase = getSupabaseClient(env);

  const { error } = await supabase
    .from('resumes')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete resume: ${error.message}`);
  }
}