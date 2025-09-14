import { Env } from "./env";
import { getSupabaseClient } from "./supabase";

export interface Lead {
  id: number;
  email: string;
  phone?: string;
  name?: string;
  type: 'frio' | 'quente';
  source: string;
  data: any;
  created_at: string;
}

// Função para buscar leads do Supabase
export async function fetchLeads(env: Env, filter?: 'all' | 'frio' | 'quente', searchTerm?: string): Promise<Lead[]> {
  try {
    const supabase = getSupabaseClient(env);
    
    let query = supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    
    // Aplicar filtro por tipo
    if (filter && filter !== 'all') {
      query = query.eq('type', filter);
    }
    
    // Aplicar filtro de busca
    if (searchTerm) {
      query = query.or(`email.ilike.%${searchTerm}%,name.ilike.%${searchTerm}%`);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Erro ao buscar leads:', error);
      return [];
    }
    
    return data as Lead[];
  } catch (error) {
    console.error('Erro ao conectar com Supabase:', error);
    return [];
  }
}

// Função para buscar estatísticas de leads
export async function fetchLeadsStats(env: Env): Promise<{ total: number; quentes: number; frios: number }> {
  try {
    const supabase = getSupabaseClient(env);
    
    // Buscar contagem total
    const { count: total, error: totalError } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true });
    
    if (totalError) {
      console.error('Erro ao buscar total de leads:', totalError);
      return { total: 0, quentes: 0, frios: 0 };
    }
    
    // Buscar contagem de leads quentes
    const { count: quentes, error: quentesError } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .eq('type', 'quente');
    
    if (quentesError) {
      console.error('Erro ao buscar leads quentes:', quentesError);
      return { total: total || 0, quentes: 0, frios: 0 };
    }
    
    // Buscar contagem de leads frios
    const { count: frios, error: friosError } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .eq('type', 'frio');
    
    if (friosError) {
      console.error('Erro ao buscar leads frios:', friosError);
      return { total: total || 0, quentes: quentes || 0, frios: 0 };
    }
    
    return {
      total: total || 0,
      quentes: quentes || 0,
      frios: frios || 0
    };
  } catch (error) {
    console.error('Erro ao buscar estatísticas de leads:', error);
    return { total: 0, quentes: 0, frios: 0 };
  }
}