/**
 * Validation d'email
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }
  return EMAIL_REGEX.test(email.trim());
}

export function validateEmailDomain(email: string, blockedDomains: string[] = []): boolean {
  if (!validateEmail(email)) {
    return false;
  }

  const domain = email.split('@')[1]?.toLowerCase();
  return !blockedDomains.includes(domain);
}