/*
  # Add gift purchases tracking

  1. Changes
    - Add purchased_at timestamp to gift_items
    - Create trigger to automatically set purchased_at
    - Create regular view for gift purchases with purchaser information
    - Add proper RLS policies and permissions
*/

-- Add purchased_at if not exists
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'gift_items' AND column_name = 'purchased_at'
  ) THEN
    ALTER TABLE gift_items ADD COLUMN purchased_at timestamptz;
  END IF;
END $$;

-- Create function to update purchased_at
CREATE OR REPLACE FUNCTION update_gift_item_purchased_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.purchased = true AND OLD.purchased = false THEN
    NEW.purchased_at = now();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger if not exists
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'set_gift_item_purchased_at'
  ) THEN
    CREATE TRIGGER set_gift_item_purchased_at
      BEFORE UPDATE ON gift_items
      FOR EACH ROW
      EXECUTE FUNCTION update_gift_item_purchased_at();
  END IF;
END $$;

-- Create view for gift purchases
DROP VIEW IF EXISTS gift_purchases;
CREATE VIEW gift_purchases AS
SELECT 
  gi.id as item_id,
  gi.title as item_title,
  gi.purchased_at as purchase_date,
  gi.list_id,
  u.email as purchaser_email,
  gl.created_by as list_owner_id
FROM gift_items gi
JOIN gift_lists gl ON gi.list_id = gl.id
LEFT JOIN auth.users u ON gi.purchased_by = u.id
WHERE gi.purchased = true;

-- Grant necessary permissions
GRANT SELECT ON gift_purchases TO authenticated;

-- Add RLS policies for the underlying tables
CREATE POLICY "Users can view purchases for their lists"
  ON gift_items
  FOR SELECT
  TO authenticated
  USING (
    list_id IN (
      SELECT id FROM gift_lists 
      WHERE created_by = auth.uid()
    )
  );