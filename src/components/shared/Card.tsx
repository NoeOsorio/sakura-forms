import { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'raised' | 'inset' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = ({ 
  title, 
  children, 
  className = '',
  variant = 'default',
  padding = 'md'
}: CardProps) => {
  // Mapeo de variantes a clases
  const variantClasses = {
    default: 'bg-white shadow-sm',
    raised: 'bg-white neomorphic-raised',
    inset: 'bg-white neomorphic-inset',
    glass: 'glass backdrop-blur-sm bg-white/80 shadow-lg'
  };
  
  // Mapeo de padding a clases
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8'
  };
  
  return (
    <div 
      className={`
        rounded-xl border border-gray-100/40
        transition-all duration-300 ease-in-out
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${className}
      `}
    >
      {title && (
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};

export default Card; 