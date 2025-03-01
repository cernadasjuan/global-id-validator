import { ValidationSuccessResult } from '../../../../types'
import { validateSSN } from '..'

describe('US SSN Validator', () => {
  it('should validate correct US SSNs', () => {
    const result = validateSSN('123-45-6789') as ValidationSuccessResult
    expect(result.isValid).toBe(true)
    expect(result.metadata?.formattedValue).toBe('123-45-6789')
  })

  it('should validate SSNs without hyphens', () => {
    const result = validateSSN('123456789') as ValidationSuccessResult
    expect(result.isValid).toBe(true)
    expect(result.metadata?.formattedValue).toBe('123-45-6789')
  })

  it('should validate SSNs with spaces', () => {
    const result = validateSSN('123 45 6789') as ValidationSuccessResult
    expect(result.isValid).toBe(true)
    expect(result.metadata?.formattedValue).toBe('123-45-6789')
  })

  it('should invalidate SSNs with invalid format', () => {
    expect(validateSSN('000-45-6789').isValid).toBe(false)
    expect(validateSSN('666-45-6789').isValid).toBe(false)
    expect(validateSSN('900-45-6789').isValid).toBe(false)
    expect(validateSSN('123-00-6789').isValid).toBe(false)
    expect(validateSSN('000000000').isValid).toBe(false)
    expect(validateSSN('111111111').isValid).toBe(false)
  })

  it('should invalidate SSNs with incorrect length', () => {
    expect(validateSSN('12345678').isValid).toBe(false)
    expect(validateSSN('1234567890').isValid).toBe(false)
  })

  it('should invalidate SSNs with non-numeric characters', () => {
    expect(validateSSN('AAA-BB-CCCC').isValid).toBe(false)
    expect(validateSSN('123-45-678A').isValid).toBe(false)
  })
}) 