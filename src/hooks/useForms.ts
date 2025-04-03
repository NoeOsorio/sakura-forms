import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useAuth } from './useAuth';
import { formService } from '../services/formService';
import { Form, CreateFormInput, UpdateFormInput } from '../types/form';

export function useForms() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);

  // Obtener formularios del usuario
  const { data: forms = [], isLoading: isLoadingForms } = useQuery({
    queryKey: ['forms', user?.id],
    queryFn: () => formService.getUserForms(user?.id || ''),
    enabled: !!user?.id,
  });

  // Obtener plantillas
  const { data: templates = [], isLoading: isLoadingTemplates } = useQuery({
    queryKey: ['templates'],
    queryFn: () => formService.getTemplates(),
  });

  // Crear formulario
  const createFormMutation = useMutation({
    mutationFn: (input: CreateFormInput) => formService.createForm(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forms'] });
      toast.success('Formulario creado exitosamente');
    },
    onError: (error) => {
      toast.error('Error al crear el formulario');
      console.error(error);
    },
  });

  // Actualizar formulario
  const updateFormMutation = useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateFormInput }) =>
      formService.updateForm(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forms'] });
      toast.success('Formulario actualizado exitosamente');
    },
    onError: (error) => {
      toast.error('Error al actualizar el formulario');
      console.error(error);
    },
  });

  // Eliminar formulario
  const deleteFormMutation = useMutation({
    mutationFn: (id: string) => formService.deleteForm(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forms'] });
      toast.success('Formulario eliminado exitosamente');
    },
    onError: (error) => {
      toast.error('Error al eliminar el formulario');
      console.error(error);
    },
  });

  // Cargar formulario por ID
  const loadForm = async (id: string) => {
    try {
      const form = await formService.getFormById(id);
      setSelectedForm(form);
    } catch (error) {
      toast.error('Error al cargar el formulario');
      console.error(error);
    }
  };

  return {
    forms,
    templates,
    selectedForm,
    isLoadingForms,
    isLoadingTemplates,
    createForm: createFormMutation.mutate,
    updateForm: updateFormMutation.mutate,
    deleteForm: deleteFormMutation.mutate,
    loadForm,
    isCreating: createFormMutation.isPending,
    isUpdating: updateFormMutation.isPending,
    isDeleting: deleteFormMutation.isPending,
  };
} 