/**
 * Configuration des tranches de budget par devise
 */

import type { BudgetOption, Currency } from '@/types';

export const BUDGET_RANGES: Record<Currency, BudgetOption[]> = {
  FCFA: [
    { value: 'small', label: '< 500 000 FCFA' },
    { value: 'medium', label: '500 000 - 2 000 000 FCFA' },
    { value: 'large', label: '2 000 000 - 5 000 000 FCFA' },
    { value: 'enterprise', label: '> 5 000 000 FCFA' },
  ],
  EUR: [
    { value: 'small', label: '< 800 €' },
    { value: 'medium', label: '800 - 3 000 €' },
    { value: 'large', label: '3 000 - 8 000 €' },
    { value: 'enterprise', label: '> 8 000 €' },
  ],
  USD: [
    { value: 'small', label: '< $850' },
    { value: 'medium', label: '$850 - $3,200' },
    { value: 'large', label: '$3,200 - $8,500' },
    { value: 'enterprise', label: '> $8,500' },
  ],
} as const;