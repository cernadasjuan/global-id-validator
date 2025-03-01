import { ValidationResult } from '../../types'
import { createInvalidResult, createValidResult, isNumeric } from '../utils'

/**
 * Validates a US Social Security Number (SSN)
 * @param ssn The SSN to validate
 * @returns Validation result
 */
export function validateSSN(ssn: string): ValidationResult {
  // Remove any hyphens or spaces
  const cleanedSSN = ssn.replace(/[\s-]/g, '')

  // Check if it's 9 digits
  if (!isNumeric(cleanedSSN) || cleanedSSN.length !== 9) {
    return createInvalidResult('SSN must be 9 digits')
  }

  // Check for invalid SSNs
  if (
    cleanedSSN === '000000000' ||
    cleanedSSN === '111111111' ||
    cleanedSSN === '222222222' ||
    cleanedSSN === '333333333' ||
    cleanedSSN === '444444444' ||
    cleanedSSN === '555555555' ||
    cleanedSSN === '666666666' ||
    cleanedSSN === '777777777' ||
    cleanedSSN === '888888888' ||
    cleanedSSN === '999999999' ||
    cleanedSSN.startsWith('000') ||
    cleanedSSN.startsWith('666') ||
    cleanedSSN.startsWith('900') ||
    cleanedSSN.substring(3, 5) === '00'
  ) {
    return createInvalidResult('Invalid SSN format')
  }

  // Format for display: XXX-XX-XXXX
  const formattedSSN = `${cleanedSSN.substring(0, 3)}-${cleanedSSN.substring(
    3,
    5,
  )}-${cleanedSSN.substring(5, 9)}`

  return createValidResult({
    formattedValue: formattedSSN,
  })
}
