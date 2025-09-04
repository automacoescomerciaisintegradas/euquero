import { useState, useEffect } from 'react';
import type { CommentAutomationRule, DMAutomationRule } from '../../shared/types';

interface UseAutomationRulesProps {
  userId: string;
}

const useAutomationRules = ({ userId }: UseAutomationRulesProps) => {
  const [commentRules, setCommentRules] = useState<CommentAutomationRule[]>([]);
  const [dmRules, setDmRules] = useState<DMAutomationRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar regras de automação
  useEffect(() => {
    const loadRules = async () => {
      try {
        setLoading(true);
        
        // Simular chamada à API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data
        const mockCommentRules: CommentAutomationRule[] = [
          {
            id: '1',
            userId,
            keywords: ['preço', 'valor'],
            response: 'Olá! O preço é R$ 99,90. Posso te ajudar com mais alguma coisa?',
            responseType: 'comment',
            active: true,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ];
        
        const mockDmRules: DMAutomationRule[] = [
          {
            id: '1',
            userId,
            triggerType: 'welcome',
            message: 'Bem-vindo! Obrigado por seguir nosso perfil. Conheça nossos produtos!',
            delay: 5,
            active: true,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ];
        
        setCommentRules(mockCommentRules);
        setDmRules(mockDmRules);
        setError(null);
      } catch (err) {
        setError('Falha ao carregar regras de automação');
        console.error('Error loading automation rules:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadRules();
  }, [userId]);

  // Criar regra de automação de comentários
  const createCommentRule = async (rule: Omit<CommentAutomationRule, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    try {
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const newRule: CommentAutomationRule = {
        ...rule,
        id: `comment_${Date.now()}`,
        userId,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setCommentRules(prev => [...prev, newRule]);
      return { success: true, rule: newRule };
    } catch (err) {
      return { success: false, error: 'Falha ao criar regra de comentário' };
    }
  };

  // Criar regra de automação de DMs
  const createDmRule = async (rule: Omit<DMAutomationRule, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    try {
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const newRule: DMAutomationRule = {
        ...rule,
        id: `dm_${Date.now()}`,
        userId,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setDmRules(prev => [...prev, newRule]);
      return { success: true, rule: newRule };
    } catch (err) {
      return { success: false, error: 'Falha ao criar regra de DM' };
    }
  };

  // Atualizar regra de automação
  const updateRule = async (id: string, updates: Partial<CommentAutomationRule | DMAutomationRule>) => {
    try {
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Atualizar regra de comentário
      setCommentRules(prev => 
        prev.map(rule => 
          rule.id === id 
            ? { ...rule, ...updates, updatedAt: new Date() } 
            : rule
        )
      );
      
      // Atualizar regra de DM
      setDmRules(prev => 
        prev.map(rule => 
          rule.id === id 
            ? { ...rule, ...updates, updatedAt: new Date() } 
            : rule
        )
      );
      
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Falha ao atualizar regra' };
    }
  };

  // Excluir regra de automação
  const deleteRule = async (id: string) => {
    try {
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setCommentRules(prev => prev.filter(rule => rule.id !== id));
      setDmRules(prev => prev.filter(rule => rule.id !== id));
      
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Falha ao excluir regra' };
    }
  };

  return {
    commentRules,
    dmRules,
    loading,
    error,
    createCommentRule,
    createDmRule,
    updateRule,
    deleteRule
  };
};

export default useAutomationRules;