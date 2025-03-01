import { ValidationResult } from '../types';
import { createInvalidResult, createValidResult } from './utils';

/**
 * Validates a passport number
 * @param passportNumber The passport number to validate
 * @param countryCode Optional ISO country code (e.g., 'US', 'GB')
 * @returns Validation result
 */
export function validatePassport(
  passportNumber: string,
  countryCode?: string
): ValidationResult {
  if (!passportNumber) {
    return createInvalidResult('Passport number cannot be empty');
  }

  // Remove any whitespace
  const cleanedNumber = passportNumber.replace(/\s/g, '');

  // Basic validation - can be expanded for country-specific rules
  if (cleanedNumber.length < 6 || cleanedNumber.length > 12) {
    return createInvalidResult('Passport number must be between 6 and 12 characters');
  }

  // Country-specific validation
  if (countryCode) {
    return validateCountrySpecificPassport(cleanedNumber, countryCode.toUpperCase());
  }

  // Generic validation passed
  return createValidResult({ format: 'generic' });
}

/**
 * Validates a passport number according to country-specific rules
 * @param passportNumber The cleaned passport number
 * @param countryCode ISO country code
 * @returns Validation result
 */
function validateCountrySpecificPassport(
  passportNumber: string,
  countryCode: string
): ValidationResult {
  switch (countryCode) {
    case 'US':
      // US passport numbers are 9 digits
      if (!/^\d{9}$/.test(passportNumber)) {
        return createInvalidResult('US passport numbers must be 9 digits');
      }
      return createValidResult({ country: 'United States', format: 'numeric' });

    case 'GB':
      // UK passport numbers are 9 digits with an optional letter prefix
      if (!/^[0-9]{9}$/.test(passportNumber) && !/^[A-Z][0-9]{9}$/.test(passportNumber)) {
        return createInvalidResult('UK passport numbers must be 9 digits with an optional letter prefix');
      }
      return createValidResult({ country: 'United Kingdom', format: 'alphanumeric' });

    // Add more countries as needed

    default:
      // For countries without specific validation, just return valid
      return createValidResult({ country: countryCode, format: 'unknown' });
  }
} 