# Global ID Validator Example

This is a simple example project demonstrating how to use the [global-id-validator](https://www.npmjs.com/package/global-id-validator) npm package to validate various types of identification numbers from different countries.

## Installation

```bash
# Clone the repository
git clone https://github.com/cernadasjuan/global-id-validator
cd example

# Install dependencies
npm install
```

## Usage

Run the example script:

```bash
node index.js
```

This will demonstrate validation of:
- US Social Security Numbers (SSN)
- US Passports
- Argentine Tax IDs (CUIT)
- Brazilian CPF
- Canadian SIN

## Example Output

The script will output validation results for both valid and invalid examples of each ID type:

```
Global ID Validator Example

Example 1: US Social Security Numbers (SSN)
SSN: 123-45-6789
✅ Valid SSN! Formatted: 123-45-6789

SSN: 123-45-67890
❌ Invalid SSN: SSN must be 9 digits

Example 2: US Passports
...
```

## How It Works

The example demonstrates:
1. Importing validators from the global-id-validator package
2. Validating different types of IDs
3. Handling both valid and invalid results
4. Accessing formatted values and error messages

## Library Features

The global-id-validator library supports validation for:

- 🇺🇸 United States: SSN, Passport
- 🇨🇦 Canada: SIN
- 🇦🇷 Argentina: DNI, CUIT, CUIL
- 🇧🇷 Brazil: CPF, CNPJ

Each validator returns a consistent result object with validation status and additional metadata. 