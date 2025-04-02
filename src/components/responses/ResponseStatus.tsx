interface ResponseStatusProps {
  status: 'Completado' | 'Parcial';
}

const ResponseStatus = ({ status }: ResponseStatusProps) => {
  const getStatusStyles = () => {
    if (status === 'Completado') {
      return 'bg-green-100 text-green-800';
    }
    return 'bg-yellow-100 text-yellow-800';
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyles()}`}>
      {status}
    </span>
  );
};

export default ResponseStatus; 