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
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  is_template BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
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

-- Create responses table
CREATE TABLE responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  form_id UUID REFERENCES forms(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  patient_name TEXT NOT NULL,
  patient_email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create response_values table
CREATE TABLE response_values (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  response_id UUID REFERENCES responses(id) ON DELETE CASCADE,
  field_id UUID REFERENCES form_fields(id) ON DELETE CASCADE,
  value TEXT,
  file_url TEXT, -- For file fields
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes
CREATE INDEX idx_forms_user_id ON forms(user_id);
CREATE INDEX idx_form_fields_form_id ON form_fields(form_id);
CREATE INDEX idx_responses_form_id ON responses(form_id);
CREATE INDEX idx_responses_user_id ON responses(user_id);
CREATE INDEX idx_response_values_response_id ON response_values(response_id);
CREATE INDEX idx_response_values_field_id ON response_values(field_id);

-- Create RLS policies
ALTER TABLE forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE response_values ENABLE ROW LEVEL SECURITY;

-- Forms policies
CREATE POLICY "Users can view their own forms"
  ON forms FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create forms"
  ON forms FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own forms"
  ON forms FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

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

-- Responses policies
CREATE POLICY "Users can view responses to their forms"
  ON responses FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM forms WHERE forms.id = responses.form_id AND forms.user_id = auth.uid()
  ));

CREATE POLICY "Anyone can create responses"
  ON responses FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update responses to their forms"
  ON responses FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM forms WHERE forms.id = responses.form_id AND forms.user_id = auth.uid()
  ));

-- Response values policies
CREATE POLICY "Users can view values of responses to their forms"
  ON response_values FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM responses
    JOIN forms ON forms.id = responses.form_id
    WHERE responses.id = response_values.response_id AND forms.user_id = auth.uid()
  ));

CREATE POLICY "Anyone can create response values"
  ON response_values FOR INSERT
  WITH CHECK (true);

-- Create functions
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_forms_updated_at
  BEFORE UPDATE ON forms
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_form_fields_updated_at
  BEFORE UPDATE ON form_fields
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_responses_updated_at
  BEFORE UPDATE ON responses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_response_values_updated_at
  BEFORE UPDATE ON response_values
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at(); 