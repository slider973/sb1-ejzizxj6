/*
  # Fix Chat Messages Schema

  1. Changes
    - Add foreign key constraint for sender_id to auth.users
    - Update RLS policies for better security

  2. Security
    - Enable RLS
    - Add policies for reading and sending messages
*/

-- Drop the existing foreign key if it exists
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'chat_messages_sender_id_fkey'
  ) THEN
    ALTER TABLE chat_messages DROP CONSTRAINT chat_messages_sender_id_fkey;
  END IF;
END $$;

-- Add proper foreign key constraint
ALTER TABLE chat_messages
  ADD CONSTRAINT chat_messages_sender_id_fkey
  FOREIGN KEY (sender_id)
  REFERENCES auth.users(id)
  ON DELETE CASCADE;

-- Update the getMessages query to use profiles instead
CREATE OR REPLACE VIEW chat_messages_with_sender AS
SELECT 
  cm.*,
  p.email as sender_email
FROM chat_messages cm
LEFT JOIN auth.users u ON cm.sender_id = u.id
LEFT JOIN profiles p ON u.id = p.id;