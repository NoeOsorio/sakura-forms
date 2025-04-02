import { Response, Form } from '../../hooks/useResponses';
import ResponseStatus from './ResponseStatus';
import ActionButton from './ActionButton';

interface ResponsesTableProps {
  responses: Response[];
  forms: Form[];
  selectedFormId: number | null;
  onViewDetails: (responseId: number) => void;
}

const ResponsesTable = ({
  responses,
  forms,
  selectedFormId,
  onViewDetails,
}: ResponsesTableProps) => {
  if (responses.length === 0) {
    return (
      <tr>
        <td colSpan={selectedFormId === null ? 7 : 6} className="py-4 text-center text-gray-500">
          No se encontraron respuestas con los filtros actuales.
        </td>
      </tr>
    );
  }

  return (
    <>
      {responses.map((response) => (
        <tr key={response.id} className="border-b hover:bg-gray-50">
          <td className="py-3">{response.id}</td>
          {selectedFormId === null && (
            <td className="py-3">
              {forms.find(f => f.id === response.formId)?.title}
            </td>
          )}
          <td className="py-3">{response.name}</td>
          <td className="py-3">{response.email}</td>
          <td className="py-3">{response.date}</td>
          <td className="py-3">
            <ResponseStatus status={response.status} />
          </td>
          <td className="py-3 text-right">
            <ActionButton onClick={() => onViewDetails(response.id)}>
              Ver Detalles
            </ActionButton>
          </td>
        </tr>
      ))}
    </>
  );
};

export default ResponsesTable; 