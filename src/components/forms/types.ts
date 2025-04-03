import { FieldType } from '../../types/field';

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
  allowedTypes?: string[];
  minValue?: number;
  maxValue?: number;
}

export interface FormValues {
  [key: string]: string | boolean;
}

export interface FormErrors {
  [key: string]: string;
} 