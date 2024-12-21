import { useState, useEffect } from 'react';
import { getMessages, subscribeToNewMessages } from '../lib/chat';
import type { ChatMessage } from '../types/chat';

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMessages() {
      try {
        const data = await getMessages();
        setMessages(data.reverse());
        setError(null);
      } catch (error) {
        setError('Failed to load messages');
        console.error('Error loading messages:', error);
      } finally {
        setLoading(false);
      }
    }

    loadMessages();

    const subscription = subscribeToNewMessages((newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { messages, loading, error };
}