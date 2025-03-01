import { validateCUIT } from '../cuit'

describe('Argentina CUIT Validator', () => {
  test('should validate a valid CUIT for a male individual (20)', () => {
    const result = validateCUIT('20123456789')
    expect(result.isValid).toBe(true)
    if (result.isValid) {
      expect(result.metadata.formattedValue).toBe('20-12345678-9')
    }
  })

  test('should validate a valid CUIT for a female individual (27)', () => {
    const result = validateCUIT('27123456782')
    expect(result.isValid).toBe(true)
    if (result.isValid) {
      expect(result.metadata.formattedValue).toBe('27-12345678-2')
    }
  })

  test('should validate a valid CUIT for a company (30)', () => {
    const result = validateCUIT('30123456785')
    expect(result.isValid).toBe(true)
    if (result.isValid) {
      expect(result.metadata.formattedValue).toBe('30-12345678-5')
    }
  })

  test('should validate a valid CUIT with hyphens', () => {
    const result = validateCUIT('20-12345678-9')
    expect(result.isValid).toBe(true)
    if (result.isValid) {
      expect(result.metadata.formattedValue).toBe('20-12345678-9')
    }
  })

  test('should validate a valid CUIT with spaces', () => {
    const result = validateCUIT('20 12345678 9')
    expect(result.isValid).toBe(true)
    if (result.isValid) {
      expect(result.metadata.formattedValue).toBe('20-12345678-9')
    }
  })

  test('should reject a CUIT with letters', () => {
    const result = validateCUIT('2012345678A')
    expect(result.isValid).toBe(false)
    if (!result.isValid) {
      expect(result.errorMessage).toBe('CUIT must be 11 digits')
    }
  })

  test('should reject a CUIT that is too short', () => {
    const result = validateCUIT('2012345678')
    expect(result.isValid).toBe(false)
    if (!result.isValid) {
      expect(result.errorMessage).toBe('CUIT must be 11 digits')
    }
  })

  test('should reject a CUIT that is too long', () => {
    const result = validateCUIT('201234567890')
    expect(result.isValid).toBe(false)
    if (!result.isValid) {
      expect(result.errorMessage).toBe('CUIT must be 11 digits')
    }
  })

  test('should reject a CUIT with all zeros', () => {
    const result = validateCUIT('00000000000')
    expect(result.isValid).toBe(false)
    if (!result.isValid) {
      expect(result.errorMessage).toBe('Invalid CUIT format')
    }
  })

  test('should reject a CUIT with all the same digit', () => {
    const result = validateCUIT('11111111111')
    expect(result.isValid).toBe(false)
    if (!result.isValid) {
      expect(result.errorMessage).toBe('Invalid CUIT format')
    }
  })

  test('should reject a CUIT with invalid check digit', () => {
    const result = validateCUIT('20123456781') // Correct check digit should be 9
    expect(result.isValid).toBe(false)
    if (!result.isValid) {
      expect(result.errorMessage).toBe('Invalid CUIT check digit')
    }
  })

  test('should reject a CUIT with invalid prefix', () => {
    const result = validateCUIT('12123456786') // 12 is not a valid prefix
    expect(result.isValid).toBe(false)
    if (!result.isValid) {
      expect(result.errorMessage).toBe('Invalid CUIT type prefix')
    }
  })
}) 