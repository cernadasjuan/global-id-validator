import { ValidationSuccessResult } from '../../../types'
import { validateSIN } from '../../../validators/countries/canada'

describe('Canadian SIN Validator', () => {
  it('should validate correct Canadian SINs', () => {
    // Example of a valid Canadian SIN (using Luhn algorithm)
    const result = validateSIN('046-454-286') as ValidationSuccessResult
    expect(result.isValid).toBe(true)
    // Format and country properties should be filtered out
    expect(result.metadata?.formattedValue).toBe('046-454-286')
  })

  it('should validate SINs without hyphens', () => {
    const result = validateSIN('046454286') as ValidationSuccessResult
    expect(result.isValid).toBe(true)
    expect(result.metadata?.formattedValue).toBe('046-454-286')
  })

  it('should validate SINs with spaces', () => {
    const result = validateSIN('046 454 286') as ValidationSuccessResult
    expect(result.isValid).toBe(true)
    expect(result.metadata?.formattedValue).toBe('046-454-286')
  })

  it('should invalidate SINs with incorrect checksum', () => {
    expect(validateSIN('046-454-287').isValid).toBe(false)
    expect(validateSIN('123-456-789').isValid).toBe(false)
  })

  it('should invalidate SINs with incorrect length', () => {
    expect(validateSIN('12345678').isValid).toBe(false)
    expect(validateSIN('1234567890').isValid).toBe(false)
  })

  it('should invalidate SINs with non-numeric characters', () => {
    expect(validateSIN('AAA-BBB-CCC').isValid).toBe(false)
    expect(validateSIN('046-454-28A').isValid).toBe(false)
  })
}) 