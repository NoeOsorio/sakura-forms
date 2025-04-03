import { Form } from '../../types/form';
import FormCard from './FormCard';
import Button from '../shared/Button';

interface FormsListProps {
  forms: Form[];
  onDelete: (id: string) => void;
  onClearFilters: () => void;
  isDeleting?: boolean;
}

const FormsList = ({
  forms,
  onDelete,
  onClearFilters,
  isDeleting,
}: FormsListProps) => {
  if (forms.length === 0) {
    return (
      <div className="col-span-3 text-center py-12">
        <p className="text-gray-500 text-lg">No se encontraron formularios con los filtros actuales.</p>
        <Button variant="outline" className="mt-4" onClick={onClearFilters}>
          Limpiar filtros
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {forms.map((form) => (
        <FormCard
          key={form.id}
          form={form}
          onDelete={onDelete}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
};

export default FormsList; 