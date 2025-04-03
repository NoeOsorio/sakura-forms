import { supabase } from '../lib/supabase';
import { Form, CreateFormInput, UpdateFormInput, FormResponse } from '../types/form';

export const formService = {
  // Crear un nuevo formulario
  async createForm(input: CreateFormInput): Promise<Form> {
    const { data, error } = await supabase
      .from('forms')
      .insert([input])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Obtener un formulario por ID
  async getFormById(id: string): Promise<Form> {
    const { data, error } = await supabase
      .from('forms')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Obtener todos los formularios de un usuario
  async getUserForms(userId: string): Promise<Form[]> {
    const { data, error } = await supabase
      .from('forms')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Actualizar un formulario
  async updateForm(id: string, input: UpdateFormInput): Promise<Form> {
    const { data, error } = await supabase
      .from('forms')
      .update(input)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Eliminar un formulario
  async deleteForm(id: string): Promise<void> {
    const { error } = await supabase
      .from('forms')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Obtener plantillas
  async getTemplates(): Promise<Form[]> {
    const { data, error } = await supabase
      .from('forms')
      .select('*')
      .eq('is_template', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Guardar una respuesta de formulario
  async saveResponse(formId: string, responses: Record<string, any>): Promise<FormResponse> {
    const { data, error } = await supabase
      .from('form_responses')
      .insert([{
        form_id: formId,
        responses
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Obtener respuestas de un formulario
  async getFormResponses(formId: string): Promise<FormResponse[]> {
    const { data, error } = await supabase
      .from('form_responses')
      .select('*')
      .eq('form_id', formId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
}; 