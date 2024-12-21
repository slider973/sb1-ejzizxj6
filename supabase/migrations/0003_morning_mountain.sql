/*
  # Add Family Features Schema

  1. New Tables
    - `family_events`
      - Event details (title, description, date, location)
      - Participant tracking
    - `event_participants`
      - Tracks who's attending events
    - `chat_messages`
      - Family chat system
    - `gift_lists`
      - Gift wishlists
    - `gift_items`
      - Individual items in gift lists
    - `shared_items`
      - Family recommendations and shared links

  2. Security
    - Enable RLS on all tables
    - Add policies for family member access
*/

-- Family Events
CREATE TABLE family_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  start_date timestamptz NOT NULL,
  end_date timestamptz,
  location text,
  created_by uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Event Participants
CREATE TABLE event_participants (
  event_id uuid REFERENCES family_events ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  status text NOT NULL CHECK (status IN ('attending', 'declined', 'maybe')),
  PRIMARY KEY (event_id, user_id)
);

-- Chat Messages
CREATE TABLE chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  sender_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Gift Lists
CREATE TABLE gift_lists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  occasion text NOT NULL,
  created_by uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now(),
  archived boolean DEFAULT false
);

-- Gift Items
CREATE TABLE gift_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  list_id uuid REFERENCES gift_lists ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  url text,
  price decimal(10,2),
  purchased boolean DEFAULT false,
  purchased_by uuid REFERENCES auth.users,
  created_at timestamptz DEFAULT now()
);

-- Shared Items (Recommendations)
CREATE TABLE shared_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  url text,
  category text NOT NULL,
  shared_by uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE family_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read all family events"
  ON family_events FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can create family events"
  ON family_events FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can read event participants"
  ON event_participants FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can manage their event participation"
  ON event_participants FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read all chat messages"
  ON chat_messages FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can send chat messages"
  ON chat_messages FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can read all gift lists"
  ON gift_lists FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can create gift lists"
  ON gift_lists FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can read gift items"
  ON gift_items FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can create gift items"
  ON gift_items FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update gift items"
  ON gift_items FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can read shared items"
  ON shared_items FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can create shared items"
  ON shared_items FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = shared_by);