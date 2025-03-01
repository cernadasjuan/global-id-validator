/**
 * Types for the Global ID Validator library
 */

/**
 * Metadata type for validation results
 */
export type ValidationMetadata = {
  /**
   * Formatted value of the ID (if applicable)
   */
  formattedValue: string
}

/**
 * Successful validation result type
 */
export type ValidationSuccessResult = {
  /**
   * Whether the ID is valid
   */
  isValid: true

  /**
   * Additional metadata about the ID (country, issuer, etc.)
   * Always defined when isValid is true
   */
  metadata: ValidationMetadata
}

/**
 * Error validation result type
 */
export type ValidationErrorResult = {
  /**
   * Whether the ID is invalid
   */
  isValid: false

  /**
   * Error message if the ID is invalid
   * Always defined when isValid is false
   */
  errorMessage: string
}

/**
 * Combined validation result type
 */
export type ValidationResult = ValidationSuccessResult | ValidationErrorResult

/**
 * Validator function type
 */
export type ValidatorFn = (id: string) => ValidationResult

/**
 * Supported ID types
 */
export type IdType = 'passport' | 'ssn' | 'taxId' | 'nationalId' | 'custom'
