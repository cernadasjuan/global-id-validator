/**
 * Types for the Global ID Validator library
 */

/**
 * Validation result interface
 */
export interface ValidationResult {
  /**
   * Whether the ID is valid
   */
  isValid: boolean;

  /**
   * Error message if the ID is invalid
   */
  errorMessage?: string;

  /**
   * Additional metadata about the ID (country, issuer, etc.)
   */
  metadata?: Record<string, unknown>;
}

/**
 * Validator function type
 */
export type ValidatorFn = (id: string) => ValidationResult;

/**
 * Supported ID types
 */
export enum IdType {
  PASSPORT = 'passport',
  SSN = 'ssn',
  TAX_ID = 'taxId',
  NATIONAL_ID = 'nationalId',
  CUSTOM = 'custom'
} 