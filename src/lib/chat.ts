import { supabase } from './supabase';
import type { ChatMessage } from '../types/chat';

export async function sendMessage(content: string, senderId: string) {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert([{ content, sender_id: senderId }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getMessages(limit = 50) {
  const { data, error } = await supabase
    .from('chat_messages_with_sender')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export function subscribeToNewMessages(callback: (message: ChatMessage) => void) {
  return supabase
    .channel('chat_messages')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'chat_messages' },
      (payload) => callback(payload.new as ChatMessage)
    )
    .subscribe();
}