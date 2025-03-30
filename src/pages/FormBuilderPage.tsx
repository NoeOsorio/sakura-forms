import { useParams } from 'react-router-dom';
import FormBuilder from '../components/forms/FormBuilder';

interface FormBuilderPageProps {
  isNew?: boolean;
}

const FormBuilderPage = ({ isNew = true }: FormBuilderPageProps) => {
  const { formId } = useParams();
  
  return (
    <div className="h-full -mx-6">
      <FormBuilder 
        isNew={isNew} 
        formId={formId ? parseInt(formId) : undefined}
      />
    </div>
  );
};

export default FormBuilderPage; 