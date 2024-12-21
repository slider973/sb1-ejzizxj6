/*
  # Add gift management policies

  1. Changes
    - Add RLS policies for gift item management
    - Allow list owners to update and delete their gift items
    - Ensure proper cascade deletion when lists are deleted

  2. Security
    - Only list owners can modify or delete gift items
    - Purchased items cannot be modified or deleted
*/

-- Update gift items policies
DROP POLICY IF EXISTS "users_can_update_own_list_items" ON gift_items;
CREATE POLICY "users_can_update_own_list_items"
  ON gift_items
  FOR UPDATE
  TO authenticated
  USING (
    -- Can only update if:
    -- 1. Item belongs to user's list
    -- 2. Item is not purchased
    list_id IN (
      SELECT id FROM gift_lists 
      WHERE created_by = auth.uid()
    )
    AND NOT purchased
  )
  WITH CHECK (true);

DROP POLICY IF EXISTS "users_can_delete_own_list_items" ON gift_items;
CREATE POLICY "users_can_delete_own_list_items"
  ON gift_items
  FOR DELETE
  TO authenticated
  USING (
    -- Can only delete if:
    -- 1. Item belongs to user's list
    -- 2. Item is not purchased
    list_id IN (
      SELECT id FROM gift_lists 
      WHERE created_by = auth.uid()
    )
    AND NOT purchased
  );

-- Ensure cascade deletion works properly
ALTER TABLE gift_items
DROP CONSTRAINT IF EXISTS gift_items_list_id_fkey,
ADD CONSTRAINT gift_items_list_id_fkey
  FOREIGN KEY (list_id)
  REFERENCES gift_lists(id)
  ON DELETE CASCADE;