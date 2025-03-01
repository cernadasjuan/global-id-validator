import { ValidationResult } from '../../../types'
import { createInvalidResult, createValidResult, isNumeric, validateMod10WithTwoCheckDigits } from '../../utils'

/**
 * Validates a Brazil Cadastro de Pessoas Físicas (CPF)
 * @param cpf The CPF to validate
 * @returns Validation result
 */
export function validateCPF(cpf: string): ValidationResult {
  // Remove any non-numeric characters
  const cleanedCPF = cpf.replace(/[^\d]/g, '')

  // Check if it's 11 digits
  if (!isNumeric(cleanedCPF) || cleanedCPF.length !== 11) {
    return createInvalidResult('CPF must be 11 digits')
  }

  // Check for invalid CPFs (all zeros or all the same digit)
  if (
    cleanedCPF === '00000000000' ||
    /^(\d)\1+$/.test(cleanedCPF) // Checks if all digits are the same
  ) {
    return createInvalidResult('Invalid CPF format')
  }

  // Define weights for check digit calculations
  const firstWeights = [10, 9, 8, 7, 6, 5, 4, 3, 2]
  const secondWeights = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]

  // Validate check digits
  const baseDigits = cleanedCPF.substring(0, 9)
  if (!validateMod10WithTwoCheckDigits(baseDigits, cleanedCPF, firstWeights, secondWeights)) {
    return createInvalidResult('Invalid CPF check digit')
  }

  // Format for display: XXX.XXX.XXX-XX
  const formattedCPF = `${cleanedCPF.substring(0, 3)}.${cleanedCPF.substring(
    3,
    6
  )}.${cleanedCPF.substring(6, 9)}-${cleanedCPF.substring(9, 11)}`

  return createValidResult({
    formattedValue: formattedCPF,
  })
} 