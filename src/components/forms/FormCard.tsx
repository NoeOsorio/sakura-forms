import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../types/form';
import Modal from '../shared/Modal';
import Button from '../shared/Button';
import Card from '../shared/Card';

interface FormCardProps {
  form: Form;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

const FormCard: React.FC<FormCardProps> = ({ form, onDelete, isDeleting }) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleView = () => {
    navigate(`/forms/view/${form.id}`);
  };

  const handleEdit = () => {
    navigate(`/forms/${form.id}/edit`);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    onDelete(form.id);
    setShowDeleteModal(false);
  };

  return (
    <>
      <Card 
        variant="raised" 
        padding="none"
        className={`overflow-hidden transition-all hover:translate-y-[-2px] ${form.is_active ? 'border-l-4 border-l-indigo-500' : 'border-l-4 border-l-gray-300'}`}
      >
        <div className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{form.title}</h3>
              {form.description && (
                <p className="text-gray-600 text-sm mb-3">{form.description}</p>
              )}
            </div>
            <div className={`rounded-full px-3 py-1 text-xs font-medium ${form.is_active ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-700'}`}>
              {form.is_active ? 'Activo' : 'Inactivo'}
            </div>
          </div>
          
          <div className="flex items-center text-gray-500 text-sm space-x-4 mb-4">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              <span>{form.fields.length} respuestas</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>Actualizado: {form.updated_at}</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="secondary" 
              onClick={handleView}
              className="flex-1"
            >
              Ver
            </Button>
            <Button 
              variant="outline" 
              onClick={handleEdit}
              className="flex-1"
            >
              Editar
            </Button>
            <Button 
              variant="danger" 
              onClick={handleDelete}
              className="flex-1"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
            </Button>
          </div>
        </div>
      </Card>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Eliminar Formulario"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-500">
            ¿Estás seguro de que deseas eliminar el formulario <span className="font-medium text-gray-900">"{form.title}"</span>? Esta acción no se puede deshacer.
          </p>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Eliminando...' : 'Eliminar'}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FormCard; 