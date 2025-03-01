import { validateCUIL } from '../cuil'

describe('Argentina CUIL Validator', () => {
  test('should validate a valid CUIL for a male individual (20)', () => {
    const result = validateCUIL('20123456789')
    expect(result.isValid).toBe(true)
    if (result.isValid) {
      expect(result.metadata.formattedValue).toBe('20-12345678-9')
    }
  })

  test('should validate a valid CUIL for a female individual (27)', () => {
    const result = validateCUIL('27123456782')
    expect(result.isValid).toBe(true)
    if (result.isValid) {
      expect(result.metadata.formattedValue).toBe('27-12345678-2')
    }
  })

  test('should validate a valid CUIL for a temporary worker (23)', () => {
    const result = validateCUIL('23123456784')
    expect(result.isValid).toBe(true)
    if (result.isValid) {
      expect(result.metadata.formattedValue).toBe('23-12345678-4')
    }
  })

  test('should validate a valid CUIL with hyphens', () => {
    const result = validateCUIL('20-12345678-9')
    expect(result.isValid).toBe(true)
    if (result.isValid) {
      expect(result.metadata.formattedValue).toBe('20-12345678-9')
    }
  })

  test('should validate a valid CUIL with spaces', () => {
    const result = validateCUIL('20 12345678 9')
    expect(result.isValid).toBe(true)
    if (result.isValid) {
      expect(result.metadata.formattedValue).toBe('20-12345678-9')
    }
  })

  test('should reject a CUIL with letters', () => {
    const result = validateCUIL('2012345678A')
    expect(result.isValid).toBe(false)
    if (!result.isValid) {
      expect(result.errorMessage).toBe('CUIL must be 11 digits')
    }
  })

  test('should reject a CUIL that is too short', () => {
    const result = validateCUIL('2012345678')
    expect(result.isValid).toBe(false)
    if (!result.isValid) {
      expect(result.errorMessage).toBe('CUIL must be 11 digits')
    }
  })

  test('should reject a CUIL that is too long', () => {
    const result = validateCUIL('201234567890')
    expect(result.isValid).toBe(false)
    if (!result.isValid) {
      expect(result.errorMessage).toBe('CUIL must be 11 digits')
    }
  })

  test('should reject a CUIL with all zeros', () => {
    const result = validateCUIL('00000000000')
    expect(result.isValid).toBe(false)
    if (!result.isValid) {
      expect(result.errorMessage).toBe('Invalid CUIL format')
    }
  })

  test('should reject a CUIL with all the same digit', () => {
    const result = validateCUIL('11111111111')
    expect(result.isValid).toBe(false)
    if (!result.isValid) {
      expect(result.errorMessage).toBe('Invalid CUIL format')
    }
  })

  test('should reject a CUIL with invalid check digit', () => {
    const result = validateCUIL('20123456781') // Correct check digit should be 9
    expect(result.isValid).toBe(false)
    if (!result.isValid) {
      expect(result.errorMessage).toBe('Invalid CUIL check digit')
    }
  })

  test('should reject a CUIL with invalid prefix', () => {
    const result = validateCUIL('12123456786') // 12 is not a valid prefix
    expect(result.isValid).toBe(false)
    if (!result.isValid) {
      expect(result.errorMessage).toBe('Invalid CUIL type prefix')
    }
  })
}) 