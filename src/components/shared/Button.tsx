import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className = '',
  iconLeft,
  iconRight,
  ...props
}) => {
  // Mapeo de variantes a clases
  const variantClasses = {
    primary: `bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md 
              hover:from-indigo-700 hover:to-indigo-800 active:shadow-inner
              focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`,
              
    secondary: `bg-white text-indigo-700 border border-indigo-200 shadow-sm
                hover:bg-indigo-50 active:bg-indigo-100 active:shadow-inner
                focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`,
                
    outline: `bg-transparent text-indigo-700 border border-indigo-300
              hover:bg-indigo-50 active:bg-indigo-100 active:shadow-inner
              focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`,
              
    danger: `bg-gradient-to-r from-rose-600 to-rose-700 text-white shadow-md
             hover:from-rose-700 hover:to-rose-800 active:shadow-inner
             focus:ring-2 focus:ring-rose-500 focus:ring-offset-2`,
             
    ghost: `bg-transparent text-indigo-700 hover:bg-indigo-50 
            active:bg-indigo-100 focus:ring-2 focus:ring-indigo-500`
  };

  // Mapeo de tamaños a clases
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  // Estado deshabilitado
  const disabledClasses = (disabled || isLoading) 
    ? 'opacity-60 cursor-not-allowed' 
    : 'transform hover:-translate-y-0.5 active:translate-y-0';

  return (
    <button
      disabled={disabled || isLoading}
      className={`
        relative inline-flex items-center justify-center rounded-lg font-medium
        transition-all duration-200 ease-in-out outline-none
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabledClasses}
        ${className}
      `}
      {...props}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg 
            className="w-5 h-5 animate-spin" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </span>
      )}
      <span className={`flex items-center ${isLoading ? 'invisible' : ''}`}>
        {iconLeft && <span className="mr-2">{iconLeft}</span>}
        {children}
        {iconRight && <span className="ml-2">{iconRight}</span>}
      </span>
    </button>
  );
};

export default Button; 