import { validateDNI } from '../dni'

describe('Argentina DNI Validator', () => {
  test('should validate a valid 8-digit DNI', () => {
    const result = validateDNI('12345678')
    expect(result.isValid).toBe(true)
    if (result.isValid) {
      expect(result.metadata.formattedValue).toBe('12.345.678')
    }
  })

  test('should validate a valid 7-digit DNI', () => {
    const result = validateDNI('1234567')
    expect(result.isValid).toBe(true)
    if (result.isValid) {
      expect(result.metadata.formattedValue).toBe('1.234.567')
    }
  })

  test('should validate a valid DNI with dots', () => {
    const result = validateDNI('12.345.678')
    expect(result.isValid).toBe(true)
    if (result.isValid) {
      expect(result.metadata.formattedValue).toBe('12.345.678')
    }
  })

  test('should validate a valid DNI with spaces', () => {
    const result = validateDNI('123 456 78')
    expect(result.isValid).toBe(true)
    if (result.isValid) {
      expect(result.metadata.formattedValue).toBe('12.345.678')
    }
  })

  test('should reject a DNI with letters', () => {
    const result = validateDNI('123456A8')
    expect(result.isValid).toBe(false)
    if (!result.isValid) {
      expect(result.errorMessage).toBe('DNI must contain only digits')
    }
  })

  test('should reject a DNI that is too short', () => {
    const result = validateDNI('123456')
    expect(result.isValid).toBe(false)
    if (!result.isValid) {
      expect(result.errorMessage).toBe('DNI must be 7 or 8 digits')
    }
  })

  test('should reject a DNI that is too long', () => {
    const result = validateDNI('123456789')
    expect(result.isValid).toBe(false)
    if (!result.isValid) {
      expect(result.errorMessage).toBe('DNI must be 7 or 8 digits')
    }
  })

  test('should reject a DNI with all zeros', () => {
    const result = validateDNI('00000000')
    expect(result.isValid).toBe(false)
    if (!result.isValid) {
      expect(result.errorMessage).toBe('Invalid DNI format')
    }
  })

  test('should reject a DNI with all the same digit', () => {
    const result = validateDNI('11111111')
    expect(result.isValid).toBe(false)
    if (!result.isValid) {
      expect(result.errorMessage).toBe('Invalid DNI format')
    }
  })
}) 