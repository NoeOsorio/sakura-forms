export type FieldType = 'text' | 'email' | 'number' | 'phone' | 'textarea' | 'date' | 'select' | 'radio' | 'checkbox' | 'scale' | 'file' | 'signature';

export interface FormField {
  id: number;
  type: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  description?: string;
  minValue?: number;  // Para campos scale
  maxValue?: number;  // Para campos scale
  allowedTypes?: string[];  // Para campos file (e.g. ['image/*', 'application/pdf'])
}

export interface FormFieldPreviewProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
  error: string;
}

export interface FormFieldPropertiesProps {
  field: FormField;
  onChange: (updatedField: Partial<FormField>) => void;
  removeField: () => void;
} 