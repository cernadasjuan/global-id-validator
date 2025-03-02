/**
 * Example usage of global-id-validator
 * 
 * This example demonstrates how to use the global-id-validator package
 */

const { us } = require('global-id-validator');

const validSSN = '123-45-6789';
const invalidSSN = '123-45-67890';

const validSSNResult = us.validateSSN(validSSN);
const invalidSSNResult = us.validateSSN(invalidSSN);

console.log(`SSN: ${validSSN}`);

if (validSSNResult.isValid) {
  console.log(`✅ Valid SSN! Formatted: ${validSSNResult.metadata.formattedValue}`);
} else {
  console.log(`❌ Invalid SSN: ${validSSNResult.errorMessage}`);
}

console.log(`\nSSN: ${invalidSSN}`);

if (invalidSSNResult.isValid) {
  console.log(`✅ Valid SSN! Formatted: ${invalidSSNResult.metadata.formattedValue}`);
} else {
  console.log(`❌ Invalid SSN: ${invalidSSNResult.errorMessage}`);
}