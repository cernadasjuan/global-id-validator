import { ValidationResult } from '../../../types'
import { createInvalidResult, createValidResult } from '../../utils'

/**
 * Validates a UK passport number
 * @param passportNumber The passport number to validate
 * @returns Validation result
 */
export function validatePassport(passportNumber: string): ValidationResult {
  // Remove any whitespace
  const cleanedNumber = passportNumber.replace(/\s/g, '')

  // UK passport numbers are 9 digits with an optional letter prefix
  if (!/^[0-9]{9}$/.test(cleanedNumber) && !/^[A-Z][0-9]{9}$/.test(cleanedNumber)) {
    return createInvalidResult(
      'UK passport numbers must be 9 digits with an optional letter prefix',
    )
  }

  return createValidResult()
}
