import { FormField } from '.';

// Validate field by type
export const validateFieldFormat = (field: FormField, value: string): boolean => {
  if (!value) return true; // Empty values are handled by required validation
  
  switch (field.type) {
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    case 'phone':
      return /^[0-9\s\-+()]{7,15}$/.test(value);
    case 'number':
      return /^-?\d*\.?\d+$/.test(value);
    default:
      return true;
  }
};

// Complete field validation (required + format)
export const validateField = (field: FormField, value: string | boolean): { isValid: boolean, formatError: boolean } => {
  // Required validation
  if (field.required && (value === undefined || value === '' || value === false)) {
    return { isValid: false, formatError: false };
  }
  
  // Format validation (only applies to string values)
  if (typeof value === 'string' && !validateFieldFormat(field, value)) {
    return { isValid: false, formatError: true };
  }
  
  return { isValid: true, formatError: false };
};

// Get default error message based on field type
export const getDefaultFormatErrorMessage = (type: string): string => {
  switch (type) {
    case 'email':
      return 'Introduce un correo electrónico válido';
    case 'phone':
      return 'Introduce un número de teléfono válido';
    case 'number':
      return 'Introduce un valor numérico válido';
    default:
      return '';
  }
};

// Get field error message
export const getFieldErrorMessage = (field: FormField, errorType: string): string => {
  if (errorType === 'format') {
    return field.formatErrorMessage || getDefaultFormatErrorMessage(field.type);
  }
  return field.errorMessage || 'Campo obligatorio';
}; 