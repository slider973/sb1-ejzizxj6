import { supabase } from './supabase';
import type { FamilyEvent, EventParticipant } from '../types/event';

export async function createEvent(event: Omit<FamilyEvent, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('family_events')
    .insert([event])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getMonthEvents(startDate: Date, endDate: Date) {
  const { data, error } = await supabase
    .from('family_events')
    .select(`
      *,
      event_participants (
        user_id,
        status
      )
    `)
    .gte('start_date', startDate.toISOString())
    .lte('start_date', endDate.toISOString())
    .order('start_date', { ascending: true });

  if (error) throw error;
  return data;
}

export async function updateEventParticipation(
  eventId: string,
  userId: string,
  status: EventParticipant['status']
) {
  const { error } = await supabase
    .from('event_participants')
    .upsert({
      event_id: eventId,
      user_id: userId,
      status
    });

  if (error) throw error;
}