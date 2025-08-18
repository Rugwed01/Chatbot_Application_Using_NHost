import React from 'react';
import { useSubscription } from '@apollo/client';
import { STREAM_MESSAGES } from '../../graphql/subscriptions';
import { useChat } from '../../hooks/useChat';
import { useUserData } from '@nhost/react';

type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
};

const MessageView: React.FC = () => {
  const { activeChatId } = useChat();
  const user = useUserData();

  const { data, loading, error } = useSubscription(STREAM_MESSAGES, {
    variables: { chat_id: activeChatId },
    skip: !activeChatId, // Don't run the subscription if no chat is selected
  });

  if (loading) return <div className="flex-1 p-4 text-slate-400">Loading messages...</div>;
  if (error) return <div className="flex-1 p-4 text-red-500">Error: {error.message}</div>;

  const messages = data?.messages || [];

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg: Message) => (
        <div
          key={msg.id}
          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-lg p-3 rounded-lg ${
              msg.role === 'user'
                ? 'bg-sky-600 text-white'
                : 'bg-slate-700 text-slate-200'
            }`}
          >
            <p className="whitespace-pre-wrap">{msg.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageView;