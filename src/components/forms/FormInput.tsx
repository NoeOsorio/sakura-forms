import React from 'react';
import { FormField } from '../../types';

interface FormInputProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

const FormInput = ({ field, value, onChange, error, disabled = false }: FormInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  // Render de opciones para select o radio
  const renderOptions = () => {
    if (!field.options || field.options.length === 0) {
      return null;
    }

    if (field.type === 'select') {
      return (
        <select
          id={`field-${field.id}`}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={`w-full p-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 neomorphic-inset
            ${error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'}
            ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white'}`}
        >
          <option value="">Selecciona una opción</option>
          {field.options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === 'radio') {
      return (
        <div className="space-y-2">
          {field.options.map((option, index) => (
            <div key={index} className="flex items-center">
              <input
                type="radio"
                id={`option-${field.id}-${index}`}
                name={`field-${field.id}`}
                value={option}
                checked={value === option}
                onChange={() => onChange(option)}
                disabled={disabled}
                className={`h-4 w-4 focus:ring-2 focus:ring-indigo-500 border-gray-300
                  ${error ? 'border-red-500 text-red-500' : 'text-indigo-600'}
                  ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
              <label 
                htmlFor={`option-${field.id}-${index}`} 
                className={`ml-2 text-sm ${disabled ? 'text-gray-400' : 'text-gray-700'}`}
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  // Render del input basado en el tipo de campo
  const renderInput = () => {
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            id={`field-${field.id}`}
            value={value}
            onChange={handleChange}
            placeholder={field.placeholder}
            disabled={disabled}
            rows={4}
            className={`w-full p-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 neomorphic-inset
              ${error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'}
              ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white'}`}
          />
        );
      
      case 'select':
      case 'radio':
        return renderOptions();
      
      default:
        return (
          <input
            type={field.type}
            id={`field-${field.id}`}
            value={value}
            onChange={handleChange}
            placeholder={field.placeholder}
            disabled={disabled}
            className={`w-full p-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 neomorphic-inset
              ${error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'}
              ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white'}`}
          />
        );
    }
  };

  return (
    <div className="mb-4">
      <label 
        htmlFor={`field-${field.id}`} 
        className={`block mb-1 font-medium 
          ${disabled ? 'text-gray-400' : 'text-gray-700'}`}
      >
        {field.label}
        {field.required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>
      
      {renderInput()}
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FormInput; 