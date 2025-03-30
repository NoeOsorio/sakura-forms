import FormBuilder from '../components/forms/FormBuilder';

const FormBuilderPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Crear Nuevo Formulario</h1>
      </div>
      
      <FormBuilder />
    </div>
  );
};

export default FormBuilderPage; 