
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

/**
 * Validates a UK bank account number
 * Format: 8 digits (e.g., 12345678)
 */
export const validateBankAccount = (accountNumber: string): boolean => {
  // Remove any spaces or hyphens
  const cleanAccount = accountNumber.replace(/[\s-]/g, "");
  
  // UK bank account numbers are 8 digits
  return /^\d{8}$/.test(cleanAccount);
};

/**
 * Validates a UK sort code
 * Format: 6 digits, often displayed as XX-XX-XX (e.g., 12-34-56)
 */
export const validateSortCode = (sortCode: string): boolean => {
  // Remove any spaces or hyphens
  const cleanSortCode = sortCode.replace(/[\s-]/g, "");
  
  // UK sort codes are 6 digits
  return /^\d{6}$/.test(cleanSortCode);
};

/**
 * Determines if a National Insurance category is for Freeport/Investment Zone
 * (Categories F, I, L, S, V indicate special treatment)
 */
export const isFreeportOrInvestmentZoneCategory = (niCategory: string): boolean => {
  const specialCategories = ["F", "I", "L", "S", "V"];
  return specialCategories.includes(niCategory);
};

/**
 * Validates that all required fields are present based on conditional logic
 */
export const validateEmployeeData = (employeeData: any): {isValid: boolean, errors: Record<string, string>} => {
  const errors: Record<string, string> = {};
  
  // Check conditional requirements
  
  // 1. If National Insurance Number is blank, home address is required
  if (!employeeData.personal.niNumber || employeeData.personal.niNumber === "") {
    if (!employeeData.personal.address.line1 || employeeData.personal.address.line1 === "") {
      errors["address.line1"] = "Address is required when NI number is not provided";
    }
    if (!employeeData.personal.address.postcode || employeeData.personal.address.postcode === "") {
      errors["address.postcode"] = "Postcode is required when NI number is not provided";
    }
  }
  
  // 2. If student loan is true, student loan plan is required
  if (employeeData.payroll.hasStudentLoan && 
      (!employeeData.payroll.studentLoanPlan || employeeData.payroll.studentLoanPlan === "")) {
    errors["studentLoanPlan"] = "Student loan plan is required when student loan is selected";
  }
  
  // 3. If NI category is Freeport/IZ, workplace postcode is required
  if (isFreeportOrInvestmentZoneCategory(employeeData.payroll.niCategory) && 
      (!employeeData.payroll.workplacePostcode || employeeData.payroll.workplacePostcode === "")) {
    errors["workplacePostcode"] = "Workplace postcode is required for this NI category";
  }
  
  // 4. If payment method is bacs, bank details are required
  if (employeeData.bankInfo.paymentMethod === "bank-transfer") {
    if (!employeeData.bankInfo.accountName || employeeData.bankInfo.accountName === "") {
      errors["accountName"] = "Account name is required for bank transfers";
    }
    if (!employeeData.bankInfo.accountNumber || employeeData.bankInfo.accountNumber === "") {
      errors["accountNumber"] = "Account number is required for bank transfers";
    }
    if (!employeeData.bankInfo.sortCode || employeeData.bankInfo.sortCode === "") {
      errors["sortCode"] = "Sort code is required for bank transfers";
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
