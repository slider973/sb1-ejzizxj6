/*
  # Fix gift purchases relationship

  1. Changes
    - Add foreign key constraint between gift_items and profiles
    - Add purchased_at timestamp column
    - Update RLS policies
*/

-- Add purchased_at column
ALTER TABLE gift_items
ADD COLUMN IF NOT EXISTS purchased_at timestamptz;

-- Update purchased_at when item is marked as purchased
CREATE OR REPLACE FUNCTION update_gift_item_purchased_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.purchased = true AND OLD.purchased = false THEN
    NEW.purchased_at = now();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_gift_item_purchased_at
  BEFORE UPDATE ON gift_items
  FOR EACH ROW
  EXECUTE FUNCTION update_gift_item_purchased_at();

-- Add foreign key constraint for purchased_by
ALTER TABLE gift_items
DROP CONSTRAINT IF EXISTS gift_items_purchased_by_fkey,
ADD CONSTRAINT gift_items_purchased_by_fkey
  FOREIGN KEY (purchased_by)
  REFERENCES auth.users(id)
  ON DELETE SET NULL;

-- Update RLS policies
CREATE POLICY "Users can view purchased items in their lists"
  ON gift_items
  FOR SELECT
  TO authenticated
  USING (
    list_id IN (
      SELECT id FROM gift_lists WHERE created_by = auth.uid()
    )
  );