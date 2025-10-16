export interface User {
  id: string;
  email: string;
  name: string;
  is_admin: boolean;
  created_at: string;
}

export interface Video {
  id: string;
  title: string;
  storage_path: string;
  duration_estimate: number;
  active_for_plans: string[];
  uploaded_by: string;
  created_at: string;
  thumbnail_url?: string;
}

export interface Plan {
  id: string;
  name: string;
  minutes_label: string;
  price_cents: number;
  description: string;
}

export interface Transaction {
  id: string;
  user_id?: string;
  plan_id: string;
  amount: number;
  provider: 'stripe' | 'mercadopago';
  provider_id: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  created_at: string;
}

export interface Session {
  id: string;
  transaction_id: string;
  user_token: string;
  video_id: string;
  started_at: string;
  expires_at: string;
}

export interface AdminActionLog {
  id: string;
  action: string;
  admin_id: string;
  target: string;
  created_at: string;
}

export interface LiveStats {
  activeUsers: number;
  todayRevenue: number;
  todayTransactions: number;
  conversionRate: number;
}