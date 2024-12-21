import { format } from 'date-fns';
import type { ChatMessage } from '../../types/chat';

interface MessageGroupProps {
  date: string;
  messages: ChatMessage[];
  currentUserId: string | undefined;
}

export function MessageGroup({ date, messages, currentUserId }: MessageGroupProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {format(new Date(date), 'MMMM d, yyyy')}
        </span>
      </div>
      {messages.map((message) => {
        const isOwnMessage = message.sender_id === currentUserId;
        
        return (
          <div
            key={message.id}
            className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                isOwnMessage
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {!isOwnMessage && (
                <p className="text-xs text-gray-500 mb-1">
                  {(message as any).sender_email}
                </p>
              )}
              <p className="break-words">{message.content}</p>
              <p
                className={`text-xs mt-1 ${
                  isOwnMessage ? 'text-blue-100' : 'text-gray-500'
                }`}
              >
                {format(new Date(message.created_at), 'HH:mm')}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}