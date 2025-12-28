/**
 * Use case pour valider un formulaire de contact
 */

import type { ContactFormData } from '@/types';
import { validateEmail } from '@/lib/validation/emailValidator';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateContactForm(data: Partial<ContactFormData>): ValidationResult {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.push('Valid email is required');
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}