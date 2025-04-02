import { Form } from '../../hooks/useForms';
import FormCard from './FormCard';
import Button from '../shared/Button';

interface FormsListProps {
  forms: Form[];
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onClearFilters: () => void;
}

const FormsList = ({
  forms,
  onView,
  onEdit,
  onDelete,
  onClearFilters,
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
          id={form.id}
          title={form.title}
          description={form.description}
          responseCount={form.responseCount}
          lastUpdated={form.lastUpdated}
          isActive={form.isActive}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default FormsList; 