import { ValidationSuccessResult } from '../../../types'
import { validatePassport } from '../../../validators/countries/us'

describe('US Passport Validator', () => {
  it('should validate correct US passport numbers', () => {
    const result = validatePassport('123456789') as ValidationSuccessResult
    expect(result.isValid).toBe(true)
  })

  it('should invalidate passport numbers that are not 9 digits', () => {
    expect(validatePassport('12345678').isValid).toBe(false)
    expect(validatePassport('1234567890').isValid).toBe(false)
    expect(validatePassport('A12345678').isValid).toBe(false)
  })

  it('should invalidate passport numbers with non-numeric characters', () => {
    expect(validatePassport('12345678A').isValid).toBe(false)
    expect(validatePassport('ABCDEFGHI').isValid).toBe(false)
  })

  it('should handle passport numbers with spaces', () => {
    const result = validatePassport('123 456 789')
    expect(result.isValid).toBe(true)
  })
}) 