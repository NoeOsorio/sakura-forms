import Card from '../shared/Card';
import SearchBar from '../shared/SearchBar';
import FilterButton from './FilterButton';

interface FormsSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterActive: boolean | null;
  onFilterChange: (value: boolean | null) => void;
}

const FormsSearch = ({
  searchTerm,
  onSearchChange,
  filterActive,
  onFilterChange,
}: FormsSearchProps) => {
  return (
    <Card>
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="w-full sm:w-80">
          <SearchBar
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="Buscar formularios..."
          />
        </div>
        
        <div className="flex gap-2">
          <FilterButton 
            isActive={filterActive === null}
            onClick={() => onFilterChange(null)}
          >
            Todos
          </FilterButton>
          <FilterButton 
            isActive={filterActive === true}
            onClick={() => onFilterChange(true)}
          >
            Activos
          </FilterButton>
          <FilterButton 
            isActive={filterActive === false}
            onClick={() => onFilterChange(false)}
          >
            Inactivos
          </FilterButton>
        </div>
      </div>
    </Card>
  );
};

export default FormsSearch; 