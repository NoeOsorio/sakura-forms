import TemplatesSearch from '../components/templates/TemplatesSearch';
import TemplatesList from '../components/templates/TemplatesList';
import { useTemplates } from '../hooks/useTemplates';

const TemplatesPage = () => {
  const {
    templates,
    categories,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    clearFilters,
  } = useTemplates();

  const handlePreview = (id: number) => {
    window.location.href = `/templates/${id}/preview`;
  };

  const handleUse = (id: number) => {
    window.location.href = `/templates/${id}/use`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Plantillas de Formularios</h1>
      </div>

      <TemplatesSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      <TemplatesList
        templates={templates}
        onPreview={handlePreview}
        onUse={handleUse}
        onClearFilters={clearFilters}
      />
    </div>
  );
};

export default TemplatesPage; 