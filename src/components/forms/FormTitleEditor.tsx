interface FormTitleEditorProps {
  title: string;
  description: string;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
}

const FormTitleEditor = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}: FormTitleEditorProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
      <div className="p-6 border-l-4 border-blue-500">
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-full text-2xl font-medium mb-2 border-0 border-b border-gray-200 pb-1 focus:ring-0 focus:border-blue-500"
          placeholder="Título del formulario"
        />
        <textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className="w-full text-gray-600 border-0 focus:ring-0 resize-none"
          placeholder="Descripción del formulario"
          rows={2}
        />
      </div>
    </div>
  );
};

export default FormTitleEditor; 