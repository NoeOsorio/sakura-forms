import Button from '../shared/Button';

interface FilterButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const FilterButton = ({ isActive, onClick, children }: FilterButtonProps) => {
  return (
    <Button 
      variant={isActive ? 'primary' : 'outline'} 
      onClick={onClick}
      className="text-sm px-3"
    >
      {children}
    </Button>
  );
};

export default FilterButton; 