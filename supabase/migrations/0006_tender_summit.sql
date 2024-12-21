/*
  # Add gift reservation system

  1. Changes
    - Add reservation status to gift items
    - Add reservation timestamp and expiry
    - Add reserved_by user reference
  
  2. Security
    - Enable RLS on gift_items table
    - Add policies for reserving gifts
*/

ALTER TABLE gift_items
ADD COLUMN IF NOT EXISTS reserved boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS reserved_by uuid REFERENCES auth.users,
ADD COLUMN IF NOT EXISTS reserved_at timestamptz,
ADD COLUMN IF NOT EXISTS reservation_expires_at timestamptz;

-- Add check constraint to ensure reservation data consistency
ALTER TABLE gift_items
ADD CONSTRAINT reservation_check CHECK (
  (reserved = false AND reserved_by IS NULL AND reserved_at IS NULL AND reservation_expires_at IS NULL) OR
  (reserved = true AND reserved_by IS NOT NULL AND reserved_at IS NOT NULL AND reservation_expires_at IS NOT NULL)
);

-- Add policy for reserving gifts
CREATE POLICY "Users can reserve available gifts"
  ON gift_items
  FOR UPDATE
  TO authenticated
  USING (
    -- Can only update if not purchased and either:
    -- 1. Not reserved, or
    -- 2. Reserved by the current user, or
    -- 3. Reservation has expired
    NOT purchased AND (
      NOT reserved OR
      reserved_by = auth.uid() OR
      reservation_expires_at < now()
    )
  )
  WITH CHECK (true);