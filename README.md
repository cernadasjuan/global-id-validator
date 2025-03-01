# Global ID Validator

A TypeScript library for validating various global identification numbers like passports, social security numbers, and more.

## Installation

```bash
npm install global-id-validator
# or
yarn add global-id-validator
# or
pnpm add global-id-validator
```

## Usage

### Basic Usage

```typescript
import { validatePassport, validateUSSSN } from 'global-id-validator';

// Validate a passport number
const passportResult = validatePassport('AB1234567', 'GB');
if (passportResult.isValid) {
  console.log('Valid passport!', passportResult.metadata);
} else {
  console.error('Invalid passport:', passportResult.errorMessage);
}

// Validate a US Social Security Number
const ssnResult = validateUSSSN('123-45-6789');
if (ssnResult.isValid) {
  console.log('Valid SSN!', ssnResult.metadata);
} else {
  console.error('Invalid SSN:', ssnResult.errorMessage);
}
```

### Available Validators

#### Passport Validator

```typescript
import { validatePassport } from 'global-id-validator';

// Generic validation (basic format check)
const result1 = validatePassport('AB1234567');

// Country-specific validation
const result2 = validatePassport('123456789', 'US'); // US passport
const result3 = validatePassport('AB1234567', 'GB'); // UK passport
```

#### Social Security Number Validators

```typescript
import { validateUSSSN, validateCanadianSIN } from 'global-id-validator';

// US Social Security Number
const result1 = validateUSSSN('123-45-6789');

// Canadian Social Insurance Number
const result2 = validateCanadianSIN('046-454-286');
```

### Validation Result

All validators return a `ValidationResult` object with the following structure:

```typescript
interface ValidationResult {
  // Whether the ID is valid
  isValid: boolean;
  
  // Error message if the ID is invalid
  errorMessage?: string;
  
  // Additional metadata about the ID (country, issuer, etc.)
  metadata?: Record<string, unknown>;
}
```

## Development

### Setup

```bash
# Install dependencies
pnpm install

# Build the library
pnpm build

# Run tests
pnpm test
```

### Commands

- `pnpm build` - Build the library
- `pnpm test` - Run tests
- `pnpm lint` - Run linting
- `pnpm format` - Format code with Prettier
- `pnpm dev` - Build in watch mode

## License

ISC 