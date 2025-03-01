import { ValidationResult } from '../../types'
import {
  calculateMod10CheckDigit,
  createInvalidResult,
  createValidResult,
  isNumeric
} from '../utils'

/**
 * Validates a Brazil Cadastro Nacional da Pessoa Jurídica (CNPJ)
 * @param cnpj The CNPJ to validate
 * @returns Validation result
 */
export function validateCNPJ(cnpj: string): ValidationResult {
  // Remove any non-numeric characters
  const cleanedCNPJ = cnpj.replace(/[^\d]/g, '')

  // Check if it's 14 digits
  if (!isNumeric(cleanedCNPJ) || cleanedCNPJ.length !== 14) {
    return createInvalidResult('CNPJ must be 14 digits')
  }

  // Check for invalid CNPJs (all zeros or all the same digit)
  if (
    cleanedCNPJ === '00000000000000' ||
    /^(\d)\1+$/.test(cleanedCNPJ) // Checks if all digits are the same
  ) {
    return createInvalidResult('Invalid CNPJ format')
  }

  // Validate the first check digit
  const firstWeights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

  try {
    // Calculate the first check digit
    const firstCheckDigit = calculateMod10CheckDigit(cleanedCNPJ.substring(0, 12), firstWeights)

    // Verify the first check digit
    if (parseInt(cleanedCNPJ.charAt(12), 10) !== firstCheckDigit) {
      return createInvalidResult('Invalid CNPJ first check digit')
    }

    // Validate the second check digit
    const secondWeights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

    // Calculate the second check digit
    const secondCheckDigit = calculateMod10CheckDigit(cleanedCNPJ.substring(0, 13), secondWeights)

    // Verify the second check digit
    if (parseInt(cleanedCNPJ.charAt(13), 10) !== secondCheckDigit) {
      return createInvalidResult('Invalid CNPJ second check digit')
    }
  } catch (error) {
    return createInvalidResult('Error calculating CNPJ check digits')
  }

  // Format for display: XX.XXX.XXX/XXXX-XX
  const formattedCNPJ = `${cleanedCNPJ.substring(0, 2)}.${cleanedCNPJ.substring(
    2,
    5
  )}.${cleanedCNPJ.substring(5, 8)}/${cleanedCNPJ.substring(
    8,
    12
  )}-${cleanedCNPJ.substring(12, 14)}`

  return createValidResult({
    formattedValue: formattedCNPJ,
  })
} 