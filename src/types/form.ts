import { FieldType } from './field';

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  description?: string;
  required: boolean;
  options?: string[];
  minValue?: number;
  maxValue?: number;
  allowedTypes?: string[];
  order: number;
  placeholder?: string;
}

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

export interface FormResponse {
  id: string;
  form_id: string;
  user_id: string;
  responses: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface CreateFormInput {
  title: string;
  description?: string;
  fields: Omit<FormField, 'id'>[];
  user_id: string;
  is_template?: boolean;
  is_active?: boolean;
  category?: string;
}

export interface UpdateFormInput {
  title?: string;
  description?: string;
  fields?: Omit<FormField, 'id'>[];
  is_template?: boolean;
  is_active?: boolean;
  category?: string;
} 