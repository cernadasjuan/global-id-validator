import { validateCPF } from '../cpf'

describe('Brazil CPF Validator', () => {
  test('should validate a valid CPF', () => {
    const result = validateCPF('52998224725')
    expect(result.isValid).toBe(true)
    if (result.isValid) {
      expect(result.metadata.formattedValue).toBe('529.982.247-25')
    }
  })

  test('should validate a valid CPF with dots and dash', () => {
    const result = validateCPF('529.982.247-25')
    expect(result.isValid).toBe(true)
    if (result.isValid) {
      expect(result.metadata.formattedValue).toBe('529.982.247-25')
    }
  })

  test('should validate a valid CPF with spaces', () => {
    const result = validateCPF('529 982 247 25')
    expect(result.isValid).toBe(true)
    if (result.isValid) {
      expect(result.metadata.formattedValue).toBe('529.982.247-25')
    }
  })

  test('should reject a CPF with letters', () => {
    const result = validateCPF('5299822472A')
    expect(result.isValid).toBe(false)
    if (!result.isValid) {
      expect(result.errorMessage).toBe('CPF must be 11 digits')
    }
  })

  test('should reject a CPF that is too short', () => {
    const result = validateCPF('5299822472')
    expect(result.isValid).toBe(false)
    if (!result.isValid) {
      expect(result.errorMessage).toBe('CPF must be 11 digits')
    }
  })

  test('should reject a CPF that is too long', () => {
    const result = validateCPF('529982247255')
    expect(result.isValid).toBe(false)
    if (!result.isValid) {
      expect(result.errorMessage).toBe('CPF must be 11 digits')
    }
  })

  test('should reject a CPF with all zeros', () => {
    const result = validateCPF('00000000000')
    expect(result.isValid).toBe(false)
    if (!result.isValid) {
      expect(result.errorMessage).toBe('Invalid CPF format')
    }
  })

  test('should reject a CPF with all the same digit', () => {
    const result = validateCPF('11111111111')
    expect(result.isValid).toBe(false)
    if (!result.isValid) {
      expect(result.errorMessage).toBe('Invalid CPF format')
    }
  })

  test('should reject a CPF with invalid first check digit', () => {
    const result = validateCPF('52998224735') // Changed last two digits
    expect(result.isValid).toBe(false)
    if (!result.isValid) {
      expect(result.errorMessage).toBe('Invalid CPF check digit')
    }
  })

  test('should reject a CPF with invalid second check digit', () => {
    const result = validateCPF('52998224726') // Changed last digit
    expect(result.isValid).toBe(false)
    if (!result.isValid) {
      expect(result.errorMessage).toBe('Invalid CPF check digit')
    }
  })
}) 