# Global ID Validator

A TypeScript library for validating various global identification numbers like passports, tax ids, social security numbers, and more.

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
import { argentina, brazil, us, canada } from 'global-id-validator'

// Validate a US passport
const passportResult = us.validatePassport('AB1234567')
if (passportResult.isValid) {
  console.log('Valid passport!', passportResult.metadata)
} else {
  console.error('Invalid passport:', passportResult.errorMessage)
}

// Validate a US Social Security Number
const ssnResult = us.validateSSN('123-45-6789')
if (ssnResult.isValid) {
  console.log('Valid SSN!', ssnResult.metadata)
} else {
  console.error('Invalid SSN:', ssnResult.errorMessage)
}
```

### Available Validators

#### United States

```typescript
import { us } from 'global-id-validator'

// US passport
const passportResult = us.validatePassport('123456789')

// US Social Security Number
const ssnResult = us.validateSSN('123-45-6789')
```

#### Canada

```typescript
import { canada } from 'global-id-validator'

// Canadian Social Insurance Number
const sinResult = canada.validateSIN('046-454-286')
```

#### Argentina

```typescript
import { argentina } from 'global-id-validator'

// Argentine National Identity Document
const dniResult = argentina.validateDNI('12345678')

// Argentine Tax ID (CUIT)
const cuitResult = argentina.validateCUIT('20-12345678-9')

// Argentine Labor Identification Code (CUIL)
const cuilResult = argentina.validateCUIL('27-12345678-9')
```

#### Brazil

```typescript
import { brazil } from 'global-id-validator'

// Brazilian Individual Taxpayer Registry (CPF)
const cpfResult = brazil.validateCPF('123.456.789-09')

// Brazilian National Registry of Legal Entities (CNPJ)
const cnpjResult = brazil.validateCNPJ('12.345.678/0001-95')
```

More validators will be added in the future, feel free to contribute with your own! :)

### Validation Result

All validators return a `ValidationResult` object with the following structure:

```typescript
// Successful validation
type ValidationSuccessResult = {
  // Whether the ID is valid
  isValid: true
  
  // Additional metadata about the ID
  metadata: {
    // Formatted value of the ID (if applicable)
    formattedValue: string
  }
}

// Failed validation
type ValidationErrorResult = {
  // Whether the ID is valid
  isValid: false
  
  // Error message if the ID is invalid
  errorMessage: string
}

// Combined type
type ValidationResult = ValidationSuccessResult | ValidationErrorResult
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

MIT 