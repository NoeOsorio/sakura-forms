import React from 'react';
import { useParams } from 'react-router-dom';
import { MedicalFormPreview } from '../components/forms';
import { useQuery } from '@tanstack/react-query';
import { formService } from '../services/formService';
import { transformFormFieldsToUI } from '../services/formService';
import { toast } from 'react-hot-toast';

const PublicFormView: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: form, isLoading } = useQuery({
    queryKey: ['public-form', id],
    queryFn: () => formService.getFormById(id || ''),
    enabled: !!id,
  });

  const handleComplete = async (responses: Record<string, string>) => {
    try {
      await formService.saveResponse(id || '', responses);
      toast.success('¡Formulario enviado exitosamente!');
      // Aquí podríamos redirigir a una página de confirmación o mostrar un mensaje
    } catch (error) {
      console.error('Error al guardar la respuesta:', error);
      toast.error('Error al enviar el formulario. Por favor, intente nuevamente.');
    }
  };

  if (isLoading || !form) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando formulario...</p>
        </div>
      </div>
    );
  }

  const formattedFields = transformFormFieldsToUI(form.fields);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl mx-auto px-3 py-2 sm:px-4 sm:py-4 md:px-6">
        <MedicalFormPreview 
          title={form.title}
          description={form.description || ''}
          fields={formattedFields}
          onComplete={handleComplete}
          isPublic={true}
        />
      </div>
    </div>
  );
};

export default PublicFormView; 