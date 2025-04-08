import React, { useState } from 'react';
import { Form } from '../../types/form';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from 'react-hot-toast';
import { 
  EyeIcon, 
  PencilIcon, 
  ShareIcon, 
  DocumentDuplicateIcon,
  ChartBarIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import Modal from '../shared/Modal';

interface FormCardProps {
  form: Form;
  onShare: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  isDeleting?: boolean;
}

const FormCard: React.FC<FormCardProps> = ({
  form,
  onShare,
  onDelete,
  onDuplicate,
  isDeleting = false
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  
  const formattedDate = formatDistanceToNow(new Date(form.updated_at), {
    addSuffix: true,
    locale: es
  });

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleCopyLink = async () => {
    try {
      const publicUrl = `${window.location.origin}/forms/public/${form.id}`;
      await navigator.clipboard.writeText(publicUrl);
      toast.success('Enlace copiado al portapapeles');
      setShowShareModal(false);
      onShare();
    } catch (error) {
      console.error('Error al copiar el enlace:', error);
      toast.error('Error al copiar el enlace');
    }
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    onDelete();
    setShowDeleteModal(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-blue-100 transition-all duration-200">
      {/* Card Header */}
      <div className="p-4 flex items-start justify-between border-b border-gray-50">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
              {form.title}
            </h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              form.is_active ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-600'
            }`}>
              {form.is_active ? 'Activo' : 'Inactivo'}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {form.description || 'Sin descripción'}
          </p>
        </div>
      </div>

      {/* Card Body */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <DocumentDuplicateIcon className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">{form.fields.length}</span>
            </div>
            <span className="text-xs text-gray-500">campos</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <ChartBarIcon className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-gray-700">0</span>
            </div>
            <span className="text-xs text-gray-500">respuestas</span>
          </div>
          <div className="flex items-center justify-end text-sm text-gray-500">
            <span>Actualizado {formattedDate}</span>
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="px-4 py-3 bg-gray-50/50 rounded-b-xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link 
            to={`/forms/${form.id}`}
            className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            <EyeIcon className="w-4 h-4" />
            Ver
          </Link>
          <Link
            to={`/forms/${form.id}/edit`}
            className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
          >
            <PencilIcon className="w-4 h-4" />
            Editar
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 transition-colors"
            title="Compartir formulario"
          >
            <ShareIcon className="w-4 h-4" />
          </button>
          <button
            onClick={onDuplicate}
            className="inline-flex items-center text-violet-600 hover:text-violet-700 transition-colors"
            title="Duplicar formulario"
          >
            <DocumentDuplicateIcon className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex items-center text-red-600 hover:text-red-700 transition-colors"
            title="Eliminar formulario"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <div className="animate-spin w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full" />
            ) : (
              <TrashIcon className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Share Modal */}
      <Modal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title="Compartir formulario"
      >
        <div className="p-4">
          <p className="text-sm text-gray-600 mb-4">
            Comparte este enlace para que otros puedan acceder al formulario:
          </p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={`${window.location.origin}/forms/public/${form.id}`}
              className="flex-1 p-2 text-sm bg-gray-50 border border-gray-200 rounded-lg"
            />
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Copiar
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Eliminar formulario"
      >
        <div className="p-4">
          <p className="text-sm text-gray-600 mb-4">
            ¿Estás seguro de que deseas eliminar este formulario? Esta acción no se puede deshacer.
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              Eliminar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FormCard; 