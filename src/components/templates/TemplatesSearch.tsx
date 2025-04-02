import Card from '../shared/Card';
import SearchBar from '../shared/SearchBar';
import FilterButton from '../forms/FilterButton';

interface TemplatesSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  categories: string[];
}

const TemplatesSearch = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}: TemplatesSearchProps) => {
  return (
    <Card>
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex-grow max-w-md">
          <SearchBar
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="Buscar plantillas..."
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <FilterButton 
            isActive={selectedCategory === null}
            onClick={() => onCategoryChange(null)}
          >
            Todas
          </FilterButton>
          {categories.map(category => (
            <FilterButton
              key={category}
              isActive={selectedCategory === category}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </FilterButton>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TemplatesSearch; 