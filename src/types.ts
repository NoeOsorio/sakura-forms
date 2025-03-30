export type FieldType = 'text' | 'email' | 'number' | 'phone' | 'textarea' | 'date' | 'select' | 'radio';

export interface FormField {
  id: number;
  type: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
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