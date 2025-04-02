interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  disabled?: boolean;
  placeholder?: string;
}

const Select = ({ value, onChange, options, disabled = false, placeholder = 'Seleccionar...' }: SelectProps) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`
        block w-full px-3 py-2 rounded-md
        bg-white border border-gray-300
        focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500
        ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'cursor-pointer'}
        text-gray-900 placeholder-gray-400
        transition-colors duration-200
      `}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select; 