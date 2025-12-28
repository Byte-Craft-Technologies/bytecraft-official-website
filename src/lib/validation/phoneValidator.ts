/**
 * Validation de numéro de téléphone
 */

const PHONE_REGEX = /^\+?[0-9]{1,4}[\s.-]?[0-9]{2,4}[\s.-]?[0-9]{2,4}[\s.-]?[0-9]{2,4}[\s.-]?[0-9]{0,4}$/;

export function validatePhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') {
    return true; // Phone is optional
  }

  const cleaned = phone.trim();
  if (cleaned.length === 0) {
    return true;
  }

  return PHONE_REGEX.test(cleaned);
}

export function formatPhone(phone: string): string {
  if (!phone) return '';
  return phone.trim().replace(/\s+/g, ' ');
}