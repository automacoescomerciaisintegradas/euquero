# Design - Sistema PAGIA (Plano de Ação de Gestão e Implementação com IA)

## Visão Geral

O Sistema PAGIA será implementado como uma funcionalidade integrada ao EuQuero, seguindo a arquitetura existente com frontend React e backend Hono. O sistema permitirá criar, gerenciar e acompanhar planos estruturados para projetos com IA, oferecendo templates pré-configurados, acompanhamento de progresso e funcionalidades de colaboração.

## Arquitetura

### Arquitetura Geral
```
Frontend (React)     Backend (Hono)        Armazenamento
┌─────────────────┐  ┌─────────────────┐   ┌─────────────────┐
│ PAGIA Dashboard │  │ API Endpoints   │   │ Cloudflare KV   │
│ Plan Manager    │◄─┤ /api/pagia/*    │◄──┤ Plans Storage   │
│ Task Tracker    │  │ Validation      │   │ Progress Data   │
│ Timeline View   │  │ Business Logic  │   │ Templates       │
└─────────────────┘  └─────────────────┘   └─────────────────┘
```

### Integração com EuQuero
- **Autenticação**: Utilizar sistema de auth existente
- **UI/UX**: Seguir padrões de interface estabelecidos (português brasileiro)
- **Navegação**: Adicionar seção PAGIA ao menu principal
- **Permissões**: Integrar com sistema de usuários e créditos

## Componentes e Interfaces

### Frontend Components

#### 1. Dashboard PAGIA (`/src/react-app/components/pagia/`)
```typescript
// PagiaDashboard.tsx - Visão geral de todos os planos
interface PagiaDashboardProps {
  plans: PagiaPlans[];
  onCreatePlan: () => void;
  onSelectPlan: (planId: string) => void;
}

// PlanCard.tsx - Card individual de cada plano
interface PlanCardProps {
  plan: PagiaPlan;
  progress: number;
  status: 'em-andamento' | 'concluido' | 'atrasado';
  nextStep: string;
}
```

#### 2. Gerenciador de Planos (`PlanManager.tsx`)
```typescript
// Componente principal para criar/editar planos
interface PlanManagerProps {
  planId?: string;
  mode: 'create' | 'edit' | 'view';
  onSave: (plan: PagiaPlan) => void;
}
```

#### 3. Visualizador de Etapas (`StageViewer.tsx`)
```typescript
// Exibe etapas e tarefas com checkboxes interativos
interface StageViewerProps {
  plan: PagiaPlan;
  currentStage: number;
  onTaskToggle: (stageId: string, taskId: string) => void;
  onStageComplete: (stageId: string) => void;
}
```

#### 4. Timeline de Cronograma (`TimelineView.tsx`)
```typescript
// Visualização temporal do projeto
interface TimelineViewProps {
  plan: PagiaPlan;
  showDelays: boolean;
  onDateUpdate: (stageId: string, newDate: Date) => void;
}
```

### Backend API Endpoints

#### Rotas PAGIA (`/api/pagia/*`)
```typescript
// GET /api/pagia/plans - Listar todos os planos do usuário
// POST /api/pagia/plans - Criar novo plano
// GET /api/pagia/plans/:id - Obter plano específico
// PUT /api/pagia/plans/:id - Atualizar plano
// DELETE /api/pagia/plans/:id - Arquivar plano
// POST /api/pagia/plans/:id/tasks/:taskId/toggle - Marcar/desmarcar tarefa
// GET /api/pagia/templates - Obter templates disponíveis
// POST /api/pagia/plans/:id/export - Exportar plano (PDF/Markdown)
```

## Modelos de Dados

### Tipos TypeScript (`src/shared/types.ts`)

```typescript
// Plano PAGIA principal
export interface PagiaPlan {
  id: string;
  userId: string;
  name: string;
  description: string;
  type: 'greenfield' | 'evolution' | 'integration';
  status: 'em-andamento' | 'concluido' | 'atrasado' | 'arquivado';
  createdAt: Date;
  updatedAt: Date;
  startDate: Date;
  estimatedEndDate: Date;
  actualEndDate?: Date;
  stages: PagiaStage[];
  customizations: PlanCustomization[];
}

// Etapa do plano
export interface PagiaStage {
  id: string;
  planId: string;
  order: number;
  name: string;
  description: string;
  estimatedDuration: number; // em dias
  startDate: Date;
  endDate: Date;
  status: 'nao-iniciado' | 'em-andamento' | 'concluido' | 'atrasado';
  progress: number; // 0-100
  tasks: PagiaTask[];
}

// Tarefa individual
export interface PagiaTask {
  id: string;
  stageId: string;
  order: number;
  title: string;
  description?: string;
  completed: boolean;
  completedAt?: Date;
  requirements: string[]; // Referências aos requisitos
  isCustom: boolean; // Se foi adicionada pelo usuário
}

// Template de plano
export interface PagiaTemplate {
  id: string;
  name: string;
  type: 'greenfield' | 'evolution' | 'integration';
  description: string;
  stages: Omit<PagiaStage, 'id' | 'planId' | 'startDate' | 'endDate' | 'status' | 'progress'>[];
}

// Personalização do plano
export interface PlanCustomization {
  id: string;
  planId: string;
  type: 'task-added' | 'task-removed' | 'task-modified' | 'stage-modified';
  originalValue?: any;
  newValue: any;
  createdAt: Date;
}

// Progresso consolidado
export interface PlanProgress {
  planId: string;
  overallProgress: number;
  stagesCompleted: number;
  totalStages: number;
  tasksCompleted: number;
  totalTasks: number;
  daysElapsed: number;
  estimatedDaysRemaining: number;
  isOnSchedule: boolean;
}
```

