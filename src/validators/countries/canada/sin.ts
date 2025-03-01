import { ValidationResult } from '../../../types'
import { createInvalidResult, createValidResult, isNumeric } from '../../utils'

/**
 * Validates a Social Insurance Number (SIN) from Canada
 * @param sin The SIN to validate
 * @returns Validation result
 */
export function validateSIN(sin: string): ValidationResult {
  // Remove any spaces or hyphens
  const cleanedSIN = sin.replace(/[\s-]/g, '')

  // Check if it's 9 digits
  if (!isNumeric(cleanedSIN) || cleanedSIN.length !== 9) {
    return createInvalidResult('SIN must be 9 digits')
  }

  // Luhn algorithm validation for Canadian SIN
  let sum = 0
  for (let i = 0; i < 9; i++) {
    let digit = parseInt(cleanedSIN.charAt(i), 10)
    if (i % 2 === 1) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }
    sum += digit
  }

  if (sum % 10 !== 0) {
    return createInvalidResult('Invalid SIN checksum')
  }

  // Format for display: XXX-XXX-XXX
  const formattedSIN = `${cleanedSIN.substring(0, 3)}-${cleanedSIN.substring(
    3,
    6,
  )}-${cleanedSIN.substring(6, 9)}`

  return createValidResult({
    formattedValue: formattedSIN,
  })
}
