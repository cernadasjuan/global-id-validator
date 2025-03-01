import { validatePassport } from '../validators/passport';
import { validateUSSSN, validateCanadianSIN } from '../validators/ssn';
import { validateLuhnChecksum, isNumeric } from '../validators/utils';

describe('Utility Functions', () => {
  describe('isNumeric', () => {
    it('should return true for numeric strings', () => {
      expect(isNumeric('123')).toBe(true);
      expect(isNumeric('0')).toBe(true);
      expect(isNumeric('9876543210')).toBe(true);
    });

    it('should return false for non-numeric strings', () => {
      expect(isNumeric('abc')).toBe(false);
      expect(isNumeric('123a')).toBe(false);
      expect(isNumeric('12.3')).toBe(false);
      expect(isNumeric('-123')).toBe(false);
      expect(isNumeric('')).toBe(false);
    });
  });

  describe('validateLuhnChecksum', () => {
    it('should validate correct Luhn checksums', () => {
      expect(validateLuhnChecksum('79927398713')).toBe(true);
      expect(validateLuhnChecksum('4111111111111111')).toBe(true);
    });

    it('should invalidate incorrect Luhn checksums', () => {
      expect(validateLuhnChecksum('79927398714')).toBe(false);
      expect(validateLuhnChecksum('4111111111111112')).toBe(false);
    });

    it('should return false for non-numeric input', () => {
      expect(validateLuhnChecksum('abc')).toBe(false);
      expect(validateLuhnChecksum('123a')).toBe(false);
    });
  });
});

describe('Passport Validator', () => {
  it('should validate generic passport numbers', () => {
    const result = validatePassport('AB1234567');
    expect(result.isValid).toBe(true);
  });

  it('should invalidate empty passport numbers', () => {
    const result = validatePassport('');
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toContain('cannot be empty');
  });

  it('should invalidate too short passport numbers', () => {
    const result = validatePassport('12345');
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toContain('between 6 and 12');
  });

  it('should validate US passport numbers', () => {
    const result = validatePassport('123456789', 'US');
    expect(result.isValid).toBe(true);
    expect(result.metadata?.country).toBe('United States');
  });

  it('should invalidate incorrect US passport numbers', () => {
    const result = validatePassport('12345', 'US');
    expect(result.isValid).toBe(false);
  });
});

describe('SSN Validator', () => {
  describe('US SSN', () => {
    it('should validate correct US SSNs', () => {
      const result = validateUSSSN('123-45-6789');
      expect(result.isValid).toBe(true);
      expect(result.metadata?.country).toBe('United States');
      expect(result.metadata?.formatted).toBe('123-45-6789');
    });

    it('should validate SSNs without hyphens', () => {
      const result = validateUSSSN('123456789');
      expect(result.isValid).toBe(true);
    });

    it('should invalidate SSNs with invalid format', () => {
      expect(validateUSSSN('000-45-6789').isValid).toBe(false);
      expect(validateUSSSN('666-45-6789').isValid).toBe(false);
      expect(validateUSSSN('123-00-6789').isValid).toBe(false);
    });

    it('should invalidate SSNs with incorrect length', () => {
      expect(validateUSSSN('12345678').isValid).toBe(false);
      expect(validateUSSSN('1234567890').isValid).toBe(false);
    });
  });

  describe('Canadian SIN', () => {
    it('should validate correct Canadian SINs', () => {
      // Example of a valid Canadian SIN (using Luhn algorithm)
      const result = validateCanadianSIN('046-454-286');
      expect(result.isValid).toBe(true);
      expect(result.metadata?.country).toBe('Canada');
    });

    it('should invalidate SINs with incorrect checksum', () => {
      expect(validateCanadianSIN('046-454-287').isValid).toBe(false);
    });

    it('should invalidate SINs with incorrect length', () => {
      expect(validateCanadianSIN('12345678').isValid).toBe(false);
      expect(validateCanadianSIN('1234567890').isValid).toBe(false);
    });
  });
}); 