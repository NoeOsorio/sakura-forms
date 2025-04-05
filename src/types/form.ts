// Tipos base para campos
export type FieldType = 
  | 'text'
  | 'textarea'
  | 'email'
  | 'tel'
  | 'number'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'time'
  | 'datetime'
  | 'scale'
  | 'file'
  | 'signature';

// Tipos de valores que puede tener un campo
export type FieldValue = string | number | boolean | File | null;

// Interfaz base para un campo de formulario
export interface BaseField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  description?: string;
  placeholder?: string;
  options?: string[];
}

// Interfaz para campos con opciones
export interface FieldWithOptions extends BaseField {
  type: 'select' | 'radio';
  options: string[];
  multiple?: boolean;
}

// Interfaz para campos numéricos
export interface NumericField extends BaseField {
  type: 'number';
  minValue?: number;
  maxValue?: number;
  step?: number;
}

// Interfaz para campos de archivo
export interface FileField extends BaseField {
  type: 'file';
  allowedTypes: string[];
  maxSize?: number;
}

// Interfaz para campos de fecha/hora
export interface DateTimeField extends BaseField {
  type: 'date' | 'time' | 'datetime';
  min?: string;
  max?: string;
}

// Interfaz para campos de texto
export interface TextField extends BaseField {
  type: 'text' | 'textarea' | 'email' | 'tel';
  maxLength?: number;
}

// Interfaz para campos de checkbox
export interface CheckboxField extends BaseField {
  type: 'checkbox';
  checked?: boolean;
}

// Interfaz para campos de escala
export interface ScaleField extends BaseField {
  type: 'scale';
  minValue: number;
  maxValue: number;
  step?: number;
}

// Interfaz para campos de firma
export interface SignatureField extends BaseField {
  type: 'signature';
}

// Unión de todos los tipos de campos
export type FormField = 
  | TextField
  | NumericField
  | DateTimeField
  | FieldWithOptions
  | CheckboxField
  | ScaleField
  | FileField
  | SignatureField;

// Interfaz para el formulario
export interface Form {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  created_at: string;
  updated_at: string;
  user_id: string;
  is_template: boolean;
  is_active: boolean;
  category?: string;
}

// Interfaz para las respuestas del formulario
export interface FormResponse {
  id: string;
  form_id: string;
  user_id: string;
  responses: Record<string, FieldValue>;
  created_at: string;
  updated_at: string;
}

// Interfaz para crear un formulario
export interface CreateFormInput {
  title: string;
  description?: string;
  fields: FormField[];
  is_template?: boolean;
  is_active?: boolean;
  category?: string;
}

// Interfaz para actualizar un formulario
export interface UpdateFormInput {
  title?: string;
  description?: string;
  fields?: FormField[];
  is_template?: boolean;
  is_active?: boolean;
  category?: string;
} 