### Schemas de Validação (Zod)

```typescript
// Schema para criação de plano
export const CreatePlanSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  type: z.enum(['greenfield', 'evolution', 'integration']),
  startDate: z.string().datetime(),
  estimatedDuration: z.number().min(1, "Duração deve ser pelo menos 1 dia"),
});

// Schema para atualização de tarefa
export const TaskToggleSchema = z.object({
  taskId: z.string(),
  completed: z.boolean(),
});

// Schema para personalização de etapa
export const StageCustomizationSchema = z.object({
  stageId: z.string(),
  tasks: z.array(z.object({
    title: z.string(),
    description: z.string().optional(),
    requirements: z.array(z.string()),
  })),
});
```

## Templates Pré-configurados

### Template Greenfield (Projeto Novo)
```typescript
const greenfieldTemplate: PagiaTemplate = {
  id: 'greenfield-default',
  name: 'Projeto Greenfield com IA',
  type: 'greenfield',
  description: 'Template para projetos completamente novos com integração de IA',
  stages: [
    {
      name: 'Diagnóstico Inicial',
      description: 'Definição de escopo e levantamento de requisitos',
      estimatedDuration: 7,
      tasks: [
        { title: 'Definir propósito e escopo do projeto', requirements: ['1.1'] },
        { title: 'Mapear recursos e restrições disponíveis', requirements: ['1.2'] },
        { title: 'Listar ferramentas de IA compatíveis', requirements: ['1.3'] },
      ]
    },
    // ... outras etapas
  ]
};
```

### Template Evolution (Evolução de Sistema)
```typescript
const evolutionTemplate: PagiaTemplate = {
  id: 'evolution-default',
  name: 'Evolução de Sistema Existente',
  type: 'evolution',
  description: 'Template para adicionar IA a sistemas existentes',
  stages: [
    {
      name: 'Análise do Sistema Atual',
      description: 'Mapeamento da arquitetura e pontos de integração',
      estimatedDuration: 5,
      tasks: [
        { title: 'Mapear arquitetura atual do sistema', requirements: ['1.1'] },
        { title: 'Identificar pontos de integração com IA', requirements: ['1.2'] },
        { title: 'Avaliar compatibilidade tecnológica', requirements: ['1.3'] },
      ]
    },
    // ... outras etapas
  ]
};
```

## Tratamento de Erros

### Estratégias de Error Handling

1. **Validação de Entrada**
   - Usar Zod schemas para validar todos os inputs
   - Retornar mensagens de erro em português brasileiro
   - Validar permissões de usuário antes de operações

2. **Persistência de Dados**
   - Implementar retry automático para falhas de rede
   - Backup local temporário durante operações críticas
   - Rollback automático em caso de falha parcial

3. **Interface do Usuário**
   - Loading states durante operações assíncronas
   - Mensagens de erro contextuais e acionáveis
   - Fallbacks para quando dados não estão disponíveis

```typescript
// Exemplo de tratamento de erro na API
app.post('/api/pagia/plans', async (c) => {
  try {
    const data = c.req.valid('json');
    const plan = await createPlan(data);
    return c.json({ success: true, plan });
  } catch (error) {
    if (error instanceof ValidationError) {
      return c.json({ 
        success: false, 
        message: 'Dados inválidos', 
        errors: error.details 
      }, 400);
    }
    
    console.error('Erro ao criar plano:', error);
    return c.json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    }, 500);
  }
});
```

## Estratégia de Testes

### Testes Unitários
- **Frontend**: Testar componentes React com React Testing Library
- **Backend**: Testar handlers da API e validações Zod
- **Utilitários**: Testar funções de cálculo de progresso e datas

### Testes de Integração
- **API**: Testar fluxos completos de criação e gerenciamento de planos
- **Persistência**: Testar operações CRUD com Cloudflare KV
- **Autenticação**: Testar integração com sistema de auth existente

### Testes End-to-End
- **Fluxo Completo**: Criar plano → Gerenciar tarefas → Exportar relatório
- **Responsividade**: Testar em diferentes tamanhos de tela
- **Performance**: Testar com múltiplos planos e grandes volumes de dados

```typescript
// Exemplo de teste unitário
describe('PlanProgress Calculator', () => {
  it('should calculate correct overall progress', () => {
    const plan = createMockPlan();
    const progress = calculatePlanProgress(plan);
    
    expect(progress.overallProgress).toBe(60);
    expect(progress.isOnSchedule).toBe(true);
  });
});
```

## Considerações de Performance

### Otimizações Frontend
- **Lazy Loading**: Carregar componentes PAGIA apenas quando necessário
- **Memoização**: Usar React.memo para componentes de lista
- **Virtualização**: Para listas grandes de planos/tarefas
- **Debounce**: Para atualizações automáticas de progresso

### Otimizações Backend
- **Caching**: Cache de templates e dados frequentemente acessados
- **Paginação**: Para listagem de planos e histórico
- **Compressão**: Comprimir dados antes de armazenar no KV
- **Batch Operations**: Agrupar múltiplas atualizações de tarefas

### Armazenamento Eficiente
```typescript
// Estrutura otimizada para Cloudflare KV
const kvKeys = {
  userPlans: (userId: string) => `user:${userId}:plans`,
  planData: (planId: string) => `plan:${planId}:data`,
  planProgress: (planId: string) => `plan:${planId}:progress`,
  templates: () => 'templates:all',
};
```