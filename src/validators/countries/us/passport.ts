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

  // Check for empty input
  if (!cleanedNumber) {
    return createInvalidResult('Passport number cannot be empty')
  }

  // Modern US passport numbers (after 2021) are alphanumeric with 1 letter followed by 8 digits
  const modernFormat = /^[A-Z]\d{8}$/

  // Traditional US passport numbers (before 2021) are 9 digits
  const traditionalFormat = /^\d{9}$/

  // Check if the passport matches either format
  if (!modernFormat.test(cleanedNumber) && !traditionalFormat.test(cleanedNumber)) {
    return createInvalidResult('US passport numbers must be either 9 digits or 1 letter followed by 8 digits')
  }

  // For traditional format (9 digits), check if the first two digits represent a valid issuing office
  if (traditionalFormat.test(cleanedNumber)) {
    const validIssuingOffices = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
      '11', '12', '13', '14', '15', '16', '20', '21', '40', '50',
      '60', '70', '71', '80', '90']

    const issuingOffice = cleanedNumber.substring(0, 2)

    if (!validIssuingOffices.includes(issuingOffice)) {
      return createInvalidResult('Invalid issuing office code in passport number')
    }

    return createValidResult({ formattedValue: cleanedNumber })
  } else {
    // For modern format (letter + 8 digits), check if the letter is valid
    // Skip 'I' as it's not used in passport numbers to avoid confusion with '1'
    const validFirstLetters = 'ABCDEFGHJKLMNOPQRSTUVWXYZ'

    const firstLetter = cleanedNumber.charAt(0)

    if (!validFirstLetters.includes(firstLetter)) {
      return createInvalidResult('Invalid first letter in passport number')
    }

    return createValidResult({ formattedValue: cleanedNumber })
  }
}
