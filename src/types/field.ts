export type FieldType = 
  | 'text'
  | 'textarea'
  | 'email'
  | 'phone'
  | 'number'
  | 'date'
  | 'time'
  | 'datetime'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'scale'
  | 'file'
  | 'signature';

export interface BaseFieldProps {
  label: string;
  description?: string;
  required: boolean;
}

export interface TextFieldProps extends BaseFieldProps {
  type: 'text' | 'textarea' | 'email' | 'phone';
  placeholder?: string;
  maxLength?: number;
}

export interface NumberFieldProps extends BaseFieldProps {
  type: 'number';
  min?: number;
  max?: number;
  step?: number;
}

export interface DateTimeFieldProps extends BaseFieldProps {
  type: 'date' | 'time' | 'datetime';
  min?: string;
  max?: string;
}

export interface SelectFieldProps extends BaseFieldProps {
  type: 'select' | 'radio';
  options: string[];
  multiple?: boolean;
}

export interface CheckboxFieldProps extends BaseFieldProps {
  type: 'checkbox';
  checked?: boolean;
}

export interface ScaleFieldProps extends BaseFieldProps {
  type: 'scale';
  minValue: number;
  maxValue: number;
  step?: number;
}

export interface FileFieldProps extends BaseFieldProps {
  type: 'file';
  allowedTypes: string[];
  maxSize?: number;
}

export interface SignatureFieldProps extends BaseFieldProps {
  type: 'signature';
}

export type FieldProps = 
  | TextFieldProps
  | NumberFieldProps
  | DateTimeFieldProps
  | SelectFieldProps
  | CheckboxFieldProps
  | ScaleFieldProps
  | FileFieldProps
  | SignatureFieldProps; 