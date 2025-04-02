import Button from '../shared/Button';
import Card from '../shared/Card';

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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Buscar formularios..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant={filterActive === null ? 'primary' : 'outline'} 
            onClick={() => onFilterChange(null)}
            className="text-sm px-3"
          >
            Todos
          </Button>
          <Button 
            variant={filterActive === true ? 'primary' : 'outline'} 
            onClick={() => onFilterChange(true)}
            className="text-sm px-3"
          >
            Activos
          </Button>
          <Button 
            variant={filterActive === false ? 'primary' : 'outline'} 
            onClick={() => onFilterChange(false)}
            className="text-sm px-3"
          >
            Inactivos
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FormsSearch; 