/*
  # Add child information to gift lists

  1. Changes
    - Add child_name column
    - Add age column
    - Add interests column (JSONB array)
    - Add size_info column (JSONB object)
    
  2. Security
    - Maintain existing RLS policies
*/

-- Add new columns to gift_lists table
ALTER TABLE gift_lists
ADD COLUMN IF NOT EXISTS child_name text,
ADD COLUMN IF NOT EXISTS age integer,
ADD COLUMN IF NOT EXISTS interests jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS size_info jsonb DEFAULT '{}'::jsonb;

-- Add validation checks
ALTER TABLE gift_lists
ADD CONSTRAINT age_check CHECK (age >= 0 AND age <= 18),
ADD CONSTRAINT interests_check CHECK (jsonb_typeof(interests) = 'array'),
ADD CONSTRAINT size_info_check CHECK (jsonb_typeof(size_info) = 'object');

-- Create index for better performance on age-based queries
CREATE INDEX IF NOT EXISTS gift_lists_age_idx ON gift_lists(age);

-- Update gift items table to include age range and category
ALTER TABLE gift_items
ADD COLUMN IF NOT EXISTS age_range jsonb,
ADD COLUMN IF NOT EXISTS priority text CHECK (priority IN ('high', 'medium', 'low')),
ADD COLUMN IF NOT EXISTS category text CHECK (category IN ('toys', 'clothes', 'books', 'electronics', 'other'));

-- Add validation for age_range
ALTER TABLE gift_items
ADD CONSTRAINT age_range_check 
CHECK (
  age_range IS NULL OR (
    jsonb_typeof(age_range) = 'object' AND
    (age_range->>'min')::int >= 0 AND
    (age_range->>'max')::int <= 18 AND
    (age_range->>'min')::int <= (age_range->>'max')::int
  )
);