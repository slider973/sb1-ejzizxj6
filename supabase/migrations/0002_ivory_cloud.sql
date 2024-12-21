/*
  # Create tasks table

  1. New Tables
    - `tasks`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text)
      - `due_date` (date, required)
      - `status` (text, enum: todo, in_progress, completed)
      - `assigned_to` (uuid, references auth.users)
      - `created_by` (uuid, references auth.users)
      - `created_at` (timestamp with timezone)

  2. Security
    - Enable RLS on `tasks` table
    - Add policies for:
      - Users can read tasks assigned to them
      - Users can create tasks
      - Users can update tasks assigned to them
*/

-- Create enum for task status
CREATE TYPE task_status AS ENUM ('todo', 'in_progress', 'completed');

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  due_date date NOT NULL,
  status task_status NOT NULL DEFAULT 'todo',
  assigned_to uuid REFERENCES auth.users NOT NULL,
  created_by uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read assigned tasks"
  ON tasks
  FOR SELECT
  TO authenticated
  USING (assigned_to = auth.uid());

CREATE POLICY "Users can create tasks"
  ON tasks
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update assigned tasks"
  ON tasks
  FOR UPDATE
  TO authenticated
  USING (assigned_to = auth.uid());