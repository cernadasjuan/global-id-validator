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

/**
 * Calculates a check digit using the mod10 algorithm (commonly used in Brazil and Argentina)
 * @param digits String of digits to calculate the check digit for
 * @param weights Array of weights to apply to each digit
 * @returns The calculated check digit (0-9)
 */
export function calculateMod10CheckDigit(digits: string, weights: number[]): number {
  if (!isNumeric(digits) || digits.length !== weights.length) {
    throw new Error('Invalid input for mod10 check digit calculation')
  }

  let sum = 0
  for (let i = 0; i < digits.length; i++) {
    sum += parseInt(digits.charAt(i), 10) * weights[i]
  }

  const remainder = sum % 11
  return remainder < 2 ? 0 : 11 - remainder
}

/**
 * Validates a document number using the mod10 algorithm with two check digits
 * (commonly used in Brazil CPF and Argentina CUIT/CUIL)
 * @param digits String of digits without check digits
 * @param fullNumber Full number including check digits
 * @param firstWeights Weights for the first check digit calculation
 * @param secondWeights Weights for the second check digit calculation
 * @returns True if both check digits are valid
 */
export function validateMod10WithTwoCheckDigits(
  digits: string,
  fullNumber: string,
  firstWeights: number[],
  secondWeights: number[]
): boolean {
  if (!isNumeric(digits) || !isNumeric(fullNumber) || digits.length + 2 !== fullNumber.length) {
    return false
  }

  // Calculate first check digit
  const firstCheckDigit = calculateMod10CheckDigit(digits, firstWeights)

  // Verify first check digit
  if (parseInt(fullNumber.charAt(digits.length), 10) !== firstCheckDigit) {
    return false
  }

  // Calculate second check digit (including the first check digit)
  const digitsWithFirstCheck = digits + firstCheckDigit
  const secondCheckDigit = calculateMod10CheckDigit(digitsWithFirstCheck, secondWeights)

  // Verify second check digit
  return parseInt(fullNumber.charAt(fullNumber.length - 1), 10) === secondCheckDigit
}
