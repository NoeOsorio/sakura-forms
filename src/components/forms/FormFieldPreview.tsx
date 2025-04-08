import React, { useRef } from 'react';
import { 
  FormField, 
  FieldType, 
  FieldWithOptions, 
  ScaleField, 
  FileField,
  DateTimeField
} from '../../types/form';
import SignaturePad from 'react-signature-canvas';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface FormFieldPreviewProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
  error: string;
}

const FormFieldPreview = ({ field, value, onChange, error }: FormFieldPreviewProps) => {
  const signaturePadRef = useRef<SignaturePad>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (field.type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      onChange(checkbox.checked ? 'true' : 'false');
    } else if (field.type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      if (fileInput.files?.length) {
        onChange(fileInput.files[0].name);
      }
    } else {
      onChange(e.target.value);
    }
  };

  const handleSignatureEnd = () => {
    if (signaturePadRef.current) {
      const dataUrl = signaturePadRef.current.toDataURL();
      onChange(dataUrl);
    }
  };

  const clearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
      onChange('');
    }
  };

  const renderField = () => {
    const min = field.type === 'scale' ? (field as ScaleField).minValue || 1 : 1;
    const max = field.type === 'scale' ? (field as ScaleField).maxValue || 10 : 10;
    const currentValue = field.type === 'scale' ? (parseInt(value) || min) : 1;

    const defaultPlaceholders: Record<FieldType, string> = {
      text: 'Escribe tu respuesta...',
      textarea: 'Escribe tu respuesta detallada aquí...',
      email: 'ejemplo@correo.com',
      tel: '(123) 456-7890',
      number: '0',
      date: '',
      time: '',
      datetime: '',
      select: '',
      radio: '',
      checkbox: '',
      scale: '',
      file: '',
      signature: ''
    };

    const getPlaceholder = () => {
      return field.placeholder || defaultPlaceholders[field.type] || '';
    };

    const defaultInputClasses = "w-full px-4 py-3 border border-gray-200 rounded-lg bg-white transition-all duration-200 ease-in-out focus:ring-1 focus:ring-teal-500 focus:border-teal-500 hover:border-gray-300";

    switch (field.type) {
      case 'date':
        return (
          <input
            type="date"
            value={value}
            onChange={handleChange}
            className={defaultInputClasses}
            min={(field as DateTimeField).min}
            max={(field as DateTimeField).max}
          />
        );

      case 'checkbox':
        return (
          <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <input
              type="checkbox"
              id={`field-${field.id}`}
              checked={value === 'true'}
              onChange={(e) => onChange(e.target.checked ? 'true' : 'false')}
              className="w-4 h-4 mt-1 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
            />
            <div>
              <label htmlFor={`field-${field.id}`} className="block font-medium text-gray-800 cursor-pointer">
                {field.label}
                {field.required && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600">
                    Requerido
                  </span>
                )}
              </label>
              {field.description && (
                <p className="text-sm text-gray-500 mt-0.5">{field.description}</p>
              )}
            </div>
          </div>
        );

      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={handleChange}
            placeholder={getPlaceholder()}
            className={`${defaultInputClasses} min-h-[120px]`}
            rows={5}
          />
        );

      case 'time':
        return (
          <input
            type="time"
            value={value}
            onChange={handleChange}
            className={defaultInputClasses}
          />
        );

      case 'datetime':
        return (
          <input
            type="datetime-local"
            value={value}
            onChange={handleChange}
            className={defaultInputClasses}
          />
        );

      case 'select':
        return (
          <select
            value={value}
            onChange={handleChange}
            className={`${defaultInputClasses} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"%3E%3Cpath stroke="%236B7280" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 8l4 4 4-4"/%3E%3C/svg%3E')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:1.5em_1.5em]`}
          >
            <option value="">Selecciona una opción...</option>
            {(field as FieldWithOptions).options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {(field as FieldWithOptions).options?.map((option, index) => (
              <div key={index} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <input
                  type="radio"
                  id={`option-${field.id}-${index}`}
                  name={`field-${field.id}`}
                  value={option}
                  checked={value === option}
                  onChange={() => onChange(option)}
                  className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                />
                <label htmlFor={`option-${field.id}-${index}`} className="ml-3 text-gray-700 text-sm select-none cursor-pointer">
                  {option}
                </label>
              </div>
            ))}
          </div>
        );

      case 'scale':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((num) => (
                <label
                  key={num}
                  className={`flex flex-col items-center cursor-pointer transition-colors
                    ${currentValue === num ? 'text-teal-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <input
                    type="radio"
                    name={`scale-${field.id}`}
                    value={num}
                    checked={currentValue === num}
                    onChange={(e) => onChange(e.target.value)}
                    className="sr-only"
                  />
                  <span className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm
                    ${currentValue === num 
                      ? 'bg-teal-50 text-teal-600 ring-2 ring-teal-500' 
                      : 'bg-gray-50 hover:bg-gray-100'}`}
                  >
                    {num}
                  </span>
                </label>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Mínimo</span>
              <span>Máximo</span>
            </div>
          </div>
        );

      case 'file':
        return (
          <div className="space-y-4">
            <div className="relative">
              <input
                type="file"
                onChange={handleChange}
                accept={(field as FileField).allowedTypes?.join(',')}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4
                  file:rounded-lg file:border-0 file:text-sm file:font-medium
                  file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100
                  border border-gray-200 rounded-lg focus:outline-none focus:ring-2 
                  focus:ring-teal-500 focus:border-teal-500 p-2"
              />
            </div>
            {(field as FileField).allowedTypes && (field as FileField).allowedTypes.length > 0 && (
              <p className="text-sm text-gray-500 px-2">
                Tipos permitidos: {(field as FileField).allowedTypes.map(type => 
                  type === 'image/*' ? 'Imágenes'
                  : type === 'application/pdf' ? 'PDF'
                  : type === '.doc,.docx' ? 'Word'
                  : 'Excel'
                ).join(', ')}
              </p>
            )}
            {value && (
              <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                <span>Archivo seleccionado:</span>
                <span className="font-medium text-gray-800">{value}</span>
              </div>
            )}
          </div>
        );

      case 'signature':
        return (
          <div className="space-y-3">
            <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-white">
              <SignaturePad
                ref={signaturePadRef}
                onEnd={handleSignatureEnd}
                canvasProps={{
                  className: "w-full h-48"
                }}
                backgroundColor="rgb(255, 255, 255)"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={clearSignature}
                className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2
                  hover:bg-gray-100 rounded-lg transition-colors"
              >
                Limpiar firma
              </button>
            </div>
            {value && (
              <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                Firma guardada correctamente
              </div>
            )}
          </div>
        );

      default:
        return (
          <input
            type={field.type}
            value={value}
            onChange={handleChange}
            placeholder={getPlaceholder()}
            className={defaultInputClasses}
          />
        );
    }
  };

  return (
    <div className="space-y-4">
      {field.type !== 'checkbox' ? (
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2 mb-1">
            <label className="block font-medium text-gray-800">
              {field.label}
            </label>
            {field.required && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600">
                Requerido
              </span>
            )}
          </div>
          {field.description && (
            <p className="text-sm text-gray-500">{field.description}</p>
          )}
        </div>
      ) : null}

      <div>
        {renderField()}
      </div>

      {error && (
        <div className="text-sm text-red-600 mt-2 flex items-start gap-2">
          <ExclamationCircleIcon className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FormFieldPreview; 