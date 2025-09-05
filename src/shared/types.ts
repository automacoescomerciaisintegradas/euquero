// Tipos compartilhados para o EuQuero

export type SubscriptionStatus = 'inactive' | 'pending_verification' | 'active';

export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  provider: string;
  providerId?: string;
  emailVerified: boolean;
  subscription_status?: SubscriptionStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos para Landing Page
export interface Feature {
  icon: string;
  title: string;
  description: string;
  details?: string[];
  highlight?: string;
  videoUrl?: string;
}

export interface PricingPlan {
  name: string;
  price: number;
  period: string;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
  badge?: string;
}

export interface ContactInfo {
  type: "email" | "telegram" | "whatsapp";
  label: string;
  value: string;
  link: string;
}

export interface LandingPageConfig {
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
  };
  features: Feature[];
  pricing: PricingPlan[];
  contact: ContactInfo[];
}

// Tipos para Automação
export interface AutomationFeature {
  id: string;
  name: string;
  description: string;
  price: number;
  enabled: boolean;
  usageCount: number;
  lastUsed?: Date;
}

export interface AutomationPlan {
  id: string;
  name: string;
  type: 'free' | 'pay_per_use' | 'monthly';
  price: number;
  credits?: number;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

export interface PostAutomationConfig {
  keywords: string[];
  response: string;
  responseType: 'comment' | 'dm' | 'both';
  isActive: boolean;
}

export interface AutoAttendanceConfig {
  welcomeMessage: string;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  isActive: boolean;
}

export interface LiveAutomationConfig {
  keywords: string[];
  response: string;
  links: string[];
  isActive: boolean;
}

export interface CommentAutomationRule {
  id: string;
  userId: string;
  keywords: string[];
  response: string;
  responseType: 'comment' | 'dm' | 'both';
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DMAutomationRule {
  id: string;
  userId: string;
  triggerType: 'welcome' | 'keyword' | 'story_reply';
  keywords?: string[];
  message: string;
  delay?: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AutomationMetrics {
  totalAutomations: number;
  activeAutomations: number;
  totalResponses: number;
  savedTime: string;
  lastWeek: {
    comments: number;
    dms: number;
    stories: number;
    lives: number;
  };
}

// Tipos para WhatsApp
export interface WhatsAppConfig {
  phoneNumber: string;
  defaultMessage: string;
  teamName: string;
  welcomeMessage: string;
}

// Schema de validação para formulário de contato
import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z
    .string()
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Telefone inválido")
    .optional(),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

// Schemas de validação para autenticação
export const LoginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
});

export const RegisterSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
  phone: z.string().regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Telefone inválido"),
});

export type LoginData = z.infer<typeof LoginSchema>;
export type RegisterData = z.infer<typeof RegisterSchema>;

// Tipos para resposta de autenticação
export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

// Sistema de Créditos
export interface CreditBalance {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreditTransaction {
  id: string;
  userId: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  service: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}

export interface PaymentMethod {
  type: 'pix';
  minimumAmount: number;
  processingTime: string;
  fees: number;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  type: 'free' | 'pay_per_use';
  price: number;
  credits: number;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

// Schema para recarga de créditos (apenas PIX)
export const CreditRechargeSchema = z.object({
  userId: z.string(),
  amount: z.number().min(50, "Valor mínimo de recarga é R$ 50"),
  paymentMethod: z.literal('pix'),
});

export type CreditRechargeData = z.infer<typeof CreditRechargeSchema>;

// Tipos para Webhook PIX
export interface PixWebhookPayload {
  data?: {
    id: string;
  };
  metadata?: {
    user_id: string;
  };
  transaction_amount: number;
  status: string;
  payment_id?: string;
}

export interface WebhookQueueItem {
  id: string;
  user_id: string;
  payment_id: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  retries: number;
  last_attempt: Date;
  created_at: Date;
}

export interface N8nNotificationPayload {
  event: 'PIX_PAYMENT_CONFIRMED';
  user_id: string;
  payment_id: string;
  amount: number;
  timestamp: string;
}

// Schema para validação do webhook PIX
export const PixWebhookSchema = z.object({
  data: z.object({
    id: z.string(),
  }).optional(),
  metadata: z.object({
    user_id: z.string(),
  }).optional(),
  transaction_amount: z.number(),
  status: z.string(),
  payment_id: z.string().optional(),
});

export type PixWebhookData = z.infer<typeof PixWebhookSchema>;

// Tipos para Automação de Redes Sociais
export interface SocialMediaAccount {
  id: string;
  userId: string;
  platform: 'instagram' | 'facebook';
  accountId: string;
  username: string;
  accessToken: string;
  isActive: boolean;
  connectedAt: Date;
  lastSync: Date;
}

export interface CommentAutomation {
  id: string;
  userId: string;
  accountId: string;
  isActive: boolean;
  keywords: string[];
  response: string;
  responseType: 'comment' | 'dm' | 'both';
  createdAt: Date;
  updatedAt: Date;
}

export interface DMAutomation {
  id: string;
  userId: string;
  accountId: string;
  isActive: boolean;
  triggerType: 'welcome' | 'keyword' | 'story_reply';
  keywords?: string[];
  message: string;
  delay?: number; // em minutos
  createdAt: Date;
  updatedAt: Date;
}

export interface ScheduledPost {
  id: string;
  userId: string;
  accountId: string;
  mediaUrl: string;
  mediaType: 'image' | 'video' | 'carousel';
  caption: string;
  scheduledFor: Date;
  status: 'pending' | 'published' | 'failed';
  createdAt: Date;
  publishedAt?: Date;
}

export interface EngagementMetrics {
  id: string;
  userId: string;
  accountId: string;
  date: Date;
  followers: number;
  following: number;
  posts: number;
  likes: number;
  comments: number;
  shares: number;
  reach: number;
  impressions: number;
}

// Schemas de validação
export const CommentAutomationSchema = z.object({
  keywords: z.array(z.string()).min(1, "Pelo menos uma palavra-chave é obrigatória"),
  response: z.string().min(1, "Resposta é obrigatória"),
  responseType: z.enum(['comment', 'dm', 'both']),
});

export const DMAutomationSchema = z.object({
  triggerType: z.enum(['welcome', 'keyword', 'story_reply']),
  keywords: z.array(z.string()).optional(),
  message: z.string().min(1, "Mensagem é obrigatória"),
  delay: z.number().min(0).max(1440).optional(), // máximo 24 horas
});

export const ScheduledPostSchema = z.object({
  caption: z.string().max(2200, "Legenda muito longa"),
  scheduledFor: z.string().datetime("Data inválida"),
});

export type CommentAutomationData = z.infer<typeof CommentAutomationSchema>;
export type DMAutomationData = z.infer<typeof DMAutomationSchema>;
export type ScheduledPostData = z.infer<typeof ScheduledPostSchema>;
