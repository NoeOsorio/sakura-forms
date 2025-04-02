import { Form } from '../../hooks/useResponses';
import Card from '../shared/Card';

interface FormsSidebarProps {
  forms: Form[];
  selectedFormId: number | null;
  onFormSelect: (formId: number | null) => void;
}

const FormsSidebar = ({
  forms,
  selectedFormId,
  onFormSelect,
}: FormsSidebarProps) => {
  return (
    <Card className="sticky top-20">
      <h2 className="text-lg font-semibold mb-4">Formularios</h2>
      <ul className="space-y-2">
        <li>
          <button
            className={`w-full text-left px-3 py-2 rounded-md ${
              selectedFormId === null ? 'bg-teal-100 text-teal-800' : 'hover:bg-gray-100'
            }`}
            onClick={() => onFormSelect(null)}
          >
            Todos los formularios
          </button>
        </li>
        {forms.map(form => (
          <li key={form.id}>
            <button
              className={`w-full text-left px-3 py-2 rounded-md ${
                selectedFormId === form.id ? 'bg-teal-100 text-teal-800' : 'hover:bg-gray-100'
              }`}
              onClick={() => onFormSelect(form.id)}
            >
              <div className="font-medium">{form.title}</div>
              <div className="text-sm text-gray-500">{form.responses} respuestas</div>
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default FormsSidebar; 