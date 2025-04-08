import { Form } from '../../types/form';
import FormCard from './FormCard';
import Button from '../shared/Button';

interface FormsListProps {
  forms: Form[];
  onDelete: (id: string) => void;
  onShare: (id: string) => void;
  onDuplicate: (id: string) => void;
  onClearFilters: () => void;
  isDeleting?: boolean;
}

const FormsList = ({
  forms,
  onDelete,
  onShare,
  onDuplicate,
  onClearFilters,
  isDeleting,
}: FormsListProps) => {
  if (forms.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <p className="text-gray-500 mb-4">No se encontraron formularios</p>
        <Button variant="outline" onClick={onClearFilters}>
          Limpiar filtros
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {forms.map((form) => (
        <FormCard
          key={form.id}
          form={form}
          onShare={() => onShare(form.id)}
          onDelete={() => onDelete(form.id)}
          onDuplicate={() => onDuplicate(form.id)}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
};

export default FormsList; 