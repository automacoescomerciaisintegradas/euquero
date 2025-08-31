// Tipos compartilhados para o EuQuero

export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  provider: "email" | "google" | "github";
  providerId?: string;
  emailVerified: boolean;
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
  amount: z.number().min(50, "Valor mínimo de recarga é R$ 50"),
  paymentMethod: z.literal('pix'),
});

export type CreditRechargeData = z.infer<typeof CreditRechargeSchema>;
