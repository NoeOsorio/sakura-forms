-- Add is_active column to forms table
ALTER TABLE forms
ADD COLUMN is_active BOOLEAN DEFAULT true NOT NULL;

-- Update existing forms to be active
UPDATE forms
SET is_active = true
WHERE is_active IS NULL;
