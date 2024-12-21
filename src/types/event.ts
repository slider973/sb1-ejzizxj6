export interface FamilyEvent {
  id: string;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string | null;
  location: string | null;
  created_by: string;
  created_at: string;
}

export interface EventParticipant {
  event_id: string;
  user_id: string;
  status: 'attending' | 'declined' | 'maybe';
}