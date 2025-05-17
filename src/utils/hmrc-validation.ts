
/**
 * Validates a UK National Insurance number
 * Format: 2 letters, 6 numbers, 1 letter (e.g., AB123456C)
 */
export const validateNINumber = (niNumber: string): boolean => {
  // Remove any spaces
  const cleanNI = niNumber.replace(/\s/g, "").toUpperCase();
  
  // Check the format using regex
  // Two letters, followed by six numbers, followed by one letter
  const niRegex = /^[A-Z]{2}[0-9]{6}[A-Z]$/;
  
  if (!niRegex.test(cleanNI)) {
    return false;
  }
  
  // Check for disallowed prefixes - NI numbers don't start with D, F, I, Q, U, or V
  const firstTwo = cleanNI.substring(0, 2);
  if (/^(D|F|I|Q|U|V)[A-Z]/.test(firstTwo)) {
    return false;
  }
  
  // Check for disallowed second letter - NI numbers don't have O as second letter
  if (firstTwo[1] === "O") {
    return false;
  }
  
  // Check for completely disallowed first two letters
  const invalidPrefixes = ["BG", "GB", "NK", "KN", "TN", "NT", "ZZ"];
  if (invalidPrefixes.includes(firstTwo)) {
    return false;
  }
  
  return true;
};

/**
 * Validates a UK tax code
 * Common formats include: 1257L, K497, BR, 0T, etc.
 */
export const validateTaxCode = (taxCode: string): boolean => {
  // Remove any spaces and convert to uppercase
  const cleanTaxCode = taxCode.replace(/\s/g, "").toUpperCase();
  
  // Special tax codes without numbers
  const specialTaxCodes = ["BR", "D0", "D1", "NT", "0T"];
  if (specialTaxCodes.includes(cleanTaxCode)) {
    return true;
  }
  
  // Emergency tax codes
  if (/^(1257|1250)[LPT]X?$/.test(cleanTaxCode)) {
    return true;
  }
  
  // Standard tax codes: optional K prefix, 1-4 digits, followed by a letter (usually L, M, N, T)
  if (/^(K)?[0-9]{1,4}[A-Z]$/.test(cleanTaxCode)) {
    return true;
  }
  
  // Scottish tax codes (S prefix)
  if (/^S[0-9]{1,4}[A-Z]$/.test(cleanTaxCode)) {
    return true;
  }
  
  // Welsh tax codes (C prefix)
  if (/^C[0-9]{1,4}[A-Z]$/.test(cleanTaxCode)) {
    return true;
  }
  
  return false;
};

/**
 * Validates a UK postcode
 * Format: Outward code + space + inward code (e.g., SW1A 1AA)
 */
export const validatePostcode = (postcode: string): boolean => {
  // Remove any spaces and convert to uppercase
  const cleanPostcode = postcode.replace(/\s/g, "").toUpperCase();
  
  // UK postcode regex pattern
  // Format: One or two letters, followed by one or two digits, optionally followed by a letter,
  // followed by one digit and two letters
  const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]?[0-9][A-Z]{2}$/;
  
  return postcodeRegex.test(cleanPostcode);
};
