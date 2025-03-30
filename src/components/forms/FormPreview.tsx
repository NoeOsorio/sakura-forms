import Button from '../shared/Button';

type FieldType = 
  | 'text' 
  | 'email' 
  | 'phone' 
  | 'number' 
  | 'checkbox' 
  | 'radio' 
  | 'select' 
  | 'textarea' 
  | 'date'
  | 'scale'
  | 'file'
  | 'signature';

interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  description?: string;
}

interface FormPreviewProps {
  title: string;
  description: string;
  fields: FormField[];
  currentStep: number;
  onStepChange: (step: number) => void;
}

const FormPreview = ({
  title,
  description,
  fields,
  currentStep,
  onStepChange
}: FormPreviewProps) => {
  // Logic to divide fields into steps (1 field per step for Typeform-like experience)
  const totalSteps = fields.length > 0 ? fields.length + 1 : 1; // +1 for the intro page
  
  const handlePrevStep = () => {
    if (currentStep > 0) {
      onStepChange(currentStep - 1);
    }
  };
  
  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      onStepChange(currentStep + 1);
    }
  };
  
  // Render the intro page (first step)
  if (currentStep === 0) {
    return (
      <div className="flex flex-col items-center text-center py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{title || 'Nuevo Formulario'}</h1>
        {description && <p className="text-gray-600 mb-8">{description}</p>}
        <Button onClick={handleNextStep}>Comenzar</Button>
      </div>
    );
  }
  
  // Get the current field to display
  const currentField = fields[currentStep - 1];
  
  // If there are no fields yet, show a message
  if (!currentField) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Añade campos a tu formulario para ver la vista previa</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
        <div
          className="bg-teal-500 h-1"
          style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
        ></div>
      </div>
      
      {/* Field label and description */}
      <div>
        <h2 className="text-xl font-medium text-gray-800 mb-1">
          {currentField.label}
          {currentField.required && <span className="text-red-500 ml-1">*</span>}
        </h2>
        {currentField.description && (
          <p className="text-gray-600 text-sm">{currentField.description}</p>
        )}
      </div>
      
      {/* Field input based on type */}
      <div className="space-y-4">
        {renderFieldInput(currentField)}
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={handlePrevStep}>Anterior</Button>
        <Button onClick={handleNextStep}>
          {currentStep === totalSteps - 1 ? 'Enviar' : 'Siguiente'}
        </Button>
      </div>
    </div>
  );
};

// Helper function to render the appropriate input based on field type
const renderFieldInput = (field: FormField) => {
  switch (field.type) {
    case 'text':
      return (
        <input
          type="text"
          placeholder={field.placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      );
      
    case 'textarea':
      return (
        <textarea
          placeholder={field.placeholder}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      );
      
    case 'email':
      return (
        <input
          type="email"
          placeholder={field.placeholder || 'correo@ejemplo.com'}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      );
      
    case 'phone':
      return (
        <input
          type="tel"
          placeholder={field.placeholder || '(123) 456-7890'}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      );
      
    case 'number':
      return (
        <input
          type="number"
          placeholder={field.placeholder || '0'}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      );
      
    case 'date':
      return (
        <input
          type="date"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      );
      
    case 'checkbox':
      return (
        <div className="space-y-2">
          {field.options?.map((option, index) => (
            <label key={index} className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 mr-2"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      );
      
    case 'radio':
      return (
        <div className="space-y-2">
          {field.options?.map((option, index) => (
            <label key={index} className="flex items-center">
              <input
                type="radio"
                name={`field-${field.id}`}
                className="border-gray-300 text-teal-600 focus:ring-teal-500 mr-2"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      );
      
    case 'select':
      return (
        <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
          <option value="">Seleccionar...</option>
          {field.options?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
      
    case 'scale':
      return (
        <div className="flex justify-between space-x-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
            <button
              key={value}
              className="w-10 h-10 rounded-full border-2 border-teal-200 flex items-center justify-center hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {value}
            </button>
          ))}
        </div>
      );
      
    case 'file':
      return (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <p className="text-gray-500 mb-2">Haz clic para subir un archivo</p>
          <p className="text-gray-400 text-sm">O arrastra y suelta aquí</p>
          <input
            type="file"
            className="hidden"
          />
        </div>
      );
      
    case 'signature':
      return (
        <div className="border-2 border-gray-300 rounded-lg h-40 flex items-center justify-center bg-gray-50">
          <p className="text-gray-500">Haz clic para firmar</p>
        </div>
      );
      
    default:
      return null;
  }
};

export default FormPreview; 