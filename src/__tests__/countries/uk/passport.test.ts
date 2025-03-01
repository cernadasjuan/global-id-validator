import { ValidationSuccessResult } from '../../../types'
import { validatePassport } from '../../../validators/countries/uk'

describe('UK Passport Validator', () => {
  it('should validate correct UK passport numbers with 9 digits', () => {
    const result = validatePassport('123456789') as ValidationSuccessResult
    expect(result.isValid).toBe(true)
  })

  it('should validate correct UK passport numbers with letter prefix', () => {
    const result = validatePassport('A123456789') as ValidationSuccessResult
    expect(result.isValid).toBe(true)
  })

  it('should handle passport numbers with spaces', () => {
    expect(validatePassport('123 456 789').isValid).toBe(true)
    expect(validatePassport('A 123 456 789').isValid).toBe(true)
  })

  it('should invalidate passport numbers with incorrect format', () => {
    expect(validatePassport('12345678').isValid).toBe(false) // Too short
    expect(validatePassport('1234567890').isValid).toBe(false) // Too long
    expect(validatePassport('A12345678').isValid).toBe(false) // Too short with prefix
    expect(validatePassport('A1234567890').isValid).toBe(false) // Too long with prefix
    expect(validatePassport('AB123456789').isValid).toBe(false) // Multiple letter prefix
  })

  it('should invalidate passport numbers with invalid characters', () => {
    expect(validatePassport('A1234@6789').isValid).toBe(false)
    expect(validatePassport('ABCDEFGHI').isValid).toBe(false)
  })
}) 