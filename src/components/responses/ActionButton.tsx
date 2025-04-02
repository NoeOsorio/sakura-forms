import Button from '../shared/Button';

interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const ActionButton = ({ onClick, children }: ActionButtonProps) => {
  return (
    <Button 
      variant="outline" 
      className="text-sm px-3 py-1.5"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default ActionButton; 