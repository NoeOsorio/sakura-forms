export type FieldType = 
  | 'text' 
  | 'email' 
  | 'phone' 
  | 'number' 
  | 'checkbox' 
  | 'radio' 
  | 'select' 
  | 'textarea' 
  | 'date'
  | 'scale'
  | 'file'
  | 'signature';

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  errorMessage?: string;
  formatErrorMessage?: string;
  options?: string[];
  description?: string;
}

export interface FormValues {
  [key: string]: string | boolean;
}

export interface FormErrors {
  [key: string]: string;
} 