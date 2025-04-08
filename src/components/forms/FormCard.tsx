import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../types/form';
import Modal from '../shared/Modal';
import Button from '../shared/Button';
import Card from '../shared/Card';
import { 
  ChartBarIcon, 
  ClockIcon, 
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ShareIcon
} from '@heroicons/react/24/outline';

interface FormCardProps {
  form: Form;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

const FormCard: React.FC<FormCardProps> = ({ form, onDelete, isDeleting }) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleView = () => {
    navigate(`/forms/view/${form.id}`);
  };

  const handleEdit = () => {
    navigate(`/forms/${form.id}/edit`);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const confirmDelete = () => {
    onDelete(form.id);
    setShowDeleteModal(false);
  };

  const copyToClipboard = () => {
    const publicUrl = `${window.location.origin}/forms/public/${form.id}`;
    navigator.clipboard.writeText(publicUrl);
  };

  const cardStyles = {
    textAlign: 'left' as const,
  };

  const buttonStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    textAlign: 'left' as const,
  };

  const iconButtonStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
  };

  return (
    <>
      <Card 
        variant="raised" 
        padding="none"
        className={`overflow-hidden transition-all hover:translate-y-[-2px] ${form.is_active ? 'border-l-4 border-l-blue-500' : 'border-l-4 border-l-gray-300'}`}
      >
        <div className="p-6" style={cardStyles}>
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1" style={cardStyles}>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{form.title}</h3>
              {form.description && (
                <p className="text-sm text-gray-500 line-clamp-2">{form.description}</p>
              )}
            </div>
            <div className={`ml-4 shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
              form.is_active 
                ? 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20' 
                : 'bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-500/20'
            }`}>
              {form.is_active ? 'Activo' : 'Inactivo'}
            </div>
          </div>
          
          {/* Metadata */}
          <div className="flex items-center gap-4 mb-6" style={cardStyles}>
            <div className="flex items-center text-sm text-gray-500">
              <ChartBarIcon className="w-4 h-4 mr-1.5" />
              <span>{form.fields.length} campos</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <ClockIcon className="w-4 h-4 mr-1.5" />
              <span>Actualizado: {new Date(form.updated_at).toLocaleDateString()}</span>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex gap-2">
            <Button 
              variant="primary"
              onClick={handleView}
              style={buttonStyles}
            >
              <EyeIcon className="w-4 h-4 mr-2" />
              Ver
            </Button>
            <Button 
              variant="outline"
              onClick={handleEdit}
              style={buttonStyles}
            >
              <PencilIcon className="w-4 h-4 mr-2" />
              Editar
            </Button>
            <Button 
              variant="outline"
              onClick={handleShare}
              style={buttonStyles}
            >
              <ShareIcon className="w-4 h-4 mr-2" />
              Compartir
            </Button>
            <Button 
              variant="outline"
              onClick={handleDelete}
              className="!text-red-600 hover:!bg-red-50 hover:!border-red-600"
              style={iconButtonStyles}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <div className="animate-spin w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full" />
              ) : (
                <TrashIcon className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Eliminar Formulario"
        size="sm"
      >
        <div className="space-y-4" style={cardStyles}>
          <p className="text-gray-500">
            ¿Estás seguro de que deseas eliminar el formulario <span className="font-medium text-gray-900">"{form.title}"</span>? Esta acción no se puede deshacer.
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
              style={buttonStyles}
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
              disabled={isDeleting}
              style={buttonStyles}
            >
              {isDeleting ? 'Eliminando...' : 'Eliminar'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Share Modal */}
      <Modal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title="Compartir Formulario"
        size="sm"
      >
        <div className="space-y-4" style={cardStyles}>
          <p className="text-gray-500">
            Comparte este enlace con los pacientes para que puedan completar el formulario:
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={`${window.location.origin}/forms/public/${form.id}`}
              readOnly
              className="flex-1 p-2 border border-gray-300 rounded-lg text-sm"
            />
            <Button
              variant="primary"
              onClick={copyToClipboard}
              style={buttonStyles}
            >
              Copiar
            </Button>
          </div>
          <div className="text-sm text-gray-500 mt-2">
            <p>Este enlace es público y no requiere inicio de sesión.</p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FormCard; 