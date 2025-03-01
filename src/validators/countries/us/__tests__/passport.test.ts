import { validatePassport } from '../passport'

describe('US Passport Validator', () => {
  // Traditional format tests (9 digits)
  test('validates valid traditional 9-digit passport numbers', () => {
    const result1 = validatePassport('123456789')
    expect(result1.isValid).toBe(true)
    if (result1.isValid) {
      expect(result1.metadata.formattedValue).toBe('123456789')
    }

    const result2 = validatePassport('012345678')
    expect(result2.isValid).toBe(true)
    if (result2.isValid) {
      expect(result2.metadata.formattedValue).toBe('012345678')
    }

    const result3 = validatePassport('01 23 45 678')
    expect(result3.isValid).toBe(true)
    if (result3.isValid) {
      expect(result3.metadata.formattedValue).toBe('012345678')
    }
  })

  test('rejects traditional passport numbers with invalid issuing office codes', () => {
    expect(validatePassport('993456789').isValid).toBe(false)
    expect(validatePassport('003456789').isValid).toBe(false)
    expect(validatePassport('223456789').isValid).toBe(false)
  })

  test('validates traditional passport numbers with valid issuing office codes', () => {
    // Test a few valid issuing office codes
    const result1 = validatePassport('013456789')
    expect(result1.isValid).toBe(true) // Washington
    if (result1.isValid) {
      expect(result1.metadata.formattedValue).toBe('013456789')
    }

    const result2 = validatePassport('023456789')
    expect(result2.isValid).toBe(true) // Chicago
    if (result2.isValid) {
      expect(result2.metadata.formattedValue).toBe('023456789')
    }

    const result3 = validatePassport('153456789')
    expect(result3.isValid).toBe(true) // National Passport Center
    if (result3.isValid) {
      expect(result3.metadata.formattedValue).toBe('153456789')
    }

    const result4 = validatePassport('713456789')
    expect(result4.isValid).toBe(true) // Overseas
    if (result4.isValid) {
      expect(result4.metadata.formattedValue).toBe('713456789')
    }
  })

  // Modern format tests (1 letter + 8 digits)
  test('validates valid modern passport numbers (letter + 8 digits)', () => {
    const result1 = validatePassport('A12345678')
    expect(result1.isValid).toBe(true)
    if (result1.isValid) {
      expect(result1.metadata.formattedValue).toBe('A12345678')
    }

    const result2 = validatePassport('C 1234 5678')
    expect(result2.isValid).toBe(true) // With spaces
    if (result2.isValid) {
      expect(result2.metadata.formattedValue).toBe('C12345678')
    }

    const result3 = validatePassport('Z98765432')
    expect(result3.isValid).toBe(true)
    if (result3.isValid) {
      expect(result3.metadata.formattedValue).toBe('Z98765432')
    }
  })

  test('rejects modern passport numbers with invalid first letter', () => {
    expect(validatePassport('I12345678').isValid).toBe(false) // 'I' is not used
  })

  // Invalid format tests
  test('rejects passport numbers with invalid formats', () => {
    expect(validatePassport('').isValid).toBe(false) // Empty
    expect(validatePassport('12345678').isValid).toBe(false) // Too short
    expect(validatePassport('1234567890').isValid).toBe(false) // Too long
    expect(validatePassport('A1234567').isValid).toBe(false) // Letter + 7 digits (too short)
    expect(validatePassport('A123456789').isValid).toBe(false) // Letter + 9 digits (too long)
    expect(validatePassport('AB1234567').isValid).toBe(false) // 2 letters + 7 digits
    expect(validatePassport('ABCDEFGHI').isValid).toBe(false) // All letters
    expect(validatePassport('12345678A').isValid).toBe(false) // 8 digits + letter
  })

  // Edge cases
  test('handles edge cases correctly', () => {
    expect(validatePassport('  ').isValid).toBe(false) // Only whitespace
    expect(validatePassport('A-12345678').isValid).toBe(false) // Contains non-alphanumeric
    expect(validatePassport('a12345678').isValid).toBe(false) // Lowercase letter
  })
}) 