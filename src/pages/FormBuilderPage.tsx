import MedicalFormBuilder from '../components/forms/MedicalFormBuilder';

interface FormBuilderPageProps {
  isNew?: boolean;
}

const FormBuilderPage = ({ isNew = true }: FormBuilderPageProps) => {
  return (
    <div className="h-screen flex flex-col">
      <MedicalFormBuilder />
    </div>
  );
};

export default FormBuilderPage; 