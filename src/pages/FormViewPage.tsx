import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MedicalFormPreview } from '../components/forms';
import { useQuery } from '@tanstack/react-query';
import { formService } from '../services/formService';
import { transformFormFieldsToUI } from '../services/formService';

const FormViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: form, isLoading } = useQuery({
    queryKey: ['form', id],
    queryFn: () => formService.getFormById(id || ''),
    enabled: !!id,
  });

  const handleComplete = () => {
    // Aquí iría la lógica para guardar los datos del formulario
    navigate('/forms');
  };

  if (isLoading || !form) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <p className="text-gray-500">Cargando formulario...</p>
          </div>
        </div>
      </div>
    );
  }

  const formattedFields = transformFormFieldsToUI(form.fields);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <MedicalFormPreview 
          title={form.title}
          description={form.description || ''}
          fields={formattedFields}
          onComplete={handleComplete}
          onBack={() => navigate('/forms')}
        />
      </div>
    </div>
  );
};

export default FormViewPage; 