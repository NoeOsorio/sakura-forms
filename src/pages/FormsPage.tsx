import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '../components/shared/Button';
import FormsSearch from '../components/forms/FormsSearch';
import FormsList from '../components/forms/FormsList';
import { useForms } from '../hooks/useForms';

const FormsPage = () => {
  const navigate = useNavigate();
  const {
    forms,
    searchTerm,
    setSearchTerm,
    filterActive,
    setFilterActive,
    clearFilters,
  } = useForms();

  const handleView = (id: number) => {
    console.log(`Ver formulario ${id}`);
  };

  const handleEdit = (id: number) => {
    navigate(`/forms/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Eliminar formulario ${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Formularios</h1>
        <Link to="/forms/new">
          <Button>Crear Nuevo Formulario</Button>
        </Link>
      </div>

      <FormsSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterActive={filterActive}
        onFilterChange={setFilterActive}
      />

      <FormsList
        forms={forms}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onClearFilters={clearFilters}
      />
    </div>
  );
};

export default FormsPage; 