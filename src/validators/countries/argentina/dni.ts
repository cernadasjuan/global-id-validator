import { ValidationResult } from '../../../types'
import { createInvalidResult, createValidResult, isNumeric } from '../../utils'

/**
 * Validates an Argentina Documento Nacional de Identidad (DNI)
 * @param dni The DNI to validate
 * @returns Validation result
 */
export function validateDNI(dni: string): ValidationResult {
  // Remove any dots, spaces, or other separators
  const cleanedDNI = dni.replace(/[\s.-]/g, '')

  // Check if it's numeric and has the correct length (7 or 8 digits)
  if (!isNumeric(cleanedDNI)) {
    return createInvalidResult('DNI must contain only digits')
  }

  if (cleanedDNI.length < 7 || cleanedDNI.length > 8) {
    return createInvalidResult('DNI must be 7 or 8 digits')
  }

  // Check for invalid DNIs (all zeros or all the same digit)
  if (
    cleanedDNI === '0000000' ||
    cleanedDNI === '00000000' ||
    /^(\d)\1+$/.test(cleanedDNI) // Checks if all digits are the same
  ) {
    return createInvalidResult('Invalid DNI format')
  }

  // Format for display: XX.XXX.XXX or X.XXX.XXX
  let formattedDNI: string
  if (cleanedDNI.length === 8) {
    formattedDNI = `${cleanedDNI.substring(0, 2)}.${cleanedDNI.substring(
      2,
      5
    )}.${cleanedDNI.substring(5, 8)}`
  } else {
    // 7 digits
    formattedDNI = `${cleanedDNI.substring(0, 1)}.${cleanedDNI.substring(
      1,
      4
    )}.${cleanedDNI.substring(4, 7)}`
  }

  return createValidResult({
    formattedValue: formattedDNI,
  })
} 