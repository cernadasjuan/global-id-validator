import { validateCNPJ } from '../cnpj'

describe('Brazil CNPJ Validator', () => {
  test('should validate a valid CNPJ', () => {
    const result = validateCNPJ('11222333000181')
    expect(result.isValid).toBe(true)
    if (result.isValid) {
      expect(result.metadata.formattedValue).toBe('11.222.333/0001-81')
    }
  })

  test('should validate a valid CNPJ with dots, slash, and dash', () => {
    const result = validateCNPJ('11.222.333/0001-81')
    expect(result.isValid).toBe(true)
    if (result.isValid) {
      expect(result.metadata.formattedValue).toBe('11.222.333/0001-81')
    }
  })

  test('should validate a valid CNPJ with spaces', () => {
    const result = validateCNPJ('11 222 333 0001 81')
    expect(result.isValid).toBe(true)
    if (result.isValid) {
      expect(result.metadata.formattedValue).toBe('11.222.333/0001-81')
    }
  })

  test('should reject a CNPJ with letters', () => {
    const result = validateCNPJ('1122233300018A')
    expect(result.isValid).toBe(false)
    if (!result.isValid) {
      expect(result.errorMessage).toBe('CNPJ must be 14 digits')
    }
  })

  test('should reject a CNPJ that is too short', () => {
    const result = validateCNPJ('1122233300018')
    expect(result.isValid).toBe(false)
    if (!result.isValid) {
      expect(result.errorMessage).toBe('CNPJ must be 14 digits')
    }
  })

  test('should reject a CNPJ that is too long', () => {
    const result = validateCNPJ('112223330001811')
    expect(result.isValid).toBe(false)
    if (!result.isValid) {
      expect(result.errorMessage).toBe('CNPJ must be 14 digits')
    }
  })

  test('should reject a CNPJ with all zeros', () => {
    const result = validateCNPJ('00000000000000')
    expect(result.isValid).toBe(false)
    if (!result.isValid) {
      expect(result.errorMessage).toBe('Invalid CNPJ format')
    }
  })

  test('should reject a CNPJ with all the same digit', () => {
    const result = validateCNPJ('11111111111111')
    expect(result.isValid).toBe(false)
    if (!result.isValid) {
      expect(result.errorMessage).toBe('Invalid CNPJ format')
    }
  })

  test('should reject a CNPJ with invalid first check digit', () => {
    const result = validateCNPJ('11222333000191') // Changed last two digits
    expect(result.isValid).toBe(false)
    if (!result.isValid) {
      expect(result.errorMessage).toBe('Invalid CNPJ first check digit')
    }
  })

  test('should reject a CNPJ with invalid second check digit', () => {
    const result = validateCNPJ('11222333000182') // Changed last digit
    expect(result.isValid).toBe(false)
    if (!result.isValid) {
      expect(result.errorMessage).toBe('Invalid CNPJ second check digit')
    }
  })
}) 