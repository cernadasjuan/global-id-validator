import {
  createValidResult,
  createInvalidResult,
  isNumeric,
  validateLuhnChecksum
} from '../validators/utils'

describe('Validator Utilities', () => {
  describe('createValidResult', () => {
    it('should create a valid result object', () => {
      const result = createValidResult({ formattedValue: '123456789' })
      expect(result.isValid).toBe(true)
      expect(result.metadata.formattedValue).toBe('123456789')
    })
  })

  describe('createInvalidResult', () => {
    it('should create an invalid result object with error message', () => {
      const errorMessage = 'Test error message'
      const result = createInvalidResult(errorMessage)
      expect(result.isValid).toBe(false)
      expect(result.errorMessage).toBe(errorMessage)
    })
  })

  describe('isNumeric', () => {
    it('should return true for numeric strings', () => {
      expect(isNumeric('123')).toBe(true)
      expect(isNumeric('0')).toBe(true)
      expect(isNumeric('9876543210')).toBe(true)
    })

    it('should return false for non-numeric strings', () => {
      expect(isNumeric('abc')).toBe(false)
      expect(isNumeric('123a')).toBe(false)
      expect(isNumeric('12.3')).toBe(false)
      expect(isNumeric('-123')).toBe(false)
      expect(isNumeric('')).toBe(false)
    })
  })

  describe('validateLuhnChecksum', () => {
    it('should validate correct Luhn checksums', () => {
      expect(validateLuhnChecksum('79927398713')).toBe(true)
      expect(validateLuhnChecksum('4111111111111111')).toBe(true)
      expect(validateLuhnChecksum('046454286')).toBe(true) // Valid Canadian SIN
    })

    it('should invalidate incorrect Luhn checksums', () => {
      expect(validateLuhnChecksum('79927398714')).toBe(false)
      expect(validateLuhnChecksum('4111111111111112')).toBe(false)
      expect(validateLuhnChecksum('046454287')).toBe(false) // Invalid Canadian SIN
    })

    it('should return false for non-numeric input', () => {
      expect(validateLuhnChecksum('abc')).toBe(false)
      expect(validateLuhnChecksum('123a')).toBe(false)
    })
  })
}) 