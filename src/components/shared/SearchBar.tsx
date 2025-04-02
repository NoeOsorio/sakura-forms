interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = "Buscar..." 
}: SearchBarProps) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        className="pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
    </div>
  );
};

export default SearchBar; 