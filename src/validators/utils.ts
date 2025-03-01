import { ValidationErrorResult, ValidationMetadata, ValidationSuccessResult } from '../types'

/**
 * Creates a valid validation result
 * @param metadata Optional metadata about the ID
 * @returns A valid validation result
 */
export function createValidResult(metadata: ValidationMetadata): ValidationSuccessResult {
  return {
    isValid: true,
    metadata,
  }
}

/**
 * Creates an invalid validation result
 * @param errorMessage Error message explaining why the ID is invalid
 * @returns An invalid validation result
 */
export function createInvalidResult(errorMessage: string): ValidationErrorResult {
  return {
    isValid: false,
    errorMessage,
  }
}

/**
 * Checks if a string contains only digits
 * @param str String to check
 * @returns True if the string contains only digits
 */
export function isNumeric(str: string): boolean {
  return /^\d+$/.test(str)
}

/**
 * Calculates a checksum using the Luhn algorithm
 * @param digits String of digits
 * @returns True if the checksum is valid
 */
export function validateLuhnChecksum(digits: string): boolean {
  if (!isNumeric(digits)) {
    return false
  }

  let sum = 0
  let shouldDouble = false

  // Start from the rightmost digit and move left
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i), 10)

    if (shouldDouble) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }

    sum += digit
    shouldDouble = !shouldDouble
  }

  return sum % 10 === 0
}
