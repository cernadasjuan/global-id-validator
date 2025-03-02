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

This will demonstrate validation of US Social Security Numbers (SSN)

## Example Output

The script will output validation results for both valid and invalid examples.

```
Global ID Validator Example

Example 1: US Social Security Numbers (SSN)
SSN: 123-45-6789
✅ Valid SSN! Formatted: 123-45-6789

SSN: 123-45-67890
❌ Invalid SSN: SSN must be 9 digits