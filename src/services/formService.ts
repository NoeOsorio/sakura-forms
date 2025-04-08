import { supabase } from '../lib/supabase';
import { 
  Form, 
  CreateFormInput, 
  UpdateFormInput, 
  FormResponse, 
  FormField, 
  FieldType,
  NumericField,
  FieldWithOptions,
  ScaleField,
  FileField
} from '../types/form';

export const transformFormFieldsToUI = (fields: FormField[]): FormField[] => {
  const validTypes: FieldType[] = [
    'text', 'email', 'number', 'tel', 'textarea', 'date', 
    'select', 'radio', 'checkbox', 'scale', 'file', 'signature'
  ];

  return fields.map(field => {
    const type = validTypes.includes(field.type) ? field.type : 'text';

    // Preservar las propiedades específicas del tipo
    switch (type) {
      case 'text':
      case 'textarea':
      case 'email':
      case 'tel':
        return {
          ...field,
          type,
          placeholder: field.placeholder || '',
        };
      case 'number':
        return {
          ...field,
          type,
          placeholder: field.placeholder || '',
          minValue: (field as NumericField).minValue || 0,
          maxValue: (field as NumericField).maxValue || 100,
        };
      case 'select':
      case 'radio':
        return {
          ...field,
          type,
          options: (field as FieldWithOptions).options || [],
        };
      case 'scale':
        return {
          ...field,
          type,
          minValue: (field as ScaleField).minValue || 1,
          maxValue: (field as ScaleField).maxValue || 10,
        };
      case 'file':
        return {
          ...field,
          type,
          allowedTypes: (field as FileField).allowedTypes || ['image/*', 'application/pdf'],
        };
      case 'signature':
        return {
          ...field,
          type,
        };
      default:
        return {
          ...field,
          type: 'text',
          placeholder: field.placeholder || '',
        };
    }
  });
};

export const formService = {
  // Crear un nuevo formulario
  async createForm(input: CreateFormInput & { user_id: string }): Promise<Form> {
    const { data: formData, error: formError } = await supabase
      .from('forms')
      .insert([{
        title: input.title,
        description: input.description,
        user_id: input.user_id,
        is_template: input.is_template ?? false,
        is_active: input.is_active ?? true
      }])
      .select()
      .single();

    if (formError) throw formError;

    // Luego creamos los campos del formulario
    const fields = input.fields.map((field, index) => ({
      form_id: formData.id,
      type: field.type,
      label: field.label,
      description: field.description,
      placeholder: field.placeholder,
      required: field.required,
      options: field.options,
      order_index: index
    }));

    const { error: fieldsError } = await supabase
      .from('form_fields')
      .insert(fields);

    if (fieldsError) throw fieldsError;

    // Finalmente obtenemos el formulario completo con sus campos
    return this.getFormById(formData.id);
  },

  // Obtener un formulario por ID
  async getFormById(id: string): Promise<Form> {
    // Obtener el formulario base
    const { data: formData, error: formError } = await supabase
      .from('forms')
      .select('*')
      .eq('id', id)
      .single();

    if (formError) throw formError;

    // Obtener los campos del formulario
    const { data: fieldsData, error: fieldsError } = await supabase
      .from('form_fields')
      .select('*')
      .eq('form_id', id)
      .order('order_index');

    if (fieldsError) throw fieldsError;

    // Combinar los datos
    return {
      ...formData,
      fields: fieldsData.map(field => ({
        id: field.id,
        type: field.type,
        label: field.label,
        description: field.description,
        placeholder: field.placeholder,
        required: field.required,
        options: field.options,
        allowedTypes: field.allowed_types,
        minValue: field.min_value,
        maxValue: field.max_value,
        order: field.order_index
      }))
    };
  },

  // Obtener todos los formularios de un usuario
  async getUserForms(userId: string): Promise<Form[]> {
    const { data: forms, error: formsError } = await supabase
      .from('forms')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (formsError) throw formsError;

    // Para cada formulario, obtener sus campos
    const formsWithFields = await Promise.all(
      forms.map(async form => {
        const { data: fields, error: fieldsError } = await supabase
          .from('form_fields')
          .select('*')
          .eq('form_id', form.id)
          .order('order_index');

        if (fieldsError) throw fieldsError;

        return {
          ...form,
          fields: fields.map(field => ({
            id: field.id,
            type: field.type,
            label: field.label,
            description: field.description,
            placeholder: field.placeholder,
            required: field.required,
            options: field.options,
            allowedTypes: field.allowed_types,
            minValue: field.min_value,
            maxValue: field.max_value,
            order: field.order_index
          }))
        };
      })
    );

    return formsWithFields;
  },

  // Actualizar un formulario
  async updateForm(id: string, input: UpdateFormInput): Promise<Form> {
    // Actualizar el formulario base
    const { error: formError } = await supabase
      .from('forms')
      .update({
        title: input.title,
        description: input.description,
        is_template: input.is_template,
        category: input.category,
        is_active: input.is_active
      })
      .eq('id', id);

    if (formError) throw formError;

    // Si se proporcionan campos, actualizarlos
    if (input.fields) {
      // Primero eliminamos los campos existentes
      const { error: deleteError } = await supabase
        .from('form_fields')
        .delete()
        .eq('form_id', id);

      if (deleteError) throw deleteError;

      // Luego insertamos los nuevos campos
      const fields = input.fields.map((field, index) => ({
        form_id: id,
        type: field.type,
        label: field.label,
        description: field.description,
        placeholder: field.placeholder,
        required: field.required,
        options: field.options,
        order_index: index
      }));

      const { error: fieldsError } = await supabase
        .from('form_fields')
        .insert(fields);

      if (fieldsError) throw fieldsError;
    }

    // Finalmente obtenemos el formulario completo con sus campos
    return this.getFormById(id);
  },

  // Eliminar un formulario
  async deleteForm(id: string): Promise<void> {
    // Los campos se eliminarán automáticamente debido a ON DELETE CASCADE
    const { error } = await supabase
      .from('forms')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Obtener plantillas
  async getTemplates(): Promise<Form[]> {
    const { data: forms, error: formsError } = await supabase
      .from('forms')
      .select('*')
      .eq('is_template', true)
      .order('created_at', { ascending: false });

    if (formsError) throw formsError;

    // Para cada plantilla, obtener sus campos
    const templatesWithFields = await Promise.all(
      forms.map(async form => {
        const { data: fields, error: fieldsError } = await supabase
          .from('form_fields')
          .select('*')
          .eq('form_id', form.id)
          .order('order_index');

        if (fieldsError) throw fieldsError;

        return {
          ...form,
          fields: fields.map(field => ({
            id: field.id,
            type: field.type,
            label: field.label,
            description: field.description,
            placeholder: field.placeholder,
            required: field.required,
            options: field.options,
            allowedTypes: field.allowed_types,
            minValue: field.min_value,
            maxValue: field.max_value,
            order: field.order_index
          }))
        };
      })
    );

    return templatesWithFields;
  },

  // Guardar una respuesta de formulario
  async saveResponse(formId: string, responses: Record<string, string | number | boolean | null>): Promise<FormResponse> {
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