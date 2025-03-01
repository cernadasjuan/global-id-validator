import { ValidationResult } from '../../../types'
import { createInvalidResult, createValidResult } from '../../utils'

/**
 * Validates a US passport number
 * @param passportNumber The passport number to validate
 * @returns Validation result
 */
export function validatePassport(passportNumber: string): ValidationResult {
  // Remove any whitespace
  const cleanedNumber = passportNumber.replace(/\s/g, '')

  // US passport numbers are 9 digits
  if (!/^\d{9}$/.test(cleanedNumber)) {
    return createInvalidResult('US passport numbers must be 9 digits')
  }

  return createValidResult()
}
