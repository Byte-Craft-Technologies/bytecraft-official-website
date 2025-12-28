/**
 * Formatage des devises et montants
 */

import type { Currency } from '@/types';

const CURRENCY_FORMATTERS: Record<Currency, Intl.NumberFormat> = {
  FCFA: new Intl.NumberFormat('fr-FR', { style: 'decimal' }),
  EUR: new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }),
  USD: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }),
};

export function formatCurrency(amount: number, currency: Currency): string {
  if (currency === 'FCFA') {
    return `${CURRENCY_FORMATTERS.FCFA.format(amount)} FCFA`;
  }
  return CURRENCY_FORMATTERS[currency].format(amount);
}

export function getCurrencySymbol(currency: Currency): string {
  const symbols: Record<Currency, string> = {
    FCFA: 'FCFA',
    EUR: '€',
    USD: '$',
  };
  return symbols[currency];
}