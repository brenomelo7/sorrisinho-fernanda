// Client-side utilities
export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(cents / 100);
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function cn(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export function generateSessionExpiry(): Date {
  const now = new Date();
  now.setHours(now.getHours() + 2); // 2 hours from now
  return now;
}