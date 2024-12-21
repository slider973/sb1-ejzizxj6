export interface ChatMessage {
  id: string;
  content: string;
  sender_id: string;
  sender_email?: string;
  created_at: string;
}

export interface ChatUser {
  id: string;
  email: string;
}

export interface SendMessageParams {
  content: string;
  senderId: string;
}