import { Plan } from './types';

export const PLANS: Plan[] = [
  {
    id: '5min',
    name: '5 Minutos',
    minutes_label: '5 minutos',
    price_cents: 6000, // R$ 60,00
    description: 'Uma experiência íntima e exclusiva'
  },
  {
    id: '10min',
    name: '10 Minutos',
    minutes_label: '10 minutos',
    price_cents: 10000, // R$ 100,00
    description: 'Mais tempo pra conversas quentes'
  },
  {
    id: '15min',
    name: '15 Minutos',
    minutes_label: '15 minutos',
    price_cents: 15000, // R$ 150,00
    description: 'Experiência completa'
  }
];

export const WHATSAPP_SUPPORT_URL = 'https://wa.me/5511999999999?text=Comprei%20chamada%20-%20preciso%20de%20ajuda';

export const ADMIN_CREDENTIALS = {
  email: 'admin@sorrisinhocall.com',
  password: 'admin123'
};

export const JWT_SECRET = process.env.JWT_SECRET || 'sorrisinho-call-secret-key-default';

// Safe environment variable access with fallbacks
export const STRIPE_CONFIG = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
  secretKey: process.env.STRIPE_SECRET_KEY || '',
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || ''
};

// Check if required environment variables are present
export const ENV_CHECKS = {
  hasStripe: !!(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && process.env.STRIPE_SECRET_KEY),
  hasSupabase: !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  isProduction: process.env.NODE_ENV === 'production'
};