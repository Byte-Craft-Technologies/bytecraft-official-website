/**
 * Types pour le formulaire de contact
 */

export type ProjectType = 'web' | 'mobile' | 'webapp' | 'api' | 'consulting' | 'other';
export type BudgetRange = 'small' | 'medium' | 'large' | 'enterprise';
export type Currency = 'FCFA' | 'EUR' | 'USD';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: ProjectType | '';
  budget: BudgetRange | '';
  currency: Currency;
  message: string;
}

export interface ContactFormState {
  formData: ContactFormData;
  isSubmitting: boolean;
  submitted: boolean;
  error: string | null;
}

export interface BudgetOption {
  value: BudgetRange;
  label: string;
}

export interface CurrencyOption {
  code: Currency;
  symbol: string;
  name: string;
}