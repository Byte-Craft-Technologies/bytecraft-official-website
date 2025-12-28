/**
 * Configuration des devises supportées
 */

import type { CurrencyOption } from '@/types';

export const CURRENCIES: CurrencyOption[] = [
  { code: 'FCFA', symbol: 'FCFA', name: 'Franc CFA' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'USD', symbol: '$', name: 'Dollar US' },
] as const;

export const DEFAULT_CURRENCY = 'FCFA' as const;