import { Template } from '../../hooks/useTemplates';
import TemplateCard from './TemplateCard';
import Button from '../shared/Button';

interface TemplatesListProps {
  templates: Template[];
  onPreview: (id: number) => void;
  onUse: (id: number) => void;
  onClearFilters: () => void;
}

const TemplatesList = ({
  templates,
  onPreview,
  onUse,
  onClearFilters,
}: TemplatesListProps) => {
  if (templates.length === 0) {
    return (
      <div className="col-span-full py-12 text-center text-gray-500">
        <p className="text-xl mb-2">No se encontraron plantillas</p>
        <p className="mb-4">Intenta con otros términos de búsqueda o categorías.</p>
        <Button variant="outline" onClick={onClearFilters}>
          Limpiar filtros
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map(template => (
        <TemplateCard
          key={template.id}
          template={template}
          onPreview={onPreview}
          onUse={onUse}
        />
      ))}
    </div>
  );
};

export default TemplatesList; 