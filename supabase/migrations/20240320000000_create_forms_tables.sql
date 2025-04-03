-- Create custom types
CREATE TYPE field_type AS ENUM (
  'text',
  'textarea',
  'number',
  'email',
  'tel',
  'date',
  'time',
  'radio',
  'select',
  'checkbox',
  'scale',
  'file',
  'signature'
);

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create forms table
CREATE TABLE forms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  fields JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  is_template BOOLEAN DEFAULT false NOT NULL,
  category TEXT
);

-- Create form_fields table
CREATE TABLE form_fields (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  form_id UUID REFERENCES forms(id) ON DELETE CASCADE,
  type field_type NOT NULL,
  label TEXT NOT NULL,
  description TEXT,
  placeholder TEXT,
  required BOOLEAN DEFAULT false,
  options JSONB, -- For radio, select, scale fields
  allowed_types TEXT[], -- For file fields
  min_value INTEGER, -- For scale fields
  max_value INTEGER, -- For scale fields
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create form_responses table
CREATE TABLE form_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  form_id UUID NOT NULL REFERENCES forms(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  responses JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes
CREATE INDEX forms_user_id_idx ON forms(user_id);
CREATE INDEX forms_is_template_idx ON forms(is_template);
CREATE INDEX form_responses_form_id_idx ON form_responses(form_id);
CREATE INDEX form_responses_user_id_idx ON form_responses(user_id);
CREATE INDEX idx_form_fields_form_id ON form_fields(form_id);

-- Create RLS policies
ALTER TABLE forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_responses ENABLE ROW LEVEL SECURITY;

-- Forms policies
CREATE POLICY "Users can view their own forms"
  ON forms FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own forms"
  ON forms FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own forms"
  ON forms FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own forms"
  ON forms FOR DELETE
  USING (auth.uid() = user_id);

-- Form fields policies
CREATE POLICY "Users can view form fields of their forms"
  ON form_fields FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM forms WHERE forms.id = form_fields.form_id AND forms.user_id = auth.uid()
  ));

CREATE POLICY "Users can create fields in their forms"
  ON form_fields FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM forms WHERE forms.id = form_fields.form_id AND forms.user_id = auth.uid()
  ));

CREATE POLICY "Users can update fields in their forms"
  ON form_fields FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM forms WHERE forms.id = form_fields.form_id AND forms.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete fields in their forms"
  ON form_fields FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM forms WHERE forms.id = form_fields.form_id AND forms.user_id = auth.uid()
  ));

-- Form responses policies
CREATE POLICY "Users can view their own responses"
  ON form_responses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create responses"
  ON form_responses FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Form owners can view all responses"
  ON form_responses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM forms
      WHERE forms.id = form_responses.form_id
      AND forms.user_id = auth.uid()
    )
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_forms_updated_at
  BEFORE UPDATE ON forms
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_form_fields_updated_at
  BEFORE UPDATE ON form_fields
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_form_responses_updated_at
  BEFORE UPDATE ON form_responses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 