import { validateEmail, validateEmailDomain } from '@/lib/validation/emailValidator';

describe('validateEmail', () => {
  describe('valid emails', () => {
    it('should return true for standard email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
    });

    it('should return true for email with subdomain', () => {
      expect(validateEmail('user@mail.example.com')).toBe(true);
    });

    it('should return true for email with plus sign', () => {
      expect(validateEmail('user+tag@example.com')).toBe(true);
    });

    it('should return true for email with dots in local part', () => {
      expect(validateEmail('first.last@example.com')).toBe(true);
    });

    it('should return true for email with numbers', () => {
      expect(validateEmail('user123@example456.com')).toBe(true);
    });

    it('should return true for country code TLD', () => {
      expect(validateEmail('user@example.co.uk')).toBe(true);
    });
  });

  describe('invalid emails', () => {
    it('should return false for empty string', () => {
      expect(validateEmail('')).toBe(false);
    });

    it('should return false for null', () => {
      expect(validateEmail(null as unknown as string)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(validateEmail(undefined as unknown as string)).toBe(false);
    });

    it('should return false for string without @', () => {
      expect(validateEmail('invalid')).toBe(false);
    });

    it('should return false for string with only @', () => {
      expect(validateEmail('@')).toBe(false);
    });

    it('should return false for missing local part', () => {
      expect(validateEmail('@example.com')).toBe(false);
    });

    it('should return false for missing domain', () => {
      expect(validateEmail('test@')).toBe(false);
    });

    it('should return false for spaces in email', () => {
      expect(validateEmail('test @example.com')).toBe(false);
    });

    it('should return false for multiple @ signs', () => {
      expect(validateEmail('test@@example.com')).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle email with leading/trailing spaces by trimming', () => {
      expect(validateEmail('  test@example.com  ')).toBe(true);
    });
  });
});

describe('validateEmailDomain', () => {
  it('should return true for email not in blocked list', () => {
    expect(validateEmailDomain('user@gmail.com', ['tempmail.com'])).toBe(true);
  });

  it('should return false for email in blocked list', () => {
    expect(validateEmailDomain('user@tempmail.com', ['tempmail.com'])).toBe(false);
  });

  it('should return false for invalid email regardless of domain', () => {
    expect(validateEmailDomain('invalid', ['tempmail.com'])).toBe(false);
  });

  it('should work with empty blocked list', () => {
    expect(validateEmailDomain('user@example.com', [])).toBe(true);
  });

  it('should work without blocked list parameter', () => {
    expect(validateEmailDomain('user@example.com')).toBe(true);
  });
});