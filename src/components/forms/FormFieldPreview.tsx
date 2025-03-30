import React from 'react';
import { FormField } from '../../types';

interface FormFieldPreviewProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
  error: string;
}

const FormFieldPreview = ({ field, value, onChange, error }: FormFieldPreviewProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium text-gray-700">
        {field.label}
        {field.required && <span className="ml-1 text-red-500">*</span>}
      </label>
      
      {field.type === 'textarea' ? (
        <textarea
          value={value}
          onChange={handleChange}
          placeholder={field.placeholder}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 neomorphic-inset"
          rows={4}
        />
      ) : field.type === 'select' ? (
        <select
          value={value}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Selecciona una opción...</option>
          {field.options?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : field.type === 'radio' ? (
        <div className="space-y-2">
          {field.options?.map((option, index) => (
            <div key={index} className="flex items-center">
              <input
                type="radio"
                id={`option-${index}`}
                name={`field-${field.id}`}
                value={option}
                checked={value === option}
                onChange={() => onChange(option)}
                className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor={`option-${index}`} className="text-gray-700">
                {option}
              </label>
            </div>
          ))}
        </div>
      ) : (
        <input
          type={field.type}
          value={value}
          onChange={handleChange}
          placeholder={field.placeholder}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 neomorphic-inset"
        />
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormFieldPreview; 