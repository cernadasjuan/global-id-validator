/**
 * Global ID Validator
 * A library for validating various global identification numbers
 */

// Export types
export * from './types'

// Export Argentina validators
export { validateDNI, validateCUIT, validateCUIL } from './validators/countries/argentina'

// Export US validators
export { validatePassport, validateSSN } from './validators/countries/us'

// Export Canada validators
export { validateSIN } from './validators/countries/canada'

